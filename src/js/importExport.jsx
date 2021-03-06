import React from 'react';
import Export from './export';
import Import from './import';

const defaultCs = 10;

export default class ImportExport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cs: defaultCs,
    };

    this.onChangeCs = this.onChangeCs.bind(this);
  }

  onChangeCs(e) {
    this.setState({ cs: parseInt(e.target.value, 10) || defaultCs });
  }

  render() {
    return (
      <div>
        codel size: <input
          type='number'
          min='1'
          inputMode='numeric'
          value={this.state.cs}
          onChange={this.onChangeCs}
        />
        <Export
          cs={this.state.cs}
          size={this.props.size}
          code={this.props.code}
        />
        <Import
          cs={this.state.cs}
          importCanvas={this.props.importCanvas}
        />
      </div>
    );
  }
}

ImportExport.propTypes = {
  size: React.PropTypes.shape({
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  }),
  code: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(React.PropTypes.string)
  ).isRequired,
  importCanvas: React.PropTypes.func.isRequired,
};
