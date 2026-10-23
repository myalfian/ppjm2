import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  UserCheck, 
  Compass, 
  Megaphone, 
  Laptop, 
  Activity, 
  Trophy 
} from 'lucide-react';

interface QuickMenuProps {
  onOpenElearning: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  cardTheme: string;
  pillTheme: string;
  iconColor: string;
  hoverShadow: string;
  action: () => void;
}

export const QuickMenu: React.FC<QuickMenuProps> = ({ onOpenElearning }) => {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef(false);

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const menuItems: MenuItem[] = [
    {
      id: 'sambutan',
      label: 'Sambutan',
      icon: UserCheck,
      cardTheme: 'bg-gradient-to-b from-[#fffdf5] via-[#fffbeb] to-[#fef3c7]/95 border-[#fde68a]',
      pillTheme: 'bg-[#fef3c7] border border-[#fde68a]/80',
      iconColor: 'text-[#92400e]',
      hoverShadow: 'hover:shadow-amber-500/20 hover:border-[#f59e0b]/60',
      action: () => scrollToSection('sambutan-direktur')
    },
    {
      id: 'visi-misi',
      label: 'Visi & Misi',
      icon: Compass,
      cardTheme: 'bg-gradient-to-b from-[#f8faff] via-[#eff6ff] to-[#dbeafe]/95 border-[#bfdbfe]',
      pillTheme: 'bg-[#dbeafe] border border-[#bfdbfe]/80',
      iconColor: 'text-[#1e40af]',
      hoverShadow: 'hover:shadow-blue-500/20 hover:border-[#3b82f6]/60',
      action: () => scrollToSection('visi-misi')
    },
    {
      id: 'pengumuman',
      label: 'Pengumuman',
      icon: Megaphone,
      cardTheme: 'bg-gradient-to-b from-[#fff5f6] via-[#fff1f2] to-[#ffe4e6]/95 border-[#fecdd3]',
      pillTheme: 'bg-[#ffe4e6] border border-[#fecdd3]/80',
      iconColor: 'text-[#be123c]',
      hoverShadow: 'hover:shadow-rose-500/20 hover:border-[#f43f5e]/60',
      action: () => scrollToSection('news')
    },
    {
      id: 'elearning',
      label: 'E-Learning',
      icon: Laptop,
      cardTheme: 'bg-gradient-to-b from-[#f2fcf7] via-[#ecfdf5] to-[#d1fae5]/95 border-[#a7f3d0]',
      pillTheme: 'bg-[#d1fae5] border border-[#a7f3d0]/80',
      iconColor: 'text-[#065f46]',
      hoverShadow: 'hover:shadow-emerald-500/20 hover:border-[#10b981]/60',
      action: onOpenElearning
    },
    {
      id: 'ekskul',
      label: 'Ekstrakurikuler',
      icon: Activity,
      cardTheme: 'bg-gradient-to-b from-[#fffaf5] via-[#fff7ed] to-[#ffedd5]/95 border-[#fed7aa]',
      pillTheme: 'bg-[#ffedd5] border border-[#fed7aa]/80',
      iconColor: 'text-[#9a3412]',
      hoverShadow: 'hover:shadow-orange-500/20 hover:border-[#f97316]/60',
      action: () => scrollToSection('ekstrakurikuler')
    },
    {
      id: 'prestasi',
      label: 'Prestasi',
      icon: Trophy,
      cardTheme: 'bg-gradient-to-b from-[#fefef0] via-[#fefce8] to-[#fef9c3]/95 border-[#fef08a]',
      pillTheme: 'bg-[#fef9c3] border border-[#fef08a]/80',
      iconColor: 'text-[#854d0e]',
      hoverShadow: 'hover:shadow-yellow-500/20 hover:border-[#eab308]/60',
      action: () => scrollToSection('prestasi')
    }
  ];

  // Mobile pairs (2 items per screen fit)
  const mobilePairs = [
    [menuItems[0], menuItems[1]],
    [menuItems[2], menuItems[3]],
    [menuItems[4], menuItems[5]],
  ];

  // Scroll to specific page in mobile carousel
  const scrollToPage = useCallback((pageIndex: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const pageWidth = container.clientWidth;
    container.scrollTo({
      left: pageIndex * pageWidth,
      behavior: 'smooth'
    });
    setActiveMobileIndex(pageIndex);
  }, []);

  // Update active page index based on scroll position
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const pageWidth = container.clientWidth;
    if (!pageWidth) return;

    const pageIndex = Math.round(scrollLeft / pageWidth);
    const clampedIndex = Math.max(0, Math.min(pageIndex, mobilePairs.length - 1));
    if (clampedIndex !== activeMobileIndex) {
      setActiveMobileIndex(clampedIndex);
    }
  };

  // Auto-sliding Carousel for Mobile (3.8s interval, pauses on touch/hover)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (isInteractingRef.current) return;

      setActiveMobileIndex((prev) => {
        const nextIndex = (prev + 1) % mobilePairs.length;
        scrollToPage(nextIndex);
        return nextIndex;
      });
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused, mobilePairs.length, scrollToPage]);

  return (
    <section 
      aria-label="Menu Navigasi Cepat Portal" 
      className="relative z-30 -mt-2 sm:-mt-3 bg-white rounded-t-3xl sm:rounded-t-4xl border-t border-gray-100 shadow-[0_-6px_24px_rgba(0,0,0,0.05)] pt-3 pb-3 sm:pt-4 sm:pb-5"
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">
        
        {/* ======================================================== */}
        {/* 1. DESKTOP & TABLET VIEW (md ke atas: 1 Baris Penuh 6 Kolom Besar) */}
        {/* ======================================================== */}
        <div className="hidden md:grid md:grid-cols-6 gap-3 lg:gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                type="button"
                className={`group relative flex flex-col items-center justify-center p-4 sm:p-5 lg:p-6 rounded-2xl lg:rounded-3xl border transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl active:scale-95 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d4af37] cursor-pointer overflow-hidden backdrop-blur-xs min-h-[125px] lg:min-h-[145px] ${item.cardTheme} ${item.hoverShadow}`}
                title={item.label}
              >
                {/* Subtle Glass Highlight */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-white/45 pointer-events-none rounded-t-2xl lg:rounded-t-3xl" />

                {/* Animated Large Icon Badge */}
                <div 
                  className={`w-14 h-11 lg:w-16 lg:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-3 group-hover:-translate-y-0.5 shadow-xs ${item.pillTheme}`}
                >
                  <Icon className={`w-6 h-6 lg:w-7 lg:h-7 ${item.iconColor} stroke-[2.3] transition-transform duration-300 group-hover:scale-105`} />
                </div>

                {/* Card Text Label - Prominent, Bold & Fit to Card */}
                <span className="relative z-10 text-sm md:text-[15px] lg:text-base xl:text-lg font-black text-gray-900 tracking-tight text-center mt-2.5 lg:mt-3 group-hover:text-black transition-colors leading-tight w-full px-1">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* 2. MOBILE VIEW (< md: Tampil Per 2 Menu Fit to Screen Besar) */}
        {/* ======================================================== */}
        <div 
          className="md:hidden relative"
          onMouseEnter={() => {
            isInteractingRef.current = true;
            setIsPaused(true);
          }}
          onMouseLeave={() => {
            isInteractingRef.current = false;
            setIsPaused(false);
          }}
          onTouchStart={() => {
            isInteractingRef.current = true;
            setIsPaused(true);
          }}
          onTouchEnd={() => {
            isInteractingRef.current = false;
            setTimeout(() => {
              if (!isInteractingRef.current) setIsPaused(false);
            }, 1500);
          }}
        >
          {/* Scrollable Track - 2 Large Cards Fit to Screen per Slide Page */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory touch-pan-x"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {mobilePairs.map((pair, pageIdx) => (
              <div 
                key={pageIdx}
                className="w-full shrink-0 grid grid-cols-2 gap-3 px-2 snap-center"
              >
                {pair.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      type="button"
                      className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ease-out active:scale-95 focus:outline-hidden cursor-pointer shadow-sm min-h-[118px] backdrop-blur-xs ${item.cardTheme}`}
                      title={item.label}
                    >
                      {/* Glass Highlight */}
                      <div className="absolute inset-x-0 top-0 h-1/2 bg-white/40 pointer-events-none rounded-t-2xl" />

                      {/* Large Icon Badge */}
                      <div 
                        className={`w-14 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xs group-hover:scale-105 ${item.pillTheme}`}
                      >
                        <Icon className={`w-6 h-6 ${item.iconColor} stroke-[2.3]`} />
                      </div>

                      {/* Text Label - Large, Bold & Fit to Card */}
                      <span className="relative z-10 text-sm xs:text-base font-black text-gray-900 tracking-tight text-center mt-2.5 leading-tight w-full px-1">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Mobile Dot Indicators for the 3 Pages */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {mobilePairs.map((_, pageIdx) => (
              <button
                key={pageIdx}
                type="button"
                onClick={() => scrollToPage(pageIdx)}
                aria-label={`Halaman menu ${pageIdx + 1} dari ${mobilePairs.length}`}
                className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-hidden ${
                  pageIdx === activeMobileIndex 
                    ? 'w-6 h-2 bg-[#d4af37]' 
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
