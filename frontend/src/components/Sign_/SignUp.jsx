import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../hooks/useSession";
// import { useNavigate } from "react-router-dom";

const SignUp = ({ onError }) => {
    // const navigate = useNavigate();
    const { setLoggedUser } = useContext(AuthContext);

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const handleSignup = async () => {
        try {
            const responseSignup = await axios.post(
                "http://localhost:5000/signup",
                {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password1,
                }
            );
            const responseLogin = await axios.post(
                "http://localhost:5000/login",
                {
                    email: email,
                    password: password1,
                }
            );
            setLoggedUser(responseLogin.data.token);
        } catch (e) {
            onError(e);
        }
    };

    return (
        <div className="signup-container">
            <h3>Inscription</h3>
            <form className="signup-form">
                <span className="signup-name">
                    <div>
                        <label>Nom</label>
                        <input
                            type="text"
                            name="last-name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Prénom</label>
                        <input
                            type="text"
                            name="first-name"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </div>
                </span>

                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                    />
                </div>

                <div>
                    <label>Confirmation du Mot de passe</label>
                    <input
                        type="password"
                        name="password2"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        style={{
                            borderColor:
                                password1 !== password2 &&
                                password2 !== "" &&
                                "red",
                        }}
                    />
                </div>

                <input
                    type="button"
                    className="signup-button"
                    value="s'inscrire"
                    onClick={handleSignup}
                />
            </form>
        </div>
    );
};
export default SignUp;
