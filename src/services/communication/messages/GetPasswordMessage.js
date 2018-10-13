import {AbstractMessage} from 'src/services/communication/messages/AbstractMessage';

export class GetPasswordMessage extends AbstractMessage {
  constructor() {
    super(null);
  }
  
  toResponse(password) {
    return super.toResponse({ password });
  }
}