import {Actions} from 'src/context/redux/Actions';
import {HIDE, SHOW} from 'src/store/notifications/NotificationConstants';
import {Action} from 'src/utils/redux/Action';

const DELAY = 1000;

@Actions
export class NotificationActions {
  
  timeout;
  
  @Action
  spawnSuccessNotification(message) {
    return (dispatch) => {
      clearTimeout(this.timeout);
  
      this.timeout = setTimeout(() => {
        dispatch(this._hide())
      }, DELAY);
    
      dispatch(this._show(message, true));
    }
  }
  
  @Action
  spawnErrorNotification(message) {
    return (dispatch) => {
      clearTimeout(this.timeout);
      
      this.timeout = setTimeout(() => {
        dispatch(this._hide())
      }, DELAY);
  
      dispatch(this._show(message, false));
  
    }
  }
  
  @Action(SHOW)
  _show(message, success) {
    return {
      isSuccess: success,
      message
    };
  }
  
  @Action(HIDE)
  _hide() {
    return {
      message: null
    };
  }
}