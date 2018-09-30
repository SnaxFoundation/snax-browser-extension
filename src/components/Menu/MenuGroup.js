import styled from 'styled-components';
import constants from '../../styles/style-constants';

export const MenuGroup = styled.ul`
  margin: 0;

  ${props => props.direction === 'vertical'
    ? `
        padding: ${constants.baseModule * 1.5}px 0;
    `
    : `
      display: flex;
      align-items: center;
      padding: 0 ${constants.baseModule * 1.5}px;
  
      > * + * {
        margin-left: ${constants.baseModule * 2}px;
      }
    `
  }
`;
