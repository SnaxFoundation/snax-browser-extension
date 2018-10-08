import styled from 'styled-components';
import constants from '../../styles/style-constants';

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-shrink: 0;

  & + & {
    margin-top: ${constants.grid.spacingY}px;
  }
`;
