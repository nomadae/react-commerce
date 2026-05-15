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
import { Link, useNavigate } from 'react-router';
import { House, Grid, Box, Person, Cart, Search } from 'react-bootstrap-icons';
import { useCart } from '~/context/CartContext';
import { useAuth } from '~/context/AuthContext';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export function Navbar({ searchTerm, onSearchChange, onSearchSubmit }: NavbarProps) {
  const { itemCount, openCart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

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
              <Link to="/categorias/computadoras" className="dropdown-item">
                Computadoras
              </Link>
              <Link to="/categorias/audio" className="dropdown-item">
                Audio
              </Link>
              <Link to="/categorias/wearables" className="dropdown-item">
                Wearables
              </Link>
              <Link to="/categorias/fotografia" className="dropdown-item">
                Fotografía
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

          {/* Desktop account: user dropdown or login button */}
          {isAuthenticated && user ? (
            <NavDropdown
              title={
                <span className="d-flex align-items-center gap-2">
                  <img
                    src={user.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4f46e5&color=fff&size=64`}
                    alt={user.name}
                    className="rounded-circle"
                    width={28}
                    height={28}
                    style={{ objectFit: 'cover' }}
                  />
                  <span className="d-none d-md-inline text-dark" style={{ fontSize: '0.875rem' }}>
                    {user.name.split(' ')[0]}
                  </span>
                </span>
              }
              id="user-dropdown"
              align="end"
            >
              <div className="px-3 py-2">
                <div className="fw-semibold text-dark" style={{ fontSize: '0.875rem' }}>
                  {user.name}
                </div>
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                  {user.email}
                </div>
              </div>
              <NavDropdown.Divider />
              <Link to="/cuenta" className="dropdown-item">
                <Person size={16} className="me-2" /> Mi Cuenta
              </Link>
              <NavDropdown.Divider />
              <button
                className="dropdown-item"
                onClick={handleLogout}
                style={{ cursor: 'pointer' }}
              >
                Cerrar Sesión
              </button>
            </NavDropdown>
          ) : (
            <Link
              to="/login"
              className="btn btn-outline-primary btn-sm d-none d-md-inline"
            >
              <Person className="me-1" /> Iniciar Sesión
            </Link>
          )}

          <button
            type="button"
            onClick={openCart}
            className="btn btn-primary position-relative"
            aria-label={`Carrito con ${itemCount} productos`}
          >
            <Cart size={20} />
            {itemCount > 0 && (
              <Badge
                bg="danger"
                className="position-absolute top-0 start-100 translate-middle rounded-pill"
                style={{ fontSize: '0.7rem' }}
              >
                {itemCount}
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
          {isAuthenticated ? (
            <>
              <Link to="/cuenta" className="nav-link py-2 border-bottom">Mi Cuenta</Link>
              <button
                className="nav-link py-2 text-start w-100 border-0 bg-transparent"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link py-2">Iniciar Sesión</Link>
          )}
        </Nav>
      </BsNavbar.Collapse>
    </BsNavbar>
  );
}
