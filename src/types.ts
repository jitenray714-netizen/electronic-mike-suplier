export interface ProductVariant {
  id: string;
  name: string;
  priceAdjustment: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  variants?: ProductVariant[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
}

export interface User {
  username: string;
  isAdmin?: boolean;
}
