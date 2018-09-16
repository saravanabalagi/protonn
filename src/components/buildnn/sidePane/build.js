import React, {Component} from 'react';
import {Button, Field} from "bloomer";

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
      newLayerType: denseLayer
    };
  }

  handleAddLayer = () => {
    this.props.dispatch(addLayer(this.state.newLayerType));
    this.props.redraw();
  };

  handleSwitchNewLayer = (e) => { this.setState({ newLayerType: e.currentTarget.getAttribute('identity')}) };

  render() {
    return (
      <div className="Build">
        <div className="is-divider" data-content="Add Layer"/>
        <Field isHorizontal>
          <div className="buttons has-addons">
            <Button identity={denseLayer} className={this.state.newLayerType===denseLayer ? "is-success is-selected" : ""} onClick={this.handleSwitchNewLayer}>Dense</Button>
            <Button identity={conv2dLayer} className={this.state.newLayerType===conv2dLayer ? "is-success is-selected": ""} onClick={this.handleSwitchNewLayer}>Conv2D</Button>
            <Button identity={maxPooling2dLayer} className={this.state.newLayerType===maxPooling2dLayer ? "is-success is-selected": ""} onClick={this.handleSwitchNewLayer}>MaxPooling2D</Button>
            <Button identity={upSampling2dLayer} className={this.state.newLayerType===upSampling2dLayer ? "is-success is-selected": ""} onClick={this.handleSwitchNewLayer}>UpSampling2D</Button>
            <Button identity={batchNormLayer} className={this.state.newLayerType===batchNormLayer ? "is-success is-selected": ""} onClick={this.handleSwitchNewLayer}>BatchNorm</Button>
          </div>
          <Button isColor='info' className="addLayer" onClick={this.handleAddLayer}>
            <span className="icon">
              <i className="fa fa-plus-circle"/>
            </span>
          </Button>
        </Field>
      </div>
    );
  }
}

export default connect((store)=>{
  return {
    layers: store.architecture.layers
  }
})(Build);
