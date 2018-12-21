import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../../styles/style-constants';

const propTypes = {
  size: PropTypes.oneOf(['small', 'default']),
  error: PropTypes.bool,
  disabled: PropTypes.bool,
};

const defaultProps = {
  size: 'default',
  error: false,
  disabled: false,
};

const colorScheme = ({ disabled }) =>
  disabled
    ? `
      &,
      &:hover,
      &:focus {
        box-shadow: none;
        outline: none;
        background-color: rgba(180,180,180,0.1);
        color: ${constants.textColor.medium};
        cursor: default;
        border: 1px solid transparent;
      }
    `
    : css`
        &,
        &:hover,
        &:focus {
          box-shadow: none;
          outline: none;
          background-color: ${constants.paletteBlueGrey[900]};
          color: currentColor;
          border: 1px solid
            ${props =>
              props.error ? constants.color.error : constants.colorBorder};
        }

        &:hover,
        &:focus {
          border-color: ${constants.color.primary};
        }
      `;

const size = ({ size }) =>
  size === 'small' ? 'padding: 0.25em 0.5em;' : 'padding: 0.75em 1em;';

export const TextField = styled.input`
  display: inline-block;
  font-size: ${constants.fontSize.body}px;
  font-family: ${constants.fontFamily.body};
  line-height: 1.5;
  border-radius: ${constants.borderRadius}px;

  max-width: 100%;
  width: 100%;
  transition: 150ms ease-in;
  transition-property: opacity, background, border, box-shadow;

  &::placeholder {
    color: ${constants.textColor.medium};
  }

  ${colorScheme};
  ${size};
`;

TextField.propTypes = propTypes;
TextField.defaultProps = defaultProps;
