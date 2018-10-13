import { AES, enc } from 'crypto-js';
import {Inject} from 'src/context/steriotypes/Inject';
import {Singleton} from 'src/context/steriotypes/Singleton';
import {PasswordManager} from 'src/services/accounts/PasswordManager';

@Singleton
export class EncryptedStorage {
  
  @Inject(PasswordManager)
  passwordManager;
  
  async getItem(key) {
    const value = localStorage.getItem(key);
    
    if (!value) {
      return null;
    }
    
    return AES.decrypt(value, await this.passwordManager.getPassword()).toString(enc.Utf8);
  }
  
  async setItem(key, string) {
    const encryptedString = AES.encrypt(string, await this.passwordManager.getPassword());
    localStorage.setItem(key, encryptedString);
  }
  
  hasItem(key) {
    return localStorage.getItem(key);
  }
  
  removeItem(key) {
    localStorage.removeItem(key);
  }
  
  clear() {
    localStorage.clear();
  }
}