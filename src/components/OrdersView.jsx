import React from 'react';
import { Package, Truck, CheckCircle2, Clock, MapPin, ArrowRight, ExternalLink } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrdersView = () => {
  const { orders, setActiveTab, setSelectedProduct } = useStore();

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-stone-200">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            My Orders & Tracking
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Track live dispatch status of your outfits and cosmetics from Shivay Collections
          </p>
        </div>

        <button
          onClick={() => setActiveTab('store')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-stone-900 hover:bg-brand-600 text-white text-xs font-bold transition"
        >
          Browse More Items
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900">No active orders found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Once you place an order with Razorpay or Cash on Delivery, it will appear here with real-time tracking updates.
          </p>
          <button
            onClick={() => setActiveTab('store')}
            className="px-6 py-2.5 rounded-full bg-brand-500 text-stone-950 font-bold text-xs hover:bg-brand-400 transition shadow"
          >
            Start Shopping Now
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((ord) => (
            <div 
              key={ord.id}
              className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-5 sm:px-6 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-stone-900 bg-stone-200 px-2.5 py-1 rounded">
                    {ord.id}
                  </span>
                  <span className="text-stone-500">Placed on {ord.date}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-bold text-stone-900">
                    Total: <strong className="text-brand-700">{formatPrice(ord.total)}</strong>
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                    ord.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {ord.status}
                  </span>
                </div>
              </div>

              {/* Progress Steps Timeline */}
              <div className="px-6 py-5 border-b border-stone-100">
                <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-semibold">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-stone-900">Order Placed</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 ${
                      ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'].includes(ord.status)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-200 text-stone-500'
                    }`}>
                      <Package className="w-4 h-4" />
                    </div>
                    <span className="text-stone-800">Packed</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 ${
                      ['Shipped', 'Out for Delivery', 'Delivered'].includes(ord.status)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-200 text-stone-500'
                    }`}>
                      <Truck className="w-4 h-4" />
                    </div>
                    <span className="text-stone-800">Shipped</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 ${
                      ord.status === 'Delivered'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-200 text-stone-500'
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-stone-800">Delivered</span>
                  </div>
                </div>
              </div>

              {/* Item Details */}
              <div className="p-6 divide-y divide-stone-100">
                {ord.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center gap-4 first:pt-0 last:pb-0">
                    <img
                      src={item.images ? item.images[0] : item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover object-top rounded-xl bg-stone-100 shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="text-xs sm:text-sm font-semibold text-stone-900">{item.name}</h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Qty: {item.quantity} • Size: {item.selectedSize} • Color: {item.selectedColor}
                      </p>
                      <p className="text-xs font-bold text-stone-900 mt-1">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const msg = encodeURIComponent(`Hello Shivay Support, I would like an update for my order ${ord.id} - ${item.name}`);
                        window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
                      }}
                      className="text-xs font-bold text-brand-700 hover:text-brand-800 px-3 py-1.5 rounded-lg border border-brand-200 bg-brand-50 hover:bg-brand-100 transition hidden sm:flex items-center gap-1"
                    >
                      <span>Need Help?</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Delivery Address & Payment Method Footer */}
              <div className="p-4 px-6 bg-stone-50 border-t border-stone-100 flex flex-wrap items-center justify-between text-xs text-stone-500 gap-2">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>Delivering to: <strong className="text-stone-800">{ord.customer.address}</strong></span>
                </span>
                <span>Payment: <strong className="text-stone-800">{ord.paymentMethod}</strong></span>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
