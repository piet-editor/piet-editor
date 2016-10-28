const React = require('react');

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }

  onClick() {
    this.setState( {
      clicked: !this.state.clicked,
    });
  }

  show() {
    if (!this.state.clicked) { return "not clicked"; }
    else { return "clicked"; }
  }

  render() {
    return <div onClick={ this.onClick.bind(this) } >{this.show()}</div>;
  }
};

module.exports = Editor;
