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
    tag: 'Akreditasi "A" BAN-PDM',
    cardTheme: 'bg-gradient-to-br from-[#064e3b]/90 via-[#064e3b]/80 to-black/85 border-emerald-400/40 shadow-[0_12px_40px_rgba(6,78,59,0.5)]',
    badgeTheme: 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200',
    tagColor: 'text-[#d4af37]',
    btnTheme: 'from-[#d4af37] via-[#eab308] to-[#ca8a04]'
  },
  {
    badge: 'Takhassus Al-Qur\'an Bersanad',
    title: 'Halaqah Tahfidz 30 Juz Mutqin & Berijazah Sanad Keilmuan',
    desc: 'Bimbingan intensif hafalan ba\'da Subuh dan Maghrib bersama dewan huffadz bersanad 30 juz, dilengkapi kajian tajwid qira\'ah dan mutaba\'ah berkala.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=80',
    tag: 'Target Mutqin 30 Juz',
    cardTheme: 'bg-gradient-to-br from-[#1e1b4b]/90 via-[#1e1b4b]/80 to-black/85 border-indigo-400/40 shadow-[0_12px_40px_rgba(30,27,75,0.5)]',
    badgeTheme: 'bg-indigo-500/20 border-indigo-400/40 text-indigo-200',
    tagColor: 'text-amber-300',
    btnTheme: 'from-[#d4af37] via-[#facc15] to-[#eab308]'
  },
  {
    badge: 'Islamic Boarding School Modern',
    title: 'SMP Plus Jauharul Maknuun: Riset STEM & Pengkajian Kitab Turats',
    desc: 'Fasilitas asrama representatif, laboratorium komputer modern, program dwibahasa (Arab-Inggris), serta kajian kitab turats maknani Jawa dan pembinaan adab santri 24 jam.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
    tag: 'Bilingual & STEM',
    cardTheme: 'bg-gradient-to-br from-[#1c1917]/90 via-[#292524]/80 to-black/85 border-amber-500/40 shadow-[0_12px_40px_rgba(28,25,23,0.5)]',
    badgeTheme: 'bg-amber-500/20 border-amber-400/40 text-amber-200',
    tagColor: 'text-cyan-300',
    btnTheme: 'from-[#d4af37] via-[#eab308] to-[#ca8a04]'
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
    <section id="home" className="relative min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] flex items-center justify-center overflow-hidden bg-gray-900 text-white pb-6 sm:pb-8">
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
            className="w-full h-full max-h-[380px] sm:max-h-[460px] object-cover object-center transform scale-100 sm:scale-105 transition-transform duration-7000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/40"></div>
          <div className="absolute inset-0 dark-islamic-pattern opacity-30 pointer-events-none"></div>
        </div>
      ))}

      {/* Hero Content (Card Style with per-card colors & vertical center - Sized to leave clear gutters for outside controls) */}
      <div className={`relative max-w-2xl lg:max-w-3xl mx-auto my-auto w-[calc(100%-5rem)] sm:w-[calc(100%-7rem)] px-4 py-3.5 sm:px-7 sm:py-5 backdrop-blur-md rounded-2xl sm:rounded-3xl border shadow-2xl transition-all duration-700 z-10 ${slides[current].cardTheme}`}>
        <div key={current} className="space-y-2.5 sm:space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {/* Badge */}
          <div className={`hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold backdrop-blur-md transition-colors duration-500 ${slides[current].badgeTheme}`}>
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-spin" />
            <span>{slides[current].badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
            <span className={slides[current].tagColor}>{slides[current].tag}</span>
          </div>

          {/* Heading */}
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-snug sm:leading-tight">
            {slides[current].title}
          </h1>

          {/* Clean Description */}
          <p className="text-xs sm:text-sm text-gray-200/90 leading-relaxed font-light line-clamp-2 sm:line-clamp-none">
            {slides[current].desc}
          </p>

          {/* Single Primary Action Button (Centered Horizontally) */}
          <div className="pt-1.5 sm:pt-2 flex justify-center w-full">
            <button
              type="button"
              onClick={onOpenPpdb}
              className={`inline-flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-gradient-to-r ${slides[current].btnTheme} hover:brightness-110 text-gray-950 font-extrabold text-xs sm:text-sm tracking-tight shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group`}
            >
              <span>Daftar Santri Baru 2026</span>
              <ArrowRight className="w-4 h-4 text-gray-950 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Slider Controls (Positioned Completely Outside Card with Hover & Nudge Animations) */}
      <button
        onClick={prev}
        className="absolute left-1.5 sm:left-3 lg:left-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/30 hover:border-[#d4af37] shadow-xl hover:shadow-[#d4af37]/30 transition-all duration-300 hover:scale-115 active:scale-90 group z-30 focus:outline-hidden cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-200 group-hover:text-white group-hover:-translate-x-0.5 transition-transform duration-200" />
      </button>

      <button
        onClick={next}
        className="absolute right-1.5 sm:right-3 lg:right-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/30 hover:border-[#d4af37] shadow-xl hover:shadow-[#d4af37]/30 transition-all duration-300 hover:scale-115 active:scale-90 group z-30 focus:outline-hidden cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-200 group-hover:text-white group-hover:translate-x-0.5 transition-transform duration-200" />
      </button>

      {/* Slide Dots */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-6 sm:w-8 bg-[#d4af37]' : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
