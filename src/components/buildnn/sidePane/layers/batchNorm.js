import React, {Component} from 'react'
import './input.css'

import {connect} from "react-redux";
import {deleteLayer, getLayerName} from "src/reducers/architectureActions";
import {Button} from "bloomer";

class BatchNormLayer extends Component {

  handleDeleteLayer = () => {
    this.props.dispatch(deleteLayer(this.props.layerPosition));
    this.props.redraw();
  };

  render() {
    let layerName = getLayerName(this.props.layer);
    return (
      <div className="is-horizontal inputLayer">
        <div className="field-label is-normal inputLayerName">
          <label className="label">{layerName}</label>
        </div>
        <Button isColor='white' onClick={this.handleDeleteLayer}
                                         className={`icon-button danger ${this.props.styling?"invisible":""}`}>
          <span className="icon">
            <i className="fa fa-times-circle"/>
          </span>
        </Button>
      </div>
    );
  }
}

export default connect(() => {
  return {
  }
})(BatchNormLayer);
