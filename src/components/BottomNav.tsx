import React, { useState, useEffect } from 'react';
import { Home, GraduationCap, UserCheck, Newspaper, PhoneCall } from 'lucide-react';

interface BottomNavProps {
  onOpenPpdb: () => void;
  onOpenStatus: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenPpdb, onOpenStatus }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'programs' | 'ppdb' | 'news' | 'contact'>('home');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      const contactEl = document.getElementById('lokasi');
      const newsEl = document.getElementById('news');
      const programsEl = document.getElementById('programs');

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveTab('contact');
      } else if (newsEl && scrollPos >= newsEl.offsetTop) {
        setActiveTab('news');
      } else if (programsEl && scrollPos >= programsEl.offsetTop) {
        setActiveTab('programs');
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, tab: 'home' | 'programs' | 'news' | 'contact') => {
    setActiveTab(tab);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      aria-label="Navigasi Bawah Mobile"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/90 shadow-[0_-4px_24px_rgba(0,0,0,0.09)] md:hidden transition-all duration-300"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.35rem)' }}
    >
      <div className="grid grid-cols-5 items-center justify-around px-1 pt-1.5 max-w-lg mx-auto">
        
        {/* Menu 1: Beranda */}
        <button
          onClick={() => handleNavClick('home', 'home')}
          className={`flex flex-col items-center justify-center py-1 transition-all duration-200 touch-press ${
            activeTab === 'home' ? 'text-[#1a6b3c]' : 'text-gray-500 hover:text-gray-800'
          }`}
          aria-label="Beranda"
        >
          <div className={`p-1 rounded-xl transition-colors ${activeTab === 'home' ? 'bg-[#1a6b3c]/10' : ''}`}>
            <Home className="w-5 h-5" />
          </div>
          <span className={`text-[10px] tracking-tight font-bold mt-0.5 ${activeTab === 'home' ? 'text-[#1a6b3c]' : 'text-gray-600'}`}>
            Beranda
          </span>
          {activeTab === 'home' && (
            <span className="w-1 h-1 rounded-full bg-[#1a6b3c] mt-0.5"></span>
          )}
        </button>

        {/* Menu 2: Program */}
        <button
          onClick={() => handleNavClick('programs', 'programs')}
          className={`flex flex-col items-center justify-center py-1 transition-all duration-200 touch-press ${
            activeTab === 'programs' ? 'text-[#1a6b3c]' : 'text-gray-500 hover:text-gray-800'
          }`}
          aria-label="Program & Kurikulum"
        >
          <div className={`p-1 rounded-xl transition-colors ${activeTab === 'programs' ? 'bg-[#1a6b3c]/10' : ''}`}>
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className={`text-[10px] tracking-tight font-bold mt-0.5 ${activeTab === 'programs' ? 'text-[#1a6b3c]' : 'text-gray-600'}`}>
            Program
          </span>
          {activeTab === 'programs' && (
            <span className="w-1 h-1 rounded-full bg-[#1a6b3c] mt-0.5"></span>
          )}
        </button>

        {/* Menu 3: PPDB 2026 (Prominent Raised Center Action) */}
        <button
          onClick={() => {
            setActiveTab('ppdb');
            onOpenPpdb();
          }}
          className="flex flex-col items-center justify-center -mt-5 touch-press group relative"
          aria-label="Pendaftaran PPDB Online"
        >
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#0d4a28] to-[#1a6b3c] text-white flex items-center justify-center shadow-lg shadow-[#1a6b3c]/40 border-4 border-white group-active:scale-95 transition-transform duration-200 ring-2 ring-[#d4af37]/60">
            <UserCheck className="w-6 h-6 text-[#d4af37] animate-pulse" />
          </div>
          <span className="text-[10px] font-black tracking-tight text-[#1a6b3c] mt-1 bg-[#d4af37]/20 px-1.5 py-0.2 rounded-md">
            PPDB '26
          </span>
        </button>

        {/* Menu 4: Berita */}
        <button
          onClick={() => handleNavClick('news', 'news')}
          className={`flex flex-col items-center justify-center py-1 transition-all duration-200 touch-press ${
            activeTab === 'news' ? 'text-[#1a6b3c]' : 'text-gray-500 hover:text-gray-800'
          }`}
          aria-label="Berita & Pengumuman"
        >
          <div className={`p-1 rounded-xl transition-colors ${activeTab === 'news' ? 'bg-[#1a6b3c]/10' : ''}`}>
            <Newspaper className="w-5 h-5" />
          </div>
          <span className={`text-[10px] tracking-tight font-bold mt-0.5 ${activeTab === 'news' ? 'text-[#1a6b3c]' : 'text-gray-600'}`}>
            Berita
          </span>
          {activeTab === 'news' && (
            <span className="w-1 h-1 rounded-full bg-[#1a6b3c] mt-0.5"></span>
          )}
        </button>

        {/* Menu 5: Kontak / Lokasi */}
        <button
          onClick={() => handleNavClick('lokasi', 'contact')}
          className={`flex flex-col items-center justify-center py-1 transition-all duration-200 touch-press ${
            activeTab === 'contact' ? 'text-[#1a6b3c]' : 'text-gray-500 hover:text-gray-800'
          }`}
          aria-label="Kontak & Lokasi"
        >
          <div className={`p-1 rounded-xl transition-colors ${activeTab === 'contact' ? 'bg-[#1a6b3c]/10' : ''}`}>
            <PhoneCall className="w-5 h-5" />
          </div>
          <span className={`text-[10px] tracking-tight font-bold mt-0.5 ${activeTab === 'contact' ? 'text-[#1a6b3c]' : 'text-gray-600'}`}>
            Kontak
          </span>
          {activeTab === 'contact' && (
            <span className="w-1 h-1 rounded-full bg-[#1a6b3c] mt-0.5"></span>
          )}
        </button>

      </div>
    </nav>
  );
};
