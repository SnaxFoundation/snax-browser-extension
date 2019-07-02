import React from 'react';
import PropTypes from 'prop-types';
import { IconStyled } from './styles';

const propTypes = {
  outlined: PropTypes.bool,
};

const defaultProps = {
  outlined: false,
};

export const Icon = ({ size, outlined, ...props }) => (
  <IconStyled size={size} outlined={outlined} {...props} />
);

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;
