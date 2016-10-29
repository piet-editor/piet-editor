import React from 'react';
import CanvasComponent from './canvasComponent';

const pixelRate = 10;
const gridWidth = 1;
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

  drawGrid(ctx, backCtx) {
    const size = this.calcSize();
    for (let i = 0; i < this.props.size.width + 1; ++i) {
      backCtx.fillRect(i * (pixelRate + gridWidth), 0, gridWidth, size.height);
    }
    for (let i = 0; i < this.props.size.height + 1; ++i) {
      backCtx.fillRect(0, i * (pixelRate + gridWidth), size.width, gridWidth);
    }
    const image = backCtx.getImageData(0, 0, size.width, size.height);
    ctx.putImageData(image, 0, 0);
  }

  updateCanvas(ctx, backCtx) {
    this.drawGrid(ctx, backCtx);
  }

  render() {
    const size = this.calcSize();
    return (
      <div>
        <CanvasComponent
          width={size.width}
          height={size.height}
          canvasName={canvasName}
          backCanvasName={backCanvasName}
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
};
