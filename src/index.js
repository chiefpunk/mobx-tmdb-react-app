import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';

import MovieStore from './stores/MovieStore';
import CastStore from './stores/CastStore';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const stores = {
    MovieStore,
    CastStore,
    routing: routingStore,
};
const history = syncHistoryWithStore(browserHistory, routingStore);


ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
