import { Link } from 'react-router';

export function HeroCarousel() {
  return (
    <div className="relative overflow-hidden">
      <div className="bg-blue-600 text-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl font-bold mb-4">Tecnología al Alcance</h1>
              <p className="text-lg mb-6">
                Descubre lo último en electrónica y gadgets con los mejores precios del mercado.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="inline-block px-5 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Comprar Ahora
                </Link>
                <Link
                  to="/ofertas"
                  className="inline-block px-5 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  Ver Ofertas
                </Link>
              </div>
            </div>
            <div className="hidden lg:block flex-1">
              <img
                src="https://via.placeholder.com/600x400?text=Tech"
                alt="Tecnología"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
