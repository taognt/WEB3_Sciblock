import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Banner from "../Banner";
import Footer from "../Footer";
import ValidationResearch from "./ValidationResearch";

import "./validationStyles.css";

import axios from "axios";
import Modal from "../Modal/Modal";

function Validation() {
    const [showForm, setShowForm] = useState(false);
    const [documents, setDocuments] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState("");

    const [hashPDF, setHashPDF] = useState("");

    const [dataForm, setDataForm] = useState({
        namearticle: "",
        author1: "",
        author2: "",
        author3: "",
        keyword1: "",
        keyword2: "",
        keyword3: "",
    });

    useEffect(() => {
        getDocuments();
    }, []);

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setDataForm({ ...dataForm, [name]: value });
    };

    const getDocuments = async () => {
        const params = {};
        let authors = [];
        if (dataForm.author1) authors.push(dataForm.author1);
        if (dataForm.author2) authors.push(dataForm.author2);
        if (dataForm.author3) authors.push(dataForm.author3);
        params["authors"] = authors.join();

        let keywords = [];
        if (dataForm.keyword1) keywords.push(dataForm.keyword1);
        if (dataForm.keyword2) keywords.push(dataForm.keyword2);
        if (dataForm.keyword3) keywords.push(dataForm.keyword3);
        params["keywords"] = keywords.join();

        params["name"] = dataForm.namearticle;

        try {
            const response = await axios.get("http://localhost:5000/doc", {
                params: params,
            });
            setDocuments(response.data.documents);
        } catch (e) {
            console.log(e);
            setShowModal(true);
            setContentModal(
                <span>Une erreur s'est produite. Réessayez plus tard.</span>
            );
        }
    };

    return (
        <div className="validation-container">
            {showModal && (
                <Modal
                    content={contentModal}
                    actionButton={() => setShowModal(false)}
                    buttonName={"Retour"}
                />
            )}
            <Banner />
            <div className="validation-body">
                <h2>Valider un article</h2>
                <button onClick={() => setShowForm(!showForm)}>
                    {!showForm ? "Faire une recherche" : "Fermer la recherche"}
                </button>
                {showForm && (
                    <ValidationResearch
                        onInputChange={handleInputChange}
                        onSubmit={getDocuments}
                    />
                )}

                <div>
                    {documents.map((document) => {
                        const article = {
                            key: document._id,
                            title: document.name,
                            authors: document.authors,
                            keywords: document.keywords,
                            abstract: document.abstract,
                            valid: Math.floor(Math.random() * 3),
                            unvalid: Math.floor(Math.random() * 3),
                        };

                        return <Article article={article} key={article.key} />;
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
}

const Article = ({ article }) => {
    return (
        <div className="article-container">
            <div className="article-header">
                <h3>{article.title}</h3>
                <p className="article-valid">{article.valid} &#9989;</p>
                <p>{article.unvalid} &#10060;</p>
            </div>

            <p>Auteurs : {article.authors.join()}</p>
            <p>Mots clés : {article.keywords.join()}</p>

            <Link
                to={`pageArticle?id=${article.key}`}
                className="article-button_seeMore"
            >
                Voir plus
            </Link>
        </div>
    );
};

export default Validation;
