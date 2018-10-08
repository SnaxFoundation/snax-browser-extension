import bip39 from 'bip39';
import { PrivateKey, seedPrivate, privateToPublic } from 'eosjs-ecc';
import {Inject} from 'src/context/steriotypes/Inject';
import {Singleton} from 'src/context/steriotypes/Singleton';
import {EncryptedStorage} from 'src/services/misc/EncryptedStorage';
import {PasswordHolder} from 'src/services/accounts/PasswordHolder';

const WIF_STORAGE_ITEM_NAME = 'xf881x';

class Wallet {
  constructor(publicKey, wif) {
    this.publicKey = publicKey;
    this.wif = wif;
  }
}

class WalletCreationResult {
  constructor(mnemonic, wallet) {
    this.wallet = wallet;
    this.mnemonic = mnemonic;
  }
}

@Singleton
export class WalletManager {
  
  @Inject(EncryptedStorage)
  encryptedStorage = null;
  
  @Inject(PasswordHolder)
  passwordHolder = null;
  
  recoverWifByMnemonic(mnemonic) {
    const seed = bip39.mnemonicToSeed(mnemonic, this.passwordHolder.getPassword()).toString();
    const wif = seedPrivate(seed);
    const pubKey = privateToPublic(wif);
    this.encryptedStorage.setItem(WIF_STORAGE_ITEM_NAME, wif);
    return new WalletCreationResult(mnemonic, new Wallet(pubKey, wif));
  }
  
  createMnemonic() {
    return bip39.generateMnemonic();
  }
  
  hasWallet() {
    return !!this.encryptedStorage.hasItem(WIF_STORAGE_ITEM_NAME)
  }
  
  getWallet() {
    const wif = this.encryptedStorage.getItem(WIF_STORAGE_ITEM_NAME);
    
    if (!wif) {
      throw new Error('Cannot get or decrypt WIF');
    }
    
    return new Wallet(privateToPublic(wif), wif);
  }
  
  clear() {
    this.encryptedStorage.removeItem(WIF_STORAGE_ITEM_NAME)
  }
}