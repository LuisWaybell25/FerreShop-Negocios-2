import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Footer from '../Clientes/Footer';

import { BsFillHeartFill, BsFillCartFill } from "react-icons/bs";

import { Link, Outlet } from "react-router-dom";

import { useNavigate } from 'react-router-dom';

const LayoutTienda = () => {

  const navigate = useNavigate();

  const logout = () => {
      navigate("/login");
      localStorage.setItem('isLogged', false);
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
              <NavDropdown title="Luis Waybell" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to={`/perfil`}>Perfil</NavDropdown.Item>
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