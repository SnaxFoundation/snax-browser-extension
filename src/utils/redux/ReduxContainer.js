import { connect } from 'react-redux';
import { DependencyContextHolder } from 'src/context/DependencyContextHolder';
import {findObjectMethodsHash} from 'src/utils/misc/ObjectUtils';


function getResolvedHash(Class) {
  if (!Class) {
    return {};
  }
  
  const resolvedMethods = Class ? DependencyContextHolder.resolveClass(Class) : {};
  const resolvedMethodsHash = findObjectMethodsHash(resolvedMethods);
  
  Object.keys(resolvedMethodsHash).map(key => {
    const original = resolvedMethodsHash[key];
    resolvedMethodsHash[key] = (...args) => original.apply(resolvedMethods, args)
  });
  
  return resolvedMethodsHash;
}


export function ReduxContainer(selectorsClasses, actionsClasses) {
  return (Component) => {
    selectorsClasses = [].concat(selectorsClasses);
    actionsClasses = [].concat(actionsClasses);
    
    const resolvedActionsHash = actionsClasses
      .map(getResolvedHash)
      .reduce((acc, hash) => ({ ...acc, ...hash }), {});
    
    const resolvedSelectorsHash = selectorsClasses
      .map(getResolvedHash)
      .reduce((acc, hash) => ({ ...acc, ...hash }), {});
    
    const mapStateToProps = (state) => Object.entries(resolvedSelectorsHash)
      .reduce((acc, entry) => ({ ...acc, [entry[0]]: entry[1](state)}), {});
    
    return connect(mapStateToProps, resolvedActionsHash)(Component);
  }
}