import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import 'src/assets/bulma-extensions.min.css';
import './app.css';

import AppNavBar from "src/components/navbar/navbar";
import ChooseTemplate from 'src/components/template/chooseTemplate'
import About from 'src/components/about/about'
import ProtoNN from "src/components/protonn/architecture";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AppNavBar/>
          <Switch>
            <Route exact path="/" component={ChooseTemplate}/>
            <Route path="/prototyping" component={ProtoNN}/>
            <Route path="/about" component={About}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
