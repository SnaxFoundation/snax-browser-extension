import {DependencyContextHolder} from 'src/context/DependencyContextHolder';
import {findObjectMethodsHash} from 'src/utils/misc/ObjectUtils';
import {getReduxBranchNameFromClass} from 'src/utils/redux/ReduxUtils';


export function Selectors(Reducer) {
  return (Class) => {
    
    class Wrapper extends Class {
      constructor(contextManager) {
        super(contextManager);
        const methods = findObjectMethodsHash(this);
        const name = getReduxBranchNameFromClass(Reducer);
        
        Object.entries(methods).forEach((entry) => {
           this[entry[0]] = (state) => {
             return entry[1](state[name]);
           }
        });
      }
    }
    
    DependencyContextHolder.defineClass(Class, Wrapper);
  }
}