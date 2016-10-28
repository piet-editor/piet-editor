import React from 'react';

import Settings from './settings';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: {
        width: 10,
        height: 10,
      }
    };
  }

  changeSize(s) {
    this.state.size = s;
  }

  render() {
    return (
      <div>
        <Settings onChangeSize={this.changeSize.bind(this)} size={this.state.size} />
        <div>width: {this.state.size.width}</div>
        <div>height: {this.state.size.height}</div>
      </div>
    );
  }
};
