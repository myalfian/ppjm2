import { ExtracurricularItem, AchievementItem, SteamActivityItem } from '../types';

export const extracurricularList: ExtracurricularItem[] = [
  {
    id: 'ekskul-1',
    name: "Jam'iyyah Sholawat & Seni Hadrah Al-Banjari",
    category: 'Seni Islami',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Pelestarian seni shalawat klasik Nusantara, variasi pukulan rebana, dan olah vokal qasidah.',
    fullDesc: "Jam'iyyah Sholawat Al-Banjari 'Syauqul Maknuun' merupakan salah satu wadah seni kebanggaan santri. Santri dilatih teknik pukulan terbang (golong, anakan, seling), keharmonisan ketukan, serta lantunan vokal qasidah maulid Simthuddurar dan Diba'i. Ekskul ini aktif mengisi peringatan hari besar Islam serta mengikuti festival hadrah di berbagai kota.",
    schedule: "Malam Jum'at (20.00 - 22.00) & Ahad Sore (16.00 - 17.30)",
    coach: "Ust. M. Syamsul Huda & Tim Hadrah Ahbabul Musthofa",
    location: "Aula Utama & Pendopo Seni Santri",
    activities: [
      'Latihan rutin ketukan dasar dan variasi banjari kontemporer',
      'Vocal coaching maqam bayati, nahawand, dan rost',
      'Kajian syair maulid Simthuddurar & Ad-Diba\'i',
      'Partisipasi dalam festival seni hadrah tingkat regional dan provinsi'
    ],
    achievements: [
      'Juara Umum Festival Banjari Se-Jawa Timur 2025',
      'Juara 1 Kategori Aransemen Terbaik Gebyar Maulid Nusantara 2024'
    ]
  },
  {
    id: 'ekskul-2',
    name: 'Pencak Silat Pagar Nusa (Gasmi & IPSI)',
    category: 'Bela Diri',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Bela diri kebanggaan santri Nahdlatul Ulama, melatih ketahanan fisik, mental, dan akhlak kesatria.',
    fullDesc: 'Pencak Silat Nahdlatul Ulama Pagar Nusa mendidik santri menjadi pribadi yang tangguh, berbudi pekerti luhur, dan siap membela agama serta tanah air. Materi pembinaan meliputi jurus baku IPSI, jurus paket Pagar Nusa, fisik atlet tanding, teknik pernapasan, serta penanaman adab tawadhu santri.',
    schedule: 'Selasa & Jum\'at Sore (16.00 - 17.30 WIB)',
    coach: 'Pendekar M. Ridwan (Sabuk Hitam IPSI & Pengcab Pagar Nusa)',
    location: 'Lapangan Olahraga & Halaman Pesantren',
    activities: [
      'Pemanasan fisik terstruktur & kelenturan otot',
      'Penguasaan jurus baku tangan kosong & senjata trisula/toya',
      'Simulasi tanding kategori laga kelas tanding pelajar',
      'Ujian kenaikan tingkat (UKT) dan pembaretan sabuk santri'
    ],
    achievements: [
      'Medali Emas Seni Tunggal Putra Kejurprov Pagar Nusa 2025',
      'Juara 2 Kategori Tanding Kelas C Kejuaraan Pencak Silat Pelajar 2024'
    ]
  },
  {
    id: 'ekskul-3',
    name: 'Muhadharah & Khitobah 3 Bahasa (Arab, Inggris, Indo)',
    category: 'Bahasa',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Pengembangan seni berpidato, debat argumentatif, dan diplomasi dakwah internasional santri.',
    fullDesc: 'Muhadharah melatih santri tampil percaya diri di hadapan publik dengan menguasai kaidah public speaking dalam 3 bahasa (Bahasa Arab fushah, Bahasa Inggris akademis, dan Bahasa Indonesia baku). Santri diasah menyusun naskah pidato berbobot berbasis dalil Al-Qur\'an dan hadits serta menyampaikan gagasan secara persuasif.',
    schedule: 'Kamis Malam (20.00 - 21.45 WIB)',
    coach: 'Ust. Faruq Al-Hafidz, Lc. & Ms. Amanda Wijaya, M.Pd.',
    location: 'Auditorium Al-Ghazali & Panggung Mini Bahasa',
    activities: [
      'Simulasi pidato mimbar bergiliran dengan format orasi resmi',
      'Debat ilmiah isu keislaman dan sains kontemporer',
      'Pelatihan intonasi suara, artikulasi, dan bahasa tubuh retorika',
      'Karantina intensif kompetisi debat bahasa antar-pesantren'
    ],
    achievements: [
      'Juara 1 Debat Bahasa Arab Pesantren Se-Jateng & Jatim 2025',
      'Juara Harapan 1 English Speech Contest Islamic Boarding School 2024'
    ]
  },
  {
    id: 'ekskul-4',
    name: 'Khat & Kaligrafi Arab Kontemporer',
    category: 'Seni Islami',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Menulis indah ayat-ayat suci Al-Qur\'an dengan kaidah mistar klasik dan estetika lukis kanvas.',
    fullDesc: 'Ekstrakurikuler Kaligrafi membimbing santri menguasai kaidah jenis khat muktabar (Naskhi, Tsuluts, Riq\'ah, Diwani, Farisi, Kufi) menggunakan qalam bambu tradisional tinta celup, hingga pengembangan kaligrafi lukis modern dengan media kanvas dan cat akrilik.',
    schedule: 'Rabu Sore (15.45 - 17.30 WIB)',
    coach: 'Khatthath Ahmad Munir (Alumni LEMKA & Juara MTQ Nasional)',
    location: 'Studio Seni Rupa & Galeri Kaligrafi Santri',
    activities: [
      'Pembuatan qalam bambu dan perataan sudut mata pena kaligrafi',
      'Latihan titik ukur mistar per-huruf hijaiyah (kaidah Hasyim Al-Baghdadi)',
      'Teknik pewarnaan latar kanvas, gradasi akrilik, dan tata letak mushaf',
      'Pameran karya kaligrafi santri pada peringatan Haflah Akhirussanah'
    ],
    achievements: [
      'Juara 2 Kaligrafi Lukis Mushaf Tingkat Nasional 2024',
      'Juara 1 Kaligrafi Naskhi MTQ Pelajar Tingkat Kabupaten 2025'
    ]
  },
  {
    id: 'ekskul-5',
    name: 'Santri Coding & Web Development Club',
    category: 'Teknologi',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Eksplorasi logika pemrograman, pembuatan website dakwah, dan pengenalan kecerdasan buatan.',
    fullDesc: 'Membekali santri keterampilan abad ke-21 tanpa meninggalkan adab pesantren. Santri diajarkan dasar pemrograman, struktur data algoritma, HTML/CSS modern, JavaScript, serta pembuatan platform dakwah digital dan aplikasi pencatatan hafalan santri.',
    schedule: 'Ahad Pagi (08.30 - 11.00 WIB)',
    coach: 'Ir. M. Alfian & Tim IT Pondok Pesantren Jauharul Maknuun',
    location: 'Laboratorium Komputer & Riset STEM Modern',
    activities: [
      'Praktikum logika algoritma dasar menggunakan Scratch dan Python',
      'Membangun halaman web interaktif HTML, CSS Tailwind, dan JavaScript',
      'Edukasi literasi digital sehat, keamanan siber, dan etika AI',
      'Proyek kelompok pembuatan portal arsip hadits dan jadwal asrama'
    ],
    achievements: [
      'Finalis National Santri Tech Innovation Challenge 2025',
      'Best UI Design Website Dakwah Pelajar se-Karesidenan 2024'
    ]
  },
  {
    id: 'ekskul-6',
    name: 'Pramuka Pesantren (Gugus Depan JM)',
    category: 'Kepanduan',
    image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Pendidikan kepanduan berbasis nilai kesantrian, kepemimpinan, kepedulian alam, dan SAR.',
    fullDesc: 'Gerakan Pramuka Gugus Depan Pondok Pesantren Jauharul Maknuun memadukan Dasa Darma Pramuka dengan akhlaqul karimah. Santri dilatih keterampilan pioneering, navigasi darat, sandi morse, semaphore, P3K kegawatdaruratan, serta penjelajahan alam terarah.',
    schedule: 'Sabtu Pagi (07.00 - 09.30 WIB)',
    coach: 'Kak Wahyudi, S.Pd. (KMD Kwarcab) & Pembina Asrama',
    location: 'Bumi Perkemahan Santri & Lapangan Utama',
    activities: [
      'Latihan tali-temali pioneering pembuatan jembatan darurat dan menara pandang',
      'Navigasi kompas bidik, peta buta, dan survival di alam terbuka',
      'Bakti sosial bersih lingkungan pantai dan desa binaan pesantren',
      'Kemah Santri Nasional dan Lomba Tingkat (LT) Regu Penggalang'
    ],
    achievements: [
      'Regu Penggalang Berprestasi Tinggi Kemah Santri Kabupaten 2025',
      'Juara 1 Lomba Pionering Cepat Jambore Cabang 2024'
    ]
  },
  {
    id: 'ekskul-7',
    name: 'Jurnalistik, Fotografi & Desain Media Santri',
    category: 'Teknologi',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Pelatihan menulis berita, fotografi jurnalistik, penerbitan buletin cetak, dan video kreatif.',
    fullDesc: 'Tim Media Santri mengelola buletin bulanan Maknuun, papan majalah dinding berkala, serta dokumentasi visual kegiatan harian pesantren. Santri dibimbing teknik wawancara liputan, fotografi digital, dan penyuntingan video konten positif.',
    schedule: 'Sabtu Sore (15.45 - 17.30 WIB)',
    coach: 'Ust. Nurul Huda, S.Sos. (Jurnalis Senior Media Islam)',
    location: 'Ruang Redaksi Media Santri & Studio Foto',
    activities: [
      'Pelatihan kaidah 5W+1H penulisan artikel dan opini santri',
      'Hunting foto jurnalistik dengan kamera DSLR/Mirrorless',
      'Layouting buletin cetak menggunakan Adobe InDesign dan Canva Pro',
      'Pengelolaan saluran media sosial resmi pesantren dan podcast santri'
    ],
    achievements: [
      'Juara 2 Majalah Dinding 3D Festival Literasi Santri 2024',
      'Penerbitan 12 Edisi Buletin Bulanan Santri Ber-ISSN'
    ]
  },
  {
    id: 'ekskul-8',
    name: 'Tahfidz Club & Seni Tilawatil Qur\'an Mujawwad',
    category: 'Seni Islami',
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Penyempurnaan lagu-lagu tilawah Al-Qur\'an bersuara merdu dengan ketelitian tajwid mendalam.',
    fullDesc: 'Wadah khusus bagi santri yang memiliki bakat seni membaca Al-Qur\'an dengan lagu mujawwad. Santri diajarkan tujuh maqam tilawah (Bayati, Shoba, Hijaz, Nahawand, Rost, Sika, Jiharkah) serta teknik pernapasan perut dan keindahan cengkok tilawah.',
    schedule: 'Senin Malam (20.00 - 21.30 WIB)',
    coach: 'Ustadz Qari\' H. Ahmad Zainuri, Al-Hafidz (Juara MTQ Internasional)',
    location: 'Masjid Jami\' Pesantren (Mihrab Tahfidz)',
    activities: [
      'Latihan tangga nada nagham qira\'ah 7 maqam tilawah standar LPTQ',
      'Penguasaan waqaf wal ibtida\' dan kesempurnaan harakat ghunnah',
      'Simulasi panggung MTQ / MHQ dengan penilaian mikrofon audio profesional',
      'Pembacaan ayat suci Al-Qur\'an pada acara resmi dan pengajian akbar'
    ],
    achievements: [
      'Juara 1 Tilawah Mujawwad Remaja Tingkat Jawa Tengah 2025',
      'Pemberian Ijazah Qira\'ah dari Guru Sanad Al-Qur\'an'
    ]
  }
];

