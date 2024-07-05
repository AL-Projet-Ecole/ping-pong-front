import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { logout } from '../../../models/AuthModel';
import {jwtDecode} from 'jwt-decode'; // Correction de l'import de jwtDecode
import theme from '../../../assets/themes/theme';

function Header() {
    let role = null;

    // Vérifier si le token existe
    const token = sessionStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
        role = decodedToken.role_user;
    }

    // Fonction pour déterminer si un lien doit être affiché en fonction du rôle
    const isLinkVisible = (linkRole) => {
        if (role === 0) {
            return true;
        }
        if (role === linkRole) {
            return true;
        }
        return false;
    };

    return (
        <Navbar expand="lg p-2" fixed="top">
            <Navbar.Brand>Ping Pong</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto" navbarScroll>
                    {role !== null && isLinkVisible(1) && <Nav.Link as={Link} to="/HubAtelier">Atelier</Nav.Link>}
                    {role !== null && isLinkVisible(2) && <Nav.Link as={Link} to="/HubCommercial">Commercial</Nav.Link>}
                    {role !== null && isLinkVisible(0) && <Nav.Link as={Link} to="/Admin">Admin</Nav.Link>}
                </Nav>
                <div className="d-flex align-items-center">
                    {role !== null ? (
                        <>
                            <div style={{ width: '10px' }}></div>
                            <Button onClick={() => logout()}>Déconnexion</Button>
                        </>
                    ) : (
                        <Nav.Link as={Link} to="/Login">Connexion</Nav.Link>
                    )}
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
