import React, {Component} from 'react'
import Architecture from "./architecture";
import {Column, Columns} from "bloomer";

class BuildNN extends Component {
  render() {
    return (
      <Columns>
        <Column isSize='1/3'>
          <Architecture/>
        </Column>
        <Column>
          View
        </Column>
      </Columns>
    );
  }
}

export default BuildNN
