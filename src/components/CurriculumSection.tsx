import React, { useState } from 'react';
import { BookOpen, Award, CheckCircle2, Download, GraduationCap, Languages, Scroll, Sparkles } from 'lucide-react';

interface CurriculumSectionProps {
  onOpenSyllabusModal: (programName: string) => void;
}

export const CurriculumSection: React.FC<CurriculumSectionProps> = ({ onOpenSyllabusModal }) => {
  const [activeTab, setActiveTab] = useState<'tahfidz' | 'smp' | 'diniyah' | 'bilingual'>('tahfidz');

  return (
    <section id="programs" className="py-16 bg-[#f1f7f2] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[11px] font-bold text-[#1a6b3c] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-emerald-200">
            Kurikulum Terpadu
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4a28] mt-2">
            Pilar Pendidikan & Program Unggulan
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Keterpaduan antara sains modern, literatur klasik turats, dan keluhuran Al-Qur'anul Karim.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white/80 rounded-2xl border border-gray-200 max-w-3xl mx-auto">
          <button
            onClick={() => setActiveTab('tahfidz')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'tahfidz'
                ? 'bg-[#1a6b3c] text-white shadow-md'
                : 'text-gray-600 hover:text-[#1a6b3c] hover:bg-gray-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#d4af37]" />
            <span>Tahfidz 30 Juz</span>
          </button>

          <button
            onClick={() => setActiveTab('smp')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'smp'
                ? 'bg-[#1a6b3c] text-white shadow-md'
                : 'text-gray-600 hover:text-[#1a6b3c] hover:bg-gray-100'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-[#d4af37]" />
            <span>SMP Plus Kurikulum Merdeka</span>
          </button>

          <button
            onClick={() => setActiveTab('diniyah')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'diniyah'
                ? 'bg-[#1a6b3c] text-white shadow-md'
                : 'text-gray-600 hover:text-[#1a6b3c] hover:bg-gray-100'
            }`}
          >
            <Scroll className="w-4 h-4 text-[#d4af37]" />
            <span>Madrasah Diniyah Salaf</span>
          </button>

          <button
            onClick={() => setActiveTab('bilingual')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'bilingual'
                ? 'bg-[#1a6b3c] text-white shadow-md'
                : 'text-gray-600 hover:text-[#1a6b3c] hover:bg-gray-100'
            }`}
          >
            <Languages className="w-4 h-4 text-[#d4af37]" />
            <span>Bilingual & Karakter</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm">
          {activeTab === 'tahfidz' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                  Program Takhassus
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0d4a28]">
                  Tahfidzul Qur'an 30 Juz Mutqin Bersanad
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Program intensif menghafal 30 juz dengan standar mutqin dan sanad qira'ah bersambung. Dibimbing oleh asatidz huffadz berpengalaman dengan target hafalan terukur dan pengawasan harian.
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6b3c]" />
                    <span>Halaqah Ba'da Shubuh & Ba'da Maghrib terjadwal</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6b3c]" />
                    <span>Sistem tasmi' 5 juz, 10 juz, hingga 30 juz sekali duduk</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6b3c]" />
                    <span>Ijazah sanad tahfidz resmi bagi santri khatam dan mutqin</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6b3c]" />
                    <span>Nutrisi pendukung kecerdasan hafalan (madu & gizi seimbang)</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => onOpenSyllabusModal('Tahfidzul Qur\'an 30 Juz')}
                    className="px-4 py-2.5 rounded-xl bg-[#1a6b3c] hover:bg-[#0d4a28] text-white text-xs font-bold flex items-center gap-2 btn-spring"
                  >
                    <Download className="w-4 h-4 text-[#d4af37]" />
                    <span>Lihat Silabus Tahfidz</span>
                  </button>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-lg h-72 sm:h-80 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80"
                  alt="Halaqah Tahfidz Santri"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-[#1a6b3c]">
                  ✨ Target Khatam & Tasmi' Mutqin
                </div>
              </div>
            </div>
          )}

          {activeTab === 'smp' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                  Pendidikan Formal Terpadu
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0d4a28]">
                  SMP Plus Jauharul Maknuun (Akreditasi "A")
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Menjalankan Kurikulum Merdeka Kemendikbudristek secara holistik. Memadukan penguasaan sains, matematika, teknologi informatika (STEAM) dengan kurikulum keagamaan Islam.
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6b3c]" />
                    <span>Laboratorium Komputer & Praktikum IT modern</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6b3c]" />
                    <span>Asesmen Berbasis Komputer (CBT) mandiri</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6b3c]" />
                    <span>Guru berijazah S1 & S2 linear berprestasi</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6b3c]" />
                    <span>Bimbingan Olimpiade Sains & Karya Tulis Ilmiah Santri</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => onOpenSyllabusModal('SMP Plus Kurikulum Merdeka')}
                    className="px-4 py-2.5 rounded-xl bg-[#1a6b3c] hover:bg-[#0d4a28] text-white text-xs font-bold flex items-center gap-2 btn-spring"
                  >
                    <Download className="w-4 h-4 text-[#d4af37]" />
                    <span>Lihat Kurikulum SMP Plus</span>
                  </button>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-lg h-72 sm:h-80 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
                  alt="Laboratorium Komputer SMP Plus"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-[#1a6b3c]">
                  🏆 Akreditasi "A" BAN-PDM
                </div>
              </div>
            </div>
          )}

          {activeTab === 'diniyah' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                  Khazanah Pesantren Salafiyah
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0d4a28]">
                  Kajian Kitab Kuning Metode Maknani Gandul
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Menjaga otentisitas sanad pesantren Nusantara melalui sorogan dan bandongan kitab-kitab muktabar dalam bidang aqidah, fiqih, nahwu, sharaf, hadits, dan tasawuf.
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
                    <span className="font-bold text-[#0d4a28] block">Aqidatul Awam</span>
                    <span className="text-[10px] text-gray-500">Tauhid Asy'ariyah</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="font-bold text-[#0d4a28] block">Ta'limul Muta'allim</span>
                    <span className="text-[10px] text-gray-500">Adab Penuntut Ilmu</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => onOpenSyllabusModal('Madrasah Diniyah Salafiyah')}
                    className="px-4 py-2.5 rounded-xl bg-[#1a6b3c] hover:bg-[#0d4a28] text-white text-xs font-bold flex items-center gap-2 btn-spring"
                  >
                    <Download className="w-4 h-4 text-[#d4af37]" />
                    <span>Daftar Kitab Yang Dikaji</span>
                  </button>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-lg h-72 sm:h-80 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
                  alt="Kajian Kitab Kuning"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-[#1a6b3c]">
                  📖 Metode Sorogan & Bandongan
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bilingual' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                  Program Bahasa & Minat Bakat
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0d4a28]">
                  Bilingual Environment (Bahasa Arab & Inggris)
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Santri dibiasakan berkomunikasi dalam dua bahasa internasional di lingkungan asrama, muhadharah dakwah tiga bahasa mingguan, serta Jam'iyyah Sholawat Al-Banjari.
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6b3c]" />
                    <span>Muhadharah khitobah 3 bahasa (Arab, Inggris, Indonesia)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6b3c]" />
                    <span>Jam'iyyah Sholawat Al-Banjari malam Jum'at</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6b3c]" />
                    <span>Khat / Kaligrafi Arab & Desain Grafis Santri</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6b3c]" />
                    <span>Pencak Silat Pagar Nusa & Olahraga Bela Diri</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => onOpenSyllabusModal('Program Bilingual & Ekstrakurikuler')}
                    className="px-4 py-2.5 rounded-xl bg-[#1a6b3c] hover:bg-[#0d4a28] text-white text-xs font-bold flex items-center gap-2 btn-spring"
                  >
                    <Download className="w-4 h-4 text-[#d4af37]" />
                    <span>Jadwal Kegiatan Asrama</span>
                  </button>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-lg h-72 sm:h-80 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                  alt="Muhadharah & Ekstrakurikuler Santri"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-[#1a6b3c]">
                  🗣️ Muhadharah 3 Bahasa & Banjari
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
