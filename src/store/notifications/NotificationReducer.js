import {Reducer} from 'src/context/redux/Reducer';
import {HIDE, SHOW} from 'src/store/notifications/NotificationConstants';
import {Reduce} from 'src/utils/redux/Reduce';

@Reducer()
export class NotificationReducer {
  
  @Reduce(SHOW)
  handleShow(state = {}, payload) {
    return {
      ...state,
      isSuccess: payload.isSuccess,
      message: payload.message,
      isVisible: !!payload.message,
    }
  }
  
  @Reduce(HIDE)
  handleHide(state = {}, payload) {
    return {
      ...state,
      isSuccess: payload.isSuccess,
      message: payload.message,
      isVisible: !!payload.message,
    }
  }

  @Reduce.Default
  defaultState() {
    return {
      isSuccess:false,
      message: '',
      isVisible: false,
    };
  }
}