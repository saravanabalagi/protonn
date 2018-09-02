import React, {Component} from 'react'
import Layers from "./layers";
import {Column, Columns, Icon, Tab, TabLink, TabList, Tabs} from "bloomer";
import Styling from "./styling";
import {FCNN} from './fcnn';
import './architecture.css';
import {addLayer, getArchitecture, getSpacing} from "../../reducers/layer/architectureActions";
import {connect} from "react-redux";
import Build from "./build";
import Visualize from "./visualize";
import Code from "./code";

class Architecture extends Component {

  constructor(props) {
    super(props);
    this.fcnn = null;
    this.state = {
      styling: false,
      code: false
    };
  }

  componentDidMount() {
    this.fcnn = FCNN();
    this.props.dispatch(addLayer());
    this.props.dispatch(addLayer());
    this.redraw();
  }

  redraw = (showLabels=true) => {
    this.fcnn.redraw({architecture_: getArchitecture()});
    this.fcnn.redraw({showLabels_: showLabels});
    this.fcnn.redistribute({betweenNodesInLayer_: getSpacing()});
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
          { !this.state.code && <Visualize/>}
          { this.state.code && <Code/>}
        </Column>
      </Columns>
    );
  }
}

export default connect((store)=>{
  return {};
})(Architecture);
