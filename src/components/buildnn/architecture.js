import React, {Component} from 'react'
import Layers from "./sidePane/layers";
import {Column, Columns, Icon, Tab, TabLink, TabList, Tabs} from "bloomer";
import Styling from "./sidePane/styling";
import './architecture.css';
import {connect} from "react-redux";
import Build from "./sidePane/build";
import Visualize from "./mainPane/visualize";
import Code from "./mainPane/code";
import {CNN} from "./cnn";

class Architecture extends Component {

  constructor(props) {
    super(props);
    this.fcnn = null;
    this.state = {
      styling: false,
      code: false
    };
  }

  initialize = () => {
    // this.fcnn = FCNN();
    this.cnn = CNN();
    console.log(this.cnn);
    // if(this.props.layers.length<2) {
    //   this.props.dispatch(addLayer());
    //   this.props.dispatch(addLayer());
    // }
    this.redraw();
  };

  redraw = (showLabels=true) => {
    this.cnn.redraw({architecture_: [
                        {widthAndHeight: 224, depth: 3, stride: 11, rel_x: 0.01998581592106652, rel_y: 0.0837101057701986},
                        {widthAndHeight: 55, depth: 96, stride: 5, rel_x: 0.35794443470524107, rel_y: 0.16453517861071987}],
        architecture2_: [2048, 2048, 1000]});
    // this.fcnn.redraw({architecture_: getArchitecture()});
    // this.fcnn.redraw({showLabels_: showLabels});
    // this.fcnn.redistribute({betweenNodesInLayer_: getSpacing()});
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
          { !this.state.styling && <Build redraw={this.redraw}/>}
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
