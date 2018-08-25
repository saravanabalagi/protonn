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
      <Navbar className='is-fixed-top'>
        <NavbarBrand>
          <NavbarItem href='/'>
            <img src={logo} style={{ marginRight: 5 }} />
            <div style={{ marginRight: 30 }}>Protonn</div>
          </NavbarItem>
        </NavbarBrand>
        <NavbarMenu>
          <NavbarStart>
            <NavbarItem href='/about'>About</NavbarItem>
            <NavbarItem href='/'>Donate</NavbarItem>
          </NavbarStart>
          <NavbarEnd>
            <NavbarItem href='/code'>Code</NavbarItem>
            <NavbarItem hasDropdown isHoverable>
              <NavbarLink>Export</NavbarLink>
              <NavbarDropdown>
                <NavbarItem href='/'>SVG</NavbarItem>
                <NavbarItem href='/'>PNG</NavbarItem>
              </NavbarDropdown>
            </NavbarItem>
          </NavbarEnd>
        </NavbarMenu>
      </Navbar>
    );
  }
}

export default AppNavBar
