export class IdFactory {
  static _global;
  static lastId = 1;
  
  static getId() {
    if (!this._global) {
      this._global = new IdFactory();
    }
    
    return this._global.getId();
  }
  
  prefix;
  
  constructor(prefix = '') {
    this.prefix = prefix;
  }
  
  getId() {
    return this.prefix + (IdFactory.lastId++).toString() + Math.random() + Date.now().toString();
  }
}