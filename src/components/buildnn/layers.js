import React, {Component} from 'react'

import './layers.css'
import DenseLayer from "../layers/dense";
import {connect} from "react-redux";

class Layers extends Component {

  render() {
    let layers = this.props.layers;
    return (
      <div className="Layers">
        {
          layers.map((object, index)=>{
            return <DenseLayer redraw={this.props.redraw} key={index}
                               styling={this.props.styling}
                               layerPosition={index}
                               layer={object}/>
          })
        }
      </div>
    );
  }
}

export default connect((store)=> {
  return {
    layers: store.layers.layers
  }
})(Layers);
