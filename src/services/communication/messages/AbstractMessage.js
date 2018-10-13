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
    
    return message;
  }
  
  static getType() {
    return this.name;
  }
  
  type = this.constructor.getType();
  id = IdFactory.getId();
  requestBody;
  responseBody = null;
  _isResponseMessage = false;
  
  constructor(request) {
    this.requestBody = request;
  }
  
  toResponse(body) {
    const message = this.clone();
    message.responseBody = body;
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
    newClone._isResponseMessage = this._isResponseMessage;
    return newClone;
  }
}