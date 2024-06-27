import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadGammes, AddGamme, DeleteGamme } from "../models/GammeModel";
import { loadOperations, AddOperation, DeleteOperation, loadListeOperations, loadOperationById } from "../models/OperationModel";
import ListComponent from "../components/ListComponent";
import SecondListComponent from "../components/SecondListComponent";
import ModalComponent from "../components/ModalComponent";
import { Container, Content } from "../components/CommonStyledComponents";

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

    const [action, setAction] = useState("");
    const [actionModal, setActionModal] = useState("");
    const [modalSetterInput, setModalSetterInput] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [textAreaValue, setTextareaValue] = useState("");


    useEffect(() => {
        switch (location.pathname) {
            case "/Gammes":
                setFirstTitle("Gammes");
                setSecondTitle("Opérations");
                setAction("gamme")
                loadGammes().then(setFirstData);
                break;
            case "/Operations":
                setAction("operation")
                loadOperations().then(setFirstData);
                break;
            case "/Machines":
                setAction("machine")
                //loadMachines()
                loadOperations().then(setFirstData);
                break;
            case "/Realisations":
                setAction("realisation")
                //loadRealisations()
                loadOperations().then(setFirstData);
                break;
            case "/Poste":
                setAction("poste")
                //loadPostes()
                loadOperations().then(setFirstData);
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

    const openModal = (item = null) => {
        setActiveGamme(item);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
        setGammeInputValue("");
        setGammeTextareaValue("");
        setGammeError("");
    };

    const getOnClickAction =  (action, item) => {
        switch (action) {

            // ****************************************************  GAMME  ***************************************************
            case "addGamme":
                setActionModal("addGamme")
                setModalSetterInput({
                    modalTitle : "Ajouter une nouvelle gamme",
                    inputPlaceholder: "Titre",
                    textareaPlaceholder: "Description",
                });
                openModal()
                break;

            case "delGamme":
                setActionModal("delGamme")
                openModal(item)
                break;

            case "updtGamme":
                setActionModal("updtGamme")
                break;

            // **************************************************  OPERATION  *************************************************
            case "addOperation":
                setActionModal("addOperation")
                setModalSetterInput({
                    modalTitle : "Ajouter une nouvelle opération",
                    title: operationInputValue,
                    description: operationTextareaValue,
                });
                openModal()
                break;
            case "delOperation":
                setActionModal("delOperation")
                openModal(item)
                break;
            case "updtOperation":
                setActionModal("updtOperation")
                break;

            // **************************************************  MACHINE  *************************************************
            case "addMachine":
                setActionModal("addMachine")
                break;
            case "delMachine":
                setActionModal("delMachine")
                break;
            case "updtMachine":
                setActionModal("updtMachine")
                break;

            // *************************************************  POSTE  ******************************************************
            case "addPoste":
                setActionModal("addPoste")
                break;
            case "delPoste":
                setActionModal("delPoste")
                break;
            case "updtPoste":
                setActionModal("updtPoste")
                break;

            // *************************************************  REALISATION  *************************************************
            case "addRealisation":
                setActionModal("addRealisation")
                break;
        }
    }
    const handleActionWithModal = async ( id = null) => {

        let newItem = {}

        // eslint-disable-next-line default-case
        switch (action) {

            // ****************************************************  GAMME  ***************************************************
            case "addGamme":
                if (!inputValue || !textAreaValue) {
                    setGammeError("Les deux champs doivent être remplis.");
                    return;
                }
                newItem = {
                    titre_gamme: inputValue,
                    description: textAreaValue,
                };
                await AddGamme(newItem);
                loadGammes().then(setFirstData);
                closeGammeModal();
                break;

            case "delGamme":
                await DeleteGamme(id);
                loadGammes().then(setFirstData);
                closeModal();
                break;

            case "updtGamme":
                break;

            // **************************************************  OPERATION  *************************************************
            case "addOperation":
                newItem = {
                    title: operationInputValue,
                    description: operationTextareaValue,
                };

                await AddOperation(newItem);
                loadOperations().then(setFirstData);
                closeModal();
                break;
            case "delOperation":
                await DeleteOperation(id);
                loadOperations().then(setFirstData);
                closeModal();
                break;
            case "updtOperation":
                break;

            // **************************************************  MACHINE  *************************************************
            case "addMachine":
                break;
            case "delMachine":
                break;
            case "updtMachine":
                break;

            // *************************************************  POSTE  ******************************************************
            case "addPoste":
                break;
            case "delPoste":
                break;
            case "updtPoste":
                break;

            // *************************************************  REALISATION  *************************************************
            case "addRealisation":
                break;
        }
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
        const operationsIds = await loadListeOperations(id);
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
                    <Column tw="w-full lg:w-1/12">
                        <ListComponent
                            action ={action}
                            items={filteredFirst.length ? filteredFirst : firstData}
                            firstTitle={firstTitle}
                            secondTitle={secondTitle}
                            onItemClick={handleGammeItemClick}
                            onButtonClick={getOnClickAction}
                            onOpenModal={openModal}
                            onOpenDeleteConfirmation={openGammeDeleteConfirmation}
                            onSearch={handleFirstSearch}
                            activeGammeId={activeGamme} // Passer l'ID de la gamme active
                        />
                    </Column>
                    <Column tw="w-full lg:w-11/12 mt-12 lg:mt-0">
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
                actionModal={actionModal}
                isOpen={showModal}
                onRequestClose={closeModal}
                modalTitle="Ajouter une nouvelle gamme"
                inputPlaceholder="Titre"
                textareaPlaceholder="Description"
                handleAdd={handleActionWithModal}
                inputValue={inputValue}
                setInputValue={setInputValue}
                textareaValue={textAreaValue}
                setTextareaValue={setTextareaValue}
                error={gammeError}
            />
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