import React from 'react';
import { Link } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Mic, Speaker, Headphones } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const { products } = useProduct();
  const featuredProducts = products.slice(0, 3); // Get first 3 for featured

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-zinc-950 pt-16 pb-32 border-b border-emerald-900/50">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/40 via-zinc-950 to-zinc-950"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left md:flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-1/2 space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                Audio Experience
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-lg mx-auto md:mx-0">
              Best Quality Audio Equipment at Affordable Prices. Discover premium microphones, speakers, and gear for creators and pros.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/products" className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-8 py-4 rounded shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2">
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="bg-zinc-900 border border-emerald-900/50 hover:border-emerald-500 text-emerald-50 font-medium px-8 py-4 rounded transition-all text-center">
                Learn More
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block md:w-1/2 relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80" 
              alt="Premium Microphone" 
              className="rounded-lg shadow-2xl shadow-emerald-900/50 border border-emerald-900/30 rotate-2 hover:rotate-0 transition-transform duration-500"
            />
            {/* Floating badges */}
            <div className="absolute -top-6 -left-6 bg-zinc-900 border border-emerald-500/30 p-4 rounded-lg shadow-xl shadow-black/50 animate-bounce">
              <Mic className="text-emerald-400 mb-2" size={24} />
              <p className="text-xs font-bold text-emerald-50">Pro Mics</p>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-zinc-900 border border-emerald-500/30 p-4 rounded-lg shadow-xl shadow-black/50 animate-bounce" style={{ animationDelay: '1s' }}>
              <Speaker className="text-emerald-400 mb-2" size={24} />
              <p className="text-xs font-bold text-emerald-50">Loud Speakers</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Featured Gear</h2>
              <p className="text-zinc-400">Our top picks for your setup.</p>
            </div>
            <Link to="/products" className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 group">
              View all <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories snippet */}
      <section className="py-24 bg-zinc-900 border-t border-emerald-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-16">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Mic, name: 'Microphones', desc: 'Studio & Live sound' },
              { icon: Speaker, name: 'Speakers', desc: 'Monitors & PA systems' },
              { icon: Headphones, name: 'Headphones', desc: 'Monitoring & Listening' },
            ].map((cat, i) => (
              <div key={i} className="bg-zinc-950 border border-emerald-900/30 p-8 rounded-lg hover:border-emerald-500 transition-colors group cursor-pointer">
                <cat.icon size={48} className="mx-auto text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
                <p className="text-zinc-400">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
