import { 
  Post, 
  PPDBSubmission, 
  MediaGalleryItem, 
  GuestbookEntry, 
  ActivityLog, 
  Santri, 
  TahfidzRecord, 
  Perizinan, 
  Tagihan, 
  NilaiAkademik,
  InstitutionSettings,
  HeroSlide 
} from '../types';

export const initialPosts: Post[] = [
  {
    id: 'post-1',
    title: 'Alhamdulillah, SMP Plus Jauharul Maknuun Resmi Meraih Akreditasi "A" BAN-PDM',
    slug: 'akreditasi-a-ban-pdm-smp-plus-jm',
    category: 'Prestasi',
    author: 'Humas PPJM',
    date: '2026-02-20',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    status: 'published',
    tags: ['Akreditasi A', 'BAN-PDM', 'SMP Plus', 'Pesantren'],
    summary: 'SMP Plus Jauharul Maknuun Islamic Boarding School resmi meraih predikat Akreditasi "A" (Unggul) dari BAN-PDM.',
    content: 'Alhamdulillah, puji syukur ke hadirat Allah SWT. SMP Plus Jauharul Maknuun Islamic Boarding School Lasem Sidayu Gresik resmi meraih predikat Akreditasi "A" dari Badan Akreditasi Nasional Pendidikan Dasar dan Menengah (BAN-PDM). Capaian ini menjadi tonggak penting dalam mewujudkan lembaga pendidikan berkualitas yang mengintegrasikan kurikulum nasional terpadu dengan pembinaan adab santri, kajian kitab kuning maknani, dan tahfidz Al-Qur\'an.'
  },
  {
    id: 'post-2',
    title: 'Kajian Rutin Kitab Turats Salafiyah Metode Maknani & Ujian Ubudiyah Santri',
    slug: 'kajian-kitab-maknani-dan-ujian-ubudiyah',
    category: 'Kegiatan',
    author: 'Pengasuh & Diniyah',
    date: '2026-02-15',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
    status: 'published',
    tags: ['Kitab Kuning', 'Maknani', 'Ubudiyah', 'Salaf'],
    summary: 'Keseharian santri dalam mendalami literatur kitab kuning klasik dan penguatan kompetensi ibadah sholat berjamaah.',
    content: 'Sebagai wujud pelestarian sanad keilmuan pesantren Nusantara, santri Pondok Pesantren Jauharul Maknuun secara istiqomah mengaji kitab kuning menggunakan metode maknani gandul ala Jawa (sorogan dan bandongan). Selain kajian gramatika nahwu-shorof dan fiqih, santri juga dievaluasi melalui ujian ubudiyah harian guna memastikan keabsahan dan kesempurnaan tata cara ibadah fardhu maupun sunnah.'
  },
  {
    id: 'post-3',
    title: 'Pendaftaran Santri Baru (PPDB) TP 2026/2027 Pondok Pesantren Jauharul Maknuun',
    slug: 'ppdb-santri-baru-2026-2027',
    category: 'Pengumuman',
    author: 'Panitia PPDB',
    date: '2026-02-10',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    status: 'published',
    tags: ['PPDB 2026', 'Santri Baru', 'Tahfidz', 'Pendaftaran'],
    summary: 'Pendaftaran santri baru dan siswa SMP Plus Islamic Boarding School Gelombang I resmi dibuka secara online.',
    content: 'Pondok Pesantren Jauharul Maknuun Lasem Sidayu Gresik membuka Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027. Tersedia Program Takhassus Tahfidzul Qur\'an 30 Juz Bersanad, SMP Plus Akademik Terakreditasi "A", Kajian Kitab Kuning Salafiyah, dan Bilingual Program (Bahasa Arab & Inggris). Kuota terbatas untuk memastikan pembinaan intensif dan asrama yang kondusif.'
  },
  {
    id: 'post-4',
    title: 'Giat Muhadharah Tiga Bahasa & Jam\'iyyah Sholawat Al-Banjari Santri JM',
    slug: 'muhadharah-tiga-bahasa-dan-sholawat-banjari',
    category: 'Agenda',
    author: 'Bagian Kesiswaan',
    date: '2026-02-05',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    status: 'published',
    tags: ['Banjari', 'Muhadharah', 'Bilingual', 'Ekstrakurikuler'],
    summary: 'Latihan khitobah dakwah tiga bahasa dan gebyar sholawat banjari melatih mental dan kreativitas santri.',
    content: 'Kegiatan muhadharah mingguan menjadi sarana santri PPJM melatih kecakapan berpidato dalam bahasa Arab, Inggris, dan Indonesia. Dilengkapi dengan lantunan Jam\'iyyah Sholawat Al-Banjari malam Jum\'at, para santri dididik menjadi generasi yang berakhlak karimah, percaya diri, dan siap berdakwah di tengah masyarakat modern.'
  }
];

