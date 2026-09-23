import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { House, Grid, Box, Person, Cart, Search, List as ListIcon, X } from 'react-bootstrap-icons';
import { useCart } from '~/context/CartContext';
import { useAuth } from '~/context/AuthContext';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export function Navbar({ searchTerm, onSearchChange, onSearchSubmit }: NavbarProps) {
  const { itemCount, openCart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMobileOpen(false);
    navigate('/', { replace: true });
  };

  return (
    <header className="bg-white shadow-sm sticky-top z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3">
          {/* Brand */}
          <Link to="/" className="flex items-center shrink-0">
            <Box size={32} className="text-blue-600 mr-2" />
            <span className="font-bold text-xl text-gray-900">TechStore</span>
            <span className="ml-1 bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">.com</span>
          </Link>

          {/* Desktop search */}
          <form onSubmit={onSearchSubmit} className="hidden lg:flex flex-1 mx-4 max-w-xl">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={onSearchChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button type="submit" aria-label="Buscar" className="px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors">
                <Search />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-3 ml-auto">
            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link to="/" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                <House size={18} /> Inicio
              </Link>
              <Link to="/products" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                <Grid size={18} /> Productos
              </Link>

              {/* Categories dropdown */}
              <div className="relative group">
                <button type="button" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  <Box size={18} /> Categorías
                  <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="hidden group-hover:block absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  <Link to="/categorias/electronica" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Electrónica</Link>
                  <Link to="/categorias/computadoras" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Computadoras</Link>
                  <Link to="/categorias/audio" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Audio</Link>
                  <Link to="/categorias/wearables" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Wearables</Link>
                  <Link to="/categorias/fotografia" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Fotografía</Link>
                  <div className="my-1 border-t border-gray-100" />
                  <Link to="/categorias" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Ver todas</Link>
                </div>
              </div>
            </nav>

          {/* Mobile search */}
          <form onSubmit={onSearchSubmit} className="lg:hidden">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={onSearchChange}
                className="w-32 sm:w-48 px-3 py-1.5 border border-gray-300 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button type="submit" aria-label="Buscar" className="px-3 py-1.5 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
                <Search />
              </button>
            </div>
          </form>

          {/* Desktop account: user dropdown or login button */}
          {isAuthenticated && user ? (
            <div className="relative group hidden md:block">
              <button type="button" className="flex items-center gap-2 py-1.5">
                <img
                  src={user.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4f46e5&color=fff&size=64`}
                  alt={user.name}
                  className="rounded-full w-7 h-7 object-cover"
                />
                <span className="hidden sm:inline text-gray-800 text-sm">{user.name.split(' ')[0]}</span>
              </button>
              <div className="hidden group-hover:block absolute right-0 mt-1 w-60 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="font-semibold text-gray-900 text-sm">{user.name}</div>
                  <div className="text-gray-500 text-xs">{user.email}</div>
                </div>
                <Link to="/cuenta" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Person size={16} /> Mi Cuenta
                </Link>
                <div className="my-1 border-t border-gray-100" />
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  Cerrar Sesión
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:inline-flex items-center gap-1 px-3 py-2 border border-blue-600 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Person className="mr-1" /> Iniciar Sesión
            </Link>
          )}

          {/* Cart button */}
          <button
            type="button"
            onClick={openCart}
            className="relative p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            aria-label={`Carrito con ${itemCount} productos`}
          >
            <Cart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600"
            aria-label="Menú"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <ListIcon size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile collapse menu */}
      {mobileOpen && (
        <nav className="lg:hidden bg-white border-t border-gray-100">
          <Link to="/" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 border-b border-gray-100 text-gray-700 hover:bg-gray-50">Inicio</Link>
          <Link to="/products" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 border-b border-gray-100 text-gray-700 hover:bg-gray-50">Productos</Link>
          <Link to="/categorias" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 border-b border-gray-100 text-gray-700 hover:bg-gray-50">Categorías</Link>
          {isAuthenticated ? (
            <>
              <Link to="/cuenta" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 border-b border-gray-100 text-gray-700 hover:bg-gray-50">Mi Cuenta</Link>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50">
              Iniciar Sesión
            </Link>
          )}
        </nav>
      )}
      </div>
    </header>
  );
}
