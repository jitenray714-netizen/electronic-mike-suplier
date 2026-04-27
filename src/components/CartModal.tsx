import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    if (user) {
      navigate('/checkout');
    } else {
      navigate('/login?redirect=checkout');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md transform transition ease-in-out duration-300">
          <div className="h-full flex flex-col bg-zinc-950 border-l border-emerald-900 shadow-xl shadow-emerald-500/10">
            {/* Header */}
            <div className="px-4 py-6 sm:px-6 border-b border-emerald-900 flex items-start justify-between">
              <h2 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                <ShoppingBag size={24} />
                Your Cart
              </h2>
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-emerald-400 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 px-4 py-6 sm:px-6 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-4">
                  <ShoppingBag size={64} className="opacity-20" />
                  <p>Your cart is empty.</p>
                  <button 
                    onClick={() => { onClose(); navigate('/products'); }}
                    className="text-emerald-400 underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-zinc-900 rounded-lg border border-emerald-900/30 object-cover">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded shadow-sm shadow-emerald-900/50"
                      />
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-emerald-50">{item.name}</h3>
                          <p className="text-sm font-bold text-emerald-400">₹{item.price}</p>
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm pt-2">
                          <div className="flex items-center gap-3 bg-zinc-950 px-2 py-1 rounded border border-emerald-900">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-zinc-400 hover:text-emerald-400"><Minus size={14}/></button>
                            <span className="text-zinc-200 w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-zinc-400 hover:text-emerald-400"><Plus size={14}/></button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300 text-xs font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-emerald-900 px-4 py-6 sm:px-6 bg-zinc-950">
                <div className="flex justify-between text-base font-bold text-emerald-50 mb-6">
                  <p>Subtotal</p>
                  <p className="text-emerald-400">₹{total.toFixed(2)}</p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-sm shadow-sm text-base font-medium text-zinc-950 bg-emerald-500 hover:bg-emerald-400 uppercase tracking-wider transition-colors"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
