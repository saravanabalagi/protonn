import React, {Component} from 'react'
import Architecture from "./architecture";
import {Column, Columns} from "bloomer";
import Styling from "./styling";
import {FCNN} from './fcnn';
import './buildnn.css';
import {addLayer, getArchitecture, getSpacing} from "../../reducers/layer/layerActions";
import {connect} from "react-redux";

class BuildNN extends Component {

  constructor(props) {
    super(props);
    this.fcnn = null;
  }

  componentDidMount() {
    this.fcnn = FCNN();
    this.props.dispatch(addLayer());
    this.props.dispatch(addLayer());
    this.redraw();
  }

  redraw = () => {
    this.fcnn.redraw({architecture_: getArchitecture()});
    this.fcnn.redistribute({betweenNodesInLayer_: getSpacing()});
    console.log(this.fcnn);
  };

  render() {
    return (
      <Columns className="is-fullheight">
        <Column isSize='1/3' className="sidePanel">
          <Architecture redraw={this.redraw}/>
          <Styling/>
        </Column>
        <Column>
          <div id="graph-container" style={{height: "100%"}}/>
        </Column>
      </Columns>
    );
  }
}

export default connect((store)=>{
  return {};
})(BuildNN);
