import { useState, useEffect, useCallback } from 'react';
import type React from 'react';
import { Container } from 'react-bootstrap';

import type { Product, Category, CartItem } from '~/types';
import { mockProducts, mockCategories, simulateApiDelay } from '~/data/mock';
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      const product = featuredProducts.find((p) => p.id === productId);
      if (!product) return prev;
      return [...prev, { product, quantity: 1 }];
    });
  }, [featuredProducts]);

  const handleUpdateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const handleRemoveItem = useCallback((productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <div className="homepage">
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onSearchSubmit={handleSearch}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
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
