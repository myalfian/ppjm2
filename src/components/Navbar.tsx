import React, { useState } from 'react';
import { 
  Building2, 
  GraduationCap, 
  Image, 
  Lock, 
  Globe, 
  Sparkles,
  Search,
  Cpu,
  Trophy,
  Activity
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  onOpenPpdb?: () => void;
  onOpenStatus?: () => void;
  isMobileMenuOpen?: boolean;
  onToggleMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenAdmin,
  currentLang,
  onLanguageChange,
  onOpenPpdb,
  onOpenStatus,
  isMobileMenuOpen,
  onToggleMobileMenu
}) => {
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Use controlled state if passed, otherwise internal state
  const mobileMenuOpen = isMobileMenuOpen !== undefined ? isMobileMenuOpen : internalMenuOpen;
  const toggleMobileMenu = onToggleMobileMenu || (() => setInternalMenuOpen(prev => !prev));
  const closeMobileMenu = () => {
    if (onToggleMobileMenu && isMobileMenuOpen) {
      onToggleMobileMenu();
    } else {
      setInternalMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top News Ticker */}
      <div className="bg-[#d4af37]/15 border-b border-[#d4af37]/30 py-1.5 px-4 overflow-hidden hidden md:flex items-center text-xs">
        <div className="bg-[#1a6b3c] text-white font-bold px-3 py-1 rounded-md text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1 mr-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" /> Info Terkini
        </div>
        <div className="overflow-hidden whitespace-nowrap w-full">
          <div className="animate-ticker text-[#0d4a28] font-medium inline-block space-x-6">
            <span>✨ Pendaftaran PPDB Santri Baru Pondok Pesantren Jauharul Maknuun TP 2026/2027 telah dibuka!</span>
            <span>|</span>
            <span>🏆 Pondok Pesantren Jauharul Maknuun Resmi Meraih Akreditasi "A" BAN-PDM</span>
            <span>|</span>
            <span>📖 Program Unggulan: Tahfidz 30 Juz Bersanad, Madrasah Diniyah Salafiyah, & Pendidikan Terpadu</span>
            <span>|</span>
            <span>🔬 Laboratorium Komputer Modern & Kurikulum Riset STEM Santri Terpadu</span>
            <span>|</span>
            <span>📲 Narahubung Sekretariat & Konsultasi Asrama: 0812-3456-7890</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header id="mainHeader" className="sticky top-0 z-40 w-full glass-card border-b border-gray-200/80 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-1.5 sm:py-2 min-h-[3.75rem] sm:min-h-[4.125rem]">
            
            {/* Brand Logo & Title */}
            <a href="#home" className="flex items-center gap-2 sm:gap-2.5 group shrink-0" aria-label="Beranda Pondok Pesantren Jauharul Maknuun">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white shadow-md border-2 border-[#1a6b3c]/20 group-hover:scale-105 transition-transform duration-200 flex items-center justify-center shrink-0">
                <img 
                  src="/logo.jpg" 
                  alt="Logo PPJM" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-[9px] sm:text-xs tracking-wider text-[#0d4a28] uppercase leading-tight">
                  PONDOK PESANTREN
                </span>
                <span className="font-black text-xs sm:text-base tracking-tight text-[#d4af37] leading-tight">
                  JAUHARUL MAKNUUN
                </span>
                <span className="text-[9px] text-gray-500 font-medium hidden sm:inline">Lasem Sidayu Gresik - Jawa Timur</span>
              </div>
            </a>

            {/* Kolom Pencarian Interaktif pada Mobile */}
            <div className="flex-1 max-w-xs sm:max-w-sm lg:hidden mx-1.5 sm:mx-3">
              <button
                type="button"
                onClick={onOpenSearch}
                className="w-full flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-gray-50/90 hover:bg-white border border-gray-200/90 hover:border-[#1a6b3c]/40 text-left text-xs text-gray-500 shadow-2xs transition-all duration-200 group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#1a6b3c]/20"
                aria-label="Cari Informasi Portal"
              >
                <Search className="w-3.5 h-3.5 text-[#1a6b3c] group-hover:scale-110 transition-transform shrink-0" />
                <span className="font-medium text-[11px] sm:text-xs text-gray-500 group-hover:text-gray-700 truncate">
                  Cari...
                </span>
              </button>
            </div>

            {/* IMPROVED TOP NAVBAR (Desktop Navigation with Interactive Submenus) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-bold text-gray-700">
              
              {/* 1. JM Center (Direct link to #about) */}
              <a 
                href="#about" 
                className="px-3 py-2 rounded-xl hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition flex items-center gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5 text-[#1a6b3c]" />
                <span>JM Center</span>
              </a>

              {/* 2. Program Unggulan (Direct link to #programs) */}
              <a 
                href="#programs" 
                className="px-3 py-2 rounded-xl hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition flex items-center gap-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#1a6b3c]" />
                <span>Program Unggulan</span>
              </a>

              {/* 3. Ekstrakurikuler */}
              <a 
                href="#ekstrakurikuler" 
                className="px-3 py-2 rounded-xl hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition flex items-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5 text-[#1a6b3c]" />
                <span>Ekstrakurikuler</span>
              </a>

              {/* 4. Prestasi */}
              <a 
                href="#prestasi" 
                className="px-3 py-2 rounded-xl hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition flex items-center gap-1.5"
              >
                <Trophy className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Prestasi</span>
              </a>

              {/* 5. STEM */}
              <a 
                href="#steam" 
                className="px-3 py-2 rounded-xl hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition flex items-center gap-1.5"
              >
                <Cpu className="w-3.5 h-3.5 text-[#1a6b3c]" />
                <span>STEM</span>
              </a>

              {/* 6. Galeri */}
              <a 
                href="#gallery" 
                className="px-3 py-2 rounded-xl hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition flex items-center gap-1.5"
              >
                <Image className="w-3.5 h-3.5 text-[#1a6b3c]" />
                <span>Galeri</span>
              </a>
            </nav>

            {/* Right CTAs & Language */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Language Switcher */}
              <div className="relative hidden xl:block">
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition"
                  title="Ganti Bahasa"
                >
                  <Globe className="w-3.5 h-3.5 text-[#1a6b3c]" />
                  <span className="uppercase font-bold">{currentLang}</span>
                </button>
                {langDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-28 bg-white rounded-xl shadow-lg border border-gray-100 py-1 text-xs z-50">
                    <button
                      onClick={() => { onLanguageChange('id'); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#1a6b3c]/10 transition ${currentLang === 'id' ? 'font-bold text-[#1a6b3c]' : 'text-gray-700'}`}
                    >
                      🇮🇩 Indonesia
                    </button>
                    <button
                      onClick={() => { onLanguageChange('en'); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#1a6b3c]/10 transition ${currentLang === 'en' ? 'font-bold text-[#1a6b3c]' : 'text-gray-700'}`}
                    >
                      🇬🇧 English
                    </button>
                    <button
                      onClick={() => { onLanguageChange('ar'); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#1a6b3c]/10 transition ${currentLang === 'ar' ? 'font-bold text-[#1a6b3c]' : 'text-gray-700'}`}
                    >
                      🇸🇦 العربية
                    </button>
                  </div>
                )}
              </div>

              {/* Desktop Global Search Button */}
              <button
                onClick={onOpenSearch}
                className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] border border-gray-200 transition btn-spring"
                title="Cari Berita, Program, Ekskul, Galeri (Ctrl+K)"
                aria-label="Cari Informasi Portal"
              >
                <Search className="w-4 h-4 text-[#1a6b3c]" />
                <span>Cari</span>
                <kbd className="text-[9px] bg-white border border-gray-300 rounded px-1.5 py-0.5 text-gray-400 font-sans shadow-xs font-normal">
                  ⌘K
                </kbd>
              </button>

              {/* Portal Admin Button */}
              <button
                onClick={onOpenAdmin}
                className="w-9 h-9 sm:w-auto sm:px-2.5 sm:py-2 rounded-xl text-xs font-semibold text-gray-700 hover:text-[#1a6b3c] hover:bg-gray-100 border border-gray-200 flex items-center justify-center sm:gap-1 transition shrink-0"
                title="Login CMS Admin"
              >
                <Lock className="w-4 h-4 text-gray-600" />
                <span className="hidden md:inline">Admin</span>
              </button>
            </div>

          </div>
        </div>
      </header>
    </>
  );
};
