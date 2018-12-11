import React from "react";
import styled from "styled-components";
import { TagLink, IconTwitter } from "../components";
import styleConstants from "../styles/style-constants";

const iconMap = {
  twitter: <IconTwitter color={styleConstants.brandColor.twitter} />
};

const Wrapper = styled.div`
  display: grid;
  grid-gap: 3px;
  grid-template-columns: min-content max-content;
`;

const Prefix = styled.span`
  font-size: ${styleConstants.fontSize.body}px;
  font-weight: ${styleConstants.fontWeight.bold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const TransactionRecipient = ({ type, name, ...props }) => (
  <Wrapper {...props}>
    <Prefix>to: </Prefix>
    <TagLink
      to={`https://twitter.com/${name}`}
      text={name}
      icon={iconMap[type]}
    />
  </Wrapper>
);
