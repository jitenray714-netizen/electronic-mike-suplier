import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-emerald-900 pt-12 pb-8 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold text-emerald-400 tracking-tighter uppercase mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-zinc-950 px-2 py-1 rounded-sm text-sm">EM</span>
              Electronic Mike Suplier
            </h2>
            <p className="text-sm max-w-sm">
              Your one-stop destination for premium audio equipment, microphones, and electronics. Best quality at affordable prices.
            </p>
          </div>
          
          <div>
            <h3 className="text-emerald-50 font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-emerald-400">Home</Link></li>
              <li><Link to="/products" className="hover:text-emerald-400">Shop Products</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400">Contact</Link></li>
              <li><Link to="/admin" className="hover:text-emerald-400 font-bold text-emerald-500">Admin Panel</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-emerald-50 font-bold mb-4 uppercase tracking-wider text-sm">Contact Details</h3>
            <ul className="space-y-2 text-sm">
              <li>TOWN: GOLAKGANJ BAZAR</li>
              <li>DISTRICT: DHUBRI</li>
              <li>STATE: ASSAM</li>
              <li>Phone: +91 9957201721, +91 8638173157, +91 6002726641</li>
              <li>Email: jitenray714@gmail.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-emerald-900/50 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} Electronic Mike Suplier. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="#" className="hover:text-emerald-400">Privacy Policy</Link>
            <Link to="#" className="hover:text-emerald-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
