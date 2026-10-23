import React, { useEffect, useState } from 'react';
import { 
  Building2, 
  GraduationCap, 
  Newspaper, 
  Image, 
  MapPin, 
  HelpCircle, 
  UserCheck, 
  Lock, 
  X, 
  Search, 
  BookOpen, 
  Award, 
  Cpu, 
  Trophy, 
  Activity, 
  ChevronRight, 
  ChevronDown,
  Sparkles, 
  Laptop, 
  FileText, 
  PhoneCall, 
  Compass, 
  MessageSquare,
  Home,
  CheckCircle2,
  ExternalLink,
  Layers,
  ArrowUp
} from 'lucide-react';

interface MobileMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  onOpenPpdb: () => void;
  onOpenStatus: () => void;
  onOpenAdmin: () => void;
  onOpenElearning: () => void;
  onOpenEcosystem?: (key: string) => void;
  onOpenSyllabus?: (program: string) => void;
  onNavigateToSection: (targetId: string, hash?: string) => void;
}

export const MobileMenuModal: React.FC<MobileMenuModalProps> = ({
  isOpen,
  onClose,
  onOpenSearch,
  onOpenPpdb,
  onOpenStatus,
  onOpenAdmin,
  onOpenElearning,
  onOpenEcosystem,
  onOpenSyllabus,
  onNavigateToSection
}) => {
  // Collapsible accordion sections inside the drawer
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    jmCenter: true,
    program: true,
    aktivitas: true,
    publikasi: false
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Close on Escape & Lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col justify-end md:justify-center items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Menu Lengkap Portal Pesantren"
    >
      {/* 1. Backdrop Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 2. Responsive Mobile Bottom Sheet */}
      <div 
        className="relative w-full max-w-lg md:max-w-2xl bg-white rounded-t-3xl md:rounded-3xl shadow-2xl border-t md:border border-emerald-900/10 max-h-[88vh] md:max-h-[85vh] flex flex-col overflow-hidden z-10 animate-in slide-in-from-bottom-8 md:slide-in-from-bottom-4 duration-300"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.5rem)' }}
      >
        {/* Grab Handle Pill for mobile touch intuition */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-2.5 mb-1 shrink-0 md:hidden" />

        {/* Header Bar */}
        <div className="px-4 py-3 sm:px-6 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center p-0.5 shadow-xs overflow-hidden">
              <img 
                src="/logo.jpg" 
                alt="Logo PPJM" 
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#0d4a28] leading-tight">
                Navigasi & Sub Menu Portal
              </h3>
              <p className="text-[11px] text-gray-500 font-medium">
                Pondok & SMP Plus Jauharul Maknuun
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 flex items-center justify-center transition border border-gray-200/80 active:scale-95"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3 sm:px-6 space-y-4 text-xs">
          
          {/* Quick Action Capsules (Thumb Zone) */}
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => { onClose(); onOpenSearch(); }}
              className="flex flex-col items-center justify-center p-2 rounded-2xl bg-gray-50 hover:bg-emerald-50/80 border border-gray-200 hover:border-emerald-300 transition text-center group active:scale-95"
            >
              <div className="w-8 h-8 rounded-xl bg-white text-[#1a6b3c] flex items-center justify-center shadow-xs border border-emerald-100 group-hover:scale-110 transition-transform">
                <Search className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-gray-800 mt-1.5 leading-tight">
                Cari Info
              </span>
            </button>

            <button
              onClick={() => { onClose(); onOpenPpdb(); }}
              className="flex flex-col items-center justify-center p-2 rounded-2xl bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200 hover:border-emerald-300 transition text-center group active:scale-95"
            >
              <div className="w-8 h-8 rounded-xl bg-[#1a6b3c] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <FileText className="w-4 h-4 text-[#d4af37]" />
              </div>
              <span className="text-[10px] font-bold text-[#0d4a28] mt-1.5 leading-tight">
                PPDB Online
              </span>
            </button>

            <button
              onClick={() => { onClose(); onOpenStatus(); }}
              className="flex flex-col items-center justify-center p-2 rounded-2xl bg-amber-50/70 hover:bg-amber-100 border border-amber-200 hover:border-amber-300 transition text-center group active:scale-95"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-amber-900 mt-1.5 leading-tight">
                Cek Status
              </span>
            </button>

            <button
              onClick={() => { onClose(); onOpenElearning(); }}
              className="flex flex-col items-center justify-center p-2 rounded-2xl bg-blue-50/70 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 transition text-center group active:scale-95"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <Laptop className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-blue-900 mt-1.5 leading-tight">
                E-Learning
              </span>
            </button>
          </div>

          {/* ========================================================
              ACCORDION 1: JM CENTER & PROFIL (Sub-items)
          ======================================================== */}
          <div className="rounded-2xl border border-gray-200/90 overflow-hidden bg-white shadow-2xs">
            <button
              onClick={() => toggleAccordion('jmCenter')}
              className="w-full px-3.5 py-2.5 bg-gray-50/90 hover:bg-gray-100/90 flex items-center justify-between text-left font-bold text-gray-900 transition"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#1a6b3c]" />
                <span className="text-xs font-extrabold text-[#0d4a28]">1. JM Center & Profil Lembaga</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openAccordions.jmCenter ? 'rotate-180 text-[#1a6b3c]' : 'text-gray-400'}`} />
            </button>

            {openAccordions.jmCenter && (
              <div className="p-2 space-y-1 bg-white border-t border-gray-100">
                
                {/* Sub-item 1: Profil JM */}
                <button
                  onClick={() => { onClose(); onNavigateToSection('profil-jm'); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-emerald-50/60 text-gray-800 hover:text-[#1a6b3c] transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#1a6b3c] flex items-center justify-center group-hover:bg-[#1a6b3c] group-hover:text-white transition">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold block text-xs">Profil JM (Identitas & Legalitas)</span>
                      <span className="text-[10px] text-gray-500 font-normal">NSPP, Akreditasi "A", & Sejarah Singkat</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#1a6b3c] transition-transform group-hover:translate-x-0.5" />
                </button>

                {/* Sub-item 2: Sambutan Direktur */}
                <button
                  onClick={() => { onClose(); onNavigateToSection('sambutan-direktur'); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-emerald-50/60 text-gray-800 hover:text-[#1a6b3c] transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#1a6b3c] flex items-center justify-center group-hover:bg-[#1a6b3c] group-hover:text-white transition">
                      <UserCheck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold block text-xs">Sambutan Direktur Pesantren</span>
                      <span className="text-[10px] text-gray-500 font-normal">Pesan KH. Ahmad Zaini, M.Pd.I</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#1a6b3c] transition-transform group-hover:translate-x-0.5" />
                </button>

                {/* Sub-item 3: Visi & Misi */}
                <button
                  onClick={() => { onClose(); onNavigateToSection('visi-misi'); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-emerald-50/60 text-gray-800 hover:text-[#1a6b3c] transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#1a6b3c] flex items-center justify-center group-hover:bg-[#1a6b3c] group-hover:text-white transition">
                      <Compass className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold block text-xs">Visi, Misi & Panca Jiwa</span>
                      <span className="text-[10px] text-gray-500 font-normal">5 Nilai Luhur Karakter Santri</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#1a6b3c] transition-transform group-hover:translate-x-0.5" />
                </button>

                {/* Sub-item 4: Ekosistem Digital Pesantren */}
                <button
                  onClick={() => { onClose(); onOpenEcosystem?.('overview'); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-emerald-50/60 text-gray-800 hover:text-[#1a6b3c] transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#1a6b3c] flex items-center justify-center group-hover:bg-[#1a6b3c] group-hover:text-white transition">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold block text-xs">Ekosistem Digital Pesantren</span>
                      <span className="text-[10px] text-gray-500 font-normal">Tahfidz, Perizinan, & Akademik</span>
                    </div>
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                </button>

              </div>
            )}
          </div>

          {/* ========================================================
              ACCORDION 2: PROGRAM PENDIDIKAN UNGGULAN (Sub-items)
          ======================================================== */}
          <div className="rounded-2xl border border-gray-200/90 overflow-hidden bg-white shadow-2xs">
            <button
              onClick={() => toggleAccordion('program')}
              className="w-full px-3.5 py-2.5 bg-gray-50/90 hover:bg-gray-100/90 flex items-center justify-between text-left font-bold text-gray-900 transition"
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#1a6b3c]" />
                <span className="text-xs font-extrabold text-[#0d4a28]">2. Program Unggulan: Pondok, Sekolah & Masim</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openAccordions.program ? 'rotate-180 text-[#1a6b3c]' : 'text-gray-400'}`} />
            </button>

            {openAccordions.program && (
              <div className="p-2 space-y-1 bg-white border-t border-gray-100">
                
                {/* Sub-item 1: Pondok Tahfidz */}
                <button
                  onClick={() => { onClose(); onNavigateToSection('programs', '#program-pondok'); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-emerald-50/60 text-gray-800 hover:text-[#1a6b3c] transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#1a6b3c] flex items-center justify-center group-hover:bg-[#1a6b3c] group-hover:text-white transition">
                      <Home className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold block text-xs">1. Pondok (Tahfidz 30 Juz Bersanad)</span>
                      <span className="text-[10px] text-gray-500 font-normal">Halaqah mutqin & pembiasaan asrama</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#1a6b3c] transition-transform group-hover:translate-x-0.5" />
                </button>

                {/* Sub-item 2: Sekolah SMP Plus */}
                <button
                  onClick={() => { onClose(); onNavigateToSection('programs', '#program-sekolah'); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-emerald-50/60 text-gray-800 hover:text-[#1a6b3c] transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#1a6b3c] flex items-center justify-center group-hover:bg-[#1a6b3c] group-hover:text-white transition">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold block text-xs">2. Sekolah (SMP Plus Akreditasi "A")</span>
                      <span className="text-[10px] text-gray-500 font-normal">Kurikulum Merdeka BAN-PDM & Lab STEM</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#1a6b3c] transition-transform group-hover:translate-x-0.5" />
                </button>

                {/* Sub-item 3: Masim Salafiyah */}
                <button
                  onClick={() => { onClose(); onNavigateToSection('programs', '#program-masim'); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-emerald-50/60 text-gray-800 hover:text-[#1a6b3c] transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#1a6b3c] flex items-center justify-center group-hover:bg-[#1a6b3c] group-hover:text-white transition">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold block text-xs">3. Masim (Madrasah Salafiyah Diniyah)</span>
                      <span className="text-[10px] text-gray-500 font-normal">Kitab turats metode maknani gandul</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#1a6b3c] transition-transform group-hover:translate-x-0.5" />
                </button>

                {/* Sub-item 4: Silabus Kurikulum Modal */}
                <button
                  onClick={() => { onClose(); onOpenSyllabus?.('SMP Plus Jauharul Maknuun'); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-emerald-50/60 text-gray-800 hover:text-[#1a6b3c] transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#1a6b3c] flex items-center justify-center group-hover:bg-[#1a6b3c] group-hover:text-white transition">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold block text-xs">Silabus & Rencana Pembelajaran</span>
                      <span className="text-[10px] text-gray-500 font-normal">Capaian kompetensi santri terpadu</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                </button>

              </div>
            )}
          </div>

          {/* ========================================================
              ACCORDION 3: AKTIVITAS, EKSTRAKURIKULER & RISET
          ======================================================== */}
          <div className="rounded-2xl border border-gray-200/90 overflow-hidden bg-white shadow-2xs">
            <button
              onClick={() => toggleAccordion('aktivitas')}
              className="w-full px-3.5 py-2.5 bg-gray-50/90 hover:bg-gray-100/90 flex items-center justify-between text-left font-bold text-gray-900 transition"
            >
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#1a6b3c]" />
                <span className="text-xs font-extrabold text-[#0d4a28]">3. Aktivitas Santri, Riset & Fasilitas</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openAccordions.aktivitas ? 'rotate-180 text-[#1a6b3c]' : 'text-gray-400'}`} />
            </button>

            {openAccordions.aktivitas && (
              <div className="p-2 grid grid-cols-2 gap-1.5 bg-white border-t border-gray-100">
                
                <button
                  onClick={() => { onClose(); onNavigateToSection('ekstrakurikuler'); }}
                  className="p-2.5 rounded-xl bg-gray-50/80 hover:bg-emerald-50/70 border border-gray-100 hover:border-emerald-200 text-left transition group"
                >
                  <div className="flex items-center gap-1.5 text-[#1a6b3c] font-bold text-xs mb-0.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Ekstrakurikuler</span>
                  </div>
                  <span className="text-[10px] text-gray-500 block leading-tight">Robotika, Pramuka, Hadrah</span>
                </button>

                <button
                  onClick={() => { onClose(); onNavigateToSection('prestasi'); }}
                  className="p-2.5 rounded-xl bg-gray-50/80 hover:bg-emerald-50/70 border border-gray-100 hover:border-emerald-200 text-left transition group"
                >
                  <div className="flex items-center gap-1.5 text-[#d4af37] font-bold text-xs mb-0.5">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Prestasi Santri</span>
                  </div>
                  <span className="text-[10px] text-gray-500 block leading-tight">Kejuaraan Sains & Tahfidz</span>
                </button>

                <button
                  onClick={() => { onClose(); onNavigateToSection('steam'); }}
                  className="p-2.5 rounded-xl bg-gray-50/80 hover:bg-emerald-50/70 border border-gray-100 hover:border-emerald-200 text-left transition group"
                >
                  <div className="flex items-center gap-1.5 text-[#1a6b3c] font-bold text-xs mb-0.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Pusat Riset STEM</span>
                  </div>
                  <span className="text-[10px] text-gray-500 block leading-tight">Coding, IoT, & Eksperimen</span>
                </button>

                <button
                  onClick={() => { onClose(); onNavigateToSection('facilities'); }}
                  className="p-2.5 rounded-xl bg-gray-50/80 hover:bg-emerald-50/70 border border-gray-100 hover:border-emerald-200 text-left transition group"
                >
                  <div className="flex items-center gap-1.5 text-[#0d4a28] font-bold text-xs mb-0.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Sarana & Fasilitas</span>
                  </div>
                  <span className="text-[10px] text-gray-500 block leading-tight">Asrama, Lab IT, Poskestren</span>
                </button>

              </div>
            )}
          </div>

          {/* ========================================================
              ACCORDION 4: PUBLIKASI, INTERAKSI & INFORMASI
          ======================================================== */}
          <div className="rounded-2xl border border-gray-200/90 overflow-hidden bg-white shadow-2xs">
            <button
              onClick={() => toggleAccordion('publikasi')}
              className="w-full px-3.5 py-2.5 bg-gray-50/90 hover:bg-gray-100/90 flex items-center justify-between text-left font-bold text-gray-900 transition"
            >
              <div className="flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-[#1a6b3c]" />
                <span className="text-xs font-extrabold text-[#0d4a28]">4. Berita, Galeri & Narahubung</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openAccordions.publikasi ? 'rotate-180 text-[#1a6b3c]' : 'text-gray-400'}`} />
            </button>

            {openAccordions.publikasi && (
              <div className="p-2 grid grid-cols-2 gap-1.5 bg-white border-t border-gray-100">
                
                <button
                  onClick={() => { onClose(); onNavigateToSection('news'); }}
                  className="p-2 rounded-xl hover:bg-gray-50 text-left transition flex items-center gap-2"
                >
                  <Newspaper className="w-3.5 h-3.5 text-[#1a6b3c] shrink-0" />
                  <span className="font-semibold text-gray-800 text-xs">JM News & Kabar</span>
                </button>

                <button
                  onClick={() => { onClose(); onNavigateToSection('gallery'); }}
                  className="p-2 rounded-xl hover:bg-gray-50 text-left transition flex items-center gap-2"
                >
                  <Image className="w-3.5 h-3.5 text-[#1a6b3c] shrink-0" />
                  <span className="font-semibold text-gray-800 text-xs">Galeri Dokumentasi</span>
                </button>

                <button
                  onClick={() => { onClose(); onNavigateToSection('lokasi'); }}
                  className="p-2 rounded-xl hover:bg-gray-50 text-left transition flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#1a6b3c] shrink-0" />
                  <span className="font-semibold text-gray-800 text-xs">Lokasi & Rute</span>
                </button>

                <button
                  onClick={() => { onClose(); onNavigateToSection('guestbook'); }}
                  className="p-2 rounded-xl hover:bg-gray-50 text-left transition flex items-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#1a6b3c] shrink-0" />
                  <span className="font-semibold text-gray-800 text-xs">Buku Tamu Digital</span>
                </button>

                <button
                  onClick={() => { onClose(); onNavigateToSection('faq'); }}
                  className="p-2 rounded-xl hover:bg-gray-50 text-left transition flex items-center gap-2"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#1a6b3c] shrink-0" />
                  <span className="font-semibold text-gray-800 text-xs">FAQ / Tanya Jawab</span>
                </button>

                <button
                  onClick={() => { onClose(); onNavigateToSection('medsos'); }}
                  className="p-2 rounded-xl hover:bg-gray-50 text-left transition flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span className="font-semibold text-gray-800 text-xs">Media Sosial Resmi</span>
                </button>

              </div>
            )}
          </div>

        </div>

        {/* Footer Actions inside Drawer */}
        <div className="p-3 sm:px-6 bg-gray-50 border-t border-gray-200/80 flex items-center justify-between gap-2 shrink-0">
          
          {/* Scroll to Top / Beranda */}
          <button
            onClick={() => { onClose(); onNavigateToSection('home'); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-emerald-50 text-gray-700 hover:text-[#1a6b3c] border border-gray-200 text-xs font-bold transition shadow-2xs"
            title="Ke Beranda Paling Atas"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#1a6b3c]" />
            <span>Beranda</span>
          </button>

          <div className="flex items-center gap-2">
            {/* WhatsApp Narahubung */}
            <a
              href="https://wa.me/6281234567890?text=Assalamu'alaikum%20Admin%20Pondok%20Pesantren%20Jauharul%20Maknuun"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Admin CMS Portal Login */}
            <button
              onClick={() => { onClose(); onOpenAdmin(); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-800 hover:bg-gray-900 text-white text-xs font-bold transition shadow-xs"
              title="Portal Login CMS Admin"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
