import React, { useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { loadUsers, addUser, DeleteUser } from "../../models/UserModel";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ContentWithPaddingXl, Container } from "components/misc/Layouts.js";
import { SectionHeading} from "components/misc/Headings.js";
import defaultProfilePic from "../../assets/images/defaultPP.jpg";
import {AddButton, DeleteButton, SearchInputContainer} from "../../components/CommonStyledComponents";
import { ReactComponent as PlusIcon } from "feather-icons/dist/icons/plus.svg";
import ModalComponent from "../../components/ModalComponent";
import {ToastContainer} from "react-toastify";
import { ReactComponent as XIcon } from "feather-icons/dist/icons/x.svg";
import {DeleteGamme, loadGammes} from "../../models/GammeModel";


const HeadingContainer = tw.div``;
const Heading = tw(SectionHeading)``;

const Users = tw.div`flex flex-wrap flex-row justify-center sm:max-w-2xl lg:max-w-5xl mx-auto`;
const User = tw.div`mt-24 w-full sm:w-1/2 lg:w-1/3 flex flex-col items-center`;
const UserImage = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`w-64 h-64 bg-contain bg-center rounded`}
`;
const UserContent = styled.div`
  ${tw`flex flex-col items-center mt-6`}
  .position {
    ${tw`uppercase font-bold tracking-widest text-xs text-primary-500`}
  }
  .name {
    ${tw`mt-1 text-xl font-medium text-gray-900`}
  }
`;

const UserLinks = styled.div`
  ${tw`mt-6 flex`}
  .link {
    ${tw`mr-8 last:mr-0 text-gray-400 hocus:text-primary-500 transition duration-300`}
    .icon {
      ${tw`fill-current w-6 h-6`}
    }
  }
`;

const getProfileImagePath = (id_user) => {
    try {
        return require(`../../assets/profilePictures/${id_user}.png`);
    } catch (error) {
        return defaultProfilePic;
    }
};

const getRoleName = (role) => {
    switch(role) {
        case 0:
            return "Administrateur";
        case 1:
            return "Atelier";
        case 2:
            return "Commercial";
        default:
            return "Inconnu";
    }
};

export default ({
                    heading = "Administration utilisateurs",
                }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const [actionModal, setActionModal] = useState("");
    const [modalSetterInput, setModalSetterInput] = useState({});
    const [inputValues, setInputValues] = useState({});
    const [activeGamme, setActiveGamme] = useState({});
    const [options, setOptions] = useState({});
    const [idUser, setIdUser] = useState({});

    useEffect(() => {
        loadUsers().then(data => {
            setAllUsers(data);
        });
        setOptions([
            { value: 1, label: "Atelier" },
            { value: 2, label: "Commercial" },
            { value: 0, label: "Administrateur" }
        ])
    }, []);


    const getOnClickAction = (action, user) => {
        switch (action) {
            case "addUser":

                setActionModal("addUser")
                setModalSetterInput({
                    login_user: { type: "text", placeholder: "Login." },
                    mdp_user: { type: "text", placeholder: "Mot de passe." },
                    nom_user: { type: "text", placeholder: "Nom." },
                    prenom_user: { type: "text", placeholder: "Prénom." },
                    email_user: { type: "text", placeholder: "Email." },
                    role_user: { type: "select", options , placeholder: "Choisir le role." },
                });
                openModal()
                break;
            case "delUser":

                setActionModal("delUser")
                setIdUser(user.id_user)

                openModal();
                break;
        }
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleActionWithModal = async () => {
        let newItem = {};
        switch (actionModal){
            case "addUser":
                if (!inputValues.login_user && !inputValues.mdp_user && !inputValues.role_user) {
                    setError("Le champs Login, Mdp et Role doivent être remplis.");
                    return;
                }
                newItem = {
                    login_user: inputValues.login_user,
                    mdp_user: inputValues.mdp_user,
                    nom_user: inputValues.nom_user,
                    prenom_user: inputValues.prenom_user,
                    email_user: inputValues.email_user,
                    role_user: inputValues.role_user,
                };
                await addUser(newItem);
                loadUsers().then(data => {
                    setAllUsers(data);
                });
                closeModal();
                break;
            case "delUser":
                await DeleteUser(idUser);
                loadUsers().then(data => {
                    setAllUsers(data);
                });
                closeModal();
                break;
        }
    }

    return (
        <AnimationRevealPage>
            <Container>
                <ContentWithPaddingXl>
                    <HeadingContainer>
                        {heading && <Heading>{heading}
                        </Heading>}
                    </HeadingContainer>
                    <Users>
                        <AddButton onClick={() => getOnClickAction("addUser")}>
                            <PlusIcon />
                        </AddButton>
                        {allUsers.length > 0 && allUsers.map((user, index) => (
                            <User key={index}>
                                <UserImage imageSrc={getProfileImagePath(user.id_user)} />
                                <UserContent>
                                    <span className="position">{getRoleName(user.role_user)}</span>
                                    <span className="name">{user.nom_user}</span>
                                    <UserLinks>
                                        {user.links && user.links.map((link, linkIndex) => (
                                            <a key={linkIndex} className="link" href={link.url}>
                                                <link.icon className="icon" />
                                            </a>
                                        ))}
                                    </UserLinks>
                                </UserContent>
                                <DeleteButton
                                    onClick={() => getOnClickAction("delUser", user)}
                                >
                                    <XIcon />
                                </DeleteButton>
                            </User>
                        ))}
                    </Users>
                </ContentWithPaddingXl>
                <ModalComponent
                    isOpen={showModal}
                    onRequestClose={closeModal}
                    modalTitle={actionModal.includes("add") ? "Ajouter" : "Supprimer"}
                    handleAdd={handleActionWithModal}
                    modalInputs={modalSetterInput}
                    inputValues={inputValues}
                    setInputValues={setInputValues}
                    error={error}
                    actionModal={actionModal}
                />
                <ToastContainer />
            </Container>
        </AnimationRevealPage>
    );
};
