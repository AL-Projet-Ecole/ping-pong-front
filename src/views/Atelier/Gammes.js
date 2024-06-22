import React, { useEffect, useState } from "react";
import { loadGammes, AddGamme, DeleteGamme } from "../../models/GammeModel";
import { loadListeOperations, loadOperationById } from "../../models/OperationModel";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { ReactComponent as PlusIcon } from "feather-icons/dist/icons/plus.svg";
import { ReactComponent as MinusIcon } from "feather-icons/dist/icons/minus.svg";
import { ReactComponent as XIcon } from "feather-icons/dist/icons/x.svg";
import Modal from "react-modal";

const Container = tw.div`relative min-h-screen bg-gray-100`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20 min-h-full`;

const TwoColumn = tw.div`flex flex-col lg:flex-row`;
const Column = tw.div``;

const FirstContainer = tw.div`mt-12 flex flex-col sm:flex-row sm:justify-between lg:justify-start`;
const Post = tw(motion.a)`block sm:max-w-sm cursor-pointer mb-16 last:mb-0 sm:mb-0 sm:odd:mr-8 lg:mr-8 xl:mr-16`;
const Title = tw.h5`mt-6 text-xl font-bold transition duration-300 group-hover:text-primary-500`;
const AuthorName = tw.h6`font-semibold text-lg`;
const PostTextContainer = tw.div``;

const Image = styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    props.imageContain ? tw`bg-contain bg-no-repeat` : tw`bg-cover`,
    props.imageShadow ? tw`shadow` : tw`shadow-none`,
    tw`hidden lg:block rounded h-144 bg-center`
]);

const GlobalFirstContainer = styled.div`
  ${tw`mt-24 pr-10 lg:mt-0 border-r-4`}
  ${FirstContainer} {
    ${tw`flex flex-wrap lg:flex-col`}
  }
  ${Post} {
    ${tw`flex justify-between max-w-none w-full sm:w-1/2 lg:w-auto sm:odd:pr-12 lg:odd:pr-0 mr-0`}
  }
  ${Title} {
    ${tw`text-base xl:text-lg mt-0 mr-4 lg:max-w-xs`}
  }
  ${AuthorName} {
    ${tw`mt-3 text-sm text-secondary-100 font-normal leading-none`}
  }
  ${Image} {
    ${tw`h-20 w-20 flex-shrink-0`}
  }
`;

const SECContent = tw.div`lg:ml-12`;
const Subheading = tw(SubheadingBase)`mb-4 text-center lg:text-left`;
const Heading = styled(SectionHeading)`
  ${tw`lg:text-left flex `}
`;

const SecondeContainer = tw.dl`mt-12`;
const SEC = tw.div`cursor-pointer mt-8 select-none border lg:border-0 px-8 py-4 lg:p-0 rounded-lg lg:rounded-none`;
const Seconde = tw.dt`flex justify-between items-center`;
const SecondeText = tw.span`text-lg lg:text-xl font-semibold`;
const SecondeToggleIcon = styled.span`
  ${tw`ml-2 bg-primary-500 text-gray-100 p-1 rounded-full group-hover:bg-primary-700 group-hover:text-gray-200 transition duration-300`}
  svg {
    ${tw`w-4 h-4`}
  }
`;
const Answer = motion(tw.dd`pointer-events-none text-sm sm:text-base leading-relaxed`);

const SearchInputContainer = tw.div`flex items-center`;
const SearchInput = styled.input`
  ${tw`border px-2 py-1 rounded-lg text-sm`} /* Utiliser une taille de police plus petite */
  ${tw`w-40 ml-2`} /* Réduire la largeur de la barre de recherche et ajouter une marge à gauche */
`;

const AddButton = styled.button`
  ${tw`ml-4 p-2 rounded-full bg-green-500 text-white flex items-center justify-center`}
  &:hover {
    ${tw`bg-green-700`}
  }
  svg {
    ${tw`w-6 h-6`}
  }
`;

const DeleteButton = styled.button`
  ${tw`ml-4 p-2 rounded-full bg-red-500 text-white flex items-center justify-center`}
  width: 30px; /* Ajuster la largeur */
  height: 30px; /* Ajuster la hauteur */
  &:hover {
    ${tw`bg-red-700`}
  }
  svg {
    ${tw`w-3 h-3`} /* Ajuster la taille de l'icône */
  }
`;

const ModalContainer = styled.div`
  ${tw`p-8 bg-white rounded-lg shadow-lg`}
`;

const ModalTitle = tw.h2`text-2xl font-bold mb-4`;
const ModalInput = tw.input`border px-4 py-2 rounded-lg w-full mb-4`;
const ModalTextarea = tw.textarea`border px-4 py-2 rounded-lg w-full mb-4`;
const ModalButtonContainer = tw.div`flex justify-end`;
const ModalButton = styled.button`
  ${tw`px-4 py-2 rounded-lg ml-2`}
  ${({ variant }) =>
          variant === "cancel"
                  ? tw`bg-gray-300 text-gray-700 hover:bg-gray-400`
                  : tw`bg-green-500 text-white hover:bg-green-700`}
