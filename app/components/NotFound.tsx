import { Link } from 'react-router';
import { ArrowLeft } from 'react-bootstrap-icons';

interface NotFoundProps {
  /** Page-specific heading, e.g. "Producto no encontrado". */
  message: string;
  /** Optional explanation shown under the heading. */
  description?: string;
}

const DEFAULT_DESCRIPTION =
  'Puede que el enlace esté roto o que el producto ya no esté disponible.';

/**
 * In-page "not found" state for a catalog route whose loader found nothing.
 *
 * Rendered by the route component rather than thrown as a 404 Response, so the
 * layout's Navbar and Footer stay on screen - a thrown response replaces the
 * entire route tree that contains it, chrome included.
 */
export function NotFound({ message, description = DEFAULT_DESCRIPTION }: NotFoundProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-6xl font-bold text-gray-200 mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{message}</h1>
        <p className="text-gray-500 mb-8">{description}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver todos los productos
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft size={18} /> Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
