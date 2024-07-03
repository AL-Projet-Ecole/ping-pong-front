import React, { useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { loadUsers } from "../../models/UserModel";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ContentWithPaddingXl, Container } from "components/misc/Layouts.js";
import { SectionHeading} from "components/misc/Headings.js";
import { ReactComponent as TwitterIcon } from "../../assets/images/twitter-icon.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/images/linkedin-icon.svg";
import { ReactComponent as GithubIcon } from "../../assets/images/github-icon.svg";
import defaultProfilePic from "../../assets/profilePictures/defaultPP.png";

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

    useEffect(() => {
        loadUsers().then(data => {
            setAllUsers(data);
        });
    }, []);

    return (
        <AnimationRevealPage>
            <Container>
                <ContentWithPaddingXl>
                    <HeadingContainer>
                        {heading && <Heading>{heading}</Heading>}
                    </HeadingContainer>
                    <Users>
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
                            </User>
                        ))}
                    </Users>
                </ContentWithPaddingXl>
            </Container>
        </AnimationRevealPage>
    );
};
