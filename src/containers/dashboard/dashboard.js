import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { NavBar, TabBar } from 'antd-mobile';
import { socket } from '../../common/js/constants';
import { setMsgList, receiveMsg } from '../../actions/chat';
import { getMsgList } from '../../apis/chat';
import Boss from '../boss/boss';
import Worker from '../worker/worker';
import User from '../user/user';
import Msg from '../msg/msg';
import './dashboard.scss';

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  chatMsg: state.chatMsg,
});

@connect(mapStateToProps)
export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.getTabList = this.getTabList.bind(this);
  }

  componentDidMount() {
    if (!this.props.chatMsg.msgList.length) {
      getMsgList().then(res => {
        if (res.code === 0) {
          this.props.dispatch(setMsgList({data: res.data, userId: this.props.userInfo._id}));
        }
      });

      // 这里先解绑上次绑定的，否则会多次绑定reply事件，执行多次回调函数
      // 至于为什么不在组件销毁时解绑，是因为此组件销毁时，仍然需要监听这个事件
      socket.off('reply');

      socket.on('reply', (data) => {
        this.props.dispatch(receiveMsg({data, userId: this.props.userInfo._id}));
      })
    }
  }

  getTabList(userInfo) {
    const navList = [
      {
        path: '/boss',
        component: Boss,
        text: 'worker',
        title: 'worker列表',
        icon: 'boss',
        hide: userInfo.type === 'worker'
      },
      {
        path: '/worker',
        component: Worker,
        text: 'boss',
        title: 'boss列表',
        icon: 'worker',
        hide: userInfo.type === 'boss'
      },
      {
        path: '/msg',
        component: Msg,
        text: '消息',
        title: '消息列表',
        icon: 'msg',
      },
      {
        path: '/user',
        component: User,
        text: '我的',
        title: '个人中心',
        icon: 'user',
      },
    ];

    return navList.filter(item => !item.hide);
  }

  render() {
    const { location, userInfo, chatMsg } = this.props;

    const tabList = this.getTabList(userInfo);
    const title = tabList.find(item => item.path === location.pathname).title;

    return (
      <div className="dashboard-container">
        <div className="header">
          <NavBar className="title">{title}</NavBar>
        </div>
        <div className="content">
          <Switch>
            {
              tabList.map((item, index) => {
                return <Route key={index} path={item.path} component={item.component} />
              })
            }
          </Switch>
        </div>
        <div className="footer">
          <TabBar>
            {
              tabList.map(item => (
                <TabBar.Item
                  badge={item.path === '/msg' ? chatMsg.unread: 0}
                  key={item.path}
                  title={item.text}
                  icon={{uri: require(`../../common/icon/${item.icon}.png`)}}
                  selectedIcon={{uri: require(`../../common/icon/${item.icon}-active.png`)}}
                  selected={item.path === location.pathname}
                  onPress={() => {
                    this.props.history.push(item.path)
                  }}
                >
                </TabBar.Item>
              )
            )}
          </TabBar>
        </div>
      </div>
    )
  }
}
