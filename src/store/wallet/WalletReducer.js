import { Inject } from 'src/context/steriotypes/Inject';
import { Reduce } from 'src/utils/redux/Reduce';
import { Reducer } from 'src/context/redux/Reducer';
import {
  UPDATE_MNEMONIC,
  UPDATE_PUBLIC_KEY,
  UPDATE_BALANCE,
  UPDATE_ACCOUNT,
} from 'src/store/wallet/WalletConstants';
import { WalletManager } from 'src/services/accounts/WalletManager';

import { SET_CONFIRMED } from './WalletConstants';

@Reducer()
export class WalletReducer {
  @Inject(WalletManager) walletManager;

  @Reduce(UPDATE_PUBLIC_KEY)
  handleUpdatePublicKey(state, payload) {
    return {
      ...state,
      publicKey: payload.publicKey,
    };
  }

  @Reduce(UPDATE_BALANCE)
  handleUpdateBalance(state, payload) {
    return {
      ...state,
      balance: payload.balance,
    };
  }

  @Reduce(UPDATE_ACCOUNT)
  handleUpdateAccount(state, payload) {
    return {
      ...state,
      account: payload.account,
    };
  }

  @Reduce(SET_CONFIRMED)
  handleConfirmation(state, payload) {
    // TODO: FIX
    window.localStorage.setItem('confirmed', payload.confirmed);
    return { ...state, confirmed: payload.confirmed };
  }

  @Reduce(UPDATE_MNEMONIC)
  handleUpdateMnemonic(state, payload) {
    return {
      ...state,
      mnemonic: payload.mnemonic,
    };
  }

  @Reduce.Default
  defaultState() {
    return {
      hasWallet: false,
      // TODO: FIX
      confirmed: window.localStorage.getItem('confirmed') === 'true' || false,
    };
  }
}
