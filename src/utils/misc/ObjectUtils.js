export function findObjectMethodsHash(object) {
  if (object === Object.prototype) {
    return [];
  }
  return Reflect.ownKeys(object).filter(key => typeof object[key] === 'function' && key !== 'constructor')
    .map(key => [key, object[key]])
    .concat(Object.entries(findObjectMethodsHash(Reflect.getPrototypeOf(object))))
    .reverse()
    .reduce((acc, entry) => ({...acc, [entry[0]]: entry[1]}), {} );
}