import { Singleton } from 'src/context/steriotypes/Singleton';
import { SendTransactionMessage } from 'src/services/communication/publicTransaction/messages/SendTransactionMessage';
import { OutboundCommunicator } from 'src/utils/communication/communicators/OutboundCommunicator';
import { PostMessaging } from 'src/utils/communication/strategies/PostMessaging';

@Singleton
export class PublicTransactionOutboundCommunicator extends OutboundCommunicator {
  constructor() {
    super('PUBLIC_TRANSACTION', new PostMessaging());
  }

  sendTransaction(id, from, to, amount, platform, memo) {
    return this.send(
      new SendTransactionMessage({
        id,
        from,
        to,
        amount,
        platform,
        memo,
        type: 'TRANSFER',
      })
    );
  }

  sendPlatformBindTransaction(id, platform, account, salt) {
    return this.send(
      new SendTransactionMessage({
        id,
        platform,
        account,
        salt,
        type: 'PLATFORM_BIND',
      })
    );
  }
}
