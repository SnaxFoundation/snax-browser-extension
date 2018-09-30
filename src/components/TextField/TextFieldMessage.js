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
    props.error ? constants.color.error : constants.textColor.medium};
  margin-top: ${constants.baseModule}px;
`;

TextFieldMessage.propTypes = propTypes;
TextFieldMessage.defaultProps = defaultProps;
