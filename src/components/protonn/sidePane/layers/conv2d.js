import React, {Component} from 'react'
import {Button} from "bloomer";
import './conv2d.css'

import {connect} from "react-redux";
import {deleteLayer, getLayerName} from "src/reducers/architectureActions";
import {
  changeDisplayKernelPositionX,
  changeDisplayKernelPositionY,
  changeFeatureMaps,
  changeHeight,
  changeKernelSize,
  changeWidth
} from "src/reducers/layer/conv2dActions";
import {tabActivations, tabBuild, tabStyle} from "../../architecture";
import Activation from "../activation";

class Conv2DLayer extends Component {

  HEIGHT = 'height';
  WIDTH = 'width';
  KERNEL_SIZE = 'kernel_size';
  FEATURE_MAPS = 'feature_maps';

  handleChangeParam = (e) => {
    let param = parseInt(e.currentTarget.value);
    let paramType = e.currentTarget.getAttribute('param');
    if (param<=0) return;
    if(paramType===this.HEIGHT) this.props.dispatch(changeHeight(this.props.layerPosition, param));
    if(paramType===this.WIDTH) this.props.dispatch(changeWidth(this.props.layerPosition, param));
    if(paramType===this.KERNEL_SIZE) this.props.dispatch(changeKernelSize(this.props.layerPosition, param));
    if(paramType===this.FEATURE_MAPS) this.props.dispatch(changeFeatureMaps(this.props.layerPosition, param));
    this.props.redraw();
  };

  handleDeleteLayer = () => {
    this.props.dispatch(deleteLayer(this.props.layerPosition));
    this.props.redraw();
  };

  handleXSliderChange = (e) => {
    let xPosition = parseFloat(e.currentTarget.value);
    this.props.dispatch(changeDisplayKernelPositionX(this.props.layerPosition, xPosition));
    this.props.redraw();
  };

  handleYSliderChange = (e) => {
    let yPosition = parseFloat(e.currentTarget.value);
    this.props.dispatch(changeDisplayKernelPositionY(this.props.layerPosition, yPosition));
    this.props.redraw();
  };

  render() {
    let featureMaps = this.props.layer.featureMaps;
    let kernelSize = this.props.layer.kernelSize;
    let xPos = this.props.layer.kernelDisplayPositionX;
    let yPos = this.props.layer.kernelDisplayPositionY;
    let height = this.props.layer.height;
    let width = this.props.layer.width;
    let layerName = getLayerName(this.props.layer);
    return (
      <div className="is-horizontal layer conv2dLayer">
        <div className="field-label is-normal inputLayerName">
          <label className="label">{layerName}</label>
        </div>
        {
          (this.props.sidePaneTab===tabStyle) && <input className="slider sliderLayerSpacing"
                                       value={xPos}
                                       onChange={this.handleXSliderChange}
                                       step="0.01" min="-0.4" max="0.4"
                                       defaultValue="0" type="range" />
        }
        {
          (this.props.sidePaneTab===tabStyle) && <input className="slider sliderLayerSpacing"
                                       value={yPos}
                                       onChange={this.handleYSliderChange}
                                       step="0.01" min="-0.4" max="0.4"
                                       defaultValue="0" type="range" />
        }
        {
          (this.props.sidePaneTab===tabBuild) &&
          <input className="input inputParam inputKernelSize" type="number" placeholder="0"
                 value={kernelSize} inputMode="numeric"
                 param={this.KERNEL_SIZE}
                 onChange={this.handleChangeParam}/>
        }
        {
          (this.props.sidePaneTab===tabBuild) &&
          <input className="input inputParam inputFeatureMaps" type="number" placeholder="0"
                 value={featureMaps} inputMode="numeric"
                 param={this.FEATURE_MAPS}
                 onChange={this.handleChangeParam}/>
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
  }
})(Conv2DLayer);
