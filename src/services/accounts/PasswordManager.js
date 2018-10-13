import {Inject} from 'src/context/steriotypes/Inject';
import {Singleton} from 'src/context/steriotypes/Singleton';
import {GetPasswordMessage} from 'src/services/communication/messages/GetPasswordMessage';
import {SavePasswordMessage} from 'src/services/communication/messages/SavePasswordMessage';
import {OutboundCommunicator} from 'src/services/communication/OutboundCommunicator';

@Singleton
export class PasswordManager {
  
  @Inject(OutboundCommunicator)
  outboundCommunicator;
  
  async hasPassword() {
    return !!(await this.outboundCommunicator.send(new GetPasswordMessage())).password;
  }
  
  async getPassword() {
    const passwordResponse = await this.outboundCommunicator.send(new GetPasswordMessage());
    
    const password = passwordResponse.password;
    
    if (password == null) {
      throw new Error('password is not defined');
    }
    return password;
  }
  
  async setPassword(password) {
    await this.outboundCommunicator.send(new SavePasswordMessage(password))
  }
  
  async cleanPassword() {
    await this.outboundCommunicator.send(new SavePasswordMessage(null))
  }
}