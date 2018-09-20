import React, {Component} from 'react'
import './input.css'

import {connect} from "react-redux";
import {getLayerName} from "src/reducers/architectureActions";
import {changeDimension} from "src/reducers/layer/inputActions";
import {changeSpacing} from "src/reducers/layer/denseActions";

class InputLayer extends Component {

  handleChangeDimension = (e) => {
    let numberOfNeurons = parseInt(e.currentTarget.value);
    let dimIndex = e.currentTarget.getAttribute('index');
    if (isNaN(numberOfNeurons) || numberOfNeurons<=0) return;
    this.props.dispatch(changeDimension(numberOfNeurons, dimIndex));
    this.props.redraw();
  };

  handleSliderChange = (e) => {
    let spacingWithin = parseInt(e.currentTarget.value);
    this.props.dispatch(changeSpacing(this.props.layerPosition, spacingWithin));
    this.props.redraw();
  };

  render() {
    let dimensions = this.props.layer.dimensions;
    let layerName = getLayerName(this.props.layer);
    return (
      <div className="is-horizontal layer inputLayer">
        <div className="field-label is-normal inputLayerName">
          <label className="label">{layerName}</label>
        </div>
        {
          !this.props.styling && dimensions.map((dim, index)=><input className="input inputParam inputLayerSize" type="number"
                                                                      placeholder={dim}
                                                                      key={index}
                                                                      index={index}
                                                                      value={dim} inputMode="numeric"
                                                                      onChange={this.handleChangeDimension}/>)
        }
        {
          this.props.styling && <input className="slider sliderLayerSpacing"
                                       onChange={this.handleSliderChange}
                                       step="1" min="0" max="100"
                                       defaultValue="50" type="range" />
        }
      </div>
    );
  }
}

export default connect(() => {
  return {
  }
})(InputLayer);
