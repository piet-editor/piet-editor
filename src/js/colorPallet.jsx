import React from 'react';
import { colors, colorCodes } from './constants';

const commandTable = [
  '*', 'add', 'div', 'great', 'dup', 'in(c)',
  'push', 'sub', 'mod', 'point', 'roll', 'out(n)',
  'pop', 'mul', 'not', 'switch', 'in(n)', 'out(c)',
];

export default class ColorPallet extends React.Component {
  static commandLabel(i, commandBase) {
    return ((i % 6 - commandBase % 6 + 6) % 6 + 6 * Math.floor( i / 6) + (3- Math.floor(commandBase/6)) * 6 + 18) % 18;
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selectedColor,
      index: 0,
      commandBase: 0,
    };

    this.setColor = this.setColor.bind(this);
    this.changeCommandBase = this.changeCommandBase.bind(this);
  }

  setColor(e) {
    const index = e.target.getAttribute('data-index');
    this.setState({
      selected: colors[index],
      index,
    });
    this.props.onChangeSelectedColor(colors[index]);
  }

  changeCommandBase(e) {
    e.preventDefault();
    const index = e.target.getAttribute('data-index');
    this.setState({ commandBase: index });
  }

  render() {
    const colorTag = colors.map((name, i) => (
      <td
        key={name}
      >
        <button
          style={{ backgroundColor: colorCodes[name] }}
          onClick={this.setColor}
          onContextMenu={this.changeCommandBase}
          data-index={i}
        >
          {commandTable[ColorPallet.commandLabel(i, this.state.commandBase)]}
        </button>
      </td>
    ));
    const lights = colorTag.slice(0, 6);
    const prims = colorTag.slice(6, 12);
    const darks = colorTag.slice(12, 18);
    const currentStyle = {
      backgroundColor: colorCodes[this.state.selected],
    };
    return (
      <div>
        click to select color and right click to change command base color.
        <table>
          <tbody>
            <tr>
              {lights}
              <td key='white'>
                <button
                  style={{ backgroundColor: 'white' }}
                  onClick={this.setColor}
                  data-index='18'
                >
                  white
                </button>
              </td>
            </tr>
            <tr>
              {prims}
              <td key='black'>
                <button
                  style={{ backgroundColor: 'black', color: 'white' }}
                  onClick={this.setColor}
                  data-index='19'
                >
                  black
                </button>
              </td>
            </tr>
            <tr>
              {darks}
              <td key='selected'>
                <button
                  style={currentStyle}
                  onClick={this.changeCommandBase}
                  data-index={this.state.index}
                >
                  *
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

ColorPallet.propTypes = {
  selectedColor: React.PropTypes.string.isRequired,
  onChangeSelectedColor: React.PropTypes.func.isRequired,
};
