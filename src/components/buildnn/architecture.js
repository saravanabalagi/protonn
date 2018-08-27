import React, {Component} from 'react'
import {Button, Content, Field} from "bloomer";

import './architecture.css'
import DenseLayer from "../layers/dense";
import {addLayer} from "../../reducers/layer/layerActions";
import {connect} from "react-redux";

class Architecture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDense: true
    }
  }

  handleAddLayer = () => { this.props.dispatch(addLayer()) };
  handleSwitchNewLayer = (isDense) => { this.setState({ isDense: isDense}) };

  render() {
    let layers = this.props.layers;
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
        <div className="is-divider" data-content="Add Layer"/>
        <Field isHorizontal>
          <div className="buttons has-addons">
            <Button className={this.state.isDense ? "is-success is-selected" : ""} onClick={()=>this.handleSwitchNewLayer(true)}>Dense</Button>
            <Button className={this.state.isDense ? "" : "is-success is-selected"} onClick={()=>this.handleSwitchNewLayer(false)}>Conv2D</Button>
          </div>
          <Button isColor='info' className="addLayer" onClick={this.handleAddLayer}>
            <span className="icon">
              <i className="fa fa-plus-circle"/>
            </span>
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
