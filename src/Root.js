import React from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {Inject} from 'src/context/steriotypes/Inject';
import {getStore} from 'src/store/store';
import {WalletSelectors} from 'src/store/wallet/WalletSelectors';

import { App } from './components';

import {
  UnknownDomenRoute,
  WelcomeRoute,
  NewWalletRoute,
  SecretPhraseRoute,
  WalletRoute,
  ImportRoute,
  ErrorRoute,
  PasswordRequestRoute,
  SignRequestRoute,
  TransactionSignRequestRoute,
} from './routes';


class Root extends React.Component {
  
  @Inject(WalletSelectors)
  walletSelectors;
  
  state = {
    store: null,
    hasWallet: false,
  };
  
  constructor(props, context) {
    super(props, context);
    this.state.store = getStore();
    this.state.hasWallet = this.walletSelectors.hasWallet(this.state.store.getState());
  }
  
  render() {
    return (
      <Provider store={this.state.store}>
        <BrowserRouter>
          <App>
            <Switch>
              <Route exact path="/" component={WelcomeRoute} />
              <Route path="/unknown" component={UnknownDomenRoute} />
              <Route path="/new-wallet" component={NewWalletRoute} />
              <Route path="/secret-phrase" component={SecretPhraseRoute} />
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
            {this.state.hasWallet && <Redirect to="/password"/>}
          </App>
        </BrowserRouter>
      </Provider>
    )
  }
}
export default Root;
