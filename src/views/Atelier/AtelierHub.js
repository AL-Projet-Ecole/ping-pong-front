import React from "react";
import { Link } from "react-router-dom"; // Importez Link depuis react-router-dom
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import { SectionHeading } from "components/misc/Headings.js";

import defaultCardImage from "../../assets/images/shield-icon.svg";

import { ReactComponent as SvgDecoratorBlob3 } from "../../assets/images/svg-decorator-blob-3.svg";

import ShieldIconImage from "../../assets/images/shield-icon.svg";
import FastIconImage from "../../assets/images/fast-icon.svg";
import ReliableIconImage from "../../assets/images/reliable-icon.svg";

const Container = tw.div`relative`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-xl mx-auto py-20 md:py-24`}
`;
const Heading = tw(SectionHeading)`w-full`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 px-6 flex`}
`;

const Card = styled.div`
  ${tw`flex flex-col mx-auto items-center px-6 py-10 border-2 border-dashed border-primary-500 rounded-lg mt-12 transition-transform duration-300`}
  width: 350px; /* Largeur standard des cartes */
  height: 300px; /* Hauteur standard des cartes */
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  .imageContainer {
    ${tw`border-2 border-primary-500 text-center rounded-full p-6 flex-shrink-0 relative`}
    img {
      ${tw`w-8 h-8`}
    }
  }

  .textContainer {
    ${tw`mt-6 text-center`}
  }

  .title {
    ${tw`mt-2 font-bold text-xl leading-none text-primary-500`}
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 `}
`;

export default () => {
    const cards = [
        { imageSrc: ShieldIconImage, title: "Gammes", link: "/Gammes" },
        { imageSrc: ReliableIconImage, title: "Stock", link: "/Stock" },
        { imageSrc: FastIconImage, title: "Réalisations", link: "/Realisations" },
        { imageSrc: FastIconImage, title: "Opérations", link: "/Operations" },
        { imageSrc: ShieldIconImage, title: "Postes", link: "/Postes" },
        { imageSrc: ShieldIconImage, title: "Machines", link: "/Machines" },
    ];

    return (
        <AnimationRevealPage>
            <Container>
                <ThreeColumnContainer>
                    <Heading><span tw="text-primary-500">Hub</span> Atelier</Heading>
                    {cards.map((card, i) => (
                        <Column key={i}>
                            <Link to={card.link}>
                                <Card>
                                    <span className="imageContainer">
                                        <img src={card.imageSrc || defaultCardImage} alt="" />
                                    </span>
                                    <span className="textContainer">
                                        <span className="title">{card.title || "Fully Secure"}</span>
                                    </span>
                                </Card>
                            </Link>
                        </Column>
                    ))}
                </ThreeColumnContainer>
                <DecoratorBlob />
            </Container>
        </AnimationRevealPage>
    );
};
