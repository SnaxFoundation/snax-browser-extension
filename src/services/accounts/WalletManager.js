import {
  seedPrivate,
  privateToPublic,
  isValidPrivate,
} from '@snaxfoundation/snaxjs-ecc';
import bip39 from 'bip39';

import { Inject } from 'src/context/steriotypes/Inject';
import { PasswordManager } from 'src/services/accounts/PasswordManager';
import { Singleton } from 'src/context/steriotypes/Singleton';
import { EncryptedStorage } from '../misc/EncryptedStorage';

class Wallet {
  constructor(publicKey, wif) {
    this.wif = wif;
    this.publicKey = publicKey;
  }
}

class WalletCreationResult {
  static negative(mnemonic) {
    return new WalletCreationResult(arguments);
  }

  constructor(mnemonic, wallet) {
    this.wallet = wallet;
    this.mnemonic = mnemonic;
    this.isCreationSucceed = !!wallet;
  }
}

class WalletExtractionResult {
  static negative() {
    return new WalletExtractionResult();
  }

  constructor(wallet) {
    this.wallet = wallet;
    this.isExtractionSucceed = !!wallet;
  }
}

const WIF_STORAGE_ITEM_NAME = 'xf881x';

@Singleton
export class WalletManager {
  @Inject(PasswordManager) passwordManager = null;

  @Inject(EncryptedStorage) encryptedStorage = null;

  async tryCreateWalletByMnemonic(mnemonic) {
    const seed = bip39.mnemonicToSeedHex(mnemonic).toString();
    const wif = seedPrivate(seed);
    const publicKey = privateToPublic(wif);
    return new WalletCreationResult(mnemonic, new Wallet(publicKey, wif));
  }

  async tryCreateWalletByPrivateKey(wif) {
    if (!isValidPrivate(wif)) {
      return new WalletCreationResult(null, null);
    }

    try {
      const publicKey = await privateToPublic(wif);
      return new WalletCreationResult(null, new Wallet(publicKey, wif));
    } catch (error) {
      return new WalletCreationResult(null, null);
    }
  }

  async createMnemonic() {
    let mnemonic,
      wif,
      valid = false;
    do {
      mnemonic = bip39.generateMnemonic();
      const seed = bip39.mnemonicToSeedHex(mnemonic).toString();
      wif = seedPrivate(seed);
      valid = isValidPrivate(wif);
    } while (!valid);
    return mnemonic;
  }

  async hasWallet() {
    return this.encryptedStorage.hasItem(WIF_STORAGE_ITEM_NAME);
  }

  async hasWalletAndCanUse() {
    let result = false;
    try {
      result = (await this.getWallet()).isExtractionSucceed;
    } finally {
      return result;
    }
  }

  async getWallet() {
    const wif = await this.encryptedStorage.getItem(WIF_STORAGE_ITEM_NAME);
    if (!wif) {
      return WalletExtractionResult.negative();
    }
    const publicKey = await privateToPublic(wif);

    const wallet = new WalletExtractionResult(new Wallet(publicKey, wif));

    return wallet;
  }

  async clear() {
    return this.encryptedStorage.hasItem(WIF_STORAGE_ITEM_NAME);
  }
}

/*


*/
