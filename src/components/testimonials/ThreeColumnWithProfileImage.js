import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ContentWithPaddingXl, Container } from "components/misc/Layouts.js";
import {SectionHeading as Heading, Subheading as SubheadingBase} from "components/misc/Headings.js";
import { ReactComponent as SvgDecoratorBlob1 } from "../../assets/images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../assets/images/svg-decorator-blob-8.svg";

const AdminUser = tw.div`flex flex-col lg:flex-row items-center lg:items-stretch`;
const TestimonialContainer = tw.div`mt-16 lg:w-1/3`;
const Testimonial = tw.div`px-4 text-center max-w-xs mx-auto flex flex-col items-center`;
const Image = tw.img`w-20 h-20 rounded-full`;
const CustomerName = tw.p`mt-3 text-gray-900 font-semibold uppercase text-sm tracking-wide`;
const Subheading = tw(SubheadingBase)`mt-5 text-center`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute left-0 top-0 h-56 w-56 opacity-15 transform -translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute right-0 bottom-0 h-64 w-64 opacity-15 transform translate-x-2/3 text-yellow-500`}
`;

export default ({
  heading = "Administration des utilisateurs",
  users = [
    {
      imageSrc:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80",
      customerName: "Charlotte Hale",
      role: "Chef technique"
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
      customerName: "Adam Cuppy",
      role: "Commercial"
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1580852300654-03c803a14e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4.25&w=512&h=512&q=80",
      customerName: "Steven Marcetti",
      role: "CEO"
    }
  ]
}) => {
  return (
    <Container>
      <ContentWithPaddingXl>
        <Heading>{heading}</Heading>
        <AdminUser>
          {users.map((user, index) => (
            <TestimonialContainer key={index}>
              <Testimonial>
                <Image src={user.imageSrc} />
                <Subheading>{user.role}</Subheading>
                <CustomerName>{user.customerName}</CustomerName>
              </Testimonial>
            </TestimonialContainer>
          ))}
        </AdminUser>
      </ContentWithPaddingXl>

      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};
