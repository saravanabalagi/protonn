import React, {Component} from 'react';
import {Button} from "bloomer";
import {addDimension} from "../../../reducers/layer/inputActions";
import {connect} from "react-redux";

class Convert extends Component {

  convertToCnn = () => {
    this.props.dispatch(addDimension());
    this.props.redraw();
  };

  render() {
    return (
      <div className="Convert sidePaneTab">
        <div className="notification">
          <span className="icon">
            <i className="fa fa-info-circle"/>
          </span>
          <span>
            All existing dense layers will be appended to the end
          </span>
        </div>
        <Button className="is-info" onClick={this.convertToCnn}>Convert to CNN</Button>
      </div>
    );
  }
}

export default connect(()=>{
  return {

  };
})(Convert);
