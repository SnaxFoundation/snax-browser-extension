import {Selectors} from 'src/context/redux/Selectors';
import {TransactionReducer} from 'src/store/transaction/TransactionReducer';
import {Selector} from 'src/utils/redux/Selector';

@Selectors(TransactionReducer)
export class TransactionSelectors {
  
  @Selector
  currentTransactionSender(state) {
    return state.from;
  }
  
  @Selector
  currentTransactionRecipient(state) {
    return state.to;
  }
  
  @Selector
  currentTransactionId(state) {
    return state.id;
  }
  
  @Selector
  currentTransactionAmount(state) {
    return state.amount;
  }
  
  @Selector
  currentTransactionError(state) {
    return state.error;
  }
  
  @Selector
  isCurrentTransactionRejected(state) {
    return state.isRejected;
  }
  
  @Selector
  isCurrentTransactionSucceed(state) {
    return state.isSucceed;
  }
  
  @Selector
  isCurrentTransactionActive(state) {
    return state.isActive;
  }
  
  @Selector
  isCurrentTransactionFailed(state) {
    return state.isFailed;
  }
}