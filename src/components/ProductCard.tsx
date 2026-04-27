import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-zinc-900 rounded-lg overflow-hidden border border-emerald-900/30 group hover:border-emerald-500/50 transition-colors"
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-zinc-800 xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 relative">
        <h3 className="text-lg font-bold text-emerald-50 font-sans tracking-tight mb-1 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-zinc-400 font-sans line-clamp-2 mb-4 h-10">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-mono text-emerald-400 font-bold">₹{product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 text-emerald-50 p-2 rounded transition-all"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
