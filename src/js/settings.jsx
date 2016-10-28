import React from 'react';

const defaultSize = 10;

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: {
        width: this.props.size.width || defaultSize,
        height: this.props.size.height || defaultSize,
      }
    };
  }

  onChangeWidth(v) {
    const size = {
      width: parseInt(v.target.value, 10) || size.width,
      height: this.state.size.height,
    };
    this.setState({size});
  }
  onChangeHeight(v) {
    const size = {
      width: this.state.size.width,
      height: parseInt(v.target.value, 10) || size.height,
    };
    this.setState({size});
  }

  onChangeSize() {
    this.props.onChangeSize(this.state.size);
  }
  
  render() {
    return (
      <div>
        width: <input type="number" min="1" inputMode="numeric" value={this.state.size.width} onChange={this.onChangeWidth.bind(this)}></input>
        height: <input type="number" min="1" inputMode="numeric" value={this.state.size.height} onChange={this.onChangeHeight.bind(this)}></input>
        <button type="submit" onClick={this.onChangeSize.bind(this)}>Set</button>
      </div>
    );
  }
}

Settings.propTypes = {
  size: React.PropTypes.shape({
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  }),
  onChangeSize: React.PropTypes.func.isRequired,
};
