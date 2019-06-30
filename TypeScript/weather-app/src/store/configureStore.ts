import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from '../reducers'

export const epicMiddleware = createEpicMiddleware();

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(epicMiddleware));
}

export default configureStore;
