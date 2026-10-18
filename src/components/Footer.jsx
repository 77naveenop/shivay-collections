import React from 'react';
import { Mail, Phone, MapPin, Globe, ShieldCheck, Heart, Sparkles, ArrowUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer = () => {
  const { setSelectedCategory, setActiveTab } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-column footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info with Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-400 shrink-0 bg-white shadow-md">
                <img src="/logo.jpg" alt="Shivay Collections Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-serif tracking-widest text-lg font-black text-white uppercase leading-none">
                  SHIVAY
                </h3>
                <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-brand-400 block mt-0.5">
                  COLLECTIONS
                </span>
                <span className="text-[10px] text-stone-400 font-medium">Clothing & Cosmetics Store</span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Your trusted family store in <strong>Barwar Kheri</strong> offering all kinds of clothes for men, women, kids of all ages, and beauty cosmetics.
            </p>

            <div className="pt-2 text-xs space-y-2 text-stone-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="text-stone-300">Barwar Kheri, India</span>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-brand-400 shrink-0" />
                <span className="text-stone-200 font-mono">shivaycollections.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span>support@shivaycollections.com</span>
              </p>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Departments
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => { setSelectedCategory('women'); setActiveTab('store'); scrollToTop(); }}
                  className="hover:text-brand-300 transition"
                >
                  Women's Wear (Sarees, Kurtis & Suits)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('men'); setActiveTab('store'); scrollToTop(); }}
                  className="hover:text-brand-300 transition"
                >
                  Men's Collection (Kurtas & Shirts)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('kids'); setActiveTab('store'); scrollToTop(); }}
                  className="hover:text-brand-300 transition"
                >
                  Kids & Teens (All Age Groups)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('cosmetics'); setActiveTab('store'); scrollToTop(); }}
                  className="hover:text-brand-300 transition"
                >
                  Cosmetics & Beauty Essentials
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Management & Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => { setActiveTab('admin'); scrollToTop(); }}
                  className="text-brand-300 font-bold hover:text-brand-200 transition"
                >
                  👑 Owner Dashboard Login
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('orders'); scrollToTop(); }}
                  className="hover:text-brand-300 transition"
                >
                  Track Order Status
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('domain-guide'); scrollToTop(); }}
                  className="hover:text-brand-300 transition"
                >
                  Domain Setup Guide
                </button>
              </li>
              <li><span className="hover:text-stone-300 cursor-pointer">Shipping & Delivery Policy</span></li>
            </ul>
          </div>

          {/* Payment Badges & Barwar Kheri Store Note */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Store Guarantee
            </h4>
            <p className="text-xs text-stone-400">
              Direct from Shivay Collections, Barwar Kheri. Quality checked before every doorstep dispatch.
            </p>

            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block mb-2">
                Accepted Payments
              </span>
              <div className="flex flex-wrap gap-2 text-[10px] font-bold text-stone-300">
                <span className="px-2 py-1 bg-stone-900 rounded border border-stone-800">UPI (GPay / PhonePe)</span>
                <span className="px-2 py-1 bg-stone-900 rounded border border-stone-800">RuPay & Cards</span>
                <span className="px-2 py-1 bg-stone-900 rounded border border-stone-800">NetBanking</span>
                <span className="px-2 py-1 bg-stone-900 rounded border border-stone-800">Cash on Delivery</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © 2026 <strong className="text-stone-300">Shivay Collections</strong> (shivaycollections.com) • Barwar Kheri. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-400 hover:text-white transition text-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
