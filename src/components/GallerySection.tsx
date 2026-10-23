import React, { useState } from 'react';
import { MediaGalleryItem } from '../types';
import { Play, Image as ImageIcon, Sparkles } from 'lucide-react';

interface GallerySectionProps {
  media: MediaGalleryItem[];
  onOpenMediaModal: (item: MediaGalleryItem) => void;
}

const categories = [
  { key: 'semua', label: 'Semua' },
  { key: 'kegiatan', label: 'Kegiatan Santri' },
  { key: 'fasilitas', label: 'Fasilitas' },
  { key: 'prestasi', label: 'Prestasi' },
  { key: 'video', label: 'Video Dokumenter' }
];

export const GallerySection: React.FC<GallerySectionProps> = ({ media, onOpenMediaModal }) => {
  const [activeCat, setActiveCat] = useState('semua');

  const filtered = media.filter(item => {
    return activeCat === 'semua' || item.category === activeCat;
  });

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[11px] font-bold text-[#1a6b3c] uppercase tracking-wider bg-[#1a6b3c]/10 px-3 py-1 rounded-full">
            Galeri & Dokumentasi
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4a28] mt-2">
            Momen Keseharian Santri Jauharul Maknuun
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Potret kegiatan halaqah tahfidz, pembelajaran STEAM di kelas, serta kegiatan asrama.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCat(c.key)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                activeCat === c.key
                  ? 'bg-[#1a6b3c] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenMediaModal(item)}
              className="relative group overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-md border border-gray-200 bg-gray-100 h-64 transition-all duration-300"
            >
              <img
                src={item.type === 'video' ? 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80' : item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {item.type === 'video' ? (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition">
                  <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                    <Play className="w-5 h-5 ml-0.5" fill="white" />
                  </div>
                  <span className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-bold bg-black/60 backdrop-blur px-2.5 py-1.5 rounded-lg truncate">
                    {item.title}
                  </span>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
                  <span className="text-white text-xs font-semibold leading-snug">
                    {item.title}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
