import styled from 'styled-components';
import constants from '../../styles/style-constants';

export const Screen = styled.div`
  width: 100%;
  flex-grow: 1;
  padding: ${constants.grid.appPaddingY}px ${constants.grid.appPaddingX}px;
  display: flex;
  flex-direction: column;
`;
