import React, {Component} from 'react'
import {Button} from "bloomer";
import './dense.css'

import {connect} from "react-redux";
import {changeNeuron, changeSpacing, deleteLayer, getLayerName} from "../../reducers/layer/layerActions";

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

  handleSliderChange = (e) => {
    let spacing = parseInt(e.target.value);
    this.props.dispatch(changeSpacing(this.props.layerPosition, spacing));
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
        {
          this.props.styling && <input className="slider sliderLayerSpacing"
                                       onChange={this.handleSliderChange}
                                       step="1" min="0" max="100"
                                       defaultValue="50" type="range" />
        }
        {
          !this.props.styling &&
          <input className="input inputLayerSize" type="number" placeholder="0"
                 value={neurons} inputMode="numeric"
                 onChange={this.handleChangeNeurons}/>
        }
        <Button isColor='danger' onClick={this.handleDeleteLayer}
                className={this.props.styling && "invisible"}>
          <span className="icon">
            <i className="fa fa-times-circle"/>
          </span>
        </Button>
      </div>
    );
  }
}

export default connect((store) => {
  return {
  }
})(DenseLayer);
