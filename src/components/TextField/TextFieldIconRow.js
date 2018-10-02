import styled from 'styled-components';
import constants from '../../styles/style-constants';

export const TextFieldIconRow = styled.div`
  width: 100%;
  display: grid;
  grid-gap: ${constants.baseModule / 2}px;
  grid-template-columns: auto min-content;
  align-items: center;
`;
