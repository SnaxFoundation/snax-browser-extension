import styled from 'styled-components';
import { Link } from 'react-router-dom';
import constants from '../../styles/style-constants';

const logoH = 40;
const breakpoint = '25em';

export const HeaderLogoStyled = styled(Link)`
  color: currentColor;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  text-decoration: none;
`;

export const ImgStyled = styled.img`
  height: ${logoH}px;
  width: auto;
  margin-right: 1.25em;
`;

export const TitleWrapperStyled = styled.span`
  @media only screen and (max-width: ${breakpoint}) {
    display: flex;
    flex-direction: column;
    margin-bottom: -2px;
  }
`;

export const TitleStyled = styled.span`
  text-transform: uppercase;
  font-weight: ${constants.fontWeight.bold};
  letter-spacing: 1em;
`;

export const SubtitleStyled = styled.span`
  text-transform: none;
  font-weight: ${constants.fontWeight.semibold};
  letter-spacing: 0;
  color: ${constants.textColor.medium};
  margin-left: 1.25px;
  font-size: ${constants.fontSize.small}px;
  
  @media only screen and (min-width: ${breakpoint}) {
    font-size: ${constants.fontSize.body}px;
  }
`;
