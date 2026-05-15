import { useState, useEffect, useCallback } from 'react';
import type React from 'react';
import { Container } from 'react-bootstrap';

import type { Product, Category } from '~/types';
import { mockProducts, mockCategories, simulateApiDelay } from '~/data/mock';
import { useCart } from '~/context/CartContext';
import { Navbar } from '~/components/Navbar';
import { HeroCarousel } from '~/components/HeroCarousel';
import { CategoryGrid } from '~/components/CategoryGrid';
import { ProductGrid } from '~/components/ProductGrid';
import { Benefits } from '~/components/Benefits';
import { Newsletter } from '~/components/Newsletter';
import { Footer } from '~/components/Footer';
import { ErrorAlert } from '~/components/ErrorAlert';
import { Cart } from '~/components/Cart';

import './homepage.css';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Buscando:', searchTerm);
  };

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
    <div className="homepage">
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onSearchSubmit={handleSearch}
      />

      <Cart
        isOpen={cart.isOpen}
        onClose={cart.closeCart}
        items={cart.items}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeItem}
      />

      <main>
        <HeroCarousel />

        <Container className="py-5">
          <h2 className="text-center mb-5 display-6 fw-bold">Categorías Destacadas</h2>
          <CategoryGrid categories={categories} loading={loading} />
        </Container>

        <ProductGrid products={featuredProducts} loading={loading} onAddToCart={handleAddToCart} />

        <Benefits />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
