import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import React from 'react';

import { Inject } from 'src/context/steriotypes/Inject';
import { TransactionActions } from 'src/store/transaction/TransactionActions';
import { TransactionManager } from 'src/services/transaction/TransactionManager';
import { WalletActions } from 'src/store/wallet/WalletActions';
import { WalletManager } from 'src/services/accounts/WalletManager';
import { clearBadge, getActiveTabUrlAsync } from 'src/utils/chrome';
import { getStore } from 'src/store/store';
import { isSnaxDomain } from 'src/utils/misc';
import SecretPhraseConfirmRoute from 'src/routes/SecretPhraseConfirmRoute';

import { App, Loader, SecondaryInfoBox, Anchor } from './components';
import { InjectResetStyle, InjectGlobalStyle } from './styles';
import { PlatformBindingActions } from './store/platformBinding/PlatformBindingActions';
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
  PrivateExportRoute,
  RestoreConfirmationRoute,
  SuccessRoute,
} from './routes';
import { VersionBox } from './containers';
import PlatformBindingSignRequestRoute from './routes/PlatformBindingSignRequestRoute';

export const browserHistory = createBrowserHistory();

export class NavigableRouter extends BrowserRouter {
  history = browserHistory;
}

class Root extends React.Component {
  @Inject(WalletManager) walletManager;

  @Inject(WalletActions) walletActions;

  @Inject(TransactionManager) transactionManager;

  @Inject(TransactionActions) transactionActions;

  @Inject(PlatformBindingActions) platformBindingActions;

  prepareTransactionTimeout = null;

  state = {
    store: null,
    hasWallet: false,
    canUse: false,
    loading: true,
    preparingTransaction: false,
    snaxDomain: true,
  };

  constructor(props, context) {
    super(props, context);

    this.state.store = getStore();
  }

  async componentDidMount() {
    const isValidRuntime = this.isValidChromeRuntime();

    const canUse = await this.canUse();
    const hasWallet = await this.hasWallet();
    const shouldConfirm = await this.shouldConfirm();

    if (this.isValidChromeRuntime()) {
      chrome.runtime.onMessage.addListener(message => {
        if (message.closePopup) {
          window.close();
        }

        if (message.openError) {
          if (this.state.loading || this.state.preparingTransaction) {
            this.setState({ loading: false, preparingTransaction: false });
          }

          browserHistory.push(`/error?message=${message.error}`);
        }
      });
    }

    this.transactionManager.listen(async transaction => {
      this.setState({ preparingTransaction: true });

      this.prepareTransactionTimeout = setTimeout(
        () => this.cancelTransaction('Transaction has been expired'),
        30000
      );

      try {
        const preparedTransaction =
          transaction.type === 'TRANSFER'
            ? await this.transactionActions.prepareTransaction(
                transaction.id,
                transaction.from,
                transaction.to,
                transaction.amount,
                transaction.platform
              )(this.state.store.dispatch)
            : await this.platformBindingActions.preparePlatformToBind(
                transaction
              )(this.state.store.dispatch);

        clearTimeout(this.prepareTransactionTimeout);

        this.setState({ preparingTransaction: false });

        if (!hasWallet) {
          browserHistory.push('/new-wallet');
          return preparedTransaction;
        }

        if (!canUse) {
          browserHistory.push('/password');
          return preparedTransaction;
        }

        if (canUse && shouldConfirm) {
          browserHistory.push('/confirm-phrase');
          return preparedTransaction;
        }

        browserHistory.push(
          transaction.type === 'TRANSFER'
            ? '/transaction-sign-request'
            : '/platform-binding-sign-request'
        );

        return preparedTransaction;
      } catch (error) {
        this.handleOpenErrorRoute(error.message);
      }
    });

    if (this.isValidChromeRuntime()) {
      window.chrome.runtime.sendMessage({
        loaded: true,
      });
    }

    let snaxDomain = true;

    if (isValidRuntime) {
      clearBadge();
      const url = await getActiveTabUrlAsync();
      snaxDomain = isSnaxDomain(url);
    }

    this.setState({
      canUse,
      hasWallet,
      shouldConfirm,
      loading: false,
      snaxDomain,
    });

    if (canUse) {
      this.state.store.dispatch(
        this.walletActions.tryExtractWalletFromStorage()
      );
    }
  }

  handleOpenErrorRoute = message => {
    clearTimeout(this.prepareTransactionTimeout);

    if (this.isValidChromeRuntime()) {
      window.chrome.runtime.sendMessage({
        cancelTransaction: true,
        error: message,
        openError: true,
      });
    }
  };

  cancelTransaction = (message = 'Transaction has been canceled') => {
    clearTimeout(this.prepareTransactionTimeout);

    if (this.isValidChromeRuntime()) {
      window.chrome.runtime.sendMessage({
        cancelTransaction: true,
        error: message,
        closePopup: true,
      });
    }
  };

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
    const {
      hasWallet,
      canUse,
      shouldConfirm,
      snaxDomain,
      loading,
      preparingTransaction,
    } = this.state;

    const redirectToPassword = hasWallet && !canUse;
    const redirectToWallet = canUse && !shouldConfirm;
    const redirectToConfirmPhrase = canUse && shouldConfirm;

    const version = this.getVersion();
    return (
      <Provider store={this.state.store}>
        <NavigableRouter>
          <App>
            <InjectResetStyle />
            <InjectGlobalStyle />
            {loading && <Loader hasSpinner />}
            {preparingTransaction && (
              <Loader
                hasSpinner
                text="Preparing transaction"
                bottomSlot={
                  <SecondaryInfoBox>
                    <Anchor
                      spread
                      as="button"
                      onClick={() => {
                        this.cancelTransaction();
                      }}
                    >
                      Cancel
                    </Anchor>
                  </SecondaryInfoBox>
                }
              />
            )}
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
              <Route path="/import-password" component={PasswordCreateRoute} />
              <Route
                path="/restore-confirmation"
                component={RestoreConfirmationRoute}
              />
              <Route path="/error" component={ErrorRoute} />
              <Route path="/password" component={PasswordRequestRoute} />
              <Route path="/sign-request" component={SignRequestRoute} />
              <Route path="/private-export" component={PrivateExportRoute} />
              <Route
                path="/transaction-sign-request"
                component={TransactionSignRequestRoute}
              />
              <Route
                path="/platform-binding-sign-request"
                component={PlatformBindingSignRequestRoute}
              />
              <Route path="/transaction-success" component={SuccessRoute} />
              <Route path="*" render={() => <Redirect to="/" />} />
            </Switch>
            {redirectToPassword && <Redirect to="/password" />}
            {redirectToWallet && <Redirect to="/wallet" />}
            {redirectToConfirmPhrase && <Redirect to="/confirm-phrase" />}
            {!snaxDomain && <Redirect to="/unknown" />}
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
