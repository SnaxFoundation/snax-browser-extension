import { createGlobalStyle } from 'styled-components';
import constants from './style-constants';

export const InjectGlobalStyle = createGlobalStyle`    
    html,
    body {
      font-size: 100%;
      display: flex;
      align-items: stretch;
      overflow-x: hidden;
      width: ${constants.maxWidth}px;
      height: ${constants.maxHeight}px;
    }
    
    body {
      cursor: default;
      color: ${constants.textColor.body};
      font-family: ${constants.fontFamily.body};
      font-weight: ${constants.fontWeight.normal};
      font-size: ${constants.fontSize.body}px;
      line-height: 1.5;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    #root {
      background-color: ${constants.colorBody};
      width: 100%;
      max-width: 100%;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-shrink: 0;
      min-height: 100%;
    }

    // Utility classes
    .dashed {
      border-bottom: 1px dashed currentColor;
    }

    .text-align-center {
      text-align: center;
    }

    .text-align-right {
      text-align: right;
    }

    .word-break {
      word-break: break-all;
    }
  `;
