import React, {Component} from 'react';
import {DNN} from "../dnn";

class Visualize extends Component {

  componentDidMount() {
    this.props.initialize(DNN);
  }

  render() {
    return (
      <div id="graph-container" style={{height: "calc(100% - 52px)"}}/>
    );
  }
}

export default Visualize;
