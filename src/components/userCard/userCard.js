import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { WingBlank, WhiteSpace, Card } from 'antd-mobile';

@withRouter
export default class Boss extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(id) {
    this.props.history.push(`/chat/${id}`);
  }

  render() {
    const { userList, type } = this.props;

    const style = { padding: '3px 0' };

    return (
      <div className="usercard-wrapper">
        <WingBlank>
          {
            userList &&
            userList.map((user, index) => (
              user.avatar ? (
                <Fragment key={index}>
                  <WhiteSpace />
                  <Card onClick={() => this.onClick(user._id)}>
                    <Card.Header
                      title={user.username}
                      thumb={require(`../../common/image/${user.avatar}.jpg`)}
                      thumbStyle={{ height: '40px' }}
                      extra={<span>{user.title}</span>}
                    >
                    </Card.Header>
                    <Card.Body>
                      {
                        type === 'boss' &&
                        <Fragment>
                          <div style={style}>公司名称：{user.company}</div>
                          <div style={style}>输出薪资：{user.money}</div>
                          <div style={style}>技能要求：</div>
                        </Fragment>
                      }
                      {
                        user.desc ?
                          user.desc.split('\n').map((value, i) => <div key={i} style={style}>{value}</div>) :
                          <p>这个人很懒，什么信息都没有~</p>
                      }
                    </Card.Body>
                  </Card>
                </Fragment>
              ) : null
            ))
          }
        </WingBlank>
        <WhiteSpace />
      </div>
    )
  }
}
