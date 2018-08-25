import React, { Component } from 'react';

import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import './app.css';

import AppNavbar from '../navbar/navbar'
import ChooseTemplate from '../chooseTemplate/chooseTemplate'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar/>
        <div style={{ paddingTop: 80}}/>
        <ChooseTemplate/>
      </div>
    );
  }
}

export default App;
