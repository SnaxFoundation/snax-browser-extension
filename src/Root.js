import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Inject } from "src/context/steriotypes/Inject";
import SecretPhraseConfirmRoute from "src/routes/SecretPhraseConfirmRoute";
import { WalletManager } from "src/services/accounts/WalletManager";
import { getStore } from "src/store/store";
import { TransactionActions } from "src/store/transaction/TransactionActions";
import { WalletActions } from "src/store/wallet/WalletActions";

import { App } from "./components";
import { VersionBox } from "./containers";
import { InjectResetStyle, InjectGlobalStyle } from "./styles";

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
  TransactionSignRequestRoute
} from "./routes";

export const browserHistory = createBrowserHistory();

export class NavigableRouter extends BrowserRouter {
  history = browserHistory;
}

class Root extends React.Component {
  @Inject(WalletManager) walletManager;

  @Inject(WalletActions) walletActions;

  @Inject(TransactionActions) transactionActions;

  state = {
    store: null,
    hasWallet: false,
    canUse: false
  };

  constructor(props, context) {
    super(props, context);

    this.state.store = getStore();
  }

  async componentDidMount() {
    this.clearBadge();

    window.chrome.storage.sync.get(["currentTransaction"], storage => {
      if (storage.currentTransaction) {
        const transaction = JSON.parse(storage.currentTransaction);
        this.handleRequestTransaction(transaction);
      }
    });

    const canUse = await this.canUse();
    const hasWallet = await this.hasWallet();
    const shouldConfirm = await this.shouldConfirm();

    this.setState({ canUse, hasWallet, shouldConfirm });

    if (canUse) {
      this.state.store.dispatch(
        this.walletActions.tryExtractWalletFromStorage()
      );
    }
  }

  handleRequestTransaction = async transaction => {
    await this.transactionActions.prepareTransaction(
      transaction.id,
      transaction.from,
      transaction.to,
      transaction.amount
    )(this.state.store.dispatch);

    const canUse = await this.canUse();
    const hasWallet = await this.hasWallet();
    const shouldConfirm = await this.shouldConfirm();

    if (!hasWallet) {
      browserHistory.push("/new-wallet");
      return;
    }

    if (!canUse) {
      browserHistory.push("/password");
      return;
    }

    if (canUse && shouldConfirm) {
      browserHistory.push("/confirm-phrase");
      return;
    }

    browserHistory.push("/transaction-sign-request");
  };

  clearBadge = () => {
    window &&
      window.chrome &&
      chrome.browserAction &&
      chrome.browserAction.setBadgeText({ text: "" });
  };

  getVersion() {
    return (
      (window &&
        window.chrome &&
        window.chrome.runtime &&
        typeof window.chrome.runtime.getManifest === "function" &&
        (window.chrome.runtime.getManifest() || {}).version) ||
      null
    );
  }

  render() {
    const version = this.getVersion();
    return (
      <Provider store={this.state.store}>
        <NavigableRouter>
          <App>
            <InjectResetStyle />
            <InjectGlobalStyle />
            {version ? <VersionBox version={version} /> : null}
            {this.state.hasWallet && !this.state.canUse && (
              <Redirect to="/password" />
            )}
            {this.state.canUse && !this.state.shouldConfirm && (
              <Redirect to="/wallet" />
            )}
            {this.state.canUse && this.state.shouldConfirm && (
              <Redirect to="/confirm-phrase" />
            )}
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
