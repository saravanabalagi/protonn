import React, {Component} from 'react';

class Visualize extends Component {

  componentDidMount() {
    this.props.initialize();
  }

  render() {
    return (
      <div id="graph-container" style={{height: "calc(100% - 52px)"}}/>
    );
  }
}

export default Visualize;
