import Banner from "../Banner";
import Footer from "../Footer";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

import Modal from "../Modal/Modal";
import "./sign_Styles.css";
import { useState } from "react";

const Sign_ = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const onErrorSignIn = (error) => {
        setModalContent(<span>Identifiant ou mot de passe incorrect</span>);
        setShowModal(true);
    };

    const onErrorSignUp = (error) => {
        setModalContent(<span>Cette adresse mail est déjà utilisée</span>);
        setShowModal(true);
    };

    return (
        <div className="sign_-container">
            {showModal && (
                <Modal
                    content={modalContent}
                    actionButton={() => setShowModal(false)}
                    buttonName={"Retour"}
                ></Modal>
            )}
            <Banner />
            <div className="sign_-body">
                <div className="signin">
                    <SignIn onError={onErrorSignIn} />
                </div>
                <div className="signup">
                    <SignUp onError={onErrorSignUp} />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Sign_;
