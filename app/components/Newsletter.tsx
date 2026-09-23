export function Newsletter() {
  return (
    <div className="bg-blue-600 text-white py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex justify-center">
          <div className="text-center max-w-xl">
            <h3 className="font-bold text-2xl mb-3">¡No te pierdas nuestras ofertas!</h3>
            <p className="mb-4">
              Suscríbete y recibe las mejores promociones directamente en tu correo
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Suscribirme
              </button>
            </form>
            <p className="text-white/70 text-xs mt-3">
              Al suscribirte aceptas nuestra política de privacidad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
