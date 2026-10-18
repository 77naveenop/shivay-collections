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
  Search
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { HeroBanner } from './HeroBanner';
import { ProductCard } from './ProductCard';
import { CATEGORIES, TESTIMONIALS } from '../data/products';

export const Storefront = () => {
  const { products, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useStore();

  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating'
  const [priceRange, setPriceRange] = useState(10000); // max price filter

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
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
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
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                Explore by Department
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Carefully curated for men, women, kids of all ages, and luxury cosmetics
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { id: 'women', label: 'Women’s Collection', desc: 'Sarees, Kurtis & Lehengas', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80' },
              { id: 'men', label: 'Men’s Collection', desc: 'Silk Kurtas, Shirts & Chinos', img: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=500&q=80' },
              { id: 'kids', label: 'Kids & Teens', desc: 'Festive, Party & Daily Wear', img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=500&q=80' },
              { id: 'cosmetics', label: 'Cosmetics & Beauty', desc: '24K Serums & French Oud', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80' },
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

        {/* Filter and Subcategory Bar */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Subcategory Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mr-1 hidden sm:inline">
                Type:
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

            {/* Sort & Search info */}
            <div className="flex items-center gap-3 self-end md:self-auto">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-500 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-400"
                >
                  <option value="featured">Featured & Trending</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated ★</option>
                </select>
              </div>
            </div>

          </div>

          {/* Active Filter summary */}
          {(selectedCategory !== 'all' || selectedSubcategory !== 'all' || searchQuery) && (
            <div className="flex items-center gap-2 pt-2 border-t border-stone-100 text-xs">
              <span className="text-stone-500 font-medium">Active filters:</span>
              {selectedCategory !== 'all' && (
                <span className="bg-brand-50 text-brand-800 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                  Department: {selectedCategory.toUpperCase()}
                  <button onClick={() => setSelectedCategory('all')}>✕</button>
                </span>
              )}
              {selectedSubcategory !== 'all' && (
                <span className="bg-brand-50 text-brand-800 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                  Style: {selectedSubcategory}
                  <button onClick={() => setSelectedSubcategory('all')}>✕</button>
                </span>
              )}
              {searchQuery && (
                <span className="bg-stone-100 text-stone-800 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                  Keyword: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}>✕</button>
                </span>
              )}
              <button 
                onClick={() => { setSelectedCategory('all'); setSelectedSubcategory('all'); setSearchQuery(''); }}
                className="text-stone-400 hover:text-stone-700 underline text-[11px] ml-auto"
              >
                Clear all filters
              </button>
            </div>
          )}

        </div>

        {/* Product Grid */}
        <div>
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
              <p className="font-serif text-lg font-bold text-stone-800">No products match your criteria</p>
              <p className="text-xs text-stone-500">Try adjusting your category or search term.</p>
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

        {/* Promotional Special Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider border border-brand-400/30">
              <Gift className="w-3.5 h-3.5 text-brand-400" />
              <span>Festive Gift Packaging Available</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-black">
              Dress the Entire Family in Pure Luxury
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Order matching ethnic ensembles for men, women, and kids with complimentary royal packaging and expedited doorstep delivery across all Indian cities.
            </p>
            <div className="pt-2">
              <button
                onClick={() => { setSelectedCategory('women'); window.scrollTo({ top: 500, behavior: 'smooth' }); }}
                className="px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-400 text-stone-950 font-bold text-xs transition shadow-lg"
              >
                Shop Festive Sets
              </button>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden md:block bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-400 to-transparent" />
        </div>

        {/* Customer Testimonials & Reviews Section */}
        <div className="space-y-6 pt-4">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-brand-700 text-xs font-bold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-brand-500 text-brand-500" />
              <span>Customer Praises</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Loved by 15,000+ Happy Customers
            </h3>
            <p className="text-xs text-stone-500">
              Real reviews from verified buyers of shivaycollections.com
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id}
                className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-stone-200"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-stone-900">{t.name}</h5>
                    <p className="text-[11px] text-stone-400">{t.city}, India</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
