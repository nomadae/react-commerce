import { Link } from 'react-router';
import type { Category } from '~/types';
import { CategoryCard } from './CategoryCard';

interface CategoryGridProps {
  categories: Category[];
  isPending: boolean;
}

export function CategoryGrid({ categories, isPending }: CategoryGridProps) {
  if (isPending) {
    return (
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        role="status"
        aria-label="Cargando categorías"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-200" />
            <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      <div className="text-center mt-4">
        <Link
          to="/categorias"
          className="inline-block px-5 py-2.5 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
        >
          Ver todas las categorías
        </Link>
      </div>
    </>
  );
}
