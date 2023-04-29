import React from "react";

import { Link } from "react-router-dom";

import header_background from "../assets/header_background.png";

import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer-container">
            <Link to="/" className="footer-logo">
                PIE WEB3
            </Link>

            <div className="footer-nav-links">
                <span>Découvrir le projet</span>
                <span>Découvrir l'équipe</span>
                <span>Se connecter</span>
            </div>

            <img
                className="footer-background"
                src={header_background}
                alt="background image"
            ></img>
        </footer>
    );
};

export default Footer;
