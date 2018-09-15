import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../apis/user';
import { changeUserList } from '../../actions/user';
import UserCard from '../../components/userCard/userCard';

const mapStateToProps = state => ({
  chatUser: state.chatUser,
});

@connect(mapStateToProps)
export default class Boss extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getUserList('worker').then(res => {
      if (res.code === 0) {
        this.props.dispatch(changeUserList(res.data));
      }
    })
  }

  render() {
    const { chatUser } = this.props;

    return (
      <div className="boss-wrapper">
        <UserCard type="worker" userList={chatUser.userList} />
      </div>
    )
  }
}
