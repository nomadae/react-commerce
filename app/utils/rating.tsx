import { Star, StarFill } from 'react-bootstrap-icons';

export function renderRating(rating: number) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <span key={i} className="star-item">
          <StarFill className="text-warning" size={16} />
        </span>,
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <span key={i} className="half-star">
          <Star className="text-muted" size={16} />
          <span className="star-overflow">
            <StarFill className="text-warning" size={16} />
          </span>
        </span>,
      );
    } else {
      stars.push(
        <span key={i} className="star-item">
          <Star className="text-muted" size={16} />
        </span>,
      );
    }
  }
  return <span className="d-inline-flex align-items-center">{stars}</span>;
}
