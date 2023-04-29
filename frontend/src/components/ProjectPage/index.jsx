import "./projectStyles.css";

import Banner from "../Banner";
import Footer from "../Footer";

const ProjectPage = () => {
    return (
        <div className="project-container">
            <Banner />
            <div className="project-body">
                <h2>Le projet dans son ensemble</h2>
                <img
                    className="project-poster"
                    src={require("../../assets/poster.png")}
                    alt="poster"
                />
            </div>

            <Footer />
        </div>
    );
};

export default ProjectPage;
