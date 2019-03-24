import { isMessageValid } from 'src/utils/communication/CommunicationUtils';
import { ExtensionMessaging } from 'src/utils/communication/strategies/ExtensionMessaging';

export class MessageHandlerContainer {
  MessageClass;
  handler;

  constructor(MessageClass, handler) {
    this.MessageClass = MessageClass;
    this.handler = handler;
  }

  async handle(msg) {
    const newMessage = this.MessageClass.from(msg);

    try {
      const body = await this.handler(msg.requestBody);
      return newMessage.toResponse(body);
    } catch (e) {
      console.error(e);
      return newMessage.toFailedMessage(e);
    }
  }
}

export class InboundCommunicator {
  ports = new Map();

  handlerContainersMap = new Map();

  constructor(
    connectionName,
    strategy = new ExtensionMessaging(connectionName)
  ) {
    strategy.getInbound().listenAndAnswer(async msg => {
      if (!this.handlerContainersMap.has(msg.type)) {
        return;
      }

      const result = await this.handlerContainersMap.get(msg.type).handle(msg);

      return result;
    });
  }

  handle(MessageClass, handler) {
    const type = MessageClass.getType();

    if (this.handlerContainersMap.has(type)) {
      throw new Error('Handler for type ' + type + ' is already defined');
    }

    this.handlerContainersMap.set(
      type,
      new MessageHandlerContainer(MessageClass, handler)
    );
  }
}
