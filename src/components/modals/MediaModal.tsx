import React from 'react';
import { X, Calendar, MapPin, Share2, Video, Image as ImageIcon, Clock } from 'lucide-react';
import { MediaGalleryItem } from '../../types';

interface MediaModalProps {
  item: MediaGalleryItem | null;
  onClose: () => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const isVideo = item.type === 'video' || item.category === 'video';

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description || item.title,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert('Tautan dokumentasi berhasil disalin ke papan klip.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative max-w-4xl w-full bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800 my-auto animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Frame */}
        <div className="bg-black flex items-center justify-center max-h-[60vh] sm:max-h-[65vh] overflow-hidden">
          {isVideo ? (
            <div className="w-full aspect-video">
              <iframe
                src={item.url}
                title={item.title}
                width="100%"
                height="100%"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <img
              src={item.url}
              alt={item.title}
              className="max-h-[60vh] w-auto max-w-full object-contain"
            />
          )}
        </div>

        {/* Media Information Panel */}
        <div className="p-5 sm:p-6 bg-gray-900 text-white space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-[#1a6b3c] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                {isVideo ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3 text-[#d4af37]" />}
                <span>{isVideo ? 'Video Dokumenter' : 'Foto Dokumentasi'}</span>
              </span>
              <span className="text-gray-400 text-xs capitalize">Kategori: {item.category}</span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-200 transition"
            >
              <Share2 className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Bagikan</span>
            </button>
          </div>

          <h3 className="text-base sm:text-xl font-bold text-white leading-snug">
            {item.title}
          </h3>

          {item.description && (
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {item.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-800 text-[11px] text-gray-400">
            {item.date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#1a6b3c]" />
                <span>Tanggal: {item.date}</span>
              </div>
            )}
            {item.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#1a6b3c]" />
                <span>Lokasi: {item.location}</span>
              </div>
            )}
            {item.duration && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-rose-400" />
                <span>Durasi: {item.duration}</span>
              </div>
            )}
            {item.size && (
              <span className="text-gray-500">Resolusi: {item.size}</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
