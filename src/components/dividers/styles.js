import styled from 'styled-components';
import constants from '../../styles/style-constants';

export const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  text-align: center;
`;

export const Text = styled.span`
  font-size: ${constants.fontSize.body}px;
  color: ${constants.textColor.medium};
  padding: 0 ${constants.baseModule}px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 400px;
    height: 1px;
    background-color: ${constants.colorBorder};
    position: absolute;
    top: 50%;
    margin-top: -1px;
  }

  &::before {
    left: 0;
    transform: translateX(-100%);
  }

  &::after {
    right: 0;
    transform: translateX(100%);
  }
`;
