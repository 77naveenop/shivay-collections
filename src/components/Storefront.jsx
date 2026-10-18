import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  SlidersHorizontal, 
  Star, 
  ChevronDown, 
  Heart, 
  ShieldCheck, 
  Gift, 
  CheckCircle2,
  Users,
  Search,
  PlusCircle,
  MapPin,
  ShoppingBag
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { HeroBanner } from './HeroBanner';
import { ProductCard } from './ProductCard';
import { CATEGORIES, TESTIMONIALS } from '../data/products';

export const Storefront = () => {
  const { products, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, setActiveTab } = useStore();

  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(50000);

  // Extract unique subcategories based on current category
  const availableSubcategories = useMemo(() => {
    let list = products;
    if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }
    const subs = Array.from(new Set(list.map(p => p.subcategory).filter(Boolean)));
    return ['all', ...subs];
  }, [products, selectedCategory]);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        // Subcategory filter
        if (selectedSubcategory !== 'all' && p.subcategory !== selectedSubcategory) return false;
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchSub = p.subcategory && p.subcategory.toLowerCase().includes(q);
          const matchDesc = p.description && p.description.toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchSub && !matchDesc) return false;
        }
        // Price limit
        if (p.price > priceRange) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
        return (b.createdAt || 0) - (a.createdAt || 0); // newest first
      });
  }, [products, selectedCategory, selectedSubcategory, searchQuery, priceRange, sortBy]);

  return (
    <div className="space-y-12">
      
      {/* Hero Banner with slider */}
      <HeroBanner />

      {/* Main Catalog Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="catalog-section">
        
        {/* Category Visual Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-brand-700 font-bold uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Shivay Collections • Barwar Kheri</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                Explore by Department
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { id: 'women', label: 'Women’s Collection', desc: 'Sarees, Kurtis & Lehengas', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80' },
              { id: 'men', label: 'Men’s Collection', desc: 'Silk Kurtas, Shirts & Polos', img: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=500&q=80' },
              { id: 'kids', label: 'Kids & Teens', desc: 'All Age Groups, Party & Casual', img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=500&q=80' },
              { id: 'cosmetics', label: 'Cosmetics & Beauty', desc: 'Skincare, Serums & Makeup', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80' },
            ].map((card) => (
              <div
                key={card.id}
                onClick={() => {
                  setSelectedCategory(card.id);
                  setSelectedSubcategory('all');
                }}
                className={`group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 border-2 ${
                  selectedCategory === card.id ? 'border-brand-500 ring-2 ring-brand-300/60' : 'border-stone-200/90'
                }`}
              >
                <img
                  src={card.img}
                  alt={card.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-transparent flex flex-col justify-end p-3.5 text-white">
                  <h4 className="font-serif font-bold text-sm leading-tight text-white group-hover:text-brand-300 transition">
                    {card.label}
                  </h4>
                  <p className="text-[10px] text-stone-300 line-clamp-1">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter and Subcategory Bar (Only if products exist) */}
        {products.length > 0 && (
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-4">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Subcategory Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mr-1 hidden sm:inline">
                  Style:
                </span>
                {availableSubcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                      selectedSubcategory === sub
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {sub === 'all' ? 'All Styles' : sub}
                  </button>
                ))}
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-3 self-end md:self-auto">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-stone-500 font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-400"
                  >
                    <option value="featured">Newest Arrivals</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated ★</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Active filters tag */}
            {(selectedCategory !== 'all' || selectedSubcategory !== 'all' || searchQuery) && (
              <div className="flex items-center gap-2 pt-2 border-t border-stone-100 text-xs">
                <span className="text-stone-500 font-medium">Active:</span>
                {selectedCategory !== 'all' && (
                  <span className="bg-brand-50 text-brand-800 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                    {selectedCategory.toUpperCase()}
                    <button onClick={() => setSelectedCategory('all')}>✕</button>
                  </span>
                )}
                {selectedSubcategory !== 'all' && (
                  <span className="bg-brand-50 text-brand-800 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                    {selectedSubcategory}
                    <button onClick={() => setSelectedSubcategory('all')}>✕</button>
                  </span>
                )}
                {searchQuery && (
                  <span className="bg-stone-100 text-stone-800 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')}>✕</button>
                  </span>
                )}
                <button 
                  onClick={() => { setSelectedCategory('all'); setSelectedSubcategory('all'); setSearchQuery(''); }}
                  className="text-stone-400 hover:text-stone-700 underline text-[11px] ml-auto"
                >
                  Clear all
                </button>
              </div>
            )}

          </div>
        )}

        {/* Product Grid OR Clean Welcome Card */}
        <div>
          {products.length === 0 ? (
            /* Clean Empty State welcoming the owner to populate their store */
            <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 text-center space-y-6 shadow-sm">
              <div className="relative mx-auto w-28 h-28 rounded-full overflow-hidden border-4 border-brand-400/80 shadow-lg">
                <img src="/logo.jpg" alt="Shivay Collections" className="w-full h-full object-cover" />
              </div>

              <div className="max-w-lg mx-auto space-y-2">
                <div className="inline-flex items-center gap-1 text-xs font-bold text-brand-800 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full uppercase">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Barwar Kheri Store</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-stone-900">
                  Welcome to Shivay Collections!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  All dummy payment and product records have been deleted. You can now add your real clothes and cosmetics catalogue directly from your <strong>Owner Dashboard</strong>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('admin')}
                  className="px-6 py-3.5 rounded-full bg-stone-900 hover:bg-brand-600 text-white font-bold text-xs flex items-center gap-2 transition shadow-md"
                >
                  <PlusCircle className="w-4 h-4 text-brand-300" />
                  <span>Open Owner Dashboard & Add Products</span>
                </button>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
              <p className="font-serif text-lg font-bold text-stone-800">No products match your search</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSelectedSubcategory('all'); setSearchQuery(''); }}
                className="px-5 py-2 rounded-full bg-stone-900 text-white text-xs font-bold hover:bg-brand-600 transition"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Barwar Kheri Store Feature Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative z-10 max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider border border-brand-400/30">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>Direct Store • Barwar Kheri</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-black">
              Clothing for Every Age & Pure Beauty Cosmetics
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Serving our valued customers with men's wear, women's ethnic & western clothing, kids festive outfits, and premium cosmetic formulations.
            </p>
            <div className="pt-1">
              <p className="text-xs text-brand-300 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>UPI, Card Payments, and Cash on Delivery Available</span>
              </p>
            </div>
          </div>

          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-brand-400/60 shadow-2xl shrink-0 bg-white">
            <img src="/logo.jpg" alt="Shivay Collections Store" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>

    </div>
  );
};
