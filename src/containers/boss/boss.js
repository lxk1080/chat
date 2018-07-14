import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';

const mapStateToProps = state => ({

});

@connect(mapStateToProps)
export default class Boss extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="boss-wrapper">
        Boss
      </div>
    )
  }
}
