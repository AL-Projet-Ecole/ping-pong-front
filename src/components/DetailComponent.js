import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled, { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { ReactComponent as QuoteIconBase } from "../assets/images/quotes-l.svg"

import "slick-carousel/slick/slick.css";
import {
    SearchInput,
    AddButton,
    DeleteButton,
    Post,
    TextContainer,
    Title,
    GlobalFirstContainer,
    FirstContainer,
    Heading,
    SearchInputContainer, SECContent
} from "./CommonStyledComponents";

const CustomerInfoAndControlsContainer = tw.div`mt-8 flex flex-col sm:flex-row  sm:text-left`
const CustomerImage = tw.img`w-16 h-16 rounded-full`
const CustomerNameAndProfileContainer = tw.div`mt-4 sm:mt-0 sm:ml-4 flex flex-col`
const CustomerName = tw.span`text-lg font-semibold`
const CustomerProfile = tw.span`text-sm font-normal text-gray-700`

export default ({
                    action,
                    heading = "Détails",
                    src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=256&h=256&q=80",
                    activeItemId,
                    activeItemDescription,
                    activeItemQuantite,
                    activeItemPrix,
                    activeItemProvenance
                }) => {
    const [titleDescription, setTitleDescription] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        switch (action) {
            case "operation":
                setTitleDescription("Temps estimé à la réalisation de l'opération");
                setDescription(activeItemDescription + " minutes.")
                break;
            case "gamme":

                break;
            case "machine":

                break;
            case "poste":

                break;
            case "realisation":
                break;
            default:
                break;
        }
    }, [activeItemId]);
    return (
        <SECContent>
            <Heading>
                {heading}
            </Heading>
            <CustomerInfoAndControlsContainer>
                <CustomerNameAndProfileContainer>
                    <CustomerName>
                        {titleDescription}
                    </CustomerName>
                    <CustomerProfile>
                        {description}
                    </CustomerProfile>
                </CustomerNameAndProfileContainer>
            </CustomerInfoAndControlsContainer>
        </SECContent>
    );
};
