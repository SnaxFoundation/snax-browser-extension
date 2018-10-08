import {getDefinedReducers} from 'src/context/redux/Reducer';
import {getReduxBranchNameFromClass} from 'src/utils/redux/ReduxUtils';
import {findObjectMethodsHash} from 'src/utils/misc/ObjectUtils';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

export function getStore() {
  const reducers = getDefinedReducers();
  
  const reducersHash = reducers.reduce((acc, reducer) => {
    const branchName = getReduxBranchNameFromClass(reducer.constructor);
    
    const handlers = Object.values(findObjectMethodsHash(reducer));
    
    const composedReducer = (state, action) => handlers
      .reduce((state, reducer) => reducer(state, action), state);
    
    return { ...acc, [branchName]: composedReducer }
  }, {});
  
  
  
  return createStore(combineReducers(reducersHash), {}, compose(applyMiddleware(thunkMiddleware)));
}