export const achievementsList: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Juara 1 Musabaqah Hifdzil Qur\'an (MHQ) 30 Juz Tingkat Nasional',
    level: 'Nasional',
    category: 'Tahfidz',
    winner: 'Muhammad Fatih Al-Habsyi',
    classGrade: 'Santri Pondok Pesantren Jauharul Maknuun',
    organizer: 'Kementerian Agama Republik Indonesia & LPTQ Nasional',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=800&q=80',
    description: 'Berhasil meraih nilai tertinggi 99.2 pada babak final MHQ 30 Juz kategori santri putra dengan kelancaran hafalan sempurna, tajwid mutqin, dan adab panggung memukau.'
  },
  {
    id: 'ach-2',
    title: 'Medali Emas Olimpiade Sains Nasional (OSN) Bidang IPA Terpadu',
    level: 'Nasional',
    category: 'Sains & Teknologi',
    winner: 'Siti Aisyah Nur Fadhilah',
    classGrade: 'Santri Pondok Pesantren Jauharul Maknuun',
    organizer: 'Pusat Prestasi Nasional (Puspresnas) Kemendikbudristek',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80',
    description: 'Menyabet medali emas setelah menuntaskan rangkaian soal teori sains terpadu serta praktikum observasi biologi sel dan mekanika fluida dengan predikat sangat memuaskan.'
  },
  {
    id: 'ach-3',
    title: 'Juara Umum Festival Seni Hadrah Sholawat Banjari Se-Jawa Timur',
    level: 'Provinsi',
    category: 'Seni Islami',
    winner: 'Tim Hadrah Syauqul Maknuun (12 Santri)',
    classGrade: 'Regu Hadrah Asrama Santri',
    organizer: 'PWNU Jawa Timur & Ikatan Seni Hadrah Indonesia (ISHARI)',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    description: 'Meraih skor total 297 poin dari dewan juri, mengungguli 45 grup hadrah ternama se-Jawa Timur dalam kategori variasi aransemen terbang, harmoni vokal, dan adab panggung.'
  },
  {
    id: 'ach-4',
    title: 'Juara 1 Debat Bahasa Arab Pesantren Se-Jawa Tengah & Jawa Timur',
    level: 'Provinsi',
    category: 'Bahasa & Pidato',
    winner: 'Ahmad Farhan & M. Rifqi Maulana',
    classGrade: 'Kelas IX (Bilingual Program)',
    organizer: 'Fakultas Tarbiyah UIN Walisongo & Asosiasi Pengajar Bahasa Arab',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    description: 'Menumbangkan 32 tim perwakilan pesantren unggulan dalam babak final bertema relevansi fiqih muamalah klasik dalam transaksi digital modern menggunakan bahasa Arab fushah fasih.'
  },
  {
    id: 'ach-5',
    title: 'Medali Emas Kejurprov Pencak Silat Pagar Nusa Tingkat Provinsi',
    level: 'Provinsi',
    category: 'Olahraga',
    winner: 'Bima Arya Perkasa',
    classGrade: 'Santri Pondok Pesantren Jauharul Maknuun',
    organizer: 'Pengurus Wilayah Pencak Silat NU Pagar Nusa Jawa Tengah',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=800&q=80',
    description: 'Tampil prima pada kategori seni jurus tunggal baku tangan kosong dan senjata toya dengan penghayatan gerak, kecepatan, serta ketepatan kuncian yang memukau dewan wasit juri.'
  },
  {
    id: 'ach-6',
    title: 'Juara 2 Kaligrafi Lukis Mushaf Kontemporer Tingkat Nasional',
    level: 'Nasional',
    category: 'Seni Islami',
    winner: 'Zahra Amalia Putri',
    classGrade: 'Santri Pondok Pesantren Jauharul Maknuun',
    organizer: 'Festival Seni Budaya Santri Indonesia (FSBSI)',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    description: 'Menghadirkan karya kanvas kaligrafi surat Al-Jumu\'ah dengan sentuhan ornamen arabesque klasik berpadu gradasi warna akrilik modern yang memikat dewan juri kaligrafer nasional.'
  },
  {
    id: 'ach-7',
    title: 'Juara 1 Lomba Cerdas Cermat Kitab Turats & Fathul Qorib',
    level: 'Kabupaten',
    category: 'Tahfidz',
    winner: 'Ziyad Ahmad & Fikri Haikal',
    classGrade: 'Madrasah Diniyah Salafiyah Ula',
    organizer: 'Kemenag Kabupaten & RMI PCNU Rembang',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    description: 'Menguasai bab ibadah fardhu, zakat, serta kaidah nahwu shorof dalam kitab Fathul Qorib Al-Mujib dan Al-Jurumiyyah dengan jawaban tepat dan argumen matang.'
  },
  {
    id: 'ach-8',
    title: 'Finalis National Santri Tech Innovation & STEM Challenge',
    level: 'Nasional',
    category: 'Sains & Teknologi',
    winner: 'Tim Riset STEM Pondok Pesantren Jauharul Maknuun (4 Santri)',
    classGrade: 'Klub Robotika & STEM Santri',
    organizer: 'Kemenkominfo & Asosiasi Pendidikan Vokasi Santri',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    description: 'Menciptakan prototipe sensor penyiram tanaman otomatis terintegrasi IoT untuk perkebunan kurma dan sayur hidroponik lingkungan asrama pesantren.'
  }
];

