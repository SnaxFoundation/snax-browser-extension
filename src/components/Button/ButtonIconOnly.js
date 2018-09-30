import React from 'react';
import styled from 'styled-components';
import { Icon } from '../Icon';
import { Button as _Button } from './Button';

const buttonSize = '40px';
const iconSize = '24px';
const iconImgSize = '24px';

const Button = styled(_Button)`
  border-radius: 50%;
  width: ${buttonSize};
  height: ${buttonSize};
  padding: 0;
`;

const IconWrapper = styled.div`
  width: ${iconSize};
  height: ${iconSize};
  border-radius: 50%;
  color: var(--color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 150ms ease-in;
  transition-property: opacity;

  > * {
    width: ${iconImgSize};
    height: ${iconImgSize};
  }
`;

export const ButtonIconOnly = ({ icon, ...props }) => (
  <Button {...props}>
    <IconWrapper>
      <Icon>{icon}</Icon>
    </IconWrapper>
  </Button>
);
