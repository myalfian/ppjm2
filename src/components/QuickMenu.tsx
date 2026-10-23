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
      pillBg: 'bg-[#fef3c7] hover:bg-[#fde68a]/70 border-[#fde68a]',
      iconColor: 'text-[#92400e]',
      action: () => scrollTo('sambutan-direktur')
    },
    {
      id: 'visi-misi',
      label: 'Visi & Misi',
      icon: Compass,
      pillBg: 'bg-[#dbeafe] hover:bg-[#bfdbfe]/70 border-[#bfdbfe]',
      iconColor: 'text-[#1e40af]',
      action: () => scrollTo('visi-misi')
    },
    {
      id: 'pengumuman',
      label: 'Pengumuman',
      icon: Megaphone,
      pillBg: 'bg-[#ffe4e6] hover:bg-[#fecdd3]/70 border-[#fecdd3]',
      iconColor: 'text-[#be123c]',
      action: () => scrollTo('news')
    },
    {
      id: 'elearning',
      label: 'E-Learning',
      icon: Laptop,
      pillBg: 'bg-[#d1fae5] hover:bg-[#a7f3d0]/70 border-[#a7f3d0]',
      iconColor: 'text-[#065f46]',
      action: onOpenElearning
    },
    {
      id: 'ekskul',
      label: 'Ekstrakurikuler',
      icon: Activity,
      pillBg: 'bg-[#ffedd5] hover:bg-[#fed7aa]/70 border-[#fed7aa]',
      iconColor: 'text-[#9a3412]',
      action: () => scrollTo('ekstrakurikuler')
    },
    {
      id: 'prestasi',
      label: 'Prestasi',
      icon: Trophy,
      pillBg: 'bg-[#fef9c3] hover:bg-[#fef08a]/70 border-[#fef08a]',
      iconColor: 'text-[#854d0e]',
      action: () => scrollTo('prestasi')
    }
  ];

  return (
    <section 
      aria-label="Menu Cepat Portal" 
      className="relative z-30 -mt-7 sm:-mt-10 bg-white rounded-t-3xl sm:rounded-t-4xl border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] py-3 sm:py-4.5"
    >
      <div className="max-w-md sm:max-w-xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 gap-y-3 gap-x-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                type="button"
                className="flex flex-col items-center justify-center group focus:outline-hidden touch-press transition-transform duration-150 active:scale-95"
                title={item.label}
              >
                {/* Colored Capsule/Pill */}
                <div 
                  className={`w-14 h-8 sm:w-16 sm:h-9 rounded-full flex items-center justify-center border shadow-xs transition-all duration-200 group-hover:scale-105 group-hover:shadow-sm ${item.pillBg}`}
                >
                  <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${item.iconColor} stroke-[2.2]`} />
                </div>

                {/* Label text */}
                <span className="text-[11px] sm:text-xs font-bold text-gray-800 tracking-tight text-center mt-1.5 group-hover:text-[#1a6b3c] transition-colors leading-tight">
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
