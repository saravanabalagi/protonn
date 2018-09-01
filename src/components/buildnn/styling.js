import React, {Component} from 'react';

import './styling.css';

class Styling extends Component {

  handleShowLayerLabels = () => {

  };

  render() {
    return (
      <div className="Styling">
        <div className="is-divider" data-content="Configure"/>
        <div className="field">
          <input className="is-checkradio"
                 type="checkbox" name="exampleCheckbox"
                 onChange={this.handleShowLayerLabels}
                 checked="checked" />
            <label htmlFor="exampleCheckbox">Show Layer Labels</label>
        </div>
      </div>
    );
  }
}

export default Styling;
