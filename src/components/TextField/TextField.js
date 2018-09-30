import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../../styles/style-constants';

const propTypes = {
  error: PropTypes.bool,
  disabled: PropTypes.bool,
};

const defaultProps = {
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
        background-color: rgba(0,0,0,0.07);
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
          background-color: #fff;
          color: currentColor;
          border: 1px solid
            ${props => (props.error ? constants.color.error : 'transparent')};
        }

        &:hover,
        &:focus {
          border-color: ${constants.color.primary};
        }
      `;

export const TextField = styled.input`
  display: inline-block;
  font-size: ${constants.fontSize.body}px;
  line-height: 1.5;
  border-radius: ${constants.borderRadius}px;
  padding: 0.75em 1em;
  max-width: 100%;
  width: 100%;
  transition: 150ms ease-in;
  transition-property: opacity, background, border, box-shadow;

  &::placeholder {
    color: ${constants.textColor.medium};
  }

  ${colorScheme};
`;

TextField.propTypes = propTypes;
TextField.defaultProps = defaultProps;
