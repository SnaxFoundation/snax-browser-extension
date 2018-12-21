import "babel-polyfill";
import { Inject } from "src/context/steriotypes/Inject";
import { PrivateTransactionOutboundCommunicator } from "src/services/communication/privateTransaction/PrivateTransactionOutboundCommunicator";
import { PrivateDataInboundCommunicator } from "src/services/communication/privateData/PrivateDataInboundCommunicator";
import { PublicDataInboundCommunicator } from "src/services/communication/publicData/PublicDataInboundCommunicator";
import { PublicTransactionInboundCommunicator } from "src/services/communication/publicTransaction/PublicTransactionInboundCommunicator";
import { PrivateDataOutboundCommunicator } from "src/services/communication/privateData/PrivateDataOutboundCommunicator";

class ContentScript {
  @Inject(PublicTransactionInboundCommunicator)
  publicTransactionInboundCommunicator;

  @Inject(PrivateTransactionOutboundCommunicator)
  privateTransactionOutboundCommunicator;

  @Inject(PrivateDataInboundCommunicator) privateDataInboundCommunicator;
  @Inject(PublicDataInboundCommunicator) publicDataInboundCommunicator;

  @Inject(PrivateDataOutboundCommunicator) dataOutboundCommunicator;

  run() {
    window.onload = () => {
      const node = document.getElementsByTagName("body")[0];
      const script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", chrome.extension.getURL("injected.bundle.js"));
      node.appendChild(script);
    };

    this.publicTransactionInboundCommunicator.handleSendTransaction(
      async payload => {
        return await this.privateTransactionOutboundCommunicator.sendRequestConfirmationTransactionMessage(
          payload
        );
      }
    );

    this.publicDataInboundCommunicator.handleRequestData(
      async ({ id, name }) => {
        return await this.dataOutboundCommunicator.sendRequestDataMessage(
          id,
          name
        );
      }
    );
  }
}

new ContentScript().run();
