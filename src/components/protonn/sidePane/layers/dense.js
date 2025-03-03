import React, {Component} from 'react'
import {Button} from "bloomer";
import './dense.css'

import {connect} from "react-redux";
import {deleteLayer, getLayerName} from "src/reducers/architectureActions";
import {changeNeuron, changeSpacing} from "src/reducers/layer/denseActions";
import {tabActivations, tabBuild, tabStyle} from "../../architecture";
import Activation from "../activation";

class DenseLayer extends Component {

  handleChangeNeurons = (e) => {
    let numberOfNeurons = parseInt(e.currentTarget.value);
    if (numberOfNeurons<=0) return;
    this.props.dispatch(changeNeuron(this.props.layerPosition, numberOfNeurons));
    this.props.redraw();
  };

  handleDeleteLayer = () => {
    this.props.dispatch(deleteLayer(this.props.layerPosition));
    this.props.redraw();
  };

  handleSliderChange = (e) => {
    let spacingWithin = parseInt(e.currentTarget.value);
    this.props.dispatch(changeSpacing(this.props.layerPosition, spacingWithin));
    this.props.redraw();
  };

  render() {
    let neurons = this.props.layer.neurons;
    let layerName = getLayerName(this.props.layer);
    return (
      <div className="is-horizontal layer denseLayer">
        <div className="field-label is-normal inputLayerName">
          <label className="label">{layerName}</label>
        </div>
        {
          (this.props.sidePaneTab===tabStyle) && <input className="slider sliderLayerSpacing"
                                       onChange={this.handleSliderChange}
                                       step="1" min="0" max="100"
                                       defaultValue="50" type="range" />
        }
        {
          (this.props.sidePaneTab===tabBuild) &&
          <input className="input inputParam" type="number" placeholder="0"
                 value={neurons} inputMode="numeric"
                 onChange={this.handleChangeNeurons}/>
        }
        {
          (this.props.sidePaneTab===tabActivations) &&
          <Activation layer={this.props.layer} />
        }
        {
          (this.props.sidePaneTab === tabBuild) &&
          <Button isColor='white' onClick={this.handleDeleteLayer}
                  className={'icon-button danger'}>
            <span className="icon">
              <i className="fa fa-times-circle"/>
            </span>
          </Button>
        }
      </div>
    );
  }
}

export default connect((store) => {
  return {
    layers: store.architecture.layers
  }
})(DenseLayer);
