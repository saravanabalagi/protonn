import React, {Component} from 'react'
import './input.css'

import {connect} from "react-redux";
import {deleteLayer, getLayerName} from "src/reducers/architectureActions";
import {changePoolSize} from "src/reducers/layer/maxPooling2dActions";
import {Button} from "bloomer";
import {tabBuild} from "../../architecture";

class MaxPooling2dLayer extends Component {

  handlePoolSize = (e) => {
    let poolSize = parseInt(e.currentTarget.value);
    let layerPosition = this.props.layer.layerPosition;
    if (poolSize<=0) return;
    this.props.dispatch(changePoolSize(layerPosition, [poolSize, poolSize]));
    this.props.redraw();
  };

  handleDeleteLayer = () => {
    this.props.dispatch(deleteLayer(this.props.layerPosition));
    this.props.redraw();
  };

  render() {
    let poolSize = this.props.layer.poolSize;
    let layerName = getLayerName(this.props.layer);
    return (
      <div className="is-horizontal layer maxPooling2dLayer">
        <div className="field-label is-normal inputLayerName">
          <label className="label">{layerName}</label>
        </div>
        {
          (this.props.sidePaneTab===tabBuild) && <input className="input inputParam" type="number" placeholder="0"
                                                inputMode="numeric"
                                                value={poolSize[0]}
                                                onChange={this.handlePoolSize}/>
        }
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
})(MaxPooling2dLayer);
