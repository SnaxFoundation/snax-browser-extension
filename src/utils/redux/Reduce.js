export function Reduce(type) {
  return function (target, name, descriptor) {
    const handler = descriptor.value.bind(target);
    
    const wrappedHandler = (state, action) => {
      if (action.type === type){
        return handler(state, action.payload)
      }
      return state;
    };
    
    return {
      get: () => wrappedHandler,
    }
  }
}


Reduce.Default = function (target, name, descriptor) {
  const handler = descriptor.value.bind(target);
  
  const wrappedHandler = (state, action) => {
    if (state === undefined) {
      return handler(action);
    }
    
    return state;
  };
  
  return {
    get: () => wrappedHandler,
  }
};