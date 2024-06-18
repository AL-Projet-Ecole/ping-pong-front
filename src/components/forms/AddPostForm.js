import React, { useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "../../assets/images/email-illustration.svg";
import { AddPost } from "../../models/DummyApi";
import { toast } from "react-toastify";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`
const FormContainer = tw.div`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24`}
`

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`

export default ({
  heading = <>Création de post</>,
  description = "Vous pouvez discuter de n'importe quel sujet. Cependant, il est interdit d'insulter ou de harceler de quelque manière que ce soit.",
  submitButtonText = "Envoyer",
  cancelButtonText = "Annuler",
  textOnLeft = true,
  titleInput = useRef(null),
  bodyInput = useRef(null),
  onClose,
}) => {
    const handleAddPost = () => {
      const title = titleInput.current.value;
      const body = bodyInput.current.value;
      toast.success("Votre message a été envoyé avec succès !")
      AddPost(title, body)
        .then(onClose())
  };
  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={EmailIllustrationSrc} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Heading>{heading}</Heading>
            {description && <Description>{description}</Description>}
            <FormContainer>
              <Input type="text" ref={titleInput} placeholder="Sujet" />
              <Textarea ref={bodyInput} placeholder="Contenu du sujet" />
              <SubmitButton onClick={handleAddPost}>{submitButtonText}</SubmitButton>
            </FormContainer>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
