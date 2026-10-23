import React, { useState } from 'react';
import { MediaGalleryItem } from '../types';
import { 
  Play, 
  Image as ImageIcon, 
  Video, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Eye, 
  Clock,
  ChevronRight
} from 'lucide-react';

interface GallerySectionProps {
  media: MediaGalleryItem[];
  onOpenMediaModal: (item: MediaGalleryItem) => void;
}

const categories = [
  { key: 'semua', label: 'Semua Media' },
  { key: 'video', label: 'Video Dokumenter' },
  { key: 'kegiatan', label: 'Foto Kegiatan' },
  { key: 'fasilitas', label: 'Fasilitas Pesantren' },
  { key: 'prestasi', label: 'Prestasi Santri' }
];

export const GallerySection: React.FC<GallerySectionProps> = ({ media, onOpenMediaModal }) => {
  const [activeCat, setActiveCat] = useState('semua');

  const filtered = media.filter(item => {
    if (activeCat === 'semua') return true;
    if (activeCat === 'video') return item.type === 'video' || item.category === 'video';
    return item.category === activeCat;
  });

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-gray-50/70 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a6b3c]/10 border border-[#1a6b3c]/20 text-[#1a6b3c] text-xs font-bold">
            <ImageIcon className="w-3.5 h-3.5 text-[#1a6b3c]" />
            <span>Dokumentasi Visual & Multimedia</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0d4a28] tracking-tight">
            Galeri Sekolah & Dokumentasi Pesantren
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Kumpulan potret foto dan rekaman video aktivitas halaqah tahfidz 30 juz, praktikum STEM, asrama santri, dan kejuaraan resmi Pondok Pesantren Jauharul Maknuun.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white rounded-2xl border border-gray-200 shadow-xs max-w-2xl mx-auto">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCat(c.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCat === c.key
                  ? 'bg-[#1a6b3c] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => {
            const isVideo = item.type === 'video' || item.category === 'video';
            const thumbnailSrc = isVideo
              ? (item.url.includes('youtube.com') 
                  ? 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80' 
                  : item.url)
              : item.url;

            return (
              <div
                key={item.id}
                onClick={() => onOpenMediaModal(item)}
                className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group hover:-translate-y-1"
              >
                <div>
                  {/* Thumbnail / Video Container */}
                  <div className="relative h-48 overflow-hidden bg-gray-900">
                    <img
                      src={thumbnailSrc}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />

                    {/* Media Type Badge */}
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow flex items-center gap-1.5">
                      {isVideo ? (
                        <>
                          <Video className="w-3 h-3 text-rose-400" />
                          <span>Video</span>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-3 h-3 text-[#d4af37]" />
                          <span>Foto</span>
                        </>
                      )}
                    </div>

                    {/* Play Button for Video */}
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 ml-0.5" fill="white" />
                        </div>
                      </div>
                    )}

                    {/* Duration / Size */}
                    {(item.duration || item.size) && (
                      <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
                        {item.duration ? (
                          <>
                            <Clock className="w-3 h-3 text-rose-300" />
                            <span>{item.duration}</span>
                          </>
                        ) : (
                          <span>{item.size}</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Information Details */}
                  <div className="p-4 sm:p-5 space-y-2.5">
                    <h3 className="font-extrabold text-sm text-gray-900 group-hover:text-[#1a6b3c] transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    <div className="pt-2 border-t border-gray-100 space-y-1 text-[11px] text-gray-500">
                      {item.date && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-[#1a6b3c] shrink-0" />
                          <span>{item.date}</span>
                        </div>
                      )}
                      {item.location && (
                        <div className="flex items-center gap-1.5 truncate">
                          <MapPin className="w-3 h-3 text-[#1a6b3c] shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 sm:p-5 pt-0">
                  <div className="w-full py-2 px-3 rounded-xl bg-gray-50 group-hover:bg-[#1a6b3c] text-[#1a6b3c] group-hover:text-white border border-gray-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isVideo ? 'Putar Video' : 'Lihat Foto'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
