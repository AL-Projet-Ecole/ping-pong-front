import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadGammes, AddGamme, DeleteGamme } from "../models/GammeModel";
import { loadPostes, AddPoste, DeletePoste } from "../models/PosteModel";
import { loadMachines, loadListeMachines} from "../models/MachineModel";
import {
    loadOperations,
    AddOperation,
    loadListeOperations,
    loadOperationById,
    loadUnassignedListeOperations,
    AddAssignementOperation,
    DeleteAssignedOperation, DeleteOperation
} from "../models/OperationModel";
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
    const [firstTitle, setFirstTitle] = useState([]);
    const [filteredFirst, setFilteredFirst] = useState([]);
    const [activeFirst, setActiveFirst] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalSetterInput, setModalSetterInput] = useState({});
    const [inputValues, setInputValues] = useState({});
    const [error, setError] = useState("");
    const [action, setAction] = useState("");
    const [actionModal, setActionModal] = useState("");

    const [secondData, setSecondData] = useState([]);
    const [secondTitle, setSecondTitle] = useState([]);
    const [activeSecond, setActiveSecond] = useState(null);
    const [filteredSecond, setFilteredSecond] = useState([]);

    useEffect(() => {
        switch (location.pathname) {
            case "/Gammes":
                setAction("gamme");
                setFirstTitle("Gammes");
                setSecondTitle("Opérations");
                loadGammes().then(setFirstData);
                break;
            case "/Operations":
                setAction("operation");
                setFirstTitle("Opérations");
                setSecondTitle("Détails");
                loadOperations().then(setFirstData);
                break;
            case "/Machines":
                setAction("machine");
                setFirstTitle("Machines");
                setSecondTitle("Détails");
                loadMachines().then(setFirstData);
                break;
            case "/Realisations":
                setAction("realisation");
                setFirstTitle("Réalisations");
                setSecondTitle("Détails");
                // loadRealisations().then(setFirstData);
                break;
            case "/Postes":
                setAction("poste");
                setFirstTitle("Postes");
                setSecondTitle("Machines");
                loadPostes().then(setFirstData);
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

    const handleGammeItemClick = async (item) => {
        setActiveFirst(item);
        const operationsIds = await loadListeOperations(item.id);
        const operations = await Promise.all(operationsIds.map(async (op) => await loadOperationById(op.id_operation, op.id_liste_operation)));
        setSecondData(operations);
    };

    const handlePosteItemClick = async (item) => {
        setActiveSecond(item);
        const machinesIds = await loadListeOperations(item.id);
        const operations = await Promise.all(machinesIds.map(async (op) => await loadOperationById(op.id_operation, op.id_liste_operation)));
        setSecondData(operations);
    };

    const handleSecondItemClick = async (item) => {
        console.log(item)
        setActiveSecond(item);
    };

    const openModal = (item = null) => {
        setActiveFirst(item);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setInputValues({});
        setError("");
    };

    const getOnClickAction = async (action, item) => {
        switch (action) {
            case "addGamme":
                setActionModal("addGamme");
                setModalSetterInput({
                    titre_gamme: { type: "text", placeholder: "Titre" },
                    description_gamme: { type: "textarea", placeholder: "Description" },
                    quantite_gamme: { type: "number", placeholder: "Quantité" },
                    prix_gamme: { type: "number", placeholder: "Prix" },
                    provenance_gamme: { type: "text", placeholder: "Provenance" }
                });
                openModal();
                break;
            case "delGamme":
                setActionModal("delGamme");
                openModal(item);
                break;

            case "addUnassignedOperation":
                setActionModal("addUnassignedOperation");
                try {
                    const optionsValues = await loadUnassignedListeOperations(item);

                    const unassignedOperations = await Promise.all(
                        optionsValues.map(async (operation) => await loadOperationById(operation.id_operation, operation.id_liste_operation))
                    );

                    const filteredOperations = unassignedOperations.filter(operation => operation !== null);

                    const options = filteredOperations.map(option => ({
                        value: option.id,
                        label: option.title
                    }));

                    setModalSetterInput({
                        operation: { type: "select", options }
                    });
                    openModal();
                } catch (error) {
                    console.error("Erreur lors du chargement des opérations non attribuées", error);
                }
                break;

            case "delAssignedOperation":
                setActionModal("delAssignedOperation");
                openModal(item);
                break;
            default:
                break;
            case "addPoste":
                setActionModal("addPoste");
                setModalSetterInput({
                    libelle_poste: { type: "text", placeholder: "Libelle" }
                });
                openModal();
                break;
            case "delPoste":
                setActionModal("delPoste");
                openModal(item);
                break;
            case "addOperation":
                setActionModal("addOperation");
                setModalSetterInput({
                    libelle_operation: { type: "text", placeholder: "Intituler" },
                    temps_estimation: { type: "number", placeholder: "Estimation du temps nécessaire en minutes" }
                });
                openModal();
                break;
            case "delOperation":
                setActionModal("delOperation");
                openModal(item);
                break;
        }
    };

    const handleActionWithModal = async (idf = null, ids = null) => {
        let newItem = {};
        switch (actionModal) {
            case "addGamme":
                if (!inputValues.titre_gamme || !inputValues.description_gamme) {
                    setError("Les champs Titre et Description doivent être remplis.");
                    return;
                }
                newItem = {
                    titre_gamme: inputValues.titre_gamme,
                    description_gamme: inputValues.description_gamme,
                    quantite_gamme: inputValues.quantite_gamme,
                    prix_gamme: inputValues.prix_gamme,
                    provenance_gamme: inputValues.provenance_gamme,
                };
                await AddGamme(newItem);
                loadGammes().then(setFirstData);
                closeModal();
                break;
            case "delGamme":
                await DeleteGamme(idf);
                loadGammes().then(setFirstData);
                closeModal();
                break;
            case "addUnassignedOperation":
                newItem = {
                    title: inputValues.title,
                    description: inputValues.description
                };
                await AddAssignementOperation(newItem);
                //loadOperations().then(setFirstData);
                closeModal();
                break;
            case "delAssignedOperation":
                await DeleteAssignedOperation(ids);
                const operationsIds = await loadListeOperations(idf);
                const operations = await Promise.all(operationsIds.map(async (op) => await loadOperationById(op.id_operation, op.id_liste_operation)));
                setSecondData(operations);
                closeModal();
                break;
            default:
                break;
            case "addPoste":
                if (!inputValues.libelle_poste) {
                    setError("Les champs Libelle doit être remplis.");
                    return;
                }
                newItem = {
                    libelle_poste: inputValues.libelle_poste,
                };
                await AddPoste(newItem);
                loadPostes().then(setFirstData);
                closeModal();
                break;
            case "delPoste":
                await DeletePoste(idf);
                loadPostes().then(setFirstData);
                closeModal();
                break;
            case "addOperation":
                if (!inputValues.libelle_operation && !inputValues.temps_estimation) {
                    setError("Les champs doivent être remplis.");
                    return;
                }
                newItem = {
                    id_machine: inputValues.id_machine,
                    libelle_operation: inputValues.libelle_operation,
                    temps_estimation: inputValues.temps_estimation
                };
                await AddOperation(newItem);
                loadOperations().then(setFirstData);
                closeModal();
                break;
            case "delOperation":
                await DeleteOperation(idf);
                loadOperations().then(setFirstData);
                closeModal();
                break;
        }
    };

    return (
        <Container>
            <Content>
            <TwoColumn>
                <Column>
                    <ListComponent
                        action={action}
                        items={filteredFirst.length > 0 ? filteredFirst : firstData}
                        onItemClick={handleGammeItemClick}
                        onButtonClick={getOnClickAction}
                        onSearch={handleFirstSearch}
                        firstTitle={firstTitle}
                        activeItemId={activeFirst?.id}
                    />
                </Column>
                <Column>
                    <SecondListComponent
                        action={action}
                        secondTitle={secondTitle}
                        items={filteredSecond.length ? filteredSecond : secondData}
                        onItemClick={handleSecondItemClick}
                        onButtonClick={getOnClickAction}
                        onSearch={handleSecondeSearch}
                        activeItemId={activeSecond?.id}
                    />
                </Column>
            </TwoColumn>
            </Content>
            <ModalComponent
                isOpen={showModal}
                onRequestClose={closeModal}
                modalTitle={actionModal.includes("del") ? "Confirmation" : "Ajouter"}
                handleAdd={() => handleActionWithModal(activeFirst?.id, activeSecond?.id)}
                modalInputs={modalSetterInput}
                inputValues={inputValues}
                setInputValues={setInputValues}
                error={error}
                actionModal={actionModal}
            />
        </Container>
    );
};

export default DataLoader;
