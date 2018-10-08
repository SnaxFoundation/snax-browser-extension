export function getReduxBranchNameFromClass(Class) {
  const name = Class.name.replace(/reducer$/i,  '');
  const [firstLetter, ...rest] = name;
  return firstLetter.toLowerCase() + rest.join('');
  
}