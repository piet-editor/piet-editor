import React from 'react';
import { colorCodes } from './constants';

export default class Export extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showImage: false,
      image: null,
    };

    this.export = this.export.bind(this);
  }

  getSize() {
    return {
      width: this.props.size.width * this.props.cs,
      height: this.props.size.height * this.props.cs,
    };
  }

  export() {
    const canvas = this.canvas;
    const ctx = canvas.getContext('2d');
    for (let i = 0; i < this.props.size.height; ++i) {
      for (let j = 0; j < this.props.size.width; ++j) {
        this.fillCodel(ctx, { X: j, Y: i }, this.props.code[i][j]);
      }
    }
    const image = canvas.toDataURL();
    this.setState({
      image,
      showImage: true,
    });
  }

  fillCodel(ctx, pos, color) {
    const colorCode = colorCodes[color];
    const cs = this.props.cs;
    ctx.fillStyle = colorCode;
    ctx.fillRect(pos.X * cs, pos.Y * cs, cs, cs);
  }

  render() {
    const size = this.getSize();
    return (
      <div>
        <button type='submit' onClick={this.export}>Export</button>
        {
          this.state.showImage &&
          <img
            src={this.state.image}
            alt='exported'
          />
        }
        <canvas
          style={{ display: 'none' }}
          ref={(n) => (this.canvas = n)}
          width={size.width}
          height={size.height}
        />
      </div>
    );
  }
}

Export.propTypes = {
  cs: React.PropTypes.number.isRequired,
  size: React.PropTypes.shape({
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  }),
  code: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(React.PropTypes.string)
  ).isRequired,
};