`;

const ErrorMessage = tw.p`text-red-500 text-sm mt-2`;

const ConfirmationModal = ({
                               isOpen,
                               onRequestClose,
                               onConfirm,
                               title,
                               message,
                               confirmText = "Confirmer",
                               cancelText = "Annuler",
                               error
                           }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirmation de suppression"
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
                <ModalTitle>{title}</ModalTitle>
                <ModalTextarea>{message}</ModalTextarea>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <ModalButtonContainer>
                    <ModalButton variant="cancel" onClick={onRequestClose}>
                        {cancelText}
                    </ModalButton>
                    <ModalButton onClick={onConfirm}>{confirmText}</ModalButton>
                </ModalButtonContainer>
            </ModalContainer>
        </Modal>
    );
};

export default ({
                    subheading = "",
                    heading = "Opérations",
                    faqs = null
                }) => {
    const [allGammes, setAllGammes] = useState([]);
    const [allSecondes, setAllSecondes] = useState([]);
    const [activeSecondeIndex, setActiveSecondeIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // Recherche pour les gammes
    const [operationSearchTerm, setSecondeSearchTerm] = useState(""); // Recherche pour les opérations
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newGammeTitle, setNewGammeTitle] = useState("");
    const [newGammeDescription, setNewGammeDescription] = useState("");
    const [newGammeQuantity, setNewGammeQuantity] = useState(0);
    const [newGammePrice, setNewGammePrice] = useState(0);
    const [newGammeProvenance, setNewGammeProvenance] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [gammeToDelete, setGammeToDelete] = useState(null);

    useEffect(() => {
        loadGammes().then(data => {
            setAllGammes(data);
        });
    }, []);

    useEffect(() => {
        // Load operations when allGammes changes
        if (allGammes.length > 0) {
            handleGammeClick(allGammes[0].id_gamme); // Load operations for the first gamme initially
        }
    }, [allGammes]);

    const toggleSeconde = questionIndex => {
        if (activeSecondeIndex === questionIndex) setActiveSecondeIndex(null);
        else setActiveSecondeIndex(questionIndex);
    };

    const handleGammeClick = async id_gamme => {
        try {
            const listeSecondes = await loadListeOperations(id_gamme);
            if (!listeSecondes || listeSecondes.length === 0) {
                setAllSecondes([]);
                return;
            }

            const operationsPromises = listeSecondes.map(async operation => {
                if (operation.id_operation) {
                    const fullSeconde = await loadOperationById(operation.id_operation);
                    return fullSeconde;
                } else {
                    console.warn("Invalid operation id:", operation);
                    return null;
                }
            });

            const operations = await Promise.all(operationsPromises);
            setAllSecondes(operations.filter(op => op !== null));
        } catch (error) {
            console.error("Error loading operations: ", error);
        }
    };

    const handleDeleteGamme = async () => {
        if (gammeToDelete) {
            try {
                DeleteGamme(gammeToDelete.id_gamme); // Appel API sans attendre la réponse
                const updatedGammes = allGammes.filter(
                    gamme => gamme.id_gamme !== gammeToDelete.id_gamme
                );
                setAllGammes(updatedGammes);
                setGammeToDelete(null);
                setDeleteConfirmationOpen(false);
            } catch (error) {
                console.error("Erreur lors de la suppression de la gamme", error);
            }
        }
    };

    const filteredGammes = allGammes.filter(gamme =>
        gamme.titre_gamme.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredSecondes = allSecondes.filter(operation =>
        operation.libelle_operation
            .toLowerCase()
            .includes(operationSearchTerm.toLowerCase())
    );

    const handleSecondeSearch = event => {
        setSecondeSearchTerm(event.target.value);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewGammeTitle("");
        setNewGammeDescription("");
        setNewGammeQuantity(0);
        setNewGammePrice(0);
        setNewGammeProvenance("");
        setErrorMessage("");
    };

    const handleCreateGamme = async () => {
        if (!newGammeTitle) {
            setErrorMessage("Le titre de la gamme est requis");
            return;
        }

        const newGammeData = {
            titre_gamme: newGammeTitle,
            description_gamme: newGammeDescription,
            quantite_gamme: newGammeQuantity,
            prix_gamme: newGammePrice,
            provenance_gamme: newGammeProvenance
        };

        try {
            await AddGamme(newGammeData);
            const updatedGammes = await loadGammes();
            setAllGammes(updatedGammes);
            handleCloseModal();
        } catch (error) {
            setErrorMessage("Erreur lors de l'ajout de la gamme");
        }
    };

    const handleOpenDeleteConfirmation = gamme => {
        setGammeToDelete(gamme);
        setDeleteConfirmationOpen(true);
    };

    const handleCloseDeleteConfirmation = () => {
        setGammeToDelete(null);
        setDeleteConfirmationOpen(false);
    };

    return (
        <Container>
            <Content>
                <TwoColumn>
                    <Column tw="w-full lg:w-10/12">
                        <GlobalFirstContainer>
                            <Heading>
                                <span>Gammes</span>
                                <SearchInputContainer>
                                    <SearchInput
                                        type="text"
                                        placeholder="Recherche..."
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                    />
                                    <AddButton onClick={handleOpenModal}>
                                        <PlusIcon />
                                    </AddButton>
                                </SearchInputContainer>
                            </Heading>
                            <FirstContainer>
                                {filteredGammes.length > 0 &&
                                    filteredGammes.map((gamme, index) => (
                                        <Post
                                            key={index}
                                            onClick={() => handleGammeClick(gamme.id_gamme)}
                                            className="group"
                                        >
                                            <PostTextContainer>
                                                <Title>{gamme.titre_gamme}</Title>
                                            </PostTextContainer>
                                            <Image $imageSrc={gamme.postImageSrc} />
                                            <DeleteButton
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    handleOpenDeleteConfirmation(gamme);
                                                }}
                                            >
                                                <XIcon />
                                            </DeleteButton>
                                        </Post>
                                    ))}
                            </FirstContainer>
                        </GlobalFirstContainer>
                    </Column>
                    <Column tw="w-full lg:w-7/12 mt-12 lg:mt-0">
                        <SECContent>
                            {subheading ? <Subheading>{subheading}</Subheading> : null}
                            <Heading>
                                {heading}
                                {allSecondes.length > 0 && (
                                    <SearchInput
                                        type="text"
                                        placeholder="Recherche..."
                                        value={operationSearchTerm}
                                        onChange={handleSecondeSearch}
                                    />
                                )}
                            </Heading>
                            <SecondeContainer>
                                {allSecondes.length > 0 &&
                                    filteredSecondes.map((operation, index) => (
                                        <SEC
                                            key={index}
                                            onClick={() => {
                                                toggleSeconde(index);
                                            }}
                                            className="group"
                                        >
                                            <Seconde>
                                                <SecondeText>{operation.libelle_operation}</SecondeText>
                                                <SecondeToggleIcon>
                                                    {activeSecondeIndex === index ? (
                                                        <MinusIcon />
                                                    ) : (
                                                        <PlusIcon />
                                                    )}
                                                </SecondeToggleIcon>
                                            </Seconde>
                                            <Answer
                                                variants={{
                                                    open: {
                                                        opacity: 1,
                                                        height: "auto",
                                                        marginTop: "16px"
                                                    },
                                                    collapsed: {
                                                        opacity: 0,
                                                        height: 0,
                                                        marginTop: "0px"
                                                    }
                                                }}
                                                initial="collapsed"
                                                animate={
                                                    activeSecondeIndex === index ? "open" : "collapsed"
                                                }
                                                transition={{
                                                    duration: 0.3,
                                                    ease: [0.04, 0.62, 0.23, 0.98]
                                                }}
                                            >
                                                Temps estimé à la réalisation :{" "}
                                                {operation.temps_estimation ||
                                                    "No description available"}{" "}
                                                minutes
                                            </Answer>
                                        </SEC>
                                    ))}
                            </SecondeContainer>
                        </SECContent>
                    </Column>
                </TwoColumn>
            </Content>

            {/* Modal pour ajouter une nouvelle gamme */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Ajouter Gamme"
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
                    <ModalTitle>Ajouter une nouvelle gamme</ModalTitle>
                    <ModalInput
                        type="text"
                        placeholder="Titre de la gamme"
                        value={newGammeTitle}
                        onChange={e => setNewGammeTitle(e.target.value)}
                    />
                    <ModalTextarea
                        placeholder="Description de la gamme"
                        value={newGammeDescription}
                        onChange={e => setNewGammeDescription(e.target.value)}
                    />
                    <ModalInput
                        type="number"
                        placeholder="Quantité"
                        value={newGammeQuantity}
                        onChange={e => setNewGammeQuantity(parseInt(e.target.value))}
                    />
                    <ModalInput
                        type="number"
                        placeholder="Prix"
                        value={newGammePrice}
                        onChange={e => setNewGammePrice(parseFloat(e.target.value))}
                    />
                    <ModalInput
                        type="text"
                        placeholder="Provenance"
                        value={newGammeProvenance}
                        onChange={e => setNewGammeProvenance(e.target.value)}
                    />
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <ModalButtonContainer>
                        <ModalButton variant="cancel" onClick={handleCloseModal}>
                            Annuler
                        </ModalButton>
                        <ModalButton onClick={handleCreateGamme}>Créer</ModalButton>
                    </ModalButtonContainer>
                </ModalContainer>
            </Modal>

            {/* Modal pour confirmer la suppression */}
            <ConfirmationModal
                isOpen={deleteConfirmationOpen}
                onRequestClose={handleCloseDeleteConfirmation}
                onConfirm={handleDeleteGamme}
                title="Confirmation de suppression"
                message={`Êtes-vous sûr de vouloir supprimer cette gamme ?`}
                confirmText="Supprimer"
                cancelText="Annuler"
            />
        </Container>
    );
};
