export class PasswordValidator {
  isValid = false;
  areMoreThan7CharactersUsed = false;
  areOnlyAlphanumericAndSpecialCharactersUsed = false;
  areAtLeastOneUppercaseAndNumberOrCharacter = false;

  constructor(passwordCandidate) {
    this.areMoreThan7CharactersUsed = this.validateThatMoreThan7CharactersExist(
      passwordCandidate
    );

    this.areOnlyAlphanumericAndSpecialCharactersUsed = this.validateThatOnlyAlphanumericAndSpecialCharactersPresent(
      passwordCandidate
    );

    this.areAtLeastOneUppercaseAndNumberOrCharacter = this.validateThatAtLeastOneUppercaseAndNumberOrCharacter(
      passwordCandidate
    );

    this.isValid =
      this.areMoreThan7CharactersUsed &&
      this.areOnlyAlphanumericAndSpecialCharactersUsed &&
      this.areAtLeastOneUppercaseAndNumberOrCharacter;
  }

  validateThatMoreThan7CharactersExist(passwordCandidate) {
    return Boolean(passwordCandidate && passwordCandidate.length > 7);
  }

  validateThatOnlyAlphanumericAndSpecialCharactersPresent(passwordCandidate) {
    return /^([A-Z]|[0-9]|[a-z]|[-!#@$%^&*()_+|~=`{}[\]:";'<>?,.]){1,}$/.test(
      passwordCandidate
    );
  }

  validateThatAtLeastOneUppercaseAndNumberOrCharacter(passwordCandidate) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|.*[-!#@$%^&*()_+|~=`{}[\]:";'<>?,.])[A-Za-z\d-!#@$%^&*()_+|~=`{}[\]:";'<>?,.]{1,}/.test(
      passwordCandidate
    );
  }
}
