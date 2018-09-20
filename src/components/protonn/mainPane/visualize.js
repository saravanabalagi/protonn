import React, {Component} from 'react';
import {connect} from "react-redux";

class Visualize extends Component {

  componentDidMount() {
    this.props.initialize(this.props.architectureType);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.architectureType!==this.props.architectureType)
      this.props.initialize(nextProps.architectureType);
  }

  render() {
    return (
      <div id="graph-container" style={{height: "calc(100% - 52px)"}}/>
    );
  }
}

export default connect((store)=>{
  return {
    architectureType: store.architecture.type
  }
})(Visualize);
