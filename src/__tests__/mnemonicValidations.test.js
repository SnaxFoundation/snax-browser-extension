const { MnemonicValidator } = require('../utils/validators/MnemonicValidator');

describe('validation functions test', () => {
  it('Mnemonic should be 12 words length', () => {
    const { isValid } = new MnemonicValidator(
      'manual dolphin veteran smoke swap office casino elegant enroll air habit effort'
    );
    expect(isValid).toBe(true);
  });

  it('Mnemonic should be 12 words length', () => {
    const { isValid } = new MnemonicValidator('manual');
    expect(isValid).toBe(false);
  });

  it('Mnemonic should be 12 words length', () => {
    const { isValid } = new MnemonicValidator(
      'manual dolphin veteran smoke swap office casino elegant enroll air habit effort dolphin'
    );
    expect(isValid).toBe(false);
  });
});
