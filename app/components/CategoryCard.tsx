import { useNavigate } from 'react-router';
import { Card } from 'react-bootstrap';
import type { Category } from '~/types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="h-100 text-center category-card border-0 shadow-sm"
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/categorias/${category.id}`)}
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
        <Card.Text className="text-muted small">{category.count} productos</Card.Text>
      </Card.Body>
    </Card>
  );
}
