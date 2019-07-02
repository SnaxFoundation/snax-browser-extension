import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
  outlined: PropTypes.bool,
};

const defaultProps = {
  outlined: false,
};

const size = props => (props.size ? props.size : 'inherit');
const outline = props =>
  props.outlined
    ? `
    stroke-width: 1px;
    stroke: ${props.color || 'currentColor'};
    fill: transparent;
    `
    : `fill: ${props.color || 'currentColor'};`;

export const IconStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &,
  & > * {
    width: ${size};
    height: ${size};
  }

  svg {
    width: 100%;
  }

  * {
    ${outline}
  }
`;

IconStyled.propTypes = propTypes;
IconStyled.defaultProps = defaultProps;
