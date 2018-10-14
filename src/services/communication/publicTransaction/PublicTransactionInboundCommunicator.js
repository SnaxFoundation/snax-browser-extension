import {Singleton} from 'src/context/steriotypes/Singleton';
import {SendTransactionMessage} from 'src/services/communication/publicTransaction/messages/SendTransactionMessage';
import {InboundCommunicator} from 'src/utils/communication/communicators/InboundCommunicator';
import {PostMessaging} from 'src/utils/communication/strategies/PostMessaging';

@Singleton
export class PublicTransactionInboundCommunicator extends InboundCommunicator {
  
  constructor() {
    super('PUBLIC_TRANSACTION', new PostMessaging());
  }
  
  handleSendTransaction(handler) {
    return this.handle(SendTransactionMessage, handler);
  }
}