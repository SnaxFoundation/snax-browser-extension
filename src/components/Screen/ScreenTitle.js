import styled from "styled-components";
import constants from "../../styles/style-constants";

export const ScreenTitle = styled.h2`
  font-size: ${constants.fontSize.title}px;
  font-weight: ${constants.fontWeight.bold};
  color: ${constants.textColor.medium};
  line-height: 1.15;
  margin: 0;
  margin-bottom: ${constants.grid.spacingY}px;
`;
