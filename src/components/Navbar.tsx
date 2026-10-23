import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  GraduationCap, 
  Newspaper, 
  Image, 
  MapPin, 
  HelpCircle, 
  UserCheck, 
  Lock, 
  Menu, 
  X, 
  Globe, 
  Sparkles,
  PhoneCall,
  Search,
  BookOpen,
  Award,
  Cpu,
  Trophy,
  Activity,
  Layers,
  ChevronDown,
  Compass,
  FileText,
  Home,
  Scroll
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
  
  // Desktop Dropdown States
  const [jmCenterOpen, setJmCenterOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);

  // Mobile Accordion States
  const [mobileJmAccordion, setMobileJmAccordion] = useState(true);
  const [mobileProgAccordion, setMobileProgAccordion] = useState(true);

  const jmCenterRef = useRef<HTMLDivElement>(null);
  const programRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (jmCenterRef.current && !jmCenterRef.current.contains(e.target as Node)) {
        setJmCenterOpen(false);
      }
      if (programRef.current && !programRef.current.contains(e.target as Node)) {
        setProgramOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            <span>🏆 SMP Plus Jauharul Maknuun Islamic Boarding School Resmi Meraih Akreditasi "A" BAN-PDM</span>
            <span>|</span>
            <span>📖 Program Unggulan: Pondok (Tahfidz 30 Juz Bersanad), Sekolah (SMP Plus), & Masim (Salafiyah)</span>
            <span>|</span>
            <span>🔬 Laboratorium Komputer Modern & Kurikulum Riset STEAM Santri Terpadu</span>
            <span>|</span>
            <span>📲 Narahubung Sekretariat & Konsultasi Asrama: 0812-3456-7890</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header id="mainHeader" className="sticky top-0 z-40 w-full glass-card border-b border-gray-200/80 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 min-h-[4.5rem]">
            
            {/* Brand Logo & Title */}
            <a href="#home" className="flex items-center gap-2.5 group shrink-0" aria-label="Beranda Pondok Pesantren Jauharul Maknuun">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white shadow-md border-2 border-[#1a6b3c]/20 group-hover:scale-105 transition-transform duration-200 flex items-center justify-center shrink-0">
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
                <span className="font-extrabold text-[10px] sm:text-xs tracking-wider text-[#0d4a28] uppercase">
                  PONDOK PESANTREN
                </span>
                <span className="font-black text-sm sm:text-base tracking-tight text-[#d4af37] leading-none">
                  JAUHARUL MAKNUUN
                </span>
                <span className="text-[9px] text-gray-500 font-medium">Lasem Sidayu Gresik</span>
              </div>
            </a>

            {/* IMPROVED TOP NAVBAR (Desktop Navigation with Interactive Submenus) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-bold text-gray-700">
              
              {/* 1. JM Center (With Submenu: Profil JM, Sambutan Direktur, Visi dan Misi) */}
              <div 
                ref={jmCenterRef}
                className="relative"
                onMouseEnter={() => setJmCenterOpen(true)}
                onMouseLeave={() => setJmCenterOpen(false)}
              >
                <a
                  href="#about"
                  onClick={() => setJmCenterOpen(prev => !prev)}
                  className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${
                    jmCenterOpen ? 'bg-[#1a6b3c]/15 text-[#1a6b3c]' : 'hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c]'
                  }`}
                  aria-haspopup="true"
                  aria-expanded={jmCenterOpen}
                >
                  <Building2 className="w-3.5 h-3.5 text-[#1a6b3c]" />
                  <span>JM Center</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${jmCenterOpen ? 'rotate-180 text-[#1a6b3c]' : 'text-gray-400'}`} />
                </a>

                {/* Submenu Dropdown */}
                {jmCenterOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-xl border border-gray-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Sub Menu JM Center
                    </div>
                    
                    {/* Submenu 1: Profil JM */}
                    <a
                      href="#profil-jm"
                      onClick={() => setJmCenterOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 hover:bg-[#1a6b3c]/10 text-gray-800 hover:text-[#1a6b3c] transition group"
                    >
                      <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#1a6b3c] flex items-center justify-center group-hover:bg-[#1a6b3c] group-hover:text-white transition">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-xs">Profil JM</span>
                        <span className="text-[10px] text-gray-500 font-normal">Identitas & Legalitas</span>
                      </div>
                    </a>

                    {/* Submenu 2: Sambutan Direktur */}
                    <a
                      href="#sambutan-direktur"
                      onClick={() => setJmCenterOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 hover:bg-[#1a6b3c]/10 text-gray-800 hover:text-[#1a6b3c] transition group"
                    >
                      <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#1a6b3c] flex items-center justify-center group-hover:bg-[#1a6b3c] group-hover:text-white transition">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-xs">Sambutan Direktur</span>
                        <span className="text-[10px] text-gray-500 font-normal">KH. Ahmad Zaini, M.Pd.I</span>
                      </div>
                    </a>

                    {/* Submenu 3: Visi dan Misi */}
                    <a
                      href="#visi-misi"
                      onClick={() => setJmCenterOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 hover:bg-[#1a6b3c]/10 text-gray-800 hover:text-[#1a6b3c] transition group"
                    >
                      <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#1a6b3c] flex items-center justify-center group-hover:bg-[#1a6b3c] group-hover:text-white transition">
                        <Compass className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-xs">Visi dan Misi</span>
                        <span className="text-[10px] text-gray-500 font-normal">Landasan & Panca Jiwa</span>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              {/* 2. Program Unggulan (With Submenu: Pondok, Sekolah, Masim) */}
              <div 
                ref={programRef}
                className="relative"
                onMouseEnter={() => setProgramOpen(true)}
                onMouseLeave={() => setProgramOpen(false)}
              >
                <a
                  href="#programs"
                  onClick={() => setProgramOpen(prev => !prev)}
                  className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${
                    programOpen ? 'bg-[#1a6b3c]/15 text-[#1a6b3c]' : 'hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c]'
                  }`}
                  aria-haspopup="true"
                  aria-expanded={programOpen}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#1a6b3c]" />
                  <span>Program Unggulan</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${programOpen ? 'rotate-180 text-[#1a6b3c]' : 'text-gray-400'}`} />
                </a>

                {/* Submenu Dropdown */}
                {programOpen && (
                  <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-2xl shadow-xl border border-gray-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Sub Menu Program Unggulan
                    </div>
                    
                    {/* Submenu 1: Pondok */}
                    <a
                      href="#program-pondok"
                      onClick={() => setProgramOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 hover:bg-[#1a6b3c]/10 text-gray-800 hover:text-[#1a6b3c] transition group"
                    >
                      <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#1a6b3c] flex items-center justify-center group-hover:bg-[#1a6b3c] group-hover:text-white transition">
                        <Home className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-xs">Pondok</span>
                        <span className="text-[10px] text-gray-500 font-normal">Tahfidz 30 Juz Bersanad</span>
                      </div>
                    </a>

                    {/* Submenu 2: Sekolah */}
                    <a
                      href="#program-sekolah"
                      onClick={() => setProgramOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 hover:bg-[#1a6b3c]/10 text-gray-800 hover:text-[#1a6b3c] transition group"
                    >
                      <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#1a6b3c] flex items-center justify-center group-hover:bg-[#1a6b3c] group-hover:text-white transition">
                        <GraduationCap className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-xs">Sekolah</span>
                        <span className="text-[10px] text-gray-500 font-normal">SMP Plus Akreditasi "A"</span>
                      </div>
                    </a>

                    {/* Submenu 3: Masim */}
                    <a
                      href="#program-masim"
                      onClick={() => setProgramOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 hover:bg-[#1a6b3c]/10 text-gray-800 hover:text-[#1a6b3c] transition group"
                    >
                      <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#1a6b3c] flex items-center justify-center group-hover:bg-[#1a6b3c] group-hover:text-white transition">
                        <Scroll className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-xs">Masim</span>
                        <span className="text-[10px] text-gray-500 font-normal">Madrasah Salafiyah Diniyah</span>
                      </div>
                    </a>
                  </div>
                )}
              </div>

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

              {/* 5. STEAM */}
              <a 
                href="#steam" 
                className="px-3 py-2 rounded-xl hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition flex items-center gap-1.5"
              >
                <Cpu className="w-3.5 h-3.5 text-[#1a6b3c]" />
                <span>STEAM</span>
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

              {/* Global Search Button */}
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] border border-gray-200/80 transition btn-spring"
                title="Cari Berita, Program, Ekskul, Galeri (Ctrl+K)"
                aria-label="Cari Informasi Portal"
              >
                <Search className="w-3.5 h-3.5 text-[#1a6b3c]" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden md:inline-block text-[9px] bg-white border border-gray-300 rounded px-1.5 py-0.5 text-gray-400 font-sans shadow-xs font-normal">
                  ⌘K
                </kbd>
              </button>

              {/* Portal Admin Button */}
              <button
                onClick={onOpenAdmin}
                className="p-2 sm:px-2.5 sm:py-2 rounded-xl text-xs font-semibold text-gray-700 hover:text-[#1a6b3c] hover:bg-gray-100 border border-gray-200 transition flex items-center gap-1"
                title="Login CMS Admin"
              >
                <Lock className="w-3.5 h-3.5 text-gray-500" />
                <span className="hidden md:inline">Admin</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 border border-gray-200 transition"
                aria-label="Buka Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer (With Submenus and Quick Actions) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200 shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-1">
              Navigasi & Sub Menu Portal
            </div>

            <div className="space-y-2">
              
              {/* Accordion 1: JM Center */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50/60 overflow-hidden">
                <button
                  onClick={() => setMobileJmAccordion(prev => !prev)}
                  className="w-full p-3 text-xs font-bold text-gray-900 flex items-center justify-between hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#1a6b3c]" />
                    <span>JM Center</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileJmAccordion ? 'rotate-180 text-[#1a6b3c]' : 'text-gray-400'}`} />
                </button>
                {mobileJmAccordion && (
                  <div className="p-2 pt-0 space-y-1 bg-white border-t border-gray-100">
                    <a
                      href="#profil-jm"
                      onClick={closeMobileMenu}
                      className="block px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition"
                    >
                      • Profil JM (Identitas & Legalitas)
                    </a>
                    <a
                      href="#sambutan-direktur"
                      onClick={closeMobileMenu}
                      className="block px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition"
                    >
                      • Sambutan Direktur (KH. Ahmad Zaini)
                    </a>
                    <a
                      href="#visi-misi"
                      onClick={closeMobileMenu}
                      className="block px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition"
                    >
                      • Visi dan Misi (Panca Jiwa Santri)
                    </a>
                  </div>
                )}
              </div>

              {/* Accordion 2: Program Unggulan */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50/60 overflow-hidden">
                <button
                  onClick={() => setMobileProgAccordion(prev => !prev)}
                  className="w-full p-3 text-xs font-bold text-gray-900 flex items-center justify-between hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#1a6b3c]" />
                    <span>Program Unggulan</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileProgAccordion ? 'rotate-180 text-[#1a6b3c]' : 'text-gray-400'}`} />
                </button>
                {mobileProgAccordion && (
                  <div className="p-2 pt-0 space-y-1 bg-white border-t border-gray-100">
                    <a
                      href="#program-pondok"
                      onClick={closeMobileMenu}
                      className="block px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition"
                    >
                      • Pondok (Tahfidz 30 Juz Bersanad)
                    </a>
                    <a
                      href="#program-sekolah"
                      onClick={closeMobileMenu}
                      className="block px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition"
                    >
                      • Sekolah (SMP Plus Akreditasi "A")
                    </a>
                    <a
                      href="#program-masim"
                      onClick={closeMobileMenu}
                      className="block px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition"
                    >
                      • Masim (Madrasah Salafiyah Diniyah)
                    </a>
                  </div>
                )}
              </div>

              {/* Direct Links */}
              <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
                <a 
                  href="#ekstrakurikuler" 
                  onClick={closeMobileMenu}
                  className="p-2.5 rounded-xl bg-gray-50 hover:bg-[#1a6b3c]/10 text-gray-800 hover:text-[#1a6b3c] flex items-center gap-2 border border-gray-100"
                >
                  <Activity className="w-4 h-4 text-[#1a6b3c]" /> Ekstrakurikuler
                </a>

                <a 
                  href="#prestasi" 
                  onClick={closeMobileMenu}
                  className="p-2.5 rounded-xl bg-gray-50 hover:bg-[#1a6b3c]/10 text-gray-800 hover:text-[#1a6b3c] flex items-center gap-2 border border-gray-100"
                >
                  <Trophy className="w-4 h-4 text-[#d4af37]" /> Prestasi
                </a>

                <a 
                  href="#steam" 
                  onClick={closeMobileMenu}
                  className="p-2.5 rounded-xl bg-gray-50 hover:bg-[#1a6b3c]/10 text-gray-800 hover:text-[#1a6b3c] flex items-center gap-2 border border-gray-100"
                >
                  <Cpu className="w-4 h-4 text-[#1a6b3c]" /> STEAM
                </a>

                <a 
                  href="#gallery" 
                  onClick={closeMobileMenu}
                  className="p-2.5 rounded-xl bg-gray-50 hover:bg-[#1a6b3c]/10 text-gray-800 hover:text-[#1a6b3c] flex items-center gap-2 border border-gray-100"
                >
                  <Image className="w-4 h-4 text-[#1a6b3c]" /> Galeri
                </a>
              </div>

            </div>

            {/* Quick Actions in Mobile Menu */}
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => { closeMobileMenu(); onOpenSearch(); }}
                className="w-full py-2.5 rounded-xl bg-[#1a6b3c]/10 hover:bg-[#1a6b3c]/20 text-[#1a6b3c] text-xs font-bold flex items-center justify-center gap-2 border border-[#1a6b3c]/20"
              >
                <Search className="w-4 h-4" /> Cari Informasi Portal (Search)
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
