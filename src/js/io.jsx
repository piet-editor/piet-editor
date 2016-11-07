import React from 'react';

export default class IO extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(e) {
    const input = e.target.value;
    this.setState({ input });
    this.props.updateInput(input);
  }

  render() {
    return (
      <div>
        input: <textarea value={this.state.input} onChange={this.updateInput} />
        output: <textarea value={this.props.output} />
      </div>
    );
  }
}

IO.propTypes = {
  updateInput: React.PropTypes.func.isRequired,
  output: React.PropTypes.string.isRequired,
};
