import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { StarFill, Star, Cart, ArrowLeft, Grid as GridIcon, Funnel } from 'react-bootstrap-icons';
import { mockProducts, simulateApiDelay } from '~/data/mock';
import type { Product } from '~/types';
import { useCart } from '~/context/CartContext';
import { ErrorAlert } from './ErrorAlert';

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'name';

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

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [sortBy, setSortBy] = useState<SortKey>('default');
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await simulateApiDelay(mockProducts, 500);
        setProducts(data);
      } catch {
        setError('Error al cargar los productos. Intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['Todos', ...new Set(mockProducts.map((p) => p.category))];

  const filtered = products
    .filter((p) => activeCategory === 'Todos' || p.category === activeCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

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
            <span className="text-gray-900">Productos</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <GridIcon className="text-blue-600" size={28} />
                Todos los Productos
              </h1>
              <p className="text-gray-500 mt-1">
                {filtered.length} producto{filtered.length !== 1 ? 's' : ''} disponible{filtered.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap flex-1">
            <Funnel size={16} className="text-gray-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-sm text-gray-500 hidden sm:inline">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="default">Más relevantes</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="rating">Mejor valorados</option>
              <option value="name">Nombre A-Z</option>
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-500">Cargando productos...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 text-gray-300">
              <Cart size={64} className="mx-auto opacity-50" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-400 mb-6">
              Intenta con otra categoría o elimina los filtros.
            </p>
            <button
              onClick={() => setActiveCategory('Todos')}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft size={18} /> Mostrar todos los productos
            </button>
          </div>
        )}

        {/* Product grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => {
              const justAdded = addedIds.has(product.id);
              const inStock = product.stock > 0;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
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

                  {/* Content */}
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
