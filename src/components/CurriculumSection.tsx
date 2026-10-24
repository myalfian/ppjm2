import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Award,
  CheckCircle2,
  Download,
  GraduationCap,
  Scroll,
  Sparkles,
  Building,
  Home,
  Check
} from 'lucide-react';
import { SmoothCurvedTabs } from './common/SmoothCurvedTabs';

interface CurriculumSectionProps {
  onOpenSyllabusModal: (programName: string) => void;
}

export const CurriculumSection: React.FC<CurriculumSectionProps> = ({ onOpenSyllabusModal }) => {
  const [activeTab, setActiveTab] = useState<'pondok' | 'sekolah' | 'masim'>('pondok');

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash === '#program-pondok') {
        setActiveTab('pondok');
      } else if (hash === '#program-sekolah') {
        setActiveTab('sekolah');
      } else if (hash === '#program-masim') {
        setActiveTab('masim');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  return (
    <section id="programs" className="py-8 sm:py-12 bg-[#f1f7f2] relative scroll-mt-20">
      {/* Specific Submenu Anchors */}
      <div id="program-pondok" className="absolute -top-20 left-0 scroll-mt-24 pointer-events-none"></div>
      <div id="program-sekolah" className="absolute -top-20 left-0 scroll-mt-24 pointer-events-none"></div>
      <div id="program-masim" className="absolute -top-20 left-0 scroll-mt-24 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a6b3c]/10 border border-[#1a6b3c]/20 text-[#1a6b3c] text-xs font-bold">
            <GraduationCap className="w-3.5 h-3.5 text-[#1a6b3c]" />
            <span>Pilar Pendidikan Terpadu</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0d4a28] tracking-tight">
            Program Unggulan Pondok Pesantren Jauharul Maknuun
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Keterpaduan tiga pilar pendidikan utama dalam satu ekosistem: Penguatan tahfidz asrama (Pondok), keunggulan kurikulum terpadu (Pendidikan Formal), dan pendalaman literatur kitab turats salaf (Masim).
          </p>
        </div>

        {/* 3 Main Submenu Tabs with Smooth Curve Edges */}
        <div className="flex justify-center">
          <SmoothCurvedTabs<'pondok' | 'sekolah' | 'masim'>
            tabs={[
              { id: 'pondok', label: 'Pondok Pesantren', icon: <Home className="w-4 h-4" /> },
              { id: 'sekolah', label: 'Pendidikan Formal', icon: <GraduationCap className="w-4 h-4" /> },
              { id: 'masim', label: 'Masim (Diniyah Salaf)', icon: <Scroll className="w-4 h-4" /> },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
            size="md"
            className="max-w-3xl flex justify-center"
          />
        </div>

        {/* Tab Contents */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-sm">

          {/* 1. PONDOK CONTENT */}
          {activeTab === 'pondok' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Program Pondok & Takhassus Al-Qur'an
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-[#0d4a28] leading-tight">
                  Pondok: Takhassus Tahfidz 30 Juz Bersanad & Pembinaan Asrama
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Program pendidikan kepesantrenan berbasis asrama 24 jam dengan fokus utama hafalan Al-Qur'an 30 juz berijazah sanad. Santri dibimbing langsung oleh dewan huffadz melalui metode talaqqi dan tasmi' berkala.
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6b3c] shrink-0" />
                    <span>Halaqah Ba'da Shubuh & Ba'da Maghrib terjadwal ketat</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6b3c] shrink-0" />
                    <span>Tasmi' 5 juz, 10 juz, hingga 30 juz sekali duduk</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6b3c] shrink-0" />
                    <span>Ijazah sanad tahfidz bersambung hingga Rasulullah SAW</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6b3c] shrink-0" />
                    <span>Asrama putra & putri terpisah dengan pengawasan wali asrama 24 jam</span>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => onOpenSyllabusModal('Program Pondok & Tahfidz 30 Juz')}
                    className="px-4 py-2.5 rounded-xl bg-[#1a6b3c] hover:bg-[#0d4a28] text-white text-xs font-bold flex items-center gap-2 btn-spring shadow-sm"
                  >
                    <Download className="w-4 h-4 text-[#d4af37]" />
                    <span>Unduh Silabus Program Pondok</span>
                  </button>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-lg h-72 sm:h-96 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80"
                  alt="Halaqah Tahfidz Pondok Santri"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-[#1a6b3c] shadow-sm">
                  ✨ Target Mutqin 30 Juz & Pembiasaan Riyadhoh Malam
                </div>
              </div>
            </div>
          )}

          {/* 2. SEKOLAH CONTENT */}
          {activeTab === 'sekolah' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> Pendidikan Formal Berkelanjutan
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-[#0d4a28] leading-tight">
                  Pendidikan Formal: Pondok Pesantren Jauharul Maknuun (Akreditasi "A" BAN-PDM)
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Menjalankan standar nasional Kurikulum Merdeka Kemendikbudristek secara unggul. Memadukan penguasaan sains, matematika, bahasa Inggris aktif, dan riset teknologi informatika (STEM).
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6b3c] shrink-0" />
                    <span>Akreditasi "A" (Unggul) dari BAN-PDM Nasional</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6b3c] shrink-0" />
                    <span>Laboratorium Komputer CBT & Ruang Riset Sains Modern</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6b3c] shrink-0" />
                    <span>Bimbingan intensif Olimpiade Sains Nasional (OSN) & Riset Pelajar</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6b3c] shrink-0" />
                    <span>Lulusan berijazah ganda: Ijazah Formal Negara & Ijazah Pesantren</span>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => onOpenSyllabusModal('Kurikulum Terpadu Pondok Pesantren Jauharul Maknuun')}
                    className="px-4 py-2.5 rounded-xl bg-[#1a6b3c] hover:bg-[#0d4a28] text-white text-xs font-bold flex items-center gap-2 btn-spring shadow-sm"
                  >
                    <Download className="w-4 h-4 text-[#d4af37]" />
                    <span>Unduh Dokumen Kurikulum Terpadu</span>
                  </button>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-lg h-72 sm:h-96 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
                  alt="Kelas & Lab Komputer Pondok Pesantren Jauharul Maknuun"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-[#1a6b3c] shadow-sm">
                  🔬 Terakreditasi "A" BAN-PDM & Lab Komputer CBT Terpadu
                </div>
              </div>
            </div>
          )}

          {/* 3. MASIM CONTENT */}
          {activeTab === 'masim' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5">
                  <Scroll className="w-3.5 h-3.5" /> Khazanah Turats & Salafiyah
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-[#0d4a28] leading-tight">
                  Masim: Madrasah Salafiyah Diniyah & Kajian Kitab Kuning
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Program Masim (Madrasah Salafiyah) memelihara transmisi sanad keilmuan ulama Nusantara melalui metode *sorogan* dan *bandongan* dengan makna gandul Jawa. Santri mendalami gramatika Arab (nahwu-sharaf), fiqih mazhab Syafi'i, tauhid, hadits, dan tasawuf.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 pt-1">
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="font-bold text-[#0d4a28] block">Al-Jurumiyyah & Imrithi</span>
                    <span className="text-[10px] text-gray-500">Gramatika Nahwu-Shorof</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="font-bold text-[#0d4a28] block">Fathul Qorib Al-Mujib</span>
                    <span className="text-[10px] text-gray-500">Fiqih Ibadah & Muamalah</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="font-bold text-[#0d4a28] block">Aqidatul Awam & Tijan</span>
                    <span className="text-[10px] text-gray-500">Tauhid Ahlussunnah</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="font-bold text-[#0d4a28] block">Ta'limul Muta'allim</span>
                    <span className="text-[10px] text-gray-500">Adab Penuntut Ilmu</span>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => onOpenSyllabusModal('Madrasah Salafiyah Diniyah Masim')}
                    className="px-4 py-2.5 rounded-xl bg-[#1a6b3c] hover:bg-[#0d4a28] text-white text-xs font-bold flex items-center gap-2 btn-spring shadow-sm"
                  >
                    <Download className="w-4 h-4 text-[#d4af37]" />
                    <span>Unduh Daftar Kitab Masim</span>
                  </button>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-lg h-72 sm:h-96 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
                  alt="Kajian Kitab Kuning Masim"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-[#1a6b3c] shadow-sm">
                  📖 Sorogan, Bandongan & Lalaran Nadhom Santri
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
