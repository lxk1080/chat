import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, WingBlank, Modal } from 'antd-mobile';
import Cookies from 'js-cookie';
import { logout } from '../../actions/user';
import { Redirect } from 'react-router-dom';
import './user.scss';

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

@connect(mapStateToProps)
export default class User extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    const { dispatch, history } = this.props;

    Modal.alert('退隐', '确认退出瓦洛兰大陆吗？', [
      {
        text: '取消',
        onPress: () => console.log('cancel'),
      },
      {
        text: '确认',
        onPress: () => {
          Cookies.remove('userId'); // 清除cookie
          dispatch(logout()); // 清除redux内的用户信息
        }
      }
    ])
  }

  render() {
    const { userInfo } = this.props;

    const Item = List.Item;
    const Brief = Item.Brief;

    return (
      <div className="user-wrapper">
        {
          userInfo.isAuth ? (
            <Fragment>
              <Result
                img={<img src={require(`../../common/image/${userInfo.avatar}.jpg`)} style={{width: '60px', borderRadius: '50%'}} />}
                title={userInfo.username}
                message={userInfo.type === 'boss' ? userInfo.company : null}
              />
              <List renderHeader={() => '简介（个人档案）'}>
                <Item multipleLine>
                  <div className="desc">{(userInfo.type === 'boss' ? '需要：' : '职业：') + userInfo.title}</div>
                </Item>
                {
                  userInfo.money &&
                  <Item>
                    <Brief>雇佣价格：{userInfo.money}</Brief>
                  </Item>
                }
                {
                  userInfo.desc &&
                  <Item>
                    <Brief>技能{userInfo.type === 'boss' ? '要求：' : '描述：'}</Brief>
                    { userInfo.desc.split('\n').map((value, index) => <Brief key={index}>{value}</Brief>) }
                  </Item>
                }
              </List>
              <WhiteSpace />
              <List>
                <Item onClick={this.logout}>退出瓦洛兰大陆</Item>
              </List>
            </Fragment>
          ) : <Redirect to='/login' />
        }
      </div>
    )
  }
}
