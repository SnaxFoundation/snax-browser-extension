import {Singleton} from 'src/context/steriotypes/Singleton';
import {OutboundCommunicator} from 'src/utils/communication/communicators/OutboundCommunicator';
import {GetPasswordMessage} from 'src/services/communication/password/messages/GetPasswordMessage';
import {SavePasswordMessage} from 'src/services/communication/password/messages/SavePasswordMessage';

@Singleton
export class PasswordOutboundCommunicator extends OutboundCommunicator {
  constructor() {
    super('PASSWORD');
  }
  
  async getPassword() {
    return (await this.send(new GetPasswordMessage())).password;
    
  }
  
  async savePassword(password) {
    return await this.send(new SavePasswordMessage(password));
  }
}