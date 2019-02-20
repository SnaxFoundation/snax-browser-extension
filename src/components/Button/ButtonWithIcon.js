import React from 'react';
import styled from 'styled-components';
import { Icon } from '../Icon';
import { Button } from './Button';

const iconSize = '2em';
const iconImgSize = '1.4em';

const Content = styled.div`
  padding-left: 0.5em;
`;

const IconWrapper = styled.div`
  width: ${iconSize};
  height: ${iconSize};
  color: currentColor;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -0.75em;
  margin-left: -0.25em;
  margin-bottom: -0.75em;

  > * {
    width: ${iconImgSize};
    height: ${iconImgSize};
  }
`;

export const ButtonWithIcon = ({ icon, children, ...props }) => (
  <Button {...props}>
    <IconWrapper>
      <Icon>{icon}</Icon>
    </IconWrapper>
    <Content>{children}</Content>
  </Button>
);
