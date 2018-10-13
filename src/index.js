import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import { injectResetStyle, injectGlobalStyle } from './styles';

injectResetStyle();
injectGlobalStyle();

ReactDOM.render(<Root />, document.getElementById('root'));
