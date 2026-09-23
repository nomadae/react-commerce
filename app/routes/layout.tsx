import { useState } from 'react';
import type React from 'react';
import { Outlet } from 'react-router';
import { Navbar } from '~/components/Navbar';
import { Cart } from '~/components/Cart';
import { Footer } from '~/components/Footer';
import { useCart } from '~/context/CartContext';

/**
 * Application shell. The Navbar and the cart drawer live here rather than in a
 * page component so that they survive client-side navigation between routes.
 *
 * They used to be rendered by the homepage only, which meant every other route
 * (/products, /categorias, /ofertas, /login, /cuenta) had no header at all, and
 * ProductDetail's "Comprar Ahora" called openCart() on a page where no drawer
 * was mounted to render it.
 */
export default function Layout() {
  const cart = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  // Search is not wired to a products query yet; the form is prevented from
  // doing a native GET so submitting it does not reload the document.
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onSearchSubmit={handleSearchSubmit}
      />

      <Cart
        isOpen={cart.isOpen}
        onClose={cart.closeCart}
        items={cart.items}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeItem}
      />

      <Outlet />

      <Footer />
    </>
  );
}
