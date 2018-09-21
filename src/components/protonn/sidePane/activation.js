import React, {Component} from 'react';
import {
  Button,
  Dropdown,
  DropdownContent,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Icon
} from "bloomer";
import {
  displayNameActivations,
  eluActivation,
  exponentialActivation,
  hardSigmoidActivation,
  linearActivation,
  noActivation,
  reluActivation,
  seluActivation,
  sigmoidActivation,
  softmaxActivation,
  softPlusActivation,
  softSignActivation,
  tanhActivation
} from "../../../reducers/layer/layerReducer";
import {changeActivation} from "../../../reducers/layer/layerActions";
import {connect} from "react-redux";

class Activation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dropdownActive: false
    };
  }

  handleDropdownToggle = () => {
    this.setState({dropdownActive: !this.state.dropdownActive});
  };

  handleDropdownSelect = (e) => {
    let activation = e.currentTarget.getAttribute('activation');
    this.props.dispatch(changeActivation(activation, this.props.layer.layerPosition));
    this.handleDropdownToggle();
  };

  renderDropdownFor = (activation) => {
    return (
      <DropdownItem href='javascript:;' onClick={this.handleDropdownSelect}
                    activation={activation}>{displayNameActivations[activation]}</DropdownItem>
    );
  };

  render() {
    let activation = this.props.layer.activation;
    return (
      <Dropdown className={this.state.dropdownActive?"is-active":""}>
        <DropdownTrigger>
          <Button isOutlined onClick={this.handleDropdownToggle}
                  aria-haspopup="true" aria-controls="dropdown-menu">
            <span>{displayNameActivations[activation]}</span>
            <Icon icon="angle-down" isSize="small" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownContent>
            { this.renderDropdownFor(sigmoidActivation) }
            { this.renderDropdownFor(hardSigmoidActivation) }
            { this.renderDropdownFor(tanhActivation) }
            <DropdownDivider />
            { this.renderDropdownFor(reluActivation) }
            { this.renderDropdownFor(eluActivation) }
            { this.renderDropdownFor(seluActivation) }
            <DropdownDivider />
            { this.renderDropdownFor(softmaxActivation) }
            { this.renderDropdownFor(softPlusActivation) }
            { this.renderDropdownFor(softSignActivation) }
            <DropdownDivider />
            { this.renderDropdownFor(exponentialActivation) }
            { this.renderDropdownFor(linearActivation) }
            { this.renderDropdownFor(noActivation) }
          </DropdownContent>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default connect((store)=>{
  return {
    layers: store.architecture.layers
  }
})(Activation);
