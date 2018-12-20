import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AvatarSelector from '../../components/avatarSelector/avatarSelector';
import { NavBar, InputItem, TextareaItem, WingBlank, Button, Toast } from 'antd-mobile';
import { save } from '../../actions/user';
import '../bossinfo/bossinfo.scss';

const mapStateToProps = state => ({});

@connect(mapStateToProps)
export default class Bossinfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: 'default',
      title: '',
      desc: '',
    };

    this.onChange = this.onChange.bind(this);
    this.selectAvatar = this.selectAvatar.bind(this);
    this.save = this.save.bind(this);
  }

  onChange(key, val) {
    this.setState({
      [key]: val,
    })
  }

  selectAvatar(imageName) {
    this.setState({
      avatar: imageName,
    })
  }

  save() {
    if (Object.values(this.state).some(v => !v)) {
      Toast.info('很多空白没填呢，亲！', 2);
      return;
    }

    this.props.dispatch(save(this.state));
    this.props.history.push('/dashboard/worker');
  }

  render() {
    const { avatar } = this.state;

    return (
      <div className="bossinfo-container">
        <NavBar className="title">Worker信息完善</NavBar>
        <div className="avatarSelector-wrapper">
          <AvatarSelector selectAvatar={this.selectAvatar} avatar={avatar} />
        </div>
        <div className="text-wrapper">
          <InputItem onChange={val => this.onChange('title', val)}>应聘职位</InputItem>
          <TextareaItem
            title="技能描述"
            rows={3}
            autoHeight
            onChange={val => this.onChange('desc', val)}
          />
        </div>
        <WingBlank>
          <Button type="default" className="btn-save" onClick={this.save}>保存</Button>
        </WingBlank>
      </div>
    )
  }
}