export const initialPPDB: PPDBSubmission[] = [];

export const initialMedia: MediaGalleryItem[] = [
  { 
    id: 'med-1', 
    title: 'Halaqah Tahfidz & Tasmi\' 30 Juz Santri Bersanad', 
    category: 'kegiatan', 
    type: 'photo', 
    url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80', 
    size: '185 KB (WebP)',
    description: 'Suasana khidmat halaqah Al-Qur\'an santri takhassus ba\'da Subuh di Masjid Jami\' Pesantren. Santri menyetorkan hafalan dengan tartil diawasi langsung oleh dewan asatidz huffadz bersanad.',
    date: '2026-02-18',
    location: 'Masjid Jami\' Pesantren Jauharul Maknuun'
  },
  { 
    id: 'med-2', 
    title: 'Praktikum Komputer, Robotika & Riset STEM Santri', 
    category: 'fasilitas', 
    type: 'photo', 
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80', 
    size: '210 KB (WebP)',
    description: 'Aktivitas santri di laboratorium komputer modern berjejaring fiber optic. Santri mempelajari algoritma coding, simulasi ujian CBT, dan eksperimen mikrokontroler sensor IoT.',
    date: '2026-02-12',
    location: 'Laboratorium Komputer & Riset STEM SMP Plus JM'
  },
  { 
    id: 'med-3', 
    title: 'Dokumenter Profil Resmi Pondok & SMP Plus Jauharul Maknuun', 
    category: 'video', 
    type: 'video', 
    url: 'https://www.youtube.com/embed/5O_7rQyQ2sY', 
    size: 'Full HD 1080p',
    description: 'Video dokumenter resmi memperkenalkan visi, kurikulum terpadu (Kurikulum Merdeka & Kitab Turats), sarana asrama, dan testimoni wali santri Pondok Pesantren Jauharul Maknuun Lasem.',
    date: '2026-02-01',
    location: 'Kompleks Pesantren Lasem Sidayu Gresik',
    duration: '06:45'
  },
  { 
    id: 'med-4', 
    title: 'Penerimaan Piala & Medali Juara 1 MHQ 30 Juz Nasional', 
    category: 'prestasi', 
    type: 'photo', 
    url: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=1200&q=80', 
    size: '230 KB (WebP)',
    description: 'Santri Muhammad Fatih Al-Habsyi menerima trofi Juara 1 Nasional Musabaqah Hifdzil Qur\'an (MHQ) 30 Juz yang diserahkan langsung oleh dewan juri kehormatan.',
    date: '2026-01-28',
    location: 'Panggung Utama Istana Peradaban Santri Nasional'
  },
  { 
    id: 'med-5', 
    title: 'Sorogan & Bandongan Kitab Kuning Maknani Gandul', 
    category: 'kegiatan', 
    type: 'photo', 
    url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80', 
    size: '175 KB (WebP)',
    description: 'Santri mendalami kitab Fathul Qorib dan Ta\'limul Muta\'allim dengan tradisi maknani gandul ala Jawa, menjaga kelestarian metodologi sanad keilmuan pesantren salafiyah.',
    date: '2026-02-14',
    location: 'Bale Belajar Madrasah Diniyah Salafiyah'
  },
  { 
    id: 'med-6', 
    title: 'Festival Jam\'iyyah Sholawat Al-Banjari Syauqul Maknuun', 
    category: 'video', 
    type: 'video', 
    url: 'https://www.youtube.com/embed/9No-FiEInLA', 
    size: 'High Definition',
    description: 'Penampilan memukau grup rebana dan sholawat banjari santri Jauharul Maknuun yang berhasil menyabet Juara Umum Festival Hadrah Se-Jawa Timur.',
    date: '2026-01-15',
    location: 'Auditorium Seni Islami',
    duration: '08:12'
  },
  { 
    id: 'med-7', 
    title: 'Asrama Representatif Santri Putra & Putri', 
    category: 'fasilitas', 
    type: 'photo', 
    url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80', 
    size: '198 KB (WebP)',
    description: 'Area asrama yang nyaman dengan ventilasi silang sejuk, ranjang bertingkat kokoh, lemari pribadi santri, serta pengawasan wali asrama dan pembinaan 24 jam.',
    date: '2026-02-05',
    location: 'Asrama Ibnu Abbas & Siti Khadijah'
  },
  { 
    id: 'med-8', 
    title: 'Dokumentasi Gelar Karya Riset STEM & Coding Santri', 
    category: 'video', 
    type: 'video', 
    url: 'https://www.youtube.com/embed/ScMzIvxBSi4', 
    size: 'Full HD 1080p',
    description: 'Pameran sains dan inovasi santri SMP Plus Jauharul Maknuun memamerkan robot pengukur kelembaban tanah otomatis, website dakwah santri, dan proyek mikroskopi biologi.',
    date: '2026-02-10',
    location: 'Ruang Riset Sains & Teknologi Santri',
    duration: '05:30'
  }
];

