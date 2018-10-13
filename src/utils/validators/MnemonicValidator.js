const MNEMONIC_LENGTH = 12;

export class MnemonicValidator {
  isValid;
  
  constructor(mnemonic) {
    this.isValid = mnemonic && mnemonic.split(' ').length === MNEMONIC_LENGTH;
  }
}