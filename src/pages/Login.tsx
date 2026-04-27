import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (isRegister) {
      // In a real app, save to db. Here we just set in localstorage for demo.
      const users = JSON.parse(localStorage.getItem('shop_users') || '{}');
      if (users[username]) {
        setError('Username already exists.');
        return;
      }
      users[username] = password;
      localStorage.setItem('shop_users', JSON.stringify(users));
      login(username); // auto login
      navigate(redirectPath);
    } else {
      // Special admin case
      if (username === 'admin' && password === 'admin123') {
        login(username);
        navigate('/admin');
        return;
      }

      const users = JSON.parse(localStorage.getItem('shop_users') || '{}');
      if (users[username] && users[username] === password) {
        login(username);
        navigate(redirectPath);
      } else {
        setError('Invalid username or password.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-emerald-900/30 rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="text-zinc-400 text-sm">
            {isRegister ? 'Sign up to start shopping.' : 'Log in to access your account.'}
          </p>
          {!isRegister && <p className="text-xs text-emerald-500 mt-2">Hint: use admin / admin123 for admin panel</p>}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-emerald-50 mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => {setUsername(e.target.value); setError('');}}
              className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="johndoe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-50 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => {setPassword(e.target.value); setError('');}}
              className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-emerald-500 text-zinc-950 font-bold py-3 rounded shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-colors"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center text-sm">
          <span className="text-zinc-400 mr-2">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
          </span>
          <button 
            onClick={() => {setIsRegister(!isRegister); setError('');}}
            className="text-emerald-400 font-medium hover:underline"
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
}
