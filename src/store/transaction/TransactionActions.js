import {Actions} from 'src/context/redux/Actions';
import {Inject} from 'src/context/steriotypes/Inject';
import {PrivateEosProvider} from 'src/services/eos/PrivateEosProvider';
import {TransactionManager} from 'src/services/transaction/TransactionManager';
import {
  SET_TRANSACTION_AS_DISCARDED, SET_TRANSACTION_AS_FAILED, SET_TRANSACTION_AS_FINISHED,
  SET_TRANSACTION_AS_SIGNED,
  SET_TRANSACTION_TO_SIGN
} from 'src/store/transaction/TransactionConstants';
import {Action} from 'src/utils/redux/Action';

@Actions
export class TransactionActions {
  
  @Inject(PrivateEosProvider)
  privateEosProvider;

  @Inject(TransactionManager)
  transactionManager;
  
  signTransaction() {
      return async (dispatch) => {
        const transaction = this.transactionManager.getCurrentTransaction();
        const result = await this.privateEosProvider.transfer(transaction.from, transaction.to, transaction.amount);
        
        if (result.isSucceed) {
          dispatch(this._setTransactionAsSigned());
          this.transactionManager.confirmTransaction();
        } else {
          dispatch(this._setTransactionAsFailed(result.error));
          this.transactionManager.failTransaction(result.error);
        }
      }
  }
  
  discardTransaction() {
    return (dispatch) => {
      dispatch(this._setTransactionAsDiscarded());
      this.transactionManager.discardTransaction();
    }
  }
  
  @Action(SET_TRANSACTION_TO_SIGN)
  setTransactionToSign(id, from, to, amount) {
    return {
      id,
      to,
      from,
      amount,
    }
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
    }
  }
}