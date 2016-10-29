import React from 'react';
import CanvasComponent from './canvasComponent';
import { colorCodes } from './constants';


const pixelRate = 25;
const gridWidth = 2;
const canvasName = 'canvas';

export default class Canvas extends React.Component {
  static getOffset(e) {
    return {
      X: e.nativeEvent.offsetX || e.nativeEvent.layerX,
      Y: e.nativeEvent.offsetY || e.nativeEvent.layerY,
    };
  }

  constructor(props) {
    super(props);
    this.state = {};

    this.updateCanvas = this.updateCanvas.bind(this);
    this.onChangeCodel = this.onChangeCodel.bind(this);
  }

  onChangeCodel(codel) {
    this.props.onChangeCodel(codel);
  }

  updateCanvas(ctx, e, type) {
    ctx.strokeStyle = 'black';
    this.drawGrid(ctx);
    ctx.strokeStyle = colorCodes[this.props.color];
    if (e) {
      if (type === 'down') {
        const offsets = Canvas.getOffset(e);
        ctx.beginPath();
        ctx.moveTo(offsets.X, offsets.Y);
      } else if (type === 'move') {
        const offsets = Canvas.getOffset(e);
        ctx.lineTo(offsets.X, offsets.Y);
        ctx.stroke();
      }
    }
  }

  drawGrid(ctx) {
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

  render() {
    const size = this.calcSize();
    return (
      <div>
        <CanvasComponent
          width={size.width}
          height={size.height}
          canvasName={canvasName}
          updateCanvas={this.updateCanvas}
          onChangeCodel={this.onChangeCodel}
          color={this.props.color}
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
  onChangeCodel: React.PropTypes.func.isRequired,
  color: React.PropTypes.string.isRequired,
};
