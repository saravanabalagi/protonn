import React, {Component} from 'react';
import {Button} from "bloomer";
import {connect} from "react-redux";
import {convertToCnn, convertToDnn} from "../../../reducers/architectureActions";
import {DNN} from "../dnn";
import {CNN} from "../cnn";

import './convert.css';

class Convert extends Component {

  convertToDnn = () => {
    this.props.dispatch(convertToDnn());
  };

  convertToCnn = () => {
    this.props.dispatch(convertToCnn());
  };

  render() {
    let archType = this.props.architectureType;
    return (
      <div className="Convert sidePaneTab">
        <div className="architectureType">
          Current Architecture: {this.props.architectureType.toUpperCase()}
        </div>
        <div className="notification">
          <span className="icon">
            <i className="fa fa-info-circle"/>
          </span>
          <span>
            { archType===DNN && "All existing dense layers will be appended to the end"}
            { archType===CNN && "All existing conv layers will be deleted. All dense layers will be concatenated to form the network"}
          </span>
        </div>
        { archType===DNN && <Button className="is-info" onClick={this.convertToCnn}>Convert to CNN</Button> }
        { archType===CNN && <Button className="is-info" onClick={this.convertToDnn}>Convert to DNN</Button> }
      </div>
    );
  }
}

export default connect((store)=>{
  return {
    architectureType: store.architecture.type
  };
})(Convert);
