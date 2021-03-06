import styled from 'styled-components';
import constants from '../../styles/style-constants';

export const BrandBox = styled.div`
  width: 100%;
  margin-bottom: ${constants.grid.spacingY}px;
  color: ${constants.textColor.medium};
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
`;
