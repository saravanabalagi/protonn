import React, {Component} from 'react'
import {Button, Content, Field} from "bloomer";

import './architecture.css'
import DenseLayer from "../layers/dense";
import {addLayer} from "../../reducers/layer/layerActions";
import {connect} from "react-redux";

class Architecture extends Component {

  handleAddLayer = () => { this.props.dispatch(addLayer()) };

  render() {
    let layers = this.props.layers;
    console.log(layers);
    return (
      <div className="Architecture">
        <Content>
          <h1>Architecture</h1>
        </Content>
        {
          layers.map((object, index)=>{
            return <DenseLayer key={index} layerPosition={index} layer={object}/>
          })
        }
        <div className="is-divider"/>
        <Field isHorizontal>
          <div className="buttons has-addons">
            <Button className="is-success is-selected">Dense</Button>
            <Button>Conv2D</Button>
          </div>
          <Button isColor='info' className="addLayer" onClick={this.handleAddLayer}>
            <span className="icon">
              <i className="fa fa-plus-circle"/>
            </span>
            <span>Add Layer</span>
          </Button>
        </Field>
      </div>
    );
  }
}

export default connect((store)=> {
  return {
    layers: store.layers.layers
  }
})(Architecture);
