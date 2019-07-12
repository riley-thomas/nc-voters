import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Config from '../Config';

class Menu extends Component {

  render() {
    return (
      <div className='d-print-none'>
        <Navbar className="fixed-top navbar navbar-dark bg-primary" expand="md">
          <div className="nc-logo"></div>
          <NavbarBrand href={Config.app_home} className="mr-auto">{Config.app_title}</NavbarBrand>
        </Navbar>
      </div>
    );
  }

}

export default Menu;