import { DataMessage } from "src/services/communication/publicData/messages/DataMessage";
import { OutboundCommunicator } from "src/utils/communication/communicators/OutboundCommunicator";
import { Singleton } from "src/context/steriotypes/Singleton";

import { RequestDataMessage } from "./messages/RequestDataMessage";
import { SetDataMessage } from "./messages/SetDataMessage";

@Singleton
export class PrivateDataOutboundCommunicator extends OutboundCommunicator {
  constructor() {
    super("REQUEST_DATA");
  }

  sendDataMessage(id, name) {
    return this.send(new DataMessage({ id, name }));
  }

  sendRequestDataMessage(id, name) {
    return this.send(new RequestDataMessage({ id, name }));
  }

  sendSetDataMessage(id, name, data) {
    return this.send(new SetDataMessage({ id, name, data }));
  }
}
