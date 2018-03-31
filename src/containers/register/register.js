import React, { Component } from 'react';
import Logo from '../../components/logo/logo';
import { List, InputItem, WingBlank, WhiteSpace, Radio, Button } from 'antd-mobile';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'jober'
    };
  }

  handleChange(key, role) {
    this.setState({
      [key]: role
    })
  }

  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div className="login">
        <Logo />
        <WingBlank>
          <InputItem>用户名</InputItem>
          <InputItem>密码</InputItem>
          <InputItem>确认密码</InputItem>
          <List renderHeader="请选择你的身份">
            <RadioItem
              checked={this.state.type === 'jober'}
              onChange={this.handleChange.bind(this, 'type', 'jober')}
            >
              求职者
            </RadioItem>
            <RadioItem
              checked={this.state.type === 'boss'}
              onChange={this.handleChange.bind(this, 'type', 'boss')}
            >
              老板
            </RadioItem>
          </List>
          <WhiteSpace />
          <Button type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}
