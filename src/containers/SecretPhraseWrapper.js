import styled from 'styled-components';
import styleConstants from '../styles/style-constants';

export const SecretPhraseWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${styleConstants.baseModule / 2}px;
  flex-shrink: 0;
`;
