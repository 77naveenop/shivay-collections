import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const SLIDES = [
  {
    tag: 'Clothing & Cosmetics Store',
    title: 'Shivay Collections, Barwar Kheri',
    subtitle: 'All kinds of clothes for men, women, kids of all ages, and authentic beauty cosmetics.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80',
    primaryCta: 'Explore Collection',
    category: 'all',
    badge: 'Barwar Kheri'
  },
  {
    tag: 'Men & Women Wear',
    title: 'Traditional Elegance & Everyday Fashion',
    subtitle: 'From pure silk sarees and festive kurtas to modern casual wear and accessories.',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1600&q=80',
    primaryCta: 'Shop Outfits',
    category: 'women',
    badge: 'All Age Groups'
  },
  {
    tag: 'Beauty & Skincare',
    title: 'Pure Radiance Cosmetics',
    subtitle: 'Serums, lipsticks, and beauty essentials to complement your everyday style.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=80',
    primaryCta: 'Discover Cosmetics',
    category: 'cosmetics',
    badge: '100% Quality'
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
      <div className="relative min-h-[380px] sm:min-h-[460px] md:min-h-[520px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-stone-900/40" />

        {/* Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="max-w-2xl space-y-3 sm:space-y-5 animate-fadeIn">
            
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-brand-400" />
              <span>{slide.tag}</span>
              <span className="w-1 h-1 rounded-full bg-brand-400"></span>
              <span className="text-white font-bold">{slide.badge}</span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              {slide.title}
            </h2>

            {/* Subtitle */}
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-lg">
              {slide.subtitle}
            </p>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-4 items-center">
              <button
                onClick={() => {
                  setSelectedCategory(slide.category);
                  setActiveTab('store');
                  window.scrollTo({ top: 550, behavior: 'smooth' });
                }}
                className="px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-brand-500 hover:bg-brand-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-brand-500/20 transition-all transform active:scale-95"
              >
                <span>{slide.primaryCta}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setActiveTab('store');
                  window.scrollTo({ top: 550, behavior: 'smooth' });
                }}
                className="px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm backdrop-blur-md border border-white/20 transition"
              >
                All Departments
              </button>
            </div>

          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white transition backdrop-blur-sm"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white transition backdrop-blur-sm"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-6 sm:w-8 bg-brand-400' : 'w-1.5 sm:w-2 bg-white/40'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trust Highlights Bar - Responsive 2x2 grid on mobile, 4 columns on desktop */}
      <div className="bg-stone-950 border-t border-stone-800/80 py-3 sm:py-4 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 text-xs">
          
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-brand-400 shrink-0">
              <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <p className="font-bold text-stone-100 text-[11px] sm:text-xs">Express Shipping</p>
              <p className="text-stone-400 text-[10px] sm:text-[11px]">Free delivery over ₹999</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <p className="font-bold text-stone-100 text-[11px] sm:text-xs">Original Products</p>
              <p className="text-stone-400 text-[10px] sm:text-[11px]">Barwar Kheri store</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400 shrink-0">
              <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <p className="font-bold text-stone-100 text-[11px] sm:text-xs">Easy Exchange</p>
              <p className="text-stone-400 text-[10px] sm:text-[11px]">Doorstep service</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <p className="font-bold text-stone-100 text-[11px] sm:text-xs">UPI & COD</p>
              <p className="text-stone-400 text-[10px] sm:text-[11px]">GPay, PhonePe & Cash</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
