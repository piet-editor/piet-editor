import React from 'react';

import interpreter from 'piet-interpreter';

export default class Interpreter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pause: false,
      world: interpreter.create(this.props.code, this.props.input, true),
    };
    this.reset = this.reset.bind(this);
    this.step = this.step.bind(this);
    this.run = this.run.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.code !== nextProps.code) {
      this.reset();
    }
  }

  reset() {
    this.props.updateOutput('');
    this.props.updateCurrent({ X: 0, Y: 0 });
    this.props.updateNext({ X: -1, Y: -1 });
    this.setState({ world: interpreter.create(this.props.code, this.props.input, true) });
  }

  run() {
    for (let i = 0; i < this.props.infinity; ++i) {
      this.step();
      if (this.state.world.halt) {
        break;
      }
    }
  }

  step() {
    const newWorld = interpreter.next(this.state.world);
    this.props.updateOutput(newWorld.env.output);
    this.props.updateCurrent({ X: newWorld.env.x, Y: newWorld.env.y });
    this.props.updateNext({ X: newWorld.env.nextCodel.x, Y: newWorld.env.nextCodel.y });
    this.setState({ world: newWorld });
  }

  render() {
    return (
      <div>
        <button
          onClick={this.reset}
        >
          reset
        </button>
        <button
          onClick={this.run}
          disabled={this.state.world.halt}
        >
          run
        </button>
        <button
          onClick={this.step}
          disabled={this.state.world.halt}
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
        {
          this.state.world.halt ? <div>halted</div> : null
        }
        <div>{this.state.world.env.cmd}</div>
        <div>{JSON.stringify(this.state.world.env.nextCodel)}</div>
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
  updateNext: React.PropTypes.func.isRequired,
  infinity: React.PropTypes.number.isRequired,
};
