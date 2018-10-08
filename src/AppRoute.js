import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { App, AlertWrapper, Alert } from './components';

import {
  UnknownDomenRoute,
  WelcomeRoute,
  NewWalletRoute,
  SecretPhraseRoute,
  SecretPhraseConfirmRoute,
  WalletRoute,
  ImportRoute,
  ErrorRoute,
  PasswordRequestRoute,
  SignRequestRoute,
  TransactionSignRequestRoute,
} from './routes';

const AppRoute = () => (
  <BrowserRouter>
    <App>
      {/* <AlertWrapper>
        <Alert colorScheme="success"> Wallet was successfully created</Alert>
      </AlertWrapper> */}
      <Switch>
        <Route exact path="/" component={WelcomeRoute} />
        <Route path="/unknown" component={UnknownDomenRoute} />
        <Route path="/new-wallet" component={NewWalletRoute} />
        <Route path="/secret-phrase" component={SecretPhraseRoute} />
        <Route path="/confirm-phrase" component={SecretPhraseConfirmRoute} />
        <Route path="/wallet" component={WalletRoute} />
        <Route path="/import-wallet" component={ImportRoute} />
        <Route path="/error" component={ErrorRoute} />
        <Route path="/password" component={PasswordRequestRoute} />
        <Route path="/sign-request" component={SignRequestRoute} />
        <Route
          path="/transaction-sign-request"
          component={TransactionSignRequestRoute}
        />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </App>
  </BrowserRouter>
);

export default AppRoute;
