import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Box, Truck, ShieldCheck, ArrowLeft } from 'react-bootstrap-icons';
import { mockProducts, simulateApiDelay } from '~/data/mock';
import type { Product } from '~/types';
import { useCart } from '~/context/CartContext';
import { ErrorAlert } from './ErrorAlert';
import { renderRating } from '~/utils/rating';

interface ProductDetailProps {
  productId: number;
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const { addToCart, openCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const products = await simulateApiDelay(mockProducts, 400);
        const found = products.find((p) => p.id === productId);
        if (!found) {
          setError('Producto no encontrado');
        } else {
          setProduct(found);
        }
      } catch {
        setError('Error al cargar el producto. Intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, quantity);
    openCart();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ErrorAlert message={error || 'Producto no encontrado'} />
        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft size={18} /> Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  const inStock = product.stock > 0;
  const lowStock = product.stock > 0 && product.stock < 10;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link
              to="/products"
              className="hover:text-blue-600 transition-colors"
            >
              Productos
            </Link>
            <span>/</span>
            <span className="text-gray-900 truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-6"
        >
          <ArrowLeft size={18} /> Volver a productos
        </Link>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative bg-gray-100 p-8 lg:p-12 flex items-center justify-center">
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{product.discount}%
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-md h-auto object-contain rounded-lg"
              />
            </div>

            {/* Product info */}
            <div className="p-6 lg:p-10 flex flex-col">
              {/* Category */}
              <span className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full w-fit mb-4">
                {product.category}
              </span>

              {/* Name */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-0.5">
                  {renderRating(product.rating, 18)}
                </span>
                <span className="text-sm text-gray-500">
                  {product.rating} ({product.reviews} reseñas)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      Ahorras ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              {/* Stock status */}
              <div className="mb-6">
                {inStock ? (
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        lowStock ? 'bg-amber-400' : 'bg-green-500'
                      }`}
                    />
                    <span className={`text-sm font-medium ${lowStock ? 'text-amber-600' : 'text-green-600'}`}>
                      {lowStock
                        ? `¡Solo quedan ${product.stock}!`
                        : 'En stock'}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="text-sm font-medium text-red-600">Agotado</span>
                  </div>
                )}
              </div>

              {/* Quantity selector */}
              {inStock && (
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-sm font-medium text-gray-700">Cantidad:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors rounded-l-lg"
                      aria-label="Reducir cantidad"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 text-sm font-medium text-gray-900 border-x border-gray-300 min-w-[44px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors rounded-r-lg"
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold text-sm transition-all ${
                    addedFeedback
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {addedFeedback ? '¡Agregado!' : 'Añadir al Carrito'}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={!inStock}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold text-sm bg-gray-900 text-white hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Comprar Ahora
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl mt-auto">
                <div className="flex items-center gap-3">
                  <Truck size={20} className="text-blue-600 flex-shrink-0" />
                  <span className="text-xs text-gray-600">Envío gratis</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={20} className="text-blue-600 flex-shrink-0" />
                  <span className="text-xs text-gray-600">Garantía de 1 año</span>
                </div>
                <div className="flex items-center gap-3">
                  <Box size={20} className="text-blue-600 flex-shrink-0" />
                  <span className="text-xs text-gray-600">Devolución gratuita</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description section */}
        <div className="bg-white rounded-2xl shadow-sm mt-8 p-6 lg:p-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Descripción del Producto</h2>
          <p className="text-gray-600 leading-relaxed">
            El {product.name} es la elección perfecta para quienes buscan calidad y rendimiento.
            Con una calificación de {product.rating} estrellas basada en {product.reviews} reseñas,
            este producto de la categoría {product.category} te ofrece la mejor relación calidad-precio.
          </p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              Diseño premium y materiales de alta calidad
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              Rendimiento excepcional para uso diario
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              Incluye todos los accesorios necesarios
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              Soporte técnico 24/7 incluido
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
