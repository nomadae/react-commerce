import { Truck, Shield, ArrowRepeat, Headset } from 'react-bootstrap-icons';

export function Benefits() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center">
          <Truck size={48} className="text-blue-600 mb-3 inline-block" />
          <h5 className="font-bold text-gray-900">Envío Gratis</h5>
          <p className="text-gray-500 text-sm">En compras sobre $50.000</p>
        </div>
        <div className="text-center">
          <Shield size={48} className="text-blue-600 mb-3 inline-block" />
          <h5 className="font-bold text-gray-900">Pago Seguro</h5>
          <p className="text-gray-500 text-sm">Tus datos protegidos</p>
        </div>
        <div className="text-center">
          <ArrowRepeat size={48} className="text-blue-600 mb-3 inline-block" />
          <h5 className="font-bold text-gray-900">30 Días de Cambio</h5>
          <p className="text-gray-500 text-sm">Devolución sin costo</p>
        </div>
        <div className="text-center">
          <Headset size={48} className="text-blue-600 mb-3 inline-block" />
          <h5 className="font-bold text-gray-900">Soporte 24/7</h5>
          <p className="text-gray-500 text-sm">Ayuda en línea siempre</p>
        </div>
      </div>
    </div>
  );
}
