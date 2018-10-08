import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../../styles/style-constants';

const propTypes = {
  spread: PropTypes.bool,
  centerY: PropTypes.bool,
};

const defaultProps = {
  spread: false,
  centerY: false,
};

export const Content = styled.div`
  width: 100%;
  padding: ${constants.grid.spacingY}px 0;
  padding-bottom: ${constants.grid.spacingY + constants.baseModule}px;
  flex-shrink: 0;

  ${props => props.spread && 'flex-grow: 1;'};

  ${props =>
    props.centerY &&
    `
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
  `};
`;

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;
