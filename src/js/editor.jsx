import React from 'react';

import Settings from './settings';
import ColorPallet from './colorPallet';

const confirm = window.confirm;

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: {
        width: 10,
        height: 10,
      },
      selectedColor: "lred",
    };
  }

  onChangeSize(s) {
    if (s.width < this.state.size.width ||
        s.height < this.state.size.height) {
      if (!confirm('New canvas size is smaller than current size. Are you sure?')) {
        return;
      }
    }
    this.setState({size: s});
  }

  onChangeSelectedColor(c) {
    this.setState({selectedColor: c});
  }

  render() {
    return (
      <div>
        <Settings onChangeSize={this.onChangeSize.bind(this)} size={this.state.size} />
        <div>width: {this.state.size.width}</div>
        <div>height: {this.state.size.height}</div>
        <ColorPallet onChangeSelectedColor={this.onChangeSelectedColor.bind(this)} selectedColor={this.state.selectedColor} />
      </div>
    );
  }
};
