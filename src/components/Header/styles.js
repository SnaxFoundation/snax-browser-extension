import styled from 'styled-components';
import constants from '../../styles/style-constants';

export const HeaderStyled = styled.header`
  color: ${constants.paletteBlueGrey[50]};
  padding: ${constants.baseModule * 1.5}px ${constants.bodyPadX}px;
  display: flex;
  justify-content: space-between;
`;
