import React, {Component} from 'react';
import {Button} from "bloomer";

import './build.css';
import {addLayer, isValidAddLayer} from "src/reducers/architectureActions";
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
      newLayerPosition: null,
      addLayerFromEndOffset: 0,
      addLayerFromStartOffset: 1,
      addLayerFrom: addLayerFromEnd
    };
  }

  componentDidMount() {
    this.updateNewLayerPosition();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.layers.length!==this.props.layers.length) {
      let newLayerPosition = this.getNewLayerPosition(null, nextProps.layers.length);
      this.setState({newLayerPosition: newLayerPosition});
    }
  }

  handleAddLayer = (e) => {
    let newLayerPosition = this.state.newLayerPosition;
    if(isNaN(newLayerPosition) || newLayerPosition===null) return;
    if(newLayerPosition<1 || newLayerPosition>this.props.layers.length) return;
    this.props.dispatch(addLayer(e.currentTarget.getAttribute('identity'), newLayerPosition));
    this.props.redraw();
  };

  handleChangePosition = (e) => {
    let offset = parseInt(e.currentTarget.value);
    let newLayerPosition = this.getNewLayerPosition(offset);
    if(newLayerPosition<1 || newLayerPosition>this.props.layers.length) return;
    this.setState({newLayerPosition: newLayerPosition});
    switch (this.state.addLayerFrom) {
      case addLayerFromStart: this.setState({addLayerFromStartOffset: offset}); break;
      case addLayerFromEnd: this.setState({addLayerFromEndOffset: offset}); break;
    }
  };

  handleRadioChange = (e) => {
    let addLayerFrom = e.currentTarget.getAttribute('id');
    this.setState({addLayerFrom: addLayerFrom}, this.updateNewLayerPosition);
  };

  getNewLayerPosition = (offset, layersLength=this.props.layers.length) => {
    let newLayerPosition = null;
    switch (this.state.addLayerFrom) {
      case addLayerFromStart:
        if(typeof offset === 'undefined' || offset === null)
          offset = this.state.addLayerFromStartOffset;
        newLayerPosition = offset;
        break;
      case addLayerFromEnd:
        if(typeof offset === 'undefined' || offset === null)
          offset = this.state.addLayerFromEndOffset;
        newLayerPosition = layersLength - offset;
        break;
    }
    console.log('newLayerPosition', newLayerPosition);
    return newLayerPosition;
  };

  updateNewLayerPosition = () => {
    let newLayerPosition = this.getNewLayerPosition();
    this.setState({newLayerPosition: newLayerPosition});
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
          {
            isValidAddLayer(denseLayer, this.state.newLayerPosition) &&
            <Button className="is-light is-small" identity={denseLayer} onClick={this.handleAddLayer}>Dense</Button>
          }
          {
            isValidAddLayer(conv2dLayer, this.state.newLayerPosition) &&
            <Button className="is-light is-small" identity={conv2dLayer} onClick={this.handleAddLayer}>Conv2D</Button>
          }
          {
            isValidAddLayer(maxPooling2dLayer, this.state.newLayerPosition) &&
            <Button className="is-light is-small" identity={maxPooling2dLayer}
                    onClick={this.handleAddLayer}>MaxPooling2D</Button>
          }
          {
            isValidAddLayer(upSampling2dLayer, this.state.newLayerPosition) &&
            <Button className="is-light is-small" identity={upSampling2dLayer}
                    onClick={this.handleAddLayer}>UpSampling2D</Button>
          }
          {
            isValidAddLayer(batchNormLayer, this.state.newLayerPosition) &&
            <Button className="is-light is-small" identity={batchNormLayer}
                    onClick={this.handleAddLayer}>BatchNorm</Button>
          }
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
