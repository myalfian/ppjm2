import React, { useState } from 'react';
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
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  onOpenPpdb: () => void;
  onOpenStatus: () => void;
  onOpenAdmin: () => void;
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPpdb,
  onOpenStatus,
  onOpenAdmin,
  currentLang,
  onLanguageChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

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
            <span>📖 Program Unggulan: Takhassus Tahfidz 30 Juz Bersanad & Kajian Kitab Kuning Maknani</span>
            <span>|</span>
            <span>📲 Narahubung Sekretariat & Konsultasi Asrama: 0812-3456-7890</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header id="mainHeader" className="sticky top-0 z-40 w-full glass-card border-b border-gray-200/80 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2.5 min-h-[4.5rem]">
            {/* Brand Logo & Title */}
            <a href="#home" className="flex items-center gap-2.5 group shrink-0" aria-label="Beranda Pondok Pesantren Jauharul Maknuun">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white shadow-md border-2 border-[#1a6b3c]/20 group-hover:scale-105 transition-transform duration-200 flex items-center justify-center shrink-0">
                <img 
                  src="/logo.jpg" 
                  alt="Logo PPJM" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to stylized initial if image not found
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

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-gray-700">
              <a href="#home" className="px-3 py-2 rounded-xl hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition">
                Beranda
              </a>
              <a href="#about" className="px-3 py-2 rounded-xl hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition">
                Profil
              </a>
              <a href="#programs" className="px-3 py-2 rounded-xl hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition">
                Kurikulum
              </a>
              <a href="#facilities" className="px-3 py-2 rounded-xl hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition">
                Fasilitas
              </a>
              <a href="#news" className="px-3 py-2 rounded-xl hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition">
                Berita
              </a>
              <a href="#gallery" className="px-3 py-2 rounded-xl hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition">
                Galeri
              </a>
              <a href="#lokasi" className="px-3 py-2 rounded-xl hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition">
                Lokasi
              </a>
              <a href="#testimoni" className="px-3 py-2 rounded-xl hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition">
                Buku Tamu
              </a>
              <a href="#faq" className="px-3 py-2 rounded-xl hover:bg-[#1a6b3c]/10 hover:text-[#1a6b3c] transition">
                FAQ
              </a>
            </nav>

            {/* Right CTAs & Language */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Switcher */}
              <div className="relative hidden sm:block">
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

              {/* Status Pendaftaran PPDB Button */}
              <button
                onClick={onOpenStatus}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#1a6b3c] bg-[#1a6b3c]/10 hover:bg-[#1a6b3c]/20 border border-[#1a6b3c]/20 btn-spring"
                title="Cek Status Pendaftaran PPDB"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Cek Status</span>
              </button>

              {/* PPDB Online CTA */}
              <button
                onClick={onOpenPpdb}
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold text-white bg-[#1a6b3c] hover:bg-[#0d4a28] shadow-md shadow-[#1a6b3c]/20 btn-spring"
              >
                <UserCheck className="w-4 h-4 text-[#d4af37]" />
                <span>PPDB 2026</span>
              </button>

              {/* Portal Admin Button */}
              <button
                onClick={onOpenAdmin}
                className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold text-gray-700 hover:text-[#1a6b3c] hover:bg-gray-100 border border-gray-200 transition flex items-center gap-1.5"
                title="Login CMS Admin"
              >
                <Lock className="w-3.5 h-3.5 text-gray-500" />
                <span className="hidden sm:inline">Admin</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 border border-gray-200"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-gray-100 text-xs font-medium">
              <a 
                href="#home" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-[#1a6b3c]/10 text-gray-800 hover:text-[#1a6b3c] flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-[#1a6b3c]" /> Beranda
              </a>
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-[#1a6b3c]/10 text-gray-800 hover:text-[#1a6b3c] flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#1a6b3c]" /> Profil
              </a>
              <a 
                href="#programs" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-[#1a6b3c]/10 text-gray-800 hover:text-[#1a6b3c] flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-[#1a6b3c]" /> Kurikulum
              </a>
              <a 
                href="#facilities" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-[#1a6b3c]/10 text-gray-800 hover:text-[#1a6b3c] flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-[#1a6b3c]" /> Fasilitas
              </a>
              <a 
                href="#news" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-[#1a6b3c]/10 text-gray-800 hover:text-[#1a6b3c] flex items-center gap-2"
              >
                <Newspaper className="w-4 h-4 text-[#1a6b3c]" /> Berita
              </a>
              <a 
                href="#gallery" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-[#1a6b3c]/10 text-gray-800 hover:text-[#1a6b3c] flex items-center gap-2"
              >
                <Image className="w-4 h-4 text-[#1a6b3c]" /> Galeri
              </a>
              <a 
                href="#lokasi" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-[#1a6b3c]/10 text-gray-800 hover:text-[#1a6b3c] flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#1a6b3c]" /> Lokasi
              </a>
              <a 
                href="#faq" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-[#1a6b3c]/10 text-gray-800 hover:text-[#1a6b3c] flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4 text-[#1a6b3c]" /> FAQ
              </a>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenStatus(); }}
                className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#1a6b3c] text-xs font-bold flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" /> Cek Status Pendaftaran PPDB
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenPpdb(); }}
                className="w-full py-2.5 rounded-xl bg-[#1a6b3c] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <UserCheck className="w-4 h-4 text-[#d4af37]" /> Formulir PPDB Online 2026
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
