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
    { id: 'all', label: 'All Items' },
    { id: 'women', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'kids', label: 'Kids & Teens' },
    { id: 'cosmetics', label: 'Cosmetics' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-sm transition-all">
      {/* Top Announcement Bar - Responsive */}
      <div className="bg-stone-900 text-stone-200 text-[11px] py-1.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
            <span className="truncate">
              <strong>Shivay Collections</strong> • Barwar Kheri
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-[10px] text-stone-400 shrink-0">
            <span className="flex items-center gap-1 hover:text-white transition">
              <Globe className="w-3 h-3 text-brand-400" />
              <span className="hidden sm:inline">Domain:</span> <strong className="text-stone-200 font-mono">shivaycollections.com</strong>
            </span>
            <span className="hidden md:inline text-stone-500">|</span>
            <span className="hidden md:flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Free Delivery over ₹999
            </span>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Logo with Image */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button 
              onClick={() => { setActiveTab('store'); setSelectedCategory('all'); }}
              className="group flex items-center gap-2 sm:gap-3 text-left focus:outline-none"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-brand-400/90 shadow-sm group-hover:scale-105 transition-transform shrink-0 bg-stone-50">
                <img 
                  src="/logo.jpg" 
                  alt="Shivay Collections Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <h1 className="font-serif tracking-wider text-base sm:text-xl font-black text-stone-900 uppercase leading-none group-hover:text-brand-700 transition">
                    SHIVAY
                  </h1>
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-brand-600">
                    COLLECTIONS
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-stone-500 font-medium">
                  <MapPin className="w-2.5 h-2.5 text-rose-500 shrink-0" />
                  <span className="truncate">Barwar Kheri</span>
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'store') setActiveTab('store');
                }}
                placeholder="Search clothes, sarees, kurtas, cosmetics..."
                className="w-full bg-stone-100/90 text-stone-900 pl-10 pr-9 py-2 rounded-full text-xs border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:bg-white transition"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-stone-400 hover:text-stone-600 absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold p-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Owner Dashboard Button */}
            <button
              onClick={() => setActiveTab(activeTab === 'admin' ? 'store' : 'admin')}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold border transition shadow-sm ${
                activeTab === 'admin'
                  ? 'bg-brand-500 text-stone-950 border-brand-500 ring-2 ring-brand-300'
                  : 'bg-stone-900 text-white border-stone-900 hover:bg-stone-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-300" />
              <span className="text-[11px] sm:text-xs">
                {activeTab === 'admin' ? 'Store' : 'Owner'}
              </span>
            </button>

            {/* My Orders Button */}
            <button
              onClick={() => setActiveTab('orders')}
              className={`p-1.5 sm:p-2 rounded-full border transition ${
                activeTab === 'orders'
                  ? 'bg-brand-50 border-brand-300 text-brand-700'
                  : 'border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
              title="My Orders"
            >
              <Package className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-1.5 sm:p-2 rounded-full border border-stone-200 text-stone-700 hover:bg-stone-50 transition"
              title="Saved Items"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-stone-900 text-white hover:bg-brand-600 transition shadow-sm group"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-300 group-hover:text-white" />
              <span className="text-xs font-semibold hidden sm:inline">Bag</span>
              {cartCount > 0 && (
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-brand-500 text-stone-900 text-[10px] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg border border-stone-200 text-stone-700"
              aria-label="Toggle menu"
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

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-stone-200 space-y-3 animate-fadeIn">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-stone-100 pl-9 pr-3 py-2 rounded-xl text-xs border border-stone-200"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Department Buttons */}
            <div className="grid grid-cols-2 gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab('store');
                    setSelectedCategory(cat.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-xl text-left text-xs font-semibold ${
                    selectedCategory === cat.id && activeTab === 'store'
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Links */}
            <div className="pt-2 border-t border-stone-100 flex flex-col gap-1.5">
              <button
                onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 p-2.5 text-xs font-bold text-stone-950 bg-brand-100 rounded-xl"
              >
                <ShieldCheck className="w-4 h-4 text-brand-700" />
                <span>Owner Dashboard (Manage Products)</span>
              </button>
              <button
                onClick={() => { setActiveTab('orders'); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 p-2 text-xs font-medium text-stone-700 hover:bg-stone-100 rounded-lg"
              >
                <Package className="w-4 h-4 text-stone-600" />
                <span>My Orders & Tracking</span>
              </button>
              <button
                onClick={() => { setActiveTab('domain-guide'); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 p-2 text-xs font-medium text-stone-700 hover:bg-stone-100 rounded-lg"
              >
                <Globe className="w-4 h-4 text-brand-600" />
                <span>Domain Setup (shivaycollections.com)</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
