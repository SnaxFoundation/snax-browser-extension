import { TimeoutError } from 'src/utils/communication/errors/TimeoutError';
import { AbstractMessage } from 'src/utils/communication/messages/AbstractMessage';
import { isMessageValid } from 'src/utils/communication/CommunicationUtils';
import { ExtensionMessaging } from 'src/utils/communication/strategies/ExtensionMessaging';

class Container {
  static TIMEOUT = 1000 * 60 * 5;

  timeoutId;

  constructor(id, resolver, rejector, cleaner) {
    this.resolver = resolver;
    this.cleaner = cleaner;
    this.rejector = rejector;

    this.timeoutId = setTimeout(() => {
      this.rejector(new TimeoutError('Timeout for message with id ' + id));
      this.cleaner();
    }, Container.TIMEOUT);
  }

  resolve(msg) {
    clearTimeout(this.timeoutId);
    if (msg.error) {
      this.rejector(msg.error);
    } else {
      this.resolver(msg.responseBody);
    }

    this.cleaner();
  }
}

export class OutboundCommunicator {
  _connectionName;
  _strategy;
  _resolversMap = new Map();

  constructor(
    connectionName,
    strategy = new ExtensionMessaging(connectionName)
  ) {
    this._connectionName = connectionName;
    this._strategy = strategy.getOutbound();

    this._strategy.listen(msg => {
      if (!msg) return;

      if (!this._resolversMap.has(msg.id)) {
        if (process.env.NODE_ENV === 'development') return;
      }

      this._resolversMap.get(msg.id).resolve(msg);
    });
  }

  send(message) {
    this._strategy.send(message);

    return new Promise((resolve, reject) => {
      this._resolversMap.set(
        message.id,
        new Container(message.id, resolve, reject, () => {
          this._resolversMap.delete(message.id);
        })
      );
    });
  }
}
