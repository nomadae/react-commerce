import type React from 'react';
import {
  Container,
  Navbar as BsNavbar,
  Nav,
  NavDropdown,
  Badge,
  Button,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { Link } from 'react-router';
import { House, Grid, Box, Person, Cart, Search } from 'react-bootstrap-icons';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  cartCount: number;
  onCartClick: () => void;
}

export function Navbar({ searchTerm, onSearchChange, onSearchSubmit, cartCount, onCartClick }: NavbarProps) {
  return (
    <BsNavbar bg="white" expand="lg" className="shadow-sm py-3" sticky="top">
      <Container>
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <Box className="text-primary me-2" size={32} />
          <span className="fw-bold fs-3 text-dark">TechStore</span>
          <Badge bg="primary" className="ms-2">.com</Badge>
        </Link>

        {/* Desktop search */}
        <Form className="d-none d-lg-flex mx-4 flex-grow-1" onSubmit={onSearchSubmit}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={onSearchChange}
              className="border-end-0"
            />
            <Button variant="primary" type="submit" aria-label="Buscar">
              <Search />
            </Button>
          </InputGroup>
        </Form>

        <div className="d-flex align-items-center gap-3">
          {/* Desktop nav links */}
          <Nav className="d-none d-lg-flex">
            <Link to="/" className="nav-link d-flex align-items-center gap-1">
              <House size={18} /> Inicio
            </Link>
            <Link to="/products" className="nav-link d-flex align-items-center gap-1">
              <Grid size={18} /> Productos
            </Link>
            <NavDropdown
              title={
                <span className="d-flex align-items-center gap-1">
                  <Box size={18} /> Categorías
                </span>
              }
              id="categories-dropdown"
            >
              <Link to="/categorias/electronica" className="dropdown-item">
                Electrónica
              </Link>
              <Link to="/categorias/moda" className="dropdown-item">
                Moda
              </Link>
              <Link to="/categorias/hogar" className="dropdown-item">
                Hogar
              </Link>
              <Link to="/categorias/deportes" className="dropdown-item">
                Deportes
              </Link>
              <NavDropdown.Divider />
              <Link to="/categorias" className="dropdown-item">
                Ver todas
              </Link>
            </NavDropdown>
          </Nav>

          {/* Mobile search */}
          <Form className="d-lg-none" onSubmit={onSearchSubmit}>
            <InputGroup size="sm">
              <Form.Control
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={onSearchChange}
              />
              <Button variant="primary" size="sm" aria-label="Buscar">
                <Search />
              </Button>
            </InputGroup>
          </Form>

          <Link
            to="/cuenta"
            className="btn btn-outline-primary btn-sm d-none d-md-inline"
          >
            <Person className="me-1" /> Mi Cuenta
          </Link>

          <button
            type="button"
            onClick={onCartClick}
            className="btn btn-primary position-relative"
            aria-label={`Carrito con ${cartCount} productos`}
          >
            <Cart size={20} />
            {cartCount > 0 && (
              <Badge
                bg="danger"
                className="position-absolute top-0 start-100 translate-middle rounded-pill"
                style={{ fontSize: '0.7rem' }}
              >
                {cartCount}
              </Badge>
            )}
          </button>

          <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        </div>
      </Container>

      {/* Mobile collapse menu */}
      <BsNavbar.Collapse id="basic-navbar-nav" className="bg-white px-3 py-2 collapse-mobile-only">
        <Nav className="flex-column w-100">
          <Link to="/" className="nav-link py-2 border-bottom">Inicio</Link>
          <Link to="/products" className="nav-link py-2 border-bottom">Productos</Link>
          <Link to="/categorias" className="nav-link py-2 border-bottom">Categorías</Link>
          <Link to="/cuenta" className="nav-link py-2">Mi Cuenta</Link>
        </Nav>
      </BsNavbar.Collapse>
    </BsNavbar>
  );
}
