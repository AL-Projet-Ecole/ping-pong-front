import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled, { css } from "styled-components/macro"; //eslint-disable-line

import "slick-carousel/slick/slick.css";
import {
    UpdateButton,
    Heading,
    SECContent, ButtonUpdateContainer
} from "./CommonStyledComponents";
import { ReactComponent as PlusIcon } from "feather-icons/dist/icons/edit-2.svg";
import Select from "react-select";

const CustomerInfoAndControlsContainer = tw.div`mt-8 sm:text-left`;
const CustomerNameAndProfileContainer = tw.div`mt-4 sm:mt-0 sm:ml-4 flex w-full`;
const CustomerName = tw.span`text-lg font-semibold w-full`;
const CustomerProfile = tw.span`text-sm font-normal text-gray-700 w-1/2`;
const Input = styled.input`${tw`text-sm text-gray-700 p-1 border-b-2 border-gray-300 focus:border-blue-500 w-1/2 ml-2`}`;

export default ({
                    toast,
                    action,
                    onButtonClick,
                    heading = "Détails",
                    src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=256&h=256&q=80",
                    activeItemId,
                    activeItemLibelle,
                    activeItemDescription,
                    activeItemQuantite,
                    activeItemPrix,
                    activeItemProvenance,
                    activeItemCreatedAt,
                    activeItemUpdatedAt,
                    activeItemIDG,
                    activeItemIDU,
                    activeItemIDO,
                    activeItemIDM,
                    activeItemIDP,
                    activeItemDateFab,
                    optionForInputOperation,
                    updatedData
                }) => {
    const [titleLibelle, setTitleLibelle] = useState("");
    const [libelle, setLibelle] = useState("");
    const [titleDescription, setTitleDescription] = useState("");
    const [description, setDescription] = useState("");
    const [titleGamme, setTitleGamme] = useState("");
    const [gamme, setGamme] = useState("");
    const [titleOperation, setTitleOperation] = useState("");
    const [operation, setOperation] = useState("");
    const [titleMachine, setTitleMachine] = useState("");
    const [machine, setMachine] = useState("");
    const [titleTFab, setTitleTFab] = useState("");
    const [tFab, setTFab] = useState("");
    const [titleDFab, setTitleDFab] = useState("");
    const [dFab, setDFab] = useState("");
    const [titleCreatedAt, setTitleCreatedAt] = useState("");
    const [textCreatedAt, setTextCreatedAt] = useState("");
    const [titleUpdatedAt, setTitleUpdatedAt] = useState("");
    const [textUpdatedAt, setTextUpdatedAt] = useState("");

    const [editLibelle, setEditLibelle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [options, setOptions] = useState([]);
    const [optionValue, setOptionValue] = useState(null);
    const [labelleForIDM, setLabelleForIDM] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (activeItemId) {
                let getOption = [];

                switch (action) {
                    case "operation":
                        setTitleLibelle("Intitulé de l'opération");
                        setLibelle(activeItemLibelle);
                        setTitleDescription("Temps estimé à la réalisation de l'opération (en minutes)");
                        setDescription(activeItemDescription + " minutes");

                        try {
                            const optionData = await optionForInputOperation;
                            if (optionData.length > 0) {
                                getOption = optionData.map(item => ({
                                    value: item.id,
                                    label: item.title
                                }));
                            }
                        } catch (error) {
                            console.error("Error fetching optionForInputOperation:", error);
                        }
                        break;
                    case "machine":
                        setTitleLibelle("Nom de la machine");
                        setLibelle(activeItemLibelle);
                        break;
                    case "realisation":
                        const user = await activeItemIDU
                        const gamme = await activeItemIDG
                        const machine = await activeItemIDM
                        const poste = await activeItemIDP
                        const operation = await activeItemIDO

                        setTitleLibelle("Responsable");
                        setLibelle(user.title);

                        setTitleDescription("Poste de travail");
                        setDescription(poste.title);

                        setTitleGamme("Gamme");
                        setGamme(gamme.title);

                        setTitleOperation("Opération");
                        setOperation(operation.title);

                        setTitleMachine("Machine");
                        setMachine(machine.title);

                        setTitleTFab("Temps de réalisation");
                        setTFab( activeItemDateFab + " minutes.");

                        setTitleDFab("Date de réalisation");
                        setDFab(activeItemDescription);
                        break;
                    case "poste":
                        setTitleLibelle("Nom du poste");
                        setLibelle(activeItemLibelle);
                        break;
                    default:
                        break;
                }

                setOptions(getOption);
                setOptionValue(getOption.find(option => option.value === activeItemIDM) || null);
                setLabelleForIDM(getOption.find(option => option.value === activeItemIDM)?.label)

                setTitleCreatedAt("Date de création");
                setTextCreatedAt(new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(activeItemCreatedAt)));
                setTitleUpdatedAt("Dernière mise à jour");
                setTextUpdatedAt(new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(activeItemUpdatedAt)));

                setEditLibelle("");
                setEditDescription("");
            }
        };

        fetchData();
    }, [activeItemId, action]);


    useEffect(() => {
        if (updatedData) {
            setLibelle(updatedData.libelle || activeItemLibelle);
            setDescription(updatedData.description || activeItemDescription);
            setTextUpdatedAt(new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short' }).format(new Date()));

            setEditLibelle("");
            setEditDescription("");
            setOptionValue(options.find(option => option.value === updatedData.idM) || null);
            setLabelleForIDM(options.find(option => option.value === updatedData.idM)?.label)
        }
    }, [updatedData]);

    const handleUpdate = () => {
        if (/[^a-zA-Z0-9 ]/.test(editLibelle) || /[^a-zA-Z0-9 ]/.test(editDescription)) {
            toast.error("Les champs ne doivent pas contenir de caractères spéciaux.");
            return;
        }

        let newItem = {
            id: activeItemId,
            libelle: editLibelle,
            description: editDescription,
            idM: optionValue?.value
        };

        let buttonActionUpdt = "";

        switch (action) {
            case "operation":
                if (/[^0-9 ]/.test(editDescription)){
                    toast.error("Les champs qui définissent du temps ne peuvent contenir que des données numériques.");
                    return;
                }
                if (optionValue === null){
                    toast.error("Veuillez selectionner une machine.");
                    return;
                }
                buttonActionUpdt = "updtOperation";
                break;
            case "machine":
                buttonActionUpdt = "updtMachine";
                break;
            case "realisation":
                buttonActionUpdt = "updtRealisation";
                break;
            case "poste":
                buttonActionUpdt = "updtPoste";
                break;
            default:
                break;
        }

        if (buttonActionUpdt !== "") {
            onButtonClick(buttonActionUpdt, newItem)
        }
    };

    return (
        <SECContent>
            <Heading>
                {heading}
            </Heading>
            {libelle && (
                <CustomerInfoAndControlsContainer>
                    <CustomerName>
                        {titleLibelle}
                    </CustomerName>
                    <CustomerNameAndProfileContainer>
                        <CustomerProfile>
                            {libelle}
                        </CustomerProfile>
                        {action !== "realisation" && (
                            <Input
                                type="text"
                                placeholder={libelle}
                                value={editLibelle}
                                onChange={(e) => setEditLibelle(e.target.value)}
                            />
                        )}
                    </CustomerNameAndProfileContainer>
                </CustomerInfoAndControlsContainer>
            )}
            {description && (
                <CustomerInfoAndControlsContainer>
                    <CustomerName>
                        {titleDescription}
                    </CustomerName>
                    <CustomerNameAndProfileContainer>
                        <CustomerProfile>
                            {description}
                        </CustomerProfile>
                        {action !== "realisation" && (
                            <Input
                                type="text"
                                placeholder={activeItemDescription}
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                            />
                        )}
                    </CustomerNameAndProfileContainer>
                </CustomerInfoAndControlsContainer>
            )}
            {action === "realisation" && (
                <CustomerInfoAndControlsContainer>
                    <CustomerName>
                        {titleGamme}
                    </CustomerName>
                    <CustomerNameAndProfileContainer>
                        <CustomerProfile>
                            {gamme}
                        </CustomerProfile>
                    </CustomerNameAndProfileContainer>
                </CustomerInfoAndControlsContainer>
            )}
            {action === "realisation" && (
                <CustomerInfoAndControlsContainer>
                    <CustomerName>
                        {titleOperation}
                    </CustomerName>
                    <CustomerNameAndProfileContainer>
                        <CustomerProfile>
                            {operation}
                        </CustomerProfile>
                    </CustomerNameAndProfileContainer>
                </CustomerInfoAndControlsContainer>
            )}
            {action === "realisation" && (
                <CustomerInfoAndControlsContainer>
                    <CustomerName>
                        {titleMachine}
                    </CustomerName>
                    <CustomerNameAndProfileContainer>
                        <CustomerProfile>
                            {machine}
                        </CustomerProfile>
                    </CustomerNameAndProfileContainer>
                </CustomerInfoAndControlsContainer>
            )}
            {action === "realisation" && (
                <CustomerInfoAndControlsContainer>
                    <CustomerName>
                        {titleTFab}
                    </CustomerName>
                    <CustomerNameAndProfileContainer>
                        <CustomerProfile>
                            {tFab}
                        </CustomerProfile>
                    </CustomerNameAndProfileContainer>
                </CustomerInfoAndControlsContainer>
            )}
            {action === "realisation" && (
                <CustomerInfoAndControlsContainer>
                    <CustomerName>
                        {titleDFab}
                    </CustomerName>
                    <CustomerNameAndProfileContainer>
                        <CustomerProfile>
                            {dFab}
                        </CustomerProfile>
                    </CustomerNameAndProfileContainer>
                </CustomerInfoAndControlsContainer>
            )}
            {activeItemIDM && action !== "realisation" && (
                <CustomerInfoAndControlsContainer>
                    <CustomerName>
                        Machine rattachée
                    </CustomerName>
                    <CustomerNameAndProfileContainer>
                        <CustomerProfile>
                            {labelleForIDM}
                        </CustomerProfile>
                        <Select
                            value={options.find(option => option.value === optionValue?.value)}
                            options={options}
                            isSearchable={true}
                            onChange={(selectedOption) => setOptionValue(selectedOption)}
                        />
                    </CustomerNameAndProfileContainer>
                </CustomerInfoAndControlsContainer>
            )}
            <CustomerInfoAndControlsContainer>
                <CustomerName>
                    {titleCreatedAt}
                </CustomerName>
                <CustomerNameAndProfileContainer>
                    <CustomerProfile>
                        {textCreatedAt}
                    </CustomerProfile>
                </CustomerNameAndProfileContainer>
            </CustomerInfoAndControlsContainer>
            {action !== "realisation" && (
                <CustomerInfoAndControlsContainer>
                    <CustomerName>
                        {titleUpdatedAt}
                    </CustomerName>
                    <CustomerNameAndProfileContainer>
                        <CustomerProfile>
                            {textUpdatedAt}
                        </CustomerProfile>
                    </CustomerNameAndProfileContainer>
                </CustomerInfoAndControlsContainer>
            )}
            {titleCreatedAt && action !== "realisation" &&(
                <ButtonUpdateContainer>
                    <UpdateButton onClick={handleUpdate}>
                        <PlusIcon />
                    </UpdateButton>
                </ButtonUpdateContainer>
            )}
        </SECContent>
    );
};
