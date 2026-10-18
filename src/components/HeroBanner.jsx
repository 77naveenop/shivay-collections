import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const SLIDES = [
  {
    tag: 'Grand Festive & Wedding Edit',
    title: 'Timeless Elegance For Every Generation',
    subtitle: 'Exquisite Banarasi sarees, handloom silk kurtas, kids festive wear, and radiant Ayurvedic beauty essentials.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80',
    primaryCta: 'Explore Festive Collection',
    category: 'women',
    badge: 'Flat 50% Off'
  },
  {
    tag: 'Men’s Royal & Contemporary',
    title: 'Heritage Craftsmanship Meets Modern Fit',
    subtitle: 'From pure raw silk bandhgalas and embroidered kurtas to long-staple Egyptian cotton formal shirts.',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1600&q=80',
    primaryCta: 'Shop Men\'s Collection',
    category: 'men',
    badge: 'Starting ₹899'
  },
  {
    tag: 'Luminous Glow & Pure Aromas',
    title: '24K Gold Serums & Kannauj Rose Mists',
    subtitle: 'Pure, chemical-free cosmetic formulations designed to bring out your natural divine radiance.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=80',
    primaryCta: 'Discover Cosmetics',
    category: 'cosmetics',
    badge: '100% Ayurvedic'
  }
];

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setSelectedCategory, setActiveTab } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative overflow-hidden bg-stone-900 text-white">
      {/* Background Image with Gradient Overlay */}
      <div className="relative min-h-[460px] md:min-h-[540px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-stone-900/40" />

        {/* Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl space-y-5 animate-fadeIn">
            
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>{slide.tag}</span>
              <span className="w-1 h-1 rounded-full bg-brand-400"></span>
              <span className="text-white font-bold">{slide.badge}</span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight">
              {slide.title}
            </h2>

            {/* Subtitle */}
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
              {slide.subtitle}
            </p>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => {
                  setSelectedCategory(slide.category);
                  setActiveTab('store');
                  window.scrollTo({ top: 650, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-full bg-brand-500 hover:bg-brand-400 text-stone-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-brand-500/20 transition-all transform hover:-translate-y-0.5"
              >
                <span>{slide.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setActiveTab('store');
                  window.scrollTo({ top: 650, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur-md border border-white/20 transition"
              >
                View Full Catalog
              </button>
            </div>

          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white transition backdrop-blur-sm"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white transition backdrop-blur-sm"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-8 bg-brand-400' : 'w-2 bg-white/40'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trust Highlights Bar */}
      <div className="bg-stone-950 border-t border-stone-800/80 py-4 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-brand-400 shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-stone-100">Free Express Shipping</p>
              <p className="text-stone-400 text-[11px]">On all prepaid orders over ₹999</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-stone-100">100% Genuine Certified</p>
              <p className="text-stone-400 text-[11px]">Direct handloom & certified labs</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400 shrink-0">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-stone-100">7-Day Easy Exchange</p>
              <p className="text-stone-400 text-[11px]">Hassle-free doorstep pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-stone-100">Razorpay & COD</p>
              <p className="text-stone-400 text-[11px]">UPI, Cards & Cash on Delivery</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
