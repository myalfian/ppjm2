import React, { useState, useEffect } from 'react';
import { Home, Newspaper, Share2, Laptop, GraduationCap } from 'lucide-react';

interface BottomNavProps {
  onOpenPpdb?: () => void;
  onOpenMedsos?: () => void;
  onOpenElearning?: () => void;
  onOpenMenu?: () => void;
  isMenuOpen?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ 
  onOpenPpdb,
  onOpenMedsos,
  onOpenElearning, 
  onOpenMenu,
  isMenuOpen = false
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'news' | 'medsos' | 'elearning' | 'ppdb'>('home');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 280;

      const medsosEl = document.getElementById('medsos') || document.getElementById('lokasi');
      const newsEl = document.getElementById('news');

      if (medsosEl && scrollPos >= medsosEl.offsetTop) {
        setActiveTab('medsos');
      } else if (newsEl && scrollPos >= newsEl.offsetTop) {
        setActiveTab('news');
      } else if (window.scrollY < 300) {
        setActiveTab('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, tab: 'home' | 'news' | 'medsos' | 'elearning' | 'ppdb') => {
    setActiveTab(tab);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav 
      aria-label="Navigasi Bawah Mobile"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden transition-all duration-300"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.35rem)' }}
    >
      <div className="grid grid-cols-5 items-center justify-around px-2 pt-1 max-w-lg mx-auto relative">
        
        {/* 1. Home */}
        <button
          onClick={() => handleNavClick('home', 'home')}
          className="flex flex-col items-center justify-center py-1 transition-all duration-200 touch-press group"
          aria-label="Home"
        >
          <div className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
            activeTab === 'home' 
              ? 'bg-[#e8f5e9] text-[#1a6b3c]' 
              : 'text-slate-500 group-hover:text-slate-700'
          }`}>
            <Home className="w-5 h-5 stroke-[2.1]" />
          </div>
          <span className={`text-[11px] tracking-tight mt-0.5 leading-none transition-colors ${
            activeTab === 'home' 
              ? 'text-[#1a6b3c] font-semibold' 
              : 'text-slate-600 font-medium'
          }`}>
            Home
          </span>
          <span className={`w-1.5 h-1.5 rounded-full bg-[#1a6b3c] mt-1 transition-opacity ${
            activeTab === 'home' ? 'opacity-100' : 'opacity-0'
          }`}></span>
        </button>

        {/* 2. JM News */}
        <button
          onClick={() => handleNavClick('news', 'news')}
          className="flex flex-col items-center justify-center py-1 transition-all duration-200 touch-press group"
          aria-label="JM News"
        >
          <div className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
            activeTab === 'news' 
              ? 'bg-[#e8f5e9] text-[#1a6b3c]' 
              : 'text-slate-500 group-hover:text-slate-700'
          }`}>
            <Newspaper className="w-5 h-5 stroke-[2.1]" />
          </div>
          <span className={`text-[11px] tracking-tight mt-0.5 leading-none transition-colors ${
            activeTab === 'news' 
              ? 'text-[#1a6b3c] font-semibold' 
              : 'text-slate-600 font-medium'
          }`}>
            JM News
          </span>
          <span className={`w-1.5 h-1.5 rounded-full bg-[#1a6b3c] mt-1 transition-opacity ${
            activeTab === 'news' ? 'opacity-100' : 'opacity-0'
          }`}></span>
        </button>

        {/* 3. Center Elevated FAB: Medsos */}
        <div className="flex flex-col items-center justify-center -mt-6">
          <button
            onClick={() => {
              setActiveTab('medsos');
              if (onOpenMedsos) {
                onOpenMedsos();
              } else {
                const element = document.getElementById('medsos') || document.getElementById('lokasi');
                if (element) {
                  const headerOffset = 70;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }
            }}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0d4a28] border-[3px] border-white ring-2 ring-[#d4af37] shadow-[0_6px_16px_rgba(13,74,40,0.35)] flex items-center justify-center text-emerald-400 hover:scale-105 active:scale-95 transition-transform duration-200"
            aria-label="Media Sosial Resmi"
          >
            <Share2 className="w-6 h-6 stroke-[2.3] text-emerald-300" />
          </button>
          <span className="mt-1 px-2.5 py-0.5 rounded-full bg-[#fef3c7] border border-[#fde68a] text-[10px] font-bold text-[#0d4a28] tracking-tight whitespace-nowrap shadow-xs">
            Medsos
          </span>
        </div>

        {/* 4. E-Learning */}
        <button
          onClick={() => {
            setActiveTab('elearning');
            onOpenElearning?.();
          }}
          className="flex flex-col items-center justify-center py-1 transition-all duration-200 touch-press group"
          aria-label="E-Learning"
        >
          <div className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
            activeTab === 'elearning' 
              ? 'bg-[#e8f5e9] text-[#1a6b3c]' 
              : 'text-slate-500 group-hover:text-slate-700'
          }`}>
            <Laptop className="w-5 h-5 stroke-[2.1]" />
          </div>
          <span className={`text-[11px] tracking-tight mt-0.5 leading-none transition-colors ${
            activeTab === 'elearning' 
              ? 'text-[#1a6b3c] font-semibold' 
              : 'text-slate-600 font-medium'
          }`}>
            E-Learning
          </span>
          <span className={`w-1.5 h-1.5 rounded-full bg-[#1a6b3c] mt-1 transition-opacity ${
            activeTab === 'elearning' ? 'opacity-100' : 'opacity-0'
          }`}></span>
        </button>

        {/* 5. PPDB */}
        <button
          onClick={() => {
            setActiveTab('ppdb');
            if (onOpenPpdb) {
              onOpenPpdb();
            } else {
              const element = document.getElementById('ppdb');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
          className="flex flex-col items-center justify-center py-1 transition-all duration-200 touch-press group"
          aria-label="PPDB"
        >
          <div className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
            activeTab === 'ppdb'
              ? 'bg-[#e8f5e9] text-[#1a6b3c]' 
              : 'text-slate-500 group-hover:text-slate-700'
          }`}>
            <GraduationCap className="w-5 h-5 stroke-[2.1]" />
          </div>
          <span className={`text-[11px] tracking-tight mt-0.5 leading-none transition-colors ${
            activeTab === 'ppdb'
              ? 'text-[#1a6b3c] font-semibold' 
              : 'text-slate-600 font-medium'
          }`}>
            PPDB
          </span>
          <span className={`w-1.5 h-1.5 rounded-full bg-[#1a6b3c] mt-1 transition-opacity ${
            activeTab === 'ppdb' ? 'opacity-100' : 'opacity-0'
          }`}></span>
        </button>

      </div>
    </nav>
  );
};
