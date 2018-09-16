import React, { Component } from 'react';

export default function formHandler(Comp) {
  class wrapComp extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(self, key, value) {
      self.setState({
        [key]: value,
      })
    }

    render() {
      return <Comp handleChange={this.handleChange} {...this.props} />
    }
  }

  return wrapComp;
}
