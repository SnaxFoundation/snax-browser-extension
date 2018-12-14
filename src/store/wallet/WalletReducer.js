import { Reducer } from "src/context/redux/Reducer";
import { Inject } from "src/context/steriotypes/Inject";
import { WalletManager } from "src/services/accounts/WalletManager";
import {
  UPDATE_MNEMONIC,
  UPDATE_PUBLIC_KEY,
  UPDATE_BALANCE,
  UPDATE_ACCOUNT
} from "src/store/wallet/WalletConstants";
import { Reduce } from "src/utils/redux/Reduce";

@Reducer()
export class WalletReducer {
  @Inject(WalletManager) walletManager;

  @Reduce(UPDATE_PUBLIC_KEY)
  handleUpdatePublicKey(state, payload) {
    return {
      ...state,
      publicKey: payload.publicKey
    };
  }

  @Reduce(UPDATE_BALANCE)
  handleUpdateBalance(state, payload) {
    return {
      ...state,
      balance: payload.balance
    };
  }

  @Reduce(UPDATE_ACCOUNT)
  handleUpdateAccount(state, payload) {
    return {
      ...state,
      account: payload.account
    };
  }

  @Reduce(UPDATE_MNEMONIC)
  handleUpdateMnemonic(state, payload) {
    return {
      ...state,
      mnemonic: payload.mnemonic
    };
  }

  @Reduce.Default
  defaultState() {
    return {
      hasWallet: false
    };
  }
}
