import React from 'react';
import { Wrapper, Text } from './styles';

export const DividerWithText = ({ children, ...props }) => (
  <Wrapper {...props}>
    <Text>{children}</Text>
  </Wrapper>
);
