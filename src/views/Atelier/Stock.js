import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled, { css } from "styled-components";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import {AddGamme, loadGammesByType, loadGammes, UpdateGamme, DeleteGamme} from "../../models/GammeModel";
import ModalComponent from "components/ModalComponent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AddButton, DeleteButton, Heading, SearchInputContainer} from "../../components/CommonStyledComponents";
import { ReactComponent as PlusIcon } from "feather-icons/dist/icons/plus.svg";
import { ReactComponent as XIcon } from "feather-icons/dist/icons/x.svg";

// Import des images
import pingpongStock from "../../assets/images/ping-pong-stock.png";
import livrableImage from "../../assets/images/livrable-image.jpg";
import AcheterImage from "../../assets/images/acheter-image.jpg";
import intermediaireImage from "../../assets/images/intermediaire-image.jpg";
import matieresPremieresImage from "../../assets/images/matieres-premieres-image.jpg";
import {loadMachines, UpdateMachine} from "../../models/MachineModel";
import {loadListeOperations, loadOperationById} from "../../models/OperationModel";
import {DeleteUser, loadUsers} from "../../models/UserModel";

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${props => props.active && tw`bg-primary-500! text-gray-100!`}
`;

const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;

const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;

const CardStockContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardStock = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;


const Stock = ({ heading = "Pièces", tabs = ["Toutes", "Livrable", "Acheter", "Intermediaire", "Matières Premières"] }) => {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [gammes, setGammes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const [actionModal, setActionModal] = useState("");
    const [modalSetterInput, setModalSetterInput] = useState({});
    const [inputValues, setInputValues] = useState({});
    const [activeGamme, setActiveGamme] = useState({});
    const [options, setOptions] = useState({});
    const [idGamme, setIdGamme] = useState({});

    // Tableau associant chaque type de gamme à son image correspondante
    const typeToImage = {
        Toutes: pingpongStock,
        Livrable: livrableImage,
        Acheter: AcheterImage,
        Intermediaire: intermediaireImage,
        "Matières Premières": matieresPremieresImage
    };

    useEffect(() => {


        setOptions([
            { value: "Livrable", label: "Livrable" },
            { value: "Acheter", label: "Acheter" },
            { value: "Intermediaire", label: "Intermediaire" },
            { value: "Matières Premières", label: "Matières Premières" }
        ])

        loadPieces();
    }, [activeTab]);

    const loadPieces = async () => {
        if (activeTab === "Toutes") {
            const allGammes = await loadGammes();
            setGammes(allGammes);
        } else {
            const data = await loadGammesByType(activeTab);
            setGammes(data);
        }
    };
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const setAllActiveData = (item) => {
        setActiveGamme(item);
    }

    const getOnClickAction = (action, gamme) => {
        switch (action) {
            case "addGamme":
                setActionModal("addGamme");

                setModalSetterInput({
                    titre_gamme: { type: "text", placeholder: "Nom de la pièce" },
                    description_gamme: { type: "textarea", placeholder: "Description" },
                    prix_gamme: { type: "number", placeholder: "Prix €" },
                    provenance_gamme: { type: "text", placeholder: "Provenance" },
                    type_gamme: { type: "select", options, placeholder: "Sélectionner un type" },
                    stock_gamme: { type: "number", placeholder: "Quantité" }
                });

                openModal();
                break;
            case "delGamme":
                setActionModal("delGamme")
                setIdGamme(gamme.id_user)
                openModal();
                break;
            case "showDetail":
                setAllActiveData(gamme)
                setActionModal("showDetail");
                setModalSetterInput({
                    titre_gamme: { type: "text", placeholder: activeGamme.title, value: inputValues.titre_gamme},
                    description_gamme: { type: "textarea", placeholder: activeGamme.description, value: inputValues.description_gamme},
                    prix_gamme: { type: "number", placeholder: "Prix € : " + activeGamme.prix, value: inputValues.prix_gamme},
                    provenance_gamme: { type: "text", placeholder: "Provenance : " + activeGamme.provenance, value: inputValues.provenance_gamme},
                    type_gamme: { type: "select", options, placeholder: activeGamme.type, value: inputValues.type_gamme},
                    stock_gamme: { type: "number", placeholder: "Quantité : " + activeGamme.stock, value: inputValues.stock_gamme}
                });
                openModal();
                break;
            default:
                setActiveTab(action);
                break;
        }
    };

    const handleActionWithModal = async () => {
        if (actionModal === "addGamme") {
            if (!inputValues.titre_gamme || !inputValues.description_gamme || !inputValues.prix_gamme || !inputValues.provenance_gamme || !inputValues.type_gamme || !inputValues.stock_gamme) {
                setError("Tous les champs doivent être remplis.");
                return;
            }
            const newItem = {
                titre_gamme: inputValues.titre_gamme,
                description_gamme: inputValues.description_gamme,
                prix_gamme: inputValues.prix_gamme,
                provenance_gamme: inputValues.provenance_gamme,
                type_gamme: inputValues.type_gamme,
                stock_gamme: inputValues.stock_gamme,
            };
            try {
                await AddGamme(newItem);
                if (activeTab === "Toutes") {
                    const allGammes = await loadGammes();
                    setGammes(allGammes);
                } else {
                    const data = await loadGammesByType(activeTab);
                    setGammes(data);
                }
                closeModal();
            } catch (error) {
                setError("Erreur lors de l'ajout de la gamme.");
                console.error("Error adding gamme:", error);
            }
        }
        if (actionModal === "showDetail") {
            const newItem = {
                id : activeGamme.id,
                titre: inputValues.titre_gamme,
                description: inputValues.description_gamme,
                prix: inputValues.prix_gamme,
                provenance: inputValues.provenance_gamme,
                type: inputValues.type_gamme,
                stock: inputValues.stock_gamme,
            };
            await UpdateGamme(newItem);
            if (activeTab === "Toutes") {
                const allGammes = await loadGammes();
                setGammes(allGammes);
            } else {
                const data = await loadGammesByType(activeTab);
                setGammes(data);
            }
            closeModal();
        }
        if (actionModal === "delGamme"){
            await DeleteGamme(idGamme);
            if (activeTab === "Toutes") {
                const allGammes = await loadGammes();
                setGammes(allGammes);
            } else {
                const data = await loadGammesByType(activeTab);
                setGammes(data);
            }
            closeModal();
        }

    };

    return (
        <Container>
            <ContentWithPaddingXl>
                <HeaderRow>
                    <Heading>
                        {heading}
                        <SearchInputContainer>
                            <AddButton onClick={() => getOnClickAction("addGamme")}>
                                <PlusIcon />
                            </AddButton>
                        </SearchInputContainer>
                    </Heading>
                    <TabsControl>
                        {tabs.map((tabName, index) => (
                            <TabControl key={index} active={activeTab === tabName} onClick={() => getOnClickAction(tabName)}>
                                {tabName}
                            </TabControl>
                        ))}
                    </TabsControl>
                </HeaderRow>

                <TabContent
                    variants={{
                        current: {
                            opacity: 1,
                            scale: 1,
                            display: "flex"
                        },
                        hidden: {
                            opacity: 0,
                            scale: 0.8,
                            display: "none"
                        }
                    }}
                    transition={{ duration: 0.4 }}
                    initial="current"
                    animate="current"
                >
                    {gammes.length > 0 &&
                        gammes.map((gamme, index) => (
                            <CardContainer key={index}>
                                <Card className="group" initial="rest" whileHover="hover" animate="rest">
                                    <CardImageContainer imageSrc={typeToImage[gamme.type]}>
                                        <CardStockContainer>
                                            <CardStock>{gamme.stock}</CardStock>
                                        </CardStockContainer>
                                        <CardHoverOverlay
                                            variants={{
                                                hover: {
                                                    opacity: 1,
                                                    height: "auto"
                                                },
                                                rest: {
                                                    opacity: 0,
                                                    height: 0
                                                }
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <CardButton onClick={() => {getOnClickAction("showDetail", gamme); }}>Détails</CardButton>
                                        </CardHoverOverlay>
                                    </CardImageContainer>
                                    <CardText>
                                        <CardTitle>{gamme.title}</CardTitle>
                                        <DeleteButton
                                            onClick={() => getOnClickAction("delGamme", gamme)}
                                        >
                                            <XIcon />
                                        </DeleteButton>
                                    </CardText>
                                </Card>
                            </CardContainer>
                        ))}
                </TabContent>
            </ContentWithPaddingXl>
            <ModalComponent
                isOpen={showModal}
                onRequestClose={closeModal}
                modalTitle={actionModal === "addGamme" ? "Ajouter" : "Modifier"}
                handleAdd={handleActionWithModal}
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

export default Stock;
