import { Link } from 'react-router';
import type { Category } from '~/types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/categorias/${category.slug}`}
      className="group flex flex-col items-center text-center bg-white border border-gray-100 rounded-xl shadow-sm h-full hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-4"
    >
      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 mb-3">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <h3 className="text-sm font-bold text-gray-900 mb-0.5">{category.name}</h3>
      <p className="text-xs text-gray-500">{category.count} productos</p>
    </Link>
  );
}
