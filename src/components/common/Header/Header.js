import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, Button, NavDropdown } from 'react-bootstrap';
import theme from '../../../assets/themes/theme';

function Header({ darkMode, toggleTheme, tradMode, toggleTrad }) {
  const [scroll, setScroll] = useState(false);
  const [dataTrad, setdataTrad] = useState({});

  useEffect(() => {
    if (tradMode === 'fr') {
      setdataTrad({
        home: "Accueil",
        search : "Recherche",
        light : "Mode Clair",
        dark : "Mode Sombre"
      })
    } else {
      setdataTrad({
        home: "Home",
        search : "Search",
        light : "Light Mode",
        dark : "Dark Mode"
      })
    }
  }, [tradMode]);

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
      <Navbar.Brand style={navBarCT} as={Link} to="/">Aizen Work</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto" navbarScroll>
          <Nav.Link style={navBarCT} as={Link} to="/">{dataTrad.home}</Nav.Link>
          <Nav.Link style={navBarCT} as={Link} to="/Blog">Blog</Nav.Link>
          <NavDropdown style={navBarCT} title="Licences" id="navbarScrollingDropdown">
            <NavDropdown.Item href="#idLiscence">One Piece</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form className="d-flex me-2">
          <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
          <Button variant={darkMode ? 'light' : 'dark'}>{dataTrad.search}</Button>
        </Form>
        <Button onClick={toggleTheme} variant={darkMode ? 'light' : 'dark'}>
          {darkMode ? dataTrad.light : dataTrad.dark}
        </Button>
        <Button onClick={toggleTrad} variant={darkMode ? 'light' : 'dark'}>
          {tradMode === "en" ? 'en' : 'fr'}
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
