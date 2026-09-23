import { useCallback } from 'react';
import type { Product, Category } from '~/types';
import { useCart } from '~/context/CartContext';
import { HeroCarousel } from '~/components/HeroCarousel';
import { CategoryGrid } from '~/components/CategoryGrid';
import { ProductGrid } from '~/components/ProductGrid';
import { Benefits } from '~/components/Benefits';
import { Newsletter } from '~/components/Newsletter';

interface HomePageProps {
  products: Product[];
  categories: Category[];
  /** True while this route's loader is in flight during a client navigation. */
  isPending: boolean;
}

const HomePage = ({ products, categories, isPending }: HomePageProps) => {
  const cart = useCart();

  const handleAddToCart = useCallback((productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      cart.addToCart(product);
    }
  }, [products, cart]);

  return (
    <main>
      <HeroCarousel />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <h2 className="text-center mb-5 text-3xl font-bold">Categorías Destacadas</h2>
        <CategoryGrid categories={categories} isPending={isPending} />
      </div>

      <ProductGrid products={products} isPending={isPending} onAddToCart={handleAddToCart} />

      <Benefits />
      <Newsletter />
    </main>
  );
};

export default HomePage;
