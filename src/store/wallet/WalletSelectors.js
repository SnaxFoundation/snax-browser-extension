import {Selectors} from 'src/context/redux/Selectors';
import {WalletReducer} from 'src/store/wallet/WalletReducer';
import {Selector} from 'src/utils/redux/Selector';

@Selectors(WalletReducer)
export class WalletSelectors {
  
  @Selector
  publicKey(state) {
    return state.publicKey;
  }
  
  @Selector
  mnemonic(state) {
    return state.mnemonic;
  }
  
  @Selector
  hasWallet(state) {
    return state.hasWallet;
  }
}