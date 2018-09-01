import React, {Component} from 'react';
import {Button, Field} from "bloomer";

import './build.css';
import {addLayer} from "../../reducers/layer/layerActions";
import {connect} from "react-redux";

class Build extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDense: true
    }
  }

  handleAddLayer = () => { this.props.dispatch(addLayer()); this.props.redraw(); };
  handleSwitchNewLayer = (isDense) => { this.setState({ isDense: isDense}) };

  render() {
    return (
      <div className="Build">
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

export default connect(()=>{})(Build);
