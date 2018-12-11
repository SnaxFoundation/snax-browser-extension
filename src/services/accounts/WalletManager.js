import bip39 from "bip39";
import {
  PrivateKey,
  seedPrivate,
  privateToPublic
} from "@snaxfoundation/snaxjs-ecc";
import { Inject } from "src/context/steriotypes/Inject";
import { Singleton } from "src/context/steriotypes/Singleton";
import { EncryptedStorage } from "src/services/misc/EncryptedStorage";
import { PasswordManager } from "src/services/accounts/PasswordManager";

const WIF_STORAGE_ITEM_NAME = "xf881x";

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

@Singleton
export class WalletManager {
  @Inject(EncryptedStorage) encryptedStorage = null;

  @Inject(PasswordManager) passwordManager = null;

  async tryCreateWalletByMnemonic(mnemonic) {
    const seed = bip39
      .mnemonicToSeed(mnemonic, await this.passwordManager.getPassword())
      .toString();
    const wif = seedPrivate(seed);
    this.encryptedStorage.setItem(WIF_STORAGE_ITEM_NAME, wif);
    return new WalletCreationResult(mnemonic, new Wallet(wif));
  }

  async createMnemonic() {
    const value = bip39.generateMnemonic();
    return value;
  }

  async hasWallet() {
    return !!this.encryptedStorage.hasItem(WIF_STORAGE_ITEM_NAME);
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

  clear() {
    this.encryptedStorage.removeItem(WIF_STORAGE_ITEM_NAME);
  }
}
