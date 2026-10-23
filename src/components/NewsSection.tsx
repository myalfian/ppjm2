import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import { Search, Calendar, User, ArrowRight, Share2, Tag, BookOpen } from 'lucide-react';

interface NewsSectionProps {
  posts: Post[];
  onOpenNewsDetail: (post: Post) => void;
  onToast: (msg: string) => void;
}

const categories = ['Semua', 'Prestasi', 'Kegiatan', 'Pengumuman', 'Agenda'];

export const NewsSection: React.FC<NewsSectionProps> = ({ posts, onOpenNewsDetail, onToast }) => {
  const [selectedCat, setSelectedCat] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#prestasi') {
        setSelectedCat('Prestasi');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const filtered = posts.filter(post => {
    if (post.status !== 'published') return false;
    const matchCat = selectedCat === 'Semua' || post.category === selectedCat;
    const q = searchQuery.toLowerCase();
    const matchQuery = 
      post.title.toLowerCase().includes(q) || 
      post.summary.toLowerCase().includes(q) ||
      (post.tags && post.tags.some(t => t.toLowerCase().includes(q)));
    return matchCat && matchQuery;
  });

  const displayed = filtered.slice(0, visibleCount);

  const handleShare = (post: Post) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.summary,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      onToast('Tautan berita berhasil disalin ke papan klip.');
    }
  };

  return (
    <section id="news" className="py-16 bg-[#f1f7f2] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-[#1a6b3c] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-emerald-200">
              Kabar Pesantren
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4a28] mt-2">
              Berita, Prestasi & Agenda Santri
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Dokumentasi aktivitas keilmuan dan kabar terbaru seputar PP & SMP Plus Jauharul Maknuun.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari berita atau pengumuman..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCat(cat); setVisibleCount(4); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCat === cat
                  ? 'bg-[#1a6b3c] text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        {displayed.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 p-6 text-gray-400 text-xs italic">
            Tidak ada berita atau agenda yang sesuai kriteria pencarian.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayed.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 transition group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-gray-100">
                    <img
                      src={post.image || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-[#1a6b3c] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                    </div>

                    <h3
                      onClick={() => onOpenNewsDetail(post)}
                      className="font-bold text-xs sm:text-sm text-[#0d4a28] group-hover:text-[#d4af37] cursor-pointer transition line-clamp-2 leading-snug"
                    >
                      {post.title}
                    </h3>

                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-gray-100 mt-2 flex items-center justify-between">
                  <button
                    onClick={() => onOpenNewsDetail(post)}
                    className="text-xs font-bold text-[#1a6b3c] hover:text-[#0d4a28] flex items-center gap-1"
                  >
                    <span>Baca</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => handleShare(post)}
                    className="text-gray-400 hover:text-[#1a6b3c] transition p-1"
                    title="Bagikan"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filtered.length > visibleCount && (
          <div className="text-center pt-2">
            <button
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="px-6 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-[#1a6b3c] text-xs font-bold border border-gray-200 shadow-sm transition"
            >
              Muat Berita Lainnya ({filtered.length - visibleCount} lagi)
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
