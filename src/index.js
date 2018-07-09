import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // 处理异步
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'; // 浏览器端路由

import './common/js/config';
import './common/css/index.scss';

import Login from './containers/login/login';
import Register from './containers/register/register';
import AuthRoute from './components/authRoute/authRoute';
import reducers from './reducers';


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
        {/*根据获取的用户信息做跳转*/}
        <AuthRoute/>
        <Route path='/boss' component={Boss}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
);
