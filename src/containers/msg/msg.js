import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, WingBlank, Modal } from 'antd-mobile';

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

@connect(mapStateToProps)
export default class Msg extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="msg-wrapper">
        null
      </div>
    )
  }
}
