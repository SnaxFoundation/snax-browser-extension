import { Singleton } from "src/context/steriotypes/Singleton";
import { ConfirmTransactionMessage } from "src/services/communication/privateTransaction/messages/ConfirmTransactionMessage";
import { RequestConfirmationTransactionMessage } from "src/services/communication/privateTransaction/messages/RequestConfirmationTransactionMessage";
import { OutboundCommunicator } from "src/utils/communication/communicators/OutboundCommunicator";

@Singleton
export class PrivateTransactionOutboundCommunicator extends OutboundCommunicator {
  constructor() {
    super("PRIVATE_TRANSACTION");
  }

  sendConfirmTransaction(transaction) {
    return this.send(new ConfirmTransactionMessage(transaction));
  }

  sendRequestConfirmationTransactionMessage(transaction) {
    return this.send(new RequestConfirmationTransactionMessage(transaction));
  }
}
