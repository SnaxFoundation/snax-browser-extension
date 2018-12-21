import { IdFactory } from "src/utils/misc/IdFactory";
import { Inject } from "src/context/steriotypes/Inject";
import { PublicTransactionOutboundCommunicator } from "src/services/communication/publicTransaction/PublicTransactionOutboundCommunicator";
import { PublicDataOutboundCommunicator } from "../communication/publicData/PublicDataOutboundCommunicator";
import { Singleton } from "src/context/steriotypes/Singleton";

@Singleton
export class PublicOnPageSnaxProvider {
  @Inject(PublicTransactionOutboundCommunicator)
  _transactionOutboundCommunicator;

  @Inject(PublicDataOutboundCommunicator) _publicDataOutboundCommunicator;

  _idFactory;

  constructor() {
    this._idFactory = new IdFactory("tx");
  }

  transfer(from, to, amount) {
    return this._transactionOutboundCommunicator.sendTransaction(
      this._idFactory.getId(),
      from,
      to,
      amount
    );
  }

  getPublicKey() {
    return this._publicDataOutboundCommunicator.sendRequestDataMessage(
      this._idFactory.getId(),
      "publicKey"
    );
  }
}
