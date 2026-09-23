import { Star, StarFill } from 'react-bootstrap-icons';

export function renderRating(rating: number) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <span key={i} className="inline-flex items-center">
          <StarFill className="text-amber-400" size={16} />
        </span>,
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <span key={i} className="relative inline-flex items-center">
          <Star className="text-gray-300" size={16} />
          <span className="absolute left-0 top-0 w-1/2 overflow-hidden">
            <StarFill className="text-amber-400" size={16} />
          </span>
        </span>,
      );
    } else {
      stars.push(
        <span key={i} className="inline-flex items-center">
          <Star className="text-gray-300" size={16} />
        </span>,
      );
    }
  }
  return <span className="inline-flex items-center">{stars}</span>;
}
