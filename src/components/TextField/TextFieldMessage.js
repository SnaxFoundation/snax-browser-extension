import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../../styles/style-constants';

const propTypes = {
  error: PropTypes.bool,
};

const defaultProps = {
  error: false,
};

export const TextFieldMessage = styled.div`
  font-size: ${constants.fontSize.small}px;
  color: ${props =>
    props.filled ? constants.textColor.body : constants.textColor.medium};
  margin-top: ${constants.baseModule}px;

  ${props => props.error && `color: ${constants.color.error};`};
`;

TextFieldMessage.propTypes = propTypes;
TextFieldMessage.defaultProps = defaultProps;
