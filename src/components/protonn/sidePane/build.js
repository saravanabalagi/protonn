import React, {Component} from 'react';
import {Button} from "bloomer";

import './build.css';
import {addLayer} from "src/reducers/architectureActions";
import {connect} from "react-redux";
import {denseLayer} from "../../../reducers/layer/denseReducer";
import {conv2dLayer} from "../../../reducers/layer/conv2dReducer";
import {maxPooling2dLayer} from "../../../reducers/layer/maxPooling2dReducer";
import {upSampling2dLayer} from "../../../reducers/layer/upSampling2dReducer";
import {batchNormLayer} from "../../../reducers/layer/batchNormReducer";

export const addLayerFromStart = 'addLayerFromStart';
export const addLayerFromEnd = 'addLayerFromEnd';

class Build extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addLayerFromEndOffset: 0,
      addLayerFromStartOffset: 1,
      addLayerFrom: addLayerFromEnd
    };
  }

  handleAddLayer = (e) => {
    let newLayerPosition = this.getNewLayerPosition();
    if(newLayerPosition<1 || newLayerPosition>this.props.layers.length) return;
    this.props.dispatch(addLayer(e.currentTarget.getAttribute('identity'), newLayerPosition));
    this.props.redraw();
  };

  handleChangePosition = (e) => {
    let offset = parseInt(e.currentTarget.value);
    let newLayerPosition = this.getNewLayerPosition(offset);
    if(newLayerPosition<1 || newLayerPosition>this.props.layers.length) return;
    console.log('offset, newLayerPosition', offset, newLayerPosition);
    switch (this.state.addLayerFrom) {
      case addLayerFromStart: this.setState({addLayerFromStartOffset: offset}); break;
      case addLayerFromEnd: this.setState({addLayerFromEndOffset: offset}); break;
    }
  };

  handleRadioChange = (e) => {
    let addLayerFrom = e.currentTarget.getAttribute('id');
    this.setState({addLayerFrom: addLayerFrom});
  };

  getNewLayerPosition = (offset) => {
    let newLayerPosition = null;
    switch (this.state.addLayerFrom) {
      case addLayerFromStart:
        if(offset===null) offset = this.state.addLayerFromStartOffset;
        newLayerPosition = offset;
        break;
      case addLayerFromEnd:
        if(offset===null) offset = this.state.addLayerFromEndOffset;
        newLayerPosition = this.props.layers.length - offset;
        break;
    }
    return newLayerPosition;
  };

  render() {
    return (
      <div className="Build sidePaneTab">
        <div className="is-divider" data-content="Add Layer"/>
        <div className="is-horizontal checkbox-form">
          <div className="field-label is-normal inputLayerName">
            <label className="label">Add at</label>
          </div>
          <div className="field inline-block">
            <input className="is-checkradio is-info"
                   id={addLayerFromStart}
                   type="radio"
                   onChange={this.handleRadioChange}
                   checked={this.state.addLayerFrom===addLayerFromStart} />
            <label htmlFor={addLayerFromStart}>Start</label>
            <input className="is-checkradio is-info"
                   id={addLayerFromEnd}
                   onChange={this.handleRadioChange}
                   checked={this.state.addLayerFrom===addLayerFromEnd}
                   type="radio"/>
            <label htmlFor={addLayerFromEnd}>End</label>
          </div>
        </div>
        <div className="is-horizontal">
          <div className="field-label is-normal inputLayerName">
            <label className="label">Offset</label>
          </div>
          {
            this.state.addLayerFrom===addLayerFromStart &&
            <input className="input inputParam" type="number"
                    inputMode="numeric"
                    value={this.state.addLayerFromStartOffset}
                    onChange={this.handleChangePosition}/>
          }
          {
            this.state.addLayerFrom===addLayerFromEnd &&
            <input className="input inputParam" type="number"
                     inputMode="numeric"
                     value={this.state.addLayerFromEndOffset}
                     onChange={this.handleChangePosition}/>
          }
        </div>
        <div className="addLayerOptions">
          <Button className="is-light is-small" identity={denseLayer} onClick={this.handleAddLayer}>Dense</Button>
          <Button className="is-light is-small" identity={conv2dLayer} onClick={this.handleAddLayer}>Conv2D</Button>
          <Button className="is-light is-small" identity={maxPooling2dLayer} onClick={this.handleAddLayer}>MaxPooling2D</Button>
          <Button className="is-light is-small" identity={upSampling2dLayer} onClick={this.handleAddLayer}>UpSampling2D</Button>
          <Button className="is-light is-small" identity={batchNormLayer} onClick={this.handleAddLayer}>BatchNorm</Button>
        </div>
      </div>
    );
  }
}

export default connect((store)=>{
  return {
    layers: store.architecture.layers
  }
})(Build);
