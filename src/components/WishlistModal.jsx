import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WishlistModal = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart, setSelectedProduct } = useStore();

  if (!isWishlistOpen) return null;

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h2 className="font-serif text-lg font-bold text-stone-900">Your Wishlist</h2>
              <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-800 text-xs font-bold">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto text-rose-400">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-800">Your wishlist is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Click the heart icon on any outfit or perfume you adore to save it for later!
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-bold hover:bg-brand-600 transition shadow"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlist.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-2xl border border-stone-200 bg-white hover:border-stone-300 transition"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-24 object-cover object-top rounded-xl bg-stone-100 shrink-0 cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(item);
                      setIsWishlistOpen(false);
                    }}
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 
                          className="text-xs font-semibold text-stone-900 line-clamp-2 cursor-pointer hover:text-brand-700"
                          onClick={() => {
                            setSelectedProduct(item);
                            setIsWishlistOpen(false);
                          }}
                        >
                          {item.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(item)}
                          className="text-stone-400 hover:text-rose-600 p-1 transition"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs font-extrabold text-stone-900 mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          addToCart(item);
                          toggleWishlist(item);
                        }}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-stone-900 hover:bg-brand-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-stone-200 bg-stone-50">
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="w-full py-3 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition"
            >
              Continue Shopping
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
