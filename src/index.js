import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import { injectResetStyle, injectGlobalStyle } from './styles';

import ECC from 'eosjs-ecc';
import BIP39 from 'bip39';
import CryptoJs from 'crypto-js';

global.ECC = ECC;
global.BIP39 = BIP39;
global.AES = CryptoJs.AES;
global.CryptoJs = CryptoJs

injectResetStyle();
injectGlobalStyle();

ReactDOM.render(<Root />, document.getElementById('root'));
