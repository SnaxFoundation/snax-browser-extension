import { DataMessage } from "src/services/communication/publicData/messages/DataMessage";
import { InboundCommunicator } from "src/utils/communication/communicators/InboundCommunicator";
import { RequestDataMessage } from "src/services/communication/publicData/messages/RequestDataMessage";
import { SetDataMessage } from "src/services/communication/publicData/messages/SetDataMessage";
import { Singleton } from "src/context/steriotypes/Singleton";

@Singleton
export class PrivateDataInboundCommunicator extends InboundCommunicator {
  constructor() {
    super("REQUEST_DATA");
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
