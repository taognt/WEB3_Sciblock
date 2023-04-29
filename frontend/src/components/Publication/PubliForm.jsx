import React, { useState } from "react";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import jsSHA from "jssha";

import Modal from "../Modal/Modal";

const PubliForm = () => {
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [file, setFile] = useState(null);
    const [hashPDF, setHashPDF] = useState("");
    const [nameFileDandD, setNameFileDandD] = useState(
        "Insérez ici votre article en format PDF"
    );

    const [dataForm, setDataForm] = useState({
        namearticle: "",
        abstract: "",
        author1: "",
        author2: "",
        author3: "",
        keyword1: "",
        keyword2: "",
        keyword3: "",
    });

    const calculHashDoc = (file) => {
        const sha256 = new jsSHA("SHA-256", "ARRAYBUFFER");
        const reader = new FileReader();

        reader.onload = function (event) {
            const fileData = event.target.result;

            // Calculer le hash SHA-256
            sha256.update(fileData);
            const hash = sha256.getHash("HEX");

            setHashPDF(hash);
        };

        reader.readAsArrayBuffer(file[0]);
    };

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleSubmitPub = async (event) => {
        event.preventDefault();

        setSubmitting(true);

        const formData = new FormData();
        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };
        if (
            dataForm.author1[1] + dataForm.author2[1] + dataForm.author3[1] ===
                "" ||
            dataForm.keyword1[1] +
                dataForm.keyword2[1] +
                dataForm.keyword3[1] ===
                "" ||
            dataForm.namearticle === "" ||
            dataForm.abstract === "" ||
            file === null ||
            nameFileDandD.slice(-4) !== ".pdf"
        ) {
            setShowModal(true);
            setContentModal(
                <>
                    {" "}
                    <span>
                        Pour publier votre article vous devez renseigner :
                    </span>
                    <ul className="modalPub-ul">
                        <li>Le nom de l'article</li>
                        <li>L'abstract</li>
                        <li>le nom d'au moins un auteur</li>
                        <li>Au moins un mot clé</li>
                        <li>Le fichier pdf de votre article</li>
                    </ul>
                </>
            );
            setSubmitting(false);
        } else {
            let authors = [];
            if (dataForm.author1) authors.push(dataForm.author1);
            if (dataForm.author2) authors.push(dataForm.author2);
            if (dataForm.author3) authors.push(dataForm.author3);
            formData.append("authors", authors);

            let keywords = [];
            if (dataForm.keyword1) keywords.push(dataForm.keyword1);
            if (dataForm.keyword2) keywords.push(dataForm.keyword2);
            if (dataForm.keyword3) keywords.push(dataForm.keyword3);
            formData.append("keywords", keywords);

            formData.append("name", dataForm.namearticle);
            formData.append("abstract", dataForm.abstract);
            formData.append("pdf", file);
            formData.append("hash", hashPDF);

            console.log("Le hash SHA-256 du document PDF est : ", hashPDF);
            //Ajouter le hash dans le formData

            try {
                const response = await axios.post(
                    "http://localhost:5000/doc",
                    formData,
                    config
                );
                console.log(response);
                setShowModal(true);
                setContentModal(
                    <span>Votre article a été publié avec succès !</span>
                );
                setSubmitting(false);
            } catch (e) {
                console.log(e);
                setShowModal(true);
                setContentModal(
                    <span>
                        Une erreur s'est produite. Réessayez de publier votre
                        article à un autre moment.
                    </span>
                );
                setSubmitting(false);
            }
        }
    };

    const updateFile = (event) => {
        setFile(event.target.files[0]);
        console.log(event.target.files);
        calculHashDoc(event.target.files);
        setNameFileDandD(event.target.files[0].name);
    };

    return (
        <div className="pub-form-container">
            <form onSubmit={(e) => handleSubmitPub(e)}>
                <label>
                    Nom de l'article{" "}
                    <input
                        name="namearticle"
                        type="text"
                        value={dataForm.namearticle}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Abstract{" "}
                    <textarea
                        name="abstract"
                        type="text"
                        value={dataForm.abstract}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Auteurs
                    <input
                        name="author1"
                        type="text"
                        placeholder="auteur 1"
                        value={dataForm.author1}
                        onChange={handleInputChange}
                    />
                    <input
                        name="author2"
                        type="text"
                        placeholder="auteur 2"
                        value={dataForm.author2}
                        onChange={handleInputChange}
                    />
                    <input
                        name="author3"
                        type="text"
                        placeholder="auteur 3"
                        value={dataForm.author3}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Mot clés
                    <input
                        name="keyword1"
                        type="text"
                        placeholder="mot clé 1"
                        value={dataForm.keyword1}
                        onChange={handleInputChange}
                    />
                    <input
                        name="keyword2"
                        type="text"
                        placeholder="mot clé 2"
                        value={dataForm.keyword2}
                        onChange={handleInputChange}
                    />
                    <input
                        name="keyword3"
                        type="text"
                        placeholder="mot clé 2"
                        value={dataForm.keyword3}
                        onChange={handleInputChange}
                    />
                </label>

                <label
                    className="dragAndDrop"
                    style={{
                        color:
                            nameFileDandD ===
                            "Insérez ici votre article en format PDF"
                                ? "#03144cff"
                                : nameFileDandD.slice(-4) === ".pdf"
                                ? "green"
                                : "red",
                    }}
                >
                    {nameFileDandD}
                    <input type="file" onChange={updateFile} />
                </label>

                {!submitting ? (
                    <button type="submit" className="pub-form-submit">
                        Publier
                    </button>
                ) : (
                    <ThreeCircles
                        height="50"
                        width="50"
                        color="#03144C"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="three-circles-rotating"
                        outerCircleColor=""
                        innerCircleColor="#722741"
                        middleCircleColor=""
                    />
                )}
            </form>

            {showModal && (
                <Modal
                    content={contentModal}
                    actionButton={() => setShowModal(false)}
                    buttonName={"Retour"}
                />
            )}
        </div>
    );
};

export default PubliForm;
