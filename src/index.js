import React from 'react';
import ReactDOM from 'react-dom';
import AppRoute from './AppRoute';
import { injectResetStyle, injectGlobalStyle } from './styles';

injectResetStyle();
injectGlobalStyle();

ReactDOM.render(<AppRoute />, document.getElementById('root'));
