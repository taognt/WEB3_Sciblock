import React from "react";

import Banner from "../Banner";
import Footer from "../Footer";
import HeaderHome from "./HeaderHome";
import "./homeStyles.css";

import { Link } from "react-router-dom";

import icon_research from "../../assets/icon_research.png";

function Home() {
    return (
        <div className="home-container">
            <Banner />
            <div className="home-body">
                <HeaderHome />
                <div className="home-actions">
                    <div className="home-left">
                        <h2>Publier un article</h2>
                        <p>
                            Vous voulez sécuriser votre publication en ligne ?
                            Importez votre publication en pdf et attendez que
                            d’autres chercheurs le valident !
                        </p>
                        <Link to="/publication" className="home-actions-button">
                            Publier
                        </Link>
                    </div>
                    <div className="home-right">
                        <h2>Vérifier un article</h2>
                        <p>
                            Entrez le sujet de l’article dont vous êtes experts,
                            et notez-le pour que la communauté scientifique
                            sache si on peut lui faire confiance !
                        </p>
                        <Link to="/validation" className="home-actions-button">
                            Accéder aux articles
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
