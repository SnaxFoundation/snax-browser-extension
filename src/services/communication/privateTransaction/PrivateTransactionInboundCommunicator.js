import { Singleton } from "src/context/steriotypes/Singleton";
import { ConfirmTransactionMessage } from "src/services/communication/privateTransaction/messages/ConfirmTransactionMessage";
import { RequestConfirmationTransactionMessage } from "src/services/communication/privateTransaction/messages/RequestConfirmationTransactionMessage";
import { InboundCommunicator } from "src/utils/communication/communicators/InboundCommunicator";

@Singleton
export class PrivateTransactionInboundCommunicator extends InboundCommunicator {
  constructor() {
    super("PRIVATE_TRANSACTION");
  }

  handleConfirmTransaction(handler) {
    return this.handle(ConfirmTransactionMessage, handler);
  }

  handleRequestConfirmationTransaction(handler) {
    return this.handle(RequestConfirmationTransactionMessage, handler);
  }
}
