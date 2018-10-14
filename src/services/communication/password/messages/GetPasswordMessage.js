import {AbstractMessage} from 'src/utils/communication/messages/AbstractMessage';

export class GetPasswordMessage extends AbstractMessage {
  constructor() {
    super(null);
  }
  
  toResponse(password) {
    return super.toResponse({ password });
  }
}