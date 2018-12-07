import { Actions } from "src/context/redux/Actions";
import { Inject } from "src/context/steriotypes/Inject";
import { PasswordManager } from "src/services/accounts/PasswordManager";
import { WalletManager } from "src/services/accounts/WalletManager";
import {
  UPDATE_MNEMONIC,
  UPDATE_PUBLIC_KEY
} from "src/store/wallet/WalletConstants";
import { Action, ThunkAction } from "src/utils/redux/Action";

@Actions
export class WalletActions {
  @Inject(PasswordManager) passwordManager;

  @Inject(WalletManager) walletManager;

  @ThunkAction
  createWifCandidate(passwordCandidate) {
    return async dispatch => {
      this.passwordManager.setPassword(passwordCandidate);
      const mnemonic = await this.walletManager.createMnemonic();
      dispatch(this._updateMnemonic(mnemonic));
      return mnemonic;
    };
  }

  @ThunkAction
  tryCreateWifFromCandidate(mnemonic) {
    return async dispatch => {
      const result = await this.walletManager.tryCreateWalletByMnemonic(
        mnemonic
      );
      dispatch(this._updatePublicKey(result.wallet.publicKey));
      return result;
    };
  }

  @ThunkAction
  tryCreateWalletByMnemonic(password, mnemonic) {
    return async dispatch => {
      await this.passwordManager.setPassword(password);
      const result = await this.walletManager.tryCreateWalletByMnemonic(
        mnemonic
      );
      if (result.isCreationSucceed) {
        dispatch(this._updatePublicKey(result.wallet.publicKey));
      }
      return result;
    };
  }

  @ThunkAction
  tryExtractWalletFromStorage(password) {
    return async dispatch => {
      if (password) {
        await this.passwordManager.setPassword(password);
      }
      const result = await this.walletManager.getWallet();
      if (result.isExtractionSucceed) {
        dispatch(this._updatePublicKey(result.wallet.publicKey));
      }
      return result;
    };
  }

  @ThunkAction
  clearWallet() {
    return async dispatch => {
      this.walletManager.clear();
      await this.passwordManager.clearPassword();
      dispatch(this._updatePublicKey(""));
      dispatch(this._updateMnemonic(""));
    };
  }

  @Action(UPDATE_PUBLIC_KEY)
  _updatePublicKey(publicKey) {
    return { publicKey };
  }

  @Action(UPDATE_MNEMONIC)
  _updateMnemonic(mnemonic) {
    console.log(mnemonic);
    return { mnemonic };
  }
}
