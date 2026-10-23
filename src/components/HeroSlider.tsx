import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, ArrowRight, PhoneCall, Sparkles } from 'lucide-react';

interface HeroSliderProps {
  onOpenPpdb: () => void;
  onOpenStatus: () => void;
}

const slides = [
  {
    badge: 'Pendidikan Islam Terpadu & Berkarakter',
    title: 'Mencetak Generasi Rabbani, Berakhlak & Unggul Teknologi',
    desc: 'Sistem pendidikan terpadu memadukan kemurnian Kurikulum Kitab Kuning Pesantren Salaf dengan standar nasional Kurikulum Merdeka berakreditasi "A" BAN-PDM di Kota Santri Lasem.',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1600&q=80',
    tag: 'Akreditasi "A" BAN-PDM'
  },
  {
    badge: 'Takhassus Al-Qur\'an Bersanad',
    title: 'Halaqah Tahfidz 30 Juz Mutqin & Berijazah Sanad Keilmuan',
    desc: 'Bimbingan intensif hafalan ba\'da Subuh dan Maghrib bersama dewan huffadz bersanad 30 juz, dilengkapi kajian tajwid qira\'ah dan mutaba\'ah berkala.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=80',
    tag: 'Target Mutqin 30 Juz'
  },
  {
    badge: 'Islamic Boarding School Modern',
    title: 'SMP Plus Jauharul Maknuun: Riset STEM & Pengkajian Kitab Turats',
    desc: 'Fasilitas asrama representatif, laboratorium komputer modern, program dwibahasa (Arab-Inggris), serta kajian kitab turats maknani Jawa dan pembinaan adab santri 24 jam.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
    tag: 'Bilingual & STEM'
  }
];

export const HeroSlider: React.FC<HeroSliderProps> = ({ onOpenPpdb, onOpenStatus }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  const next = () => setCurrent(prev => (prev + 1) % slides.length);

  return (
    <section id="home" className="relative min-h-[400px] sm:min-h-[460px] lg:min-h-[500px] flex items-start justify-center overflow-hidden bg-gray-900 text-white pb-12 sm:pb-16">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover transform scale-105 transition-transform duration-7000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/40"></div>
          <div className="absolute inset-0 dark-islamic-pattern opacity-30 pointer-events-none"></div>
        </div>
      ))}

      {/* Hero Content (Card Style) */}
      <div className="relative max-w-4xl mx-auto my-2 sm:my-4 px-5 py-5 sm:px-8 sm:py-7 z-10 w-[calc(100%-1.25rem)] sm:w-full bg-black/65 sm:bg-black/55 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl">
        <div className="space-y-3.5 sm:space-y-5">
          {/* Badge */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#fef3c7] text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-spin" />
            <span>{slides[current].badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
            <span className="text-[#d4af37]">{slides[current].tag}</span>
          </div>

          {/* Heading */}
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-snug sm:leading-tight">
            {slides[current].title}
          </h1>

          {/* Clean Description */}
          <p className="text-xs sm:text-base text-gray-200/90 leading-relaxed font-light">
            {slides[current].desc}
          </p>

          {/* Single Primary Action Button */}
          <div className="pt-2 sm:pt-2.5">
            <button
              type="button"
              onClick={onOpenPpdb}
              className="inline-flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#eab308] to-[#ca8a04] hover:from-[#eab308] hover:to-[#b45309] text-gray-950 font-extrabold text-xs sm:text-sm tracking-tight shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 active:scale-95 cursor-pointer group"
            >
              <span>Daftar Santri Baru 2026</span>
              <ArrowRight className="w-4 h-4 text-gray-950 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <button
        onClick={prev}
        className="absolute left-2.5 sm:left-4 top-[40%] sm:top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/45 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={next}
        className="absolute right-2.5 sm:right-4 top-[40%] sm:top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/45 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Dots */}
      <div className="absolute bottom-9 sm:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-[#d4af37]' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
