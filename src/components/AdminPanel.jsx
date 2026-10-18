import React, { useState } from 'react';
import { 
  Package, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Truck, 
  DollarSign, 
  Search, 
  ExternalLink,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AdminPanel = () => {
  const { products, orders, addProduct, deleteProduct, updateOrderStatus, setActiveTab } = useStore();
  const [currentView, setCurrentView] = useState('orders'); // 'orders', 'products', 'new-product'
  const [searchTerm, setSearchTerm] = useState('');

  // New product form state
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'women',
    subcategory: 'Sarees',
    price: '',
    originalPrice: '',
    badge: 'New Launch',
    description: '',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
    sizes: 'S, M, L, XL',
    colors: '#800020, #D4AF37',
    colorNames: 'Wine Red, Royal Gold',
    features: 'Premium Fabric, Fast Delivery'
  });

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) {
      alert('Please fill product name and price');
      return;
    }

    const priceNum = Number(newProd.price);
    const origNum = Number(newProd.originalPrice) || priceNum;
    const discount = origNum > priceNum ? Math.round(((origNum - priceNum) / origNum) * 100) : 0;

    addProduct({
      name: newProd.name,
      category: newProd.category,
      subcategory: newProd.subcategory,
      price: priceNum,
      originalPrice: origNum,
      discount,
      badge: newProd.badge,
      description: newProd.description || 'Premium collection handcrafted with perfection.',
      images: newProd.images,
      sizes: newProd.sizes.split(',').map(s => s.trim()),
      colors: newProd.colors.split(',').map(c => c.trim()),
      colorNames: newProd.colorNames.split(',').map(c => c.trim()),
      features: newProd.features.split(',').map(f => f.trim()),
      inStock: true,
      stockCount: 25
    });

    // Reset
    setNewProd({
      name: '',
      category: 'women',
      subcategory: 'Sarees',
      price: '',
      originalPrice: '',
      badge: 'New Launch',
      description: '',
      images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
      sizes: 'S, M, L, XL',
      colors: '#800020, #D4AF37',
      colorNames: 'Wine Red, Royal Gold',
      features: 'Premium Fabric, Fast Delivery'
    });
    setCurrentView('products');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Top Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-stone-900 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Store Admin Console</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">
            Shivay Collections Management
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Connected to Live Storefront: <span className="text-brand-300 font-mono">https://shivaycollections.com</span>
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('store')}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur transition"
          >
            Preview Storefront
          </button>
          <button
            onClick={() => setActiveTab('domain-guide')}
            className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-stone-950 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5" />
            Domain Setup
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase">Total Sales</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900">{formatPrice(totalRevenue)}</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">↑ Active orders revenue</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase">Orders Received</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900">{orders.length}</p>
          <p className="text-[11px] text-stone-500 font-medium mt-1">UPI & COD Orders</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase">Live Catalog</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900">{products.length}</p>
          <p className="text-[11px] text-stone-500 font-medium mt-1">Men, Women, Kids & Cosmetics</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase">Avg Order Value</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900">{formatPrice(avgOrderValue)}</p>
          <p className="text-[11px] text-purple-600 font-medium mt-1">Per transaction</p>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 gap-4 text-sm font-semibold">
        <button
          onClick={() => setCurrentView('orders')}
          className={`pb-3 relative transition ${
            currentView === 'orders'
              ? 'text-brand-700 after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-500'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          Orders Management ({orders.length})
        </button>
        <button
          onClick={() => setCurrentView('products')}
          className={`pb-3 relative transition ${
            currentView === 'products'
              ? 'text-brand-700 after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-500'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          Product Inventory ({products.length})
        </button>
        <button
          onClick={() => setCurrentView('new-product')}
          className={`pb-3 relative transition ${
            currentView === 'new-product'
              ? 'text-brand-700 after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-500'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          + Add New Product
        </button>
      </div>

      {/* View 1: Orders Management */}
      {currentView === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 text-sm">
              No orders placed yet. Orders placed from storefront will show here automatically.
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((ord) => (
                <div key={ord.id} className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-4">
                  
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm bg-stone-100 px-2.5 py-1 rounded text-stone-900">
                        {ord.id}
                      </span>
                      <span className="text-xs text-stone-500">{ord.date}</span>
                    </div>

                    {/* Status Pill & Changer */}
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                        ord.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.status}
                      </span>

                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        className="text-xs font-semibold border border-stone-200 rounded-lg px-2 py-1 bg-stone-50"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer details & items */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="font-bold text-stone-900 mb-1">Customer & Address</p>
                      <p className="text-stone-800 font-semibold">{ord.customer.name}</p>
                      <p className="text-stone-500">{ord.customer.phone}</p>
                      <p className="text-stone-500 mt-0.5">{ord.customer.address}</p>
                    </div>

                    <div>
                      <p className="font-bold text-stone-900 mb-1">Payment & Dispatch</p>
                      <p className="text-stone-700">Mode: <strong className="text-stone-900">{ord.paymentMethod}</strong></p>
                      <p className="text-stone-700">Total: <strong className="text-brand-700">{formatPrice(ord.total)}</strong></p>
                      {ord.coupon && <p className="text-emerald-700">Coupon Used: {ord.coupon}</p>}
                    </div>

                    <div>
                      <p className="font-bold text-stone-900 mb-1">Ordered Items ({ord.items.length})</p>
                      <div className="space-y-1">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-stone-600">
                            <span className="truncate max-w-[180px]">{it.name} (x{it.quantity})</span>
                            <span className="font-semibold text-stone-900">{formatPrice(it.price * it.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* View 2: Products Inventory */}
      {currentView === 'products' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products in inventory..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-white"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={() => setCurrentView('new-product')}
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-brand-600 text-white text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products
                  .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50/80 transition">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover rounded-lg bg-stone-100 shrink-0" />
                        <div>
                          <p className="font-bold text-stone-900 line-clamp-1">{p.name}</p>
                          <p className="text-[11px] text-stone-400">{p.subcategory}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 uppercase text-[11px] font-semibold text-stone-600">
                        {p.category}
                      </td>
                      <td className="py-3 px-4 font-bold text-stone-900">
                        {formatPrice(p.price)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {p.stockCount || 20} in stock
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 rounded hover:bg-stone-100 transition"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 3: Add New Product Form */}
      {currentView === 'new-product' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm max-w-2xl mx-auto">
          <h2 className="font-serif text-lg font-bold text-stone-900 mb-4">
            Add New Item to Shivay Collections
          </h2>

          <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Product Title *</label>
              <input
                type="text"
                value={newProd.name}
                onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                placeholder="e.g. Pure Georgette Zari Saree"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Department *</label>
                <select
                  value={newProd.category}
                  onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white"
                >
                  <option value="women">Women's Wear</option>
                  <option value="men">Men's Wear</option>
                  <option value="kids">Kids & Teens</option>
                  <option value="cosmetics">Cosmetics & Beauty</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Subcategory *</label>
                <input
                  type="text"
                  value={newProd.subcategory}
                  onChange={(e) => setNewProd({ ...newProd, subcategory: e.target.value })}
                  placeholder="e.g. Sarees / Kurtas / Serums"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Selling Price (₹) *</label>
                <input
                  type="number"
                  value={newProd.price}
                  onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                  placeholder="2499"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Original Price (₹)</label>
                <input
                  type="number"
                  value={newProd.originalPrice}
                  onChange={(e) => setNewProd({ ...newProd, originalPrice: e.target.value })}
                  placeholder="4999"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Image URL *</label>
              <input
                type="url"
                value={newProd.images[0]}
                onChange={(e) => setNewProd({ ...newProd, images: [e.target.value] })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Available Sizes (comma separated)</label>
              <input
                type="text"
                value={newProd.sizes}
                onChange={(e) => setNewProd({ ...newProd, sizes: e.target.value })}
                placeholder="S, M, L, XL"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Description</label>
              <textarea
                rows={3}
                value={newProd.description}
                onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                placeholder="Handcrafted festive apparel with rich embroidery..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setCurrentView('products')}
                className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-brand-600 text-white font-bold transition shadow"
              >
                Publish Product
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
