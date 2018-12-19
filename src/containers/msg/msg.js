import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';
import { formatTime } from '../../common/js/date';
import './msg.scss';

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  chatMsg: state.chatMsg,
  chatUser: state.chatUser,
});

@connect(mapStateToProps)
export default class Msg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatRooms: [],
    };

    this.getChatRooms = this.getChatRooms.bind(this);
    this.getLastMessageOfRoom = this.getLastMessageOfRoom.bind(this);
    this.getToUser = this.getToUser.bind(this);
    this.toChatPage = this.toChatPage.bind(this);
  }

  componentDidMount() {
    this.getChatRooms();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chatMsg !== this.props.chatMsg) {
      this.getChatRooms(nextProps);
    }
  }

  getChatRooms(props = this.props) {
    if (!props.chatMsg.msgList.length) return;

    const msgGroup = {};

    props.chatMsg.msgList.map(item => {
      msgGroup[item.chatid] = msgGroup[item.chatid] || [];
      msgGroup[item.chatid].push(item);
    })

    let chatRooms = Object.values(msgGroup);

    chatRooms.sort((a, b) => {
      if (!(a instanceof Array) || !(b instanceof Array)) return;

      let a_last = a[0].create_time;
      let b_last = b[0].create_time;

      for (const value of a) {
        if (value.create_time > a_last) {
          a_last = value.create_time;
        }
      }

      for (const value of b) {
        if (value.create_time > b_last) {
          b_last = value.create_time;
        }
      }

      return b_last - a_last;
    })

    this.setState({ chatRooms });
  }

  getLastMessageOfRoom(chats) {
    const compare = (v1, v2) => {
      return v1.create_time - v2.create_time;
    }

    return chats.sort(compare)[chats.length - 1];
  }

  getToUser(id) {
    return this.props.chatUser.userList.find(item => item._id === id);
  }

  toChatPage(id) {
    this.props.history.push(`/chat/${id}`);
  }

  render() {
    const { userInfo } = this.props;
    const { chatRooms } = this.state;

    const Item = List.Item;
    const Brief = Item.Brief;

    return (
      <div className="msg-wrapper">
        {
          chatRooms.map((chats, i) => {
            const lastMessage = this.getLastMessageOfRoom(chats);
            const time = formatTime(lastMessage.create_time);
            const unreadCount = chats.filter(v => v.to === userInfo._id && !v.read).length;
            const toUser = this.getToUser(chats[0].from === userInfo._id ? chats[0].to : chats[0].from);

            return (
              <List key={i} onClick={() => this.toChatPage(toUser._id)}>
                <Item
                  thumb={require(`../../common/image/${toUser.avatar}.jpg`)}
                  extra={<div>
                    <span>{time}</span>
                    <br/>
                    <Badge text={unreadCount} />
                  </div>}
                >
                  <span>{ toUser.username }</span>
                  <Brief>{ lastMessage.content }</Brief>
                </Item>
              </List>
            )
          })
        }
      </div>
    )
  }
}
