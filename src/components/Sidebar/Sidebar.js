import styled from 'styled-components';
import constants from '../../styles/style-constants';

export const Sidebar = styled.aside`
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${constants.color.primary};
  color: white;
  width: 200px;
`;
