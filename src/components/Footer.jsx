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
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-stone-900 border border-brand-500/40 text-brand-400 flex items-center justify-center font-serif text-xl font-bold">
                S
              </span>
              <div>
                <h3 className="font-serif tracking-widest text-lg font-black text-white uppercase leading-none">
                  SHIVAY
                </h3>
                <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-brand-400 block mt-0.5">
                  COLLECTIONS
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Your premier online destination for handcrafted Indian traditional wear, modern western fashion for all age groups, and pure Ayurvedic skincare & cosmetics.
            </p>

            <div className="pt-2 text-xs space-y-2 text-stone-400">
              <p className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-brand-400 shrink-0" />
                <span className="text-stone-200 font-mono">shivaycollections.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <span>+91 98765 43210 (Mon - Sat, 10 AM - 7 PM)</span>
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
                  Women's Banarasi Sarees & Kurtis
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('men'); setActiveTab('store'); scrollToTop(); }}
                  className="hover:text-brand-300 transition"
                >
                  Men's Raw Silk Kurtas & Shirts
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('kids'); setActiveTab('store'); scrollToTop(); }}
                  className="hover:text-brand-300 transition"
                >
                  Kids & Teens Festive & Party Wear
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('cosmetics'); setActiveTab('store'); scrollToTop(); }}
                  className="hover:text-brand-300 transition"
                >
                  24K Gold Serums & Kannauj Perfumes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('all'); setActiveTab('store'); scrollToTop(); }}
                  className="hover:text-brand-300 transition"
                >
                  Special Offers & Festive Deals
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Customer Services
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
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
                  Domain & Store Setup
                </button>
              </li>
              <li><span className="hover:text-stone-300 cursor-pointer">Shipping & Delivery Policy</span></li>
              <li><span className="hover:text-stone-300 cursor-pointer">7-Day Return & Exchange</span></li>
              <li><span className="hover:text-stone-300 cursor-pointer">Privacy Policy & Terms</span></li>
            </ul>
          </div>

          {/* Newsletter & Indian Payment Badges */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Stay Connected
            </h4>
            <p className="text-xs text-stone-400">
              Subscribe to get exclusive preview of new festive launches and coupon drops.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-brand-500"
              />
              <button 
                onClick={() => alert('Thank you for subscribing to Shivay Collections updates!')}
                className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-stone-950 font-bold text-xs transition"
              >
                Join
              </button>
            </div>

            <div className="pt-3">
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block mb-2">
                100% Secure Payments
              </span>
              <div className="flex flex-wrap gap-2 text-[10px] font-bold text-stone-300">
                <span className="px-2 py-1 bg-stone-900 rounded border border-stone-800">UPI (GPay/PhonePe)</span>
                <span className="px-2 py-1 bg-stone-900 rounded border border-stone-800">RuPay & Visa</span>
                <span className="px-2 py-1 bg-stone-900 rounded border border-stone-800">NetBanking</span>
                <span className="px-2 py-1 bg-stone-900 rounded border border-stone-800">Cash on Delivery</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © 2026 <strong className="text-stone-300">shivaycollections.com</strong>. All rights reserved. Handcrafted with pride in India.
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
