import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>       
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="https://via.placeholder.com/40" 
            alt="Logo"
            className="d-inline-block align-top me-2"
          />
          <span>Libriando</span>
        </Navbar.Brand>

        <Nav className="ms-auto align-items-center">
          <Nav.Link as={Link} to="/" className="me-3">Home</Nav.Link>
          <Nav.Link as={Link} to="/BestSeller" className="me-3">BestSeller</Nav.Link>
          <Nav.Link as={Link} to="/Novedades" className="me-3">Novedades</Nav.Link>

          <div className="d-flex align-items-center">
            <Button variant="outline-light" as={Link} to="/administracion" className="me-2">
              Administración
            </Button>
            <Link to="/carrito" className="text-white">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </Link>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;