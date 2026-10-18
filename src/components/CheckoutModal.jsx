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
  'Uttar Pradesh', 'Delhi NCR', 'Rajasthan', 'Haryana', 'Punjab',
  'Bihar', 'Madhya Pradesh', 'Maharashtra', 'Gujarat', 'Uttarakhand',
  'Chandigarh', 'Himachal Pradesh', 'Jammu & Kashmir', 'Jharkhand',
  'Karnataka', 'Kerala', 'Tamil Nadu', 'Telangana', 'Andhra Pradesh',
  'Assam', 'West Bengal', 'Goa', 'Chhattisgarh', 'Odisha'
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

  const [step, setStep] = useState(1);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Uttar Pradesh',
    pincode: '',
    paymentMethod: 'upi',
    upiApp: 'gpay',
    shippingMethod: 'standard'
  });

  const [errors, setErrors] = useState({});

  if (!isCheckoutOpen) return null;

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const validateShippingForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errs.phone = 'Valid 10-digit mobile required';
    }
    if (!formData.address.trim()) errs.address = 'Delivery address is required';
    if (!formData.city.trim()) errs.city = 'City / Town required';
    if (!formData.pincode.trim() || formData.pincode.length !== 6) {
      errs.pincode = '6-digit PIN code required';
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

    setTimeout(() => {
      const order = createOrder({
        customer: {
          name: formData.name,
          phone: `+91 ${formData.phone}`,
          email: formData.email || 'customer@shivaycollections.com',
          address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`
        },
        shippingOption: 'Standard Surface Delivery',
        paymentMethod: 
          formData.paymentMethod === 'upi' ? `Razorpay UPI (${formData.upiApp.toUpperCase()})` :
          formData.paymentMethod === 'card' ? 'Debit / Credit Card' :
          formData.paymentMethod === 'netbanking' ? 'NetBanking' : 'Cash on Delivery (COD)'
      });

      setConfirmedOrder(order);
      setIsProcessingPayment(false);
      setStep(3);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto bg-stone-950/75 backdrop-blur-sm animate-fadeIn">
      
      <div 
        className="relative w-full max-w-xl sm:max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-brand-400 shrink-0">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-serif text-sm sm:text-base font-bold text-stone-900 leading-none">
                {step === 3 ? 'Order Placed!' : 'Checkout • Shivay Collections'}
              </h2>
              <p className="text-[10px] text-stone-500 mt-0.5">Barwar Kheri • shivaycollections.com</p>
            </div>
          </div>

          {step !== 3 && (
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-200 transition"
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>

        {/* Progress indicators */}
        {step !== 3 && (
          <div className="px-4 py-2.5 bg-white border-b border-stone-100 flex items-center justify-between text-[11px] font-semibold">
            <div className={`flex items-center gap-1 ${step >= 1 ? 'text-brand-700' : 'text-stone-400'}`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${step >= 1 ? 'bg-brand-500 text-stone-950 font-black' : 'bg-stone-200'}`}>1</span>
              <span>Address</span>
            </div>
            <div className="h-0.5 flex-1 mx-2 bg-stone-200">
              <div className={`h-full bg-brand-500 transition-all ${step === 2 ? 'w-full' : 'w-0'}`} />
            </div>
            <div className={`flex items-center gap-1 ${step === 2 ? 'text-brand-700' : 'text-stone-400'}`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${step === 2 ? 'bg-brand-500 text-stone-950 font-black' : 'bg-stone-200'}`}>2</span>
              <span>Payment</span>
            </div>
          </div>
        )}

        {/* Step 1: Shipping Form */}
        {step === 1 && (
          <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <form onSubmit={handleNextToPayment} className="space-y-3.5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
                  />
                  {errors.name && <p className="text-[10px] text-rose-600 mt-0.5">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">Mobile (WhatsApp Tracking) *</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-xl border border-r-0 border-stone-200 bg-stone-100 text-stone-500 text-xs">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="9876543210"
                      className="w-full px-3 py-2 text-xs rounded-r-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-rose-600 mt-0.5">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">Street / House No. / Landmark *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Near Main Market, Ward No. 4"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
                />
                {errors.address && <p className="text-[10px] text-rose-600 mt-0.5">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">City / District *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="City"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
                  />
                  {errors.city && <p className="text-[10px] text-rose-600 mt-0.5">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">PIN Code (6 digits) *</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="PIN Code"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
                  />
                  {errors.pincode && <p className="text-[10px] text-rose-600 mt-0.5">{errors.pincode}</p>}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-stone-900">{cart.length} items</p>
                  <p className="text-xs text-brand-700 font-extrabold">{formatPrice(grandTotal)}</p>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-brand-600 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
                >
                  <span>Select Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </form>
          </div>
        )}

        {/* Step 2: Payment Mode */}
        {step === 2 && (
          <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-stone-900 uppercase">Payment Method</span>
              <button onClick={() => setStep(1)} className="text-xs text-brand-700 font-semibold underline">
                ← Edit Address
              </button>
            </div>

            <div className="space-y-2.5">
              {/* UPI */}
              <label className={`p-3 rounded-2xl border-2 cursor-pointer transition flex items-start gap-2.5 ${
                formData.paymentMethod === 'upi' ? 'border-brand-500 bg-brand-50/40' : 'border-stone-200'
              }`}>
                <input
                  type="radio"
                  name="pm"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="mt-1"
                />
                <div className="flex-1">
                  <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                    UPI (Google Pay, PhonePe, Paytm, BHIM)
                  </span>
                  <p className="text-[10px] text-stone-500 mt-0.5">Instant online payment direct to store</p>
                </div>
              </label>

              {/* COD */}
              <label className={`p-3 rounded-2xl border-2 cursor-pointer transition flex items-start gap-2.5 ${
                formData.paymentMethod === 'cod' ? 'border-brand-500 bg-brand-50/40' : 'border-stone-200'
              }`}>
                <input
                  type="radio"
                  name="pm"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="mt-1"
                />
                <div className="flex-1">
                  <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                    <Banknote className="w-3.5 h-3.5 text-amber-600" />
                    Cash on Delivery (COD)
                  </span>
                  <p className="text-[10px] text-stone-500 mt-0.5">Pay at doorstep upon arrival</p>
                </div>
              </label>

              {/* Cards */}
              <label className={`p-3 rounded-2xl border-2 cursor-pointer transition flex items-start gap-2.5 ${
                formData.paymentMethod === 'card' ? 'border-brand-500 bg-brand-50/40' : 'border-stone-200'
              }`}>
                <input
                  type="radio"
                  name="pm"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="mt-1"
                />
                <div className="flex-1">
                  <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                    Debit / Credit Cards (RuPay, Visa, MasterCard)
                  </span>
                </div>
              </label>
            </div>

            {/* Total and Order Button */}
            <div className="pt-2 border-t border-stone-200 space-y-2">
              <div className="flex justify-between text-xs font-bold text-stone-900">
                <span>Total Amount:</span>
                <span className="text-brand-700 text-sm">{formatPrice(grandTotal)}</span>
              </div>

              <button
                onClick={handleCompleteOrder}
                disabled={isProcessingPayment}
                className="w-full py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-98"
              >
                {isProcessingPayment ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Confirm Order ({formatPrice(grandTotal)})</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* Step 3: Success Screen */}
        {step === 3 && confirmedOrder && (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Order Placed Successfully!
              </h3>
              <p className="text-xs text-stone-500">
                Shivay Collections, Barwar Kheri has received your order.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-left max-w-sm mx-auto space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-500">Order ID:</span>
                <span className="font-mono font-bold text-stone-900">{confirmedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment:</span>
                <span className="font-bold text-stone-800">{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between font-bold text-stone-900 pt-1 border-t border-stone-200">
                <span>Total:</span>
                <span className="text-brand-700">{formatPrice(confirmedOrder.total)}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => { setIsCheckoutOpen(false); setStep(1); }}
                className="px-5 py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  const msg = encodeURIComponent(`Namaste Shivay Collections! I placed order ${confirmedOrder.id}.`);
                  window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1"
              >
                <span>WhatsApp Updates</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
