import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavBar, TabBar } from 'antd-mobile';

import './dashboard.scss';

const mapstateToProps = state => ({
  userMeta: state.userMeta,
});

function Boss(){}
function Worker(){}
function Msg(){}
function User(){}

@connect(mapstateToProps)
export default class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const navList = [
      {
        path: '/boss',
        component: Boss,
        text: 'worker',
        title: 'worker列表',
        icon: 'boss',
        hide: this.props.userMeta.type === 'worker'
      },
      {
        path: '/worker',
        component: Worker,
        text: 'boss',
        title: 'boss列表',
        icon: 'worker',
        hide: this.props.userMeta.type === 'boss'
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
	
	const { pathname } = this.props.location;
	
	if (pathname === '/') {
	  this.props.history.push('/login');
	  return null;
	}

    const title = navList.find(item => item.path === pathname).title;

    const tabList = navList.filter(item => !item.hide);

    return (
      <div className="dashboard-container">
        <div className="header">
          <NavBar className="title">{title}</NavBar>
        </div>

        <div className="content">

        </div>

        <div className="footer">
          <TabBar>
            {
              tabList.map(item => (
                  <TabBar.Item
                    key={item.path}
                    title={item.text}
                    icon={{uri: require(`../../common/icon/${item.icon}.png`)}}
                    selectedIcon={{uri: require(`../../common/icon/${item.icon}-active.png`)}}
                    selected={item.path === pathname}
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
