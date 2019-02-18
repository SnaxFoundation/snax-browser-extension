import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Inject } from 'src/context/steriotypes/Inject';
import SecretPhraseConfirmRoute from 'src/routes/SecretPhraseConfirmRoute';
import { WalletManager } from 'src/services/accounts/WalletManager';
import { getStore } from 'src/store/store';
import { TransactionManager } from 'src/services/transaction/TransactionManager';
import { TransactionActions } from 'src/store/transaction/TransactionActions';
import { WalletActions } from 'src/store/wallet/WalletActions';

import { App } from './components';
import { VersionBox } from './containers';
import { InjectResetStyle, InjectGlobalStyle } from './styles';

import {
  UnknownDomainRoute,
  WelcomeRoute,
  PasswordCreateRoute,
  SecretPhraseRoute,
  WalletRoute,
  ImportRoute,
  ErrorRoute,
  PasswordRequestRoute,
  SignRequestRoute,
  TransactionSignRequestRoute,
} from './routes';

import { clearBadge } from 'src/utils/chrome';

export const browserHistory = createBrowserHistory();

export class NavigableRouter extends BrowserRouter {
  history = browserHistory;
}

class Root extends React.Component {
  @Inject(WalletManager) walletManager;

  @Inject(WalletActions) walletActions;

  @Inject(TransactionManager) transactionManager;

  @Inject(TransactionActions) transactionActions;

  state = {
    store: null,
    hasWallet: false,
    canUse: false,
    loading: true,
  };

  constructor(props, context) {
    super(props, context);

    this.state.store = getStore();
  }

  async componentDidMount() {
    const isValidRuntime = this.isValidChromeRuntime();

    if (isValidRuntime) {
      clearBadge();
    }

    const canUse = await this.canUse();
    const hasWallet = await this.hasWallet();
    const shouldConfirm = await this.shouldConfirm();

    this.transactionManager.listen(async transaction => {
      const preparedTransaction = await this.transactionActions.prepareTransaction(
        transaction.id,
        transaction.from,
        transaction.to,
        transaction.amount
      )(this.state.store.dispatch);

      if (!hasWallet) {
        browserHistory.push('/new-wallet');
        return;
      }

      if (!canUse) {
        browserHistory.push('/password');
        return;
      }

      if (canUse && shouldConfirm) {
        browserHistory.push('/confirm-phrase');
        return;
      }

      browserHistory.push('/transaction-sign-request');

      return preparedTransaction;
    });

    if (this.isValidChromeRuntime()) {
      window.chrome.runtime.sendMessage({
        loaded: true,
      });
    }

    this.setState({ canUse, hasWallet, shouldConfirm, loading: false });

    if (canUse) {
      this.state.store.dispatch(
        this.walletActions.tryExtractWalletFromStorage()
      );
    }
  }

  getVersion() {
    return (
      (window &&
        window.chrome &&
        window.chrome.runtime &&
        typeof window.chrome.runtime.getManifest === 'function' &&
        (window.chrome.runtime.getManifest() || {}).version) ||
      null
    );
  }

  isValidChromeRuntime() {
    return (
      window &&
      window.chrome &&
      window.chrome.runtime &&
      typeof window.chrome.runtime.getManifest === 'function'
    );
  }

  render() {
    const { hasWallet, canUse, shouldConfirm, loading } = this.state;

    const redirectToPassword = hasWallet && !canUse;
    const redirectToWallet = canUse && !shouldConfirm;
    const redirectToConfirmPhrase = canUse && shouldConfirm;

    if (loading) return null;

    const version = this.getVersion();
    return (
      <Provider store={this.state.store}>
        <NavigableRouter>
          <App>
            <InjectResetStyle />
            <InjectGlobalStyle />
            {version ? <VersionBox version={version} /> : null}
            <Switch>
              <Route exact path="/" component={WelcomeRoute} />
              <Route
                path="/confirm-phrase"
                component={SecretPhraseConfirmRoute}
              />
              <Route path="/unknown" component={UnknownDomainRoute} />
              <Route path="/new-wallet" component={PasswordCreateRoute} />
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
            {redirectToPassword && <Redirect to="/password" />}
            {redirectToWallet && <Redirect to="/wallet" />}
            {redirectToConfirmPhrase && <Redirect to="/confirm-phrase" />}
          </App>
        </NavigableRouter>
      </Provider>
    );
  }
  async hasWallet() {
    return await this.walletManager.hasWallet();
  }

  async canUse() {
    return await this.walletManager.hasWalletAndCanUse();
  }

  async shouldConfirm() {
    return !this.state.store.getState().wallet.confirmed;
  }
}
export default Root;
