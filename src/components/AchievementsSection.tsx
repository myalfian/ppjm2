import React, { useState } from 'react';
import { achievementsList } from '../data/portalData';
import { AchievementItem } from '../types';
import { 
  Trophy, 
  Award, 
  Medal, 
  Calendar, 
  Building, 
  User, 
  Sparkles, 
  X, 
  ChevronRight,
  ShieldCheck,
  Star
} from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('Semua');
  const [activeItem, setActiveItem] = useState<AchievementItem | null>(null);

  const levels = ['Semua', 'Nasional', 'Provinsi', 'Kabupaten'];

  const filteredItems = achievementsList.filter(item => {
    if (selectedLevel === 'Semua') return true;
    return item.level === selectedLevel;
  });

  return (
    <section id="prestasi" className="py-16 sm:py-20 bg-[#f1f7f2] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#0d4a28] text-xs font-bold">
            <Trophy className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Rekam Jejak Kejuaraan & Prestasi</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0d4a28] tracking-tight">
            Prestasi Gemilang Santri Jauharul Maknuun
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Bukti nyata sinergi kualitas pendidikan terpadu, melahirkan generasi hafidz Qur'an berprestasi dalam bidang keagamaan, sains olimpiade, bahasa, seni, dan bela diri.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm text-center">
            <span className="block text-2xl sm:text-3xl font-black text-[#1a6b3c]">45+</span>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Piala & Medali</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm text-center">
            <span className="block text-2xl sm:text-3xl font-black text-[#d4af37]">100%</span>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Lulus Ujian Standar</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm text-center">
            <span className="block text-2xl sm:text-3xl font-black text-[#0d4a28]">"A"</span>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Akreditasi BAN-PDM</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm text-center">
            <span className="block text-2xl sm:text-3xl font-black text-[#1a6b3c]">30 Juz</span>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Sanad Mutqin Huffadz</span>
          </div>
        </div>

        {/* Filter Levels */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white/80 rounded-2xl border border-gray-200 max-w-md mx-auto">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedLevel === lvl
                  ? 'bg-[#1a6b3c] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {lvl === 'Semua' ? 'Semua Tingkat' : `Tingkat ${lvl}`}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              <div>
                {/* Photo Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Level Badge */}
                  <div className="absolute top-3 left-3 bg-[#d4af37] text-gray-900 text-[10px] font-black px-2.5 py-0.5 rounded-md shadow flex items-center gap-1">
                    <Medal className="w-3 h-3 text-gray-900" />
                    <span>Tingkat {item.level}</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    Tahun {item.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1a6b3c]">
                    {item.category}
                  </span>

                  <h3 className="font-extrabold text-sm sm:text-base text-gray-900 group-hover:text-[#1a6b3c] transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-gray-800 font-bold truncate">
                      <User className="w-3.5 h-3.5 text-[#1a6b3c] shrink-0" />
                      <span className="truncate">{item.winner}</span>
                    </div>
                    <div className="text-[11px] text-gray-500 truncate pl-5">
                      {item.classGrade}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 sm:p-5 pt-0">
                <button
                  onClick={() => setActiveItem(item)}
                  className="w-full py-2 px-3 rounded-xl bg-gray-50 hover:bg-[#1a6b3c] text-[#1a6b3c] hover:text-white border border-gray-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 group/btn"
                >
                  <span>Informasi Prestasi</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Achievement Detail Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 relative animate-in zoom-in-95 duration-200">
            
            {/* Header Image */}
            <div className="relative h-60 sm:h-72 overflow-hidden bg-gray-900">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
              
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-[#d4af37] text-gray-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-gray-900" />
                    Tingkat {activeItem.level}
                  </span>
                  <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {activeItem.year}
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-black leading-snug">
                  {activeItem.title}
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Winner Profile Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 text-xs">
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Peraih Juara</span>
                  <span className="font-extrabold text-[#0d4a28] text-sm">{activeItem.winner}</span>
                  <span className="text-gray-600 block text-[11px] mt-0.5">{activeItem.classGrade}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Lembaga Penyelenggara</span>
                  <span className="font-semibold text-gray-800">{activeItem.organizer}</span>
                  <span className="text-[#1a6b3c] block text-[11px] font-bold mt-0.5">Bidang: {activeItem.category}</span>
                </div>
              </div>

              {/* Story & Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Kisah Capaian & Deskripsi Lomba
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {activeItem.description}
                </p>
              </div>

              {/* Quality Guarantee Badge */}
              <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100 text-xs text-gray-600">
                <ShieldCheck className="w-5 h-5 text-[#1a6b3c] shrink-0" />
                <span>
                  Prestasi ini resmi tercatat dalam pangkalan data portofolio santri dan piagam diakui untuk jalur prestasi jenjang pendidikan berikutnya.
                </span>
              </div>

              {/* Close Button */}
              <div className="pt-2">
                <button
                  onClick={() => setActiveItem(null)}
                  className="w-full py-2.5 rounded-xl bg-[#1a6b3c] hover:bg-[#0d4a28] text-white text-xs font-bold transition shadow-sm"
                >
                  Tutup Informasi
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
