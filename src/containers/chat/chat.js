import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, InputItem, NavBar, Icon } from 'antd-mobile';
import { socket } from '../../common/js/constants';
import { getChatId } from '../../common/js/utils';
// import { setMsgList, receiveMsg } from '../../actions/chat';
// import { getMsgList } from '../../apis/chat';
import './chat.scss';

const mapstateToProps = state => ({
  userInfo: state.userInfo,
  chatMsg: state.chatMsg,
  chatUser: state.chatUser,
});

@connect(mapstateToProps)
export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setScroll = this.setScroll.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    /*getMsgList().then(res => {
      if (res.code === 0) {
        this.props.dispatch(setMsgList(res.data));
      }
    });

    socket.on('reply', (data) => {
      this.props.dispatch(receiveMsg(data));
    })*/

    this.setScroll();
  }

  componentDidUpdate() {
    this.setScroll();
  }

  setScroll() {
    if (this.content) {
      const { height } = this.textWrapper.getBoundingClientRect();
      this.content.scrollTop = height;
    }
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

    socket.emit('send', {from, to, content});

    this.setState({
      text: '',
    });
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  }

  render() {
    const { text } = this.state;
    const { userInfo, chatMsg, chatUser, match } = this.props;

    // 获得对方的信息
    const toUser = chatUser.userList.find(item => item._id === match.params.id);

    if (!toUser) {
      return null;
    }

    // 头像
    const toAvatar = require(`../../common/image/${toUser.avatar}.jpg`);
    const meAvatar = require(`../../common/image/${userInfo.avatar}.jpg`);

    // 提取出当前聊天室的所有聊天信息
    const chatId = getChatId(userInfo._id, toUser._id);
    const currentChatMsg = chatMsg.msgList.filter(v => v.chatid === chatId);

    return (
      <div className="chat-wrapper">
        <div className="header">
          <NavBar
            className="title"
            icon={<Icon type="left" />}
            onLeftClick={() => {this.props.history.goBack()}}
          >
            {toUser.username}
          </NavBar>
        </div>
        <div className="content" ref={el => this.content = el}>
          <div className="text-wrapper" ref={el => this.textWrapper = el}>
            {
              currentChatMsg.map(msg => {
                return msg.from === toUser._id ? (
                  <List key={msg._id}>
                    <List.Item thumb={toAvatar}>{msg.content}</List.Item>
                  </List>
                ) : (
                  <List key={msg._id}>
                    <List.Item className="me" extra={<img src={meAvatar} />}>{msg.content}</List.Item>
                  </List>
                )
              })
            }
          </div>
        </div>
        <div className="footer">
          <List>
            <InputItem
              placeholder="请输入信息"
              value={text}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              extra={<span onClick={this.handleSubmit}>发送</span>}
            />
          </List>
        </div>
      </div>
    )
  }
}