export const steamActivitiesList: SteamActivityItem[] = [
  {
    id: 'stem-1',
    title: 'Santri Coding, Algoritma & Web Development',
    category: 'Coding & AI',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Santri diajarkan pola pikir komputasional (computational thinking), logika algoritma pemrograman, dan pembuatan website modern.',
    fullDesc: 'Program Santri Coding membongkar stigma bahwa santri hanya mempelajari kitab klasik. Di lab komputer berjejaring serat optik, santri mempraktikkan dasar pemrograman HTML5, CSS Tailwind, JavaScript modern, serta dasar Python. Kurikulum disesuaikan dengan nilai-nilai Islam seperti etika bermedia digital dan keamanan siber dasar.',
    tools: ['PC Intel Core i5 / 16GB RAM', 'Visual Studio Code', 'Node.js', 'Python 3', 'GitHub Classroom'],
    skills: ['Logika Algoritma', 'Pembuatan Website Responsif', 'Problem Solving', 'Etika Cyber Santri'],
    projectOutput: 'Aplikasi Web Jadwal Sholat Pesantren, Web Portfolio Santri, dan Portal Arsip Maktabah Digital.',
    schedule: 'Selasa & Kamis (Praktikum Kelas IT Kurikulum Merdeka) + Ahad Pagi (Klub Peminatan)'
  },
  {
    id: 'stem-2',
    title: 'Robotika Santri & Otomatisasi IoT Pesantren',
    category: 'Robotika & IoT',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Perakitan mikrokontroler sensoris, robot line follower, dan alat otomatisasi ramah lingkungan asrama.',
    fullDesc: 'Santri belajar elektronika dasar, perakitan sirkuit mikrokontroler Arduino Uno dan NodeMCU ESP32. Proyek difokuskan pada problem solving nyata di asrama, seperti membuat sensor otomatis pengisi bak wudhu santri, lampu asrama hemat energi berbasis sensor gerak PIR, dan pemantau suhu ruangan halaqah.',
    tools: ['Kit Arduino Uno R3', 'Modul WiFi ESP32', 'Sensor Ultrasonik & Kelembaban DHT11', 'Motor Driver & Breadboard', 'Solder Station Terpadu'],
    skills: ['Elektronika Dasar', 'Logika Sensorik C++', 'Wiring Rangkaian Sirkuit', 'Penerapan Teknologi Hemat Energi'],
    projectOutput: 'Robot Pemadam Api Sederhana, Pengukur Ketinggian Air Tandon Pesantren Berbasis Notifikasi HP.',
    schedule: 'Rabu Sore & Sabtu Siang'
  },
  {
    id: 'stem-3',
    title: 'Praktikum Sains Alam, Mikroskopi & Biologi Sel Terpadu',
    category: 'Sains Terpadu',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Menelaah ayat-ayat kauniyah Allah SWT melalui pengamatan mikroskopik sel tumbuhan dan hukum fisika optik.',
    fullDesc: 'Menghubungkan nash Al-Qur\'an tentang penciptaan alam semesta dengan pembuktian empiris di laboratorium IPA. Santri meneliti struktur stomata daun, sel bawang merah dengan mikroskop binokuler, sifat optik lensa teleskop, hukum Archimedes, serta fermentasi bioteknologi pangan halal (yoghurt dan tempe santri).',
    tools: ['Mikroskop Digital Binokuler 1000x', 'Kit Optik dan Lensa Fisika', 'Cawan Petri & Preparat Sel', 'Timbangan Digital Presisi 0.01g', 'Refraktometer Glukosa'],
    skills: ['Metodologi Ilmiah', 'Pengamatan Mikroskopik', 'Tadabbur Ayat Kauniyah', 'Analisis Data Eksperimen'],
    projectOutput: 'Laporan Ilmiah Struktur Jaringan Daun Herbal Pesantren & Pameran Sains Santri Berkala.',
    schedule: 'Senin & Rabu (Mata Pelajaran IPA Terpadu Pesantren)'
  },
  {
    id: 'stem-4',
    title: 'Desain Grafis, UI/UX & Digital Content Creation',
    category: 'Digital Art',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Keterampilan visual storytelling, desain poster dakwah bernilai estetika tinggi, dan infografis keilmuan.',
    fullDesc: 'Santri dibimbing merancang identitas visual, tipografi islami, poster dakwah edukatif, layout buku panduan, hingga user interface aplikasi santri. Menggunakan tablet grafis dan perangkat lunak desain industri untuk menghasilkan karya visual yang menarik dan santun.',
    tools: ['Graphic Tablet Pen Display', 'Canva Pro Edu', 'Adobe Photoshop & Illustrator', 'Figma untuk Desain UI'],
    skills: ['Teori Warna & Tipografi', 'Desain Poster Dakwah', 'Layout Majalah & Buku', 'Visual Storytelling'],
    projectOutput: 'Puluhan infografis hadits shahih, desain kalender tahunan pesantren, dan antarmuka web PPDB.',
    schedule: 'Jum\'at Sore & Sabtu Malam'
  },
  {
    id: 'stem-5',
    title: 'Computer-Based Testing (CBT) & Literasi Digital Terpadu',
    category: 'CBT & Literasi',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Kesiapan asesmen digital terstandar, penguasaan aplikasi produktivitas perkantoran, dan ketahanan data.',
    fullDesc: 'Pesantren menyiapkan infrastruktur mandiri untuk pelaksanaan Ujian Asesmen Nasional Berbasis Komputer (ANBK), ujian madrasah digital, dan sertifikasi literasi kantor. Santri dilatih mengetik 10 jari, manajemen berkas cloud storage, dan pengolahan spreadsheet data.',
    tools: ['Server CBT Mandiri Dual Xeon', '40 Unit Komputer Klien All-in-One', 'Jaringan LAN Gigabit & Switch Cisco', 'Aplikasi CBT Berenkripsi'],
    skills: ['Kesiapan Ujian Berbasis Komputer', 'Pengolahan Data Spreadsheet', 'Manajemen Dokumen Digital', 'Integritas Akademik Digital'],
    projectOutput: '100% Kelulusan Asesmen ANBK Kemendikbudristek & Sertifikasi Kejuruan IT Santri.',
    schedule: 'Jadwal Reguler Ujian & Evaluasi Mingguan'
  }
];
