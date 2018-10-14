import {TransferableError} from 'src/utils/communication/errors/TransferableError';
import {IdFactory} from 'src/utils/misc/IdFactory';

export class AbstractMessage {
  
  static from(obj) {
    const message = new this();
    
    if (this !== AbstractMessage && obj.type !== message.type) {
      throw new Error('Messages have different types, if you want a generic clone, please use AbstractMessage#from directly');
    }
    
    message.type = obj.type;
    message.id = obj.id;
    message.requestBody = obj.requestBody;
    message.responseBody = obj.responseBody;
    message._isResponseMessage = obj._isResponseMessage;
    message.error = obj.error;
    
    return message;
  }
  
  static getType() {
    return this.name;
  }
  
  type = this.constructor.getType();
  id = IdFactory.getId();
  requestBody;
  responseBody = null;
  error = null;
  _isResponseMessage = false;
  
  constructor(request) {
    this.requestBody = request;
  }
  
  toResponse(body) {
    const message = this.clone();
    message.responseBody = body;
    message._isResponseMessage = true;
    return message;
  }
  
  toFailedMessage(error) {
    const message = this.clone();
    message.error = new TransferableError(error.message);
    return message;
  }
  
  isRequest() {
    return !this._isResponseMessage;
  }
  isResponse() {
    return this._isResponseMessage;
  }
  
  clone() {
    const newClone = {};
    newClone.type = this.type;
    newClone.id = this.id;
    newClone.requestBody = this.requestBody;
    newClone.responseBody = this.responseBody;
    newClone.error = this.error;
    newClone._isResponseMessage = this._isResponseMessage;
    return newClone;
  }
}