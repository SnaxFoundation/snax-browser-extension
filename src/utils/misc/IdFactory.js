export class IdFactory {
  static _global;
  
  static getId() {
    if (!this._global) {
      this._global = new IdFactory();
    }
    
    return this._global.getId();
  }
  
  lastId = 1;
  prefix;
  
  constructor(prefix = '') {
    this.prefix = prefix;
  }
  
  getId() {
    return this.prefix + (this.lastId++).toString()
  }
}