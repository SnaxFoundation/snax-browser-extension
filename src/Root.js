import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Inject } from "src/context/steriotypes/Inject";
import SecretPhraseConfirmRoute from "src/routes/SecretPhraseConfirmRoute";
import { WalletManager } from "src/services/accounts/WalletManager";
import { TransactionManager } from "src/services/transaction/TransactionManager";
import { getStore } from "src/store/store";
import { TransactionActions } from "src/store/transaction/TransactionActions";
import { WalletActions } from "src/store/wallet/WalletActions";

import { App } from "./components";

import {
  UnknownDomainRoute,
  WelcomeRoute,
  NewWalletRoute,
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

  @Inject(TransactionManager) transactionManager;

  @Inject(TransactionActions) transactionActions;

  state = {
    store: null,
    hasWallet: false,
    canUse: false
  };

  constructor(props, context) {
    super(props, context);

    this.state.store = getStore();
    this.transactionManager.listen(async transaction => {
      console.log(
        this.state.store.dispatch(
          this.transactionActions.prepareTransaction(
            transaction.id,
            transaction.from,
            transaction.to,
            transaction.amount
          )
        )
      );

      const canUse = await this.canUse();
      const hasWallet = await this.hasWallet();

      if (!hasWallet) {
        browserHistory.push("/new-wallet");
        return;
      }

      if (!canUse) {
        browserHistory.push("/password");
        return;
      }

      browserHistory.push("/transaction-sign-request");
    });
  }

  async componentDidMount() {
    const canUse = await this.canUse();
    const hasWallet = await this.hasWallet();

    this.setState({ canUse, hasWallet });

    if (canUse) {
      this.state.store.dispatch(
        this.walletActions.tryExtractWalletFromStorage()
      );
    }
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <NavigableRouter>
          <App>
            {this.state.hasWallet &&
              !this.state.canUse && <Redirect to="/password" />}
            {this.state.canUse && <Redirect to="/wallet" />}
            <Switch>
              <Route exact path="/" component={WelcomeRoute} />
              <Route
                path="/confirm-phrase"
                component={SecretPhraseConfirmRoute}
              />
              <Route path="/unknown" component={UnknownDomainRoute} />
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
}
export default Root;
