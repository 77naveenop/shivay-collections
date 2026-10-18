import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  Package, 
  ShieldCheck, 
  Globe, 
  MapPin,
  Lock
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Navbar = () => {
  const { 
    cartCount, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    activeTab,
    setActiveTab,
    isOwnerAuthenticated 
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Catalogue' },
    { id: 'women', label: 'Women\'s Wear' },
    { id: 'men', label: 'Men\'s Collection' },
    { id: 'kids', label: 'Kids & Teens' },
    { id: 'cosmetics', label: 'Cosmetics & Beauty' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-sm transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium tracking-wide">
              Official Store: <strong className="text-brand-300 font-bold">Shivay Collections</strong> • Barwar Kheri
            </span>
          </div>
          
          <div className="flex items-center space-x-6 text-[11px] text-stone-400">
            <span className="flex items-center gap-1.5 hover:text-white transition">
              <Globe className="w-3.5 h-3.5 text-brand-400" />
              <span>Domain: <strong className="text-stone-200 font-mono">shivaycollections.com</strong></span>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Original Products | Free Delivery over ₹999
            </span>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo with Image */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setActiveTab('store'); setSelectedCategory('all'); }}
              className="group flex items-center gap-3 text-left focus:outline-none"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-400/90 shadow-md group-hover:scale-105 transition-transform shrink-0 bg-stone-50">
                <img 
                  src="/logo.jpg" 
                  alt="Shivay Collections Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-serif tracking-widest text-xl sm:text-2xl font-black text-stone-900 uppercase leading-none group-hover:text-brand-700 transition">
                    SHIVAY
                  </h1>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-600">
                    COLLECTIONS
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-stone-500 font-medium mt-0.5">
                  <MapPin className="w-2.5 h-2.5 text-rose-500" />
                  <span>Barwar Kheri • Clothing & Cosmetics</span>
                </div>
              </div>
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'store') setActiveTab('store');
                }}
                placeholder="Search clothes, sarees, kurtas, serums, lipstick..."
                className="w-full bg-stone-100/90 text-stone-900 pl-11 pr-10 py-2.5 rounded-full text-xs border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:bg-white transition"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-stone-400 hover:text-stone-600 absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold p-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Owner Dashboard Button */}
            <button
              onClick={() => setActiveTab(activeTab === 'admin' ? 'store' : 'admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition shadow-sm ${
                activeTab === 'admin'
                  ? 'bg-brand-500 text-stone-950 border-brand-500 ring-2 ring-brand-300'
                  : 'bg-stone-900 text-white border-stone-900 hover:bg-stone-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-300" />
              <span className="hidden sm:inline">
                {activeTab === 'admin' ? 'Storefront' : 'Owner Dashboard'}
              </span>
            </button>

            {/* My Orders Button */}
            <button
              onClick={() => setActiveTab('orders')}
              className={`p-2 rounded-full border transition ${
                activeTab === 'orders'
                  ? 'bg-brand-50 border-brand-300 text-brand-700'
                  : 'border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
              title="My Orders & Tracking"
            >
              <Package className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 rounded-full border border-stone-200 text-stone-700 hover:bg-stone-50 transition"
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-stone-900 text-white hover:bg-brand-600 transition shadow-sm group"
            >
              <ShoppingBag className="w-4 h-4 text-brand-300 group-hover:text-white" />
              <span className="text-xs font-semibold">Bag</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-brand-500 text-stone-900 text-[11px] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-stone-200 text-stone-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Categories Bar (Desktop) */}
        <div className="hidden lg:flex items-center justify-center gap-8 py-2.5 border-t border-stone-100 text-sm font-medium">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab('store');
                setSelectedCategory(cat.id);
              }}
              className={`pb-1 text-xs tracking-wider uppercase transition-colors relative ${
                activeTab === 'store' && selectedCategory === cat.id
                  ? 'text-brand-700 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-500'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="text-stone-300">|</span>
          <button 
            onClick={() => setActiveTab('domain-guide')}
            className="text-xs tracking-wider uppercase text-stone-500 hover:text-stone-800 font-semibold flex items-center gap-1"
          >
            <Globe className="w-3 h-3 text-brand-500" />
            <span>shivaycollections.com Setup</span>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-200 space-y-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clothes, cosmetics..."
                className="w-full bg-stone-100 pl-10 pr-4 py-2 rounded-lg text-xs border border-stone-200"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab('store');
                    setSelectedCategory(cat.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-lg text-left text-xs font-semibold ${
                    selectedCategory === cat.id && activeTab === 'store'
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
              <button
                onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 p-2.5 text-xs font-bold text-stone-950 bg-brand-100 rounded-xl"
              >
                <ShieldCheck className="w-4 h-4 text-brand-700" />
                <span>Owner Dashboard (Manage Products)</span>
              </button>
              <button
                onClick={() => { setActiveTab('domain-guide'); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 p-2 text-xs font-medium text-stone-700 hover:bg-stone-100 rounded"
              >
                <Globe className="w-4 h-4 text-brand-600" />
                Domain Setup (shivaycollections.com)
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
