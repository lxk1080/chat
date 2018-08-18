import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { List, Grid } from 'antd-mobile';
import './avatarSelector.scss';

export default class AvatarSelector extends Component {
  static propTypes = {
    selectAvatar: PropTypes.func,
    avatar: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      imgLists: [],
    };

    this.getAllImage = this.getAllImage.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.getHeader = this.getHeader.bind(this);
  }

  componentWillMount() {
    this.getAllImage();
  }

  getAllImage() {
    axios.get('/file/image').then(res => {
      if (res.status === 200 && res.data.code === 0) {
        this.setState({
          imgLists: res.data.data,
        })
      }
    })
  }

  selectItem(item) {
    this.props.selectAvatar(item.text);
  }

  getHeader() {
    const { avatar } = this.props;

    return (<div className="avatar-wrapper">
      <img src={require(`../../common/image/${avatar}.jpg`)} alt="img" className="avatar" />
      <span className="text">请选择一个头像</span>
    </div>)
  };

  render() {
    const { imgLists } = this.state;

    const data = imgLists.map((name, i) => ({
      icon: require(`../../common/image/${name}.jpg`),
      text: name,
    }));

    return (
      <div className="avatarSelector-container">
        <List renderHeader={(this.getHeader())}>
          {
            data.length > 0 &&
            <Grid
              data={data}
              activeStyle={true} // 点击反馈的自定义样式
              columnNum={4} // 列数
              isCarousel={true} // 是否跑马灯
              carouselMaxRow={2} // 如果是跑马灯, 一页跑马灯需要展示的行数
              hasLine={false} // 是否有边框
              renderItem={ // 自定义每个 grid 条目的创建函数
                (item) => (
                  <div className="image-wrapper">
                    <img src={item.icon} alt="img" className="image" />
                    {/*<span className="text">{item.text}</span>*/}
                  </div>
                )
              }
              onClick={item => this.selectItem(item)}
            />
          }
        </List>
      </div>
    )
  }
}