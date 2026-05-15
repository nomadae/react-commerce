import { Link } from 'react-router';
import { Card, Badge, Button } from 'react-bootstrap';
import type { Product } from '~/types';
import { renderRating } from '~/utils/rating';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="h-100 product-card shadow-sm">
      <Link to={`/products/${product.id}`} className="position-relative d-block">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        {product.discount > 0 && (
          <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
            -{product.discount}%
          </Badge>
        )}
        {product.stock < 10 && (
          <Badge bg="warning" className="position-absolute top-0 end-0 m-2">
            Últimas {product.stock}
          </Badge>
        )}
      </Link>

      <Card.Body>
        <div className="mb-2">
          <Badge bg="secondary" className="text-uppercase small">
            {product.category}
          </Badge>
        </div>

        <Link to={`/products/${product.id}`} className="text-decoration-none text-dark">
          <Card.Title className="h6 fw-bold mb-2">{product.name}</Card.Title>
        </Link>

        <div className="d-flex align-items-center mb-2">
          <div className="me-2">{renderRating(product.rating)}</div>
          <span className="text-muted small">({product.reviews})</span>
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
            <span className="h5 fw-bold text-primary">${product.price.toFixed(2)}</span>
          )}
        </div>

        <Button
          variant="primary"
          className="w-100"
          onClick={() => onAddToCart(product.id)}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
        </Button>
      </Card.Body>
    </Card>
  );
}
