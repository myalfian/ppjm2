import React, { useState } from 'react';
import { extracurricularList } from '../data/portalData';
import { ExtracurricularItem } from '../types';
import { 
  Activity, 
  Calendar, 
  UserCheck, 
  MapPin, 
  Trophy, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const ExtracurricularSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeItem, setActiveItem] = useState<ExtracurricularItem | null>(null);

  const categories = ['Semua', 'Seni Islami', 'Bela Diri', 'Bahasa', 'Teknologi', 'Kepanduan'];

  const filteredItems = extracurricularList.filter(item => {
    if (selectedCategory === 'Semua') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="ekstrakurikuler" className="py-16 sm:py-20 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a6b3c]/10 border border-[#1a6b3c]/20 text-[#1a6b3c] text-xs font-bold">
            <Activity className="w-3.5 h-3.5 text-[#1a6b3c]" />
            <span>Pengembangan Minat & Bakat Santri</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0d4a28] tracking-tight">
            Ekstrakurikuler Santri Jauharul Maknuun
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Wadah pembinaan bakat, kebugaran jasmani, kreativitas seni islami, dan kepemimpinan santri dengan bimbingan pelatih berlisensi dan pembina asrama profesional.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-gray-100/80 rounded-2xl max-w-2xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1a6b3c] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Extracurricular Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              <div>
                {/* Photo Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#0d4a28]/90 backdrop-blur-sm text-[#d4af37] text-[10px] font-bold px-2.5 py-1 rounded-md shadow">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 space-y-3">
                  <h3 className="font-extrabold text-sm sm:text-base text-gray-900 group-hover:text-[#1a6b3c] transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                  
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {item.shortDesc}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-gray-100 text-[11px] text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#1a6b3c] shrink-0" />
                      <span className="truncate">{item.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-3.5 h-3.5 text-[#1a6b3c] shrink-0" />
                      <span className="truncate">{item.coach}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 sm:p-5 pt-0">
                <button
                  onClick={() => setActiveItem(item)}
                  className="w-full py-2 px-3 rounded-xl bg-gray-50 hover:bg-[#1a6b3c] text-[#1a6b3c] hover:text-white border border-gray-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 group/btn"
                >
                  <span>Detail & Informasi</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Footer Banner */}
        <div className="bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider flex items-center justify-center md:justify-start gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Pembinaan Holistik
            </span>
            <h4 className="text-lg sm:text-xl font-bold">
              Setiap Santri Didorong Menemukan & Mengembangkan Potensi Terbaiknya
            </h4>
            <p className="text-xs text-emerald-100 max-w-xl">
              Fasilitas latihan memadai, pembinaan berjenjang, dan pendampingan asatidz memastikan keseimbangan antara hafalan Qur'an, sains, dan minat bakat.
            </p>
          </div>
          <a
            href="#ppdb-section"
            className="px-5 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#b89528] text-gray-900 font-extrabold text-xs shrink-0 transition shadow-md flex items-center gap-2 btn-spring"
          >
            <span>Daftar Santri Baru Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Detail Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 relative animate-in zoom-in-95 duration-200">
            
            {/* Modal Header Image */}
            <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-900">
              <img
                src={activeItem.image}
                alt={activeItem.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="bg-[#1a6b3c] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {activeItem.category}
                </span>
                <h3 className="text-lg sm:text-2xl font-black mt-1.5 leading-snug">
                  {activeItem.name}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Detailed Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Deskripsi Kegiatan
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {activeItem.fullDesc}
                </p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100 text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">Jadwal Latihan</span>
                  <span className="font-semibold text-gray-800">{activeItem.schedule}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">Pembina / Pelatih</span>
                  <span className="font-semibold text-gray-800">{activeItem.coach}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">Tempat Latihan</span>
                  <span className="font-semibold text-gray-800">{activeItem.location}</span>
                </div>
              </div>

              {/* Routine Activities */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Program & Aktivitas Rutin
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeItem.activities.map((act, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                      <CheckCircle2 className="w-4 h-4 text-[#1a6b3c] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              {activeItem.achievements && activeItem.achievements.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Prestasi & Rekam Jejak</span>
                  </h4>
                  <div className="space-y-2">
                    {activeItem.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-[#0d4a28] font-bold p-2.5 rounded-xl bg-amber-50/80 border border-amber-200">
                        <Trophy className="w-4 h-4 text-[#d4af37] shrink-0" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
