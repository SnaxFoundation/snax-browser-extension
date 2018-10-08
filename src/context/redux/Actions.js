import {DependencyContextHolder} from 'src/context/DependencyContextHolder';

export function Actions(Class) {
  DependencyContextHolder.defineClass(Class);
}