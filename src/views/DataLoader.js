import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadGammes, AddGamme, DeleteGamme } from "../models/GammeModel";
import {
    loadOperations,
    AddOperation,
    DeleteOperation,
    loadListeOperations,
    loadOperationById,
    loadUnassignedListeOperations,
    DeleteAssignedOperation
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
    const [filteredFirst, setFilteredFirst] = useState([]);
    const [activeGamme, setActiveGamme] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalSetterInput, setModalSetterInput] = useState({});
    const [inputValues, setInputValues] = useState({});
    const [error, setError] = useState("");
    const [action, setAction] = useState("");
    const [actionModal, setActionModal] = useState("");

    const [secondData, setSecondData] = useState([]);
    const [filteredSecond, setFilteredSecond] = useState([]);

    useEffect(() => {
        switch (location.pathname) {
            case "/Gammes":
                setAction("gamme");
                loadGammes().then(setFirstData);
                break;
            case "/Operations":
                setAction("operation");
                loadOperations().then(setFirstData);
                break;
            case "/Machines":
                setAction("machine");
                // loadMachines().then(setFirstData);
                break;
            case "/Realisations":
                setAction("realisation");
                // loadRealisations().then(setFirstData);
                break;
            case "/Poste":
                setAction("poste");
                // loadPostes().then(setFirstData);
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
        setActiveGamme(item);
        const operationsIds = await loadListeOperations(item.id);
        const operations = await Promise.all(operationsIds.map(async (op) => await loadOperationById(op.id_operation)));
        setSecondData(operations);
    };

    const openModal = (item = null) => {
        setActiveGamme(item);
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
                    console.log(item)
                    const optionsValues = await loadUnassignedListeOperations(item);

                    const unassignedOperations = await Promise.all(
                        optionsValues.map(async (operation) => await loadOperationById(operation.id_operation))
                    );

                    const filteredOperations = unassignedOperations.filter(operation => operation !== null);

                    const options = filteredOperations.map(option => ({
                        value: option.id,
                        label: option.title
                    }));
                    console.log(options)

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
        }
    };

    const handleActionWithModal = async (id = null) => {
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
                await DeleteGamme(id);
                loadGammes().then(setFirstData);
                closeModal();
                break;
            case "addUnassignedOperation":
                if (!inputValues.title || !inputValues.description) {
                    setError("Les champs Titre et Description doivent être remplis.");
                    return;
                }
                newItem = {
                    title: inputValues.title,
                    description: inputValues.description
                };
                await AddOperation(newItem);
                //loadOperations().then(setFirstData);
                closeModal();
                break;
            case "delAssignedOperation":
                await DeleteAssignedOperation(id);
                //loadOperations().then(setFirstData);
                closeModal();
                break;
            default:
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
                        firstTitle={action === "gamme" ? "Gammes" : action.charAt(0).toUpperCase() + action.slice(1)}
                        activeItemId={activeGamme?.id}
                    />
                </Column>
                <Column>
                    <SecondListComponent
                        action={action}
                        secondTitle="Opérations"
                        items={filteredSecond.length ? filteredSecond : secondData}
                        onItemClick={handleGammeItemClick}
                        onButtonClick={getOnClickAction}
                        onSearch={handleSecondeSearch}
                        activeItemId={activeGamme?.id}
                    />
                </Column>
            </TwoColumn>
            </Content>
            <ModalComponent
                isOpen={showModal}
                onRequestClose={closeModal}
                modalTitle={actionModal.includes("del") ? "Confirmation" : "Ajouter"}
                handleAdd={() => handleActionWithModal(activeGamme?.id)}
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
