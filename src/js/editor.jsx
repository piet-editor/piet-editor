import React from 'react';

import Settings from './settings';
import ColorPallet from './colorPallet';
import Canvas from './canvas';
import IO from './io';
import Interpreter from './interpreter';
import Share from './share';

const confirm = window.confirm;

export default class Editor extends React.Component {
  static copyCanvas(canvas) {
    return JSON.parse(JSON.stringify(canvas));
  }

  constructor(props) {
    super(props);
    this.state = {
      size: {
        width: this.props.width || 10,
        height: this.props.height || 10,
      },
      selectedColor: 'lred',
      canvas: this.props.code,
      input: '',
      output: '',
      current: { X: 0, Y: 0 },
    };
    if (!this.state.canvas) {
      this.state.canvas = Array(this.props.height);
      for (let i = 0; i < this.props.height; ++i) {
        this.state.canvas[i] = Array(this.props.width).fill('white');
      }
    }

    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeSelectedColor = this.onChangeSelectedColor.bind(this);
    this.updateCodel = this.updateCodel.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.updateOutput = this.updateOutput.bind(this);
    this.updateCurrent = this.updateCurrent.bind(this);
  }

  onChangeSize(s) {
    if (s.width < this.state.size.width ||
        s.height < this.state.size.height) {
      if (!confirm('New canvas size is smaller than current size. Are you sure?')) {
        return;
      }
    }
    this.setState({ size: s });
    if (s.width > this.state.size.width) {
      const diff = s.width - this.state.size.width;
      const newCanvas = Editor.copyCanvas(this.state.canvas);
      for (let i = 0; i < this.state.size.height; ++i) {
        for (let j = 0; j < diff; ++j) {
          newCanvas[i].push('white');
        }
      }
      this.setState({ canvas: newCanvas });
    } else {
      const diff = this.state.size.width - s.width;
      const newCanvas = Editor.copyCanvas(this.state.canvas);
      for (let i = 0; i < this.state.size.height; ++i) {
        for (let j = 0; j < diff; ++j) {
          newCanvas[i].pop();
        }
      }
      this.setState({ canvas: newCanvas });
    }
    if (s.height > this.state.size.height) {
      const diff = s.height - this.state.size.height;
      const newCanvas = Editor.copyCanvas(this.state.canvas);
      for (let i = 0; i < diff; ++i) {
        newCanvas.push(Array(this.state.size.width).fill('white'));
      }
      this.setState({ canvas: newCanvas });
    } else {
      const diff = this.state.size.height - s.height;
      const newCanvas = Editor.copyCanvas(this.state.canvas);
      for (let i = 0; i < diff; ++i) {
        newCanvas.pop();
      }
      this.setState({ canvas: newCanvas });
    }
  }

  onChangeSelectedColor(c) {
    this.setState({ selectedColor: c });
  }

  updateCodel(pos) {
    if (this.state.canvas[pos.X][pos.Y] !== this.state.selectedColor) {
      const newCanvas = Editor.copyCanvas(this.state.canvas);
      newCanvas[pos.X][pos.Y] = this.state.selectedColor;
      this.setState({ canvas: newCanvas });
    }
  }

  updateInput(input) {
    this.setState({ input });
  }
  updateOutput(output) {
    this.setState({ output });
  }
  updateCurrent(current) {
    this.setState({ current });
  }

  render() {
    return (
      <div>
        <Settings onChangeSize={this.onChangeSize} size={this.state.size} />
        <ColorPallet
          onChangeSelectedColor={this.onChangeSelectedColor}
          selectedColor={this.state.selectedColor}
        />
        <Canvas
          size={this.state.size}
          updateCodel={this.updateCodel}
          color={this.state.selectedColor}
          current={this.state.current}
          code={this.state.canvas}
        />
        <IO
          updateInput={this.updateInput}
          output={this.state.output}
        />
        <Interpreter
          input={this.state.input}
          updateOutput={this.updateOutput}
          updateCurrent={this.updateCurrent}
          code={this.state.canvas}
          infinity={1000}
        />
        <Share
          size={this.state.size}
          code={this.state.canvas}
        />
        <div className='debug'>
          <div>width: {this.state.size.width}</div>
          <div>height: {this.state.size.height}</div>
          <div>selected: {this.state.selectedColor}</div>
          <div>canvas: {JSON.stringify(this.state.canvas)}</div>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  code: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(React.PropTypes.string)
  ),
};
