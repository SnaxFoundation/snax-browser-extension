import {Actions} from 'src/context/redux/Actions';
import {Inject} from 'src/context/steriotypes/Inject';
import {PasswordHolder} from 'src/services/accounts/PasswordHolder';
import {WalletManager} from 'src/services/accounts/WalletManager';
import {
  UPDATE_MNEMONIC,
  UPDATE_PUBLIC_KEY
} from 'src/store/wallet/WalletConstants';
import {Action} from 'src/utils/redux/Action';

@Actions
export class WalletActions {
  
  @Inject(PasswordHolder)
  passwordHolder;
  
  @Inject(WalletManager)
  walletManager;
  
  @Action(UPDATE_PUBLIC_KEY)
  createWifFromCandidate(mnemonic) {
    const result = this.walletManager.recoverWifByMnemonic(mnemonic);
    console.log(result);
    return {
      publicKey: result.wallet.publicKey,
    };
  }
  
  @Action(UPDATE_MNEMONIC)
  createWifCandidate(passwordCandidate) {
    this.passwordHolder.setPassword(passwordCandidate);
    const mnemonic = this.walletManager.createMnemonic();
  
    return {
      mnemonic: mnemonic,
    };
  }
  
  @Action(UPDATE_PUBLIC_KEY)
  recoverWifByMnemonic(password, mnemonic) {
    this.passwordHolder.setPassword(password);
    const result = this.walletManager.recoverWifByMnemonic(mnemonic);
    
    return {
      publicKey: result.wallet.publicKey,
    };
  }
  
  @Action(UPDATE_PUBLIC_KEY)
  extractWalletFromStorage(password) {
    this.passwordHolder.setPassword(password);
    const wallet = this.walletManager.getWallet();
    
    return {
      publicKey: wallet.publicKey,
    }
  }
  
  @Action(UPDATE_PUBLIC_KEY)
  clearWallet() {
    this.walletManager.clear();
    this.passwordHolder.cleanPassword();
    
    return {
      mnemonic: '',
      publicKey: '',
    }
  }
}