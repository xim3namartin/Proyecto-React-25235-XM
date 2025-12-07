import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBook } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from './CartContext';




const Header = () => {

  const { carrito } = useContext(CartContext);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "BestSeller", path: "/BestSeller" },
    { name: "Novedades", path: "/Novedades" },
  ];

  return (
    <Navbar
      expand="lg"
      className="shadow-sm py-3"
      style={{
        background: "linear-gradient(90deg, #d48c8c, #b85c5c)",
        color: "#fff",
        transition: "background 0.3s ease",
      }}
    >
      <Container>
        {/* Logo + Marca */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center fw-bold fs-4"
          style={{ color: "#2e2a27", textDecoration: "none" }}
        >
          {/* <img
            src="https://via.placeholder.com/40"
            alt="Logo"
            className="d-inline-block align-top me-2 rounded-circle border border-dark"
          />
          Libriando*/}
          <FontAwesomeIcon
            icon={faBook}
            size="2x"
            className="me-2"
            style={{ color: "#2e2a27" }}
          />
          Libriando

        </Navbar.Brand>

        {/* Toggle responsive */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {navLinks.map((link) => (
              <Nav.Link
                key={link.path}
                as={Link}
                to={link.path}
                className="mx-2 fw-semibold"
                style={{
                  color: "#2e2a27",
                  position: "relative",
                  transition: "color 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffdede"; // texto hover
                  e.currentTarget.querySelector(".underline").style.width = "100%";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#2e2a27"; // color original
                  e.currentTarget.querySelector(".underline").style.width = "0";
                }}
              >
                {link.name}
                <span
                  className="underline"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    height: "2px",
                    width: "0",
                    backgroundColor: "#ffdede",
                    transition: "width 0.3s ease",
                    borderRadius: "1px",
                  }}
                />
              </Nav.Link>
            ))}

            {/* Botón de administración y carrito */}
            <div className="d-flex align-items-center ms-3">
              <Button
                variant="outline-dark"
                as={Link}
                to="/administracion"
                className="me-2 px-3 fw-semibold"
                style={{ borderRadius: "20px" }}
              >
                Administración
              </Button>

              <Link
                to="/carrito"
                className="position-relative"
                style={{ color: "#2e2a27", textDecoration: "none" }}
              >
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                {totalItems > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-10px",
                      backgroundColor: "#fff",
                      color: "#b85c5c",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>

            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

