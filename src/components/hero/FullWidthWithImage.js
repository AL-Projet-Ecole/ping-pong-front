import React, { useState, useEffect } from 'react';
import tw from "twin.macro";
import styled from "styled-components";

const Container = tw.div`relative -mx-8 -mt-8`;
const TwoColumn = tw.div`flex flex-col lg:flex-row bg-gray-100`;
const LeftColumn = tw.div`ml-8 mr-8 xl:pl-10 py-8`;
const RightColumn = styled.div(props => [
  `background-image: url(${props.imageSrc});`,
  tw`bg-green-500 bg-cover bg-center xl:ml-24 h-96 lg:h-auto lg:w-1/2 lg:flex-1`
]);

const Content = tw.div`mt-24 lg:mt-24 lg:mb-24 flex flex-col sm:items-center lg:items-stretch`;
const Heading = tw.h1`text-3xl sm:text-5xl md:text-6xl lg:text-5xl font-black leading-none`;
const Paragraph = tw.p`max-w-md my-8 lg:my-5 lg:my-8 sm:text-lg lg:text-base xl:text-lg leading-loose`;

const Actions = styled.div`
  ${tw`mb-8 lg:mb-0`}
  .action {
    ${tw`text-center inline-block w-full sm:w-48 py-4 font-semibold tracking-wide rounded hocus:outline-none focus:shadow-outline transition duration-300`}
  }
  .primaryAction {
    ${tw`bg-primary-500 text-gray-100 hover:bg-primary-700`}
  }
  .secondaryAction {
    ${tw`mt-4 sm:mt-0 sm:ml-4 bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800`}
  }
`;

const imgSrc = require("../../assets/images/peinture-sur-figurines-bandeau-blog-scaled.jpg");

export default ({
  heading = (
    <>
      Aizen 
      <wbr />
      <br />
      <span tw="text-primary-500">work</span>
    </>
  ),
  description = "Pièces faites mains avec passion. De leurs impressions à leurs peintures tout est géré par nos soins.",
  primaryActionUrl = "#Boutique",
  primaryActionText = "Boutique",
  tradMode
}) => {
  const [dataTrad, setdataTrad] = useState({});

  useEffect(() => {
    if (tradMode === 'fr') {
      setdataTrad({
        description : "Pièces faites mains avec passion. De leurs impressions à leurs peintures tout est géré par nos soins."
      })
    } else {
      setdataTrad({
        description : "Pièces faites mains avec passion. De leurs impressions à leurs peintures tout est géré par nos soins. EN"
      })
    }
  }, [tradMode]);

  return (
    <Container>
      <TwoColumn>
        <LeftColumn>
          <Content>
            <Heading>{heading}</Heading>
            <Paragraph>{dataTrad.description}</Paragraph>
            <Actions>
              <a href={primaryActionUrl} className="action secondaryAction">
                {primaryActionText}
              </a>
            </Actions>
          </Content>
        </LeftColumn>
        <RightColumn imageSrc={imgSrc}></RightColumn>
      </TwoColumn>
    </Container>
  );
};
