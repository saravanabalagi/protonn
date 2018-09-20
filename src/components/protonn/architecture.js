import React, {Component} from 'react'
import Layers from "./sidePane/layers";
import {Column, Columns, Icon, Tab, TabLink, TabList, Tabs} from "bloomer";
import Styling from "./sidePane/styling";
import './architecture.css';
import {connect} from "react-redux";
import Build from "./sidePane/build";
import Visualize from "./mainPane/visualize";
import Code from "./mainPane/code";
import {
  addLayer,
  getConvArchitecture,
  getDenseArchitecture,
  getDenseInConvArchitecture,
  getSpacing
} from "../../reducers/architectureActions";
import {inputLayer} from "../../reducers/layer/inputReducer";
import {DNN, dnn} from "./dnn";
import {CNN, cnn} from "./cnn";
import Convert from "./sidePane/convert";

export const tabBuild = 'tabBuild';
export const tabStyle = 'tabStyle';
export const tabConvert = 'tabConvert';
export const tabVisualize = 'tabVisualize';
export const tabCode = 'tabCode';

class Architecture extends Component {

  constructor(props) {
    super(props);
    this.nn = null;
    this.state = {
      sidePaneTab: tabBuild,
      mainPaneTab: tabVisualize
    };
  }

  initialize = (architectureType) => {
    console.log('initialize called', architectureType);
    switch (architectureType) {
      case DNN: this.nn = dnn(); console.log('dnn initialized'); break;
      case CNN: this.nn = cnn(); console.log('cnn initialized'); break;
      default: this.nn = dnn();
    }
    if(this.props.layers.length<1) {
      this.props.dispatch(addLayer(inputLayer));
    }
    this.redraw();
  };

  redraw = (showLabels=true) => {
    switch (this.props.architectureType) {
      case DNN: {
        console.log('arch', getDenseArchitecture(), getSpacing());
        this.nn.redraw({architecture_: getDenseArchitecture()});
        this.nn.redraw({showLabels_: showLabels});
        this.nn.redistribute({betweenNodesInLayer_: getSpacing()});
      } break;
      case CNN: {
        console.log('arch', getConvArchitecture(), getDenseInConvArchitecture());
        this.nn.redraw({
          architecture_: getConvArchitecture(),
          architecture2_: getDenseInConvArchitecture()
        });
      } break;
    }
  };

  handleSelectSidePaneTab = (e) => {
    let selectedSidePanelTab = e.currentTarget.getAttribute('tab');
    this.setState({sidePaneTab: selectedSidePanelTab});
  };

  handleSelectMainPaneTab = (e) => {
    let selectedMainPanelTab = e.currentTarget.getAttribute('tab');
    this.setState({mainPaneTab: selectedMainPanelTab});
  };

  render() {
    let sidePaneTab = this.state.sidePaneTab;
    let mainPaneTab = this.state.mainPaneTab;
    return (
      <Columns className="is-fullheight">
        <Column isSize='1/3' className="sidePane">
          <Tabs isAlign="centered" className="sidePaneTabsBar">
            <TabList>
              <Tab isActive={sidePaneTab===tabBuild}>
                <TabLink tab={tabBuild} onClick={this.handleSelectSidePaneTab}>
                  <Icon isSize='small'><span className='fa fa-gavel' aria-hidden='true' /></Icon>
                  <span>Build</span>
                </TabLink>
              </Tab>
              <Tab isActive={sidePaneTab===tabStyle}>
                <TabLink tab={tabStyle} onClick={this.handleSelectSidePaneTab}>
                  <Icon isSize='small'><span className='fa fa-pie-chart' aria-hidden='true' /></Icon>
                  <span>Style</span>
                </TabLink>
              </Tab>
              <Tab isActive={sidePaneTab===tabConvert}>
                <TabLink tab={tabConvert} onClick={this.handleSelectSidePaneTab}>
                  <Icon isSize='small'><span className='fa fa-refresh' aria-hidden='true' /></Icon>
                  <span>Convert</span>
                </TabLink>
              </Tab>
            </TabList>
          </Tabs>
          { (sidePaneTab===tabBuild || sidePaneTab===tabStyle)
                && <Layers redraw={this.redraw} styling={sidePaneTab===tabStyle}/> }
          { sidePaneTab===tabBuild && <Build redraw={this.redraw}/>}
          { sidePaneTab===tabStyle && <Styling redraw={this.redraw}/>}
          { sidePaneTab===tabConvert && <Convert redraw={this.redraw} initialize={this.initialize}/>}
        </Column>
        <Column className="mainPanel">
          <Tabs isAlign="centered">
            <TabList>
              <Tab isActive={mainPaneTab===tabVisualize}>
                <TabLink tab={tabVisualize} onClick={this.handleSelectMainPaneTab}>
                  <Icon isSize='small'><span className='fa fa-eye' aria-hidden='true' /></Icon>
                  <span>Visualize</span>
                </TabLink>
              </Tab>
              <Tab isActive={mainPaneTab===tabCode}>
                <TabLink tab={tabCode} onClick={this.handleSelectMainPaneTab}>
                  <Icon isSize='small'><span className='fa fa-code' aria-hidden='true' /></Icon>
                  <span>Code</span>
                </TabLink>
              </Tab>
            </TabList>
          </Tabs>
          { mainPaneTab===tabVisualize && <Visualize initialize={this.initialize} />}
          { mainPaneTab===tabCode && <Code/>}
        </Column>
      </Columns>
    );
  }
}

export default connect((store)=>{
  return {
    architectureType: store.architecture.type,
    layers: store.architecture.layers
  };
})(Architecture);
