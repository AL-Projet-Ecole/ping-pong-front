import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadGammes, AddGamme, DeleteGamme } from "../models/GammeModel";
import { loadPostes, AddPoste, DeletePoste } from "../models/PosteModel";
import {
    loadMachines,
    AddMachine,
    DeleteMachine,
    loadListeMachines,
    loadMachineById,
    loadUnassignedListeMachines,
    AddAssignementMachine,
    DeleteAssignedMachine
} from "../models/MachineModel";
import {
    loadOperations,
    AddOperation,
    loadListeOperations,
    loadOperationById,
    loadUnassignedListeOperations,
    AddAssignementOperation,
    DeleteAssignedOperation,
    DeleteOperation
} from "../models/OperationModel";
import ListComponent from "../components/ListComponent";
import SecondListComponent from "../components/SecondListComponent";
import DetailComponent from "../components/DetailComponent";
import ModalComponent from "../components/ModalComponent";
import { Container, Content } from "../components/CommonStyledComponents";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import tw from "twin.macro";

const TwoColumn = tw.div`flex flex-col lg:flex-row`;
const Column = tw.div``;

const DataLoader = () => {
    const location = useLocation();
    const [firstData, setFirstData] = useState([]);
    const [firstTitle, setFirstTitle] = useState([]);
    const [filteredFirst, setFilteredFirst] = useState([]);
    const [activeFirst, setActiveFirst] = useState(null);
    const [activeFirstId, setActiveFirstId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalSetterInput, setModalSetterInput] = useState({});
    const [inputValues, setInputValues] = useState({});
    const [error, setError] = useState("");
    const [action, setAction] = useState("");
    const [actionModal, setActionModal] = useState("");

    const [secondData, setSecondData] = useState([]);
    const [secondTitle, setSecondTitle] = useState(null);
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
                setSecondTitle(null);
                loadOperations().then(setFirstData);
                break;
            case "/Machines":
                setAction("machine");
                setFirstTitle("Machines");
                setSecondTitle(null);
                loadMachines().then(setFirstData);
                break;
            case "/Realisations":
                setAction("realisation");
                setFirstTitle("Réalisations");
                setSecondTitle(null);
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

    const handleItemClick = (item) => {
        switch (action) {
            case "gamme":
                handleGammeItemClick(item);
                break;
            case "poste":
                handlePosteItemClick(item);
                break;
            default:
                handleFirstItemClick(item);
                break;
        }
    };

    const handleGammeItemClick = async (item) => {
        setActiveFirst(item);
        const operationsIds = await loadListeOperations(item.id);
        const operations = await Promise.all(operationsIds.map(async (op) => await loadOperationById(op.id_operation, op.id_liste_operation)));
        setSecondData(operations);
    };

    const handlePosteItemClick = async (item) => {
        setActiveFirst(item);
        const machinesIds = await loadListeMachines(item.id);
        const machines = await Promise.all(machinesIds.map(async (mac) => await loadMachineById(mac.id_machine, mac.id_poste_machine)));
        setSecondData(machines);
    };

    const handleFirstItemClick = async (item) => {
        console.log(item);
        setActiveFirst(item);
    };

    const handleSecondItemClick = async (item) => {
        console.log(item);
        setActiveSecond(item);
    };

    const openModal = (item = null) => {
        setShowModal(true);
        setActiveFirstId(item);
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
                    titre_gamme: { type: "text", placeholder: "Titre de la gamme." },
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
                    const options = filteredOperations.map(operation => ({
                        value: operation.idOp,
                        label: operation.title
                    }));

                    setModalSetterInput({
                        idGamme: { type: "hidden", value: item },
                        operation: { type: "select", options, placeholder: "Selection d'une opération" }
                    });
                    if (item === undefined) {
                        toast.error("Veuillez sélectionner une gamme d'abord.");
                        return;
                    }
                    openModal(item);
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
            case "addUnassignedMachine":
                setActionModal("addUnassignedMachine");
                try {
                    const optionsValues = await loadUnassignedListeMachines(item);

                    const unassignedMachines = await Promise.all(
                        optionsValues.map(async (machine) => await loadMachineById(machine.id_machine, machine.id_poste_machine))
                    );

                    const filteredMachines = unassignedMachines.filter(machine => machine !== null);
                    const options = filteredMachines.map(machine => ({
                        value: machine.idM,
                        label: machine.title
                    }));

                    setModalSetterInput({
                        idPoste: { type: "hidden", value: item },
                        operation: { type: "select", options, placeholder: "Selection d'une machine." }
                    });
                    if (item === undefined) {
                        toast.error("Veuillez sélectionner un poste de travail d'abord.");
                        return;
                    }
                    openModal(item);
                } catch (error) {
                    console.error("Erreur lors du chargement des opérations non attribuées", error);
                }
                break;

            case "delAssignedMachine":
                setActionModal("delAssignedMachine");
                openModal(item);
                break;
            case "addOperation":
                setActionModal("addOperation");
                try {
                    const machines = await loadMachines(); // Fonction pour charger toutes les machines

                    const options = machines.map(machine => ({
                        value: machine.id,
                        label: machine.title
                    }));

                    setModalSetterInput({
                        machine: { type: "select", options, placeholder: "Selection d'une machine" },
                        libelle_operation: { type: "text", placeholder: "Intituler" },
                        temps_estimation: { type: "number", placeholder: "Estimation du temps nécessaire en minutes" }
                    });
                    openModal();
                } catch (error) {
                    console.error("Erreur lors du chargement des machines", error);
                }
                break;

            case "delOperation":
                setActionModal("delOperation");
                openModal(item);
                break;
            case "addMachine":
                setActionModal("addMachine");
                setModalSetterInput({
                    libelle_machine: { type: "text", placeholder: "Nom de la machine" },
                });
                openModal();
                break;
            case "delMachine":
                setActionModal("delMachine");
                openModal(item);
                break;
        }
    };

    const handleActionWithModal = async (idf = null, ids = null) => {
        let newItem = {};
        switch (actionModal) {
            case "addGamme":
                if (!inputValues.titre_gamme) {
                    setError("Le champ Titre doit être remplis.");
                    return;
                }
                newItem = {
                    titre_gamme: inputValues.titre_gamme
                };
                await AddGamme(newItem);
                loadGammes().then(setFirstData);
                closeModal();
                toast.success("La gamme à bien été crée.");
                break;
            case "delGamme":
                await DeleteGamme(idf);
                loadGammes().then(setFirstData);
                closeModal();
                toast.success("La gamme à bien été supprimée.");
                break;
            case "addUnassignedOperation":
                newItem = {
                    idGamme: activeFirstId,
                    idOp: inputValues.operation
                };
                await AddAssignementOperation(newItem);
                const operationsIdsadd = await loadListeOperations(activeFirstId);
                const operationsadd = await Promise.all(operationsIdsadd.map(async (op) => await loadOperationById(op.id_operation, op.id_liste_operation)));
                setSecondData(operationsadd);
                closeModal();
                toast.success("La relation entre la gamme et l'opération à bien été crée.");
                break;
            case "delAssignedOperation":
                await DeleteAssignedOperation(ids);
                const operationsIds = await loadListeOperations(idf);
                const operations = await Promise.all(operationsIds.map(async (op) => await loadOperationById(op.id_operation, op.id_liste_operation)));
                setSecondData(operations);
                closeModal();
                toast.success("La relation entre la gamme et l'opération à bien été supprimée.");
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
                toast.success("Le poste de travail à bien été crée.");
                break;
            case "delPoste":
                await DeletePoste(idf);
                loadPostes().then(setFirstData);
                closeModal();
                toast.success("Le poste de travail à bien été supprimé.");
                break;
            case "addUnassignedMachine":
                newItem = {
                    idPoste: activeFirstId,
                    idMac: inputValues.operation
                };
                console.log(newItem);
                await AddAssignementMachine(newItem);
                const machinesIdsadd = await loadListeMachines(activeFirstId);
                const machinesadd = await Promise.all(machinesIdsadd.map(async (mac) => await loadMachineById(mac.id_machine, mac.id_poste_machine)));
                setSecondData(machinesadd);
                closeModal();
                toast.success("La relation entre le poste de travail et la machine à bien été crée.");
                break;
            case "delAssignedMachine":
                await DeleteAssignedMachine(ids);
                const machinesIds = await loadListeMachines(idf);
                const machines = await Promise.all(machinesIds.map(async (mac) => await loadMachineById(mac.id_machine, mac.id_poste_machine)));
                setSecondData(machines);
                closeModal();
                toast.success("La relation entre le poste de travail et la machine à bien été supprimée.");
                break;
            case "addOperation":
                if (!inputValues.libelle_operation && !inputValues.temps_estimation) {
                    setError("Les champs doivent être remplis.");
                    return;
                }
                newItem = {
                    id_machine: inputValues.machine,
                    libelle_operation: inputValues.libelle_operation,
                    temps_estimation: inputValues.temps_estimation
                };
                await AddOperation(newItem);
                loadOperations().then(setFirstData);
                closeModal();
                toast.success("L'opération à bien été crée.");
                break;
            case "delOperation":
                await DeleteOperation(idf);
                loadOperations().then(setFirstData);
                closeModal();
                toast.success("L'opération à bien été supprimée.");
                break;
            case "addMachine":
                if (!inputValues.libelle_machine) {
                    setError("Le nom de la machine doit être renseigné.");
                    return;
                }
                newItem = {
                    libelle_machine: inputValues.libelle_machine,
                };
                await AddMachine(newItem);
                loadMachines().then(setFirstData);
                closeModal();
                toast.success("La machine à bien été crée.");
                break;
            case "delMachine":
                await DeleteMachine(idf);
                loadMachines().then(setFirstData);
                closeModal();
                toast.success("La machine à bien été supprimée.");
                break;
        }
    };

    return (
        <Container>
            <ToastContainer />
            <Content>
                <TwoColumn>
                    <Column>
                        <ListComponent
                            action={action}
                            items={filteredFirst.length > 0 ? filteredFirst : firstData}
                            onItemClick={handleItemClick}
                            onButtonClick={getOnClickAction}
                            onSearch={handleFirstSearch}
                            firstTitle={firstTitle}
                            activeItemId={activeFirst?.id}
                        />
                    </Column>
                    <Column>
                        {secondTitle && (
                            <SecondListComponent
                                action={action}
                                secondTitle={secondTitle}
                                items={filteredSecond.length ? filteredSecond : secondData}
                                onItemClick={handleSecondItemClick}
                                onButtonClick={getOnClickAction}
                                onSearch={handleSecondeSearch}
                                activeItemId={activeFirst?.id}
                            />
                        )}
                        {action !== "gamme" && (
                            <DetailComponent
                                action={action}
                                activeItemId={activeFirst?.id}
                                activeItemDescription={activeFirst?.description}
                                activeItemQuantite={activeFirst?.quantite}
                                activeItemPrix={activeFirst?.prix}
                                activeItemProvenance={activeFirst?.provenance}
                            />
                        )}
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
