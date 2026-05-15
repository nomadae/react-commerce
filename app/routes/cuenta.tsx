import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '~/context/AuthContext';
import { Box, Envelope, Person } from 'react-bootstrap-icons';

export default function CuentaPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login?redirect=/cuenta', { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const providerLabel = user.provider === 'google' ? 'Google' : 'Email';
  const providerColor = user.provider === 'google' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link to="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-gray-900">Mi Cuenta</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Mi Cuenta</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={user.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4f46e5&color=fff&size=128`}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-gray-100"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500 mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                <Envelope size={14} /> {user.email}
              </p>
              <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${providerColor}`}>
                {providerLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Account info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Person size={20} className="text-blue-600" />
            Información Personal
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <dt className="text-xs text-gray-400 uppercase tracking-wider">Nombre</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">{user.name}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400 uppercase tracking-wider">Correo</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">{user.email}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400 uppercase tracking-wider">Proveedor</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">{providerLabel}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400 uppercase tracking-wider">ID de Usuario</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1 font-mono">{user.id}</dd>
            </div>
          </dl>
        </div>

        {/* Orders placeholder */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Box size={20} className="text-blue-600" />
            Pedidos Recientes
          </h3>
          <div className="text-center py-8">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Box size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No tienes pedidos recientes</p>
            <p className="text-sm text-gray-400 mt-1">Tus compras aparecerán aquí.</p>
            <Link
              to="/products"
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explorar productos
            </Link>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-3 border border-red-300 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-colors text-sm"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
