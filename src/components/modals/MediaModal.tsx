import React from 'react';
import { X } from 'lucide-react';
import { MediaGalleryItem } from '../../types';

interface MediaModalProps {
  item: MediaGalleryItem | null;
  onClose: () => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-4xl w-full flex flex-col items-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 p-2 text-white/80 hover:text-white transition"
          aria-label="Tutup"
        >
          <X className="w-6 h-6" />
        </button>

        {item.type === 'video' ? (
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
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
          <div className="max-h-[80vh] flex flex-col items-center">
            <img
              src={item.url}
              alt={item.title}
              className="max-h-[72vh] max-w-full object-contain rounded-2xl shadow-2xl"
            />
          </div>
        )}

        <div className="mt-3 text-center">
          <h4 className="text-white text-xs sm:text-sm font-bold">{item.title}</h4>
          <span className="text-[10px] text-gray-400 capitalize">{item.category}</span>
        </div>

      </div>
    </div>
  );
};
