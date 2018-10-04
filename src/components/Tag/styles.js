import styled from 'styled-components';
import constants from '../../styles/style-constants';

const iconSize = '1.25em';

export const Wrapper = styled.div`
  border-radius: 0.85em;
  background-color: #d5d8e2;
  padding: 0.25em 0.75em;
  display: flex;
  align-items: flex-start;
  max-width: 100%;
  min-width: 0;
  font-size: ${constants.fontSize.body}px;
  line-height: 1.2;
`;

export const Icon = styled.div`
  width: ${iconSize};
  height: ${iconSize};
  margin-right: ${constants.baseModule}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.div`
  /* padding-top: 0.25em; */
  color: ${constants.textColor.body};
  line-height: 1.25;
  word-break: break-word;
`;
