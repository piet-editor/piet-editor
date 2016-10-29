import React from 'react';
import CanvasComponent from './canvasComponent';

const pixelRate = 25;
const gridWidth = 2;
const canvasName = 'canvas';
const backCanvasName = 'back';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.updateCanvas = this.updateCanvas.bind(this);
  }

  calcSize() {
    return {
      width: this.props.size.width * pixelRate + (this.props.size.width + 1) * gridWidth,
      height: this.props.size.height * pixelRate + (this.props.size.height + 1) * gridWidth,
    };
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

  updateCanvas(ctx) {
    this.drawGrid(ctx);
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
  color: React.PropTypes.string.isRequired,
};
