import React from 'react';

import interpreter from 'piet-interpreter';

export default class Interpreter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pause: false,
      world: interpreter.create(this.props.code, this.props.input),
    };
    this.step = this.step.bind(this);
  }

  step() {
    const newWorld = interpreter.next(this.state.world);
    this.props.updateOutput(newWorld.env.output);
    this.props.updateCurrent({ X: newWorld.env.x, Y: newWorld.env.y });
    this.setState({ world: newWorld });
  }

  render() {
    return (
      <div>
        <button
          onClick={this.run}
        >
          run
        </button>
        <button
          onClick={this.step}
        >
          step
        </button>
        {
          this.state.pause && (
            <button
              onClick={this.continue}
            >
              continue
            </button>)
        }
      </div>
    );
  }
}

Interpreter.propTypes = {
  input: React.PropTypes.string.isRequired,
  updateOutput: React.PropTypes.func.isRequired,
  code: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(React.PropTypes.string)
  ).isRequired,
  updateCurrent: React.PropTypes.func.isRequired,
};
