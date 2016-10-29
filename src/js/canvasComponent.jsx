import React from 'react';

export default class CanvasComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.updateCanvas();
    }
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const canvas = document.getElementById(this.props.canvasName);
    const backCanvas = document.getElementById(this.props.backCanvasName);
    const context = canvas.getContext('2d');
    const backContext = backCanvas.getContext('2d');
    this.props.updateCanvas(context, backContext);
  }

  render() {
    return (
      <div>
        <canvas
          id={this.props.canvasName}
          width={this.props.width}
          height={this.props.height}
        />
        <canvas
          id={this.props.backCanvasName}
          width={this.props.width}
          height={this.props.height}
          style={{ display: 'none' }}
        />
      </div>
    )
  }
}

CanvasComponent.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  canvasName: React.PropTypes.string.isRequired,
  backCanvasName: React.PropTypes.string.isRequired,
  updateCanvas: React.PropTypes.func.isRequired,
};
