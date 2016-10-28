import React from 'react';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: {
        width: this.props.size.width,
        htight: this.props.size.height,
      }
    };
  }

  onChangeWidth(v) {
    console.log("state: "+JSON.stringify(this.state));
    this.state.size.width = v.target.value;
  }

  onChangeSize() {
    this.props.onChangeSize(this.state.size);
  }
  
  render() {
    return (
      <div>
        <input type="number" min="1" inputMode="numeric" value={this.state.size.width} onChange={this.onChangeWidth.bind(this)}></input>
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
