import { DependencyContextHolder } from 'src/context/DependencyContextHolder';

export function Reducer(type) {
  return (Class) => {
    DependencyContextHolder.addClassToGroup(Reducer, Class);
  }
}

export function getDefinedReducers() {
  return DependencyContextHolder.resolveClassGroup(Reducer);
}