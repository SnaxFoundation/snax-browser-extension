import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../../styles/style-constants';

const propTypes = {
  error: PropTypes.bool,
};

const defaultProps = {
  error: false,
};

export const TextFieldLabel = styled.label`
  font-size: ${constants.fontSize.small}px;
  color: ${props => (props.error ? constants.color.error : 'currentColor')};
  margin-bottom: ${constants.baseModule}px;
  display: block;
  line-height: 1.25;
`;

TextFieldLabel.propTypes = propTypes;
TextFieldLabel.defaultProps = defaultProps;
