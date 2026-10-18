import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setSelectedProduct } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');

  const wishlisted = isInWishlist(product.id);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 cursor-pointer" onClick={() => setSelectedProduct(product)}>
        
        {/* Main Image */}
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Overlay gradient on bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-stone-900 text-brand-300 shadow-md">
              {product.badge}
            </span>
          )}
          {product.discount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white shadow-md">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 shadow-md ${
            wishlisted
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 hover:bg-white text-stone-700 hover:text-rose-500'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute bottom-3 inset-x-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="flex-1 py-2.5 rounded-xl bg-white/95 text-stone-900 hover:bg-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg backdrop-blur-sm transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-medium uppercase tracking-wider text-[11px] text-brand-700">
              {product.subcategory}
            </span>
            <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60 text-amber-800 text-[11px] font-semibold">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{product.rating}</span>
              <span className="text-stone-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => setSelectedProduct(product)}
            className="font-medium text-stone-900 text-sm line-clamp-2 hover:text-brand-700 cursor-pointer transition leading-snug"
          >
            {product.name}
          </h3>

          {/* Size Selectors (if clothing or multiple sizes) */}
          {product.sizes && product.sizes.length > 1 && (
            <div className="flex flex-wrap gap-1 mt-2.5">
              {product.sizes.slice(0, 4).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2 py-0.5 text-[10px] font-semibold rounded border transition ${
                    selectedSize === size
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {size}
                </button>
              ))}
              {product.sizes.length > 4 && (
                <span className="text-[10px] text-stone-400 self-center">
                  +{product.sizes.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Pricing & Add to Bag */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-stone-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-[10px] text-emerald-700 font-medium">In Stock • Fast Delivery</p>
          </div>

          <button
            onClick={() => addToCart(product, selectedSize)}
            className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-brand-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            title="Add to Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

      </div>
    </div>
  );
};
