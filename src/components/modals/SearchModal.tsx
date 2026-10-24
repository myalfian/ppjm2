import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  BookOpen, 
  Building2, 
  GraduationCap, 
  Trophy, 
  Cpu, 
  Image, 
  Newspaper, 
  Activity, 
  MapPin, 
  UserCheck,
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { 
  Post, 
  MediaGalleryItem, 
  PPDBSubmission, 
  AchievementItem, 
  ExtracurricularItem, 
  FacilityItem, 
  FAQItem 
} from '../../types';

interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  category: 'Program' | 'Berita' | 'Galeri' | 'Ekskul' | 'Prestasi' | 'STEM' | 'Fasilitas' | 'Profil' | 'PPDB' | 'FAQ' | string;
  badge?: string;
  action: () => void;
  icon: React.ReactNode;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
  mediaList: MediaGalleryItem[];
  ppdbList: PPDBSubmission[];
  achievements?: AchievementItem[];
  extracurriculars?: ExtracurricularItem[];
  facilities?: FacilityItem[];
  faqs?: FAQItem[];
  onOpenNewsDetail: (post: Post) => void;
  onOpenMediaModal: (item: MediaGalleryItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  posts,
  mediaList,
  ppdbList,
  achievements = [],
  extracurriculars = [],
  facilities = [],
  faqs = [],
  onOpenNewsDetail,
  onOpenMediaModal
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      setQuery('');
      setActiveCategory('Semua');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const scrollToSection = (sectionId: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  // Static searchable catalog
  const staticItems: SearchResultItem[] = [
    // Program
    {
      id: 'prog-pondok',
      title: 'Program Pondok Pesantren (Tahfidz 30 Juz Bersanad)',
      description: 'Halaqah Al-Qur\'an intensif ba\'da Subuh dan Maghrib, mutaba\'ah harian dan bimbingan dewan masyaikh bersanad.',
      category: 'Program',
      badge: 'Pondok',
      action: () => scrollToSection('program-pondok'),
      icon: <GraduationCap className="w-4 h-4 text-emerald-600" />
    },
    {
      id: 'prog-sekolah',
      title: 'Pondok Pesantren Jauharul Maknuun (Akreditasi A BAN-PDM)',
      description: 'Pendidikan formal kurikulum terpadu nasional, integrasi riset STEM, dwibahasa Arab-Inggris dan pembinaan akhlak.',
      category: 'Program',
      badge: 'Sekolah',
      action: () => scrollToSection('program-sekolah'),
      icon: <GraduationCap className="w-4 h-4 text-emerald-600" />
    },
    {
      id: 'prog-masim',
      title: 'Masim (Madrasah Salafiyah Diniyah Turats)',
      description: 'Kajian kitab kuning salaf: Jurumiyah, Imrithi, Alfiyah Ibnu Malik, Fathul Qorib, Ta\'lim Muta\'allim, dan Ushul Fiqih.',
      category: 'Program',
      badge: 'Masim',
      action: () => scrollToSection('program-masim'),
      icon: <GraduationCap className="w-4 h-4 text-emerald-600" />
    },
    // JM Center / Profil
    {
      id: 'profil-jm',
      title: 'Profil Pesantren & Legalitas Kemenag RI',
      description: 'Sejarah berdirinya Pondok Pesantren Jauharul Maknuun Lasem Sidayu Gresik, legalitas yayasan dan struktur kepengurusan.',
      category: 'Profil',
      badge: 'JM Center',
      action: () => scrollToSection('profil-jm'),
      icon: <Building2 className="w-4 h-4 text-[#1a6b3c]" />
    },
    {
      id: 'sambutan-direktur',
      title: 'Sambutan Direktur Pesantren (KH. Ahmad Zaini, M.Pd.I)',
      description: 'Amanat dan arahan pimpinan pesantren mengenai visi pembentukan kader ulama berwawasan teknologi modern.',
      category: 'Profil',
      badge: 'JM Center',
      action: () => scrollToSection('sambutan-direktur'),
      icon: <Sparkles className="w-4 h-4 text-[#d4af37]" />
    },
    {
      id: 'visi-misi',
      title: 'Visi, Misi & Panca Jiwa Santri',
      description: 'Keikhlasan, kesederhanaan, berdikari, ukhuwah Islamiyah, dan kebebasan berpikir dalam bingkai Ahlussunnah wal Jama\'ah.',
      category: 'Profil',
      badge: 'JM Center',
      action: () => scrollToSection('visi-misi'),
      icon: <Building2 className="w-4 h-4 text-[#1a6b3c]" />
    },
    // Ekskul
    {
      id: 'ekskul-robotik',
      title: 'Ekstrakurikuler Robotika & IoT Santri',
      description: 'Pembelajaran perakitan robot berbasis mikrokontroler Arduino/ESP32, sensor cerdas dan kompetisi robotik nasional.',
      category: 'Ekskul',
      badge: 'Teknologi',
      action: () => scrollToSection('ekstrakurikuler'),
      icon: <Activity className="w-4 h-4 text-blue-600" />
    },
    {
      id: 'ekskul-hadrah',
      title: 'Hadrah Al-Banjari & Seni Shalawat',
      description: 'Pelatihan pukulan rebana terbang, vokal shalawat qasidah, dan penampilan pada majelis ta\'lim serta hari besar Islam.',
      category: 'Ekskul',
      badge: 'Seni Islami',
      action: () => scrollToSection('ekstrakurikuler'),
      icon: <Activity className="w-4 h-4 text-emerald-600" />
    },
    {
      id: 'ekskul-panahan',
      title: 'Panahan Sunnah (Archery Club)',
      description: 'Olahraga sunnah melatih konsentrasi, ketenangan emosional, dan kekuatan fisik santri dengan standar target FITA.',
      category: 'Ekskul',
      badge: 'Olahraga',
      action: () => scrollToSection('ekstrakurikuler'),
      icon: <Activity className="w-4 h-4 text-amber-600" />
    },
    {
      id: 'ekskul-pramuka',
      title: 'Gerakan Pramuka Gugus Depan Jauharul Maknuun',
      description: 'Pendidikan kepanduan, kepemimpinan lapangan, baris-berbaris, pionering, dan kemah bakti santri.',
      category: 'Ekskul',
      badge: 'Kepanduan',
      action: () => scrollToSection('ekstrakurikuler'),
      icon: <Activity className="w-4 h-4 text-green-700" />
    },
    // Prestasi
    {
      id: 'prestasi-tahfidz',
      title: 'Juara 1 MHQ Tahfidz Qur\'an 10 & 20 Juz',
      description: 'Raihan prestasi santri dalam ajang Musabaqah Hifdzil Qur\'an tingkat Provinsi Jawa Timur dan Nasional.',
      category: 'Prestasi',
      badge: 'Nasional',
      action: () => scrollToSection('prestasi'),
      icon: <Trophy className="w-4 h-4 text-[#d4af37]" />
    },
    {
      id: 'prestasi-robotik',
      title: 'Medali Emas Kompetisi Robotika Sains Madrasah',
      description: 'Inovasi robot pemilah sampah otomatis dan smart garden hidroponik karya tim sains santri Pondok Pesantren Jauharul Maknuun.',
      category: 'Prestasi',
      badge: 'Juara 1',
      action: () => scrollToSection('prestasi'),
      icon: <Trophy className="w-4 h-4 text-[#d4af37]" />
    },
    // STEM
    {
      id: 'steam-lab',
      title: 'Laboratorium STEM & Komputer Modern',
      description: 'Integrasi Science, Technology, Engineering, dan Mathematics dalam kurikulum santri abad ke-21.',
      category: 'STEM',
      badge: 'Laboratorium',
      action: () => scrollToSection('steam'),
      icon: <Cpu className="w-4 h-4 text-indigo-600" />
    },
    {
      id: 'steam-astronomi',
      title: 'Ilmu Falak & Praktik Rukyatul Hilal Digital',
      description: 'Pendalaman hisab falakiyah astronomi Islam dengan instrumen theodolite dan teleskop teropong bintang digital.',
      category: 'STEM',
      badge: 'Riset',
      action: () => scrollToSection('steam'),
      icon: <Cpu className="w-4 h-4 text-purple-600" />
    },
    // Fasilitas
    {
      id: 'fasilitas-masjid',
      title: 'Masjid Jami\' Baitul Maknuun 3 Lantai',
      description: 'Pusat ibadah shalat berjamaah 5 waktu, kajian tafsir, halaqah Qur\'an, dan qiyamul lail santri.',
      category: 'Fasilitas',
      badge: 'Fasilitas Utama',
      action: () => scrollToSection('facilities'),
      icon: <Building2 className="w-4 h-4 text-emerald-700" />
    },
    {
      id: 'fasilitas-asrama',
      title: 'Kompleks Asrama Putra & Putri Modern',
      description: 'Kamar representatif dengan sirkulasi udara sejuk, ranjang bertingkat standar, loker pribadi, dan sanitasi bersih.',
      category: 'Fasilitas',
      badge: 'Asrama',
      action: () => scrollToSection('facilities'),
      icon: <Building2 className="w-4 h-4 text-emerald-700" />
    },
    // Lokasi & Kontak
    {
      id: 'lokasi-pesantren',
      title: 'Alamat Kompleks Pesantren & Kontak Sekretariat',
      description: 'Jl. Raya Lasem Sidayu, Kabupaten Gresik, Jawa Timur. Narahubung WhatsApp: 0812-3456-7890.',
      category: 'Fasilitas',
      badge: 'Kontak',
      action: () => scrollToSection('lokasi'),
      icon: <MapPin className="w-4 h-4 text-red-500" />
    }
  ];

  // Dynamic Posts
  const postItems: SearchResultItem[] = posts.map(p => ({
    id: `post-${p.id}`,
    title: p.title,
    description: p.summary || p.content.slice(0, 110) + '...',
    category: 'Berita',
    badge: p.category,
    action: () => {
      onClose();
      onOpenNewsDetail(p);
    },
    icon: <Newspaper className="w-4 h-4 text-blue-600" />
  }));

  // Dynamic Media Items (Galeri)
  const mediaItems: SearchResultItem[] = mediaList.map(m => ({
    id: `media-${m.id}`,
    title: m.title,
    description: m.description || `Dokumentasi visual kategori ${m.category} (${m.type === 'video' ? 'Video' : 'Foto'}).`,
    category: 'Galeri',
    badge: m.type === 'video' ? 'Video' : 'Foto',
    action: () => {
      onClose();
      onOpenMediaModal(m);
    },
    icon: <Image className="w-4 h-4 text-emerald-600" />
  }));

  // Static PPDB shortcuts (informasi publik tanpa membeberkan PII santri)
  const ppdbStaticItems: SearchResultItem[] = [
    {
      id: 'ppdb-info',
      title: 'Penerimaan Peserta Didik Baru (PPDB Online 2026/2027)',
      description: 'Pendaftaran santri baru Pondok Pesantren Jauharul Maknuun dibuka untuk Gelombang 1.',
      category: 'Program',
      badge: 'PPDB 2026',
      action: () => {
        onClose();
        scrollToSection('home');
      },
      icon: <UserCheck className="w-4 h-4 text-[#1a6b3c]" />
    }
  ];

  // Dynamic Achievements
  const achievementItems: SearchResultItem[] = achievements.map(a => ({
    id: `ach-${a.id}`,
    title: `${a.title} (${a.winner})`,
    description: a.description || `Prestasi tingkat ${a.level} kategori ${a.category}. Diselenggarakan oleh ${a.organizer} tahun ${a.year}.`,
    category: 'Prestasi',
    badge: `Tingkat ${a.level}`,
    action: () => {
      onClose();
      scrollToSection('prestasi');
    },
    icon: <Trophy className="w-4 h-4 text-[#d4af37]" />
  }));

  // Dynamic Extracurriculars
  const extracurricularItems: SearchResultItem[] = extracurriculars.map(e => ({
    id: `ekskul-${e.id}`,
    title: e.name,
    description: e.shortDesc || e.fullDesc,
    category: 'Ekskul',
    badge: e.category,
    action: () => {
      onClose();
      scrollToSection('ekstrakurikuler');
    },
    icon: <Activity className="w-4 h-4 text-[#1a6b3c]" />
  }));

  // Dynamic Facilities
  const facilityItems: SearchResultItem[] = facilities.map(f => ({
    id: `fac-${f.id}`,
    title: f.title,
    description: f.desc,
    category: 'Fasilitas',
    badge: f.tag,
    action: () => {
      onClose();
      scrollToSection('facilities');
    },
    icon: <Building2 className="w-4 h-4 text-emerald-700" />
  }));

  // Dynamic FAQs
  const faqItems: SearchResultItem[] = faqs.map(f => ({
    id: `faq-${f.id}`,
    title: f.q,
    description: f.a,
    category: 'FAQ',
    badge: f.category,
    action: () => {
      onClose();
      scrollToSection('faq');
    },
    icon: <Sparkles className="w-4 h-4 text-amber-500" />
  }));

  const allItems = [
    ...staticItems, 
    ...postItems, 
    ...mediaItems, 
    ...achievementItems,
    ...extracurricularItems,
    ...facilityItems,
    ...faqItems,
    ...ppdbStaticItems
  ];

  // Filtering
  const cleanQuery = query.trim().toLowerCase();
  const filteredItems = allItems.filter(item => {
    // Category tab filter
    if (activeCategory !== 'Semua' && item.category !== activeCategory) {
      return false;
    }

    if (!cleanQuery) return true;

    return (
      item.title.toLowerCase().includes(cleanQuery) ||
      item.description.toLowerCase().includes(cleanQuery) ||
      (item.badge && item.badge.toLowerCase().includes(cleanQuery))
    );
  });

  const categories = ['Semua', 'Program', 'Berita', 'Galeri', 'Ekskul', 'Prestasi', 'STEM', 'Fasilitas', 'Profil', 'FAQ'];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-3 sm:px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[82vh] animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="relative p-4 sm:p-5 border-b border-gray-100 flex items-center gap-3 bg-gradient-to-r from-gray-50/80 via-white to-gray-50/80">
          <div className="w-10 h-10 rounded-2xl bg-[#1a6b3c]/10 text-[#1a6b3c] flex items-center justify-center shrink-0">
            <Search className="w-5 h-5 text-[#1a6b3c]" />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari berita, program, ekskul, prestasi, galeri..."
            className="w-full bg-transparent border-none text-sm sm:text-base font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
          />

          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
              title="Hapus ketikan"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition shrink-0"
            title="Tutup (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/50 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full font-bold whitespace-nowrap transition-all duration-150 ${
                activeCategory === cat
                  ? 'bg-[#1a6b3c] text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 divide-y divide-gray-100 space-y-1">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div
                key={item.id}
                onClick={item.action}
                className="p-3 rounded-2xl hover:bg-[#1a6b3c]/5 hover:border-[#1a6b3c]/20 border border-transparent transition cursor-pointer flex items-start gap-3.5 group"
              >
                <div className="w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-[#1a6b3c]/15 group-hover:scale-105 transition flex items-center justify-center shrink-0 mt-0.5">
                  {item.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 group-hover:bg-[#1a6b3c]/10 text-gray-600 group-hover:text-[#1a6b3c] transition">
                      {item.category}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#1a6b3c] transition truncate">
                    {item.title}
                  </h4>
                  
                  <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="text-gray-300 group-hover:text-[#1a6b3c] group-hover:translate-x-1 transition shrink-0 self-center">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-gray-800">
                Tidak ada hasil untuk "{query}"
              </h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Coba gunakan kata kunci umum seperti: <button onClick={() => setQuery('Tahfidz')} className="text-[#1a6b3c] font-bold hover:underline">Tahfidz</button>, <button onClick={() => setQuery('Pesantren')} className="text-[#1a6b3c] font-bold hover:underline">Pesantren</button>, <button onClick={() => setQuery('Robotika')} className="text-[#1a6b3c] font-bold hover:underline">Robotika</button>, atau <button onClick={() => setQuery('Masim')} className="text-[#1a6b3c] font-bold hover:underline">Masim</button>.
              </p>
            </div>
          )}
        </div>

        {/* Footer Shortcut Helper */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 px-4">
          <div className="flex items-center gap-2">
            <span>Ditemukan <strong>{filteredItems.length}</strong> entri</span>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <span>Tekan <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded shadow-xs font-mono">ESC</kbd> untuk keluar</span>
          </div>
        </div>

      </div>
    </div>
  );
};
