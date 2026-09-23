import { Link } from 'react-router';
import { Grid as GridIcon } from 'react-bootstrap-icons';
import type { Category } from '~/types';

interface CategoriesPageProps {
  categories: Category[];
  /** True while this route's loader is in flight during a client navigation. */
  isPending: boolean;
}

export function CategoriesPage({ categories, isPending }: CategoriesPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link to="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-gray-900">Categorías</span>
          </nav>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <GridIcon className="text-blue-600" size={28} />
              Todas las Categorías
            </h1>
            <p className="text-gray-500 mt-1">
              {categories.length} categorías disponibles
            </p>
          </div>
        </div>
      </div>

      {/* Loading */}
      {isPending && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            role="status"
            aria-label="Cargando categorías"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category grid */}
      {!isPending && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categorias/${category.slug}`}
                className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100 group-hover:ring-4 group-hover:ring-blue-100 transition-all">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.count} productos
                </p>
              </Link>
            ))}
          </div>

          {/* All products link */}
          <div className="text-center mt-12 pb-8">
            <p className="text-gray-500 mb-4">¿Prefieres ver todo junto?</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver todos los productos
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
