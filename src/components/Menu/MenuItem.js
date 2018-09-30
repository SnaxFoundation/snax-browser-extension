import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import constants from '../../styles/style-constants';

export const Wrapper = styled.li`
  display: flex;
  align-items: stretch;
`;

export const Anchor = styled(NavLink)`
  display: flex;
  align-items: center;
  font-size: ${constants.fontSize.body}px;
  padding: ${constants.baseModule * 1}px ${constants.baseModule * 2.5}px;
  padding-left: ${constants.baseModule * 2}px;
  cursor: pointer;
  border-left: ${constants.baseModule * 0.5}px solid transparent;
  transition: 150ms ease-in;
  transition-properties: border;
  
  &,
  &:hover,
  &:focus {
    text-decoration: none;
    color: currentColor;    
  }
  
  &:hover,
  &:focus {
    border-left-color: rgba(255,255,255,0.1);   
  }

  &.active {
    &,
    &:hover,
    &:focus {
      border-left-color: ${constants.color.secondary};   
    }
  }
`;

export const MenuItem = ({ to, ...props }) => (
  <Wrapper>
    <Anchor smooth to={to} {...props}><span>{props.children}</span></Anchor>
  </Wrapper>
);
