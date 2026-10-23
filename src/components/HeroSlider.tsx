import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Award, BookOpen, CheckCircle, ArrowRight, PhoneCall, Sparkles } from 'lucide-react';

interface HeroSliderProps {
  onOpenPpdb: () => void;
  onOpenStatus: () => void;
}

const slides = [
  {
    badge: 'Pendidikan Islam Terpadu & Berkarakter',
    title: 'Mencetak Generasi Rabbani, Berakhlak & Unggul Teknologi',
    desc: 'Sistem pendidikan terpadu memadukan kemurnian Kurikulum Kitab Kuning Pesantren Salaf dengan standar nasional Kurikulum Merdeka di Kota Santri Lasem.',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1600&q=80',
    tag: 'Akreditasi "A" BAN-PDM'
  },
  {
    badge: 'Takhassus Al-Qur\'an Bersanad',
    title: 'Halaqah Tahfidz 30 Juz Mutqin & Berijazah Sanad Keilmuan',
    desc: 'Bimbingan intensif hafalan ba\'da Subuh dan Maghrib bersama dewan huffadz bersanad, dilengkapi kajian tajwid qira\'ah dan mutaba\'ah berkala.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=80',
    tag: 'Target Mutqin 30 Juz'
  },
  {
    badge: 'Islamic Boarding School Modern',
    title: 'SMP Plus Jauharul Maknuun: Riset STEAM & Pengkajian Kitab Turats',
    desc: 'Fasilitas asrama representatif, laboratorium komputer modern, program dwibahasa (Arab-Inggris), serta pembinaan adab santri 24 jam terarah.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
    tag: 'Bilingual & STEAM'
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
    <section id="home" className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center overflow-hidden bg-gray-900 text-white">
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

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 w-full">
        <div className="max-w-3xl space-y-5 sm:space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#fef3c7] text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-spin" />
            <span>{slides[current].badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
            <span className="text-[#d4af37]">{slides[current].tag}</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {slides[current].title}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-2xl font-light">
            {slides[current].desc}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenPpdb}
              className="px-6 py-3 rounded-2xl bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold text-xs sm:text-sm shadow-xl shadow-[#1a6b3c]/40 flex items-center gap-2 btn-spring border border-[#d4af37]/40"
            >
              <span>Daftar Santri Baru 2026</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37]" />
            </button>

            <button
              onClick={onOpenStatus}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-md border border-white/20 flex items-center gap-2 btn-spring"
            >
              <CheckCircle className="w-4 h-4 text-[#d4af37]" />
              <span>Cek Bukti Pendaftaran</span>
            </button>

            <a
              href="https://wa.me/6281234567890?text=Assalamu'alaikum%20Panitia%20PPDB%20PPJM"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-2xl bg-emerald-700/40 hover:bg-emerald-700/60 text-emerald-200 font-semibold text-xs sm:text-sm border border-emerald-500/30 flex items-center gap-2 transition"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Konsultasi WA</span>
            </a>
          </div>

          {/* Feature Highlights Counter */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/15 text-xs text-white">
            <div className="bg-white/5 backdrop-blur p-2.5 rounded-xl border border-white/10">
              <div className="font-extrabold text-lg text-[#d4af37]">Akreditasi "A"</div>
              <div className="text-[11px] text-gray-300">BAN-PDM Resmi</div>
            </div>
            <div className="bg-white/5 backdrop-blur p-2.5 rounded-xl border border-white/10">
              <div className="font-extrabold text-lg text-[#d4af37]">30 Juz</div>
              <div className="text-[11px] text-gray-300">Tahfidz Bersanad</div>
            </div>
            <div className="bg-white/5 backdrop-blur p-2.5 rounded-xl border border-white/10">
              <div className="font-extrabold text-lg text-[#d4af37]">Kitab Turats</div>
              <div className="text-[11px] text-gray-300">Metode Maknani Jawa</div>
            </div>
            <div className="bg-white/5 backdrop-blur p-2.5 rounded-xl border border-white/10">
              <div className="font-extrabold text-lg text-[#d4af37]">Bilingual</div>
              <div className="text-[11px] text-gray-300">Arab & Inggris Aktif</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-[#d4af37]' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
