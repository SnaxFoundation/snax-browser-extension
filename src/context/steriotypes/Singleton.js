import {DependencyContextHolder} from 'src/context/DependencyContextHolder';

export function Singleton(Class) {
  DependencyContextHolder.defineClass(Class)
}