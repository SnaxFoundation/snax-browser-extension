import styled, { css, keyframes } from 'styled-components';
import Color from 'color';
import PropTypes from 'prop-types';
import constants from '../../styles/style-constants';
import colorMap from './constants';

const propTypes = {
  loading: PropTypes.bool,
};

const defaultProps = {
  loading: false,
};

const loaderSize = '1.5em';

const loaderAnim = keyframes`
  0 {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const sizeMap = {
  default: {
    lineHeight: 1.4,
    borderRadius: `${constants.borderRadius}px`,
    fontSize: constants.fontSize.button,
    padding: '0.5em 1.5em',
    minHeight: 0,
  },

  small: {
    lineHeight: 1.4,
    borderRadius: `${constants.borderRadius}px`,
    fontSize: constants.fontSize.body,
    padding: '0.5em 1.5em',
    minHeight: 0,
  },

  large: {
    lineHeight: 1.4,
    borderRadius: `${constants.borderRadius}px`,
    fontSize: 22,
    padding: '0.75em 2em',
    minHeight: 0,
  },
};

const disabledStyles = `
  &,
  &:hover,
  &:focus {
    color: ${constants.textColor.medium};
    background-color: ${Color(constants.paletteBlueGrey[500]).alpha(0.2)};
    border-color: ${Color(constants.paletteBlueGrey[500]).alpha(0.2)};
    cursor: default;
  }
`;

const colorSchemeStyles = ({ outlined, colorScheme = 'primary' }) =>
  outlined
    ? `
    color: ${colorMap[colorScheme].bgColor};
    background-color: transparent;
    border-color: ${colorMap[colorScheme].bgColor};
    
    &:hover,
    &:focus {
      background-color: ${Color(colorMap[colorScheme].bgColorHover).alpha(0.1)};
      border-color: ${colorMap[colorScheme].bgColorHover};
    }

    ${colorScheme === 'flat' &&
      `
      color: ${colorMap[colorScheme].color};
      background-color: transparent;
      border-color: ${colorMap[colorScheme].color};
      
      &:hover,
      &:focus {
        background-color: ${Color(colorMap[colorScheme].bgColorHover).alpha(
          0.1
        )};
        border-color: ${colorMap[colorScheme].color};
      }
    
    `}
  `
    : css`
        color: ${colorMap[colorScheme].color};
        background-color: ${colorMap[colorScheme].bgColor};
        border-color: ${colorMap[colorScheme].bgColor};

        &:hover,
        &:focus {
          background-color: ${colorMap[colorScheme].bgColorHover};
          border-color: ${colorMap[colorScheme].bgColorHover};
        }
      `;

const style = ({ disabled }) => (disabled ? disabledStyles : colorSchemeStyles);

const size = ({ size = 'default' }) => css`
  line-height: ${sizeMap[size].lineHeight};
  border-radius: ${sizeMap[size].borderRadius};
  font-size: ${sizeMap[size].fontSize}px;
  padding: ${sizeMap[size].padding};
  min-height: ${sizeMap[size].minHeight}px;
  min-width: ${sizeMap[size].minHeight}px;
`;

const loader = ({ loading, colorScheme = 'primary' }) =>
  loading
    ? css`
        pointer-events: none;

        &::before,
        &::after {
          display: block;
          content: '';
          position: absolute;
        }

        &::before {
          z-index: 2;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: ${Color(
            colorMap[colorScheme].bgColorHover
          ).string()};
          color: ${colorMap[colorScheme].color};
        }

        &::after {
          z-index: 3;
          top: calc(50% - ${loaderSize} / 2);
          left: calc(50% - ${loaderSize} / 2);
          transform-origin: center center;
          width: ${loaderSize};
          height: ${loaderSize};
          border-radius: 50%;
          border: 2px solid currentColor;
          border-left-color: transparent;
          animation-iteration-count: infinite;
          animation-duration: 500ms;
          animation-name: ${loaderAnim};
          animation-timing-function: linear;
        }
      `
    : null;

export const Button = styled.button`
  &,
  &:hover,
  &:focus {
    outline: none;
  }

  display: inline-flex;
  font-weight: ${constants.fontWeight.bold};
  border: 1px solid;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  text-align: center;
  justify-content: center;
  align-items: center;
  transition: 150ms ease-in;
  transition-property: opacity, background, border, box-shadow;
  position: relative;

  > * + * {
    margin-left: 0.75em;
  }

  ${size};
  ${loader};
  ${style};

  ${props => props.spread && 'flex-grow: 1;'}
`;

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
