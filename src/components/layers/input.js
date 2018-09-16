import React, {Component} from 'react'
import {Button} from "bloomer";
import './input.css'

import {connect} from "react-redux";
import {getLayerName, hasOnlyDense} from "src/reducers/architectureActions";
import {addDimension, changeDimension, deleteDimension} from "../../reducers/layer/inputActions";
import {changeSpacing} from "../../reducers/layer/denseActions";

class InputLayer extends Component {

  handleAddDimension = () => {
    this.props.dispatch(addDimension());
    this.props.redraw();
  };

  handleDeleteDimension = () => {
    this.props.dispatch(deleteDimension());
    this.props.redraw();
  };

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
        <Button isColor='white' onClick={this.handleAddDimension}
                className={`icon-button info ${(this.props.styling || dimensions.length>=3)?"invisible":""}`}>
          <span className="icon">
            <i className="fa fa-plus-circle"/>
          </span>
        </Button>
        <Button isColor='white' onClick={this.handleDeleteDimension}
                className={`icon-button danger ${(this.props.styling || (hasOnlyDense() && dimensions.length<2) || (!hasOnlyDense() && dimensions.length<3))?"invisible":""}`}>
          <span className="icon">
            <i className="fa fa-times-circle"/>
          </span>
        </Button>
      </div>
    );
  }
}

export default connect(() => {
  return {
  }
})(InputLayer);
