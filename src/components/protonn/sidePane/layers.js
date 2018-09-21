import React, {Component} from 'react'

import './layers.css'
import DenseLayer from "src/components/protonn/sidePane/layers/dense";
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
import {addLayer, isValidAddLayer} from "../../../reducers/architectureActions";
import {tabBuild} from "../architecture";

class Layers extends Component {

  renderLayer = (layer, index) => {
    switch (layer.type) {
      case denseLayer:
        return (
          <DenseLayer redraw={this.props.redraw} key={index}
                      sidePaneTab={this.props.sidePaneTab}
                      layerPosition={index}
                      layer={layer}/>
        );
      case conv2dLayer:
        return (
          <Conv2DLayer redraw={this.props.redraw} key={index}
                       sidePaneTab={this.props.sidePaneTab}
                       layerPosition={index}
                       layer={layer}/>
        );
      case inputLayer:
        return (
          <InputLayer redraw={this.props.redraw} key={index}
                      sidePaneTab={this.props.sidePaneTab}
                      layerPosition={index}
                      layer={layer}/>
        );
      case upSampling2dLayer:
        return (
          <UpSampling2dLayer redraw={this.props.redraw} key={index}
                             sidePaneTab={this.props.sidePaneTab}
                             layerPosition={index}
                             layer={layer}/>
        );
      case maxPooling2dLayer:
        return (
          <MaxPooling2dLayer redraw={this.props.redraw} key={index}
                             sidePaneTab={this.props.sidePaneTab}
                             layerPosition={index}
                             layer={layer}/>
        );
      case batchNormLayer:
        return (
          <BatchNormLayer redraw={this.props.redraw} key={index}
                          sidePaneTab={this.props.sidePaneTab}
                          layerPosition={index}
                          layer={layer}/>
        );
      default: return "";
    }
  };

  handleAddLayer = (e) => {
    let layerPosition = parseInt(e.currentTarget.getAttribute('layer-position'));
    this.props.dispatch(addLayer(e.currentTarget.getAttribute('identity'), layerPosition+1));
    this.props.redraw();
  };

  render() {
    let layers = this.props.layers;
    return (
      <div className="Layers sidePaneTab">
        {
          layers.map((layer, index)=>{
            return (
              <div className="layerWrapper" key={index}>
                { this.renderLayer(layer, index) }
                {
                  (this.props.sidePaneTab !== tabBuild) &&
                  <div style={{paddingTop: 10}} />
                }
                {
                  (this.props.sidePaneTab === tabBuild) &&
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
                        {
                          isValidAddLayer(denseLayer, layer.layerPosition) &&
                          <Button className="is-light is-small" layer-position={layer.layerPosition}
                                  identity={denseLayer} onClick={this.handleAddLayer}>Dense</Button>
                        }
                        {
                          isValidAddLayer(conv2dLayer, layer.layerPosition) &&
                          <Button className="is-light is-small" layer-position={layer.layerPosition}
                                  identity={conv2dLayer} onClick={this.handleAddLayer}>Conv2D</Button>
                        }
                        {
                          isValidAddLayer(maxPooling2dLayer, layer.layerPosition) &&
                          <Button className="is-light is-small" layer-position={layer.layerPosition}
                                  identity={maxPooling2dLayer} onClick={this.handleAddLayer}>MaxPooling2D</Button>
                        }
                        {
                          isValidAddLayer(upSampling2dLayer, layer.layerPosition) &&
                          <Button className="is-light is-small" layer-position={layer.layerPosition}
                                  identity={upSampling2dLayer} onClick={this.handleAddLayer}>UpSampling2D</Button>
                        }
                        {
                          isValidAddLayer(batchNormLayer, layer.layerPosition) &&
                          <Button className="is-light is-small" layer-position={layer.layerPosition}
                                  identity={batchNormLayer} onClick={this.handleAddLayer}>BatchNorm</Button>
                        }
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
