import React from 'react';

const colors = [
  'lred', 'lyellow', 'lgreen', 'lcyan', 'lblue', 'lmagenta',
  'red', 'yellow', 'green', 'cyan', 'blue', 'magenta',
  'dred', 'dyellow', 'dgreen', 'dcyan', 'dblue', 'dmagenta',
  'white', 'black',
];

const colorCodes = {
  lred: '#FFC0C0',
  lyellow: '#FFFFC0',
  lgreen: '#C0FFC0',
  lcyan: '#C0FFFF',
  lblue: '#C0C0FF',
  lmagenta: '#FFC0FF',

  red: '#FF0000',
  yellow: '#FFFF00',
  green: '#00FF00',
  cyan: '#00FFFF',
  blue: '#0000FF',
  magenta: '#FF00FF',

  dred: '#C00000',
  dyellow: '#C0C000',
  dgreen: '#00C000',
  dcyan: '#00C0C0',
  dblue: '#0000C0',
  dmagenta: '#C000C0',

  white: '#FFFFFF',
  black: '#000000',
};

const commandTable = [
  '*', 'add', 'div', 'great', 'dup', 'in(c)',
  'push', 'sub', 'mod', 'point', 'roll', 'out(n)',
  'pop', 'mul', 'not', 'switch', 'in(n)', 'out(c)',
];

export default class ColorPallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selectedColor,
      index: 0,
      commandBase: 0,
    };
  }

  setColor(e) {
    const index = e.target.getAttribute('data-index');
    this.setState({
      selected: colors[index],
      index,
    });
  }

  changeCommandBase(e) {
    e.preventDefault();
    const index = e.target.getAttribute('data-index');
    this.setState({commandBase: index});
  }

  render() {
    const colorTag = colors.map((name, i) => {
      return (
        <td
          key={name}
          style={{backgroundColor: colorCodes[name]}}
          onClick={this.setColor.bind(this)}
          onContextMenu={this.changeCommandBase.bind(this)}
          data-name={name}
          data-index={i}>
          {commandTable[((i - this.state.commandBase)%18 + 18)%18]}
        </td>
      );
    });
    const lights = colorTag.slice(0, 6);
    const prims = colorTag.slice(6, 12);
    const darks = colorTag.slice(12, 18);
    const currentStyle = {
      backgroundColor: colorCodes[this.state.selected],
      color: this.state.selected === 'black' ? 'white' : 'black'
    };
    return (
      <div>
        <table>
          <tbody>
            <tr>
              {lights}
              <td key='white' style={{backgroundColor: 'white'}} onClick={this.setColor.bind(this)} data-name='white'>white</td>
            </tr>
            <tr>
              {prims}
              <td key='black' style={{backgroundColor: 'black', color: 'white'}} onClick={this.setColor.bind(this)} data-name='black'>black</td>
            </tr>
            <tr>
              {darks}
              <td key='selected' style={currentStyle}></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
