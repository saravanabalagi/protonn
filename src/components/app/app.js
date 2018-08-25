import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import './app.css';

import AppNavbar from '../navbar/navbar'
import ChooseTemplate from '../chooseTemplate/chooseTemplate'
import Architecture from "../architecture/architecture";
import About from '../about/about'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AppNavbar/>
          <Switch>
            <Route exact path="/" component={ChooseTemplate}/>
            <Route path="/build" component={Architecture}/>
            <Route path="/about" component={About}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
