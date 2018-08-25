import React, { Component } from 'react'
import {Button, Control, Field, Label, Select} from "bloomer";

class Architecture extends Component {
  render() {
    return (
      <div>
        <Field>
          <Label>Add Layer:</Label>
          <div className="buttons has-addons">
            <Button className="is-success is-selected">Dense</Button>
            <Button>Conv2D</Button>
          </div>
          <Button isColor='info'>Add Layer</Button>
        </Field>
      </div>
    );
  }
}

export default Architecture;
