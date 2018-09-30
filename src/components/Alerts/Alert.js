import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../../styles/style-constants';

const propTypes = {
  colorScheme: PropTypes.oneOf(['success', 'error', 'default']),
};

const defaultProps = {
  colorScheme: 'default',
};

const colorMap = {
  default: {
    bgColor: constants.color.info,
    textColor: '#fff',
  },
  success: {
    bgColor: constants.color.success,
    textColor: '#fff',
  },
  error: {
    bgColor: constants.color.error,
    textColor: '#fff',
  },
};

const colorScheme = ({ colorScheme }) => `
  background-color: ${colorMap[colorScheme].bgColor};
  color: ${colorMap[colorScheme].textColor};
`;

export const Alert = styled.div`
  width: 100%;
  text-align: center;
  padding: 0.5em;

  ${colorScheme};
`;

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;
