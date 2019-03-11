import styled from 'styled-components';
import { Link } from 'react-router-dom';
import constants from '../../styles/style-constants';

export const Anchor = styled(Link)`
  font-size: inherit;
  line-height: inherit;
  opacity: 0.8;
  cursor: pointer;
  text-decoration: underline;

  &,
  &:hover,
  &:focus {
    color: ${props =>
      props.accent ? constants.color.primary : 'currentColor'};
    background-color: transparent;
    border: 0;
    outline: 0;
  }

  &:hover,
  &:focus {
    opacity: 1;
  }
`;

export const AnchorHTML = Anchor.withComponent('a');
