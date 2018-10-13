import {Singleton} from 'src/context/steriotypes/Singleton';
import {isMessageValid} from 'src/utils/communication/CommunicationUtils';

class Container {
  static TIMEOUT = 10000;
  
  timeoutId;
  
  
  constructor(id, resolver, rejector, cleaner) {
    this.resolver = resolver;
    this.cleaner = cleaner;
    this.rejector = rejector;
    
    this.timeoutId = setTimeout(() => {
      this.cleaner();
      this.rejector(new Error('Timeout for message with id ' + id));
    }, Container.TIMEOUT);
  }
  
  resolve(msg) {
    clearTimeout(this.timeoutId);
    this.resolver(msg.responseBody);
    this.cleaner();
  }
}

@Singleton
export class OutboundCommunicator {
  static CONNECTION_NAME = 'Mints';
  
  resolversMap = new Map();
  port;
  
  constructor() {
    
    this.port = chrome.extension.connect({
      name: OutboundCommunicator.CONNECTION_NAME
    });
    
    this.port.onMessage.addListener((msg) => {
        if (!isMessageValid(msg)) {
          console.warn('Message has invalid format, please check', msg);
          return;
        }
        
        if (!this.resolversMap.has(msg.id)) {
          console.warn('Message with id ' + msg.id + ' had been reserved but handler was not found, it can be cause my timeout', msg);
          return;
        }
        
        this.resolversMap.get(msg.id).resolve(msg);
    });
  }
  
  send(message) {
    this.port.postMessage(message);
  
    return new Promise((resolve, reject) => {
      this.resolversMap.set(message.id, new Container(message.id, resolve, reject, () => {
        this.resolversMap.delete(message.id);
      }));
    });
  }
}