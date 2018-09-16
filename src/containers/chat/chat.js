import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, InputItem, NavBar } from 'antd-mobile';
import io from 'socket.io-client';
import { setMsgList, receiveMsg } from '../../actions/chat';
import { getMsgList } from '../../apis/chat';

import './chat.scss';

const mapstateToProps = state => ({
  userInfo: state.userInfo,
  chatMsg: state.chatMsg,
});

@connect(mapstateToProps)
export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.socket = io('ws://127.0.0.1:9093');

    this.state = {
      text: '',
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getMsgList().then(res => {
      if (res.code === 0) {
        this.props.dispatch(setMsgList(res.data));
      }
    });

    this.socket.on('reply', (data) => {
      this.props.dispatch(receiveMsg(data));
    })
  }

  onChange(value) {
    this.setState({
      text: value,
    })
  }

  handleSubmit() {
    const from = this.props.userInfo._id;
    const to = this.props.match.params.id;
    const content = this.state.text;

    this.socket.emit('send', {from, to, content});

    this.setState({
      text: '',
    });
  }

  render() {
    const { text } = this.state;
    const { chatMsg } = this.props;

    const toUser = this.props.match.params.id;

    return (
      <div className="chat-wrapper">
        <div className="header">
          <NavBar className="title">{toUser}</NavBar>
        </div>
        <div className="content">
          {
            chatMsg.msgList.map(msg => {
              return msg.from === toUser ? (
                <List key={msg._id}>
                  <List.Item>{msg.content}</List.Item>
                </List>
              ) : (
                <List key={msg._id}>
                  <List.Item className="me" extra="avatar">{msg.content}</List.Item>
                </List>
              )
            })
          }
        </div>
        <div className="footer">
          <List>
            <InputItem
              placeholder="请输入信息"
              value={text}
              onChange={this.onChange}
              extra={<span onClick={this.handleSubmit}>发送</span>}
            />
          </List>
        </div>
      </div>
    )
  }
}