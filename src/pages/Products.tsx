import React from 'react';
import { Link } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { ProductCard } from '../components/ProductCard';
import { PlusCircle } from 'lucide-react';

export default function Products() {
  const { products } = useProduct();
  const { user } = useAuth();

  return (
    <div className="bg-zinc-950 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left mb-16 gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter text-white mb-4">All Products</h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto md:mx-0">
              Browse our complete catalog of professional audio equipment. From entry-level gear to studio-grade hardware.
            </p>
          </div>
          {user?.isAdmin && (
            <Link 
              to="/admin" 
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-6 py-3 rounded shadow-lg shadow-emerald-500/20 transition-all whitespace-nowrap"
            >
              <PlusCircle size={20} />
              Add Product Option
            </Link>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900 rounded-lg border border-zinc-800">
            <p className="text-zinc-500 text-lg">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
