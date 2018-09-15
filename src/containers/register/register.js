import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { List, InputItem, WingBlank, WhiteSpace, Radio, Button } from 'antd-mobile';

import { register } from '../../actions/user';
import * as utils from '../../common/js/utils';

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  msg: state.msg,
});

@connect(mapStateToProps)
export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      repeatPwd: '',
      type: 'worker',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleReister = this.handleReister.bind(this);
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

  handleReister() {
    this.props.dispatch(register(this.state));
  }

  render() {
    const RadioItem = Radio.RadioItem;

    return (
      <div className="register-wrapper">
        <Logo />
        <WingBlank>
          <InputItem onChange={value => this.handleChange('username', value)}>用户名</InputItem>
          <InputItem type="password" onChange={value => this.handleChange('password', value)}>密码</InputItem>
          <InputItem type="password" onChange={value => this.handleChange('repeatPwd', value)}>确认密码</InputItem>
          <List renderHeader="请选择你的身份">
            <RadioItem
              checked={this.state.type === 'worker'}
              onChange={() => this.handleChange('type', 'worker')}
            >
              求职者
            </RadioItem>
            <RadioItem
              checked={this.state.type === 'boss'}
              onChange={() => this.handleChange('type', 'boss')}
            >
              老板
            </RadioItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleReister}>注册</Button>
          <div className="error-msg">
            {this.props.msg.registerErrorMsg}
          </div>
        </WingBlank>
      </div>
    )
  }
}
