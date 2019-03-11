import React from 'react';
import styled from 'styled-components';
import constants from '../../styles/style-constants';

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.div`
  color: ${constants.textColor.medium};
  text-align: center;
  font-weight: ${constants.fontWeight.light};
  font-size: 44px;
  margin-bottom: 0.25em;
`;

const Text = styled.div`
  color: ${constants.textColor.medium};
  text-align: center;
  font-size: ${constants.fontSize.body2}px;
`;

export const Success = ({ title, children }) => (
  <Wrapper>
    <Title>{title}</Title>
    <Text>{children}</Text>
  </Wrapper>
);
