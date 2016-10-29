import React from 'react';

export default class CanvasComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.down = this.down.bind(this);
    this.move = this.move.bind(this);
    this.up = this.up.bind(this);
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
    const context = canvas.getContext('2d');
    this.props.updateCanvas(context);
  }

  down(e) {
    this.setState({ drawing: true });
    const canvas = document.getElementById(this.props.canvasName);
    const context = canvas.getContext('2d');
    this.props.updateCanvas(context, e, 'down');
  }
  move(e) {
    if (!this.state.drawing) { return; }
    const canvas = document.getElementById(this.props.canvasName);
    const context = canvas.getContext('2d');
    this.props.updateCanvas(context, e, 'move');
  }
  up() {
    this.setState({ drawing: false });
  }

  render() {
    return (
      <div>
        <canvas
          id={this.props.canvasName}
          width={this.props.width}
          height={this.props.height}
          onMouseDown={this.down}
          onMouseMove={this.move}
          onMouseUp={this.up}
          onMouseLeave={this.up}
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
};
