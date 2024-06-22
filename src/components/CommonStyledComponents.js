import tw from "twin.macro";
import { motion } from "framer-motion";
import styled from "styled-components";
import Modal from "react-modal";
import {SectionHeading, Subheading as SubheadingBase} from "./misc/Headings";

export const Container = tw.div`relative min-h-screen bg-gray-100`;
export const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20 min-h-full`;

export const TwoColumn = tw.div`flex flex-col lg:flex-row`;
export const Column = tw.div``;

export const FirstContainer = tw.div`mt-12 flex flex-col sm:flex-row sm:justify-between lg:justify-start`;
export const Post = tw(motion.a)`block sm:max-w-sm cursor-pointer mb-16 last:mb-0 sm:mb-0 sm:odd:mr-8 lg:mr-8 xl:mr-16`;
export const Title = tw.h5`mt-6 text-xl font-bold transition duration-300 group-hover:text-primary-500`;
export const AuthorName = tw.h6`font-semibold text-lg`;
export const PostTextContainer = tw.div``;

export const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  props.imageContain ? tw`bg-contain bg-no-repeat` : tw`bg-cover`,
  props.imageShadow ? tw`shadow` : tw`shadow-none`,
  tw`hidden lg:block rounded h-144 bg-center`
]);

export const GlobalFirstContainer = styled.div`
  ${tw`mt-24 pr-10 lg:mt-0 border-r-4`}
  ${FirstContainer} {
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

export const SECContent = tw.div`lg:ml-12`;
export const Subheading = tw(SubheadingBase)`mb-4 text-center lg:text-left`;
export const Heading = styled(SectionHeading)`
  ${tw`lg:text-left flex `}
`;

export const SecondeContainer = tw.dl`mt-12`;
export const SEC = tw.div`cursor-pointer mt-8 select-none border lg:border-0 px-8 py-4 lg:p-0 rounded-lg lg:rounded-none`;
export const Seconde = tw.dt`flex justify-between items-center`;
export const SecondeText = tw.span`text-lg lg:text-xl font-semibold`;
export const SecondeToggleIcon = styled.span`
  ${tw`ml-2 bg-primary-500 text-gray-100 p-1 rounded-full group-hover:bg-primary-700 group-hover:text-gray-200 transition duration-300`}
  svg {
    ${tw`w-4 h-4`}
  }
`;
export const Answer = motion(tw.dd`pointer-events-none text-sm sm:text-base leading-relaxed`);

export const SearchInputContainer = tw.div`flex items-center`;
export const SearchInput = styled.input`
  ${tw`border px-2 py-1 rounded-lg text-sm`} /* Utiliser une taille de police plus petite */
  ${tw`w-40 ml-2`} /* Réduire la largeur de la barre de recherche et ajouter une marge à gauche */
`;

export const AddButton = styled.button`
  ${tw`ml-4 p-2 rounded-full bg-green-500 text-white flex items-center justify-center`}
  &:hover {
    ${tw`bg-green-700`}
  }
  svg {
    ${tw`w-6 h-6`}
  }
`;

export const DeleteButton = styled.button`
  ${tw`ml-4 p-2 rounded-full bg-red-500 text-white flex items-center justify-center`}
  width: 30px; /* Ajuster la largeur */
  height: 30px; /* Ajuster la hauteur */
  &:hover {
    ${tw`bg-red-700`}
  }
  svg {
    ${tw`w-3 h-3`} /* Ajuster la taille de l'icône */
  }
`;

export const ConfirmationModal = styled(({ className, ...props }) => (
    <Modal {...props} className={className} />
))`
  ${tw`p-8 bg-white rounded-lg shadow-lg`}
`;

export const ModalHeader = styled.div`
  /* Styles de l'en-tête du modal */
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ModalBody = styled.div`
  /* Styles du corps du modal */
  margin-bottom: 20px;
`;

export const ModalFooter = styled.div`
  /* Styles du pied du modal */
  text-align: right;
`;

export const Button = styled.button`
  /* Styles du bouton */
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Input = styled.input`
  /* Styles de l'input */
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Textarea = styled.textarea`
  /* Styles du textarea */
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

// Export du composant Modal
export { Modal };
