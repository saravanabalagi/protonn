import React, {Component} from 'react';
import {Button} from "bloomer";

import './build.css';
import {addLayer} from "src/reducers/architectureActions";
import {connect} from "react-redux";
import {denseLayer} from "../../../reducers/layer/denseReducer";
import {conv2dLayer} from "../../../reducers/layer/conv2dReducer";
import {maxPooling2dLayer} from "../../../reducers/layer/maxPooling2dReducer";
import {upSampling2dLayer} from "../../../reducers/layer/upSampling2dReducer";
import {batchNormLayer} from "../../../reducers/layer/batchNormReducer";

class Build extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newLayerPosition: 1
    };
  }

  handleAddLayer = (e) => {
    this.props.dispatch(addLayer(e.currentTarget.getAttribute('identity')));
    this.props.redraw();
  };

  handleChangePosition = (e) => {
    let newLayerPosition = parseInt(e.currentTarget.value);
    if(newLayerPosition<1 || newLayerPosition>this.props.layers.length) return;
    this.setState({newLayerPosition: newLayerPosition});
  };

  render() {
    let layers = this.props.layers;
    let lastLayer = layers[layers.length - 1];
    return (
      <div className="Build sidePaneTab">
        <div className="is-divider" data-content="Add Layer"/>
        <div className="is-horizontal">
          <div className="field-label is-normal inputLayerName">
            <label className="label">Add at</label>
          </div>
          <input className="input inputParam" type="number"
               placeholder={lastLayer && lastLayer.layerPosition || 1}
               inputMode="numeric"
               value={this.state.newLayerPosition}
               onChange={this.handleChangePosition}/>
        </div>
        <div className="addLayerOptions">
          <Button className="is-light is-small" identity={denseLayer} onClick={this.handleAddLayer}>Dense</Button>
          <Button className="is-light is-small" identity={conv2dLayer} onClick={this.handleAddLayer}>Conv2D</Button>
          <Button className="is-light is-small" identity={maxPooling2dLayer} onClick={this.handleAddLayer}>MaxPooling2D</Button>
          <Button className="is-light is-small" identity={upSampling2dLayer} onClick={this.handleAddLayer}>UpSampling2D</Button>
          <Button className="is-light is-small" identity={batchNormLayer} onClick={this.handleAddLayer}>BatchNorm</Button>
        </div>
      </div>
    );
  }
}

export default connect((store)=>{
  return {
    layers: store.architecture.layers
  }
})(Build);
