import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadGammes, AddGamme, DeleteGamme } from "../models/GammeModel";
import { loadOperations, AddOperation, DeleteOperation, loadListeOperations, loadOperationById } from "../models/OperationModel";
import ListComponent from "../components/ListComponent";
import SecondListComponent from "../components/SecondListComponent";
import ModalComponent from "../components/ModalComponent";
import { Container, Content } from "../components/CommonStyledComponents";
import tw from "twin.macro";

const TwoColumn = tw.div`flex flex-col lg:flex-row`;
const Column = tw.div``;

const DataLoader = () => {
    const location = useLocation();
    const [firstData, setFirstData] = useState([]);
    const [filteredFirst, setFilteredFirst] = useState([]);
    const [activeGamme, setActiveGamme] = useState(null);
    const [showGammeModal, setShowGammeModal] = useState(false);
    const [showGammeDeleteConfirmation, setShowGammeDeleteConfirmation] = useState(false);
    const [gammeInputValue, setGammeInputValue] = useState("");
    const [gammeTextareaValue, setGammeTextareaValue] = useState("");
    const [gammeError, setGammeError] = useState("");

    const [secondData, setSecondData] = useState([]);
    const [filteredSecond, setFilteredSecond] = useState([]);
    const [activeOperation, setActiveOperation] = useState(null);
    const [showOperationModal, setShowOperationModal] = useState(false);
    const [showOperationDeleteConfirmation, setShowOperationDeleteConfirmation] = useState(false);
    const [operationInputValue, setOperationInputValue] = useState("");
    const [operationTextareaValue, setOperationTextareaValue] = useState("");
    const [operationError, setOperationError] = useState("");
    const [firstTitle, setFirstTitle] = useState("");
    const [secondTitle, setSecondTitle] = useState("");

    useEffect(() => {
        switch (location.pathname) {
            case "/Gammes":
                setFirstTitle("Gammes");
                setSecondTitle("Opérations");
                loadGammes().then(setFirstData);
                break;
            case "/Operations":
                loadOperations().then(setSecondData);
                break;
            default:
                break;
        }
    }, [location.pathname]);

    const handleFirstSearch = (term) => {
        setFilteredFirst(firstData.filter(item => item.title.toLowerCase().includes(term.toLowerCase())));
    };

    const handleSecondeSearch = (term) => {
        setFilteredSecond(secondData.filter(item => item.title.toLowerCase().includes(term.toLowerCase())));
    };

    const openGammeModal = () => setShowGammeModal(true);
    const closeGammeModal = () => {
        setShowGammeModal(false);
        setGammeInputValue("");
        setGammeTextareaValue("");
        setGammeError("");
    };

    const openOperationModal = () => setShowOperationModal(true);
    const closeOperationModal = () => {
        setShowOperationModal(false);
        setOperationInputValue("");
        setOperationTextareaValue("");
        setOperationError("");
    };

    const openGammeDeleteConfirmation = (item) => {
        setActiveGamme(item);
        setShowGammeDeleteConfirmation(true);
    };

    const closeGammeDeleteConfirmation = () => {
        setActiveGamme(null);
        setShowGammeDeleteConfirmation(false);
    };

    const openOperationDeleteConfirmation = (item) => {
        setActiveOperation(item);
        setShowOperationDeleteConfirmation(true);
    };

    const closeOperationDeleteConfirmation = () => {
        setActiveOperation(null);
        setShowOperationDeleteConfirmation(false);
    };

    const handleAddGamme = async () => {
        if (!gammeInputValue || !gammeTextareaValue) {
            setGammeError("Please fill in both fields.");
            return;
        }

        const newGamme = {
            title: gammeInputValue,
            description: gammeTextareaValue,
            postImageSrc: "", // Ajuste selon les besoins
        };

        await AddGamme(newGamme);
        loadGammes().then(setFirstData);
        closeGammeModal();
    };

    const handleAddOperation = async () => {
        if (!operationInputValue || !operationTextareaValue) {
            setOperationError("Please fill in both fields.");
            return;
        }

        const newOperation = {
            title: operationInputValue,
            description: operationTextareaValue,
            postImageSrc: "", // Ajuste selon les besoins
        };

        await AddOperation(newOperation);
        loadOperations().then(setSecondData);
        closeOperationModal();
    };

    const handleDeleteGamme = async (id) => {
        await DeleteGamme(id);
        loadGammes().then(setFirstData);
        closeGammeDeleteConfirmation();
    };

    const handleDeleteOperation = async (id) => {
        await DeleteOperation(id);
        loadOperations().then(setSecondData);
        closeOperationDeleteConfirmation();
    };

    const handleGammeItemClick = async (id) => {
        setActiveGamme(id);
        console.log(id); // Vérifier que l'ID est correct ici
        const operationsIds = await loadListeOperations(id);
        console.log(operationsIds); // Vérifier que les IDs des opérations sont corrects
        const operations = await Promise.all(operationsIds.map(async (op) => await loadOperationById(op.id_operation)));
        setSecondData(operations);
    };

    const handleOperationItemClick = (id) => {
        setActiveOperation(id);
    };

    return (
        <Container>
            <Content>
                <TwoColumn>
                    <Column tw="w-full lg:w-10/12">
                        <ListComponent
                            items={filteredFirst.length ? filteredFirst : firstData}
                            firstTitle={firstTitle}
                            secondTitle={secondTitle}
                            onItemClick={handleGammeItemClick}
                            onOpenModal={openGammeModal}
                            onOpenDeleteConfirmation={openGammeDeleteConfirmation}
                            onSearch={handleFirstSearch}
                            activeGammeId={activeGamme} // Passer l'ID de la gamme active
                        />
                    </Column>
                    <Column tw="w-full lg:w-7/12 mt-12 lg:mt-0">
                        <SecondListComponent
                            items={filteredSecond.length ? filteredSecond : secondData}
                            onItemClick={handleOperationItemClick}
                            onOpenModal={openOperationModal}
                            onOpenDeleteConfirmation={openOperationDeleteConfirmation}
                            onSearch={handleSecondeSearch}
                            secondTitle={secondTitle}
                        />
                    </Column>
                </TwoColumn>
            </Content>
            <ModalComponent
                isOpen={showGammeModal}
                onRequestClose={closeGammeModal}
                modalTitle="Ajouter une nouvelle gamme"
                inputPlaceholder="Titre"
                textareaPlaceholder="Description"
                handleAdd={handleAddGamme}
                inputValue={gammeInputValue}
                setInputValue={setGammeInputValue}
                textareaValue={gammeTextareaValue}
                setTextareaValue={setGammeTextareaValue}
                error={gammeError}
            />
            <ModalComponent
                isOpen={showOperationModal}
                onRequestClose={closeOperationModal}
                modalTitle="Ajouter une nouvelle opération"
                inputPlaceholder="Titre"
                textareaPlaceholder="Description"
                handleAdd={handleAddOperation}
                inputValue={operationInputValue}
                setInputValue={setOperationInputValue}
                textareaValue={operationTextareaValue}
                setTextareaValue={setOperationTextareaValue}
                error={operationError}
            />
            <ModalComponent
                isOpen={showGammeDeleteConfirmation}
                onRequestClose={closeGammeDeleteConfirmation}
                modalTitle="Supprimer cette gamme ?"
                inputPlaceholder="Raison"
                textareaPlaceholder="Description"
                handleAdd={() => handleDeleteGamme(activeGamme.id)}
                inputValue={gammeInputValue}
                setInputValue={setGammeInputValue}
                textareaValue={gammeTextareaValue}
                setTextareaValue={setGammeTextareaValue}
                error={gammeError}
            />
            <ModalComponent
                isOpen={showOperationDeleteConfirmation}
                onRequestClose={closeOperationDeleteConfirmation}
                modalTitle="Supprimer cette opération ?"
                inputPlaceholder="Raison"
                textareaPlaceholder="Description"
                handleAdd={() => handleDeleteOperation(activeOperation.id)}
                inputValue={operationInputValue}
                setInputValue={setOperationInputValue}
                textareaValue={operationTextareaValue}
                setTextareaValue={setOperationTextareaValue}
                error={operationError}
            />
        </Container>
    );
};

export default DataLoader;
