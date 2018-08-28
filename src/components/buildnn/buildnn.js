import React, {Component} from 'react'
import Architecture from "./architecture";
import {Column, Columns} from "bloomer";
import Styling from "./styling";
import {FCNN} from './fcnn';
import './buildnn.css';

class BuildNN extends Component {

  componentDidMount() {
    let fcnn = FCNN();
    fcnn.redraw({architecture_:[16, 12, 10, 1]});
    fcnn.redistribute({betweenNodesInLayer_: [7, 20, 20, 20, 20]});
  }

  render() {
    return (
      <Columns className="is-fullheight">
        <Column isSize='1/3' className="sidePanel">
          <Architecture/>
          <Styling/>
        </Column>
        <Column>
          <div id="graph-container" style={{height: "100%"}}/>
        </Column>
      </Columns>
    );
  }
}

export default BuildNN
