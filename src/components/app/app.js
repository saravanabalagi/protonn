import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import './app.css';

import AppNavbar from '../navbar/navbar'
import ChooseTemplate from '../chooseTemplate/chooseTemplate'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar/>
        <ChooseTemplate/>
      </div>
    );
  }
}

export default App;
