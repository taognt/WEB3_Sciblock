const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const path = require('path');
const cors = require('cors');

const multer = require('multer');

// const upload = multer({ dest: 'uploads/' }); // Set the upload directory
// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
});

// Initialize multer with storage engine and file size limit
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB file size limit
});

const JWT_SECRET = "whatever";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// Connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/dbpie', { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Define a schema for the model
const userSchema = new mongoose.Schema({
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // Add other fields as needed
});

// Define a schema for the model
const docSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    authors: {
        type: [String],
        required: true
    },
    abstract: {
        type: String,
        required: true,
    },
    keywords: {
        type: [String],
        required: true,
    },
    pdf: {
        filename: String,
        path: String,
        contentType: String
    },
    hash: {
      type: String,
      required: true,
    }
});

// Define the model
const User = mongoose.model('User', userSchema);
const Document = mongoose.model('Document', docSchema);

// Define routes
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const password_hash = crypto.createHash('sha256').update(password).digest('hex');
    if (user.password !== password_hash) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a token / session ID and return it to the client
    const payload = { name: user.name, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'});
    res.json({ token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/signup', async (req, res) => {
    try {
      let { firstname, lastname, email, password } = req.body;
      
      const user_email = await User.findOne({ email });
      if (user_email)
        return res.status(400).json({ error: 'A user with this email already exists.' });

      password = crypto.createHash('sha256').update(password).digest('hex');
      const user = new User({ firstname, lastname, email, password });
      await user.save();
      res.status(201).json({ user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
});

app.post('/doc', upload.single('pdf'), async (req, res) => {
    try {
      // req.file contains information about the uploaded file
      const { name, authors, abstract, keywords, hash } = req.body;
    
      // Create a new PDF document with the uploaded file data
      const pdf = {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        path: req.file.path
      };
      
      const doc = new Document({name, authors, abstract, keywords, pdf, hash});
      
      // Save the document to the database
      await doc.save();

      res.status(201).json({ doc });
    } catch (e) {
      res.status(500).json({ error: 'Server error' });
    }
});

app.get('/doc', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if page is not provided
    const limit = parseInt(req.query.limit) || 10; // Default to limit 10 if limit is not provided
    const keywords = req.query.keywords;
    const authors = req.query.authors;
    const name = req.query.name;


    let find = {}
    if (keywords) {
      find["keywords"] = { $in: keywords.split(",") }
    }
    if (authors) {
      find["authors"] = { $in: authors.split(",") }
    }
    if (name) {
      find["name"] = name;
    }

    console.log(find)
    
    try {
        const documents = await Document.find(find).skip((page - 1) * limit).limit(limit);
        const count = await Document.countDocuments();
        res.status(201).send({
            documents: documents, 
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalItems: count
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/doc/:id', async (req, res) => {
    // req.file contains information about the uploaded file
    const id = req.params.id;

    const document = await Document.findById(id);

    if (!document) {
        return res.status(404).send('Document not found');
    }
  
    res.send({
        name: document.name, 
        authors: document.authors,
        abstract: document.abstract,
        keywords: document.keywords,
        pdf: document.pdf.filename,
        hash: document.hash,
    });
});

app.get('/doc/pdf/:id', async (req, res) => {
    // req.file contains information about the uploaded file
    const id = req.params.id;

    const document = await Document.findById(id);

    if (!document) {
        return res.status(404).send('Document not found');
    }

    const pdf = document.pdf;

    // Set the response headers to indicate that we're sending a PDF file
    res.set({
        'Content-Type': pdf.contentType,
        'Content-Disposition': `attachment; filename=${pdf.filename}`
    });

    // Send the PDF file data as a response
    res.sendFile(path.resolve(pdf.path));
});

// Middleware function to check if user is authenticated
function isAuthenticated(req, res, next) {
    // Check if the request includes a valid token or session ID
    const token = req.headers.auth;
    const user = jwt.verify(token, JWT_SECRET);
    if (!token || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // If the user is authenticated, call the next middleware function
    req.user = user;
    next();
}

// Protected route that requires authentication
app.get('/protected', isAuthenticated, (req, res) => {
    const user = req.user;
    res.json({ user: user, message: 'You are authorized to access this resource' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));