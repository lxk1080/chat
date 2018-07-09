import React, { Component } from 'react';
import axios from 'axios';
// 使组件变为路由组件，以包含history属性
import { withRouter } from 'react-router-dom';

@withRouter
export default class AuthRoute extends Component {
  componentDidMount() {
    // 防止F5刷新再次请求
    const list = ['/login', '/register', '/boss'];
    if (list.includes(this.props.location.pathname)) {
      return;
    }
    // 获取用户信息
    axios.get('/user/info').then((res) => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          this.props.history.push('/boss')
        } else {
          this.props.history.push('/login')
        }
      }
    })
  }

  render() {
    return null
  }
}
