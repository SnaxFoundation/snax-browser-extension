export class PasswordValidator {
  isValid = false;
  areMoreThan7CharactersUsed = false;
  areUppercaseAndNumberUsed = false;
  areOnlyAlphanumericAndSpecialCharactersUsed = false;

  constructor(passwordCandidate) {

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
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|.*[-+_!@#$%^&*.,?])[A-Za-z\d-+_!@#$%^&*.,?]{8,}$/.test(
      passwordCandidate
    );
  }
}
