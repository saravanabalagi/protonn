import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarDivider,
  NavbarDropdown,
  NavbarEnd,
  NavbarItem,
  NavbarLink,
  NavbarMenu,
  NavbarStart
} from "bloomer";
import logo from '../../assets/logo.svg';

class AppNavBar extends Component {
  render() {
    return (
      <Navbar>
        <NavbarBrand>
          <NavbarItem href='/'>
            <img src={logo} style={{ marginRight: 5 }} />
            <div style={{ marginRight: 30 }}>Protonn</div>
          </NavbarItem>
        </NavbarBrand>
        <NavbarMenu>
          <NavbarStart>
            <NavbarItem href='/'>Donate</NavbarItem>
          </NavbarStart>
          <NavbarEnd>
            <NavbarItem hasDropdown isHoverable>
              <NavbarLink>Export</NavbarLink>
              <NavbarDropdown>
                <NavbarItem href='/export'>Code</NavbarItem>
                <NavbarDivider />
                <NavbarItem href='/'>SVG</NavbarItem>
              </NavbarDropdown>
            </NavbarItem>
          </NavbarEnd>
        </NavbarMenu>
      </Navbar>
    );
  }
}

export default AppNavBar
