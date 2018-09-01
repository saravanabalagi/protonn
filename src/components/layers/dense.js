import React, {Component} from 'react'
import {Button} from "bloomer";
import './dense.css'

import {connect} from "react-redux";
import {changeNeuron, deleteLayer, getLayerName} from "../../reducers/layer/layerActions";

class DenseLayer extends Component {

  handleChangeNeurons = (e) => {
    let numberOfNeurons = parseInt(e.target.value);
    if (numberOfNeurons<=0) return;
    this.props.dispatch(changeNeuron(this.props.layerPosition, numberOfNeurons));
    this.props.redraw();
  };

  handleDeleteLayer = () => {
    this.props.dispatch(deleteLayer(this.props.layerPosition));
    this.props.redraw();
  };

  render() {
    let neurons = this.props.layer.neurons;
    let layerName = getLayerName(this.props.layer);
    return (
      <div className="is-horizontal denseLayer">
        <div className="field-label is-normal inputLayerName">
          <label className="label">{layerName}</label>
        </div>
        <input className="input inputLayerSize" type="number" placeholder="0"
               value={neurons} inputMode="numeric"
               onChange={this.handleChangeNeurons}/>
        <Button isColor='danger' onClick={this.handleDeleteLayer}>
          <span className="icon">
            <i className="fa fa-times-circle"/>
          </span>
        </Button>
        {/*<input className="slider sliderLayerSpacing" step="1" min="0" max="100" defaultValue="50" type="range" />*/}
      </div>
    );
  }
}

export default connect((store) => {
  return {
  }
})(DenseLayer);
