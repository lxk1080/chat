import React, { Component } from 'react';
import { connect } from 'react-redux';

import Logo from '../../components/logo/logo';
import { List, InputItem, WingBlank, WhiteSpace, Radio, Button } from 'antd-mobile';

import { register } from '../../actions/user';

const mapStateToProps = state => ({
  userMeta: state.userMeta,
  msg: state.msg,
});

@connect(mapStateToProps)
export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      pwd: '',
      repeatPwd: '',
      type: 'jober',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleReister = this.handleReister.bind(this);
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
      <div className="login">
        <Logo />
        <WingBlank>
          <InputItem onChange={value => this.handleChange('user', value)}>用户名</InputItem>
          <InputItem type="password" onChange={value => this.handleChange('pwd', value)}>密码</InputItem>
          <InputItem type="password" onChange={value => this.handleChange('repeatPwd', value)}>确认密码</InputItem>
          <List renderHeader="请选择你的身份">
            <RadioItem
              checked={this.state.type === 'jober'}
              onChange={() => this.handleChange('type', 'jober')}
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
          {
            this.props.msg.registerErrorMsg ?
              <div className="error-msg">{this.props.msg.registerErrorMsg}</div> : null
          }
        </WingBlank>
      </div>
    )
  }
}
