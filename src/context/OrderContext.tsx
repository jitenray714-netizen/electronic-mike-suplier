import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order } from '../types';
import { useAuth } from './AuthContext';

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  getUserOrders: () => Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('shop_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('shop_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const getUserOrders = () => {
    if (!user) return [];
    return orders.filter(o => o.userId === user.username);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getUserOrders, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within an OrderProvider');
  return context;
};
