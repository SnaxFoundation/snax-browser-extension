import { AES, enc } from 'crypto-js';
import {Inject} from 'src/context/steriotypes/Inject';
import {Singleton} from 'src/context/steriotypes/Singleton';
import {PasswordHolder} from 'src/services/accounts/PasswordHolder';

@Singleton
export class EncryptedStorage {
  
  @Inject(PasswordHolder)
  passwordHolder;
  
  getItem(key) {
    const value = localStorage.getItem(key);
    
    if (!value) {
      return null;
    }
    
    return AES.decrypt(value, this.passwordHolder.getPassword()).toString(enc.Utf8);
  }
  
  setItem(key, string) {
    const encryptedString = AES.encrypt(string, this.passwordHolder.getPassword());
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