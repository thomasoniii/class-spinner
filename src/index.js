import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter as Router } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import "../node_modules/material-components-web/dist/material-components-web.min.css"
import "material-icons/iconfont/material-icons.css"
import "../node_modules/@rmwc/list/collapsible-list.css"

import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(sagaMiddleware, reduxThunk)(createStore);

export const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <App />
    </Router>
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
