
export function Action(type) {
  
  return function (target, name, descriptor) {
    const handler = descriptor.value.bind(target);
    
    const handlerWrapper = (...args) => {
      
      const result = handler.call(target, ...args);
      
      if (typeof result !== 'function') {
        return {
          type,
          payload: result
        }
      }
      
      return (dispatch, getState) => {
        return result(dispatch, getState);
      }
    };
    
    return {
      get: () => handlerWrapper
    }
  }
}

export function ThunkAction() {

}
