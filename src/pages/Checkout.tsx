import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrder();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'upi'>('whatsapp');
  const [upiId, setUpiId] = useState('');

  if (!user) {
    navigate('/login?redirect=checkout');
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-zinc-400">Your cart is empty. <a href="/products" className="text-emerald-400 underline">Go shopping</a></p>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add to orders in context/localstorage
    addOrder({
      userId: user.username,
      items: items,
      total: total,
      status: 'pending'
    });

    // Formatting message for WhatsApp
    const orderDetails = items.map(item => `${item.quantity}x ${item.name} (₹${item.price})`).join('%0A');
    const message = `Hello! I want to place an order:%0A%0A${orderDetails}%0A%0ATotal: ₹${total.toFixed(2)}`;
    
    if (paymentMethod === 'whatsapp') {
      window.open(`https://wa.me/919957201721?text=${message}`, '_blank');
    } else if (paymentMethod === 'upi') {
      // Very basic UPI link simulation
      const upiLink = `upi://pay?pa=shop@upi&pn=ElectronicMike&am=${total}&cu=INR&tn=Order Payment`;
      window.open(upiLink, '_blank');
    }

    clearCart();
    navigate('/orders');
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-50 mb-8">Checkout</h1>
        
        <div className="bg-zinc-900 border border-emerald-900/30 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-emerald-400 mb-4">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-zinc-300">{item.quantity}x {item.name}</span>
                <span className="text-zinc-50">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-emerald-900/50 pt-4 flex justify-between text-lg font-bold">
            <span className="text-white">Total</span>
            <span className="text-emerald-400">₹{total.toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="bg-zinc-900 border border-emerald-900/30 rounded-lg p-6">
          <h2 className="text-xl font-bold text-emerald-400 mb-6">Payment Method</h2>
          
          <div className="space-y-4 mb-8">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="radio" 
                name="payment" 
                value="whatsapp"
                checked={paymentMethod === 'whatsapp'}
                onChange={() => setPaymentMethod('whatsapp')}
                className="text-emerald-500 focus:ring-emerald-500 bg-zinc-950 border-zinc-800"
              />
              <span className="text-zinc-300">Order via WhatsApp</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="radio" 
                name="payment" 
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
                className="text-emerald-500 focus:ring-emerald-500 bg-zinc-950 border-zinc-800"
              />
              <span className="text-zinc-300">Pay via UPI Deep Link</span>
            </label>
          </div>

          {paymentMethod === 'upi' && (
            <div className="mb-8">
              <label className="block text-sm font-medium text-zinc-400 mb-2">Your UPI ID (Optional)</label>
              <input 
                type="text" 
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="example@upi"
                className="w-full bg-zinc-950 border border-zinc-800 rounded p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-emerald-500 text-zinc-950 font-bold py-4 rounded hover:bg-emerald-400 transition-colors"
          >
            Place Order & Pay
          </button>
        </form>
      </div>
    </div>
  );
}
