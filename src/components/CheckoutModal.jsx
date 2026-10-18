import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Smartphone, 
  Banknote, 
  Building2, 
  MapPin, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Delhi NCR',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab',
  'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export const CheckoutModal = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    discountAmount, 
    shippingFee, 
    grandTotal, 
    createOrder,
    appliedCoupon
  } = useStore();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success Confirmation
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Delhi NCR',
    pincode: '',
    paymentMethod: 'upi', // 'upi', 'card', 'netbanking', 'cod'
    upiApp: 'gpay', // 'gpay', 'phonepe', 'paytm'
    shippingMethod: 'standard'
  });

  const [errors, setErrors] = useState({});

  if (!isCheckoutOpen) return null;

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const validateShippingForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errs.phone = 'Valid 10-digit mobile number required';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email is required for tracking';
    }
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.pincode.trim() || formData.pincode.length !== 6) {
      errs.pincode = 'Valid 6-digit postal PIN code required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextToPayment = (e) => {
    e.preventDefault();
    if (validateShippingForm()) {
      setStep(2);
    }
  };

  const handleCompleteOrder = () => {
    setIsProcessingPayment(true);

    // Simulate payment gateway processing
    setTimeout(() => {
      const order = createOrder({
        customer: {
          name: formData.name,
          phone: `+91 ${formData.phone}`,
          email: formData.email,
          address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`
        },
        shippingOption: formData.shippingMethod === 'express' ? 'Express Air' : 'Standard Surface',
        paymentMethod: 
          formData.paymentMethod === 'upi' ? `Razorpay UPI (${formData.upiApp.toUpperCase()})` :
          formData.paymentMethod === 'card' ? 'Razorpay Debit / Credit Card' :
          formData.paymentMethod === 'netbanking' ? 'Razorpay NetBanking' : 'Cash on Delivery (COD)'
      });

      setConfirmedOrder(order);
      setIsProcessingPayment(false);
      setStep(3);

      // Trigger Confetti!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-950/70 backdrop-blur-sm animate-fadeIn">
      
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-brand-400 flex items-center justify-center font-serif text-lg font-bold">
              S
            </div>
            <div>
              <h2 className="font-serif text-base font-bold text-stone-900">
                {step === 3 ? 'Order Confirmed!' : 'Shivay Collections Checkout'}
              </h2>
              <p className="text-[11px] text-stone-500">Official Store: shivaycollections.com</p>
            </div>
          </div>

          {step !== 3 && (
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-2 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-200 transition"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Multi-step progress bar */}
        {step !== 3 && (
          <div className="px-6 py-3 bg-white border-b border-stone-100 flex items-center justify-between text-xs font-semibold">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-brand-700' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-brand-500 text-stone-950 font-black' : 'bg-stone-200 text-stone-600'}`}>1</span>
              <span>Shipping Address</span>
            </div>
            <div className="h-0.5 flex-1 mx-3 bg-stone-200">
              <div className={`h-full bg-brand-500 transition-all ${step === 2 ? 'w-full' : 'w-0'}`} />
            </div>
            <div className={`flex items-center gap-1.5 ${step === 2 ? 'text-brand-700' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-brand-500 text-stone-950 font-black' : 'bg-stone-200 text-stone-600'}`}>2</span>
              <span>Payment & Gateway</span>
            </div>
          </div>
        )}

        {/* Step 1: Shipping Details */}
        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            
            <form onSubmit={handleNextToPayment} className="space-y-4">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600" />
                <span>Delivery Address (Pan-India)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
                  />
                  {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Mobile Number (for SMS & WhatsApp Tracking) *</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-stone-200 bg-stone-100 text-stone-500 text-xs">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="9876543210"
                      className="w-full px-3.5 py-2.5 text-xs rounded-r-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rahul.sharma@example.com"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
                />
                {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Flat / House No. / Building / Street *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Flat 304, Royal Palms, Link Road"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
                />
                {errors.address && <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">City / District *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Jaipur"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
                  />
                  {errors.city && <p className="text-[11px] text-rose-600 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-400"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">PIN Code (6 digits) *</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="302001"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
                  />
                  {errors.pincode && <p className="text-[11px] text-rose-600 mt-1">{errors.pincode}</p>}
                </div>
              </div>

              {/* Order summary small banner */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-stone-900">{cart.length} items in cart</p>
                  <p className="text-stone-500">Total: <strong className="text-brand-700">{formatPrice(grandTotal)}</strong></p>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-brand-600 text-white font-bold text-xs flex items-center gap-2 transition shadow"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

          </div>
        )}

        {/* Step 2: Payment Selection & Razorpay simulation */}
        {step === 2 && (
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Select Payment Mode</span>
              </h3>
              <button
                onClick={() => setStep(1)}
                className="text-xs text-brand-700 hover:underline font-semibold"
              >
                ← Edit Address
              </button>
            </div>

            {/* Payment Method Cards */}
            <div className="grid grid-cols-1 gap-3">
              
              {/* UPI (Razorpay) */}
              <label className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3 ${
                formData.paymentMethod === 'upi' ? 'border-brand-500 bg-brand-50/40' : 'border-stone-200 hover:border-stone-300'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-stone-900 flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      Razorpay UPI (Fastest & 100% Free)
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      Instant Approval
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Pay using Google Pay, PhonePe, Paytm, BHIM, or any UPI app.
                  </p>

                  {formData.paymentMethod === 'upi' && (
                    <div className="flex gap-2 mt-3">
                      {['gpay', 'phonepe', 'paytm'].map((app) => (
                        <button
                          key={app}
                          type="button"
                          onClick={() => setFormData({ ...formData, upiApp: app })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border uppercase transition ${
                            formData.upiApp === app
                              ? 'bg-stone-900 text-white border-stone-900'
                              : 'bg-white text-stone-700 border-stone-200'
                          }`}
                        >
                          {app === 'gpay' ? 'Google Pay' : app === 'phonepe' ? 'PhonePe' : 'Paytm'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </label>

              {/* Debit / Credit Cards */}
              <label className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3 ${
                formData.paymentMethod === 'card' ? 'border-brand-500 bg-brand-50/40' : 'border-stone-200 hover:border-stone-300'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-stone-900 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      Debit / Credit Cards (RuPay, Visa, MasterCard)
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    All major Indian banks with 3D Secure OTP verification.
                  </p>
                </div>
              </label>

              {/* NetBanking */}
              <label className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3 ${
                formData.paymentMethod === 'netbanking' ? 'border-brand-500 bg-brand-50/40' : 'border-stone-200 hover:border-stone-300'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={formData.paymentMethod === 'netbanking'}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-stone-900 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-purple-600" />
                      NetBanking (50+ Indian Banks)
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    HDFC, SBI, ICICI, Axis, Kotak Mahindra, PNB, and more.
                  </p>
                </div>
              </label>

              {/* Cash on Delivery (COD) */}
              <label className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3 ${
                formData.paymentMethod === 'cod' ? 'border-brand-500 bg-brand-50/40' : 'border-stone-200 hover:border-stone-300'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-stone-900 flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-amber-600" />
                      Cash on Delivery (COD)
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                      Pay at Doorstep
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Pay with Cash or scan Delivery Partner UPI QR upon arrival.
                  </p>
                </div>
              </label>

            </div>

            {/* Total Summary Breakdown */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Delivery Charges</span>
                <span>{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-stone-900 pt-2 border-t border-stone-200">
                <span>Payable Amount</span>
                <span className="text-brand-700 text-base">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Pay Now Button */}
            <button
              onClick={handleCompleteOrder}
              disabled={isProcessingPayment}
              className="w-full py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-brand-500/25 transition transform active:scale-98"
            >
              {isProcessingPayment ? (
                <>
                  <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing via Razorpay Secure Gateway...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {formData.paymentMethod === 'cod' ? 'Confirm Order with Cash on Delivery' : `Pay ${formatPrice(grandTotal)} Now`}
                  </span>
                </>
              )}
            </button>

          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 3 && confirmedOrder && (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Thank you, {confirmedOrder.customer.name.split(' ')[0]}!
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Your order has been placed successfully at <strong className="text-stone-800">shivaycollections.com</strong>
              </p>
            </div>

            {/* Order Card info */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 max-w-md mx-auto text-left text-xs space-y-2.5">
              <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                <span className="text-stone-500">Order ID:</span>
                <span className="font-mono font-bold text-stone-900 bg-stone-200 px-2 py-0.5 rounded">
                  {confirmedOrder.id}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-stone-500">Payment Status:</span>
                <span className="font-bold text-emerald-700">{confirmedOrder.paymentMethod}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-stone-500">Estimated Delivery:</span>
                <span className="font-semibold text-stone-800">
                  {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-stone-500">Delivery Address:</span>
                <span className="font-medium text-stone-800 text-right max-w-[200px] truncate">
                  {confirmedOrder.customer.address}
                </span>
              </div>

              <div className="flex justify-between pt-2 border-t border-stone-200 font-bold text-stone-900">
                <span>Total Paid:</span>
                <span className="text-brand-700 text-sm">{formatPrice(confirmedOrder.total)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setStep(1);
                }}
                className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition"
              >
                Continue Shopping
              </button>

              <button
                onClick={() => {
                  const msg = encodeURIComponent(`Hi Shivay Collections! I have placed order ${confirmedOrder.id} for ${formatPrice(confirmedOrder.total)}.`);
                  window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
                }}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <span>WhatsApp Order Updates</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
