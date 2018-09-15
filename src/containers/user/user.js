import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, WingBlank } from 'antd-mobile';

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

@connect(mapStateToProps)
export default class User extends Component {
  constructor(props) {
    super(props)
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
              <List renderHeader={() => '简介'}>
                <Item multipleLine>
                  <div>{userInfo.title}</div>
                </Item>
                <WingBlank>
                  {
                    userInfo.money &&
                    <Item>
                      <Brief>薪资待遇：{userInfo.money}</Brief>
                    </Item>
                  }
                  {
                    userInfo.desc &&
                    <Item>
                      <Brief>技能{userInfo.type === 'boss' ? '要求：' : '掌握：'}</Brief>
                      { userInfo.desc.split('\n').map((value, index) => <Brief key={index}>{value}</Brief>) }
                    </Item>
                  }
                </WingBlank>
              </List>
              <WhiteSpace />
              <List>
                <Item>退出登录</Item>
              </List>
            </Fragment>
          ) : null
        }
      </div>
    )
  }
}