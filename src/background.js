import 'babel-polyfill';
import {Inject} from 'src/context/steriotypes/Inject';
import {InboundCommunicator} from 'src/services/communication/InboundCommunicator';
import {GetPasswordMessage} from 'src/services/communication/messages/GetPasswordMessage';
import {SavePasswordMessage} from 'src/services/communication/messages/SavePasswordMessage';
import {Holder} from 'src/services/misc/Holder';

const PASSWORD_HOLDER_TOKEN = 'password';

class BackgroundScript {
  
  @Inject(InboundCommunicator)
  popupCommunicator;
  
  @Inject(Holder)
  holder;
  
  run() {
    this.popupCommunicator
      .handle(GetPasswordMessage, () =>  this.holder.get(PASSWORD_HOLDER_TOKEN));
    
    this.popupCommunicator
      .handle(SavePasswordMessage, (payload) =>  this.holder.hold(PASSWORD_HOLDER_TOKEN, payload.password));
  }
}


new BackgroundScript().run();