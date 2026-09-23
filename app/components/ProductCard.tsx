import { Link } from 'react-router';
import type { Product } from '~/types';
import { renderRating } from '~/utils/rating';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden h-full hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <Link to={`/products/${product.id}`} className="relative block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            -{product.discount}%
          </span>
        )}
        {product.stock > 0 && product.stock < 10 && (
          <span className="absolute top-2 right-2 bg-amber-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            Últimas {product.stock}
          </span>
        )}
      </Link>

      <div className="p-3 flex flex-col flex-1">
        <div className="mb-2">
          <span className="inline-block bg-gray-100 text-gray-600 text-xs uppercase tracking-wider px-2 py-0.5 rounded-full">
            {product.category}
          </span>
        </div>

        <Link to={`/products/${product.id}`} className="text-gray-900 no-underline">
          <h3 className="text-sm font-bold mb-2 text-gray-900 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="mr-1">{renderRating(product.rating)}</div>
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>

        <div className="mb-3 mt-auto">
          {product.discount > 0 ? (
            <>
              <span className="text-lg font-bold text-blue-600 mr-2">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</span>
          )}
        </div>

        <button
          type="button"
          className="w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onAddToCart(product.id)}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
        </button>
      </div>
    </div>
  );
}
