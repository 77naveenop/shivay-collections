import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Zap, ShieldCheck, Truck, RefreshCw, CheckCircle2, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductDetailModal = () => {
  const { selectedProduct, setSelectedProduct, addToCart, toggleWishlist, isInWishlist, setIsCheckoutOpen } = useStore();
  
  if (!selectedProduct) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(selectedProduct.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colorNames ? selectedProduct.colorNames[0] : 'Default');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  const wishlisted = isInWishlist(selectedProduct.id);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus({
        valid: true,
        message: `Delivery available to ${pincode} by ${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}. Cash on Delivery available!`
      });
    } else {
      setPincodeStatus({
        valid: false,
        message: 'Please enter a valid 6-digit Indian Postal PIN Code.'
      });
    }
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-950/70 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200/90 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image Gallery */}
          <div className="p-4 sm:p-6 bg-stone-50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-stone-100">
            {/* Main Preview Image */}
            <div className="relative aspect-[4/5] w-full max-w-md rounded-2xl overflow-hidden bg-white shadow-inner mb-4">
              <img
                src={selectedProduct.images[activeImageIdx] || selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-top"
              />
              {selectedProduct.badge && (
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-stone-900 text-brand-300 shadow">
                  {selectedProduct.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {selectedProduct.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition ${
                      activeImageIdx === idx ? 'border-brand-500 ring-2 ring-brand-300/50' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="p-6 sm:p-8 space-y-5">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                  {selectedProduct.category.toUpperCase()} • {selectedProduct.subcategory}
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span className="font-bold">{selectedProduct.rating}</span>
                  <span className="text-stone-500">({selectedProduct.reviewCount} customer reviews)</span>
                </div>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                {selectedProduct.name}
              </h2>
            </div>

            {/* Price section */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-black text-stone-900">
                    {formatPrice(selectedProduct.price)}
                  </span>
                  {selectedProduct.originalPrice > selectedProduct.price && (
                    <span className="text-sm text-stone-400 line-through">
                      {formatPrice(selectedProduct.originalPrice)}
                    </span>
                  )}
                  {selectedProduct.discount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                      Save {selectedProduct.discount}%
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-500 mt-0.5">Inclusive of all taxes & GST</p>
              </div>

              <button
                onClick={() => toggleWishlist(selectedProduct)}
                className={`p-3 rounded-full border transition ${
                  wishlisted ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* Description */}
            <p className="text-stone-600 text-sm leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Features Bullet points */}
            {selectedProduct.features && (
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-800">Highlights</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-600">
                  {selectedProduct.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {selectedProduct.sizes && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-stone-800 uppercase tracking-wide">Select Size / Volume</span>
                  <span className="text-brand-700 underline cursor-pointer hover:text-brand-800">Size & Fit Guide</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                        selectedSize === sz
                          ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {selectedProduct.colorNames && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wide block">
                  Color: <span className="font-normal text-stone-600">{selectedColor}</span>
                </span>
                <div className="flex gap-2">
                  {selectedProduct.colorNames.map((colorName, idx) => {
                    const hex = selectedProduct.colors ? selectedProduct.colors[idx] : '#000000';
                    return (
                      <button
                        key={colorName}
                        onClick={() => setSelectedColor(colorName)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition ${
                          selectedColor === colorName
                            ? 'border-brand-500 bg-brand-50/70 font-semibold text-brand-900'
                            : 'border-stone-200 hover:border-stone-300 text-stone-600'
                        }`}
                      >
                        <span 
                          className="w-3 h-3 rounded-full border border-stone-300"
                          style={{ backgroundColor: hex }}
                        />
                        <span>{colorName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-200 transition font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-xs font-bold text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-200 transition font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(selectedProduct, selectedSize, selectedColor, quantity)}
                  className="flex-1 py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition"
                >
                  <ShoppingBag className="w-4 h-4 text-brand-300" />
                  <span>Add to Bag</span>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 transition transform active:scale-98"
              >
                <Zap className="w-4 h-4 fill-stone-950" />
                <span>Buy Now with 1-Click Checkout</span>
              </button>
            </div>

            {/* PIN Code Delivery Checker */}
            <div className="pt-3 border-t border-stone-100">
              <form onSubmit={handleCheckPincode} className="space-y-2">
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wide">
                  Check Delivery Time & COD
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter 6-digit PIN code (e.g. 110001)"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
                    />
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition"
                  >
                    Check
                  </button>
                </div>
                {pincodeStatus && (
                  <p className={`text-xs mt-1.5 flex items-center gap-1.5 ${pincodeStatus.valid ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {pincodeStatus.valid && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                    <span>{pincodeStatus.message}</span>
                  </p>
                )}
              </form>
            </div>

            {/* Delivery & Return Policies */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-stone-600">
              <div className="p-2 rounded-xl bg-stone-50 border border-stone-100">
                <Truck className="w-4 h-4 mx-auto mb-1 text-stone-700" />
                <span>Express Delivery</span>
              </div>
              <div className="p-2 rounded-xl bg-stone-50 border border-stone-100">
                <RefreshCw className="w-4 h-4 mx-auto mb-1 text-stone-700" />
                <span>7-Day Return</span>
              </div>
              <div className="p-2 rounded-xl bg-stone-50 border border-stone-100">
                <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-stone-700" />
                <span>Genuine Guaranteed</span>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
