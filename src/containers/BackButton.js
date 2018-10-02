import React from 'react';
import styled from 'styled-components';
import { ButtonWithIcon, IconArrowBack } from '../components';

const Wrapper = styled.div`
  margin-left: -10px;
  display: flex;
`;

export const BackButton = ({ icon, children, ...props }) => (
  <Wrapper>
    <ButtonWithIcon icon={<IconArrowBack />} colorScheme="flat" size="small">
      Back
    </ButtonWithIcon>
  </Wrapper>
);
