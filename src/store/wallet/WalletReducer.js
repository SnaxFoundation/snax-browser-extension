import {Reducer} from 'src/context/redux/Reducer';
import {Inject} from 'src/context/steriotypes/Inject';
import {WalletManager} from 'src/services/accounts/WalletManager';
import {UPDATE_MNEMONIC_AND_PUBLIC_KEY} from 'src/store/wallet/WalletConstants';
import {Reduce} from 'src/utils/redux/Reduce';

@Reducer()
export class WalletReducer {
  
  @Inject(WalletManager)
  walletManager;
  
  @Reduce(UPDATE_MNEMONIC_AND_PUBLIC_KEY)
  handleCreateWallet(state = {}, payload) {
    
    return {
      ...state,
      mnemonic: payload.mnemonic,
      publicKey: payload.publicKey,
    }
  }

  @Reduce.Default
  defaultState() {
    return {
      hasWallet: this.walletManager.hasWallet()
    };
  }
}