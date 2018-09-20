import React, {Component} from 'react'

import './layers.css'
import DenseLayer from "src/components/buildnn/sidePane/layers/dense";
import {connect} from "react-redux";
import {denseLayer} from "../../../reducers/layer/denseReducer";
import Conv2DLayer from "./layers/conv2d";
import {conv2dLayer} from "../../../reducers/layer/conv2dReducer";
import {inputLayer} from "../../../reducers/layer/inputReducer";
import InputLayer from "./layers/input";
import {upSampling2dLayer} from "../../../reducers/layer/upSampling2dReducer";
import {maxPooling2dLayer} from "../../../reducers/layer/maxPooling2dReducer";
import UpSampling2dLayer from "./layers/upSampling2d";
import MaxPooling2dLayer from "./layers/maxPooling2d";
import {batchNormLayer} from "../../../reducers/layer/batchNormReducer";
import BatchNormLayer from "./layers/batchNorm";
import {Button} from "bloomer";
import {addLayer} from "../../../reducers/architectureActions";

class Layers extends Component {

  renderLayer = (layer, index) => {
    switch (layer.type) {
      case denseLayer:
        return (
          <DenseLayer redraw={this.props.redraw} key={index}
                      styling={this.props.styling}
                      layerPosition={index}
                      layer={layer}/>
        );
      case conv2dLayer:
        return (
          <Conv2DLayer redraw={this.props.redraw} key={index}
                       styling={this.props.styling}
                       layerPosition={index}
                       layer={layer}/>
        );
      case inputLayer:
        return (
          <InputLayer redraw={this.props.redraw} key={index}
                      styling={this.props.styling}
                      layerPosition={index}
                      layer={layer}/>
        );
      case upSampling2dLayer:
        return (
          <UpSampling2dLayer redraw={this.props.redraw} key={index}
                             styling={this.props.styling}
                             layerPosition={index}
                             layer={layer}/>
        );
      case maxPooling2dLayer:
        return (
          <MaxPooling2dLayer redraw={this.props.redraw} key={index}
                             styling={this.props.styling}
                             layerPosition={index}
                             layer={layer}/>
        );
      case batchNormLayer:
        return (
          <BatchNormLayer redraw={this.props.redraw} key={index}
                          styling={this.props.styling}
                          layerPosition={index}
                          layer={layer}/>
        );
      default: return "";
    }
  };

  handleAddLayer = (e) => {
    this.props.dispatch(addLayer(e.currentTarget.getAttribute('identity')));
    this.props.redraw();
  };

  render() {
    let layers = this.props.layers;
    return (
      <div className="Layers">
        {
          layers.map((layer, index)=>{
            return (
              <div className="layerWrapper" key={index}>
                { this.renderLayer(layer, index) }
                {
                  index !== layers.length - 1 &&
                  <div className="addLayerParentWrapper">
                    <div className="addLayerWrapper">
                      <div className="addLayerButtonWrapper">
                        <div className="is-divider addLayerDivider"/>
                        <Button className="is-small is-white icon-button is-rounded addLayerButton">
                          <span className="icon">
                            <i className="fa fa-plus-circle"/>
                          </span>
                          <span>Add Layer</span>
                        </Button>
                      </div>
                      <div className="addLayerOptions">
                        <Button className="is-light is-small" identity={denseLayer} onClick={this.handleAddLayer}>Dense</Button>
                        <Button className="is-light is-small" identity={conv2dLayer} onClick={this.handleAddLayer}>Conv2D</Button>
                        <Button className="is-light is-small" identity={maxPooling2dLayer} onClick={this.handleAddLayer}>MaxPooling2D</Button>
                        <Button className="is-light is-small" identity={upSampling2dLayer} onClick={this.handleAddLayer}>UpSampling2D</Button>
                        <Button className="is-light is-small" identity={batchNormLayer} onClick={this.handleAddLayer}>BatchNorm</Button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default connect((store)=> {
  return {
    layers: store.architecture.layers
  }
})(Layers);
