import { Actions } from 'src/context/redux/Actions';
import { Inject } from 'src/context/steriotypes/Inject';
import { PrivateSnaxProvider } from 'src/services/snax/PrivateSnaxProvider';
import { TransactionManager } from 'src/services/transaction/TransactionManager';
import { AccountResolver } from 'src/services/accounts/AccountResolver';
import {
  SET_TRANSACTION_AS_DISCARDED,
  SET_TRANSACTION_AS_FAILED,
  SET_TRANSACTION_AS_FINISHED,
  SET_TRANSACTION_AS_SIGNED,
  SET_TRANSACTION_TO_SIGN,
} from 'src/store/transaction/TransactionConstants';
import { Action, ThunkAction } from 'src/utils/redux/Action';

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
        transaction.to,
        transaction.amount,
        transaction.platform
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
  prepareTransaction(id, from, to, amount, platform) {
    return async dispatch => {
      let transaction;

      const currentBalance = await this.privateSnaxProvider.getBalance(from);

      if (!from) {
        throw new Error('Sender is not defined');
      }

      if (!to) {
        throw new Error('Recipient is not defined');
      }

      if (!amount) {
        throw new Error('Transaction amount is no defined');
      }

      if (!platform) {
        throw new Error('Transaction platform is not defined');
      }

      if (platform === 'twitter') {
        const toId = await this.accountResolver.getIdByAccountName(to);
        const accountName = await this.accountResolver.getAccountNameById(toId);

        if (!accountName) {
          throw new Error('This receiver account is not exist');
        }

        if (accountName.toLowerCase().trim() !== to.toLowerCase().trim()) {
          throw new Error('Can\'t resolve "to" account');
        }

        transaction = {
          balance: currentBalance,
          id,
          from,
          to: toId,
          displayName: accountName,
          amount,
          platform,
        };
      } else if (platform === 'snax') {
        if (from.toLowerCase().trim() === to.toLowerCase().trim()) {
          throw new Error("Can't send transaction to the self");
        }

        transaction = {
          balance: currentBalance,
          id,
          from,
          to,
          displayName: to,
          amount,
          platform,
        };
      } else {
        throw new Error(`Platform ${platform} is not supported`);
      }

      dispatch(this.setTransactionToSign(transaction));
      return transaction;
    };
  }

  @Action(SET_TRANSACTION_TO_SIGN)
  setTransactionToSign({
    balance,
    id,
    from,
    to,
    displayName,
    amount,
    platform,
  }) {
    return {
      balance,
      id,
      to,
      from,
      amount,
      displayName,
      platform,
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
      error,
    };
  }
}
