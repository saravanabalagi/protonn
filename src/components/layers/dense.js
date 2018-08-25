import React, {Component} from 'react'
import {Button} from "bloomer";
import './dense.css'

class DenseLayer extends Component {
  render() {
    return (
      <div className="is-horizontal denseLayer">
        <div className="field-label is-normal inputLayerName">
          <label className="label">dense_1</label>
        </div>
        <input className="input inputLayerSize" type="number" placeholder="0" />
        <Button isColor='danger'>
          <span className="icon">
            <i className="fa fa-times-circle"/>
          </span>
        </Button>
        {/*<input className="slider sliderLayerSpacing" step="1" min="0" max="100" defaultValue="50" type="range" />*/}
      </div>
    );
  }
}

export default DenseLayer
