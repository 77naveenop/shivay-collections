import React, { useState } from 'react';
import { 
  Package, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Truck, 
  DollarSign, 
  Search, 
  ExternalLink,
  ShieldCheck,
  Globe,
  Lock,
  Unlock,
  KeyRound,
  Upload,
  AlertCircle,
  Phone,
  MapPin,
  Check,
  X,
  FileText
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AdminPanel = () => {
  const { 
    products, 
    orders, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus, 
    updatePaymentVerification,
    verifyCustomerAddress,
    markOrderFullyVerified,
    deleteOrder,
    clearAllOrders,
    isOwnerAuthenticated,
    verifyOwnerPIN,
    logoutOwner,
    changeOwnerPIN,
    setActiveTab 
  } = useStore();

  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [newPinInput, setNewPinInput] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);

  // Dashboard Sub-navigation: 'catalogue', 'add-product', 'orders-verification', 'settings'
  const [currentTab, setCurrentTab] = useState('catalogue');
  const [searchCatalog, setSearchCatalog] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State for Add / Edit Product
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'women',
    subcategory: 'Sarees',
    price: '',
    originalPrice: '',
    badge: 'New Launch',
    stockCount: 20,
    sizes: 'Free Size',
    colors: '#800020, #D4AF37',
    colorNames: 'Wine Red, Royal Gold',
    description: '',
    features: 'Premium Fabric, 100% Original, Doorstep Delivery',
    images: ['/logo.jpg']
  });

  const [imagePreview, setImagePreview] = useState('/logo.jpg');

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  // Handle Owner PIN Submit
  const handlePinSubmit = (e) => {
    e.preventDefault();
    const success = verifyOwnerPIN(enteredPin);
    if (!success) {
      setPinError(true);
    } else {
      setPinError(false);
      setEnteredPin('');
    }
  };

  // Handle Image File Upload (converted to Data URL so owner can upload any photo directly)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProductForm(prev => ({
          ...prev,
          images: [reader.result]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Open Edit Mode
  const startEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      subcategory: prod.subcategory || '',
      price: prod.price,
      originalPrice: prod.originalPrice || prod.price,
      badge: prod.badge || '',
      stockCount: prod.stockCount || 10,
      sizes: Array.isArray(prod.sizes) ? prod.sizes.join(', ') : (prod.sizes || ''),
      colors: Array.isArray(prod.colors) ? prod.colors.join(', ') : '',
      colorNames: Array.isArray(prod.colorNames) ? prod.colorNames.join(', ') : '',
      description: prod.description || '',
      features: Array.isArray(prod.features) ? prod.features.join(', ') : '',
      images: prod.images && prod.images.length > 0 ? prod.images : ['/logo.jpg']
    });
    setImagePreview(prod.images && prod.images[0] ? prod.images[0] : '/logo.jpg');
    setCurrentTab('add-product');
  };

  // Save Product (Add or Update)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      alert('Product name and selling price are required.');
      return;
    }

    const priceNum = Number(productForm.price);
    const origNum = Number(productForm.originalPrice) || priceNum;
    const discount = origNum > priceNum ? Math.round(((origNum - priceNum) / origNum) * 100) : 0;

    const formattedData = {
      name: productForm.name,
      category: productForm.category,
      subcategory: productForm.subcategory,
      price: priceNum,
      originalPrice: origNum,
      discount,
      badge: productForm.badge,
      stockCount: Number(productForm.stockCount) || 1,
      sizes: productForm.sizes ? productForm.sizes.split(',').map(s => s.trim()).filter(Boolean) : ['Standard'],
      colors: productForm.colors ? productForm.colors.split(',').map(c => c.trim()).filter(Boolean) : ['#000000'],
      colorNames: productForm.colorNames ? productForm.colorNames.split(',').map(c => c.trim()).filter(Boolean) : ['Standard'],
      description: productForm.description || 'Quality product from Shivay Collections, Barwar Kheri.',
      features: productForm.features ? productForm.features.split(',').map(f => f.trim()).filter(Boolean) : ['Genuine Quality'],
      images: productForm.images && productForm.images.length > 0 ? productForm.images : ['/logo.jpg'],
      inStock: (Number(productForm.stockCount) || 0) > 0
    };

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...formattedData
      });
      setEditingProduct(null);
    } else {
      addProduct(formattedData);
    }

    // Reset Form
    setProductForm({
      name: '',
      category: 'women',
      subcategory: 'Sarees',
      price: '',
      originalPrice: '',
      badge: 'New Launch',
      stockCount: 20,
      sizes: 'Free Size',
      colors: '#800020, #D4AF37',
      colorNames: 'Wine Red, Royal Gold',
      description: '',
      features: 'Premium Fabric, 100% Original, Doorstep Delivery',
      images: ['/logo.jpg']
    });
    setImagePreview('/logo.jpg');
    setCurrentTab('catalogue');
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending Verification');

  // IF NOT AUTHENTICATED: SHOW OWNER LOGIN GATE
  if (!isOwnerAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-stone-200/90 p-8 text-center space-y-6">
          
          <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden border-4 border-brand-400 shadow-md">
            <img src="/logo.jpg" alt="Shivay Collections" className="w-full h-full object-cover" />
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Barwar Kheri Store
            </span>
            <h2 className="font-serif text-2xl font-black text-stone-900 mt-2">
              Owner Dashboard Login
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Please enter your 4-digit Owner PIN to manage products, catalog, and order verifications.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                maxLength={6}
                value={enteredPin}
                onChange={(e) => { setEnteredPin(e.target.value); setPinError(false); }}
                placeholder="Enter Owner PIN (Default: 8888)"
                className="w-full text-center tracking-widest text-lg font-bold py-3 px-4 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-stone-50"
                autoFocus
              />
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            {pinError && (
              <p className="text-xs text-rose-600 font-semibold">
                Incorrect PIN. Default is 8888.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider transition shadow-md"
            >
              Verify & Enter Dashboard
            </button>
          </form>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
            <span>Official: shivaycollections.com</span>
            <span className="font-mono bg-stone-100 px-2 py-0.5 rounded text-stone-600">Default PIN: 8888</span>
          </div>

        </div>
      </div>
    );
  }

  // AUTHENTICATED OWNER DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Top Banner with Store Logo & Owner Controls */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-brand-400/80 shadow-md shrink-0 bg-white">
            <img src="/logo.jpg" alt="Shivay Collections Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-brand-500/20 text-brand-300 border border-brand-400/30 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-brand-400" />
                Verified Owner Portal
              </span>
              <span className="text-xs text-stone-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                Barwar Kheri
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-black text-white">
              Shivay Collections Dashboard
            </h1>
            <p className="text-xs text-stone-400">
              Domain: <span className="text-brand-300 font-mono">shivaycollections.com</span> • Full Catalogue & Verification Control
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('store')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur transition flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>View Live Store</span>
          </button>

          <button
            onClick={() => setShowPinModal(true)}
            className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition flex items-center gap-1.5"
            title="Change Owner PIN"
          >
            <KeyRound className="w-3.5 h-3.5 text-brand-400" />
            <span>Change PIN</span>
          </button>

          <button
            onClick={logoutOwner}
            className="px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 text-rose-200 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock Dashboard</span>
          </button>
        </div>
      </div>

      {/* Metrics Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 mb-1.5">
            <span className="text-xs font-semibold uppercase">Active Products</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900">{products.length}</p>
          <p className="text-[11px] text-stone-500 mt-1">In store catalogue</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 mb-1.5">
            <span className="text-xs font-semibold uppercase">Total Orders</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900">{orders.length}</p>
          <p className="text-[11px] text-stone-500 mt-1">Customer orders</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 mb-1.5">
            <span className="text-xs font-semibold uppercase">Pending Verification</span>
            <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-rose-600">{pendingOrders.length}</p>
          <p className="text-[11px] text-stone-500 mt-1">Requires your check</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 mb-1.5">
            <span className="text-xs font-semibold uppercase">Order Revenue</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900">{formatPrice(totalRevenue)}</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">Total value</p>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-stone-200 gap-6 text-sm font-semibold">
        <button
          onClick={() => { setCurrentTab('catalogue'); setEditingProduct(null); }}
          className={`pb-3 relative transition flex items-center gap-2 ${
            currentTab === 'catalogue'
              ? 'text-brand-700 after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-500'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Product Catalogue ({products.length})</span>
        </button>

        <button
          onClick={() => { setCurrentTab('add-product'); }}
          className={`pb-3 relative transition flex items-center gap-2 ${
            currentTab === 'add-product'
              ? 'text-brand-700 after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-500'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>{editingProduct ? 'Edit Product' : '+ Add New Product'}</span>
        </button>

        <button
          onClick={() => setCurrentTab('orders-verification')}
          className={`pb-3 relative transition flex items-center gap-2 ${
            currentTab === 'orders-verification'
              ? 'text-brand-700 after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-500'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Orders & Verification Center ({orders.length})</span>
          {pendingOrders.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
              {pendingOrders.length}
            </span>
          )}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: CATALOGUE VIEW (View, Edit, Delete Products) */}
      {/* ========================================================================= */}
      {currentTab === 'catalogue' && (
        <div className="space-y-4">
          
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchCatalog}
                onChange={(e) => setSearchCatalog(e.target.value)}
                placeholder="Search products in your catalogue..."
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-stone-200 bg-white"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={() => {
                setEditingProduct(null);
                setCurrentTab('add-product');
              }}
              className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-brand-600 text-white text-xs font-bold flex items-center justify-center gap-2 transition shadow-md"
            >
              <Plus className="w-4 h-4 text-brand-300" />
              <span>Add First Product</span>
            </button>
          </div>

          {products.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mx-auto text-brand-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">Your Catalogue is Ready & Clean</h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                All dummy product and dummy payment records have been deleted. You can now add your genuine stock (sarees, kurtas, suits, kids wear, serums, lipsticks) directly into Shivay Collections!
              </p>
              <button
                onClick={() => { setEditingProduct(null); setCurrentTab('add-product'); }}
                className="px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-400 text-stone-950 font-bold text-xs transition shadow-lg"
              >
                + Add Your First Product Now
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3.5 px-4">Item</th>
                      <th className="py-3.5 px-4">Department</th>
                      <th className="py-3.5 px-4">Price / MRP</th>
                      <th className="py-3.5 px-4">Stock</th>
                      <th className="py-3.5 px-4">Sizes / Options</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {products
                      .filter(p => p.name.toLowerCase().includes(searchCatalog.toLowerCase()))
                      .map((p) => (
                        <tr key={p.id} className="hover:bg-stone-50/80 transition">
                          
                          <td className="py-3 px-4 flex items-center gap-3">
                            <img 
                              src={p.images && p.images[0] ? p.images[0] : '/logo.jpg'} 
                              alt={p.name} 
                              className="w-12 h-14 object-cover rounded-lg bg-stone-100 shrink-0 border border-stone-200" 
                            />
                            <div>
                              <p className="font-bold text-stone-900 line-clamp-1">{p.name}</p>
                              <span className="text-[10px] text-brand-700 bg-brand-50 px-2 py-0.5 rounded font-semibold uppercase">
                                {p.subcategory || p.category}
                              </span>
                            </div>
                          </td>

                          <td className="py-3 px-4 uppercase text-[11px] font-bold text-stone-600">
                            {p.category}
                          </td>

                          <td className="py-3 px-4">
                            <span className="font-bold text-stone-900 text-sm block">
                              {formatPrice(p.price)}
                            </span>
                            {p.originalPrice > p.price && (
                              <span className="text-[11px] text-stone-400 line-through">
                                {formatPrice(p.originalPrice)}
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              (p.stockCount || 0) > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {(p.stockCount || 0) > 0 ? `${p.stockCount} in stock` : 'Out of Stock'}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-stone-500">
                            {Array.isArray(p.sizes) ? p.sizes.slice(0, 3).join(', ') : p.sizes}
                          </td>

                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => startEditProduct(p)}
                                className="p-2 text-stone-600 hover:text-brand-700 hover:bg-stone-100 rounded-lg transition"
                                title="Edit Product"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete "${p.name}" from store?`)) {
                                    deleteProduct(p.id);
                                  }
                                }}
                                className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                title="Delete Product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ADD / EDIT PRODUCT FORM */}
      {/* ========================================================================= */}
      {currentTab === 'add-product' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm max-w-3xl mx-auto space-y-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900">
                {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Add New Item to Catalogue'}
              </h2>
              <p className="text-xs text-stone-500">
                Photos, prices, and stock updates go live instantly on shivaycollections.com
              </p>
            </div>
            
            <button
              onClick={() => { setEditingProduct(null); setCurrentTab('catalogue'); }}
              className="text-xs text-stone-500 hover:text-stone-800 font-semibold"
            >
              ← Back to Catalogue
            </button>
          </div>

          <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
            
            {/* Title */}
            <div>
              <label className="block font-bold text-stone-700 mb-1">Product Title *</label>
              <input
                type="text"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                placeholder="e.g. Pure Banarasi Silk Saree or 24K Gold Facial Serum"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm font-medium"
                required
              />
            </div>

            {/* Department & Subcategory */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Department / Category *</label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white font-medium"
                >
                  <option value="women">Women's Wear (Sarees, Kurtis, Suits, Dresses)</option>
                  <option value="men">Men's Collection (Kurtas, Shirts, Polos, Chinos)</option>
                  <option value="kids">Kids & Teens (Boys, Girls, Rompers)</option>
                  <option value="cosmetics">Cosmetics & Beauty (Skincare, Perfumes, Lipsticks)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Subcategory / Style Tag *</label>
                <input
                  type="text"
                  value={productForm.subcategory}
                  onChange={(e) => setProductForm({ ...productForm, subcategory: e.target.value })}
                  placeholder="e.g. Sarees, Kurtas, Gowns, Lipsticks, Serums"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
                />
              </div>
            </div>

            {/* Pricing & Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Selling Price (₹) *</label>
                <input
                  type="number"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  placeholder="e.g. 1999"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">MRP / Original Price (₹)</label>
                <input
                  type="number"
                  value={productForm.originalPrice}
                  onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                  placeholder="e.g. 3999"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Available Quantity in Stock</label>
                <input
                  type="number"
                  value={productForm.stockCount}
                  onChange={(e) => setProductForm({ ...productForm, stockCount: e.target.value })}
                  placeholder="e.g. 25"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
                />
              </div>
            </div>

            {/* Image Upload / URL */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <label className="block font-bold text-stone-800">
                Product Image (Upload from phone/laptop OR paste web link)
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-24 h-28 rounded-xl overflow-hidden border border-stone-300 bg-white shrink-0 shadow-inner">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>

                <div className="space-y-2 flex-1 w-full">
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold flex items-center gap-2">
                      <Upload className="w-3.5 h-3.5 text-brand-300" />
                      <span>Choose Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-stone-400 text-[11px]">JPG, PNG, WebP supported</span>
                  </div>

                  <input
                    type="url"
                    value={productForm.images[0] || ''}
                    onChange={(e) => {
                      setImagePreview(e.target.value);
                      setProductForm({ ...productForm, images: [e.target.value] });
                    }}
                    placeholder="Or paste external image URL: https://..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Sizes & Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Available Sizes (comma separated)</label>
                <input
                  type="text"
                  value={productForm.sizes}
                  onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                  placeholder="S, M, L, XL, XXL or 30ml, 50ml, Free Size"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Colors / Shades (comma separated)</label>
                <input
                  type="text"
                  value={productForm.colorNames}
                  onChange={(e) => setProductForm({ ...productForm, colorNames: e.target.value })}
                  placeholder="Red, Royal Blue, Gold, Peach"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
                />
              </div>
            </div>

            {/* Description & Features */}
            <div>
              <label className="block font-bold text-stone-700 mb-1">Description</label>
              <textarea
                rows={3}
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                placeholder="Product material, weaving, fabric feel, occasions, washing instructions..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Highlights (comma separated)</label>
              <input
                type="text"
                value={productForm.features}
                onChange={(e) => setProductForm({ ...productForm, features: e.target.value })}
                placeholder="100% Handcrafted, Breathable Fabric, Fast Delivery"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={() => { setEditingProduct(null); setCurrentTab('catalogue'); }}
                className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-bold hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-stone-950 font-black text-xs transition shadow-md"
              >
                {editingProduct ? 'Save Changes' : 'Publish Product to Store'}
              </button>
            </div>

          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: ORDERS & VERIFICATION CENTER */}
      {/* ========================================================================= */}
      {currentTab === 'orders-verification' && (
        <div className="space-y-4">
          
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search orders by customer name, phone, or ID..."
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-stone-200 bg-white"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {orders.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete all order history?')) {
                    clearAllOrders();
                  }
                }}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold self-end sm:self-auto"
              >
                Clear All Orders
              </button>
            )}
          </div>

          {orders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">Zero Pending Orders</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                All dummy order records have been purged. Real incoming customer orders from shivaycollections.com will appear here for verification.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders
                .filter(o => 
                  o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
                  o.customer?.name?.toLowerCase().includes(orderSearch.toLowerCase()) ||
                  o.customer?.phone?.includes(orderSearch)
                )
                .map((ord) => {
                  const isVerified = ord.verificationStatus?.isOrderVerified;
                  const isAddressVerified = ord.verificationStatus?.isAddressVerified;
                  const paymentStatus = ord.verificationStatus?.paymentVerification || 'Pending Verification';

                  return (
                    <div 
                      key={ord.id}
                      className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-5"
                    >
                      {/* Top Header of Order */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-sm bg-stone-900 text-brand-300 px-3 py-1 rounded-xl">
                            {ord.id}
                          </span>
                          <span className="text-xs text-stone-500">{ord.date}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            ord.status.includes('Verified') || ord.status === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {ord.status}
                          </span>
                        </div>

                        {/* Order Verification Quick Button */}
                        <div className="flex items-center gap-2">
                          {!isVerified ? (
                            <button
                              onClick={() => markOrderFullyVerified(ord.id)}
                              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Verify & Confirm Order</span>
                            </button>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-xl">
                              <Check className="w-3.5 h-3.5" />
                              <span>Order Verified by Owner</span>
                            </span>
                          )}

                          <button
                            onClick={() => {
                              if (confirm(`Delete order ${ord.id}?`)) deleteOrder(ord.id);
                            }}
                            className="p-1.5 text-stone-400 hover:text-rose-600 rounded"
                            title="Delete Order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* 3-Column Verification & Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                        
                        {/* Customer & Delivery Verification */}
                        <div className="space-y-2 bg-stone-50 p-4 rounded-2xl border border-stone-100">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-stone-900 uppercase tracking-wide">Customer Details</span>
                            <button
                              onClick={() => verifyCustomerAddress(ord.id, !isAddressVerified)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                                isAddressVerified
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-stone-200 text-stone-700 hover:bg-emerald-50'
                              }`}
                            >
                              {isAddressVerified ? '✓ Address Verified' : 'Verify Address'}
                            </button>
                          </div>
                          <p className="font-bold text-stone-900 text-sm">{ord.customer.name}</p>
                          <p className="text-stone-600 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-stone-400" />
                            <span>{ord.customer.phone}</span>
                          </p>
                          <p className="text-stone-600 leading-snug flex items-start gap-1">
                            <MapPin className="w-3 h-3 text-stone-400 shrink-0 mt-0.5" />
                            <span>{ord.customer.address}</span>
                          </p>

                          {/* WhatsApp Customer Button */}
                          <div className="pt-2">
                            <button
                              onClick={() => {
                                const msg = encodeURIComponent(`Namaste ${ord.customer.name}! This is Shivay Collections (Barwar Kheri). Your order ${ord.id} has been verified and is being prepared for dispatch.`);
                                window.open(`https://wa.me/${ord.customer.phone.replace(/\D/g, '')}?text=${msg}`, '_blank');
                              }}
                              className="w-full py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                            >
                              <span>Message on WhatsApp</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Payment Verification & Billing */}
                        <div className="space-y-2 bg-stone-50 p-4 rounded-2xl border border-stone-100">
                          <span className="font-bold text-stone-900 uppercase tracking-wide block">
                            Payment & Finance Verification
                          </span>
                          <div className="space-y-1">
                            <p className="text-stone-600">
                              Payment Mode: <strong className="text-stone-900">{ord.paymentMethod}</strong>
                            </p>
                            <p className="text-stone-600">
                              Total Amount: <strong className="text-brand-700 text-sm">{formatPrice(ord.total)}</strong>
                            </p>
                            {ord.coupon && (
                              <p className="text-emerald-700">Coupon applied: {ord.coupon}</p>
                            )}
                          </div>

                          <div className="pt-2">
                            <label className="block text-[11px] font-bold text-stone-700 mb-1">
                              Payment Verification Status:
                            </label>
                            <select
                              value={paymentStatus}
                              onChange={(e) => updatePaymentVerification(ord.id, e.target.value)}
                              className="w-full p-2 rounded-lg border border-stone-300 text-xs font-semibold bg-white"
                            >
                              <option value="Paid Online (Razorpay Verified)">Paid Online (Razorpay Verified)</option>
                              <option value="COD Confirmed by Phone Call">COD Confirmed by Phone Call</option>
                              <option value="Pending Verification">Pending Verification</option>
                              <option value="Payment Rejected / Cancelled">Payment Rejected / Cancelled</option>
                            </select>
                          </div>
                        </div>

                        {/* Order Status & Items */}
                        <div className="space-y-2 bg-stone-50 p-4 rounded-2xl border border-stone-100">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-stone-900 uppercase tracking-wide">
                              Items Ordered ({ord.items.length})
                            </span>
                            <span className="text-[11px] text-stone-500">Dispatch Stage</span>
                          </div>

                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                            className="w-full p-2 rounded-lg border border-stone-300 text-xs font-bold bg-white mb-2"
                          >
                            <option value="Pending Verification">Pending Verification</option>
                            <option value="Order Verified & Confirmed">Order Verified & Confirmed</option>
                            <option value="Packed">Packed</option>
                            <option value="Shipped">Shipped / Dispatched</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <div className="max-h-24 overflow-y-auto space-y-1">
                            {ord.items.map((it, idx) => (
                              <div key={idx} className="flex justify-between items-center text-[11px] text-stone-700">
                                <span className="truncate max-w-[150px]">{it.name} (x{it.quantity})</span>
                                <span className="font-bold">{formatPrice(it.price * it.quantity)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                    </div>
                  );
                })}
            </div>
          )}

        </div>
      )}

      {/* Change PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 border border-stone-200 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-base font-bold text-stone-900">Change Owner PIN</h3>
              <button onClick={() => setShowPinModal(false)} className="text-stone-400 hover:text-stone-600">✕</button>
            </div>
            <p className="text-xs text-stone-500">
              Set a new 4 to 6 digit security code to protect your dashboard from unauthorized visitors.
            </p>
            <input
              type="password"
              maxLength={6}
              value={newPinInput}
              onChange={(e) => setNewPinInput(e.target.value)}
              placeholder="Enter new PIN"
              className="w-full py-2.5 px-4 rounded-xl border border-stone-300 text-center text-lg font-bold tracking-widest"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowPinModal(false)}
                className="flex-1 py-2 rounded-xl border border-stone-200 text-stone-600 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (changeOwnerPIN(newPinInput)) {
                    setShowPinModal(false);
                    setNewPinInput('');
                  }
                }}
                className="flex-1 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-brand-600"
              >
                Save New PIN
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
