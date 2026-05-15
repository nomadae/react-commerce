import { Link } from 'react-router';
import { Container, Row, Col, Carousel } from 'react-bootstrap';

export function HeroCarousel() {
  return (
    <Carousel className="hero-carousel" fade>
      <Carousel.Item>
        <div className="hero-slide bg-primary text-white py-5">
          <Container className="py-5">
            <Row className="align-items-center">
              <Col lg={6} className="text-center text-lg-start">
                <h1 className="display-4 fw-bold mb-4">Tecnología al Alcance</h1>
                <p className="lead mb-4">
                  Descubre lo último en electrónica y gadgets con los mejores precios del mercado.
                </p>
                <Link to="/products" className="btn btn-light btn-lg me-3 btn-ripple">
                  Comprar Ahora
                </Link>
                <Link to="/ofertas" className="btn btn-outline-light btn-lg btn-ripple">
                  Ver Ofertas
                </Link>
              </Col>
              <Col lg={6} className="d-none d-lg-block">
                <img
                  src="https://via.placeholder.com/600x400?text=Tech"
                  alt="Tecnología"
                  className="img-fluid rounded"
                />
              </Col>
            </Row>
          </Container>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="hero-slide bg-success text-white py-5">
          <Container className="py-5">
            <Row className="align-items-center">
              <Col lg={6} className="text-center text-lg-start">
                <h1 className="display-4 fw-bold mb-4">Hasta 40% OFF</h1>
                <p className="lead mb-4">
                  Ofertas exclusivas en productos seleccionados. ¡No te las pierdas!
                </p>
                <Link to="/ofertas" className="btn btn-light btn-lg btn-ripple">
                  Ver Ofertas
                </Link>
              </Col>
              <Col lg={6} className="d-none d-lg-block">
                <img
                  src="https://via.placeholder.com/600x400?text=Ofertas"
                  alt="Ofertas"
                  className="img-fluid rounded"
                />
              </Col>
            </Row>
          </Container>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}
