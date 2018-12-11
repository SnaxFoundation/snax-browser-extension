import { AES, enc } from "crypto-js";
import { Inject } from "src/context/steriotypes/Inject";
import { Singleton } from "src/context/steriotypes/Singleton";
import { PasswordManager } from "src/services/accounts/PasswordManager";
import localforage from "localforage";

localforage.config({
  name: "snaxWallet",
  version: 1.0,
  driver: localforage.LOCALSTORAGE,
  storeName: "snax_wallet",
  description: "snax wallet storage"
});

@Singleton
export class EncryptedStorage {
  @Inject(PasswordManager) passwordManager;

  async getItem(key) {
    const value = await localStorage.getItem(key);

    if (value == null) {
      return null;
    }

    const password = await this.passwordManager.getPassword();

    return AES.decrypt(value, password).toString(enc.Utf8);
  }

  async setItem(key, string) {
    const password = await this.passwordManager.getPassword();
    const encryptedString = AES.encrypt(string, password);

    return localStorage.setItem(key, encryptedString);
  }

  hasItem(key) {
    return localStorage.getItem(key);
  }

  removeItem(key) {
    return localStorage.removeItem(key);
  }

  clear() {
    return localStorage.clear();
  }
}
