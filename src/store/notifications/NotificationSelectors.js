import {Selectors} from 'src/context/redux/Selectors';
import {NotificationReducer} from 'src/store/notifications/NotificationReducer';
import {Selector} from 'src/utils/redux/Selector';

@Selectors(NotificationReducer)
export class NotificationSelectors {
  
  @Selector
  notificationMessage(state) {
    return state.message;
  }
  
  @Selector
  isNotificationVisible(state) {
    return state.isVisible;
  }
  
  @Selector
  isNotificationSuccess(state)  {
    return state.isSuccess;
  }
}