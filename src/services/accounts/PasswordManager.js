import {Inject} from 'src/context/steriotypes/Inject';
import {Singleton} from 'src/context/steriotypes/Singleton';
import {PasswordOutboundCommunicator} from 'src/services/communication/password/PasswordOutboundCommunicator';

@Singleton
export class PasswordManager {
  
  @Inject(PasswordOutboundCommunicator)
  passwordOutboundCommunicator;
  
  async hasPassword() {
    return !!await this.passwordOutboundCommunicator.getPassword();
  }
  
  async getPassword() {
    const password = await this.passwordOutboundCommunicator.getPassword();
    
    if (password == null) {
      throw new Error('password is not defined');
    }
    return password;
  }
  
  async setPassword(password) {
    await this.passwordOutboundCommunicator.savePassword(password);
  }
  
  async cleanPassword() {
    await this.passwordOutboundCommunicator.savePassword(null);
  }
}