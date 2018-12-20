import {
  PrivateKey,
  seedPrivate,
  privateToPublic,
  isValidPrivate,
  isValidPublicKey
} from "@snaxfoundation/snaxjs-ecc";
import bip39 from "bip39";

import { Inject } from "src/context/steriotypes/Inject";
import { PasswordManager } from "src/services/accounts/PasswordManager";
import { Singleton } from "src/context/steriotypes/Singleton";

import { EncryptedStorage } from "../misc/EncryptedStorage";

class Wallet {
  constructor(wif) {
    this.publicKey = privateToPublic(wif);
    this.wif = wif;
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

const WIF_STORAGE_ITEM_NAME = "xf881x";

@Singleton
export class WalletManager {
  @Inject(PasswordManager) passwordManager = null;

  @Inject(EncryptedStorage) encryptedStorage = null;

  async tryCreateWalletByMnemonic(mnemonic) {
    const seed = bip39.mnemonicToSeedHex(mnemonic).toString();
    const wif = seedPrivate(seed);
    return new WalletCreationResult(mnemonic, new Wallet(wif));
  }

  async createMnemonic() {
    let mnemonic,
      wif,
      valid = false;
    window.bip39 = bip39;
    window.seedPrivate = seedPrivate;
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
    return this.hasWallet() && (await this.passwordManager.hasPassword());
  }

  async getWallet() {
    const wif = await this.encryptedStorage.getItem(WIF_STORAGE_ITEM_NAME);
    if (!wif) {
      return WalletExtractionResult.negative();
    }

    const wallet = new WalletExtractionResult(new Wallet(wif));

    return wallet;
  }

  async clear() {
    return this.encryptedStorage.hasItem(WIF_STORAGE_ITEM_NAME);
  }
}

/*


*/
