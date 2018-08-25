import React, {Component} from 'react'
import {Button, Content, Field} from "bloomer";

import './architecture.css'
import DenseLayer from "../layers/dense";

class Architecture extends Component {
  render() {
    return (
      <div className="Architecture">
        <Content>
          <h1>Architecture</h1>
        </Content>
        <DenseLayer/>
        <Field isHorizontal>
          <div className="buttons has-addons">
            <Button className="is-success is-selected">Dense</Button>
            <Button>Conv2D</Button>
          </div>
          <Button isColor='info' className="addLayer">
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

export default Architecture;
