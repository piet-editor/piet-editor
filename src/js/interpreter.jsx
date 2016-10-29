import React from 'react';

export default class Interpreter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div />
    );
  }
}

Interpreter.propTypes = {
  input: React.PropTypes.string.isRequired,
  updateOutput: React.PropTypes.func.isRequired,
  code: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(React.PropTypes.string)
  ).isRequired,
};
