export class PasswordValidator {
  isEmpty = false;
  isValid = false;
  areMoreThan7CharactersUsed = false;
  areUppercaseAndNumberUsed = false;
  areOnlyAlphanumericAndSpecialCharactersUsed = false;

  constructor(passwordCandidate) {
    this.isEmpty = passwordCandidate.length === 0;

    this.areMoreThan7CharactersUsed = this.validateThatMoreThan7CharactersExist(
      passwordCandidate
    );

    this.areUppercaseAndNumberUsed = this.validateThatUppercaseAndNumberExist(
      passwordCandidate
    );

    this.areOnlyAlphanumericAndSpecialCharactersUsed = this.validateThatOnlyAlphanumericAndSpecialCharactersPresent(
      passwordCandidate
    );

    this.isValid =
      this.areMoreThan7CharactersUsed &&
      this.areUppercaseAndNumberUsed &&
      this.areOnlyAlphanumericAndSpecialCharactersUsed;
  }

  validateThatMoreThan7CharactersExist(passwordCandidate) {
    return Boolean(passwordCandidate && passwordCandidate.length > 7);
  }

  validateThatUppercaseAndNumberExist(passwordCandidate) {
    return /[A-Z]/.test(passwordCandidate) && /[1-9]/.test(passwordCandidate);
  }

  validateThatOnlyAlphanumericAndSpecialCharactersPresent(passwordCandidate) {
    return /^[A-z1-9 !"#$%&'()*+,\-.\/:;<=>?@[\]^_`{|}\\~]+$/.test(
      passwordCandidate
    );
  }
}
