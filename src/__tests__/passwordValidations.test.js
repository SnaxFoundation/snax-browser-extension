const { PasswordValidator } = require('../utils/validators/PasswordValidator');

describe('validation functions test', () => {
  it('empty password is not valid', () => {
    const { isValid } = new PasswordValidator('');
    expect(isValid).toBe(false);
  });

  it('password should contains min 8 characters', () => {
    const sixCharacterValidationResult = new PasswordValidator('aabbcc');

    expect(sixCharacterValidationResult.areMoreThan7CharactersUsed).toBe(false);
    expect(sixCharacterValidationResult.isValid).toBe(false);

    const eightCharacterValidationResult = new PasswordValidator('aabbccdd');

    expect(eightCharacterValidationResult.areMoreThan7CharactersUsed).toBe(
      true
    );
    expect(eightCharacterValidationResult.isValid).toBe(false);

    const eightCharacterWithCappitalsValidationResult = new PasswordValidator(
      'AAbbccdd'
    );

    expect(
      eightCharacterWithCappitalsValidationResult.areMoreThan7CharactersUsed
    ).toBe(true);
    expect(eightCharacterWithCappitalsValidationResult.isValid).toBe(false);

    const eightCharacterWithCappitalsAndNumberValidationResult = new PasswordValidator(
      'AAbbccdd1'
    );

    expect(
      eightCharacterWithCappitalsAndNumberValidationResult.areMoreThan7CharactersUsed
    ).toBe(true);
    expect(eightCharacterWithCappitalsAndNumberValidationResult.isValid).toBe(
      true
    );

    const eightCharacterWithCappitalsAndSymbolValidationResult = new PasswordValidator(
      'AAbbccdd%'
    );

    expect(
      eightCharacterWithCappitalsAndSymbolValidationResult.areMoreThan7CharactersUsed
    ).toBe(true);
    expect(eightCharacterWithCappitalsAndSymbolValidationResult.isValid).toBe(
      true
    );
  });

  it('password can\t contain emoji', () => {
    const {
      areOnlyAlphanumericAndSpecialCharactersUsed,
    } = new PasswordValidator('😎');

    expect(areOnlyAlphanumericAndSpecialCharactersUsed).toBe(false);
  });

  it('password can\t contain space', () => {
    const {
      areOnlyAlphanumericAndSpecialCharactersUsed,
    } = new PasswordValidator(' ');

    expect(areOnlyAlphanumericAndSpecialCharactersUsed).toBe(false);
  });

  it('password can\t contain pound symbol', () => {
    const {
      areOnlyAlphanumericAndSpecialCharactersUsed,
    } = new PasswordValidator('£');

    expect(areOnlyAlphanumericAndSpecialCharactersUsed).toBe(false);
  });

  it('password can\t contain russian letter', () => {
    const {
      areOnlyAlphanumericAndSpecialCharactersUsed,
    } = new PasswordValidator('ффф');

    expect(areOnlyAlphanumericAndSpecialCharactersUsed).toBe(false);
  });

  it('password can\t contain china word', () => {
    const {
      areOnlyAlphanumericAndSpecialCharactersUsed,
    } = new PasswordValidator('简');

    expect(areOnlyAlphanumericAndSpecialCharactersUsed).toBe(false);
  });

  it('alphanumeric and special characters are allowed', () => {
    const {
      areOnlyAlphanumericAndSpecialCharactersUsed,
    } = new PasswordValidator('AAaa11-!#@$%^&*()_+|~=`{}[]:";<>?,.');

    expect(areOnlyAlphanumericAndSpecialCharactersUsed).toBe(true);
  });

  it('password can\t contain spaces', () => {
    const {
      areOnlyAlphanumericAndSpecialCharactersUsed,
    } = new PasswordValidator('hey snax');

    expect(areOnlyAlphanumericAndSpecialCharactersUsed).toBe(false);
  });

  it('at least one uppercase and number or special character', () => {
    const {
      areAtLeastOneUppercaseAndNumberOrCharacter,
      isValid,
    } = new PasswordValidator('Qwerty123');

    expect(areAtLeastOneUppercaseAndNumberOrCharacter).toBe(true);
    expect(isValid).toBe(true);
  });

  it('at least one uppercase and number or special character', () => {
    const {
      areAtLeastOneUppercaseAndNumberOrCharacter,
      isValid,
    } = new PasswordValidator('ssffsF2');

    expect(areAtLeastOneUppercaseAndNumberOrCharacter).toBe(true);
    expect(isValid).toBe(false);
  });

  it('at least one uppercase and number or special character', () => {
    const {
      areAtLeastOneUppercaseAndNumberOrCharacter,
      isValid,
    } = new PasswordValidator('A1234567_');

    expect(areAtLeastOneUppercaseAndNumberOrCharacter).toBe(false);
    expect(isValid).toBe(false);
  });

  it('at least one uppercase and number or special character', () => {
    const {
      areAtLeastOneUppercaseAndNumberOrCharacter,
      isValid,
    } = new PasswordValidator('Qw#');

    expect(areAtLeastOneUppercaseAndNumberOrCharacter).toBe(true);
    expect(isValid).toBe(false);
  });

  it('at least one uppercase and number or special character', () => {
    const {
      areAtLeastOneUppercaseAndNumberOrCharacter,
      isValid,
    } = new PasswordValidator('qq#');

    expect(areAtLeastOneUppercaseAndNumberOrCharacter).toBe(false);
    expect(isValid).toBe(false);
  });

  it('at least one uppercase and number or special character', () => {
    const {
      areAtLeastOneUppercaseAndNumberOrCharacter,
      isValid,
    } = new PasswordValidator('Qwerty%!@');

    expect(areAtLeastOneUppercaseAndNumberOrCharacter).toBe(true);
    expect(isValid).toBe(true);
  });

  it('at least one uppercase and number or special character', () => {
    const {
      areAtLeastOneUppercaseAndNumberOrCharacter,
      isValid,
    } = new PasswordValidator('Qwerty');

    expect(areAtLeastOneUppercaseAndNumberOrCharacter).toBe(false);
    expect(isValid).toBe(false);
  });
});
