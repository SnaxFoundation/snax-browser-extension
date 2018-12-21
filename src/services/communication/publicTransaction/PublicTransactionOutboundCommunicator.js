import { Singleton } from "src/context/steriotypes/Singleton";
import { SendTransactionMessage } from "src/services/communication/publicTransaction/messages/SendTransactionMessage";
import { OutboundCommunicator } from "src/utils/communication/communicators/OutboundCommunicator";
import { PostMessaging } from "src/utils/communication/strategies/PostMessaging";

@Singleton
export class PublicTransactionOutboundCommunicator extends OutboundCommunicator {
  constructor() {
    super("PUBLIC_TRANSACTION", new PostMessaging());
  }

  sendTransaction(id, from, to, amount) {
    return this.send(new SendTransactionMessage({ id, from, to, amount }));
  }
}
