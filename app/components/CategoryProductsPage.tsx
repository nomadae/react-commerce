import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { StarFill, Star, Cart, ArrowLeft, Grid as GridIcon } from 'react-bootstrap-icons';
import { mockProducts, mockCategories, simulateApiDelay } from '~/data/mock';
import type { Product } from '~/types';
import { useCart } from '~/context/CartContext';
import { ErrorAlert } from './ErrorAlert';

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-');
}

function renderStars(rating: number) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<StarFill key={i} className="text-amber-400" size={14} />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <span key={i} className="relative inline-flex">
          <Star className="text-gray-300" size={14} />
          <span className="absolute left-0 top-0 w-1/2 overflow-hidden">
            <StarFill className="text-amber-400" size={14} />
          </span>
        </span>
      );
    } else {
      stars.push(<Star key={i} className="text-gray-300" size={14} />);
    }
  }
  return stars;
}

interface CategoryProductsPageProps {
  categorySlug: string;
}

export function CategoryProductsPage({ categorySlug }: CategoryProductsPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [allProducts, allCategories] = await Promise.all([
          simulateApiDelay(mockProducts, 400),
          simulateApiDelay(mockCategories, 300),
        ]);

        const category = allCategories.find((c) => c.slug === categorySlug);
        setCategoryName(category?.name || categorySlug);

        const filtered = allProducts.filter(
          (p) => slugify(p.category) === categorySlug
        );
        setProducts(filtered);
      } catch {
        setError('Error al cargar los productos. Intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categorySlug]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ErrorAlert message={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link to="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
            <span>/</span>
            <Link to="/categorias" className="hover:text-blue-600 transition-colors">Categorías</Link>
            <span>/</span>
            <span className="text-gray-900">{categoryName}</span>
          </nav>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <GridIcon className="text-blue-600" size={28} />
              {categoryName}
            </h1>
            <p className="text-gray-500 mt-1">
              {loading ? 'Cargando...' : `${products.length} producto${products.length !== 1 ? 's' : ''} en esta categoría`}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back link */}
        <Link
          to="/categorias"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-6"
        >
          <ArrowLeft size={18} /> Ver todas las categorías
        </Link>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-500">Cargando productos...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && products.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 text-gray-300">
              <Cart size={64} className="mx-auto opacity-50" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No hay productos en {categoryName}
            </h3>
            <p className="text-gray-400 mb-6">
              Pronto agregaremos productos en esta categoría.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/categorias"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <ArrowLeft size={18} /> Ver categorías
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                Ver todos los productos
              </Link>
            </div>
          </div>
        )}

        {/* Product grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const justAdded = addedIds.has(product.id);
              const inStock = product.stock > 0;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <Link to={`/products/${product.id}`} className="relative block bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    {product.discount > 0 && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        -{product.discount}%
                      </span>
                    )}
                    {product.stock > 0 && product.stock < 10 && (
                      <span className="absolute top-3 right-3 bg-amber-400 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        ¡{product.stock} left!
                      </span>
                    )}
                  </Link>

                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                      {product.category}
                    </span>
                    <Link
                      to={`/products/${product.id}`}
                      className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-2"
                    >
                      {product.name}
                    </Link>
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="inline-flex items-center gap-0.5">
                        {renderStars(product.rating)}
                      </span>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-4 mt-auto">
                      <span className="text-lg font-bold text-blue-600">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.discount > 0 && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!inStock}
                      className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                        justAdded
                          ? 'bg-green-500 text-white'
                          : inStock
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Cart size={16} />
                      {!inStock ? 'Agotado' : justAdded ? '¡Agregado!' : 'Añadir al Carrito'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
