import React from 'react';

interface WaveDividerProps {
  fillColor?: string; // Color of the wave fill (e.g., 'text-[#f1f7f2]' or 'text-white')
  bgColor?: string;   // Background color behind the wave (e.g., 'bg-white' or 'bg-[#f1f7f2]')
  flip?: boolean;     // Flip vertically (upside down)
  variant?: 'gentle' | 'crest' | 'layered';
  className?: string;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({
  fillColor = 'text-[#f1f7f2]',
  bgColor = 'transparent',
  flip = false,
  variant = 'layered',
  className = ''
}) => {
  return (
    <div 
      className={`w-full overflow-hidden leading-none select-none pointer-events-none ${bgColor} ${flip ? 'rotate-180' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg
        className={`w-full block h-5 sm:h-8 md:h-11 ${fillColor}`}
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {variant === 'layered' ? (
          <>
            {/* Subtle semi-transparent accent wave */}
            <path
              d="M0,28 C240,48 480,10 720,28 C960,46 1200,16 1440,32 L1440,60 L0,60 Z"
              fill="currentColor"
              fillOpacity="0.25"
            />
            {/* Foreground crisp wave */}
            <path
              d="M0,18 C180,38 360,6 540,24 C720,44 900,12 1080,26 C1260,40 1380,22 1440,16 L1440,60 L0,60 Z"
              fill="currentColor"
            />
          </>
        ) : variant === 'crest' ? (
          <path
            d="M0,30 C320,55 480,8 800,38 C1120,60 1280,15 1440,28 L1440,60 L0,60 Z"
            fill="currentColor"
          />
        ) : (
          <path
            d="M0,20 C360,45 720,5 1080,35 C1260,45 1380,25 1440,20 L1440,60 L0,60 Z"
            fill="currentColor"
          />
        )}
      </svg>
    </div>
  );
};
