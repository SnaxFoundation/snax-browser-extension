import { Reducer } from "src/context/redux/Reducer";
import {
  SET_TRANSACTION_AS_DISCARDED,
  SET_TRANSACTION_AS_FAILED,
  SET_TRANSACTION_AS_FINISHED,
  SET_TRANSACTION_AS_SIGNED,
  SET_TRANSACTION_TO_SIGN
} from "src/store/transaction/TransactionConstants";
import { Reduce } from "src/utils/redux/Reduce";

@Reducer()
export class TransactionReducer {
  @Reduce(SET_TRANSACTION_TO_SIGN)
  handleSettingTransactionToSign(state, payload) {
    return {
      ...state,
      from: payload.from,
      amount: payload.amount,
      id: payload.id,
      to: payload.to,
      isActive: true,
      isFailed: false,
      isDiscarded: false,
      isSigned: false
    };
  }

  @Reduce(SET_TRANSACTION_AS_SIGNED)
  handleSettingTransactionAsSigned(state) {
    return {
      ...state,
      isSigned: true
    };
  }

  @Reduce(SET_TRANSACTION_AS_DISCARDED)
  handleSettingTransactionAsDiscarded(state) {
    return {
      ...state,
      isDiscarded: true
    };
  }

  @Reduce(SET_TRANSACTION_AS_FINISHED)
  handleSettingTransactionAsFinished(state) {
    return {
      ...state,
      isActive: false
    };
  }
  @Reduce(SET_TRANSACTION_AS_FAILED)
  handleSettingTransactionToFailed(state, payload) {
    return {
      ...state,
      isFailed: true,
      error: payload.error
    };
  }

  @Reduce.Default
  defaultState() {
    return {
      balance: "",
      id: null,
      from: "",
      to: "",
      amount: "",
      isRejected: false,
      isSucceed: false,
      isActive: false
    };
  }
}
