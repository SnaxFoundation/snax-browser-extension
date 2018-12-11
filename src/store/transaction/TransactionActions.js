import { Actions } from "src/context/redux/Actions";
import { Inject } from "src/context/steriotypes/Inject";
import { PrivateSnaxProvider } from "src/services/eos/PrivateSnaxProvider";
import { TransactionManager } from "src/services/transaction/TransactionManager";
import { AccountResolver } from "src/services/accounts/AccountResolver";
import {
  SET_TRANSACTION_AS_DISCARDED,
  SET_TRANSACTION_AS_FAILED,
  SET_TRANSACTION_AS_FINISHED,
  SET_TRANSACTION_AS_SIGNED,
  SET_TRANSACTION_TO_SIGN
} from "src/store/transaction/TransactionConstants";
import { Action, ThunkAction } from "src/utils/redux/Action";

@Actions
export class TransactionActions {
  @Inject(PrivateSnaxProvider) privateSnaxProvider;

  @Inject(TransactionManager) transactionManager;

  @Inject(AccountResolver) accountResolver;

  @ThunkAction
  signTransaction() {
    return async dispatch => {
      const transaction = this.transactionManager.getCurrentTransaction();
      const result = await this.privateSnaxProvider.transfer(
        transaction.from,
        transaction.to.platformId,
        transaction.amount
      );

      if (result.isSucceed) {
        dispatch(this._setTransactionAsSigned());
        this.transactionManager.confirmTransaction();
      } else {
        dispatch(this._setTransactionAsFailed(result.error));
        this.transactionManager.failTransaction(result.error);
      }
    };
  }

  @Action
  discardTransaction() {
    return dispatch => {
      dispatch(this._setTransactionAsDiscarded());
      this.transactionManager.discardTransaction();
    };
  }

  @ThunkAction
  prepareTransaction(id, from, to, amount) {
    return async dispatch => {
      const toId = await this.accountResolver.getIdByAccountName(to);
      const accountName = await this.accountResolver.getAccountNameById(toId);
      if (accountName !== to) {
        throw new Error("Can\t resolve to account");
      }
      dispatch(
        this.setTransactionToSign(
          id,
          from,
          { platformId: toId, platformAccountName: to },
          amount
        )
      );
    };
  }

  @Action(SET_TRANSACTION_TO_SIGN)
  setTransactionToSign(id, from, to, amount) {
    return {
      id,
      to,
      from,
      amount
    };
  }

  @Action(SET_TRANSACTION_AS_SIGNED)
  _setTransactionAsSigned() {
    return null;
  }

  @Action(SET_TRANSACTION_AS_DISCARDED)
  _setTransactionAsDiscarded() {
    return null;
  }

  @Action(SET_TRANSACTION_AS_FINISHED)
  _setTransactionAsFinished() {
    return null;
  }

  @Action(SET_TRANSACTION_AS_FAILED)
  _setTransactionAsFailed(error) {
    return {
      error
    };
  }
}
