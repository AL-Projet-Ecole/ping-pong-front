import React from "react";
import {
    Modal,
    ModalBody,
    Input,
    Textarea,
    ModalContainer,
    ModalButtonContainer,
    ModalButton,
    ModalButtonCancel
} from "./CommonStyledComponents";
import { ModalTitle } from "react-bootstrap";

const ModalComponent = ({
                            isOpen,
                            onRequestClose,
                            modalTitle,
                            handleAdd,
                            modalInputs,
                            inputValues,
                            setInputValues,
                            error,
                            actionModal
                        }) => {

    const renderInputs = () => {
        return Object.keys(modalInputs).map((key, index) => {
            const inputConfig = modalInputs[key];
            const value = inputValues[key] || "";

            if (inputConfig.type === "textarea") {
                return (
                    <Textarea
                        key={index}
                        placeholder={inputConfig.placeholder}
                        value={value}
                        onChange={(e) => setInputValues(prev => ({ ...prev, [key]: e.target.value }))}
                    />
                );
            }

            if (inputConfig.type === "select") {
                return (
                    <select
                        key={index}
                        value={value}
                        onChange={(e) => setInputValues(prev => ({ ...prev, [key]: e.target.value }))}
                    >
                        {inputConfig.options.map((option, idx) => (
                            <option key={idx} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );
            }

            return (
                <Input
                    key={index}
                    type={inputConfig.type || "text"}
                    placeholder={inputConfig.placeholder}
                    value={value}
                    onChange={(e) => setInputValues(prev => ({ ...prev, [key]: e.target.value }))}
                />
            );
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Modal"
            appElement={document.getElementById("root")}
            style={{
                overlay: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.75)"
                },
                content: {
                    position: "static",
                    inset: "auto",
                    padding: "20px",
                    maxWidth: "500px",
                    borderRadius: "8px",
                    margin: "auto"
                }
            }}
        >
            <ModalContainer>
                <ModalTitle>{modalTitle}</ModalTitle>
                <ModalBody>
                    {actionModal.includes("del") ? (
                        <p>Êtes-vous sûr de vouloir supprimer cette {actionModal.split("del")[1].toLowerCase()} ?</p>
                    ) : (
                        renderInputs()
                    )}
                    {error && <p style={{ color: 'red', margin: '0.5rem 0' }}>{error}</p>}
                </ModalBody>
                <ModalButtonContainer>
                    <ModalButtonCancel onClick={onRequestClose}>Annuler</ModalButtonCancel>
                    <ModalButton onClick={handleAdd}>{actionModal.includes("del") ? "Supprimer" : "Ajouter"}</ModalButton>
                </ModalButtonContainer>
            </ModalContainer>
        </Modal>
    );
};

export default ModalComponent;
