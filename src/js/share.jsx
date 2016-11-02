import React from 'react';
import gzip from 'gzip-js';
import base64 from 'base64-js';

const colorTable = {
  lred: 'a',
  lyellow: 'b',
  lgreen: 'c',
  lcyan: 'd',
  lblue: 'e',
  lmagenta: 'f',

  red: 'g',
  yellow: 'h',
  green: 'i',
  cyan: 'j',
  blue: 'k',
  magenta: 'l',

  dred: 'm',
  dyellow: 'n',
  dgreen: 'o',
  dcyan: 'p',
  dblue: 'q',
  dmagenta: 'r',

  white: 'W',
  black: 'K',
};

export default class Share extends React.Component {
  static codeText(code) {
    const orig = code.map((row) => row.map((c) => colorTable[c]).join('')).join('|');
    return base64.fromByteArray(gzip.zip(orig, { level: 9 })).replace(/=/g, '@').replace(/\+/g, '-').replace(/\//g, '_');
  }

  constructor(props) {
    super(props);
    this.state = {
    };

    this.linkURI = this.linkURI.bind(this);
  }

  linkURI() {
    return `#code=${Share.codeText(this.props.code)}&width=${this.props.size.width}&height=${this.props.size.height}`;
  }

  render() {
    return (
      <div>
        <a href={this.linkURI()} >Share</a>
      </div>
    );
  }
}

Share.propTypes = {
  size: React.PropTypes.shape({
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  }),
  code: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(React.PropTypes.string)
  ).isRequired,
};
