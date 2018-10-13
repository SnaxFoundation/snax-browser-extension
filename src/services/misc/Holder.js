import {Singleton} from 'src/context/steriotypes/Singleton';

@Singleton
export class Holder {
  
  map = new Map();
  
  hold(key, value) {
    this.map.set(key, value);
  }
  
  get(key) {
    return this.map.get(key);
  }
  
  delete(key) {
    this.map.delete(key)
  }
}