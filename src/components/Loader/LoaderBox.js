import React from 'react';
import styled, { keyframes } from 'styled-components';
import constants from '../../styles/style-constants';

const flash = keyframes`
  from, 50%, 100% {
    opacity: 1;
  }

  25%, 75% {
    opacity: 0.3;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex-grow: 1;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: ${constants.colorBody};
`;

const Text = styled.div`
  color: ${constants.color.medium};
  text-align: center;
  font-weight: ${constants.fontWeight.light};
  font-size: 44px;
  animation-iteration-count: infinite;
  animation-duration: 10s;
  animation-fill-mode: both;
  animation-direction: alternate;
  animation-name: ${flash};
`;

export const LoaderBox = ({ children }) => (
  <Wrapper>
    <Text>{children}</Text>
  </Wrapper>
);
