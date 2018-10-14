import {Inject} from 'src/context/steriotypes/Inject';
import {Singleton} from 'src/context/steriotypes/Singleton';
import {PublicTransactionOutboundCommunicator} from 'src/services/communication/publicTransaction/PublicTransactionOutboundCommunicator';
import {IdFactory} from 'src/utils/misc/IdFactory';

@Singleton
export class PublicOnPageEosProvider {
  
  @Inject(PublicTransactionOutboundCommunicator)
  _transactionOutboundCommunicator;
  
  _idFactory;
  
  constructor() {
    this._idFactory = new IdFactory('tx');
  }
  
  transfer(from, to, amount) {
    return this._transactionOutboundCommunicator.sendTransaction(this._idFactory.getId(), from, to, amount);
  }
}
