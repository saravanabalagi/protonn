import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import 'bulma-extensions/src/sass/index.sass'
import './app.css';

import AppNavbar from '../navbar/navbar'
import ChooseTemplate from '../template/chooseTemplate'
import About from '../about/about'
import BuildNN from "../buildnn/buildnn";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AppNavbar/>
          <Switch>
            <Route exact path="/" component={ChooseTemplate}/>
            <Route path="/build" component={BuildNN}/>
            <Route path="/about" component={About}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
