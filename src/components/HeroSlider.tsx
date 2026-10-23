import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  X, 
  Share2, 
  Sparkles 
} from 'lucide-react';
import { HeroSlide } from '../types';
import { initialHeroSlides } from '../data/initialData';

interface HeroSliderProps {
  onOpenPpdb: () => void;
  onOpenStatus: () => void;
  slides?: HeroSlide[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ 
  onOpenPpdb, 
  onOpenStatus, 
  slides: propSlides 
}) => {
  const slides = useMemo(() => {
    return propSlides && propSlides.length > 0 ? propSlides : initialHeroSlides;
  }, [propSlides]);

  const total = slides.length;
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFlyer, setSelectedFlyer] = useState<HeroSlide | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Touch & Mouse Drag State
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartXRef = useRef<number | null>(null);
  const dragStartTimeRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<number | null>(null);
  const isInteractingRef = useRef<boolean>(false);

  // Responsive Viewport Width
  const [viewportWidth, setViewportWidth] = useState<number>(() => {
    return typeof window !== 'undefined' ? window.innerWidth : 1200;
  });

  // Track prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Track Viewport Resize (Passive)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation handlers with circular wrap
  const next = useCallback(() => {
    if (total <= 1) return;
    setCurrent(prev => (prev + 1) % total);
    setProgress(0);
  }, [total]);

  const prev = useCallback(() => {
    if (total <= 1) return;
    setCurrent(prev => (prev - 1 + total) % total);
    setProgress(0);
  }, [total]);

  const goToSlide = useCallback((index: number) => {
    if (total <= 1) return;
    setCurrent((index + total) % total);
    setProgress(0);
  }, [total]);

  // Autoplay Loop with Progress updates (5.5s duration)
  useEffect(() => {
    if (total <= 1 || prefersReducedMotion || isPaused || isInteractingRef.current) {
      return;
    }

    const duration = 5500;
    const intervalStep = 50;
    let elapsed = 0;

    const timer = window.setInterval(() => {
      elapsed += intervalStep;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (elapsed >= duration) {
        next();
        elapsed = 0;
      }
    }, intervalStep);

    autoplayTimerRef.current = timer;

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [total, prefersReducedMotion, isPaused, next, current]);

  // Auto-pause when Tab is inactive (Page Visibility API)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Touch and Mouse Drag Gestures with Inertia
  const handleTouchStart = (e: React.TouchEvent) => {
    if (total <= 1) return;
    isInteractingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = e.touches[0].clientX;
    dragStartTimeRef.current = Date.now();
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || dragStartXRef.current === null) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - dragStartXRef.current;
    // Dampen drag at extremes if not looping smoothly
    setDragOffset(deltaX);
  };

  const handleTouchEnd = () => {
    if (!isDragging || dragStartXRef.current === null) return;
    const elapsed = Date.now() - dragStartTimeRef.current;
    const velocity = Math.abs(dragOffset) / Math.max(elapsed, 1);
    const threshold = velocity > 0.4 ? 30 : 60;

    if (dragOffset < -threshold) {
      next();
    } else if (dragOffset > threshold) {
      prev();
    }
    
    setIsDragging(false);
    setDragOffset(0);
    dragStartXRef.current = null;
    isInteractingRef.current = false;
  };

  // Mouse drag support for desktop/trackpads
  const handleMouseDown = (e: React.MouseEvent) => {
    if (total <= 1) return;
    isInteractingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragStartTimeRef.current = Date.now();
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStartXRef.current === null) return;
    const deltaX = e.clientX - dragStartXRef.current;
    setDragOffset(deltaX);
  };

  const handleMouseUp = () => {
    if (!isDragging || dragStartXRef.current === null) return;
    const elapsed = Date.now() - dragStartTimeRef.current;
    const velocity = Math.abs(dragOffset) / Math.max(elapsed, 1);
    const threshold = velocity > 0.4 ? 35 : 70;

    if (dragOffset < -threshold) {
      next();
    } else if (dragOffset > threshold) {
      prev();
    }

    setIsDragging(false);
    setDragOffset(0);
    dragStartXRef.current = null;
    isInteractingRef.current = false;
  };

  // Keyboard Navigation: ArrowLeft, ArrowRight, Home, End
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (total <= 1) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(total - 1);
    }
  };

  // Trigger modal preview or custom link
  const handleCardAction = (slide: HeroSlide) => {
    if (slide.link) {
      window.open(slide.link, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedFlyer(slide);
    }
  };

  // Share flyer link
  const handleShareFlyer = (slide: HeroSlide) => {
    if (navigator.share) {
      navigator.share({
        title: slide.title,
        text: slide.desc,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(`${window.location.origin}/#home`);
      alert('Tautan informasi flyer berhasil disalin!');
    }
  };

  // Calculate Layout Dimensions by Breakpoint
  const isDesktop = viewportWidth >= 1024;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;
  const isMobile = viewportWidth < 640;

  // Max visible cards count based on breakpoint and total available
  const visibleSlots = isDesktop ? 5 : isTablet ? 3 : 1;
  const maxOffset = Math.min(Math.floor(visibleSlots / 2), Math.floor((total - 1) / 2));

  // Determine transforms & 3D styling for each offset relative to current active
  const getCardStyle = (offset: number) => {
    // Basic normalized values
    const absOffset = Math.abs(offset);

    // If reduced motion is preferred, use flat 2D layout without perspective
    if (prefersReducedMotion) {
      const isVisible = absOffset <= maxOffset;
      return {
        transform: `translate(-50%, -50%) scale(${offset === 0 ? 1 : 0.85})`,
        opacity: offset === 0 ? 1 : isVisible ? 0.6 : 0,
        zIndex: offset === 0 ? 30 : 20 - absOffset,
        pointerEvents: offset === 0 ? ('auto' as const) : isVisible ? ('auto' as const) : ('none' as const),
        visibility: isVisible ? ('visible' as const) : ('hidden' as const),
        transition: 'opacity 300ms ease, transform 300ms ease'
      };
    }

    // In desktop view (>= 1024px): 5 cards visible (offset -2, -1, 0, 1, 2)
    if (isDesktop) {
      if (absOffset > 2 || absOffset > maxOffset) {
        return {
          transform: `translate(-50%, -50%) translateX(${offset > 0 ? 760 : -760}px) scale(0.6) translateZ(-200px)`,
          opacity: 0,
          zIndex: 0,
          pointerEvents: 'none' as const,
          visibility: 'hidden' as const
        };
      }

      let translateX = 0;
      let scale = 1;
      let opacity = 1;
      let zIndex = 30;
      let rotateY = 0;
      let translateZ = 0;

      if (offset === 0) {
        translateX = dragOffset;
        scale = 1;
        opacity = 1;
        zIndex = 30;
        rotateY = dragOffset * 0.03;
        translateZ = 0;
      } else if (absOffset === 1) {
        translateX = (offset > 0 ? 330 : -330) + dragOffset * 0.75;
        scale = 0.85;
        opacity = 0.80;
        zIndex = 20;
        rotateY = offset > 0 ? -9 : 9;
        translateZ = -60;
      } else if (absOffset === 2) {
        translateX = (offset > 0 ? 570 : -570) + dragOffset * 0.5;
        scale = 0.72;
        opacity = 0.52;
        zIndex = 10;
        rotateY = offset > 0 ? -16 : 16;
        translateZ = -130;
      }

      return {
        transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity,
        zIndex,
        pointerEvents: 'auto' as const,
        visibility: 'visible' as const,
        transition: isDragging ? 'none' : 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)'
      };
    }

    // In tablet view (640 - 1023px): 3 cards visible (offset -1, 0, 1)
    if (isTablet) {
      if (absOffset > 1 || absOffset > maxOffset) {
        return {
          transform: `translate(-50%, -50%) translateX(${offset > 0 ? 460 : -460}px) scale(0.65) translateZ(-120px)`,
          opacity: 0,
          zIndex: 0,
          pointerEvents: 'none' as const,
          visibility: 'hidden' as const
        };
      }

      let translateX = 0;
      let scale = 1;
      let opacity = 1;
      let zIndex = 30;
      let rotateY = 0;
      let translateZ = 0;

      if (offset === 0) {
        translateX = dragOffset;
        scale = 1;
        opacity = 1;
        zIndex = 30;
        rotateY = dragOffset * 0.04;
      } else {
        translateX = (offset > 0 ? 250 : -250) + dragOffset * 0.75;
        scale = 0.84;
        opacity = 0.75;
        zIndex = 20;
        rotateY = offset > 0 ? -7 : 7;
        translateZ = -45;
      }

      return {
        transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity,
        zIndex,
        pointerEvents: 'auto' as const,
        visibility: 'visible' as const,
        transition: isDragging ? 'none' : 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)'
      };
    }

    // In mobile view (< 640px): 1 card fit to (width) screen
    const slideOffset = viewportWidth;
    if (absOffset > 1) {
      return {
        transform: `translate(-50%, -50%) translateX(${offset > 0 ? slideOffset * 1.5 : -slideOffset * 1.5}px)`,
        opacity: 0,
        zIndex: 0,
        pointerEvents: 'none' as const,
        visibility: 'hidden' as const
      };
    }

    let translateX = 0;
    let opacity = 1;
    let zIndex = 30;

    if (offset === 0) {
      translateX = dragOffset;
      opacity = 1;
      zIndex = 30;
    } else {
      translateX = (offset > 0 ? slideOffset : -slideOffset) + dragOffset;
      opacity = 0.95;
      zIndex = 20;
    }

    return {
      transform: `translate(-50%, -50%) translateX(${translateX}px)`,
      opacity,
      zIndex,
      pointerEvents: 'auto' as const,
      visibility: 'visible' as const,
      transition: isDragging ? 'none' : 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1), opacity 450ms cubic-bezier(0.16, 1, 0.3, 1)'
    };
  };

  if (total === 0) return null;

  return (
    <section 
      id="home" 
      role="region"
      aria-roledescription="carousel"
      aria-label="Informasi Utama & Program Unggulan Pondok Pesantren Jauharul Maknuun"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative w-full py-1.5 sm:py-2.5 lg:py-3 bg-radial from-slate-900 via-slate-950 to-slate-950 overflow-hidden select-none outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
      onMouseEnter={() => {
        isInteractingRef.current = true;
        setIsPaused(true);
      }}
      onMouseLeave={() => {
        isInteractingRef.current = false;
        setIsPaused(false);
      }}
    >
      {/* Background Ambience Pattern */}
      <div className="absolute inset-0 dark-islamic-pattern opacity-15 pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto px-0 sm:px-4 relative">
        
        {/* Carousel Viewport Container with 3D Perspective (Height fits 800x450 card) */}
        <div 
          ref={containerRef}
          className="relative w-full h-[200px] xs:h-[225px] sm:h-[340px] md:h-[400px] lg:h-[465px] overflow-x-hidden flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
          style={{ 
            perspective: prefersReducedMotion ? 'none' : '1200px',
            WebkitTapHighlightColor: 'transparent'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {slides.map((slide, index) => {
            // Calculate circular offset
            let offset = index - current;
            while (offset > total / 2) offset -= total;
            while (offset < -total / 2) offset += total;

            const isActive = offset === 0;
            const style = getCardStyle(offset);
            const isImageLoaded = loadedImages[slide.id];
            const hasImageError = imageErrors[slide.id];

            return (
              <div
                key={slide.id || index}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} dari ${total}: ${slide.title}`}
                aria-hidden={!isActive}
                style={style}
                onClick={() => {
                  if (Math.abs(dragOffset) < 10) {
                    if (isActive) {
                      handleCardAction(slide);
                    } else {
                      goToSlide(index);
                    }
                  }
                }}
                className={`absolute top-1/2 left-1/2 w-full sm:w-[580px] md:w-[680px] lg:w-[800px] max-w-full sm:max-w-[800px] aspect-[16/9] rounded-none sm:rounded-2xl overflow-hidden transform-gpu will-change-transform ${
                  isActive 
                    ? 'ring-1 ring-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(212,175,55,0.25)]' 
                    : 'ring-1 ring-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.4)] cursor-pointer hover:brightness-105'
                }`}
              >
                {/* 1. Skeleton Shimmer Placeholder while Loading */}
                {!isImageLoaded && !hasImageError && (
                  <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center z-0">
                    <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-[#d4af37] animate-spin"></div>
                  </div>
                )}

                {/* 2. Main Sharp Flyer Image Layer (Fit to Screen Width on Mobile) */}
                {!hasImageError ? (
                  <img
                    src={slide.image}
                    alt={slide.title || `Flyer ${index + 1}`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    decoding="async"
                    onLoad={() => setLoadedImages(prev => ({ ...prev, [slide.id]: true }))}
                    onError={() => setImageErrors(prev => ({ ...prev, [slide.id]: true }))}
                    className="w-full h-full object-cover rounded-none sm:rounded-2xl select-none pointer-events-none transition-opacity duration-300"
                  />
                ) : (
                  /* Fallback Dark Islamic Background on Image Error */
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0b3d21] via-slate-900 to-black flex items-center justify-center p-6 text-center rounded-none sm:rounded-2xl">
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto text-[#d4af37]">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-bold uppercase text-[#d4af37] tracking-wider">Pondok Pesantren Jauharul Maknuun</p>
                    </div>
                  </div>
                )}

                {/* 3. Subtle Dimming on Inactive Cards */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/30 pointer-events-none rounded-none sm:rounded-2xl transition-opacity duration-300" />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Pagination Indicators (Centered & Minimalist) */}
        {total > 1 && (
          <div className="flex items-center justify-center pt-1.5 sm:pt-2 pb-0.5">
            {/* Indicator Dots with Smooth Progress Fill & Accessible Tap Target */}
            <div className="flex items-center gap-1">
              {slides.map((slide, i) => {
                const isActiveDot = i === current;
                return (
                  <button
                    key={slide.id || i}
                    type="button"
                    onClick={() => goToSlide(i)}
                    className="p-1.5 cursor-pointer flex items-center justify-center focus:outline-hidden group"
                    aria-label={`Pindah ke slide ${i + 1}: ${slide.title}`}
                    aria-current={isActiveDot ? 'true' : 'false'}
                    title={`Slide ${i + 1}: ${slide.title}`}
                  >
                    <span
                      className={`relative block h-1.5 sm:h-2 rounded-full overflow-hidden transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-white ${
                        isActiveDot 
                          ? 'w-7 sm:w-9 bg-white/30 ring-1 ring-white/40' 
                          : 'w-1.5 sm:w-2 bg-white/30 group-hover:bg-white/50'
                      }`}
                    >
                      {isActiveDot && !isPaused && !prefersReducedMotion && (
                        <span 
                          className="absolute inset-y-0 left-0 bg-[#ffcc00] rounded-full transition-all duration-75 ease-linear"
                          style={{ width: `${progress}%` }}
                        />
                      )}
                      {isActiveDot && (isPaused || prefersReducedMotion) && (
                        <span className="absolute inset-0 bg-[#ffcc00] rounded-full" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* ================= FULL-SIZE FLYER MODAL / BOTTOM SHEET ================= */}
      {selectedFlyer && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau Flyer: ${selectedFlyer.title}`}
          onClick={() => setSelectedFlyer(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-slate-900 rounded-t-[24px] sm:rounded-[24px] overflow-hidden border border-white/20 shadow-2xl max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-950/80">
              <div className="flex items-center gap-2 min-w-0 pr-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffcc00] shrink-0"></span>
                <h3 className="font-serif font-bold text-sm sm:text-base text-white uppercase truncate">
                  {selectedFlyer.title}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleShareFlyer(selectedFlyer)}
                  className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition"
                  title="Bagikan Flyer"
                  aria-label="Bagikan Flyer"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedFlyer(null)}
                  className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition"
                  title="Tutup Pratinjau"
                  aria-label="Tutup Pratinjau"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: High Resolution Flyer Image */}
            <div className="p-3 sm:p-5 overflow-y-auto flex-1 flex flex-col items-center bg-black/50">
              <div className="relative max-w-md w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-slate-950">
                <img 
                  src={selectedFlyer.image} 
                  alt={selectedFlyer.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Flyer Detail Summary */}
              <div className="w-full max-w-md mt-4 text-left space-y-2">
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
                  {selectedFlyer.desc}
                </p>
                {selectedFlyer.tagline && (
                  <p className="text-xs font-semibold text-[#ffcc00]">
                    {selectedFlyer.tagline}
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-3 sm:p-4 border-t border-white/10 bg-slate-950 flex flex-wrap items-center justify-between gap-2.5">
              <span className="text-[11px] text-gray-400">
                Official Flyer • Pondok Pesantren Jauharul Maknuun
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFlyer(null);
                    onOpenPpdb();
                  }}
                  className="px-4 py-2 rounded-xl bg-[#d4af37] hover:bg-[#e6be3e] text-slate-950 font-bold text-xs transition shadow-sm"
                >
                  Daftar Santri Baru
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Global Embedded Styles for Smooth FadeUp Animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};
