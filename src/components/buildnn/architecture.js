import React, {Component} from 'react'
import Layers from "./sidePane/layers";
import {Column, Columns, Icon, Tab, TabLink, TabList, Tabs} from "bloomer";
import Styling from "./sidePane/styling";
import './architecture.css';
import {connect} from "react-redux";
import Build from "./sidePane/build";
import Visualize from "./mainPane/visualize";
import Code from "./mainPane/code";
import {denseLayer} from "../../reducers/layer/denseReducer";
import {addLayer, getArchitecture, getSpacing} from "../../reducers/architectureActions";
import {inputLayer} from "../../reducers/layer/inputReducer";
import {DNN, dnn} from "./dnn";
import {CNN, cnn} from "./cnn";

class Architecture extends Component {

  constructor(props) {
    super(props);
    this.nn = null;
    this.nnType = null;
    this.state = {
      styling: false,
      code: false
    };
  }

  initialize = (architectureType) => {
    console.log('initialize called', architectureType);
    this.nnType = architectureType;
    switch (architectureType) {
      case DNN: this.nn = dnn(); console.log('dnn initialized'); break;
      case CNN: this.nn = cnn(); console.log('cnn initialized'); break;
      default: this.nn = dnn();
    }
    if(this.props.layers.length<2) {
      this.props.dispatch(addLayer(inputLayer));
      this.props.dispatch(addLayer(denseLayer));
    }
    this.redraw();
  };

  redraw = (showLabels=true) => {
    switch (this.nnType) {
      case DNN: {
        console.log(getArchitecture(), getSpacing());
        this.nn.redraw({architecture_: getArchitecture()});
        this.nn.redraw({showLabels_: showLabels});
        this.nn.redistribute({betweenNodesInLayer_: getSpacing()});
      } break;
      case CNN: {
        this.nn.redraw({architecture_: [
                            {widthAndHeight: 224, featureMaps: 3, kernelSize: 11, kernelDisplayPositionX: 0.01998581592106652, kernelDisplayPositionY: 0.0837101057701986},
                            {widthAndHeight: 55, featureMaps: 96, kernelSize: 5, kernelDisplayPositionX: 0.35794443470524107, kernelDisplayPositionY: 0.16453517861071987}],
                        architecture2_: [2048, 2048, 1000]});
      } break;
    }

  };

  render() {
    return (
      <Columns className="is-fullheight">
        <Column isSize='1/3' className="sidePanel">
          <Tabs isAlign="centered">
            <TabList>
              <Tab isActive={!this.state.styling}>
                <TabLink onClick={()=>this.setState({styling: false})}>
                  <Icon isSize='small'><span className='fa fa-gavel' aria-hidden='true' /></Icon>
                  <span>Build</span>
                </TabLink>
              </Tab>
              <Tab isActive={this.state.styling}>
                <TabLink onClick={()=>this.setState({styling: true})}>
                  <Icon isSize='small'><span className='fa fa-pie-chart' aria-hidden='true' /></Icon>
                  <span>Style</span>
                </TabLink>
              </Tab>
            </TabList>
          </Tabs>
          <Layers redraw={this.redraw} styling={this.state.styling}/>
          { !this.state.styling && <Build redraw={this.redraw} initialize={this.initialize} />}
          { this.state.styling && <Styling redraw={this.redraw}/>}
        </Column>
        <Column className="mainPanel">
          <Tabs isAlign="centered">
            <TabList>
              <Tab isActive={!this.state.code}>
                <TabLink onClick={()=>this.setState({code: false})}>
                  <Icon isSize='small'><span className='fa fa-eye' aria-hidden='true' /></Icon>
                  <span>Visualize</span>
                </TabLink>
              </Tab>
              <Tab isActive={this.state.code}>
                <TabLink onClick={()=>this.setState({code: true})}>
                  <Icon isSize='small'><span className='fa fa-code' aria-hidden='true' /></Icon>
                  <span>Code</span>
                </TabLink>
              </Tab>
            </TabList>
          </Tabs>
          { !this.state.code && <Visualize initialize={this.initialize}/>}
          { this.state.code && <Code/>}
        </Column>
      </Columns>
    );
  }
}

export default connect((store)=>{
  return {
    layers: store.architecture.layers
  };
})(Architecture);