export const initialGuestbook: GuestbookEntry[] = [
  {
    id: 'gb-1',
    name: 'H. Abdullah Munir',
    role: 'Wali Santri Kelas VIII',
    rating: 5,
    message: 'Alhamdulillah putra kami menunjukkan kemajuan akhlak yang luar biasa dan hafalan Al-Qur\'an lancar selama belajar di Jauharul Maknuun.',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'gb-2',
    name: 'Aisyah Rahmawati, S.Pd.',
    role: 'Alumni 2024',
    rating: 5,
    message: 'Lingkungan pesantren yang sangat asri, para asatidz membimbing dengan penuh kesabaran dan keikhlasan. Barokallah.',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'gb-3',
    name: 'Drs. H. Joko Prasetyo',
    role: 'Tokoh Masyarakat Lasem',
    rating: 5,
    message: 'Lembaga pendidikan percontohan di Lasem yang memadukan keilmuan salaf dengan kemajuan teknologi modern.',
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];

export const initialActivityLogs: ActivityLog[] = [
  { time: 'Hari ini, 09:30', user: 'KH. Ahmad Zaini (Super Admin)', action: 'Menerbitkan artikel PPDB 2026/2027', badge: 'create' },
  { time: 'Hari ini, 08:15', user: 'Panitia PPDB', action: 'Memverifikasi berkas pendaftar PPDB-2026-002', badge: 'update' },
  { time: 'Kemarin, 16:40', user: 'Humas PPJM', action: 'Mengunggah 2 foto galeri dokumentasi MHQ', badge: 'upload' },
  { time: 'Kemarin, 14:10', user: 'Admin Sistem', action: 'Melakukan backup data pendaftar format CSV', badge: 'export' }
];

export const initialSantri: Santri[] = [
  { id: 'san-1', nis: '2024001', name: 'Ziyad Ahmad Al-Bukhari', gender: 'Laki-laki', className: 'VIII-A (Tahfidz)', dormName: 'Asrama Ibnu Abbas No. 04', status: 'Aktif', guardianName: 'H. Farhan Bukhari', guardianPhone: '081299887766' },
  { id: 'san-2', nis: '2024002', name: 'Nabila Syakirah', gender: 'Perempuan', className: 'VII-B (Reguler)', dormName: 'Asrama Siti Khadijah No. 02', status: 'Aktif', guardianName: 'Hj. Mardhiyah', guardianPhone: '085733445566' },
  { id: 'san-3', nis: '2023015', name: 'Fikri Haikal Romadhon', gender: 'Laki-laki', className: 'IX-A (Sains)', dormName: 'Asrama Ali Bin Abi Thalib No. 08', status: 'Aktif', guardianName: 'M. Romadhon, S.T.', guardianPhone: '082133445577' },
  { id: 'san-4', nis: '2023020', name: 'Salma Zahida', gender: 'Perempuan', className: 'IX-B (Bilingual)', dormName: 'Asrama Aisyah No. 01', status: 'Aktif', guardianName: 'Drs. Subhan', guardianPhone: '081377889900' }
];

export const initialTahfidz: TahfidzRecord[] = [
  { id: 'thf-1', santriName: 'Ziyad Ahmad Al-Bukhari', surahJuz: 'Juz 7 (Al-An\'am)', halamanAyat: 'Hal 130-135', status: 'Mutqin', examiner: 'Ust. H. Syamsul Arifin, Al-Hafidz', date: '2026-02-21', notes: 'Tajwid dan makhraj fasih, waqaf sempurna' },
  { id: 'thf-2', santriName: 'Nabila Syakirah', surahJuz: 'Juz 3 (Ali Imran)', halamanAyat: 'Hal 50-54', status: 'Lancar', examiner: 'Ustdzh. Nur Aini, S.Pd.I', date: '2026-02-20', notes: 'Perhatikan dengung pada ikhfa haqiqi' },
  { id: 'thf-3', santriName: 'Fikri Haikal Romadhon', surahJuz: 'Juz 15 (Al-Isra\')', halamanAyat: 'Hal 282-286', status: 'Mutqin', examiner: 'Ust. M. Ridlwan, Lc.', date: '2026-02-19', notes: 'Mutqin 100%, siap untuk tasmi\' mingguan' }
];

export const initialPerizinan: Perizinan[] = [
  { id: 'pzn-1', santriName: 'Fikri Haikal Romadhon', reason: 'Menghadiri pernikahan kakak kandung di Tuban', leaveDate: '2026-02-27', returnDate: '2026-03-01', status: 'Disetujui', approver: 'Ust. Kholil (Keamanan)' },
  { id: 'pzn-2', santriName: 'Nabila Syakirah', reason: 'Pemeriksaan dokter spesialis mata di Surabaya', leaveDate: '2026-02-25', returnDate: '2026-02-26', status: 'Menunggu', approver: 'Pengasuh Putri' }
];

export const initialTagihan: Tagihan[] = [
  { id: 'tgh-1', santriName: 'Ziyad Ahmad Al-Bukhari', billTitle: 'Syahriah & Katering Februari 2026', amount: 850000, dueDate: '2026-02-10', status: 'Lunas', paidDate: '2026-02-05' },
  { id: 'tgh-2', santriName: 'Nabila Syakirah', billTitle: 'Syahriah & Katering Februari 2026', amount: 850000, dueDate: '2026-02-10', status: 'Lunas', paidDate: '2026-02-08' },
  { id: 'tgh-3', santriName: 'Fikri Haikal Romadhon', billTitle: 'Syahriah & Katering Maret 2026', amount: 850000, dueDate: '2026-03-10', status: 'Belum Lunas' }
];

export const initialNilai: NilaiAkademik[] = [
  { id: 'nil-1', santriName: 'Ziyad Ahmad Al-Bukhari', subject: 'Tahfidz Al-Qur\'an', score: 96, semester: 'Ganjil', academicYear: '2025/2026' },
  { id: 'nil-2', santriName: 'Ziyad Ahmad Al-Bukhari', subject: 'Nahwu & Shorof (Al-Ajurumiyyah)', score: 92, semester: 'Ganjil', academicYear: '2025/2026' },
  { id: 'nil-3', santriName: 'Ziyad Ahmad Al-Bukhari', subject: 'Matematika & IT STEM', score: 88, semester: 'Ganjil', academicYear: '2025/2026' },
  { id: 'nil-4', santriName: 'Nabila Syakirah', subject: 'Bahasa Arab Fusha', score: 94, semester: 'Ganjil', academicYear: '2025/2026' },
  { id: 'nil-5', santriName: 'Nabila Syakirah', subject: 'Fiqih Fathul Qorib', score: 90, semester: 'Ganjil', academicYear: '2025/2026' }
];

export const utbkQuestions = [
  {
    id: 1,
    subject: 'Pendidikan Agama Islam & Al-Qur\'an Hadits',
    question: 'Hukum bacaan mim sukun bertemu dengan huruf mim (م) dalam kaidah tajwid disebut dengan...',
    options: ['Idgham Mitslain / Idgham Mimi', 'Ikhfa Syafawi', 'Izhar Syafawi', 'Idgham Bighunnah'],
    correct: 0,
    explanation: 'Pertemuan mim sukun dengan huruf mim menghasilkan Idgham Mimi (Mitslain) dengan ghunnah 2 harakat.'
  },
  {
    id: 2,
    subject: 'Bahasa Arab & Kitab Turats',
    question: 'Di dalam gramatika ilmu Nahwu, kalimat isim yang berkedudukan sebagai subjek (pelaku perbuatan) setelah fi\'il ma\'lum disebut...',
    options: ['Maf\'ul Bih', 'Fa\'il', 'Mubtada\'', 'Khabar'],
    correct: 1,
    explanation: 'Fa\'il adalah isim marfu\' yang terletak setelah fi\'il ma\'lum dan menunjukkan pelaku perbuatan.'
  },
  {
    id: 3,
    subject: 'Literasi Bahasa Indonesia & Logika',
    question: 'Inti dari sistem Kurikulum Merdeka Terpadu di SMP Plus Jauharul Maknuun adalah...',
    options: [
      'Menghapus kurikulum agama untuk memperbanyak sains',
      'Mengintegrasikan capaian kurikulum nasional, tahfidz bersanad, dan kajian kitab salaf',
      'Hanya berfokus pada ujian berbasis hafalan tanpa praktikum',
      'Memisahkan santri asrama dari pendidikan formal'
    ],
    correct: 1,
    explanation: 'Visi Jauharul Maknuun adalah keterpaduan kurikulum nasional Kemendikbudristek dengan khazanah turats salafiyah.'
  },
  {
    id: 4,
    subject: 'Penalaran Matematika & STEM',
    question: 'Sebuah asrama santri memiliki luas tanah 450 m². Sebanyak 2/5 luas digunakan untuk kamar, 1/3 untuk aula kajian, dan sisanya taman hijau. Berapakah luas taman hijau?',
    options: ['90 m²', '120 m²', '150 m²', '180 m²'],
    correct: 1,
    explanation: 'Kamar = 2/5 * 450 = 180 m². Aula = 1/3 * 450 = 150 m². Total = 330 m². Sisa taman = 450 - 330 = 120 m².'
  },
  {
    id: 5,
    subject: 'Wawasan Kebangsaan & Akhlak Santri',
    question: 'Di antara prinsip utama Panca Jiwa Pondok Pesantren Jauharul Maknuun dalam membina santri adalah...',
    options: [
      'Keikhlasan, Kesederhanaan, Berdikari, Ukhuwah Islamiyah, dan Kebebasan Terpimpin',
      'Materialisme, Kemewahan, dan Kebebasan Mutlak',
      'Hanya mengutamakan gelar akademik tanpa integritas akhlak',
      'Menolak perkembangan teknologi dan sains modern'
    ],
    correct: 0,
    explanation: 'Panca Jiwa Pondok Pesantren mencakup Keikhlasan, Kesederhanaan, Berdikari, Ukhuwah Islamiyah, dan Kebebasan Terpimpin yang mendasari kepribadian santri.'
  }
];

export const initialSettings: InstitutionSettings = {
  name: 'Pondok Pesantren & SMP Plus Jauharul Maknuun',
  tagline: "Membina Generasi Qur'ani, Berakhlak Salaf & Berwawasan Global STEAM",
  address: 'Jl. Raya Lasem - Sidayu Km. 3, Desa Lasem, Sidayu',
  city: 'Kabupaten Gresik, Jawa Timur 61153',
  phone: '0812-3456-7890',
  whatsapp: '6281234567890',
  email: 'sekretariat@ppjauharulmaknuun.yufan.id',
  accreditation: 'Akreditasi "A" BAN-PDM',
  npsn: '69981234',
  nsm: '212352500099',
  foundation: 'Yayasan Pendidikan Islam Jauharul Maknuun',
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15837.284279581898!2d112.5466488!3d-6.9899814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e77e034a2d9894e%3A0x6b9d62d2948c2a86!2sSidayu%2C%20Gresik%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid',
  facebookUrl: 'https://facebook.com/ppjauharulmaknuun',
  instagramUrl: 'https://instagram.com/ppjauharulmaknuun',
  youtubeUrl: 'https://youtube.com/@ppjauharulmaknuun'
};

export const initialHeroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    badge: 'Pendidikan Islam Terpadu & Berkarakter',
    title: 'Mencetak Generasi Rabbani, Berakhlak & Unggul Teknologi',
    desc: 'Sistem pendidikan terpadu memadukan kemurnian Kurikulum Kitab Kuning Pesantren Salaf dengan standar nasional Kurikulum Merdeka berakreditasi "A" BAN-PDM di Kota Santri Lasem.',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1600&q=80',
    tag: 'Akreditasi "A" BAN-PDM',
    cardTheme: 'bg-gradient-to-br from-[#064e3b]/90 via-[#064e3b]/80 to-black/85 border-emerald-400/40 shadow-[0_12px_40px_rgba(6,78,59,0.5)]',
    badgeTheme: 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200',
    tagColor: 'text-[#d4af37]',
    btnTheme: 'from-[#d4af37] via-[#eab308] to-[#ca8a04]'
  },
  {
    id: 'slide-2',
    badge: "Takhassus Al-Qur'an Bersanad",
    title: 'Halaqah Tahfidz 30 Juz Mutqin & Berijazah Sanad Keilmuan',
    desc: "Bimbingan intensif hafalan ba'da Subuh dan Maghrib bersama dewan huffadz bersanad 30 juz, dilengkapi kajian tajwid qira'ah dan mutaba'ah berkala.",
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=80',
    tag: 'Target Mutqin 30 Juz',
    cardTheme: 'bg-gradient-to-br from-[#1e1b4b]/90 via-[#1e1b4b]/80 to-black/85 border-indigo-400/40 shadow-[0_12px_40px_rgba(30,27,75,0.5)]',
    badgeTheme: 'bg-indigo-500/20 border-indigo-400/40 text-indigo-200',
    tagColor: 'text-amber-300',
    btnTheme: 'from-[#d4af37] via-[#facc15] to-[#eab308]'
  },
  {
    id: 'slide-3',
    badge: 'Islamic Boarding School Modern',
    title: 'SMP Plus Jauharul Maknuun: Riset STEM & Pengkajian Kitab Turats',
    desc: 'Fasilitas asrama representatif, laboratorium komputer modern, program dwibahasa (Arab-Inggris), serta kajian kitab turats maknani Jawa dan pembinaan adab santri 24 jam.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
    tag: 'Bilingual & STEM',
    cardTheme: 'bg-gradient-to-br from-[#1c1917]/90 via-[#292524]/80 to-black/85 border-amber-500/40 shadow-[0_12px_40px_rgba(28,25,23,0.5)]',
    badgeTheme: 'bg-amber-500/20 border-amber-400/40 text-amber-200',
    tagColor: 'text-cyan-300',
    btnTheme: 'from-[#d4af37] via-[#eab308] to-[#ca8a04]'
  }
];
