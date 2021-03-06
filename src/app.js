import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; // 使组件变为路由组件（通过路由到达这个组件），以包含history属性
import * as utils from './common/js/utils';
import { updateUserInfo } from './actions/user';
import { check } from './apis/user';

const mapStateToProps = state => ({});

@withRouter
@connect(mapStateToProps)
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // 获取用户信息
    check().then(res => {
      // 已登录
      if (res.code === 0) {
        const { type, avatar } = res.data;
        // 加载用户信息
        this.props.dispatch(updateUserInfo(res.data));
        // 根据用户信息跳转页面
        this.props.history.push(utils.getRedirectPath({type, avatar}));

        return;
      }

      // 未登录
      if (['/login', '/register'].includes(this.props.location.pathname)) {
        return;
      }
      this.props.history.push('/login');
    })
  }

  render() {
    return null
  }
}
