import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { CartModal } from './CartModal';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  if (user) {
    navLinks.push({ name: 'Orders', path: '/orders' });
    if (user.isAdmin) {
      navLinks.push({ name: 'Admin', path: '/admin' });
    }
  }

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="bg-zinc-950 text-emerald-400 sticky top-0 z-40 border-b border-emerald-900 shadow-sm shadow-emerald-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold tracking-tighter uppercase flex items-center gap-2">
                <span className="bg-emerald-500 text-zinc-950 px-2 py-1 rounded-sm">EM</span>
                Electronic Mike Suplier
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-medium text-emerald-50 hover:text-emerald-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-6">
              {user ? (
                <div className="flex items-center space-x-4 text-sm text-emerald-50">
                  <span className="flex items-center gap-2"><UserIcon size={16} /> {user.username}</span>
                  <button onClick={handleLogout} className="hover:text-emerald-400 transition-colors" title="Logout">
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-sm font-medium bg-emerald-500 text-zinc-950 px-4 py-2 rounded shadow hover:bg-emerald-400 transition-colors">
                  Login
                </Link>
              )}
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative text-emerald-50 hover:text-emerald-400 transition-colors"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-zinc-950 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden space-x-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative text-emerald-50"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-zinc-950 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-emerald-50 hover:text-emerald-400 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-b border-emerald-900">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-emerald-50 hover:bg-zinc-800 hover:text-emerald-400"
                >
                  {link.name}
                </Link>
              ))}
              {!user ? (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-zinc-950 bg-emerald-500"
                >
                  Login / Register
                </Link>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-zinc-800"
                >
                  Logout ({user.username})
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
