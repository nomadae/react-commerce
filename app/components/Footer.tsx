import { Link } from 'react-router';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Box, GeoAlt, Telephone, Envelope } from 'react-bootstrap-icons';

export function Footer() {
  return (
    <footer className="bg-dark text-white-50 py-5">
      <Container>
        <Row xs={1} md={2} lg={4} className="g-4">
          <Col>
            <div className="d-flex align-items-center mb-3">
              <Box className="text-primary me-2" size={24} />
              <span className="fw-bold fs-4 text-white">TechStore</span>
            </div>
            <p className="small">
              Tu tienda de tecnología de confianza. Los mejores productos al mejor precio.
            </p>
            <div className="d-flex gap-3">
              <Button variant="link" className="text-white-50 p-0">
                <img src="https://via.placeholder.com/24?text=f" alt="Facebook" />
              </Button>
              <Button variant="link" className="text-white-50 p-0">
                <img src="https://via.placeholder.com/24?text=t" alt="Twitter" />
              </Button>
              <Button variant="link" className="text-white-50 p-0">
                <img src="https://via.placeholder.com/24?text=i" alt="Instagram" />
              </Button>
            </div>
          </Col>

          <Col>
            <h5 className="text-white mb-3">Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/sobre-nosotros" className="nav-link text-white-50 p-0">
                  Sobre Nosotros
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contacto" className="nav-link text-white-50 p-0">
                  Contacto
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/faq" className="nav-link text-white-50 p-0">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/terminos" className="nav-link text-white-50 p-0">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </Col>

          <Col>
            <h5 className="text-white mb-3">Categorías</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/categorias/electronica" className="nav-link text-white-50 p-0">
                  Electrónica
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/categorias/computadoras" className="nav-link text-white-50 p-0">
                  Computadoras
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/categorias/audio" className="nav-link text-white-50 p-0">
                  Audio
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/categorias/accesorios" className="nav-link text-white-50 p-0">
                  Accesorios
                </Link>
              </li>
            </ul>
          </Col>

          <Col>
            <h5 className="text-white mb-3">Contacto</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center gap-2">
                <GeoAlt size={16} />
                <span>Av. Principal 123, Santiago, Chile</span>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <Telephone size={16} />
                <span>+56 2 2345 6789</span>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <Envelope size={16} />
                <span>contacto@techstore.com</span>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4 bg-secondary" />

        <Row>
          <Col className="text-center">
            <p className="small mb-0">
              &copy; {new Date().getFullYear()} TechStore. Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
