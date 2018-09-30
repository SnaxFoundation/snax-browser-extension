import React from 'react';
import styled from 'styled-components';
import constants from '../../styles/style-constants';

const iconSize = 24;

const Wrapper = styled.div`
  background-color: rgba(0,0,0,0.2);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding: ${constants.baseModule * 1.5}px ${constants.baseModule * 2.5}px;
  display: flex;
  align-items: stretch;
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${iconSize}px;
    height: ${iconSize}px;
`;

const Title = styled.div`
    padding: 0 ${constants.baseModule * 1.5}px;
`;

const Children = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    padding-left: ${constants.baseModule}px;
`;

export const SidebarTitle = ({
    icon,
    title,
    children,
    ...props,
}) => (
    <Wrapper {...props}>
        <Content>
            <Icon>{icon}</Icon>
            <Title>{title}</Title>
        </Content>

        {children && <Children>{children}</Children>}
    </Wrapper>
);
