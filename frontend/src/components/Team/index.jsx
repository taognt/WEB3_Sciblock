import React from "react";

import Banner from "../Banner";
import Footer from "../Footer";
import "./teamStyles.css";

const Team = () => {
    return (
        <div className="team-container">
            <Banner />
            <div className="team-body">
                <h2>L'équipe PIE</h2>

                <div className="team-members-line">
                    <div>
                        <img
                            src={require("../../assets/photoFlo.png")}
                            alt="Photo Florian"
                        />
                        <span>Florian MOREL</span>
                        <span className="team-role">Développeur front-end</span>
                    </div>

                    <div>
                        <img
                            src={require("../../assets/photoCaleb.png")}
                            alt="Photo Caleb"
                        />
                        <span>Caleb OVO</span>
                        <span className="team-role">
                            Développeur blockchain
                        </span>
                    </div>
                    <div>
                        <img
                            src={require("../../assets/photoTao.png")}
                            alt="Photo Caleb"
                        />
                        <span>Tao GUINOT</span>
                        <span className="team-role">Product Owner</span>
                        <span className="team-role">
                            {" "}
                            Développeur blockchain
                        </span>
                    </div>
                </div>

                <div className="team-members-line">
                    <div>
                        <img
                            src={require("../../assets/photoYoussef.png")}
                            alt="Photo Youssef"
                        />
                        <span>Youssef ZRIBI</span>
                        <span className="team-role">Communication externe</span>
                    </div>

                    <div>
                        <img
                            src={require("../../assets/photoAndre.png")}
                            alt="Photo Andre"
                        />
                        <span>André WERNECK</span>
                        <span className="team-role">
                            Développeur blockchain
                        </span>
                    </div>
                    <div>
                        <img
                            src={require("../../assets/photoLeo.png")}
                            alt="Photo Leo"
                        />
                        <span>Leonardo PICOLI</span>
                        <span className="team-role">Développeur back-end</span>
                    </div>
                    <div>
                        <img
                            src={require("../../assets/photoNoam.png")}
                            alt="Photo Noam"
                        />
                        <span>Noam MSSELLATI</span>
                        <span className="team-role">Scrum Master</span>
                        <span className="team-role">
                            Développeur blockchain
                        </span>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Team;
