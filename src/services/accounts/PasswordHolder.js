import {Singleton} from 'src/context/steriotypes/Singleton';

let currentPassword = null;


@Singleton
export class PasswordHolder {
  
  getPassword() {
    if (currentPassword == null) {
      throw new Error('password is not defined');
    }
    return currentPassword;
  }
  
  setPassword(password) {
    currentPassword = password;
  }
  
  cleanPassword() {
    currentPassword = null;
  }
}