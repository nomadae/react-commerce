import { Link } from 'react-router';
import { Row, Col, Spinner } from 'react-bootstrap';
import type { Category } from '~/types';
import { CategoryCard } from './CategoryCard';

interface CategoryGridProps {
  categories: Category[];
  loading: boolean;
}

export function CategoryGrid({ categories, loading }: CategoryGridProps) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Cargando categorías...</p>
      </div>
    );
  }

  return (
    <>
      <Row xs={2} md={3} lg={6} className="g-4">
        {categories.map((category) => (
          <Col key={category.id}>
            <CategoryCard category={category} />
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Link to="/categorias" className="btn btn-outline-primary btn-lg btn-ripple">
          Ver todas las categorías
        </Link>
      </div>
    </>
  );
}
