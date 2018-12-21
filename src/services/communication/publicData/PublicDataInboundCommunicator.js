import { InboundCommunicator } from "src/utils/communication/communicators/InboundCommunicator";
import { RequestDataMessage } from "src/services/communication/publicData/messages/RequestDataMessage";
import { SetDataMessage } from "src/services/communication/publicData/messages/SetDataMessage";
import { DataMessage } from "src/services/communication/publicData/messages/DataMessage";
import { Singleton } from "src/context/steriotypes/Singleton";
import { PostMessaging } from "src/utils/communication/strategies/PostMessaging";

@Singleton
export class PublicDataInboundCommunicator extends InboundCommunicator {
  constructor() {
    super("REQUEST_DATA", new PostMessaging());
  }

  handleRequestData(handler) {
    return this.handle(RequestDataMessage, handler);
  }

  handleSetData(handler) {
    return this.handle(SetDataMessage, handler);
  }

  handleReceiveData(handler) {
    return this.handle(DataMessage, handler);
  }
}
