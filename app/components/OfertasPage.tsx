import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Cart, ArrowLeft, Grid as GridIcon } from 'react-bootstrap-icons';
import { mockProducts, simulateApiDelay } from '~/data/mock';
import type { Product } from '~/types';
import { useCart } from '~/context/CartContext';
import { ErrorAlert } from './ErrorAlert';
import { renderRating } from '~/utils/rating';

export function OfertasPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart, openCart } = useCart();

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        const all = await simulateApiDelay(mockProducts);
        if (cancelled) return;
        setProducts(
          all
            .filter((p) => p.discount > 0)
            .sort((a, b) => b.discount - a.discount)
        );
      } catch {
        if (cancelled) return;
        setError('Error al cargar las ofertas. Por favor intenta de nuevo.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    openCart();
  };

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link to="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-gray-900">Ofertas</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <GridIcon className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Ofertas</h1>
              <p className="text-gray-500 mt-1">
                Productos con descuento, ordenados por mayor ahorro.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <Cart size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No hay ofertas disponibles por ahora</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <ArrowLeft size={18} /> Ver todos los productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <Link to={`/products/${product.id}`} className="relative block">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.discount}%
                  </span>
                </Link>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                    <Link to={`/products/${product.id}`} className="hover:text-blue-600 transition-colors">
                      {product.name}
                    </Link>
                  </h3>

                  <div className="flex items-center gap-1 mb-2">
                    {renderRating(product.rating, 14)}
                    <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      <Cart size={16} /> Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
