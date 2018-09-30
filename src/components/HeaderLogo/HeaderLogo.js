import React from 'react';
import {
  HeaderLogoStyled,
  ImgStyled,
  TitleWrapperStyled,
  TitleStyled,
  SubtitleStyled,
} from './styles';

export const HeaderLogo = ({ img, title, subtitle, to, ...props }) => (
  <HeaderLogoStyled {...props} to={to || '/'}>
    {img && <ImgStyled src={img} />}
    <TitleWrapperStyled>
      {title && <TitleStyled>{title}</TitleStyled>}
      {subtitle && <SubtitleStyled>{subtitle}</SubtitleStyled>}
    </TitleWrapperStyled>
  </HeaderLogoStyled>
);
