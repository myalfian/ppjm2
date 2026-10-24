import React from 'react';
import { 
  UserCheck, 
  Compass, 
  Megaphone, 
  Laptop, 
  Activity, 
  Trophy,
  ArrowUpRight
} from 'lucide-react';

interface QuickMenuProps {
  onOpenElearning: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  cardTheme: string;
  pillTheme: string;
  iconColor: string;
  hoverShadow: string;
  action: () => void;
}

export const QuickMenu: React.FC<QuickMenuProps> = ({ onOpenElearning }) => {
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
      subtitle: 'Pesan & Arahan Pimpinan',
      icon: UserCheck,
      cardTheme: 'bg-gradient-to-br from-[#fffdf5] via-[#fffbeb] to-[#fef3c7]/85 border-[#fde68a]/80',
      pillTheme: 'bg-[#fef3c7] border border-[#fde68a]',
      iconColor: 'text-[#92400e]',
      hoverShadow: 'hover:shadow-amber-500/15 hover:border-[#f59e0b]/60',
      action: () => scrollToSection('sambutan-direktur')
    },
    {
      id: 'visi-misi',
      label: 'Visi & Misi',
      subtitle: 'Arah & Nilai Luhur Lembaga',
      icon: Compass,
      cardTheme: 'bg-gradient-to-br from-[#f8faff] via-[#eff6ff] to-[#dbeafe]/85 border-[#bfdbfe]/80',
      pillTheme: 'bg-[#dbeafe] border border-[#bfdbfe]',
      iconColor: 'text-[#1e40af]',
      hoverShadow: 'hover:shadow-blue-500/15 hover:border-[#3b82f6]/60',
      action: () => scrollToSection('visi-misi')
    },
    {
      id: 'pengumuman',
      label: 'Pengumuman',
      subtitle: 'Informasi & Warta Terkini',
      icon: Megaphone,
      cardTheme: 'bg-gradient-to-br from-[#fff5f6] via-[#fff1f2] to-[#ffe4e6]/85 border-[#fecdd3]/80',
      pillTheme: 'bg-[#ffe4e6] border border-[#fecdd3]',
      iconColor: 'text-[#be123c]',
      hoverShadow: 'hover:shadow-rose-500/15 hover:border-[#f43f5e]/60',
      action: () => scrollToSection('news')
    },
    {
      id: 'elearning',
      label: 'E-Learning',
      subtitle: 'Portal Digital Pembelajaran',
      icon: Laptop,
      cardTheme: 'bg-gradient-to-br from-[#f2fcf7] via-[#ecfdf5] to-[#d1fae5]/85 border-[#a7f3d0]/80',
      pillTheme: 'bg-[#d1fae5] border border-[#a7f3d0]',
      iconColor: 'text-[#065f46]',
      hoverShadow: 'hover:shadow-emerald-500/15 hover:border-[#10b981]/60',
      action: onOpenElearning
    },
    {
      id: 'ekskul',
      label: 'Ekstrakurikuler',
      subtitle: 'Wadah Minat & Bakat Santri',
      icon: Activity,
      cardTheme: 'bg-gradient-to-br from-[#fffaf5] via-[#fff7ed] to-[#ffedd5]/85 border-[#fed7aa]/80',
      pillTheme: 'bg-[#ffedd5] border border-[#fed7aa]',
      iconColor: 'text-[#9a3412]',
      hoverShadow: 'hover:shadow-orange-500/15 hover:border-[#f97316]/60',
      action: () => scrollToSection('ekstrakurikuler')
    },
    {
      id: 'prestasi',
      label: 'Prestasi',
      subtitle: 'Capaian & Kejuaraan Siswa',
      icon: Trophy,
      cardTheme: 'bg-gradient-to-br from-[#fefef0] via-[#fefce8] to-[#fef9c3]/85 border-[#fef08a]/80',
      pillTheme: 'bg-[#fef9c3] border border-[#fef08a]',
      iconColor: 'text-[#854d0e]',
      hoverShadow: 'hover:shadow-yellow-500/15 hover:border-[#eab308]/60',
      action: () => scrollToSection('prestasi')
    }
  ];

  return (
    <section 
      aria-label="Menu Navigasi Cepat Portal" 
      className="relative z-30 -mt-3 sm:-mt-4 bg-white rounded-t-3xl sm:rounded-t-4xl border-t border-gray-100 shadow-[0_-6px_24px_rgba(0,0,0,0.05)] pt-4 pb-5 sm:pt-6 sm:pb-7"
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">
        {/* Layout Menu: 2 Baris x 3 Kolom */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 lg:gap-4.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                type="button"
                className={`group relative flex flex-col md:flex-row items-center md:items-center text-center md:text-left p-2.5 sm:p-4 lg:p-4.5 rounded-2xl lg:rounded-3xl border transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d4af37] cursor-pointer overflow-hidden backdrop-blur-xs min-h-[92px] sm:min-h-[105px] md:min-h-[90px] ${item.cardTheme} ${item.hoverShadow}`}
                title={`${item.label} - ${item.subtitle}`}
              >
                {/* Subtle Glass Highlight */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-white/45 pointer-events-none rounded-t-2xl lg:rounded-t-3xl" />

                {/* Animated Icon Badge */}
                <div 
                  className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-13 lg:h-13 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-2 shadow-xs ${item.pillTheme}`}
                >
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-6.5 lg:h-6.5 ${item.iconColor} stroke-[2.2] transition-transform duration-300 group-hover:scale-105`} />
                </div>

                {/* Card Text Details */}
                <div className="flex-1 min-w-0 mt-1.5 md:mt-0 md:ml-3 lg:ml-4 w-full">
                  <div className="flex items-center justify-center md:justify-between gap-1">
                    <span className="text-xs sm:text-sm md:text-base lg:text-[17px] font-black text-gray-900 tracking-tight leading-snug group-hover:text-black transition-colors truncate">
                      {item.label}
                    </span>
                    <div className="hidden md:flex items-center justify-center w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-white/70 text-gray-400 group-hover:text-gray-800 group-hover:bg-white group-hover:translate-x-0.5 transition-all shadow-2xs">
                      <ArrowUpRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 stroke-[2.3]" />
                    </div>
                  </div>
                  <p className="hidden md:block text-[11px] lg:text-xs text-gray-600 font-medium mt-0.5 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
