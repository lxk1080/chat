import React, { Component } from 'react';
import logoImg from './timi.png';
import './logo.scss';

export default class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <img src={logoImg} alt="img"/>
      </div>
    )
  }
}
