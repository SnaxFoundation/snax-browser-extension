import { Inject } from "src/context/steriotypes/Inject";
import { Singleton } from "src/context/steriotypes/Singleton";
import { PrivateTransactionInboundCommunicator } from "src/services/communication/privateTransaction/PrivateTransactionInboundCommunicator";

@Singleton
export class TransactionManager {
  @Inject(PrivateTransactionInboundCommunicator)
  privateTransactionInboundCommunicator;

  _currentTransaction;
  _currentResolver;
  _currentRejector;

  listen(handler) {
    this.privateTransactionInboundCommunicator.handleConfirmTransaction(
      async payload => {
        if (payload.from && payload.to) {
          payload = await handler(payload);

          return await this._handleTransactionConfirmation(payload);
        } else if (payload.data) {
          console.log(payload);
        }
      }
    );
  }

  discardTransaction() {
    this._currentResolver({ isRejectedByUser: true, isConfirmed: false });
  }

  confirmTransaction() {
    this._currentResolver({ isRejectedByUser: false, isConfirmed: true });
    this._clean();
  }

  failTransaction(error) {
    this._currentRejector(error);
    this._clean();
  }

  getCurrentTransaction() {
    return this._currentTransaction;
  }

  _handleTransactionConfirmation(transaction) {
    this._currentTransaction = transaction;

    return new Promise(async (resolve, reject) => {
      this._currentResolver = resolve;
      this._currentRejector = reject;
    });
  }

  _clean() {
    this._currentTransaction = null;
    this._currentResolver = null;
    this._currentRejector = null;
  }
}
