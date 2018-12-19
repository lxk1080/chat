import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // 处理异步
import { BrowserRouter, Route, Link, Switch, Redirect, withRouter } from 'react-router-dom'; // 浏览器端路由

import './common/js/config';
import './common/css/index.scss';

import App from './app';
import Login from './containers/login/login';
import Register from './containers/register/register';
import Bossinfo from './containers/bossinfo/bossinfo';
import Workerinfo from './containers/workerinfo/workerinfo';
import Dashboard from './containers/dashboard/dashboard';
import Chat from './containers/chat/chat';
import ErrorPage from './components/error/error';

import reducers from './reducers';

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : v => v
));

ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        {/*根据获取的用户信息做跳转*/}
        <App />
        <Switch>
          <Redirect from="/" exact to="/login" />
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/bossinfo' component={Bossinfo}/>
          <Route path='/workerinfo' component={Workerinfo}/>
          <Route path='/chat/:id' component={Chat} />
          <Route path='/error' component={ErrorPage} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
);
