import { useState, useEffect, useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Footer from '../Clientes/Footer';

import { BsFillHeartFill, BsFillCartFill } from "react-icons/bs";

import { Link, Outlet } from "react-router-dom";

import { useNavigate } from 'react-router-dom';

import firebase from '../../utils/firebaseConfig';
import { getAuth } from "firebase/auth";

const auth = getAuth();

import { AuthContext } from "../../context/AuthContext";

const LayoutTienda = () => {

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const logout = () => {
    getAuth(firebase).signOut().then(() => {
      navigate('/login');
    }).catch((error) => {
      
    });
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to={`/`} className="logo-nav-cliente">Ferreshop</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

            </Nav>
            <Nav>
              <Nav.Link as={Link} to={`/carrito`}> Carrito</Nav.Link>
              <NavDropdown title={user?.displayName} id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to={`/perfil`}>Perfil</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={`/cotizaciones`}>Cotizaciones</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={`/wishlist`}>Lista de deseos</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={`/mis_compras`}>Mis compras</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Outlet />
      
      <Footer/>
    </>
  );
}

export default LayoutTienda;