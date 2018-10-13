import {Singleton} from 'src/context/steriotypes/Singleton';
import {isMessageValid} from 'src/utils/communication/CommunicationUtils';

export class MessageHandlerContainer {
  MessageClass;
  
  handler;
  
  constructor(MessageClass, handler) {
    this.MessageClass = MessageClass;
    this.handler = handler;
  }

  async handle(msg) {
    const body = await this.handler(msg.requestBody);
    return this.MessageClass.from(msg).toResponse(body);
  }
}

@Singleton
export class InboundCommunicator {
  ports = new Map();
  
  handlerContainersMap = new Map();
  
  constructor() {
    window.chrome.extension.onConnect.addListener((port) => {
      this.ports.set(port.name, port);
      
      port.onMessage.addListener(async (msg) => {
        if (!isMessageValid(msg)) {
          console.warn('Reserved invalid message', msg);
          return;
        }
        
        if (!this.handlerContainersMap.has(msg.type)) {
          console.warn('Message with type ' + msg.type + ' is reserved, but no handler defined', msg);
          return;
        }
        
        const message = await this.handlerContainersMap.get(msg.type).handle(msg);
        
        this._sendBack(port, message);
      });
      
      port.onDisconnect.addListener(() => {
        this.ports.delete(port.name);
      });
    })
  }
  
  handle(MessageClass, handler) {
    const type = MessageClass.getType();
    
    if(this.handlerContainersMap.has(type)) {
      throw new Error('Handler for type ' + type + ' is already defined');
    }
    
    this.handlerContainersMap.set(type, new MessageHandlerContainer(MessageClass, handler))
  }
  
  _sendBack(port, message) {
    port.postMessage(message);
  }
}