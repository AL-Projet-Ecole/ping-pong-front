import React from "react";
import Select from 'react-select';
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

            if (inputConfig.type === "hidden") {
                return (
                    <div key={index} style={{ display: 'none' }}>
                        <Input
                            type="hidden"
                            value={value}
                            onChange={(e) => setInputValues(prev => ({ ...prev, [key]: e.target.value }))}
                        />
                    </div>
                );
            }

            if (inputConfig.type === "textarea") {
                return (
                    <div key={index} style={{ marginBottom: '15px' }}>
                        <Textarea
                            placeholder={inputConfig.placeholder}
                            value={value}
                            onChange={(e) => setInputValues(prev => ({ ...prev, [key]: e.target.value }))}
                        />
                    </div>
                );
            }

            if (inputConfig.type === "select") {
                return (
                    <div key={index} style={{ marginBottom: '15px' }}>
                        <Select
                            value={inputConfig.options.find(option => option.value === value)}
                            onChange={(selectedOption) => setInputValues(prev => ({ ...prev, [key]: selectedOption ? selectedOption.value : '' }))}
                            options={inputConfig.options}
                            placeholder={inputConfig.placeholder}
                            isSearchable={true}
                        />
                    </div>
                );
            }

            return (
                <div key={index} style={{ marginBottom: '15px' }}>
                    <Input
                        type={inputConfig.type || "text"}
                        placeholder={inputConfig.placeholder}
                        value={value}
                        onChange={(e) => setInputValues(prev => ({ ...prev, [key]: e.target.value }))}
                    />
                </div>
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
                    maxWidth: "1250px",
                    borderRadius: "8px",
                    margin: "auto",
                    width: "40%",
                }
            }}
        >
            <ModalContainer>
                <ModalTitle style={{ marginBottom: '20px' }}>{modalTitle}</ModalTitle>
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
