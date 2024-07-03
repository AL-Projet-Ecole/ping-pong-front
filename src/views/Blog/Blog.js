import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton } from "components/misc/Buttons";
import ModalAddForm from "components/forms/AddPostForm";
import ModalUpdateForm from "components/forms/UpdatePostForm";
import { ReactComponent as PlusIcon } from "feather-icons/dist/icons/plus.svg";
import { ReactComponent as MinusIcon } from "feather-icons/dist/icons/minus.svg";
import { LoadPost, getAllComByIdPost, DeletePost } from "models/DummyApi";

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900`;
const Posts = tw.div`mt-6 sm:-mr-8 flex flex-wrap`;
const PostContainer = styled.div`
  ${tw`mt-10 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`}
  ${props =>
    props.featured &&
    css`
      ${tw`w-full!`}
      ${Post} {
        ${tw`sm:flex-row! h-full sm:pr-4`}
      }
      ${Image} {
        ${tw`sm:h-96 sm:min-h-full sm:w-1/2 lg:w-2/3 sm:rounded-t-none sm:rounded-l-lg`}
      }
      ${Info} {
        ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0`}
      }
      ${Description} {
        ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
      }
    `}
`;
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`;
const Image = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;
const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const Category = styled.div`
  ${tw`uppercase text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`}
  color: ${props => (props.clicked ? "#FF9D18" : "inherit")};
`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Title = styled.div`
  ${tw`mt-1 font-black text-2xl group-hover:text-primary-500 transition duration-300`}
  color: ${props => (props.clicked ? "#FF9D18" : "inherit")};
`;
const Description = tw.div``;
const HeaderPost = styled.div`
  ${tw`cursor-pointer`}
`;
const QuestionToggleIcon = styled.span`
  ${tw`ml-2 bg-primary-500 text-gray-100 p-1 rounded-full group-hover:bg-primary-700 group-hover:text-gray-200 transition duration-300`}
  svg {
    ${tw`w-4 h-4`}
  }
`;
const Answer = motion(tw.dd`pointer-events-none text-sm sm:text-base leading-relaxed border-t border-gray-300 p-2`);
const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;

const AddPostButton = tw(PrimaryButton)`mt-16 mx-auto`;
const UpdatePostButton = tw(PrimaryButton)`mt-16 mx-auto`;
const DeletePostButton = tw(PrimaryButton)`mt-16 mx-auto`;

export default ({ headingText = "Blog Posts", token }) => {
  const [visible, setVisible] = useState(7);
  const [showAddModal, setshowAddModal] = useState(false);
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const [allPost, setAllPost] = useState([]);
  const [activeIdPost, setActiveIdPost] = useState(null);
  const [allComs, setAllComs] = useState([]);
  const [postColors, setPostColors] = useState([]);

  useEffect(() => {
    if (token === "") {
      window.location.href = "/Login";
    } else {
      LoadPost().then(data => {
        setAllPost(data);
        const initialColors = data.map(() => ({ clicked: false }));
        setPostColors(initialColors);
      });
    }
  }, [token]);

  const onLoadMoreClick = () => {
    setVisible(v => v + 6);
  };

  const openModalAddPost = () => {
    setshowAddModal(true);
  };

  const openModalUpdatePost = () => {
    setshowUpdateModal(true)
  };

  const handleDeletePost = (idPost) => {
    DeletePost(idPost)
      .then(console.log("C'est bon c'est supprimer"))
  };

  const toggleCom = idPost => {
    if (activeIdPost === idPost) {
      setActiveIdPost("");
    } else {
      setActiveIdPost(idPost);
      getAllComByIdPost(idPost).then(data => {
        setAllComs(data);
      });
    }
  };

  return (
    <AnimationRevealPage>
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>{headingText}</Heading>
          </HeadingRow>
          <ButtonContainer>
            <AddPostButton onClick={openModalAddPost}>Ajouter un post</AddPostButton>
            <UpdatePostButton onClick={openModalUpdatePost}>Modifier le post sélectionné</UpdatePostButton>
            <DeletePostButton onClick={() => handleDeletePost(activeIdPost)}>Supprimer le post selectionné</DeletePostButton>
          </ButtonContainer>
          {showAddModal && <ModalAddForm isOpen={showAddModal} onClose={() => setshowAddModal(false)} />}
          {showUpdateModal && <ModalUpdateForm isOpen={showUpdateModal} activeIdPost={activeIdPost} onClose={() => setshowUpdateModal(false)} />}
          <Posts>
            {allPost.length > 0 &&
              allPost.slice(0, visible).map((post, index) => (
                <PostContainer key={index} featured={true}>
                  <Post className="group">
                    <Info>
                      <HeaderPost
                        onClick={() => {
                          toggleCom(post.id);
                          const updatedColors = postColors.map((color, idx) =>
                            idx === index ? { ...color, clicked: true } : { ...color, clicked: false }
                          );
                          setPostColors(updatedColors);
                        }}
                      >
                        <Category clicked={postColors[index]?.clicked}>
                          {post.tags[0]} {post.tags[1]} {post.tags[2]}
                        </Category>
                        <CreationDate>{post.reactions.likes} réaction/s</CreationDate>
                        <Title clicked={postColors[index]?.clicked}>{post.title}</Title>
                      </HeaderPost>
                      {post.body && (
                        <Description>
                          {post.body}
                          {activeIdPost === post.id &&
                            allComs.length > 0 &&
                            allComs.map((com, index) => (
                              <Answer
                                key={index}
                                variants={{
                                  open: { opacity: 1, height: "auto", marginTop: "10px" },
                                  collapsed: { opacity: 0, height: 0, marginTop: "0px" },
                                }}
                                initial="collapsed"
                                animate={activeIdPost === post.id ? "open" : "collapsed"}
                                transition={{ duration: 0.1, ease: [0.175, 0.85, 0.42, 0.96] }}
                              >
                                {com.user.username} : {com.body}
                              </Answer>
                            ))}
                          <ButtonContainer>
                            <LoadMoreButton onClick={onLoadMoreClick}>Ajouter un commentaire</LoadMoreButton>
                          </ButtonContainer>
                        </Description>
                      )}
                    </Info>
                    <QuestionToggleIcon>
                      {activeIdPost === post.id ? <MinusIcon /> : <PlusIcon />}
                    </QuestionToggleIcon>
                  </Post>
                </PostContainer>
              ))}
          </Posts>
          {visible < allPost.length && (
            <ButtonContainer>
              <LoadMoreButton onClick={onLoadMoreClick}>Afficher plus</LoadMoreButton>
            </ButtonContainer>
          )}
        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
