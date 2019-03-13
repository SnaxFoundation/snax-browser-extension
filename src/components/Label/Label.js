import styled from 'styled-components';
import constants from '../../styles/style-constants';

export const Label = styled.div`
  font-size: 0.75em;
  line-height: inherit;
  padding: 0 0.25em;
  background-color: ${constants.paletteBlueGrey[400]};
  color: #000;
  border-radius: ${constants.borderRadius}px;
  display: inline;
  text-transform: uppercase;
  font-weight: ${constants.fontWeight.bold};
  letter-spacing: 0.05em;
`;
