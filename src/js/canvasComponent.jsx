import React from 'react';

export default class CanvasComponent extends React.Component {
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
    const context = canvas.getContext('2d');
    this.props.updateCanvas(context);
  }

  render() {
    return (
      <div>
        <canvas
          id={this.props.canvasName}
          width={this.props.width}
          height={this.props.height}
        />
      </div>
    );
  }
}

CanvasComponent.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  canvasName: React.PropTypes.string.isRequired,
  updateCanvas: React.PropTypes.func.isRequired,
  onChangeCodel: React.PropTypes.func.isRequired,
  color: React.PropTypes.string.isRequired,
};
