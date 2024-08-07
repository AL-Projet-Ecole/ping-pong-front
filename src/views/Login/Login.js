import React, { useRef } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import {css} from "styled-components/macro"; //eslint-disable-line
import illustration from "../../assets/images/ping-pong-logo1.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { LoginApi } from "../../models/AuthModel"; // Updated the import path


const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

export default ({
                  logoLinkUrl = "#",
                  tokenManager,
                  illustrationImageSrc = illustration,
                  headingText = "Authentification",
                  submitButtonText = "Se connecter",
                  SubmitButtonIcon = LoginIcon,
                  forgotPasswordUrl = "#",
                  signupUrl = "#",
                }) => {
  const username = useRef(null);
  const password = useRef(null);

  const handleLogin = () => {
    const email = username.current.value;
    const pass = password.current.value;
    LoginApi(email, pass)
        .then(data => {
          tokenManager(data.token);
        })
        .catch(error => {
          console.error('Login failed', error);
        });
  };

  return (
      <AnimationRevealPage>
        <Container>
          <Content>
            <MainContainer>
              <MainContent>
                <Heading>{headingText}</Heading>
                <FormContainer>
                  <Input ref={username} placeholder="Username" />
                  <Input ref={password} type="password" placeholder="Password" />
                  <SubmitButton onClick={handleLogin}>
                    <LoginIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>
                </FormContainer>
              </MainContent>
            </MainContainer>
            <IllustrationContainer>
              <IllustrationImage imageSrc={illustrationImageSrc} />
            </IllustrationContainer>
          </Content>
        </Container>
      </AnimationRevealPage>
  );
}
