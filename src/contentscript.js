import 'babel-polyfill';
import {Inject} from 'src/context/steriotypes/Inject';
import {PrivateTransactionOutboundCommunicator} from 'src/services/communication/privateTransaction/PrivateTransactionOutboundCommunicator';
import {PublicTransactionInboundCommunicator} from 'src/services/communication/publicTransaction/PublicTransactionInboundCommunicator';

class ContentScript {
  
  @Inject(PublicTransactionInboundCommunicator)
  publicTransactionInboundCommunicator;
  
  @Inject(PrivateTransactionOutboundCommunicator)
  privateTransactionOutboundCommunicator;
  
  run() {
    window.onload =  () => {
      const node = document.getElementsByTagName('body')[0];
      const script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', chrome.extension.getURL('injected.bundle.js'));
      node.appendChild(script);
    };
  
  
    this.publicTransactionInboundCommunicator.handleSendTransaction(async (payload) => {
      return await this.privateTransactionOutboundCommunicator.sendRequestConfirmationTransactionMessage(payload);
    });
  }
}


new ContentScript().run();