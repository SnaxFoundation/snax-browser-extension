import React from 'react';
import {
  HeaderStyled,
} from './styles'

export const Header = props => (
  <HeaderStyled {...props}>
    {props.children}
  </HeaderStyled>
);
