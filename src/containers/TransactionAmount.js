import React from 'react';
import styled from 'styled-components';
import { ParagraphCaption } from '../components';
import styleConstants from '../styles/style-constants';

const Wrapper = styled.div``;

const Amount = styled.div`
  font-size: ${styleConstants.fontSize.display1}px;
  font-weight: ${styleConstants.fontWeight.light};
  line-height: 1;
`;

export const TransactionAmount = ({ amount, ...props }) => (
  <Wrapper {...props}>
    <Amount>{amount} SNAX</Amount>
    <ParagraphCaption>${amount * 0.01} approximately</ParagraphCaption>
  </Wrapper>
);
