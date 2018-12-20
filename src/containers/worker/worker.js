import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../apis/user';
import { updateOtherSideList } from '../../actions/user';
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
    getUserList('boss').then(res => {
      if (res.code === 0) {
        this.props.dispatch(updateOtherSideList(res.data));
      }
    })
  }

  render() {
    const { chatUser } = this.props;

    return (
      <div className="boss-wrapper">
        <UserCard type="boss" userList={chatUser.userList} />
      </div>
    )
  }
}
