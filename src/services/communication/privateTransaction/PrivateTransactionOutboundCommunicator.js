import {Singleton} from 'src/context/steriotypes/Singleton';
import {ConfirmTransactionMessage} from 'src/services/communication/privateTransaction/messages/ConfirmTransactionMessage';
import {RequestConfiramtionTransactionMessage} from 'src/services/communication/privateTransaction/messages/RequestConfiramtionTransactionMessage';
import {OutboundCommunicator} from 'src/utils/communication/communicators/OutboundCommunicator';

@Singleton
export class PrivateTransactionOutboundCommunicator extends OutboundCommunicator {
  
  constructor() {
    super('PRIVATE_TRANSACTION');
  }
  
  sendConfirmTransaction(transaction) {
    return this.send(new ConfirmTransactionMessage(transaction))
  }
  
  sendRequestConfirmationTransactionMessage(transaction) {
    return this.send(new RequestConfiramtionTransactionMessage(transaction))
  }
}