import { Action, ThunkAction } from 'src/utils/redux/Action';
import { Actions } from 'src/context/redux/Actions';
import { EncryptedStorage } from 'src/services/misc/EncryptedStorage';
import { Inject } from 'src/context/steriotypes/Inject';
import { PasswordManager } from 'src/services/accounts/PasswordManager';
import {
  UPDATE_MNEMONIC,
  UPDATE_PUBLIC_KEY,
  UPDATE_BALANCE,
  UPDATE_ACCOUNT,
} from 'src/store/wallet/WalletConstants';
import { WalletManager } from 'src/services/accounts/WalletManager';

import { PrivateDataOutboundCommunicator } from '../../services/communication/privateData/PrivateDataOutboundCommunicator';
import { SET_CONFIRMED } from './WalletConstants';

const WIF_STORAGE_ITEM_NAME = 'xf881x';

@Actions
export class WalletActions {
  @Inject(EncryptedStorage) encryptedStorage = null;

  @Inject(PasswordManager) passwordManager;

  @Inject(WalletManager) walletManager;

  @Inject(PrivateDataOutboundCommunicator) dataOutboundCommunicator = null;

  setBackgroundPublicKey(publicKey) {
    return this.dataOutboundCommunicator.sendSetDataMessage(
      'tx' + Math.random() * 100,
      'publicKey',
      publicKey
    );
  }

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
  createNewMnemonic() {
    return async dispatch => {
      const mnemonic = await this.walletManager.createMnemonic();
      dispatch(this.setConfirmed(false));
      dispatch(this._updateMnemonic(mnemonic));
      return mnemonic;
    };
  }

  @ThunkAction
  generateWalletFromMnemonic(mnemonic) {
    return async dispatch => {
      return this.walletManager.tryCreateWalletByMnemonic(mnemonic);
    };
  }

  @ThunkAction
  getWifFromStorage() {
    return async () => {
      const {
        wallet: { wif: privateKey },
      } = await this.walletManager.getWallet();

      return privateKey;
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
      dispatch(this.setConfirmed(false));
      if (result.isCreationSucceed) {
        dispatch(this._updatePublicKey(result.wallet.publicKey));
        this.encryptedStorage.setItem(WIF_STORAGE_ITEM_NAME, result.wallet.wif);
      }
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
        this.setBackgroundPublicKey(result.wallet.publicKey);
        dispatch(this._updatePublicKey(result.wallet.publicKey));
        this.encryptedStorage.setItem(WIF_STORAGE_ITEM_NAME, result.wallet.wif);
      }
      return result;
    };
  }

  @ThunkAction
  tryCreateWalletByPrivateKey(wif) {
    return async dispatch => {
      const result = await this.walletManager.tryCreateWalletByPrivateKey(wif);
      if (result.isCreationSucceed) {
        this.setBackgroundPublicKey(result.wallet.publicKey);
        dispatch(this._updatePublicKey(result.wallet.publicKey));
        this.encryptedStorage.setItem(WIF_STORAGE_ITEM_NAME, result.wallet.wif);
      }
      return result;
    };
  }

  @ThunkAction
  tryExtractWalletFromStorage(password) {
    return async (dispatch, getState) => {
      if (password) {
        await this.passwordManager.setPassword(password);
      }
      const confirmed = getState().wallet.confirmed;
      const result = await this.walletManager.getWallet();
      if (result.isExtractionSucceed) {
        dispatch(this._updatePublicKey(result.wallet.publicKey));
        if (confirmed) {
          this.setBackgroundPublicKey(result.wallet.publicKey);
        }
      }
      return result;
    };
  }

  @ThunkAction
  trySetBackgroundPublicKey() {
    return async (dispatch, getState) => {
      const confirmed = getState().wallet.confirmed;
      const result = await this.walletManager.getWallet();
      if (result.isExtractionSucceed && confirmed) {
        this.setBackgroundPublicKey(result.wallet.publicKey);
        dispatch(this._updatePublicKey(result.wallet.publicKey));
      }
    };
  }

  @ThunkAction
  clearPassword() {
    return async dispatch => {
      await this.passwordManager.clearPassword();
    };
  }

  @ThunkAction
  clearWallet() {
    return async dispatch => {
      this.setBackgroundPublicKey(null);
      await this.encryptedStorage.removeItem(WIF_STORAGE_ITEM_NAME);
      await this.walletManager.clear();
      dispatch(this._updatePublicKey(''));
      dispatch(this._updateMnemonic(''));
    };
  }

  @Action(SET_CONFIRMED)
  setConfirmed(confirmed = true) {
    return { confirmed };
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
