import styled from 'styled-components';

const size = props => props.size ? props.size : '70px';

export const IconStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  &,
  & > * {
    width: ${size};
    height: ${size};
  }
  
  svg {
    width: 100%;
  }
  
  * {
    fill: ${props => props.color || 'currentColor'};
  }
`;
