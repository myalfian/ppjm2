import React from 'react';
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

export const QuickMenu: React.FC<QuickMenuProps> = ({ onOpenElearning }) => {
  const scrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const menuItems = [
    {
      id: 'sambutan',
      label: 'Sambutan',
      icon: UserCheck,
      cardTheme: 'bg-gradient-to-b from-[#fffbeb] to-[#fef3c7]/90 border-[#fde68a] hover:border-[#f59e0b]/50 shadow-2xs hover:shadow-xs',
      pillTheme: 'bg-[#fef3c7]',
      iconColor: 'text-[#92400e]',
      action: () => scrollTo('sambutan-direktur')
    },
    {
      id: 'visi-misi',
      label: 'Visi & Misi',
      icon: Compass,
      cardTheme: 'bg-gradient-to-b from-[#eff6ff] to-[#dbeafe]/90 border-[#bfdbfe] hover:border-[#3b82f6]/50 shadow-2xs hover:shadow-xs',
      pillTheme: 'bg-[#dbeafe]',
      iconColor: 'text-[#1e40af]',
      action: () => scrollTo('visi-misi')
    },
    {
      id: 'pengumuman',
      label: 'Pengumuman',
      icon: Megaphone,
      cardTheme: 'bg-gradient-to-b from-[#fff1f2] to-[#ffe4e6]/90 border-[#fecdd3] hover:border-[#f43f5e]/50 shadow-2xs hover:shadow-xs',
      pillTheme: 'bg-[#ffe4e6]',
      iconColor: 'text-[#be123c]',
      action: () => scrollTo('news')
    },
    {
      id: 'elearning',
      label: 'E-Learning',
      icon: Laptop,
      cardTheme: 'bg-gradient-to-b from-[#ecfdf5] to-[#d1fae5]/90 border-[#a7f3d0] hover:border-[#10b981]/50 shadow-2xs hover:shadow-xs',
      pillTheme: 'bg-[#d1fae5]',
      iconColor: 'text-[#065f46]',
      action: onOpenElearning
    },
    {
      id: 'ekskul',
      label: 'Ekstrakurikuler',
      icon: Activity,
      cardTheme: 'bg-gradient-to-b from-[#fff7ed] to-[#ffedd5]/90 border-[#fed7aa] hover:border-[#f97316]/50 shadow-2xs hover:shadow-xs',
      pillTheme: 'bg-[#ffedd5]',
      iconColor: 'text-[#9a3412]',
      action: () => scrollTo('ekstrakurikuler')
    },
    {
      id: 'prestasi',
      label: 'Prestasi',
      icon: Trophy,
      cardTheme: 'bg-gradient-to-b from-[#fefce8] to-[#fef9c3]/90 border-[#fef08a] hover:border-[#eab308]/50 shadow-2xs hover:shadow-xs',
      pillTheme: 'bg-[#fef9c3]',
      iconColor: 'text-[#854d0e]',
      action: () => scrollTo('prestasi')
    }
  ];

  return (
    <section 
      aria-label="Menu Cepat Portal" 
      className="relative z-30 mt-2.5 sm:mt-4 bg-white rounded-t-3xl sm:rounded-t-4xl border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pt-4 pb-6 sm:pt-6 sm:pb-8 flex items-center justify-center"
    >
      <div className="w-full max-w-md sm:max-w-xl mx-auto px-4 sm:px-6 my-auto flex flex-col justify-center">
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                type="button"
                className={`flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group focus:outline-hidden cursor-pointer ${item.cardTheme}`}
                title={item.label}
              >
                {/* Colored Capsule/Pill inside distinct card */}
                <div 
                  className={`w-12 h-7 sm:w-14 sm:h-8 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-2xs ${item.pillTheme}`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${item.iconColor} stroke-[2.3]`} />
                </div>

                {/* Label text */}
                <span className="text-[11px] sm:text-xs font-bold text-gray-800 tracking-tight text-center mt-1.5 group-hover:text-gray-950 transition-colors leading-tight">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
