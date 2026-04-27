import React from 'react';
import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Orders() {
  const { user } = useAuth();
  const { getUserOrders } = useOrder();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const orders = getUserOrders();

  return (
    <div className="bg-zinc-950 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-8">Order History</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900 border border-emerald-900/30 rounded-lg">
            <p className="text-zinc-400 text-lg">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-zinc-900 border border-emerald-900/30 rounded-lg p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-emerald-900/50 pb-4 mb-4 gap-4">
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">Order ID: {order.id}</p>
                    <p className="text-sm font-medium text-emerald-50">
                      Placed on: {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-lg font-bold text-emerald-400">₹{order.total.toFixed(2)}</p>
                    <span className="inline-block mt-1 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20 capitalize">
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Items</h4>
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-zinc-950 p-3 rounded border border-zinc-800">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded opacity-80" />
                        <div>
                          <p className="text-sm font-medium text-zinc-300">{item.name}</p>
                          <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-zinc-300">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
