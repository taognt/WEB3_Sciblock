import React from "react";
import "./Modal.css";

const Modal = ({ content, buttonName, actionButton }) => {
    return (
        <div className="modalPub-layer">
            <div className="modalPub-container">
                {content}
                <button onClick={actionButton} className="modalPub-link">
                    {buttonName}
                </button>
            </div>
        </div>
    );
};

export default Modal;
