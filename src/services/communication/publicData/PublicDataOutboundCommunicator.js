import { OutboundCommunicator } from "src/utils/communication/communicators/OutboundCommunicator";
import { PostMessaging } from "src/utils/communication/strategies/PostMessaging";
import { RequestDataMessage } from "src/services/communication/publicData/messages/RequestDataMessage";
import { Singleton } from "src/context/steriotypes/Singleton";

import { DataMessage } from "./messages/DataMessage";
import { SetDataMessage } from "./messages/SetDataMessage";

@Singleton
export class PublicDataOutboundCommunicator extends OutboundCommunicator {
  constructor() {
    super("REQUEST_DATA", new PostMessaging());
  }

  sendRequestDataMessage(id, name) {
    return this.send(new RequestDataMessage({ id, name }));
  }

  sendDataMessage(id, name, data) {
    return this.send(new DataMessage({ id, name, data }));
  }

  sendSetDataMessage(id, name, data) {
    return this.send(new SetDataMessage({ id, name, data }));
  }
}
