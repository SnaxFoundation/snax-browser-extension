import {DependencyContextHolder} from 'src/context/DependencyContextHolder';

export function Inject(Class) {
  return (target, name, descriptor = {}) => {
    descriptor.get = () => DependencyContextHolder.resolveClass(Class);
    descriptor.initializer = () => DependencyContextHolder.resolveClass(Class);
    
    Reflect.deleteProperty(target, name);
    Reflect.defineProperty(target, name, {
      initializer: () => DependencyContextHolder.resolveClass(Class),
      get() {
        return DependencyContextHolder.resolveClass(Class);
      }
    });
  }
}
