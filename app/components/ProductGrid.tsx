import { Link } from 'react-router';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import type { Product } from '~/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onAddToCart: (productId: number) => void;
}

export function ProductGrid({ products, loading, onAddToCart }: ProductGridProps) {
  return (
    <Container fluid className="bg-light py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="display-6 fw-bold">Productos Destacados</h2>
          <Link to="/products" className="btn btn-link text-decoration-none">
            Ver todos &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 text-muted">Cargando productos...</p>
          </div>
        ) : (
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {products.map((product) => (
              <Col key={product.id}>
                <ProductCard product={product} onAddToCart={onAddToCart} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </Container>
  );
}
