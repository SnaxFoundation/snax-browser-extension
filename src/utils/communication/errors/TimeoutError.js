import {TransferableError} from 'src/utils/communication/errors/TransferableError';

export class TimeoutError extends TransferableError {
  _timeoutError = true;

  static isTimeoutError(obj) {
    return Boolean(obj._timeoutError);
  }
  
  static toTimeoutError(obj) {
    return new TimeoutError(obj.message);
  }

}