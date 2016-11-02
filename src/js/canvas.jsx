import React from 'react';
import CanvasComponent from './canvasComponent';
import { colorCodes } from './constants';

const pixelRate = 25;
const gridWidth = 2;
const canvasName = 'canvas';

export default class Canvas extends React.Component {
  static getOffset(e) {
    return {
      // ブラウザと座標系の取り方が違う。
      X: e.nativeEvent.offsetY || e.nativeEvent.layerY,
      Y: e.nativeEvent.offsetX || e.nativeEvent.layerX,
    };
  }

  static getCodelOffset(offsets) {
    return {
      X: (offsets.X / (pixelRate + gridWidth)) | 0,
      Y: (offsets.Y / (pixelRate + gridWidth)) | 0,
    };
  }

  static fillCodel(ctx, pos, c) {
    if (pos.X < 0 || pos.Y < 0) { return; }
    const color = colorCodes[c];
    const oneCodel = pixelRate + gridWidth;
    ctx.fillStyle = color;
    ctx.fillRect(pos.Y * oneCodel + gridWidth, pos.X * oneCodel + gridWidth, pixelRate, pixelRate);
  }

  constructor(props) {
    super(props);
    this.state = {};

    this.updateCanvas = this.updateCanvas.bind(this);
  }

  updateCanvas(ctx, e, type) {
    ctx.strokeStyle = 'black';
    this.drawGrid(ctx);
    ctx.strokeStyle = colorCodes[this.props.color];
    if (type === 'mount') {
      for (let i = 0; i < this.props.size.height; ++i) {
        for (let j = 0; j < this.props.size.width; ++j) {
          const pos = { X: i, Y: j };
          Canvas.fillCodel(ctx, pos, this.props.code[i][j]);
        }
      }
    }
    if (e) {
      if (type === 'down' || type === 'move') {
        const offsets = Canvas.getOffset(e);
        const pos = Canvas.getCodelOffset(offsets);
        this.updateCodel(pos);
        Canvas.fillCodel(ctx, pos, this.props.color);
      }
    }
  }

  drawGrid(ctx) {
    ctx.fillStyle = 'black';
    const size = this.calcSize();
    for (let i = 0; i < this.props.size.width + 1; ++i) {
      ctx.fillRect(i * (pixelRate + gridWidth), 0, gridWidth, size.height);
    }
    for (let i = 0; i < this.props.size.height + 1; ++i) {
      ctx.fillRect(0, i * (pixelRate + gridWidth), size.width, gridWidth);
    }
  }

  calcSize() {
    return {
      width: this.props.size.width * pixelRate + (this.props.size.width + 1) * gridWidth,
      height: this.props.size.height * pixelRate + (this.props.size.height + 1) * gridWidth,
    };
  }

  updateCodel(pos) {
    this.props.updateCodel(pos);
  }

  render() {
    const size = this.calcSize();
    return (
      <div>
        <CanvasComponent
          width={size.width}
          height={size.height}
          canvasName={canvasName}
          updateCanvas={this.updateCanvas}
        />
      </div>
    );
  }
}

Canvas.propTypes = {
  size: React.PropTypes.shape({
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  }),
  updateCodel: React.PropTypes.func.isRequired,
  color: React.PropTypes.string.isRequired,
  code: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(React.PropTypes.string)
  ).isRequired,
};
