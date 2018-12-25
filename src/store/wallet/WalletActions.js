import { Actions } from "src/context/redux/Actions";
import { Inject } from "src/context/steriotypes/Inject";
import { PasswordManager } from "src/services/accounts/PasswordManager";
import { WalletManager } from "src/services/accounts/WalletManager";
import { EncryptedStorage } from "src/services/misc/EncryptedStorage";
import {
  UPDATE_MNEMONIC,
  UPDATE_PUBLIC_KEY,
  UPDATE_BALANCE,
  UPDATE_ACCOUNT
} from "src/store/wallet/WalletConstants";
import { Action, ThunkAction } from "src/utils/redux/Action";

const WIF_STORAGE_ITEM_NAME = "xf881x";

@Actions
export class WalletActions {
  @Inject(EncryptedStorage) encryptedStorage = null;

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
  setPassword(passwordCandidate) {
    return async (dispatch, getState) => {
      const result = await this.walletManager.getWallet();
      await this.passwordManager.setPassword(passwordCandidate);
      if (result.wallet)
        await this.encryptedStorage.setItem(
          WIF_STORAGE_ITEM_NAME,
          result.wallet.wif
        );
    };
  }

  @ThunkAction
  tryCreateWifFromCandidate(mnemonic) {
    return async dispatch => {
      const result = await this.walletManager.tryCreateWalletByMnemonic(
        mnemonic
      );
      dispatch(this._updatePublicKey(result.wallet.publicKey));
      this.encryptedStorage.setItem(WIF_STORAGE_ITEM_NAME, result.wallet.wif);
      return result;
    };
  }

  @ThunkAction
  tryCreateWalletByMnemonic(mnemonic) {
    return async dispatch => {
      const result = await this.walletManager.tryCreateWalletByMnemonic(
        mnemonic
      );
      if (result.isCreationSucceed) {
        dispatch(this._updatePublicKey(result.wallet.publicKey));
        this.encryptedStorage.setItem(WIF_STORAGE_ITEM_NAME, result.wallet.wif);
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
  clearPassword() {
    return async dispatch => {
      await this.passwordManager.clearPassword();
      dispatch(this._updatePublicKey(""));
      dispatch(this._updateMnemonic(""));
    };
  }

  @ThunkAction
  clearWallet() {
    return async dispatch => {
      await this.encryptedStorage.removeItem(WIF_STORAGE_ITEM_NAME);
      await this.walletManager.clear();
      await this.passwordManager.clearPassword();
      dispatch(this._updatePublicKey(""));
      dispatch(this._updateMnemonic(""));
    };
  }

  @Action(UPDATE_PUBLIC_KEY)
  _updatePublicKey(publicKey) {
    return { publicKey };
  }

  @Action(UPDATE_BALANCE)
  _updateBalance(balance) {
    return { balance };
  }

  @Action(UPDATE_ACCOUNT)
  _updateAccount(account) {
    return { account };
  }

  @Action(UPDATE_MNEMONIC)
  _updateMnemonic(mnemonic) {
    return { mnemonic };
  }
}
