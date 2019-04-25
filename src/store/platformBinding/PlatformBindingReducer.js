import { Reduce } from 'src/utils/redux/Reduce';
import { Reducer } from 'src/context/redux/Reducer';

import {
  SET_PLATFORM_BINDING_AS_DISCARDED,
  SET_PLATFORM_BINDING_AS_FAILED,
  SET_PLATFORM_BINDING_AS_FINISHED,
  SET_PLATFORM_BINDING_AS_SIGNED,
  SET_PLATFORM_TO_BIND,
} from './PlatformBindingConstants';

@Reducer()
export class PlatformBindingReducer {
  @Reduce(SET_PLATFORM_TO_BIND)
  handleSettingPlatformToBind(state, payload) {
    return {
      ...state,
      platform: payload.platform,
      account: payload.account,
      salt: payload.salt,
    };
  }

  @Reduce(SET_PLATFORM_BINDING_AS_FAILED)
  handleSetPlatformBindingAsFailed(state, payload) {
    return {
      ...state,
      isFailed: true,
      error: payload.error,
    };
  }

  @Reduce(SET_PLATFORM_BINDING_AS_DISCARDED)
  handleSetPlatformBindingAsDiscarded(state, payload) {
    return {
      ...state,
      isDiscarded: true,
    };
  }

  @Reduce(SET_PLATFORM_BINDING_AS_SIGNED)
  handleSetPlatformBindingAsSigned(state, payload) {
    return {
      ...state,
      isSigned: true,
    };
  }

  @Reduce(SET_PLATFORM_BINDING_AS_FINISHED)
  handleSetPlatformBindingAsFinished(state, payload) {
    return {
      ...state,
      isFinished: true,
    };
  }

  @Reduce.Default
  defaultState() {
    return {
      platform: null,
      isSigned: false,
      isFinished: false,
      isDiscarded: false,
      isFailed: false,
      error: null,
    };
  }
}
