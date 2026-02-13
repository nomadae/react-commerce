import React, { useState, useEffect } from 'react';

import {
  Container, 
  Navbar, 
  Nav, 
  NavDropdown,
  Button,
  Row,
  Col,
  Card,
  Carousel,
  Badge,
  Form,
  InputGroup,
  Spinner,
  Alert
} from 'react-bootstrap';
import { 
  House, 
  Grid, 
  Box, 
  Person, 
  Cart, 
  Search, 
  Star, 
  StarFill,
  GeoAlt,
  Telephone,
  Envelope,
  Truck,
  Shield,
  ArrowRepeat
} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './homepage.css'

interface Product {
    id: number, 
    name: string, 
    price: number,
    originalPrice: number,
    discount: number,
    rating: number,
    reviews: number,
    image: string,
    category: string,
    stock: number
}

interface Categories {
    id: number, 
    name: string, 
    count: number,
    image: string
}

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Simular carga de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simular llamada API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Datos de ejemplo
        setFeaturedProducts([
          { 
            id: 1, 
            name: 'Laptop Gamer Pro', 
            price: 899.99, 
            originalPrice: 1599.99,
            discount: 20,
            rating: 4.8,
            reviews: 156,
            image: 'https://via.placeholder.com/300x200?text=Laptop',
            category: 'Electrónica',
            stock: 15
          },
          { 
            id: 2, 
            name: 'Smartphone Ultra', 
            price: 899.99, 
            originalPrice: 999.99,
            discount: 10,
            rating: 4.6,
            reviews: 243,
            image: 'https://via.placeholder.com/300x200?text=Smartphone',
            category: 'Electrónica',
            stock: 8
          },
          { 
            id: 3, 
            name: 'Auriculares Bluetooth', 
            price: 79.99, 
            originalPrice: 129.99,
            discount: 38,
            rating: 4.5,
            reviews: 567,
            image: 'https://via.placeholder.com/300x200?text=Headphones',
            category: 'Audio',
            stock: 25
          },
          { 
            id: 4, 
            name: 'Smart Watch Series 5', 
            price: 249.99, 
            originalPrice: 329.99,
            discount: 24,
            rating: 4.7,
            reviews: 189,     
            image: 'https://via.placeholder.com/300x200?text=Watch',
            category: 'Wearables',
            stock: 12
          },
          { 
            id: 5, 
            name: 'Tablet Pro 12.9"', 
            price: 699.99, 
            originalPrice: 799.99,
            discount: 12,
            rating: 4.9,
            reviews: 98,
            image: 'https://via.placeholder.com/300x200?text=Tablet',
            category: 'Electrónica',
            stock: 5
          },
          { 
            id: 6, 
            name: 'Cámara Mirrorless', 
            price: 899.99, 
            originalPrice: 1099.99,
            discount: 18,
            rating: 4.7,
            reviews: 76,
            image: 'https://via.placeholder.com/300x200?text=Camera',
            category: 'Fotografía',
            stock: 7
          }
        ]);

        setCategories([
          { id: 1, name: 'Electrónica', count: 245, image: 'https://via.placeholder.com/150x150?text=Electronica' },
          { id: 2, name: 'Moda', count: 567, image: 'https://via.placeholder.com/150x150?text=Moda' },
          { id: 3, name: 'Hogar', count: 389, image: 'https://via.placeholder.com/150x150?text=Hogar' },
          { id: 4, name: 'Deportes', count: 178, image: 'https://via.placeholder.com/150x150?text=Deportes' },
          { id: 5, name: 'Libros', count: 423, image: 'https://via.placeholder.com/150x150?text=Libros' },
          { id: 6, name: 'Juguetes', count: 156, image: 'https://via.placeholder.com/150x150?text=Juguetes' }
        ]);

        setCartCount(3);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos. Por favor intenta de nuevo.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log('Buscando:', searchTerm);
    // Aquí iría la lógica de búsqueda
  };

  const handleAddToCart = (productId: any) => {
    console.log('Añadiendo al carrito:', productId);
    setCartCount(prev => prev + 1);
    // Aquí iría la lógica para añadir al carrito
  };

  // Renderizar estrellas de rating
  const renderRating = (rating: any) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarFill key={i} className="text-warning" size={16} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="text-warning half-star" size={16} />);
      } else {
        stars.push(<Star key={i} className="text-muted" size={16} />);
      }
    }
    return stars;
  };

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => window.location.reload()}>
            Reintentar
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="homepage">
      {/* Header/Navbar */}
      <Navbar bg="white" expand="lg" className="shadow-sm py-3" sticky="top">
        <Container>
          {/* Logo y nombre de la tienda */}
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <Box className="text-primary me-2" size={32} />
            <span className="fw-bold fs-3 text-dark">TechStore</span>
            <Badge bg="primary" className="ms-2">.com</Badge>
          </Navbar.Brand>

          {/* Barra de búsqueda - visible en desktop */}
          <Form className="d-none d-lg-flex mx-4 flex-grow-1" onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-end-0"
              />
              <Button variant="primary" type="submit">
                <Search />
              </Button>
            </InputGroup>
          </Form>

          {/* Botones de navegación y carrito */}
          <div className="d-flex align-items-center gap-3">
            {/* Navegación principal */}
            <Nav className="me-auto d-none d-lg-flex">
              <Nav.Link href="/" className="d-flex align-items-center gap-1">
                <House size={18} /> Inicio
              </Nav.Link>
              <Nav.Link href="/products" className="d-flex align-items-center gap-1">
                <Grid size={18} /> Productos
              </Nav.Link>
              <NavDropdown 
                title={
                  <span className="d-flex align-items-center gap-1">
                    <Box size={18} /> Categorías
                  </span>
                }
                id="categories-dropdown"
              >
                <NavDropdown.Item href="/categorias/electronica">Electrónica</NavDropdown.Item>
                <NavDropdown.Item href="/categorias/moda">Moda</NavDropdown.Item>
                <NavDropdown.Item href="/categorias/hogar">Hogar</NavDropdown.Item>
                <NavDropdown.Item href="/categorias/deportes">Deportes</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/categorias">Ver todas</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* Barra de búsqueda móvil */}
            <Form className="d-lg-none" onSubmit={handleSearch}>
              <InputGroup size="sm">
                <Form.Control
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="primary" size="sm">
                  <Search />
                </Button>
              </InputGroup>
            </Form>

            {/* Iconos de usuario y carrito */}
            <Button variant="outline-primary" size="sm" className="d-none d-md-inline">
              <Person className="me-1" /> Mi Cuenta
            </Button>
            
            <Button variant="primary" className="position-relative">
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
            </Button>

            {/* Botón menú móvil */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>
        </Container>
        
        {/* Menú colapsable móvil */}
        <Navbar.Collapse id="basic-navbar-nav" className="bg-white px-3 py-2">
          <Nav className="flex-column w-100">
            <Nav.Link href="/" className="py-2 border-bottom">Inicio</Nav.Link>
            <Nav.Link href="/products" className="py-2 border-bottom">Productos</Nav.Link>
            <Nav.Link href="/categorias" className="py-2 border-bottom">Categorías</Nav.Link>
            <Nav.Link href="/cuenta" className="py-2">Mi Cuenta</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Contenido principal */}
      <main>
        {/* Hero Carousel */}
        <Carousel className="hero-carousel" fade>
          <Carousel.Item>
            <div className="hero-slide bg-primary text-white py-5">
              <Container className="py-5">
                <Row className="align-items-center">
                  <Col lg={6} className="text-center text-lg-start">
                    <h1 className="display-4 fw-bold mb-4">Tecnología al Alcance</h1>
                    <p className="lead mb-4">Descubre lo último en electrónica y gadgets con los mejores precios del mercado.</p>
                    <Button variant="light" size="lg" href="/products" className="me-3">
                      Comprar Ahora
                    </Button>
                    <Button variant="outline-light" size="lg" href="/ofertas">
                      Ver Ofertas
                    </Button>
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
                    <p className="lead mb-4">Ofertas exclusivas en productos seleccionados. ¡No te las pierdas!</p>
                    <Button variant="light" size="lg" href="/ofertas">
                      Ver Ofertas
                    </Button>
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

        {/* Categorías destacadas */}
        <Container className="py-5">
          <h2 className="text-center mb-5 display-6 fw-bold">Categorías Destacadas</h2>
          
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Cargando categorías...</p>
            </div>
          ) : (
            <Row xs={2} md={3} lg={6} className="g-4">
              {categories.map(category => (
                <Col key={category.id}>
                  <Card 
                    className="h-100 text-center category-card border-0 shadow-sm"
                    style={{ cursor: 'pointer' }}
                    onClick={() => window.location.href = `/categorias/${category.id}`}
                  >
                    <Card.Body>
                      <div className="category-image mb-3">
                        <img 
                          src={category.image} 
                          alt={category.name}
                          className="img-fluid rounded-circle"
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                      </div>
                      <Card.Title className="h6 fw-bold">{category.name}</Card.Title>
                      <Card.Text className="text-muted small">
                        {category.count} productos
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          <div className="text-center mt-4">
            <Button variant="outline-primary" href="/categorias" size="lg">
              Ver todas las categorías
            </Button>
          </div>
        </Container>

        {/* Productos destacados */}
        <Container fluid className="bg-light py-5">
          <Container>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h2 className="display-6 fw-bold">Productos Destacados</h2>
              <Button variant="link" href="/products" className="text-decoration-none">
                Ver todos →
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3 text-muted">Cargando productos...</p>
              </div>
            ) : (
              <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {featuredProducts.map(product => (
                  <Col key={product.id}>
                    <Card className="h-100 product-card shadow-sm">
                      <div className="position-relative">
                        <Card.Img 
                          variant="top" 
                          src={product.image} 
                          alt={product.name}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                        {product.discount > 0 && (
                          <Badge 
                            bg="danger" 
                            className="position-absolute top-0 start-0 m-2"
                          >
                            -{product.discount}%
                          </Badge>
                        )}
                        {product.stock < 10 && (
                          <Badge 
                            bg="warning" 
                            className="position-absolute top-0 end-0 m-2"
                          >
                            Últimas {product.stock}
                          </Badge>
                        )}
                      </div>
                      
                      <Card.Body>
                        <div className="mb-2">
                          <Badge bg="secondary" className="text-uppercase small">
                            {product.category}
                          </Badge>
                        </div>
                        
                        <Card.Title className="h6 fw-bold mb-2">
                          {product.name}
                        </Card.Title>
                        
                        <div className="d-flex align-items-center mb-2">
                          <div className="me-2">
                            {renderRating(product.rating)}
                          </div>
                          <span className="text-muted small">
                            ({product.reviews})
                          </span>
                        </div>
                        
                        <div className="mb-3">
                          {product.discount > 0 ? (
                            <>
                              <span className="h5 fw-bold text-primary me-2">
                                ${product.price.toFixed(2)}
                              </span>
                              <span className="text-muted text-decoration-line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="h5 fw-bold text-primary">
                              ${product.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                        
                        <Button 
                          variant="primary" 
                          className="w-100"
                          onClick={() => handleAddToCart(product.id)}
                          disabled={product.stock === 0}
                        >
                          {product.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        </Container>

        {/* Beneficios */}
        <Container className="py-5">
          <Row xs={1} md={2} lg={4} className="g-4">
            <Col>
              <div className="text-center">
                <Truck size={48} className="text-primary mb-3" />
                <h5 className="fw-bold">Envío Gratis</h5>
                <p className="text-muted">En compras sobre $50.000</p>
              </div>
            </Col>
            <Col>
              <div className="text-center">
                <Shield size={48} className="text-primary mb-3" />
                <h5 className="fw-bold">Pago Seguro</h5>
                <p className="text-muted">Tus datos protegidos</p>
              </div>
            </Col>
            <Col>
              <div className="text-center">
                <ArrowRepeat size={48} className="text-primary mb-3" />
                <h5 className="fw-bold">30 Días de Cambio</h5>
                <p className="text-muted">Devolución sin costo</p>
              </div>
            </Col>
            <Col>
              <div className="text-center">
                <h5 className="fw-bold">Soporte 24/7</h5>
                <p className="text-muted">Ayuda en línea siempre</p>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Newsletter */}
        <Container fluid className="bg-primary text-white py-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} className="text-center">
                <h3 className="fw-bold mb-3">¡No te pierdas nuestras ofertas!</h3>
                <p className="mb-4">
                  Suscríbete y recibe las mejores promociones directamente en tu correo
                </p>
                <Form className="d-flex gap-2">
                  <Form.Control
                    type="email"
                    placeholder="Tu correo electrónico"
                    size="lg"
                    className="flex-grow-1"
                  />
                  <Button variant="light" size="lg" type="submit">
                    Suscribirme
                  </Button>
                </Form>
                <Form.Text className="text-white-50 mt-3 d-block">
                  Al suscribirte aceptas nuestra política de privacidad
                </Form.Text>
              </Col>
            </Row>
          </Container>
        </Container>
      </main>

      {/* Footer */}
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
                  <Nav.Link href="/sobre-nosotros" className="text-white-50 p-0">Sobre Nosotros</Nav.Link>
                </li>
                <li className="mb-2">
                  <Nav.Link href="/contacto" className="text-white-50 p-0">Contacto</Nav.Link>
                </li>
                <li className="mb-2">
                  <Nav.Link href="/faq" className="text-white-50 p-0">Preguntas Frecuentes</Nav.Link>
                </li>
                <li className="mb-2">
                  <Nav.Link href="/terminos" className="text-white-50 p-0">Términos y Condiciones</Nav.Link>
                </li>
              </ul>
            </Col>
            
            <Col>
              <h5 className="text-white mb-3">Categorías</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Nav.Link href="/categorias/electronica" className="text-white-50 p-0">Electrónica</Nav.Link>
                </li>
                <li className="mb-2">
                  <Nav.Link href="/categorias/computadoras" className="text-white-50 p-0">Computadoras</Nav.Link>
                </li>
                <li className="mb-2">
                  <Nav.Link href="/categorias/audio" className="text-white-50 p-0">Audio</Nav.Link>
                </li>
                <li className="mb-2">
                  <Nav.Link href="/categorias/accesorios" className="text-white-50 p-0">Accesorios</Nav.Link>
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
                © {new Date().getFullYear()} TechStore. Todos los derechos reservados.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

// Componente Headset para los iconos (porque no está en react-bootstrap-icons)
// const Headset = ({ size, className }) => (
//   <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     width={size} 
//     height={size} 
//     fill="currentColor" 
//     className={className} 
//     viewBox="0 0 16 16"
//   >
//     <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z"/>
//   </svg>
// );

export default HomePage;