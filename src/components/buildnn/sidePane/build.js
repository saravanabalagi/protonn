import React, {Component} from 'react';
import {Button, Field} from "bloomer";

import './build.css';
import {addLayer} from "src/reducers/architectureActions";
import {connect} from "react-redux";
import {denseLayer} from "../../../reducers/layer/denseReducer";
import {conv2dLayer} from "../../../reducers/layer/conv2dReducer";
import {maxPooling2dLayer} from "../../../reducers/layer/maxPooling2dReducer";
import {upSampling2dLayer} from "../../../reducers/layer/upSampling2dReducer";

class Build extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newLayerType: denseLayer
    };
  }

  handleAddLayer = (layerType) => {
    this.props.dispatch(addLayer(layerType));
    this.props.redraw();
  };

  handleSwitchNewLayer = (layerType) => { this.setState({ newLayerType: layerType}) };

  render() {
    return (
      <div className="Build">
        <div className="is-divider" data-content="Add Layer"/>
        <Field isHorizontal>
          <div className="buttons has-addons">
            <Button className={this.state.newLayerType===denseLayer ? "is-success is-selected" : ""} onClick={()=>this.handleSwitchNewLayer(denseLayer)}>Dense</Button>
            <Button className={this.state.newLayerType===conv2dLayer ? "is-success is-selected": ""} onClick={()=>this.handleSwitchNewLayer(conv2dLayer)}>Conv2D</Button>
            <Button className={this.state.newLayerType===maxPooling2dLayer ? "is-success is-selected": ""} onClick={()=>this.handleSwitchNewLayer(maxPooling2dLayer)}>MaxPooling2D</Button>
            <Button className={this.state.newLayerType===upSampling2dLayer ? "is-success is-selected": ""} onClick={()=>this.handleSwitchNewLayer(upSampling2dLayer)}>UpSampling2D</Button>
          </div>
          <Button isColor='info' className="addLayer" onClick={()=>this.handleAddLayer(this.state.newLayerType)}>
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
