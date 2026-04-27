import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProduct } from '../context/ProductContext';
import { useOrder } from '../context/OrderContext';
import { Navigate } from 'react-router-dom';
import { Trash2, PlusCircle, Sparkles, Loader2, Plus, X, Package, ShoppingBag } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { ProductVariant } from '../types';

export default function Admin() {
  const { user } = useAuth();
  const { products, addProduct, deleteProduct } = useProduct();
  const { orders, updateOrderStatus } = useOrder();

  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [newVariant, setNewVariant] = useState({ name: '', priceAdjustment: '0', stock: '10' });
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  const generateImage = async () => {
    if (!newProduct.name) {
      alert('Please enter a product name first.');
      return;
    }
    
    setIsGeneratingImage(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `A professional product photograph of an electronic item: ${newProduct.name}. Clean modern background, studio lighting, high quality electronic equipment style. ${newProduct.description}`,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      const parts = response?.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/jpeg';
          const imageUrl = `data:${mimeType};base64,${base64EncodeString}`;
          setNewProduct(prev => ({ ...prev, image: imageUrl }));
          break;
        }
      }
    } catch (error: any) {
      console.error('Failed to generate image:', error);
      alert('Failed to generate image. ' + (error?.message || 'Please try again.'));
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleAddVariant = () => {
    if (!newVariant.name) return;
    const variant: ProductVariant = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: newVariant.name,
      priceAdjustment: parseFloat(newVariant.priceAdjustment) || 0,
      stock: parseInt(newVariant.stock) || 0
    };
    setVariants([...variants, variant]);
    setNewVariant({ name: '', priceAdjustment: '0', stock: '10' });
  };

  const removeVariant = (id: string) => {
    setVariants(variants.filter(v => v.id !== id));
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      image: newProduct.image || 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=500&q=80',
      variants: variants.length > 0 ? variants : undefined
    });
    setNewProduct({ name: '', price: '', description: '', image: '' });
    setVariants([]);
  };

  return (
    <div className="bg-zinc-950 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-4 md:mb-0">Admin Panel</h1>
          <div className="flex bg-zinc-900 border border-emerald-900/50 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'products' ? 'bg-emerald-500 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-emerald-400'}`}
            >
              <Package size={16} /> Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'orders' ? 'bg-emerald-500 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-emerald-400'}`}
            >
              <ShoppingBag size={16} /> Orders
            </button>
          </div>
        </div>

        {activeTab === 'products' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Product Form */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-emerald-900/30 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
                <PlusCircle size={20} /> Add New Product
              </h2>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-50 mb-1">Product Name</label>
                  <input 
                    type="text" 
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-50 mb-1">Price (₹)</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-emerald-50">Image URL</label>
                    <button
                      type="button"
                      onClick={generateImage}
                      disabled={isGeneratingImage || !newProduct.name}
                      className="text-xs flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20 hover:bg-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="Name and description are used to generate the image"
                    >
                      {isGeneratingImage ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                      {isGeneratingImage ? 'Generating...' : 'Generate with AI'}
                    </button>
                  </div>
                  {newProduct.image && newProduct.image.startsWith('data:image') && (
                    <div className="mb-2">
                       <img src={newProduct.image} alt="Generated preview" className="w-24 h-24 object-cover rounded border border-emerald-900/50 shadow-sm" />
                    </div>
                  )}
                  <input 
                    type="text" 
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    placeholder="Leave empty for default"
                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-50 mb-1">Description</label>
                  <textarea 
                    required
                    rows={3}
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-white focus:outline-none focus:border-emerald-500"
                  ></textarea>
                </div>
                
                {/* Variants Section */}
                <div className="border border-zinc-800 rounded p-4 bg-zinc-950/50">
                  <h3 className="text-sm font-bold text-emerald-400 mb-3">Product Variants (Optional)</h3>
                  
                  {variants.map(variant => (
                    <div key={variant.id} className="flex justify-between items-center bg-zinc-900 p-2 rounded border border-zinc-700 mb-2">
                      <div>
                        <p className="text-sm text-white font-medium">{variant.name}</p>
                        <p className="text-xs text-zinc-400">
                          Price Adj: ₹{variant.priceAdjustment} | Stock: {variant.stock}
                        </p>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removeVariant(variant.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}

                  <div className="grid grid-cols-12 gap-2 mt-3">
                    <div className="col-span-5">
                      <input 
                        type="text" 
                        placeholder="Name (e.g. Red, M)" 
                        value={newVariant.name}
                        onChange={e => setNewVariant({...newVariant, name: e.target.value})}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded p-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="col-span-3">
                      <input 
                        type="number" 
                        placeholder="Price Adj" 
                        value={newVariant.priceAdjustment}
                        onChange={e => setNewVariant({...newVariant, priceAdjustment: e.target.value})}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded p-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="col-span-3">
                      <input 
                        type="number" 
                        placeholder="Stock" 
                        value={newVariant.stock}
                        onChange={e => setNewVariant({...newVariant, stock: e.target.value})}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded p-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      <button 
                        type="button"
                        onClick={handleAddVariant}
                        className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 p-1.5 rounded disabled:opacity-50"
                        disabled={!newVariant.name}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-emerald-500 text-zinc-950 font-bold py-2 rounded hover:bg-emerald-400 transition-colors mt-4"
                >
                  Add Product
                </button>
              </form>
            </div>
          </div>

          {/* Product List */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900 border border-emerald-900/30 rounded-lg p-6">
              <h2 className="text-xl font-bold text-emerald-400 mb-6">Manage Products</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-400 text-sm">
                      <th className="pb-3 px-2 font-medium">Image</th>
                      <th className="pb-3 px-2 font-medium">Name</th>
                      <th className="pb-3 px-2 font-medium">Price</th>
                      <th className="pb-3 px-2 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/50 transition-colors">
                        <td className="py-3 px-2">
                          <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                        </td>
                        <td className="py-3 px-2 font-medium text-emerald-50">{product.name}</td>
                        <td className="py-3 px-2 text-emerald-400 font-mono">₹{product.price}</td>
                        <td className="py-3 px-2 text-right">
                          <button 
                            onClick={() => deleteProduct(product.id)}
                            className="text-red-400 hover:text-red-300 p-2 rounded hover:bg-red-400/10 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-zinc-500">
                          No products found. Add some!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        ) : (
        <div className="bg-zinc-900 border border-emerald-900/30 rounded-lg p-6">
          <h2 className="text-xl font-bold text-emerald-400 mb-6">Manage Customer Orders</h2>
          {orders.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-zinc-400 text-lg">No orders found in the system.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-zinc-950 border border-emerald-900/40 rounded-lg p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-800 pb-4 mb-4 gap-4">
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">Order ID: {order.id}</p>
                      <p className="text-sm font-medium text-emerald-50 content-start">
                        Customer: <span className="text-emerald-400">{order.userId}</span>
                      </p>
                      <p className="text-xs text-zinc-400 mt-1">
                        Date: {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm text-zinc-400">Total Spent</p>
                        <p className="text-lg font-bold text-emerald-400">₹{order.total.toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <label className="text-xs text-zinc-500">Status</label>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className="bg-zinc-900 border border-emerald-900/50 text-emerald-50 text-sm rounded p-1.5 focus:outline-none focus:border-emerald-500 capitalize"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Order Items ({order.items.length})</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center bg-zinc-900 p-3 rounded border border-zinc-800">
                          <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded opacity-80" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-zinc-300 truncate max-w-[120px]" title={item.name}>{item.name}</p>
                              <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="text-sm font-bold text-zinc-300">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  );
}
