import React, {Component} from 'react'
import './input.css'

import {connect} from "react-redux";
import {deleteLayer, getLayerName} from "src/reducers/architectureActions";
import {Button} from "bloomer";
import {tabBuild} from "../../architecture";

class BatchNormLayer extends Component {

  handleDeleteLayer = () => {
    this.props.dispatch(deleteLayer(this.props.layerPosition));
    this.props.redraw();
  };

  render() {
    let layerName = getLayerName(this.props.layer);
    return (
      <div className="is-horizontal layer">
        <div className="field-label is-normal inputLayerName">
          <label className="label">{layerName}</label>
        </div>
        {
          (this.props.sidePaneTab === tabBuild) &&
          <Button isColor='white' onClick={this.handleDeleteLayer}
                  className={'icon-button danger'}>
            <span className="icon">
              <i className="fa fa-times-circle"/>
            </span>
          </Button>
        }
      </div>
    );
  }
}

export default connect(() => {
  return {
  }
})(BatchNormLayer);
