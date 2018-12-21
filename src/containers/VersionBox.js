import React from 'react';
import styled from 'styled-components';
import styleConstants from '../styles/style-constants';

const Wrapper = styled.div`
  position: absolute;
  bottom: 2px;
  right: 4px;
  text-align: right;
  width: auto;
  display: inline-block;
  font-size: 8px;
  color: ${styleConstants.textColor.medium};
`;

export const VersionBox = ({ version, ...props }) => (
  <Wrapper {...props}>v. {version}</Wrapper>
);
