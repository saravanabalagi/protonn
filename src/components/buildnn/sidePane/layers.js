import React, {Component} from 'react'

import './layers.css'
import DenseLayer from "src/components/layers/dense";
import {connect} from "react-redux";
import {denseLayer} from "../../../reducers/layer/denseReducer";
import Conv2DLayer from "../../layers/conv2d";

class Layers extends Component {

  render() {
    let layers = this.props.layers;
    return (
      <div className="Layers">
        {
          layers.map((layer, index)=>{
            if(layer.type===denseLayer)
              return (
                <DenseLayer redraw={this.props.redraw} key={index}
                               styling={this.props.styling}
                               layerPosition={index}
                               layer={layer}/>
              );
            else return (
              <Conv2DLayer redraw={this.props.redraw} key={index}
                                    styling={this.props.styling}
                                    layerPosition={index}
                                    layer={layer}/>
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
