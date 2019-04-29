import { Action, ThunkAction } from 'src/utils/redux/Action';
import { Actions } from 'src/context/redux/Actions';
import { Inject } from 'src/context/steriotypes/Inject';
import { PrivateSnaxProvider } from 'src/services/snax/PrivateSnaxProvider';

import {
  SET_PLATFORM_BINDING_AS_DISCARDED,
  SET_PLATFORM_BINDING_AS_FAILED,
  SET_PLATFORM_BINDING_AS_FINISHED,
  SET_PLATFORM_BINDING_AS_SIGNED,
  SET_PLATFORM_TO_BIND,
} from './PlatformBindingConstants';
import { TransactionManager } from '../../services/transaction/TransactionManager';

@Actions
export class PlatformBindingActions {
  @Inject(PrivateSnaxProvider) privateSnaxProvider;

  @Inject(TransactionManager) transactionManager;

  @ThunkAction
  preparePlatformToBind(platformBindAction) {
    return async dispatch => {
      dispatch(this._setPlatformToBind(platformBindAction));
      return platformBindAction;
    };
  }

  @ThunkAction
  bindPlatform() {
    return async dispatch => {
      const bindPlatformTransaction = await this.transactionManager.getCurrentTransaction();

      const result = await this.privateSnaxProvider.bindPlatform(
        bindPlatformTransaction.platform,
        bindPlatformTransaction.account,
        bindPlatformTransaction.salt
      );

      if (result.isSucceed) {
        dispatch(this._setPlatformBindingAsSigned());
        this.transactionManager.confirmTransaction();
      } else {
        dispatch(this._setPlatformBindingAsFailed(result.error));
        this.transactionManager.failTransaction(result.error);
      }
    };
  }

  @Action
  discardTransaction() {
    return dispatch => {
      dispatch(this._setPlatformBindingAsDiscarded());
      this.transactionManager.discardTransaction();
    };
  }

  @Action(SET_PLATFORM_TO_BIND)
  _setPlatformToBind({ platform, account, salt }) {
    return { platform, account, salt };
  }

  @Action(SET_PLATFORM_BINDING_AS_DISCARDED)
  _setPlatformBindingAsDiscarded() {
    return null;
  }

  @Action(SET_PLATFORM_BINDING_AS_SIGNED)
  _setPlatformBindingAsSigned() {
    return null;
  }

  @Action(SET_PLATFORM_BINDING_AS_FINISHED)
  _setPlatformBindingAsFinished() {
    return null;
  }

  @Action(SET_PLATFORM_BINDING_AS_FAILED)
  _setPlatformBindingAsFailed(error) {
    return {
      error,
    };
  }
}
