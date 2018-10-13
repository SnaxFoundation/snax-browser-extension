import React from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {Inject} from 'src/context/steriotypes/Inject';
import SecretPhraseConfirmRoute from 'src/routes/SecretPhraseConfirmRoute';
import {PasswordManager} from 'src/services/accounts/PasswordManager';
import {WalletManager} from 'src/services/accounts/WalletManager';
import {getStore} from 'src/store/store';
import {WalletActions} from 'src/store/wallet/WalletActions';

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
  

  @Inject(WalletManager)
  walletManager;
  
  @Inject(PasswordManager)
  passwordManager;
  
  @Inject(WalletActions)
  walletActions;
  
  state = {
    store: null,
    hasWallet: false,
    canUse: false,
  };
  
  constructor(props, context) {
    super(props, context);
    this.state.store = getStore();
    
  }
  
  async componentDidMount() {
    const hasWallet = await this.walletManager.hasWallet();
    const canUse = await this.walletManager.hasWalletAndCanUse();
    this.setState({
      hasWallet,
      canUse,
    });
    
    if (canUse) {
      this.state.store.dispatch(this.walletActions.tryExtractWalletFromStorage());
    }
  }
  
  
  render() {
    return (
      <Provider store={this.state.store}>
        <BrowserRouter>
          <App>
            <Switch>
              <Route path="/confirm-phrase" component={SecretPhraseConfirmRoute} />
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
            {this.state.hasWallet && !this.state.canUse && <Redirect to="/password"/>}
            {this.state.canUse && <Redirect to="/wallet"/>}
          </App>
        </BrowserRouter>
      </Provider>
    )
  }
}
export default Root;
