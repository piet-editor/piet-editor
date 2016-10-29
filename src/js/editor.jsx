import React from 'react';

import Settings from './settings';
import ColorPallet from './colorPallet';
import Canvas from './canvas';

const confirm = window.confirm;

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: {
        width: 10,
        height: 10,
      },
      selectedColor: 'lred',
    };

    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeSelectedColor = this.onChangeSelectedColor.bind(this);
  }

  onChangeSize(s) {
    if (s.width < this.state.size.width ||
        s.height < this.state.size.height) {
      if (!confirm('New canvas size is smaller than current size. Are you sure?')) {
        return;
      }
    }
    this.setState({ size: s });
  }

  onChangeSelectedColor(c) {
    this.setState({ selectedColor: c });
  }

  render() {
    return (
      <div>
        <Settings onChangeSize={this.onChangeSize} size={this.state.size} />
        <ColorPallet
          onChangeSelectedColor={this.onChangeSelectedColor}
          selectedColor={this.state.selectedColor}
        />
        <Canvas size={this.state.size} />
        <div className='debug'>
          <div>width: {this.state.size.width}</div>
          <div>height: {this.state.size.height}</div>
          <div>selected: {this.state.selectedColor}</div>
        </div>
      </div>
    );
  }
}
