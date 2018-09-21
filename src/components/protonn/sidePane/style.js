import React, {Component} from 'react';

import {Control, Field} from "bloomer";
import './style.css';

class Style extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLabels: true
    }
  }

  handleShowLayerLabels = () => {
    this.setState({showLabels: !this.state.showLabels}, () => {
      this.props.redraw(this.state.showLabels)
    });
  };

  render() {
    return (
      <div className="Styling sidePaneTab">
        <div className="is-divider" data-content="Configure"/>
        <Field>
          <Control>
            <input className="is-checkradio" type="checkbox" id="showLabelsCheckBox"
                   checked={this.state.showLabels}
                   onChange={this.handleShowLayerLabels} />
            <label htmlFor="showLabelsCheckBox">Show Labels</label>
          </Control>
        </Field>
      </div>
    );
  }
}

export default Style;
