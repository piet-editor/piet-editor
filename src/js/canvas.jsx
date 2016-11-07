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

  static pointCurrentCodel(ctx, pos) {
    ctx.fillStyle = 'black';
    // ここも座標系が逆
    const x = (pixelRate + gridWidth) * pos.Y + gridWidth + pixelRate / 2;
    const y = (pixelRate + gridWidth) * pos.X + gridWidth + pixelRate / 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, pixelRate * 0.3, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }

  static pointNextCodel(ctx, pos, size) {
    if (pos.X < 0 || pos.X > size.height ||
        pos.Y < 0 || pos.Y > size.width) {
      // 外にはみ出してる。
      return;
    }
    ctx.fillStyle = '#dedede';
    // ここも座標系が逆
    const x = (pixelRate + gridWidth) * pos.Y + gridWidth + pixelRate / 2;
    const y = (pixelRate + gridWidth) * pos.X + gridWidth + pixelRate / 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, pixelRate * 0.3, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }

  constructor(props) {
    super(props);
    this.state = {};

    this.updateCanvas = this.updateCanvas.bind(this);
  }

  drawCurrentCanvas(ctx) {
    for (let i = 0; i < this.props.size.height; ++i) {
      for (let j = 0; j < this.props.size.width; ++j) {
        const pos = { X: i, Y: j };
        Canvas.fillCodel(ctx, pos, this.props.code[i][j]);
      }
    }
  }

  updateCanvas(ctx, e, type) {
    if (type === 'mount' || type === 'update') {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      this.drawGrid(ctx);
      this.drawCurrentCanvas(ctx);
      Canvas.pointCurrentCodel(ctx, this.props.current);
      Canvas.pointNextCodel(ctx, this.props.next, this.props.size);
    }
    if (e) {
      if (type === 'down' || type === 'move') {
        const offsets = Canvas.getOffset(e);
        const pos = Canvas.getCodelOffset(offsets);
        this.updateCodel(pos);
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
    if (this.props.code[pos.X][pos.Y] === this.props.color) { return; }
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
  color: React.PropTypes.string.isRequired,
  size: React.PropTypes.shape({
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  }),
  updateCodel: React.PropTypes.func.isRequired,
  code: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(React.PropTypes.string)
  ).isRequired,
  current: React.PropTypes.shape({
    X: React.PropTypes.number.isRequired,
    Y: React.PropTypes.number.isRequired,
  }).isRequired,
  next: React.PropTypes.shape({
    X: React.PropTypes.number.isRequired,
    Y: React.PropTypes.number.isRequired,
  }).isRequired,
};
