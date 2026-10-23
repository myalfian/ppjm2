import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, ArrowRight, UserPlus } from 'lucide-react';

interface CountdownBannerProps {
  onOpenPpdb: () => void;
}

export const CountdownBanner: React.FC<CountdownBannerProps> = ({ onOpenPpdb }) => {
  // Target: July 15, 2026 for PPDB Gelombang I
  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 0
  });

  useEffect(() => {
    // Set a realistic countdown target in 2026
    const targetDate = new Date('2026-07-15T23:59:59').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const format = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="bg-gradient-to-r from-[#0d4a28] via-[#1a6b3c] to-[#0d4a28] text-white py-4 px-4 sm:px-6 shadow-md border-y border-[#d4af37]/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Info */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0 hidden sm:flex">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="bg-[#d4af37] text-gray-900 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                PPDB 2026/2027
              </span>
              <span className="text-xs font-bold text-[#fef3c7]">Gelombang I: Ditutup Segera</span>
            </div>
            <p className="text-xs text-gray-200 mt-0.5">
              Kuota terbatas: 60 Santri Putra & 60 Santri Putri. Seleksi berkas & tes Al-Qur'an.
            </p>
          </div>
        </div>

        {/* Timer Blocks & CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-center">
            <div className="bg-black/30 backdrop-blur px-2.5 py-1.5 rounded-lg border border-white/10 min-w-[42px]">
              <span className="font-extrabold text-sm sm:text-base text-[#d4af37]">{format(timeLeft.days)}</span>
              <span className="block text-[9px] text-gray-300 uppercase tracking-tighter">Hari</span>
            </div>
            <span className="text-white font-bold">:</span>
            <div className="bg-black/30 backdrop-blur px-2.5 py-1.5 rounded-lg border border-white/10 min-w-[42px]">
              <span className="font-extrabold text-sm sm:text-base text-[#d4af37]">{format(timeLeft.hours)}</span>
              <span className="block text-[9px] text-gray-300 uppercase tracking-tighter">Jam</span>
            </div>
            <span className="text-white font-bold">:</span>
            <div className="bg-black/30 backdrop-blur px-2.5 py-1.5 rounded-lg border border-white/10 min-w-[42px]">
              <span className="font-extrabold text-sm sm:text-base text-[#d4af37]">{format(timeLeft.minutes)}</span>
              <span className="block text-[9px] text-gray-300 uppercase tracking-tighter">Mnt</span>
            </div>
            <span className="text-white font-bold">:</span>
            <div className="bg-black/30 backdrop-blur px-2.5 py-1.5 rounded-lg border border-white/10 min-w-[42px]">
              <span className="font-extrabold text-sm sm:text-base text-[#d4af37]">{format(timeLeft.seconds)}</span>
              <span className="block text-[9px] text-gray-300 uppercase tracking-tighter">Dtk</span>
            </div>
          </div>

          <button
            onClick={onOpenPpdb}
            className="px-4 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#b59326] text-gray-900 font-extrabold text-xs shadow-md flex items-center gap-1.5 btn-spring shrink-0"
          >
            <UserPlus className="w-3.5 h-3.5 text-gray-900" />
            <span>Daftar Sekarang</span>
          </button>
        </div>
      </div>
    </div>
  );
};
