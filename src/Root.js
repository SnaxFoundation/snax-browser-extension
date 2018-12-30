import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import React from "react";

import { Inject } from "src/context/steriotypes/Inject";
import { TransactionActions } from "src/store/transaction/TransactionActions";
import { TransactionManager } from "src/services/transaction/TransactionManager";
import { WalletActions } from "src/store/wallet/WalletActions";
import { WalletManager } from "src/services/accounts/WalletManager";
import { getStore } from "src/store/store";
import SecretPhraseConfirmRoute from "src/routes/SecretPhraseConfirmRoute";

import { App } from "./components";
import { InjectResetStyle, InjectGlobalStyle } from "./styles";
import { PasswordManager } from "./services/accounts/PasswordManager";
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
  RestoreConfirmationRoute,
  TransactionSignRequestRoute
} from "./routes";
import { VersionBox } from "./containers";

export const browserHistory = createBrowserHistory();

export class NavigableRouter extends BrowserRouter {
  history = browserHistory;
}

class Root extends React.Component {
  @Inject(WalletManager) walletManager;

  @Inject(WalletActions) walletActions;

  @Inject(TransactionManager) transactionManager;

  @Inject(TransactionActions) transactionActions;

  @Inject(PasswordManager) passwordManager;

  state = {
    store: null,
    hasWallet: false,
    canUse: false
  };

  constructor(props, context) {
    super(props, context);

    this.state.store = getStore();
    this.transactionManager.listen(async transaction => {
      const preparedTransaction = await this.transactionActions.prepareTransaction(
        transaction.id,
        transaction.from,
        transaction.to,
        transaction.amount
      )(this.state.store.dispatch);

      const canUse = await this.canUse();
      const hasWallet = await this.hasWallet();
      const shouldConfirm = await this.shouldConfirm();
      const hasPassword = await this.hasPassword();

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

      if (!hasWallet && hasPassword) {
        browserHistory.push("/import-wallet");
        return;
      }

      browserHistory.push("/transaction-sign-request");

      return preparedTransaction;
    });
  }

  async componentDidMount() {
    const canUse = await this.canUse();
    const hasWallet = await this.hasWallet();
    const shouldConfirm = await this.shouldConfirm();
    const hasPassword = await this.hasPassword();

    this.setState({ canUse, hasWallet, shouldConfirm, hasPassword });

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
            {this.state.hasWallet &&
              !this.state.canUse && <Redirect to="/password" />}
            {this.state.canUse &&
              !this.state.shouldConfirm && <Redirect to="/wallet" />}
            {this.state.canUse &&
              this.state.shouldConfirm && <Redirect to="/confirm-phrase" />}
            {!this.state.hasWallet &&
              this.state.hasPassword && <Redirect to="/import-wallet" />}
            <Switch>
              <Route exact path="/" component={WelcomeRoute} />
              <Route
                path="/confirm-phrase"
                component={SecretPhraseConfirmRoute}
              />
              <Route path="/unknown" component={UnknownDomainRoute} />
              <Route path="/new-wallet" component={PasswordCreateRoute} />
              <Route path="/secret-phrase" component={SecretPhraseRoute} />
              <Route
                path="/restore-confirmation"
                component={RestoreConfirmationRoute}
              />
              <Route path="/wallet" component={WalletRoute} />
              <Route path="/import-wallet" component={ImportRoute} />
              <Route path="/import-password" component={PasswordCreateRoute} />
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

  async hasPassword() {
    return await this.passwordManager.hasPassword();
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
