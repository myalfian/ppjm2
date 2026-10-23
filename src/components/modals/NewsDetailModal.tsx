import React from 'react';
import { X, Calendar, User, Share2, Tag } from 'lucide-react';
import { Post } from '../../types';

interface NewsDetailModalProps {
  post: Post | null;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ post, onClose, onToast }) => {
  if (!post) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.summary,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      onToast('Tautan artikel berhasil disalin.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur px-6 py-4 border-b border-gray-100 flex items-center justify-between z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1a6b3c] bg-emerald-50 px-2.5 py-1 rounded-md">
            {post.category}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-[#1a6b3c] transition"
              title="Bagikan Artikel"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-5">
          {post.image && (
            <div className="rounded-2xl overflow-hidden h-64 bg-gray-100">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-500 border-b border-gray-100 pb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#1a6b3c]" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#1a6b3c]" />
              {post.author}
            </span>
          </div>

          <h2 className="text-lg sm:text-2xl font-black text-[#0d4a28] leading-snug">
            {post.title}
          </h2>

          <div className="text-xs sm:text-sm text-gray-700 leading-relaxed space-y-3 font-normal whitespace-pre-line">
            {post.content}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-gray-400 mr-1" />
              {post.tags.map((t, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-[10px] font-medium">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
