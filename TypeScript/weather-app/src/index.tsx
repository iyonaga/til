import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';

import App from './containers/App';
import configureStore, { epicMiddleware } from './store/configureStore';
import epics from './epics';

const store = configureStore();

epicMiddleware.run(epics);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
