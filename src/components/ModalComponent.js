import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "./CommonStyledComponents";

const ModalComponent = ({
                            isOpen,
                            onRequestClose,
                            modalTitle,
                            inputPlaceholder,
                            textareaPlaceholder,
                            handleAdd,
                            inputValue,
                            setInputValue,
                            textareaValue,
                            setTextareaValue,
                            error
                        }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <ModalHeader>{modalTitle}</ModalHeader>
            <ModalBody>
                <Input
                    type="text"
                    placeholder={inputPlaceholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Textarea
                    placeholder={textareaPlaceholder}
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                />
                {error && <p style={{ color: 'red', margin: '0.5rem 0' }}>{error}</p>}
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleAdd}>Ajouter</Button>
                <Button onClick={onRequestClose}>Annuler</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalComponent;
