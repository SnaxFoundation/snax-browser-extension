import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import constants from '../../styles/style-constants';

const loaderSize = '3em';

const loaderAnim = keyframes`
  0 {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const flash = keyframes`
  from, 50%, 100% {
    opacity: 1;
  }

  25%, 75% {
    opacity: 0.3;
  }
`;

const Spinner = styled.div`
  pointer-events: none;
  position: relative;
  width: ${loaderSize};
  height: ${loaderSize};
  margin-bottom: 1em;

  &::before,
  &::after {
    display: block;
    content: '';
    position: absolute;
  }

  &::after {
    z-index: 3;
    top: 0;
    left: 0;
    transform-origin: center center;
    width: ${loaderSize};
    height: ${loaderSize};
    border-radius: 50%;
    border: 2px solid ${constants.textColor.medium};
    border-left-color: transparent;
    animation-iteration-count: infinite;
    animation-duration: 500ms;
    animation-name: ${loaderAnim};
    animation-timing-function: linear;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: ${constants.paletteBlueGrey[900]};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  box-sizing: border-box;
`;

const flashing = ({ flashing }) =>
  flashing &&
  css`
    animation-iteration-count: infinite;
    animation-duration: 10s;
    animation-fill-mode: both;
    animation-direction: alternate;
    animation-name: ${flash};
  `;

const Text = styled.div`
  color: ${constants.color.medium};
  text-align: center;
  font-weight: ${constants.fontWeight.semibold};
  font-size: 24px;

  ${flashing};
`;

export const Loader = ({ text, hasSpinner, ...props }) => (
  <Wrapper {...props}>
    {hasSpinner && <Spinner />}
    <Text flashing={!hasSpinner}>{text}</Text>
  </Wrapper>
);

Loader.propTypes = {
  text: PropTypes.string,
  hasSpinner: PropTypes.bool,
};

Loader.defaultProps = {
  text: '',
  hasSpinner: false,
};
