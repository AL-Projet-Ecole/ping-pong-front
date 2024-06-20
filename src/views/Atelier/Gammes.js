import React, {useEffect, useState} from "react";
import { loadGammes } from "../../models/GammeModel";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { ReactComponent as PlusIcon } from "feather-icons/dist/icons/plus.svg";
import { ReactComponent as MinusIcon } from "feather-icons/dist/icons/minus.svg";
import {loadOperations} from "../../models/OperationModel";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const TwoColumn = tw.div`flex`;
const Column = tw.div``;

const PostsContainer = tw.div`mt-12 flex flex-col sm:flex-row sm:justify-between lg:justify-start`;
const Post = tw(motion.a)`block sm:max-w-sm cursor-pointer mb-16 last:mb-0 sm:mb-0 sm:odd:mr-8 lg:mr-8 xl:mr-16`;
const Title = tw.h5`mt-6 text-xl font-bold transition duration-300 group-hover:text-primary-500`;
const AuthorName = tw.h6`font-semibold text-lg`;
const PostTextContainer = tw.div``

const Image = styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    props.imageContain ? tw`bg-contain bg-no-repeat` : tw`bg-cover`,
    props.imageShadow ? tw`shadow` : tw`shadow-none`,
    tw`hidden lg:block rounded h-144 bg-center`
]);
const RecentPostsContainer = styled.div`
  ${tw`mt-24 lg:mt-0 border-r-4`}
  ${PostsContainer} {
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


const FAQContent = tw.div`lg:ml-12`;
const Subheading = tw(SubheadingBase)`mb-4 text-center lg:text-left`;
const Heading = tw(SectionHeading)`lg:text-left`;

const FAQSContainer = tw.dl`mt-12`;
const FAQ = tw.div`cursor-pointer mt-8 select-none border lg:border-0 px-8 py-4 lg:p-0 rounded-lg lg:rounded-none`;
const Question = tw.dt`flex justify-between items-center`;
const QuestionText = tw.span`text-lg lg:text-xl font-semibold`;
const QuestionToggleIcon = styled.span`
  ${tw`ml-2 bg-primary-500 text-gray-100 p-1 rounded-full group-hover:bg-primary-700 group-hover:text-gray-200 transition duration-300`}
  svg {
    ${tw`w-4 h-4`}
  }
`;
const Answer = motion(tw.dd`pointer-events-none text-sm sm:text-base leading-relaxed`);

export default ({
                    subheading = "",
                    heading = "Opérations",
                    faqs = null
                }) => {

    const [allGammes, setAllGammes] = useState([]);

    const [allOperations, setAllOperations] = useState([]);

    useEffect(() => {
        loadGammes().then(data => {
            setAllGammes(data);
        });
    }, []);

    // Simulation de la database
    const defaultFaqs = [
        {
            question: "Découpage lazer du bois pour la raquette.",
            answer:
                "blablabla."
        },
        {
            question: "Ficelage du filet pour la table.",
            answer:
                "blablabla."
        },
        {
            question: "Assemblage des pieds de la table.",
            answer:
                " blablabla."
        },
        {
            question: "Peinture en vert de la surface de la table",
            answer:
                "blablabla. "
        }
    ];

    if (!faqs || faqs.length === 0) faqs = defaultFaqs;

    const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

    const toggleQuestion = questionIndex => {
        if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
        else setActiveQuestionIndex(questionIndex);
    };

    return (
        <Container>
            <Content>
                <TwoColumn>
                    <Column tw="hidden lg:block w-4/12 flex-shrink-0">
                        <RecentPostsContainer>
                            <Heading>Gammes</Heading>
                            <PostsContainer>
                                {allGammes.length > 0 && allGammes.map((gamme, index) => (
                                    <Post key={index} onClick={loadOperations(gamme.id_gamme)} className="group">
                                        <PostTextContainer>
                                            <Title>{gamme.titre_gamme}</Title>
                                        </PostTextContainer>
                                        <Image $imageSrc={gamme.postImageSrc} />
                                    </Post>
                                ))}
                            </PostsContainer>
                        </RecentPostsContainer>
                    </Column>
                    <Column>
                        <FAQContent>
                            {subheading ? <Subheading>{subheading}</Subheading> : null}
                            <Heading>{heading}</Heading>
                            <FAQSContainer>
                                {allOperations.length > 0 && allOperations.map((operation, index) => (
                                    <FAQ
                                        key={index}
                                        onClick={() => {
                                            toggleQuestion(index);
                                        }}
                                        className="group"
                                    >
                                        <Question>
                                            <QuestionText>{operation.question}</QuestionText>
                                            <QuestionToggleIcon>
                                                {activeQuestionIndex === index ? <MinusIcon /> : <PlusIcon />}
                                            </QuestionToggleIcon>
                                        </Question>
                                        <Answer
                                            variants={{
                                                open: { opacity: 1, height: "auto", marginTop: "16px" },
                                                collapsed: { opacity: 0, height: 0, marginTop: "0px" }
                                            }}
                                            initial="collapsed"
                                            animate={activeQuestionIndex === index ? "open" : "collapsed"}
                                            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        >
                                            {operation.answer}
                                        </Answer>
                                    </FAQ>
                                ))}
                            </FAQSContainer>
                        </FAQContent>
                    </Column>
                </TwoColumn>
            </Content>
        </Container>
    );
};
