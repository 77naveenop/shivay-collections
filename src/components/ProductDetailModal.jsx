import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Zap, ShieldCheck, Truck, RefreshCw, CheckCircle2, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductDetailModal = () => {
  const { selectedProduct, setSelectedProduct, addToCart, toggleWishlist, isInWishlist, setIsCheckoutOpen } = useStore();
  
  if (!selectedProduct) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    Array.isArray(selectedProduct.sizes) && selectedProduct.sizes.length > 0 
      ? selectedProduct.sizes[0] 
      : 'Standard'
  );
  const [selectedColor, setSelectedColor] = useState(
    Array.isArray(selectedProduct.colorNames) && selectedProduct.colorNames.length > 0 
      ? selectedProduct.colorNames[0] 
      : 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  const wishlisted = isInWishlist(selectedProduct.id);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus({
        valid: true,
        message: `Delivery available to ${pincode}! Estimated: 2-4 business days. COD supported.`
      });
    } else {
      setPincodeStatus({
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN Code.'
      });
    }
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-stone-950/75 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-3xl lg:max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-white/90 hover:bg-stone-100 text-stone-700 shadow-sm transition"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image Preview */}
          <div className="p-4 sm:p-6 bg-stone-50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-stone-100">
            <div className="relative aspect-[4/5] w-full max-w-sm rounded-2xl overflow-hidden bg-white shadow-inner mb-3">
              <img
                src={selectedProduct.images ? (selectedProduct.images[activeImageIdx] || selectedProduct.images[0]) : '/logo.jpg'}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-top"
              />
              {selectedProduct.badge && (
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-stone-900 text-brand-300 shadow">
                  {selectedProduct.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {selectedProduct.images && selectedProduct.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-12 h-14 rounded-lg overflow-hidden border-2 transition ${
                      activeImageIdx === idx ? 'border-brand-500' : 'border-stone-200 opacity-70'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="p-5 sm:p-7 space-y-4">
            
            <div>
              <div className="flex items-center gap-1.5 mb-1 text-[10px] font-bold uppercase tracking-wider text-brand-700">
                <span className="bg-brand-50 px-2 py-0.5 rounded">
                  {selectedProduct.category?.toUpperCase()} • {selectedProduct.subcategory || 'Store Item'}
                </span>
              </div>

              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                {selectedProduct.name}
              </h2>
            </div>

            {/* Price Box */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-black text-stone-900">
                    {formatPrice(selectedProduct.price)}
                  </span>
                  {selectedProduct.originalPrice > selectedProduct.price && (
                    <span className="text-xs text-stone-400 line-through">
                      {formatPrice(selectedProduct.originalPrice)}
                    </span>
                  )}
                  {selectedProduct.discount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                      {selectedProduct.discount}% OFF
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-stone-500 mt-0.5">All taxes included • Shivay Collections</p>
              </div>

              <button
                onClick={() => toggleWishlist(selectedProduct)}
                className={`p-2.5 rounded-full border transition ${
                  wishlisted ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* Description */}
            <p className="text-stone-600 text-xs leading-relaxed">
              {selectedProduct.description || 'Authentic quality product from Shivay Collections, Barwar Kheri.'}
            </p>

            {/* Sizes */}
            {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-stone-800 uppercase tracking-wide block">
                  Select Size / Option:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(Array.isArray(selectedProduct.sizes) ? selectedProduct.sizes : [selectedProduct.sizes]).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                        selectedSize === sz
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-2 text-stone-600 hover:bg-stone-200 font-bold text-xs"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-bold text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-2 text-stone-600 hover:bg-stone-200 font-bold text-xs"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(selectedProduct, selectedSize, selectedColor, quantity)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-98"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-brand-300" />
                  <span>Add to Bag</span>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition active:scale-98"
              >
                <Zap className="w-4 h-4 fill-stone-950" />
                <span>Buy Now with Instant Checkout</span>
              </button>
            </div>

            {/* Delivery Checker */}
            <div className="pt-2 border-t border-stone-100">
              <form onSubmit={handleCheckPincode} className="space-y-1.5">
                <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wide">
                  Check Delivery PIN Code
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit PIN code"
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-stone-200"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition"
                  >
                    Check
                  </button>
                </div>
                {pincodeStatus && (
                  <p className={`text-[11px] mt-1 ${pincodeStatus.valid ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {pincodeStatus.message}
                  </p>
                )}
              </form>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
