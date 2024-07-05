import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {loadGammes, AddGamme, DeleteGamme, loadGammeById} from "../models/GammeModel";
import { loadRealisations, AddRealisation, DeleteRealisation } from "../models/RealisationModel";
import { loadPostes, AddPoste, DeletePoste, UpdatePoste, loadListePostes, loadPosteById } from "../models/PosteModel";
import {
    loadMachines,
    AddMachine,
    DeleteMachine,
    UpdateMachine,
    loadListeMachines,
    loadMachineById,
    loadUnassignedListeMachines,
    AddAssignementMachine,
    DeleteAssignedMachine,
    loadListeOpMachines,
    loadUnassignedListeOpMachines,
    DeleteAssignedOpMachine,
    AddAssignementOpMachine
} from "../models/MachineModel";
import {
    loadOperations,
    AddOperation,
    UpdateOperation,
    DeleteOperation,
    loadListeOperations,
    loadOperationById,
    loadUnassignedListeOperations,
    AddAssignementOperation,
    DeleteAssignedOperation,
} from "../models/OperationModel";
import ListComponent from "../components/ListComponent";
import SecondListComponent from "../components/SecondListComponent";
import DetailComponent from "../components/DetailComponent";
import ModalComponent from "../components/ModalComponent";
import { Container, Content } from "../components/CommonStyledComponents";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import tw from "twin.macro";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {loadUserById} from "../models/UserModel";

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

    const [updatedData, setUpdatedData] = useState(null);

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
                loadRealisations().then(setFirstData);
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
            case "operation":
                handleOperationItemClick(item);
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
        const machines = await Promise.all(machinesIds.map(async (mac) => await loadMachineById(mac.id_machine)));
        setSecondData(machines);
    };

    const handleOperationItemClick = async (item) => {
        setActiveFirst(item);
        const machinesIds = await loadListeOpMachines(item.id);
        const machines = await Promise.all(machinesIds.map(async (mac) => await loadMachineById(mac.id_machine)));
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
            case "updtOperation":
                await UpdateOperation(item);
                loadOperations().then(setFirstData);
                setUpdatedData(item);
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
            case "updtPoste":
                await UpdatePoste(item);
                loadPostes().then(setFirstData);
                setUpdatedData(item);
                toast.success("La mise à jour du poste de travail a bien été effectuée.");
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
            case "updtMachine":
                await UpdateMachine(item);
                loadMachines().then(setFirstData);
                setUpdatedData(item);
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
                        option: { type: "select", options, placeholder: "Selection d'une machine." }
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
            case "addUnassignedOpMachine":
                setActionModal("addUnassignedOpMachine");
                try {
                    const optionsValues = await loadUnassignedListeOpMachines(item);

                    const unassignedMachines = await Promise.all(
                        optionsValues.map(async (machine) => await loadMachineById(machine.id_machine, machine.id_operation_machine))
                    );

                    const filteredMachines = unassignedMachines.filter(machine => machine !== null);
                    const options = filteredMachines.map(machine => ({
                        value: machine.idM,
                        label: machine.title
                    }));

                    setModalSetterInput({
                        idOperation: { type: "hidden", value: item },
                        option: { type: "select", options, placeholder: "Selection d'une machine." }
                    });
                    if (item === undefined) {
                        toast.error("Veuillez sélectionner une opération d'abord.");
                        return;
                    }
                    openModal(item);
                } catch (error) {
                    console.error("Erreur lors du chargement des opérations non attribuées", error);
                }
                break;

            case "delAssignedOpMachine":
                setActionModal("delAssignedOpMachine");
                openModal(item);
                break;


            case "addRealisation":
                setActionModal("addRealisation");
                try {
                    const gammes = await loadGammes();

                    const options = gammes.map(gamme => ({
                        value: gamme.id,
                        label: gamme.title
                    }));

                    setModalSetterInput({
                        gamme: { type: "select", options, placeholder: "Selectionnez une Gamme", onChange: handleGammeChange },
                        operation: { type: "select", options: [], placeholder: "Selectionnez une Opération", onChange: handleOperationChange },
                        idM: { type: "text", placeholder: "Machine associée", readOnly: true },
                        idP: { type: "select", options: [], placeholder: "Selectionnez un Poste de travail"},
                        dateFab: { type: "date", placeholder: "Date de fabrication", onChange: handleDateChange },
                        description: { type: "text", placeholder: "Renseignez le temps de réalisation (en minutes)" },
                    });
                } catch (error) {
                    console.error("Erreur lors du chargement des gammes", error);
                }
                openModal();
                break;

            case "delRealisation":
                setActionModal("delRealisation");
                openModal(item);
                break;
        }
    };

    const handleGammeChange = async (selectedOption) => {
        setInputValues({
            gamme: selectedOption.value,
            operation: "",
            idM: "",
            idP: "",
            dateFab: "",
            description: ""
        });

        // Charger les opérations associées à la gamme sélectionnée
        const operationsIds = await loadListeOperations(selectedOption.value);
        const operations = await Promise.all(
            operationsIds.map(async (op) => await loadOperationById(op.id_operation, op.id_liste_operation))
        );

        const options = operations.map(operation => ({
            value: `${operation.idOp}_${operation.idM}`,
            label: operation.title
        }));

        setModalSetterInput(prev => ({
            ...prev,
            operation: { ...prev.operation, options }
        }));
    };

    const handleOperationChange = async (selectedOption) => {
        const [idOp, idM] = selectedOption.value.split('_');
        setInputValues(prev => ({ ...prev, operation: idOp, idM }));

        const machine = await loadMachineById(idM);
        setInputValues(prev => ({ ...prev, idM: machine.title, idMachine: idM }));

        const postesIds = await loadListePostes(idM);
        const postes = await Promise.all(
            postesIds.map(async (poste) => await loadPosteById(poste.id_poste)));

        const options = postes.map(poste => ({
            value: poste.id,
            label: poste.title
        }));

        setModalSetterInput(prev => ({
            ...prev,
            idP: { ...prev.idP, options }
        }));
    };

    const handleDateChange = (date) => {
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        setInputValues(prev => ({ ...prev, dateFab: formattedDate }));
    };

    const handleActionWithModal = async (idf = null, ids = null) => {
        let newItem = {};
        // eslint-disable-next-line default-case
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
                break;
            case "delGamme":
                console.log(idf)
                await DeleteGamme(idf);
                loadGammes().then(setFirstData);
                closeModal();
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
            case "addUnassignedMachine":
                newItem = {
                    idPoste: activeFirstId,
                    idMac: inputValues.option
                };
                console.log(newItem);
                await AddAssignementMachine(newItem);
                const machinesIdsadd = await loadListeMachines(activeFirstId);
                const machinesadd = await Promise.all(machinesIdsadd.map(async (mac) => await loadMachineById(mac.id_machine, mac.id_poste_machine)));
                setSecondData(machinesadd);
                closeModal();
                break;
            case "delAssignedMachine":
                await DeleteAssignedMachine(ids);
                const machinesIds = await loadListeMachines(idf);
                const machines = await Promise.all(machinesIds.map(async (mac) => await loadMachineById(mac.id_machine, mac.id_poste_machine)));
                setSecondData(machines);
                closeModal();
                break;
            case "addUnassignedOpMachine":
                // MARCHE PAS A VOIR
                newItem = {
                    idOperation: activeFirstId,
                    idMac: inputValues.option
                };
                console.log(newItem);
                await AddAssignementOpMachine(newItem);
                const opMachinesIdsadd = await loadListeOpMachines(activeFirstId);
                const opMachinesadd = await Promise.all(opMachinesIdsadd.map(async (mac) => await loadMachineById(mac.id_machine, mac.id_operation_machine)));
                setSecondData(opMachinesadd);
                closeModal();
                break;
            case "delAssignedOpMachine":
                await DeleteAssignedOpMachine(ids);
                const opMachinesIds = await loadListeOpMachines(idf);
                const opMachines = await Promise.all(opMachinesIds.map(async (mac) => await loadMachineById(mac.id_machine, mac.id_operation_machine)));
                setSecondData(opMachines);
                closeModal();
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
                break;
            case "delOperation":
                await DeleteOperation(idf);
                loadOperations().then(setFirstData);
                closeModal();
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
                break;
            case "delMachine":
                await DeleteMachine(idf);
                loadMachines().then(setFirstData);
                closeModal();
                break;
            case "addRealisation":
                if (!inputValues.gamme && !inputValues.operation && !inputValues.idP && !inputValues.dateFab && !inputValues.description) {
                    toast.error("Veuillez renseigner tout les champs.");
                    return;
                }
                newItem = {
                    idG: inputValues.gamme,
                    idU: sessionStorage.getItem('id_user'),
                    idOp: inputValues.operation,
                    idM: inputValues.idMachine,
                    idP: inputValues.idP,
                    temps_realisation: inputValues.dateFab,
                    date_debut_fab: inputValues.description,
                };
                await AddRealisation(newItem);
                loadRealisations().then(setFirstData);
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
                            onItemClick={handleItemClick}
                            onButtonClick={getOnClickAction}
                            onSearch={handleFirstSearch}
                            firstTitle={firstTitle}
                            activeItemId={activeFirst?.id}
                        />
                    </Column>
                    <Column>
                        {secondTitle && activeFirst && (
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
                                toast = {toast}
                                action={action}
                                onButtonClick={getOnClickAction}
                                activeItemId={activeFirst?.id}
                                activeItemLibelle={activeFirst?.title}
                                activeItemDescription={activeFirst?.description}
                                activeItemQuantite={activeFirst?.quantite}
                                activeItemPrix={activeFirst?.prix}
                                activeItemProvenance={activeFirst?.provenance}
                                activeItemIDG={activeFirst?.idG && loadGammeById(activeFirst.idG)}
                                activeItemIDU={activeFirst?.idU && loadUserById(activeFirst.idU)}
                                activeItemIDO={activeFirst?.idO && loadOperationById(activeFirst.idO)}
                                activeItemIDM={activeFirst?.idM && loadMachineById(activeFirst.idM)}
                                activeItemIDP={activeFirst?.idP && loadPosteById(activeFirst.idP)}
                                activeItemDateFab={activeFirst?.dateFab}
                                optionForInputOperation={activeFirst?.idM && loadMachines()}
                                activeItemCreatedAt={activeFirst?.createdAt}
                                activeItemUpdatedAt={activeFirst?.updatedAt}
                                updatedData={updatedData}
                            />
                        )}
                    </Column>
                </TwoColumn>
            </Content>

            <ModalComponent
                isOpen={showModal}
                onRequestClose={closeModal}
                modalTitle={actionModal.includes("add") ? "Ajouter" : "Supprimer"}
                handleAdd={() => handleActionWithModal(activeFirst?.id, activeSecond?.id)}
                modalInputs={modalSetterInput}
                inputValues={inputValues}
                setInputValues={setInputValues}
                error={error}
                actionModal={actionModal}
            />

            <ToastContainer />
        </Container>
    );
};

export default DataLoader;
