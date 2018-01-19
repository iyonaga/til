import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import App from './container/app';
import reducer from './reducer';

import mySaga from './sagas';

// Sagaミドルウェアの作成
const sagaMiddleware = createSagaMiddleware();

//const store = createStore(reducer);
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(mySaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
