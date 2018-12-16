import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Color from 'color';
import { Link } from 'react-router-dom';
import constants from '../../styles/style-constants';
import colorMap from './constants';

const propTypes = {
  disabled: PropTypes.bool,
  spread: PropTypes.bool,
  size: PropTypes.oneOf(['default', 'small']),
  colorScheme: PropTypes.oneOf(['primary', 'secondary', 'flat']),
};

const defaultProps = {
  disabled: false,
  spread: false,
  size: 'default',
  colorScheme: 'primary',
};

const sizeMap = {
  default: {
    lineHeight: 1.4,
    borderRadius: `${constants.borderRadius}px`,
    fontSize: constants.fontSize.button,
    padding: '0.75em 1.5em',
  },

  small: {
    lineHeight: 1.4,
    borderRadius: `${constants.borderRadius}px`,
    fontSize: constants.fontSize.body,
    padding: '0.5em 1.5em',
  },
};

const colorScheme = ({ colorScheme = 'primary', disabled }) =>
  disabled
    ? `
    &,
    &:hover,
    &:focus {
      background-color: rgba(180,180,180,0.1);
      color: ${constants.textColor.medium};
      cursor: default;
      pointer-events: none;
    }
  `
    : css`
        background-color: ${colorMap[colorScheme].bgColor};
        border-color: ${colorMap[colorScheme].bgColor};
        color: ${colorMap[colorScheme].color};

        &:hover,
        &:focus {
          border-color: ${colorMap[colorScheme].bgColorHover};
          background-color: ${colorMap[colorScheme].bgColorHover};
        }
      `;

const size = ({ size = 'default' }) => `
  line-height: ${sizeMap[size].lineHeight};
  border-radius: ${sizeMap[size].borderRadius};
  font-size: ${sizeMap[size].fontSize}px;
  padding: ${sizeMap[size].padding};
`;

export const Button = styled.button`
  &,
  &:hover,
  &:focus {
    outline: none;
  }

  display: inline-flex;
  font-weight: ${constants.fontWeight.bold};
  border: 0px solid;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  text-align: center;
  justify-content: center;
  align-items: center;
  transition: 150ms ease-in;
  transition-property: opacity, background, border, box-shadow;

  ${props => props.spread && 'flex-grow: 1;'};

  ${colorScheme};
  ${size};
`;

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export const ButtonLink = Button.withComponent(Link);
