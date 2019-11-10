import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import "../node_modules/material-components-web/dist/material-components-web.min.css"
import "material-icons/iconfont/material-icons.css"
import "../node_modules/@rmwc/list/collapsible-list.css"

import reducers from './reducers';
import savingMiddleware from "./saving-middleware"

const preloadedState = localStorage.getItem('spinner')
  ? JSON.parse(localStorage.getItem('spinner'))
  : {}
console.log("A");
console.log(reducers);
console.log(preloadedState);
console.log(composeWithDevTools(applyMiddleware(reduxThunk, savingMiddleware)(createStore)))
export const store = createStore(
  reducers,
  preloadedState,
  composeWithDevTools(applyMiddleware(reduxThunk, savingMiddleware))
)
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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
