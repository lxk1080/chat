import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './containers/login/login';
import Register from './containers/register/register';
import AuthRoute from './components/authRoute/authRoute';

import reducers from './reducers';
import './common/config';

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : v => v
));

function Boss() {
  return <h1>boss</h1>
}

ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute/>
        <Route path='/boss' component={Boss}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
);
