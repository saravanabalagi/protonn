import React, {Component} from 'react'
import {Button} from "bloomer";
import './dense.css'

import {connect} from "react-redux";
import {changeNeuron} from "../../reducers/layer/layerActions";

class DenseLayer extends Component {

  handleChangeNeurons = (e) => {
    let numberOfNeurons = parseInt(e.target.value);
    this.props.dispatch(changeNeuron(this.props.layerPosition, numberOfNeurons));
  };

  render() {
    let neurons = this.props.layer.neurons;
    return (
      <div className="is-horizontal denseLayer">
        <div className="field-label is-normal inputLayerName">
          <label className="label">dense_1</label>
        </div>
        <input className="input inputLayerSize" type="number" placeholder="0"
               value={neurons} inputMode="numeric"
               onChange={this.handleChangeNeurons}/>
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

export default connect((store) => {
  return {
  }
})(DenseLayer);
