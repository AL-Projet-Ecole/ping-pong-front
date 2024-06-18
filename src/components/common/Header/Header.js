import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import theme from '../../../assets/themes/theme';

function Header({ darkMode, toggleTheme, tradMode, toggleTrad }) {
  const [scroll, setScroll] = useState(false);

  // Fonction pour mettre à jour l'état de scroll
  const changeNavBackground = () => {
    if (window.scrollY >= 50) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }

  // Ajout des écouteurs d'événements pour détecter le scroll
  useEffect(() => {
    window.addEventListener('scroll', changeNavBackground);
    return () => window.removeEventListener('scroll', changeNavBackground);
  }, []);

  // Styles de la barre de navigation en fonction de l'état de scroll
  const navBarBG = {
    backgroundColor: scroll ? (darkMode ? theme.dark.background : theme.light.background) : 'transparent',
    transition: '0.4s'
  };
  const navBarCT = { color: darkMode ? theme.dark.text : theme.light.text };

  return (
    <Navbar style={navBarBG} expand="lg p-2" fixed="top">
      <Navbar.Brand style={navBarCT} as={Link} to="/">Ping Pong</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto" navbarScroll>
          <Nav.Link style={navBarCT} as={Link} to="/Atelier">Atelier</Nav.Link>
          <Nav.Link style={navBarCT} as={Link} to="/Commercial">Commercial</Nav.Link>
          <Nav.Link style={navBarCT} as={Link} to="/xxx">Admin</Nav.Link>
        </Nav>
        <Button onClick={toggleTheme} variant={darkMode ? 'light' : 'dark'}>
          {darkMode ? "Mode Clair" : "Mode Sombre"}
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
