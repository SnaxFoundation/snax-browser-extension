import {Singleton} from 'src/context/steriotypes/Singleton';
import {InboundCommunicator} from 'src/utils/communication/communicators/InboundCommunicator';
import {GetPasswordMessage} from 'src/services/communication/password/messages/GetPasswordMessage';
import {SavePasswordMessage} from 'src/services/communication/password/messages/SavePasswordMessage';

@Singleton
export class PasswordInboundCommunicator extends InboundCommunicator {
  constructor() {
    super('PASSWORD');
  }
  
  handleGetPassword(handler) {
    return this.handle(GetPasswordMessage, handler);
  }
  
  handleSavePassword(handler) {
    return this.handle(SavePasswordMessage, handler);
  }
  
}