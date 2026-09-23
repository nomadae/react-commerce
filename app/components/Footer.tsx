import { Link } from 'react-router';
import { Box, GeoAlt, Telephone, Envelope } from 'react-bootstrap-icons';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="flex items-center mb-3">
              <Box size={24} className="text-blue-500 mr-2" />
              <span className="font-bold text-xl text-white">TechStore</span>
            </div>
            <p className="text-sm">
              Tu tienda de tecnología de confianza. Los mejores productos al mejor precio.
            </p>
            <div className="flex gap-3 mt-3">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white">
                <img src="https://via.placeholder.com/24?text=f" alt="Facebook" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white">
                <img src="https://via.placeholder.com/24?text=t" alt="Twitter" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white">
                <img src="https://via.placeholder.com/24?text=i" alt="Instagram" />
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-white mb-3 font-semibold">Enlaces Rápidos</h5>
            <ul className="space-y-2 list-none p-0">
              <li>
                <Link to="/sobre-nosotros" className="text-gray-400 hover:text-white hover:underline no-underline">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-400 hover:text-white hover:underline no-underline">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white hover:underline no-underline">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="text-gray-400 hover:text-white hover:underline no-underline">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white mb-3 font-semibold">Categorías</h5>
            <ul className="space-y-2 list-none p-0">
              <li>
                <Link to="/categorias/electronica" className="text-gray-400 hover:text-white hover:underline no-underline">
                  Electrónica
                </Link>
              </li>
              <li>
                <Link to="/categorias/computadoras" className="text-gray-400 hover:text-white hover:underline no-underline">
                  Computadoras
                </Link>
              </li>
              <li>
                <Link to="/categorias/audio" className="text-gray-400 hover:text-white hover:underline no-underline">
                  Audio
                </Link>
              </li>
              <li>
                <Link to="/categorias/accesorios" className="text-gray-400 hover:text-white hover:underline no-underline">
                  Accesorios
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white mb-3 font-semibold">Contacto</h5>
            <ul className="space-y-2 list-none p-0">
              <li className="flex items-center gap-2">
                <GeoAlt size={16} />
                <span className="text-sm">Av. Principal 123, Santiago, Chile</span>
              </li>
              <li className="flex items-center gap-2">
                <Telephone size={16} />
                <span className="text-sm">+56 2 2345 6789</span>
              </li>
              <li className="flex items-center gap-2">
                <Envelope size={16} />
                <span className="text-sm">contacto@techstore.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4 border-gray-700" />

        <div className="text-center">
          <p className="text-sm mb-0">
            &copy; {new Date().getFullYear()} TechStore. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
