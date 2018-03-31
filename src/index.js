import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Login from './containers/login/login';
import Register from './containers/register/register';

import reducers from './reducers';
import './common/config';

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : v => v
));

ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Redirect to="/login" />
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
);
