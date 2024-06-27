import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import {logout} from '../../../models/AuthModel';
import theme from '../../../assets/themes/theme';

function Header() {


  return (
      <Navbar expand="lg p-2" fixed="top">
        <Navbar.Brand>Ping Pong</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto" navbarScroll>
            <Nav.Link as={Link} to="/HubAtelier">Atelier</Nav.Link>
            <Nav.Link as={Link} to="/Commercial">Commercial</Nav.Link>
            <Nav.Link as={Link} to="/Admin">Admin</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center">
            <div style={{ width: '10px' }}></div>
            <Button onClick={() => logout()}>Déconnexion</Button>
          </div>
        </Navbar.Collapse>
      </Navbar>
  );
}

export default Header;
