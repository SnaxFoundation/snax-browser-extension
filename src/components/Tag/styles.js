import styled from 'styled-components';
import constants from '../../styles/style-constants';

const iconSize = '1.1em';

export const Wrapper = styled.div`
  border-radius: ${constants.borderRadius}px;
  background-color: ${constants.paletteBlueGrey[900]};
  padding: 0.3em 0.75em;
  display: flex;
  align-items: flex-start;
  max-width: 100%;
  min-width: 0;
  line-height: 1.1;
`;

export const Icon = styled.div`
  width: ${iconSize};
  height: ${iconSize};
  margin-right: 0.5em;
  margin-left: -0.15em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.div`
  /* padding-top: 0.25em; */
  color: ${constants.textColor.body};
  line-height: 1.25;
  word-break: break-word;
  text-decoration: none;
`;
