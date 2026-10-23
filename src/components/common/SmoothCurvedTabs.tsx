import React from 'react';

export interface TabItem<T extends string = string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface SmoothCurvedTabsProps<T extends string = string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (id: T) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

/**
 * SmoothCurvedTabs
 * Inspired by modern smooth-curve edges / SVG gooey tab head layout.
 * Features:
 * - Concave inverted curved outer wings (smooth curve edges) at tab boundaries
 * - Emerald gradient (#0d4a28 to #1a6b3c) with subtle gold accent glow (#d4af37)
 * - Tactile spring micro-interactions
 * - Mobile responsive horizontal scroll with no-scrollbar
 */
export function SmoothCurvedTabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  className = '',
  size = 'md',
  fullWidth = false,
}: SmoothCurvedTabsProps<T>) {
  const sizeClasses = {
    sm: 'text-xs py-1.5 px-3.5 gap-1.5',
    md: 'text-xs sm:text-sm py-2 px-4 sm:px-5 gap-2',
    lg: 'text-sm sm:text-base py-2.5 px-5 sm:px-6 gap-2.5',
  };

  return (
    <div className={`relative max-w-full ${className}`}>
      {/* Hidden SVG Gooey Filter definition for liquid curve rendering if needed */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="smooth-gooey-effect">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Outer track bar with soft elevation & blur */}
      <div className="p-1 sm:p-1.5 bg-gray-100/80 backdrop-blur-md rounded-2xl sm:rounded-[22px] border border-gray-200/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] inline-flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth max-w-full px-2 py-1.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`relative z-10 shrink-0 font-bold whitespace-nowrap transition-all duration-300 rounded-xl sm:rounded-2xl select-none flex items-center justify-center cursor-pointer ${
                sizeClasses[size]
              } ${
                fullWidth ? 'flex-1' : ''
              } ${
                isActive
                  ? 'text-white shadow-lg shadow-[#0d4a28]/30 scale-[1.02] mx-1'
                  : 'text-gray-600 hover:text-[#0d4a28] hover:bg-white/80 active:scale-95'
              }`}
              style={
                isActive
                  ? {
                      background: 'linear-gradient(135deg, #0d4a28 0%, #155d34 50%, #1a6b3c 100%)',
                    }
                  : undefined
              }
            >
              {/* Left Inverted Concave Curve Wing (Smooth Curve Edge) */}
              {isActive && (
                <span
                  className="absolute -bottom-0 -left-2.5 w-2.5 h-2.5 pointer-events-none overflow-hidden block"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 10 10" className="w-full h-full fill-[#0d4a28]">
                    <path d="M10 0C10 5.52285 5.52285 10 0 10H10V0Z" />
                  </svg>
                </span>
              )}

              {/* Right Inverted Concave Curve Wing (Smooth Curve Edge) */}
              {isActive && (
                <span
                  className="absolute -bottom-0 -right-2.5 w-2.5 h-2.5 pointer-events-none overflow-hidden block"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 10 10" className="w-full h-full fill-[#1a6b3c]">
                    <path d="M0 0C0 5.52285 4.47715 10 10 10H0V0Z" />
                  </svg>
                </span>
              )}

              {/* Icon */}
              {tab.icon && (
                <span
                  className={`transition-colors duration-200 shrink-0 ${
                    isActive ? 'text-[#d4af37]' : 'text-gray-400 group-hover:text-[#1a6b3c]'
                  }`}
                >
                  {tab.icon}
                </span>
              )}

              {/* Label */}
              <span className="tracking-wide whitespace-nowrap">{tab.label}</span>

              {/* Badge if available */}
              {tab.badge !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1 transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-emerald-100 text-[#0d4a28]'
                  }`}
                >
                  {tab.badge}
                </span>
              )}

              {/* Active Golden Highlight pip */}
              {isActive && (
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#d4af37] rounded-full shadow-xs opacity-90"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
