import React, { Component } from 'react';
import logo from './assets/logo.svg';
import 'bulma/css/bulma.css';
import './App.css';

import {
  NavbarStart,
  NavbarItem,
  NavbarDropdown,
  NavbarEnd,
  Navbar, NavbarLink, NavbarDivider, NavbarBrand, NavbarMenu
} from 'bloomer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar>
          <NavbarBrand>
            <NavbarItem href='#/'>
              <img src={logo} style={{ marginRight: 5 }} />
              <div style={{ marginRight: 30 }}>Protonn</div>
            </NavbarItem>
          </NavbarBrand>
          <NavbarMenu>
            <NavbarStart>
              <NavbarItem href='#/'>Donate</NavbarItem>
            </NavbarStart>
            <NavbarEnd>
              <NavbarItem hasDropdown isHoverable>
                <NavbarLink href='#/documentation'>Export</NavbarLink>
                <NavbarDropdown>
                  <NavbarItem href='#/'>Code</NavbarItem>
                  <NavbarDivider />
                  <NavbarItem href='#/'>SVG</NavbarItem>
                </NavbarDropdown>
              </NavbarItem>
            </NavbarEnd>
          </NavbarMenu>
        </Navbar>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
