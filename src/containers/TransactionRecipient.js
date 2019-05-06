import React from 'react';
import styled from 'styled-components';
import Color from 'color';
import { Tag, IconTwitter, IconSnax, IconSteem } from '../components';
import styleConstants from '../styles/style-constants';

const iconMap = {
  twitter: (
    <IconTwitter color={styleConstants.brandColor.twitter} size="inherit" />
  ),
  snax: <IconSnax size="inherit" />,
  steem: <IconSteem color={styleConstants.brandColor.steem} size="inherit" />,
};

const Wrapper = styled.div`
  display: grid;
  grid-gap: 3px;
  grid-template-columns: min-content max-content;
  font-size: 16px;
  align-items: center;
`;

const Prefix = styled.span`
  font-weight: ${styleConstants.fontWeight.bold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.8em;
  color: ${styleConstants.textColor.medium};
`;

export const TransactionRecipient = ({ type, name, ...props }) => (
  <Wrapper {...props}>
    <Prefix>to: </Prefix>
    <Tag
      text={name}
      icon={iconMap[type]}
      style={{
        backgroundColor: Color(
          styleConstants.brandColor[type] || styleConstants.paletteBlueGrey[900]
        ).alpha(0.1),
      }}
    />
  </Wrapper>
);
