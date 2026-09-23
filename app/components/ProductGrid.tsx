import { Link } from 'react-router';
import type { Product } from '~/types';
import { ProductCard } from './ProductCard';
import { ProductGridSkeleton } from './ProductGridSkeleton';

interface ProductGridProps {
  products: Product[];
  isPending: boolean;
  onAddToCart: (productId: number) => void;
}

export function ProductGrid({ products, isPending, onAddToCart }: ProductGridProps) {
  return (
    <div className="bg-gray-50 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-3xl font-bold text-gray-900">Productos Destacados</h2>
          <Link to="/products" className="text-blue-600 hover:text-blue-700 font-medium">
            Ver todos &rarr;
          </Link>
        </div>

        {isPending ? (
          <ProductGridSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
