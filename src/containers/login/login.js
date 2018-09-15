import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';

import Logo from '../../components/logo/logo';
import { login } from '../../actions/user';
import * as utils from '../../common/js/utils';

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  msg: state.msg,
});

@connect(mapStateToProps)
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.toRegister = this.toRegister.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo.isAuth) {
      this.props.history.push(utils.getRedirectPath(nextProps.userInfo));
    }
  }

  handleChange(key, value) {
    this.setState({
      [key]: value,
    })
  }

  login() {
    this.props.dispatch(login(this.state));
  }

  toRegister() {
    this.props.history.push('/register');
  }

  render() {
    return (
      <div className="login-wrapper">
        <Logo />
        <WingBlank>
          <InputItem onChange={value => this.handleChange('username', value)}>用户名</InputItem>
          <InputItem type="password" onChange={value => this.handleChange('password', value)}>密码</InputItem>
          <WhiteSpace />
          <WhiteSpace />
          <Button type="primary" onClick={this.login}>登录</Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.toRegister}>注册用户</Button>
          <div className="error-msg">
            {this.props.msg.loginErrorMsg}
          </div>
        </WingBlank>
      </div>
    )
  }
}
