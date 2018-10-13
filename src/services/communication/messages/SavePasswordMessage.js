import {AbstractMessage} from 'src/services/communication/messages/AbstractMessage';


export class SavePasswordMessage extends AbstractMessage {
  constructor(password) {
    super({ password });
  }
  
  toResponse() {
    return super.toResponse(null);
  }
}