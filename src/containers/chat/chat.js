import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import { socket } from '../../common/js/constants';
import { getChatId } from '../../common/js/utils';
import emoji from '../../common/js/emoji';
import { setMsgRead } from '../../actions/chat';
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

    // 获取emoji表情
    this.emojis = emoji.expression.map(item => ({icon: '', text: item.text}));

    this.state = {
      text: '',
      showEmoji: false,
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fixCarousel = this.fixCarousel.bind(this);
    this.setScroll = this.setScroll.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.toggleEmojiShow = this.toggleEmojiShow.bind(this);
    this.updateMsgRead = this.updateMsgRead.bind(this);
  }

  componentDidMount() {
    // 聊天信息滚动到最底端
    this.setScroll();
    // 解决组件bug
    this.fixCarousel();
    // 设置信息已读
    this.updateMsgRead();
  }

  componentDidUpdate() {
    this.setScroll();
  }

  componentWillReceiveProps(nextProps) {
    const nextList = nextProps.chatMsg.msgList;
    const curList = this.props.chatMsg.msgList;
    const otherSideId = nextProps.match.params.id;

    // 当在聊天页面收到对方新的信息时，设置为已读
    if (nextList.length !== curList.length && nextList[nextList.length - 1].from === otherSideId) {
      this.updateMsgRead(nextProps);
    }
  }

  updateMsgRead(props = this.props) {
    const { match, dispatch } = props;
    const otherSideId = match.params.id;

    dispatch(setMsgRead({ otherSideId }));
  }

  setScroll() {
    if (this.content) {
      const { height } = this.textWrapper.getBoundingClientRect();
      this.content.scrollTop = height;
    }
  }

  fixCarousel() {
    // 解决antd-nobile的Grid组件的bug
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
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

    if (content) {
      socket.emit('send', {from, to, content});
    }

    this.setState({
      text: '',
    });
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  }

  toggleEmojiShow() {
    this.setState({
      showEmoji: !this.state.showEmoji,
    }, () => {
      this.fixCarousel();
    })
  }

  addToText(emoji) {
    this.setState({
      text: this.state.text + emoji.text,
    });
    this.input.focus();
  }

  render() {
    const { text, showEmoji } = this.state;
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
                    <List.Item thumb={toAvatar}>
                      <span className="text-box to">
                        {msg.content}
                      </span>
                    </List.Item>
                  </List>
                ) : (
                  <List key={msg._id}>
                    <List.Item className="me" extra={<img src={meAvatar} />}>
                      <span className="text-box from">
                        {msg.content}
                      </span>
                    </List.Item>
                  </List>
                )
              })
            }
          </div>
        </div>
        <div className="footer">
          <List>
            <InputItem
              ref={el => this.input = el}
              placeholder="请输入信息"
              value={text}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              extra={(
                <div>
                  <span style={{ marginRight: '10px' }} onClick={this.toggleEmojiShow}>☺</span>
                  <span onClick={this.handleSubmit}>发送</span>
                </div>
              )}
            />
          </List>
          {
            showEmoji &&
            <Grid
              data={this.emojis}
              columnNum={8}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={v => this.addToText(v)}
            />
          }
        </div>
      </div>
    )
  }
}
