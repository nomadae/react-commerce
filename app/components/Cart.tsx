import { useEffect, useRef } from 'react';
import { X, Trash, Dash, Plus } from 'react-bootstrap-icons';
import type { CartItem } from '~/types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      panelRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out panel */}
      <div
        ref={panelRef}
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Carrito ({itemCount})
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Cerrar carrito"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              <p className="text-lg font-medium">Tu carrito está vacío</p>
              <p className="text-sm mt-1">¡Agrega productos para empezar!</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4 py-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm font-semibold text-blue-600 mt-1">
                      ${item.product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        aria-label="Reducir cantidad"
                      >
                        <Dash size={16} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-gray-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors disabled:opacity-30"
                        aria-label="Aumentar cantidad"
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="ml-auto p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label={`Eliminar ${item.product.name}`}
                      >
                        <Trash size={15} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-gray-900">Total</span>
              <span className="text-xl font-bold text-gray-900">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Ir a Pagar
            </button>
          </div>
        )}
      </div>
    </>
  );
}
