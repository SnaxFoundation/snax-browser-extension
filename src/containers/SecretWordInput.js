import React from 'react';
import styled from 'styled-components';
import { TextField } from '../components';
import styleConstants from '../styles/style-constants';

const Wrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1.5em 1fr;
  grid-gap: ${styleConstants.baseModule}px;
`;

const Number = styled.span`
  font-size: ${styleConstants.fontSize.body}px;
  color: ${styleConstants.textColor.medium};
  text-align: right;
`;

export const SecretWordInput = ({ number, value, wrapperProps, ...props }) => (
  <Wrapper {...wrapperProps}>
    <Number>{number}</Number>
    <TextField value={value} {...props} />
  </Wrapper>
);
