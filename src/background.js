import 'babel-polyfill';
import {Inject} from 'src/context/steriotypes/Inject';
import {PasswordInboundCommunicator} from 'src/services/communication/password/PasswordInboundCommunicator';
import {PrivateTransactionInboundCommunicator} from 'src/services/communication/privateTransaction/PrivateTransactionInboundCommunicator';
import {PrivateTransactionOutboundCommunicator} from 'src/services/communication/privateTransaction/PrivateTransactionOutboundCommunicator';
import {Holder} from 'src/services/misc/Holder';
const PASSWORD_HOLDER_TOKEN = 'password';


class BackgroundScript {
  
  @Inject(PasswordInboundCommunicator)
  passwordInboundCommunicator;
  
  @Inject(PrivateTransactionInboundCommunicator)
  privateTransactionInboundCommunicator;
  
  @Inject(PrivateTransactionOutboundCommunicator)
  privateTransactionOutboundCommunicator;
  
  @Inject(Holder)
  holder;
  
  popup;
  
  run() {
    this.handlePopupRequests();
    this.handleContentRequests();
  }
  
  handlePopupRequests() {
    this.passwordInboundCommunicator.handleGetPassword(() =>  this.holder.get(PASSWORD_HOLDER_TOKEN));
    this.passwordInboundCommunicator.handleSavePassword((payload) => this.holder.hold(PASSWORD_HOLDER_TOKEN, payload.password));
  }
  
  handleContentRequests() {
  
    this.privateTransactionInboundCommunicator.handleRequestConfirmationTransaction((payload) => {
      return new Promise((resolve, reject) => {
        if (this.popup) {
          this.popup.close();
        }
    
        setTimeout(() => {
          this.popup = window.open(chrome.extension.getURL("index.html"), "extension_popup", "width=360,height=625,status=no,scrollbars=no,resizable=no");
          this.popup.addEventListener('load', this.listenTransactionConfirmation(payload, resolve, reject))
        }, 500); //TODO check what we can do with timeout
      })
    });
  }
  
  listenTransactionConfirmation(payload, resolve, reject) {
     return async () => {
       try {
         const result = await this.privateTransactionOutboundCommunicator.sendConfirmTransaction(payload);
         resolve(result);
       } catch (e) {
         console.error(e);
         reject(e);
       }
     }
  }
}


new BackgroundScript().run();