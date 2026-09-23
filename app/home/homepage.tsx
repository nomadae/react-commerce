import { useState, useEffect, useCallback } from 'react';

import type { Product, Category } from '~/types';
import { mockProducts, mockCategories, simulateApiDelay } from '~/data/mock';
import { useCart } from '~/context/CartContext';
import { HeroCarousel } from '~/components/HeroCarousel';
import { CategoryGrid } from '~/components/CategoryGrid';
import { ProductGrid } from '~/components/ProductGrid';
import { Benefits } from '~/components/Benefits';
import { Newsletter } from '~/components/Newsletter';
import { ErrorAlert } from '~/components/ErrorAlert';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cart = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [products, cats] = await Promise.all([
          simulateApiDelay(mockProducts),
          simulateApiDelay(mockCategories),
        ]);
        setFeaturedProducts(products);
        setCategories(cats);
      } catch {
        setError('Error al cargar los datos. Por favor intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = useCallback((productId: number) => {
    const product = featuredProducts.find((p) => p.id === productId);
    if (product) {
      cart.addToCart(product);
    }
  }, [featuredProducts, cart]);

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <main>
      <HeroCarousel />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <h2 className="text-center mb-5 text-3xl font-bold">Categorías Destacadas</h2>
        <CategoryGrid categories={categories} loading={loading} />
      </div>

      <ProductGrid products={featuredProducts} loading={loading} onAddToCart={handleAddToCart} />

      <Benefits />
      <Newsletter />
    </main>
  );
};

export default HomePage;
