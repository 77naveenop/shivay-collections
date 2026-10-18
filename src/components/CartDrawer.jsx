import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    discountAmount,
    shippingFee,
    grandTotal,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    setIsCheckoutOpen
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCouponCode(couponInput);
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-600" />
              <h2 className="font-serif text-lg font-bold text-stone-900">Your Shopping Bag</h2>
              <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-800 text-xs font-bold">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-brand-50 px-5 py-3 border-b border-brand-100 text-xs">
            {amountNeeded > 0 ? (
              <p className="text-stone-700 font-medium mb-1.5 flex items-center justify-between">
                <span>Add <strong className="text-brand-800 font-bold">{formatPrice(amountNeeded)}</strong> more for <strong>FREE Delivery</strong></span>
                <span className="text-[11px] text-stone-500">{progressPercent}%</span>
              </p>
            ) : (
              <p className="text-emerald-800 font-bold flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Congratulations! You qualify for <strong>FREE Express Delivery</strong></span>
              </p>
            )}
            <div className="w-full bg-brand-200/60 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-brand-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-800">Your bag is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Looks like you haven’t added any apparel or cosmetics yet. Explore our handcrafted collections!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-bold hover:bg-brand-600 transition shadow"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.cartItemId}
                  className="flex gap-3.5 p-3 rounded-2xl border border-stone-200/90 bg-white hover:border-stone-300 transition"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-24 object-cover object-top rounded-xl bg-stone-100 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-stone-400 hover:text-rose-600 p-1 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Size: <span className="font-semibold text-stone-700">{item.selectedSize}</span> | Color: <span className="font-semibold text-stone-700">{item.selectedColor}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <div className="text-right">
                        <p className="text-xs font-bold text-stone-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-[10px] text-stone-400">
                            {formatPrice(item.price)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              
              {/* Coupon Section */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span>Coupon <strong className="font-bold">{appliedCoupon.code}</strong> applied ({formatPrice(discountAmount)} saved)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-stone-500 hover:text-stone-800 font-bold ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Coupon code (e.g. SHIVAY10)"
                        className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-400 uppercase font-semibold"
                      />
                      <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
                
                {/* Quick Coupon Suggestions */}
                {!appliedCoupon && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => applyCouponCode('SHIVAY10')}
                      className="text-[10px] font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded-md hover:bg-brand-100 transition"
                    >
                      SHIVAY10 (10% OFF)
                    </button>
                    <button
                      onClick={() => applyCouponCode('FESTIVE500')}
                      className="text-[10px] font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded-md hover:bg-brand-100 transition"
                    >
                      FESTIVE500 (₹500 OFF)
                    </button>
                  </div>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatPrice(cartSubtotal)}</span>
                </div>
                
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount Savings</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : formatPrice(shippingFee)}</span>
                </div>

                <div className="flex justify-between text-sm font-black text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Amount</span>
                  <span className="text-base text-brand-700">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition transform active:scale-98"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>SSL Encrypted Checkout • Razorpay UPI & COD</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
