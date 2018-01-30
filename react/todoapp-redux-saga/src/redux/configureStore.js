import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer, { rootSaga } from './modules/todoApp';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);
  return store;
}

// const configureStore = () => createStore(reducer, applyMiddleware(sagaMiddleware));

// sagaMiddleware.run(todoSaga);
// const configureStore = () => createStore(reducer);
export default configureStore;
