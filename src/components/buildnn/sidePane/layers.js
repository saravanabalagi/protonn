import React, {Component} from 'react'

import './layers.css'
import DenseLayer from "src/components/layers/dense";
import {connect} from "react-redux";
import {denseLayer} from "../../../reducers/layer/denseReducer";
import Conv2DLayer from "../../layers/conv2d";
import {conv2dLayer} from "../../../reducers/layer/conv2dReducer";
import {inputLayer} from "../../../reducers/layer/inputReducer";
import InputLayer from "../../layers/input";
import {upSampling2dLayer} from "../../../reducers/layer/upSampling2dReducer";
import {maxPooling2dLayer} from "../../../reducers/layer/maxPooling2dReducer";
import UpSampling2dLayer from "../../layers/upSampling2d";
import MaxPooling2dLayer from "../../layers/maxPooling2d";
import {batchNormLayer} from "../../../reducers/layer/batchNormReducer";
import BatchNormLayer from "../../layers/batchNorm";

class Layers extends Component {

  render() {
    let layers = this.props.layers;
    return (
      <div className="Layers">
        {
          layers.map((layer, index)=>{
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
