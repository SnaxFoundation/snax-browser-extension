export class TransferableError {
  
  message = '';
  
  constructor(message) {
    this.message = message;
  }
  
  toString() {
    return this.message;
  }
}