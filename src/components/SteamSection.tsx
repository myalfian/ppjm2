import React, { useState } from 'react';
import { steamActivitiesList } from '../data/portalData';
import { SteamActivityItem } from '../types';
import { 
  Cpu, 
  Code2, 
  Bot, 
  FlaskConical, 
  Palette, 
  Monitor, 
  CheckCircle2, 
  Sparkles, 
  X, 
  ChevronRight, 
  Wrench, 
  Clock, 
  Layers
} from 'lucide-react';

export const SteamSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<SteamActivityItem | null>(null);

  return (
    <section id="steam" className="py-16 sm:py-20 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a6b3c]/10 border border-[#1a6b3c]/20 text-[#1a6b3c] text-xs font-bold">
            <Cpu className="w-3.5 h-3.5 text-[#1a6b3c]" />
            <span>Integrasi Sains, Teknologi & Nilai Islam</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0d4a28] tracking-tight">
            Pusat Riset & Kegiatan STEM Santri
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Memadukan kekuatan literasi kitab salaf dengan sains mutakhir. Santri dibekali keterampilan komputasi, robotika IoT, mikroskopi terapan, dan desain multimedia di laboratorium terpadu.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steamActivitiesList.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50/80 rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              <div>
                {/* Photo Thumbnail */}
                <div className="relative h-52 overflow-hidden bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#0d4a28]/90 backdrop-blur-sm text-[#d4af37] text-[10px] font-bold px-2.5 py-1 rounded-md shadow flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#d4af37]" />
                    <span>{item.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-extrabold text-base text-gray-900 group-hover:text-[#1a6b3c] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {item.shortDesc}
                  </p>

                  {/* Skills Tag Pills (unboxed clean styling) */}
                  <div className="pt-2 border-t border-gray-200/80">
                    <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1.5">Keahlian Dikembangkan</span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="text-[10px] font-semibold text-[#1a6b3c] bg-[#1a6b3c]/10 px-2 py-0.5 rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => setActiveItem(item)}
                  className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-[#1a6b3c] text-[#1a6b3c] hover:text-white border border-gray-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 group/btn shadow-xs"
                >
                  <span>Info Kegiatan & Perangkat</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Lab Facility Callout */}
        <div className="bg-gradient-to-r from-gray-900 to-[#0d4a28] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-white/10 to-transparent pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider">
                Infrastruktur Unggulan
              </span>
              <h3 className="text-xl sm:text-2xl font-black">
                Laboratorium Komputer & Riset Sains Berstandar Industri
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Dilengkapi 40 unit PC Intel Core generasi mutakhir, jaringan fiber optic dedikasi tinggi 100 Mbps, mikroskop riset binokuler, serta perangkat kit mikrokontroler sensor IoT santri.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>40 Unit PC CBT & Coding</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>Fiber Optic Redundan</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>Pendampingan Instruktur Ahli</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <a
                href="#gallery"
                className="px-6 py-3 rounded-2xl bg-[#d4af37] hover:bg-[#b89528] text-gray-900 font-extrabold text-xs shadow-lg transition flex items-center gap-2 btn-spring"
              >
                <span>Lihat Dokumentasi STEM</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* STEM Detail Modal */}
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
                <span className="bg-[#1a6b3c] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {activeItem.category}
                </span>
                <h3 className="text-lg sm:text-2xl font-black mt-1.5 leading-snug">
                  {activeItem.title}
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Full Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Materi & Metodologi Pembelajaran
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {activeItem.fullDesc}
                </p>
              </div>

              {/* Tools & Hardware */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#1a6b3c]" />
                  <span>Peralatan & Perangkat Lunak Yang Digunakan</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeItem.tools.map((tool, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1a6b3c] shrink-0"></div>
                      <span>{tool}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Output */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 space-y-1.5">
                <span className="text-[10px] text-[#1a6b3c] font-black uppercase tracking-wider block">
                  Output Karya Santri (Project Output)
                </span>
                <p className="text-xs text-gray-800 font-semibold leading-relaxed">
                  {activeItem.projectOutput}
                </p>
              </div>

              {/* Schedule Info */}
              <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <Clock className="w-4 h-4 text-[#1a6b3c] shrink-0" />
                <span><strong>Jadwal Praktikum:</strong> {activeItem.schedule}</span>
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
