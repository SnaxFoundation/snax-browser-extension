import { Selectors } from 'src/context/redux/Selectors';
import { PlatformBindingReducer } from 'src/store/platformBinding/PlatformBindingReducer';
import { Selector } from 'src/utils/redux/Selector';

@Selectors(PlatformBindingReducer)
export class PlatformBindingSelectors {
  @Selector
  currentPlatformToBind(state) {
    return state.platform;
  }

  @Selector
  currentPlatformBindingError(state) {
    return state.error;
  }

  @Selector
  isCurrentPlatformBindingRejected(state) {
    return state.isRejected;
  }

  @Selector
  isCurrentPlatformBindingSucceed(state) {
    return state.isSucceed;
  }

  @Selector
  isCurrentPlatformBindingSigned(state) {
    return state.isSigned;
  }

  @Selector
  isCurrentPlatformBindingActive(state) {
    return state.isActive;
  }

  @Selector
  isCurrentPlatformBindingFailed(state) {
    return state.isFailed;
  }
}
