export class PasswordValidator {
  
  isValid = false;
  doMoreThan7CharactersExist = false;
  doUppercaseAndNumberExist = false;
  doOnlyAlphanumericAndSpecialCharactersPresent = false;
  
  constructor(passwordCandidate) {
    this.doMoreThan7CharactersExist
      = this.validateThatMoreThan7CharactersExist(passwordCandidate);
    this.doUppercaseAndNumberExist
      = this.validateThatUppercaseAndNumberExist(passwordCandidate);
    this.doOnlyAlphanumericAndSpecialCharactersPresent
      = this.validateThatOnlyAlphanumericAndSpecialCharactersPresent(passwordCandidate);
    
    this.isValid = this.doMoreThan7CharactersExist
      && this.doUppercaseAndNumberExist
      && this.doOnlyAlphanumericAndSpecialCharactersPresent;
  }
  
  validateThatMoreThan7CharactersExist(passwordCandidate) {
    return Boolean(passwordCandidate && passwordCandidate.length > 7);
  }
  
  validateThatUppercaseAndNumberExist(passwordCandidate) {
    return /[A-Z]/.test(passwordCandidate) && /[1-9]/.test(passwordCandidate);
  }
  
  validateThatOnlyAlphanumericAndSpecialCharactersPresent(passwordCandidate) {
    return /^[A-z1-9 !"#$%&'()*+,\-.\/:;<=>?@[\]^_`{|}\\~]+$/.test(passwordCandidate);
  }
}
