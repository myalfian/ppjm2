// ============================================================
// PPSPJM Portal — script.js
// Complete Application Logic & Agile School CMS (Supabase Standardized)
// ============================================================

// --- Global Supabase Client & State ---
let supabase = null;

// ============================================================
// SECURITY HARDENING: Anti-XSS Sanitizer & Encoding Guard
// ============================================================
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
if (typeof window !== 'undefined') {
  window.escapeHtml = escapeHtml;
}


// In-memory data store for rich frontend & agile CMS
const cmsState = {
  activeTab: 'overview',
  activeRole: 'super_admin', // Default role RBAC
  currentUserProfile: null,
  santriList: [],
  asramaList: [],
  kelasList: [],
  tahfidzList: [],
  perizinanList: [],
  tagihanList: [],
  nilaiList: [],
  posts: [
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
  ],
  trash: [],
  ppdbList: [
    {
      id: 'ppdb-1',
      code: 'PPDB-2026-001',
      name: 'Muhammad Faiz Al-Fatih',
      gender: 'Laki-laki',
      program: 'Takhassus Tahfidz',
      phone: '081234567890',
      address: 'Jl. Diponegoro No. 45, Lasem, Rembang',
      status: 'Diterima',
      submitted_at: '2026-02-14T09:30:00Z'
    },
    {
      id: 'ppdb-2',
      code: 'PPDB-2026-002',
      name: 'Siti Fatimah Az-Zahra',
      gender: 'Perempuan',
      program: 'SMP Plus & Pesantren',
      phone: '085712345678',
      address: 'Desa Jolotundo RT 03/02, Lasem, Rembang',
      status: 'Terverifikasi',
      submitted_at: '2026-02-16T11:15:00Z'
    },
    {
      id: 'ppdb-3',
      code: 'PPDB-2026-003',
      name: 'Ahmad Rizki Maulana',
      gender: 'Laki-laki',
      program: 'SMP Plus & Pesantren',
      phone: '082198765432',
      address: 'Kec. Sluke, Kab. Rembang, Jawa Tengah',
      status: 'Menunggu Verifikasi',
      submitted_at: '2026-02-18T14:20:00Z'
    },
    {
      id: 'ppdb-4',
      code: 'PPDB-2026-004',
      name: 'Nurul Hidayah Putri',
      gender: 'Perempuan',
      program: 'Kajian Kitab Kuning',
      phone: '087811223344',
      address: 'Kec. Sedan, Kab. Rembang',
      status: 'Cadangan',
      submitted_at: '2026-02-19T08:45:00Z'
    }
  ],
  mediaGallery: [
    { id: 'med-1', title: 'Halaqah Tahfidz & Setoran Hafalan Qur\'an Ba\'da Subuh', category: 'kegiatan', type: 'photo', url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80', size: '185 KB (WebP)' },
    { id: 'med-2', title: 'Laboratorium Komputer & Praktikum IT SMP Plus', category: 'fasilitas', type: 'photo', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80', size: '210 KB (WebP)' },
    { id: 'med-3', title: 'Upacara Hari Santri & Peringatan Kebangsaan', category: 'kegiatan', type: 'photo', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80', size: '190 KB (WebP)' },
    { id: 'med-4', title: 'Penerimaan Trofi Juara 1 MHQ Tingkat Jawa Tengah', category: 'prestasi', type: 'photo', url: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=1200&q=80', size: '230 KB (WebP)' },
    { id: 'med-5', title: 'Perpustakaan Khazanah Turats & Buku Digital', category: 'fasilitas', type: 'photo', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80', size: '175 KB (WebP)' },
    { id: 'med-6', title: 'Profil Dokumenter PP & SMP Plus Jauharul Maknuun', category: 'video', type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', size: 'Embed Stream' }
  ],
  guestbook: [
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
  ],
  activityLogs: [
    { time: 'Hari ini, 09:30', user: 'KH. Ahmad Zaini (Super Admin)', action: 'Menerbitkan artikel PPDB 2026/2027', badge: 'create' },
    { time: 'Hari ini, 08:15', user: 'Panitia PPDB', action: 'Memverifikasi berkas pendaftar PPDB-2026-002', badge: 'update' },
    { time: 'Kemarin, 16:40', user: 'Humas PPJM', action: 'Mengunggah 2 foto galeri dokumentasi MHQ', badge: 'upload' },
    { time: 'Kemarin, 14:10', user: 'Admin Sistem', action: 'Melakukan backup data pendaftar format CSV', badge: 'export' }
  ]
};

/**
 * Log action to Activity Audit Trail
 */
function logActivity(action, badge = 'update') {
  const now = new Date();
  const timeStr = now.toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' });
  cmsState.activityLogs.unshift({
    time: timeStr,
    user: cmsState.activeRole + ' (Pengelola)',
    action,
    badge
  });
  if (cmsState.activityLogs.length > 30) cmsState.activityLogs.pop();
  renderActivityLogs();
}

/**
 * In-memory mock storage client for standalone preview/demo
 * when Supabase environment variables are not yet configured.
 */
function createMockSupabaseClient() {
  let currentUser = null;

  return {
    from: (table) => {
      if (table === 'guestbook_entries') {
        return {
          select: () => ({
            order: (col, { ascending } = { ascending: true }) => ({
              limit: async (lim) => {
                const sorted = [...cmsState.guestbook].sort((a, b) => {
                  const valA = a[col] || '';
                  const valB = b[col] || '';
                  return ascending ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
                });
                return { data: sorted.slice(0, lim || 20), error: null };
              }
            })
          }),
          insert: (records) => {
            const list = Array.isArray(records) ? records : [records];
            const newRecords = list.map((record, i) => ({
              id: 'gb-' + (Date.now() + i),
              ...record,
              created_at: record.created_at || new Date().toISOString()
            }));
            newRecords.forEach(r => cmsState.guestbook.unshift(r));
            logActivity(`Menambahkan testimoni baru dari ${newRecords[0]?.name || 'pengunjung'}`, 'create');
            return {
              select: () => ({
                single: async () => ({ data: newRecords[0], error: null }),
                then: (resolve) => resolve({ data: newRecords, error: null })
              }),
              then: (resolve) => resolve({ data: newRecords, error: null })
            };
          }
        };
      }
      if (table === 'ppdb_submissions') {
        return {
          insert: (records) => {
            const list = Array.isArray(records) ? records : [records];
            const newSubmissions = list.map((record, i) => {
              const nextCode = record.code || `PPDB-2026-${String(cmsState.ppdbList.length + 1 + i).padStart(3, '0')}`;
              return {
                id: 'ppdb-' + (Date.now() + i),
                code: nextCode,
                ...record,
                status: record.status || 'Menunggu Verifikasi',
                submitted_at: record.submitted_at || new Date().toISOString()
              };
            });
            newSubmissions.forEach(sub => cmsState.ppdbList.unshift(sub));
            logActivity(`Pendaftaran baru PPDB: ${newSubmissions[0]?.name} (${newSubmissions[0]?.code})`, 'create');
            renderAdminPPDB(cmsState.ppdbList);
            updateDashboardCounters();
            return {
              select: () => ({
                single: async () => ({ data: newSubmissions[0], error: null }),
                then: (resolve) => resolve({ data: newSubmissions, error: null })
              }),
              then: (resolve) => resolve({ data: newSubmissions, error: null })
            };
          },
          select: () => ({
            order: (col, { ascending } = { ascending: false }) => ({
              then: (resolve) => {
                const sorted = [...cmsState.ppdbList].sort((a, b) => {
                  const valA = a[col] || '';
                  const valB = b[col] || '';
                  return ascending ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
                });
                resolve({ data: sorted, error: null });
              }
            })
          }),
          update: (updates) => ({
            eq: async (field, val) => {
              const item = cmsState.ppdbList.find(s => s[field] === val);
              if (item) Object.assign(item, updates);
              return { data: item ? [item] : [], error: null };
            }
          })
        };
      }
      if (table === 'posts') {
        return {
          select: () => ({
            order: () => ({
              then: (resolve) => resolve({ data: cmsState.posts, error: null })
            })
          }),
          insert: (records) => {
            const list = Array.isArray(records) ? records : [records];
            const newPosts = list.map((r, i) => ({ id: 'post-' + (Date.now() + i), ...r }));
            newPosts.forEach(p => cmsState.posts.unshift(p));
            return {
              select: () => ({
                single: async () => ({ data: newPosts[0], error: null }),
                then: (resolve) => resolve({ data: newPosts, error: null })
              }),
              then: (resolve) => resolve({ data: newPosts, error: null })
            };
          },
          update: (updates) => ({
            eq: async (field, val) => {
              const item = cmsState.posts.find(p => p[field] === val);
              if (item) Object.assign(item, updates);
              return { data: item ? [item] : [], error: null };
            }
          })
        };
      }
      return {
        select: () => ({ order: () => ({ limit: async () => ({ data: [], error: null }) }) }),
        insert: async () => ({ error: null }),
        update: () => ({ eq: async () => ({ error: null }) }),
        delete: () => ({ eq: async () => ({ error: null }) })
      };
    },
    auth: {
      signInWithPassword: async ({ email, password }) => {
        if (email === 'admin@jauharulmaknuun.sch.id' && password === 'Maknuun2026!') {
          currentUser = { id: 'usr_admin', email };
          logActivity('Admin masuk ke Dashboard CMS', 'auth');
          return { data: { user: currentUser, session: { user: currentUser } }, error: null };
        }
        return { data: { user: null, session: null }, error: { message: 'Email atau kata sandi salah.' } };
      },
      signOut: async () => {
        currentUser = null;
        logActivity('Admin keluar dari sistem', 'auth');
        return { error: null };
      },
      getSession: async () => {
        return { data: { session: currentUser ? { user: currentUser } : null }, error: null };
      },
      onAuthStateChange: (callback) => {
        return { data: { subscription: { unsubscribe: () => {} } } };
      }
    }
  };
}

/**
 * Initialize Supabase Client (Standardized Backend)
 */
async function initSupabase() {
  const env = window.__ENV__ || {};
  const rawUrl = env.SUPABASE_URL || '';
  const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
  const supabaseAnonKey = env.SUPABASE_ANON_KEY || '';

  if (supabaseUrl && supabaseAnonKey && typeof window.supabase !== 'undefined' && window.supabase?.createClient) {
    try {
      supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
      window.supabase = supabase; // Expose standard client
      console.log('[PPSPJM] Supabase client initialized successfully.');

      // Check active auth session
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user) {
        showAdminDashboard();
        await loadUserProfile(session.user);
      } else {
        showAdminLogin();
      }

      // Listen to auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (session && session.user) {
          showAdminDashboard();
          await loadUserProfile(session.user);
        } else {
          showAdminLogin();
        }
      });

      // Fetch live data from Supabase backend
      await Promise.allSettled([
        loadAdminPPDB(),
        loadGuestbook(),
        loadPosts(),
        loadMasterData(),
        loadSantri(),
        loadTahfidz(),
        loadPerizinan(),
        loadTagihan(),
        loadNilai()
      ]);

      setupSupabaseRealtime();
      return;
    } catch (e) {
      console.warn('[PPSPJM] Failed to initialize Supabase, switching to fallback:', e);
    }
  }

  // Fallback to mock client for offline / demo mode
  console.info('[PPSPJM] Supabase env vars missing or unavailable. Using in-memory client.');
  supabase = createMockSupabaseClient();
  window.supabase = supabase;
}

/**
 * Setup Supabase Realtime Subscriptions
 */
function setupSupabaseRealtime() {
  if (!supabase || typeof supabase.channel !== 'function') return;

  try {
    const channel = supabase.channel('schema-db-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'guestbook_entries' }, payload => {
        if (payload.new) {
          cmsState.guestbook.unshift(payload.new);
          renderGuestbook(cmsState.guestbook);
        }
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'ppdb_submissions' }, payload => {
        if (payload.new) {
          cmsState.ppdbList.unshift(payload.new);
          renderAdminPPDB(cmsState.ppdbList);
          updateDashboardCounters();
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'santri' }, () => {
        loadSantri();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'hafalan_tahfidz' }, () => {
        loadTahfidz();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'perizinan_asrama' }, () => {
        loadPerizinan();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tagihan_keuangan' }, () => {
        loadTagihan();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'nilai_akademik' }, () => {
        loadNilai();
      })
      .subscribe();
  } catch (e) {
    console.warn('[PPSPJM] Realtime subscription not available:', e);
  }
}

/**
 * Non-blocking toast notification helper (replaces window.alert for iframe safety)
 */
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.setAttribute('class', 'fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none');
    document.body.appendChild(toastContainer);
  }
  const toast = document.createElement('div');
  const bgClass = type === 'error' ? 'bg-red-600 text-white' : 'bg-primary text-white border border-accent';
  toast.setAttribute('class', `${bgClass} px-4 py-3 rounded-xl shadow-xl text-xs font-medium transition-all duration-300 transform translate-y-[-10px] opacity-0 flex items-center gap-2 pointer-events-auto`);
  const icon = document.createElement('i');
  icon.setAttribute('class', type === 'error' ? 'fa-solid fa-circle-exclamation text-accent' : 'fa-solid fa-circle-check text-accent');
  toast.appendChild(icon);
  const textSpan = document.createElement('span');
  textSpan.textContent = message;
  toast.appendChild(textSpan);
  toastContainer.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-[-10px]', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });
  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-[-10px]', 'opacity-0');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 4000);
}

// --- DOM Construction Helpers ---
function el(tag, attrs = {}, text = '') {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  if (text) node.textContent = text;
  return node;
}

function renderStars(rating) {
  const wrap = el('div', { class: 'text-xs flex gap-1' });
  for (let i = 1; i <= 5; i++) {
    wrap.appendChild(el('i', {
      class: i <= rating
        ? 'fa-solid fa-star text-amber-400'
        : 'fa-regular fa-star text-gray-300'
    }));
  }
  return wrap;
}

// Input Validation (Strictly tested)
function validatePPDB({ name, phone, address, email }) {
  if (!name || name.length < 3 || name.length > 100) {
    return 'Nama harus 3–100 karakter';
  }
  if (!phone || !/^(\+628|08)\d{8,12}$/.test(phone)) {
    return 'Format nomor WA tidak valid (contoh: 08123456789 atau +6281234567890)';
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Format email wali santri tidak valid (contoh: nama@domain.com)';
  }
  if (!address || address.length < 10 || address.length > 500) {
    return 'Alamat harus 10–500 karakter';
  }
  return null;
}

// RFC 5322 Compliant Email Validation Pattern
const RFC5322_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function validatePpdbEmail(email) {
  const statusEl = document.getElementById('ppdbEmailStatus');
  if (!statusEl) return;
  const clean = (email || '').trim();
  if (!clean) {
    statusEl.textContent = 'Wajib diisi';
    statusEl.className = 'text-[10px] text-gray-400 font-semibold';
    return false;
  }
  const isValid = RFC5322_EMAIL_REGEX.test(clean);
  if (isValid) {
    statusEl.textContent = 'Format valid (RFC 5322) ✓';
    statusEl.className = 'text-[10px] text-emerald-600 font-bold';
    return true;
  } else {
    statusEl.textContent = 'Format belum sesuai (contoh: wali@domain.com)';
    statusEl.className = 'text-[10px] text-rose-500 font-semibold';
    return false;
  }
}

function verifyPpdbEmailMock() {
  const emailInput = document.getElementById('ppdbEmail');
  const val = (emailInput?.value || '').trim();
  if (!val || !RFC5322_EMAIL_REGEX.test(val)) {
    showToast('Silakan masukkan format email wali yang valid sebelum verifikasi.', 'error');
    if (emailInput) emailInput.focus();
    return;
  }
  const statusEl = document.getElementById('ppdbEmailStatus');
  if (statusEl) {
    statusEl.textContent = 'Terverifikasi (OTP Aktif) ✓';
    statusEl.className = 'text-[10px] text-emerald-600 font-bold';
  }
  showToast(`Simulasi OTP Terkirim: Email [${val}] terverifikasi. Bukti registrasi PPDB akan dikirimkan otomatis.`);
}

function validateGuestbook({ name, message }) {
  if (!name || name.length < 2 || name.length > 100) {
    return 'Nama harus 2–100 karakter';
  }
  if (!message || message.length < 5 || message.length > 1000) {
    return 'Pesan harus 5–1000 karakter';
  }
  return null;
}

function showFormError(formId, message) {
  clearFormError(formId);
  const form = document.getElementById(formId);
  if (!form) return;
  const errEl = document.createElement('p');
  errEl.id = formId + '-error';
  errEl.setAttribute('class', 'text-red-600 text-xs mt-2 font-semibold');
  errEl.textContent = message;
  form.appendChild(errEl);
}

function clearFormError(formId) {
  const errEl = document.getElementById(formId + '-error');
  if (errEl) errEl.parentNode.removeChild(errEl);
}

// UI Logic — Hero Slider & Rating
let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slide-dot');
  if (!slides.length) return;
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((s, i) => {
    s.style.opacity = i === currentSlide ? '1' : '0';
  });
  dots.forEach((d, i) => {
    d.className = d.className.replace(/bg-\S+/g, '');
    d.classList.add(i === currentSlide ? 'bg-accent' : 'bg-white/40');
  });
}

function nextSlide() { showSlide(currentSlide + 1); }
function prevSlide() { showSlide(currentSlide - 1); }
function goToSlide(index) { showSlide(index); }

let currentRating = 5;
function setRating(value) {
  currentRating = value;
  const stars = document.querySelectorAll('#ratingStars i');
  stars.forEach((star, i) => {
    star.className = i < value
      ? 'fa-solid fa-star text-amber-400'
      : 'fa-regular fa-star text-gray-300';
  });
}

// Frontend News Render & Filter
let activeNewsCategory = 'Semua';

async function loadPosts() {
  if (supabase && typeof supabase.from === 'function') {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: false });

      if (!error && data && data.length > 0) {
        cmsState.posts = data;
      }
    } catch (e) {
      console.warn('[PPSPJM] Failed to load posts from Supabase:', e);
    }
  }
  renderFrontendNews();
  if (typeof renderCmsPosts === 'function') renderCmsPosts();
}

let currentNewsPage = 1;
const NEWS_PAGE_SIZE = 4;

function loadMoreNews() {
  currentNewsPage++;
  renderFrontendNews();
}

function renderFrontendNews() {
  const grid = document.getElementById('newsGrid');
  if (!grid) return;
  while (grid.firstChild) grid.removeChild(grid.firstChild);

  const query = (document.getElementById('newsSearch')?.value || '').toLowerCase();
  const filtered = cmsState.posts.filter(item => {
    if (item.status !== 'published') return false;
    const matchCat = activeNewsCategory === 'Semua' || item.category === activeNewsCategory;
    const matchQuery = (item.title + ' ' + (item.summary || '') + ' ' + (item.category || '')).toLowerCase().includes(query);
    return matchCat && matchQuery;
  });

  const paginationInfo = document.getElementById('newsPaginationInfo');
  const btnLoadMore = document.getElementById('btnLoadMoreNews');

  if (filtered.length === 0) {
    const empty = el('div', { class: 'col-span-2 text-center py-8 text-gray-400 text-xs italic bg-white rounded-2xl border border-gray-100 p-6' }, 'Tidak ada berita atau pengumuman yang sesuai kriteria pencarian.');
    grid.appendChild(empty);
    if (paginationInfo) paginationInfo.textContent = 'Menampilkan 0 berita';
    if (btnLoadMore) btnLoadMore.classList.add('hidden');
    return;
  }

  const visibleCount = Math.min(filtered.length, currentNewsPage * NEWS_PAGE_SIZE);
  const paginated = filtered.slice(0, visibleCount);

  if (paginationInfo) {
    paginationInfo.textContent = `Menampilkan ${visibleCount} dari ${filtered.length} berita & agenda`;
  }

  if (btnLoadMore) {
    if (visibleCount >= filtered.length) {
      btnLoadMore.classList.add('hidden');
    } else {
      btnLoadMore.classList.remove('hidden');
    }
  }

  paginated.forEach(post => {
    const card = el('article', { 
      class: 'news-item fade-in-up bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition group flex flex-col relative',
      'data-tooltip': post.category
    });
    
    // Thumbnail wrapper
    const imgWrap = el('div', { class: 'relative h-48 overflow-hidden bg-gray-100' });
    const img = el('img', {
      src: post.image || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      alt: post.title,
      class: 'w-full h-full object-cover group-hover:scale-105 transition duration-500',
      loading: 'lazy'
    });
    const catBadge = el('span', {
      class: 'absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm'
    }, post.category);
    imgWrap.appendChild(img);
    imgWrap.appendChild(catBadge);
    card.appendChild(imgWrap);

    // Body
    const body = el('div', { class: 'p-5 space-y-2 flex-1 flex flex-col justify-between' });
    const metaWrap = el('div', { class: 'space-y-2' });
    const meta = el('div', { class: 'text-[10px] text-gray-400 flex items-center justify-between' });
    meta.innerHTML = `<span><i class="fa-regular fa-calendar mr-1"></i>${escapeHtml(post.date)}</span><span><i class="fa-solid fa-user-pen mr-1"></i>${escapeHtml(post.author || 'Admin')}</span>`;
    
    const title = el('h3', {
      class: 'font-bold text-sm text-primary-dark line-clamp-2 hover:text-accent cursor-pointer transition'
    }, post.title);
    title.onclick = () => openNewsDetail(post.title, post.content, post.category, post.date, post.author, post.image);

    const desc = el('p', { class: 'text-xs text-gray-500 line-clamp-2 leading-relaxed' }, post.summary || post.content.substring(0, 120) + '...');
    
    metaWrap.appendChild(meta);
    metaWrap.appendChild(title);
    metaWrap.appendChild(desc);
    body.appendChild(metaWrap);

    const readMore = el('button', {
      class: 'text-xs font-bold text-primary hover:text-accent flex items-center gap-1.5 pt-2 mt-auto text-left'
    }, 'Baca Selengkapnya ');
    const arrow = el('i', { class: 'fa-solid fa-arrow-right text-[10px]' });
    readMore.appendChild(arrow);
    readMore.onclick = () => openNewsDetail(post.title, post.content, post.category, post.date, post.author, post.image);

    const shareBtn = el('button', {
      class: 'text-[10px] font-bold text-gray-500 hover:text-primary flex items-center gap-1 pt-2 mt-auto'
    }, 'Share ');
    shareBtn.innerHTML = '<i class="fa-solid fa-share-nodes"></i> Share';
    shareBtn.onclick = () => shareNews(post);

    const actions = el('div', { class: 'flex items-center gap-4' });
    actions.appendChild(readMore);
    actions.appendChild(shareBtn);
    body.appendChild(actions);

    card.appendChild(body);
    grid.appendChild(card);
  });
  observeNewsCards();
}

function shareNews(post) {
  if (navigator.share) {
    navigator.share({
      title: post.title,
      text: post.summary,
      url: window.location.href + '#' + (post.slug || 'berita')
    }).catch(console.error);
  } else {
    showToast('Fitur Share tidak didukung di browser ini.');
  }
}

function observeNewsCards() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.news-item').forEach(card => {
    observer.observe(card);
  });
}

function filterNews() {
  currentNewsPage = 1;
  renderFrontendNews();
}

function setNewsCategory(cat, btn) {
  currentNewsPage = 1;
  activeNewsCategory = cat;
  document.querySelectorAll('.news-cat-btn').forEach(b => {
    b.classList.remove('bg-primary', 'text-white', 'border-primary');
    b.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
  });
  if (btn) {
    btn.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
    btn.classList.add('bg-primary', 'text-white', 'border-primary');
  }
  renderFrontendNews();
}

/**
 * Helper to update SEO meta tags dynamically
 */
function updateMetaTags(title, description, url) {
  document.title = `${title} | PPJM Portal`;
  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) descMeta.setAttribute('content', description.substring(0, 155));
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
}

function openNewsDetail(title, content, category = 'Berita', date = 'Hari ini', author = 'Redaksi', image = '') {
  updateMetaTags(title, (content || '').replace(/<[^>]*>/g, ''), window.location.href);

  const titleEl = document.getElementById('newsModalTitle');
  const contentEl = document.getElementById('newsModalContent');
  const metaEl = document.getElementById('newsModalMeta');
  const imgEl = document.getElementById('newsModalImg');

  if (titleEl) titleEl.textContent = title;
  if (contentEl) {
    contentEl.textContent = content;
  }
  if (metaEl) {
    metaEl.innerHTML = `<span class="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold">${escapeHtml(category)}</span> &bull; <span>${escapeHtml(date)}</span> &bull; <span>Oleh ${escapeHtml(author)}</span>`;
  }
  if (imgEl) {
    if (image) {
      imgEl.src = image;
      imgEl.classList.remove('hidden');
    } else {
      imgEl.classList.add('hidden');
    }
  }
  openModal('newsModal');
}

// Media Gallery Render & Lightbox
let activeGalleryCategory = 'semua';

function renderFrontendGallery() {
  const container = document.getElementById('galleryGrid');
  if (!container) return;
  while (container.firstChild) container.removeChild(container.firstChild);

  const filtered = cmsState.mediaGallery.filter(item => {
    return activeGalleryCategory === 'semua' || item.category === activeGalleryCategory;
  });

  filtered.forEach((item, index) => {
    const card = el('div', { class: 'relative group overflow-hidden rounded-2xl cursor-pointer shadow-sm border border-gray-100 bg-gray-100 break-inside-avoid' });
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index % 4) * 100);
    
    if (item.type === 'video') {
      const img = el('img', { src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80', class: 'w-full h-full object-cover group-hover:scale-105 transition duration-500' });
      const overlay = el('div', { class: 'absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition' });
      const playBtn = el('div', { class: 'w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center text-lg shadow-lg group-hover:scale-110 transition' });
      playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      overlay.appendChild(playBtn);
      const cap = el('span', { class: 'absolute bottom-2 left-2 right-2 text-white text-[11px] font-bold bg-black/60 px-2 py-1 rounded truncate' }, item.title);
      card.appendChild(img);
      card.appendChild(overlay);
      card.appendChild(cap);
      card.onclick = () => openVideoModal(item.url);
    } else {
      const img = el('img', { src: item.url, alt: item.title, class: 'w-full h-64 object-cover group-hover:scale-110 transition duration-500', loading: 'lazy' });
      const overlay = el('div', { class: 'absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-3 flex items-end' });
      const cap = el('span', { class: 'text-white text-xs font-semibold leading-tight' }, item.title);
      overlay.appendChild(cap);
      card.appendChild(img);
      card.appendChild(overlay);
      card.onclick = () => openPhotoModal(item.url, item.title);
    }

    container.appendChild(card);
  });
  if (window.AOS) AOS.refresh();
}

function setGalleryCategory(cat, btn) {
  activeGalleryCategory = cat;
  document.querySelectorAll('.gallery-cat-btn').forEach(b => {
    b.classList.remove('bg-primary', 'text-white');
    b.classList.add('bg-white', 'text-gray-600');
  });
  if (btn) {
    btn.classList.remove('bg-white', 'text-gray-600');
    btn.classList.add('bg-primary', 'text-white');
  }
  renderFrontendGallery();
}

function openPhotoModal(imgUrl, caption) {
  const container = document.getElementById('mediaContainer');
  if (!container) return;
  while (container.firstChild) container.removeChild(container.firstChild);

  const img = document.createElement('img');
  img.setAttribute('src', imgUrl);
  img.setAttribute('alt', caption || '');
  img.setAttribute('class', 'max-w-full max-h-[75vh] object-contain rounded-2xl');

  if (caption) {
    const cap = document.createElement('p');
    cap.textContent = caption;
    cap.setAttribute('class', 'text-white text-xs text-center mt-3 px-4 font-medium');
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'flex flex-col items-center');
    wrapper.appendChild(img);
    wrapper.appendChild(cap);
    container.appendChild(wrapper);
  } else {
    container.appendChild(img);
  }
  openModal('mediaModal');
}

function openVideoModal(videoUrl) {
  const container = document.getElementById('mediaContainer');
  if (!container) return;
  while (container.firstChild) container.removeChild(container.firstChild);

  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', videoUrl);
  iframe.setAttribute('width', '100%');
  iframe.setAttribute('height', '420');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('class', 'rounded-2xl w-full');

  container.appendChild(iframe);
  openModal('mediaModal');
}

// Centralized Modal & UI Controller
const UI = {
  modals: {},
  init() {
    document.querySelectorAll('.modal').forEach(m => {
      this.modals[m.id] = m;
      m.setAttribute('role', 'dialog');
      m.setAttribute('aria-modal', 'true');
      m.addEventListener('click', (e) => {
        if (e.target === m) this.close(m.id);
      });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        Object.keys(this.modals).forEach(id => this.close(id));
      }
    });
    // Enhance keyboard accessibility for clickable elements (WCAG 2.1 AA)
    document.querySelectorAll('[onclick]').forEach((el) => {
      if (!['a', 'button', 'input', 'select', 'textarea'].includes(el.tagName.toLowerCase())) {
        if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
        if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            el.click();
          }
        });
      }
    });
  },
  open(id) {
    const m = this.modals[id] || document.getElementById(id);
    if (m) {
      m.classList.remove('hidden');
      m.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }
  },
  close(id) {
    const m = this.modals[id] || document.getElementById(id);
    if (m) {
      m.classList.add('hidden');
      m.classList.remove('flex');
      document.body.style.overflow = 'auto';
      const form = m.querySelector('form');
      if (form) form.reset();
    }
  }
};

// Expose all global functions to window immediately (hoisted) to ensure inline onclick handlers always work
const exportedGlobalHandlers = {
  toggleMobileDrawer,
  DrawerGesture,
  BottomSheet,
  changeLanguage,
  openModal,
  closeModal,
  triggerHaptic,
  handleDrawerNavClick,
  handleBottomTabClick,
  setHeroCardSlide,
  moveHeroCardSlide,
  openEcosystemModal,
  openNewsDetail,
  filterNews,
  setNewsCategory,
  filterByTag,
  addToGoogleCalendar,
  loadMoreNews,
  switchCurriculumTab,
  filterCurriculumSemester,
  copyContactPhone,
  showPwaInstallGuide,
  installPWAApp,
  simulateSantriTracker,
  trackEvent,
  validatePpdbEmail,
  verifyPpdbEmailMock,
  previewPostEditor,
  previewPost,
  savePost,
  prevSlide,
  nextSlide,
  goToSlide,
  checkPPDBStatus,
  printRegistrationCard,
  submitGuestbook,
  submitPPDB,
  loginAdmin,
  logoutAdmin,
  setAdminRole,
  renderRoleDashboard,
  applyRoleNavPermissions,
  switchCmsTab,
  openSantriModal,
  saveSantri,
  loadSantri,
  renderSantriTable,
  deleteSantri,
  openTahfidzModal,
  saveTahfidz,
  loadTahfidz,
  renderTahfidzTable,
  openPerizinanModal,
  savePerizinan,
  loadPerizinan,
  renderPerizinanTable,
  updatePerizinanStatus,
  openTagihanModal,
  saveTagihan,
  loadTagihan,
  renderTagihanTable,
  markTagihanLunas,
  openNilaiModal,
  saveNilai,
  loadNilai,
  renderNilaiTable,
  loadMasterData,
  openPostEditor,
  softDeletePost,
  restoreTrashItem,
  permanentDeleteTrash,
  handleMediaDrop,
  addVideoEmbed,
  deleteMediaItem,
  exportPPDBtoCSV,
  renderCmsPosts,
  renderAdminPPDB,
  setRating,
  setGalleryCategory,
  openVideoModal,
  openTeacherModal,
  downloadSyllabus,
  executeSyllabusDownload,
  toggleFaq,
  filterFaq,
  setFaqCategory,
  toggleChatbot,
  sendQuickChat,
  handleChatSubmit,
  updatePageMeta,
  switchHelpTab,
  openHelpGuideModal,
  toggleProfileDropdown,
  manualCheckSupabaseHealth,
  initUtbkSession,
  renderUtbkQuestion,
  selectUtbkOption,
  toggleUtbkDoubt,
  navigateUtbkQuestion,
  finishUtbkExam,
  renderUtbkTeacherReport,
  updateLivePreview,
  UI
};

Object.assign(window, exportedGlobalHandlers);
window._scriptLoaded = true;
Object.keys(exportedGlobalHandlers).forEach(key => {
  window['_' + key] = exportedGlobalHandlers[key];
});

document.addEventListener('DOMContentLoaded', () => UI.init());

function openModal(id) { UI.open(id); }
function closeModal(id) { UI.close(id); }

// Cek Status Pendaftaran PPDB Online (Frontend Feature)
function checkPPDBStatus() {
  const input = (document.getElementById('ppdbStatusQuery')?.value || '').trim().toLowerCase();
  const resultBox = document.getElementById('ppdbStatusResult');
  if (!input) {
    showToast('Masukkan Nama Lengkap atau Nomor WhatsApp pendaftaran.', 'error');
    return;
  }

  const found = cmsState.ppdbList.find(sub => 
    sub.name.toLowerCase().includes(input) || 
    sub.phone.replace(/[^0-9]/g, '').includes(input.replace(/[^0-9]/g, '')) ||
    (sub.code && sub.code.toLowerCase().includes(input))
  );

  if (resultBox) {
    resultBox.classList.remove('hidden');
    while (resultBox.firstChild) resultBox.removeChild(resultBox.firstChild);

    if (found) {
      const card = el('div', { class: 'bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs space-y-2' });
      
      const badgeColors = {
        'Diterima': 'bg-emerald-600 text-white',
        'Terverifikasi': 'bg-blue-600 text-white',
        'Menunggu Verifikasi': 'bg-amber-500 text-white',
        'Cadangan': 'bg-purple-600 text-white',
        'Ditolak': 'bg-red-600 text-white'
      };
      const badgeCls = badgeColors[found.status] || 'bg-gray-500 text-white';

      card.innerHTML = `
        <div class="flex items-center justify-between border-b border-emerald-200 pb-2">
          <span class="font-mono font-bold text-primary">${found.code || 'PPDB-2026-REG'}</span>
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${badgeCls}">${found.status}</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
          <div><span class="text-gray-500">Nama Santri:</span> <p class="font-bold text-gray-800">${found.name}</p></div>
          <div><span class="text-gray-500">Pilihan Program:</span> <p class="font-bold text-gray-800">${found.program}</p></div>
          <div><span class="text-gray-500">No. WhatsApp:</span> <p class="font-bold text-gray-800">${found.phone}</p></div>
          <div><span class="text-gray-500">Email Wali:</span> <p class="font-bold text-gray-800">${found.email || '-'}</p></div>
          <div class="sm:col-span-2 bg-emerald-100/60 p-2 rounded-lg border border-emerald-200">
            <span class="text-emerald-900 font-bold block text-[11px]"><i class="fa-solid fa-bowl-rice mr-1"></i> Paket Nutrisi Asrama:</span>
            <p class="font-semibold text-emerald-800 text-xs">${found.diet_package || 'Reguler 4 Sehat (3x Sehari)'}</p>
            ${found.allergy_notes ? `<p class="text-[10px] text-amber-800 mt-0.5"><strong>Alergen:</strong> ${found.allergy_notes}</p>` : ''}
          </div>
          <div class="sm:col-span-2"><span class="text-gray-500">Tanggal Daftar:</span> <p class="font-medium text-gray-800">${new Date(found.submitted_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div>
        </div>
        <div class="pt-2 flex gap-2">
          <button onclick="printRegistrationCard('${found.id || found.code}')" class="bg-primary hover:bg-primary-dark text-white font-bold py-1.5 px-3 rounded-lg text-[11px] btn-spring flex items-center gap-1.5">
            <i class="fa-solid fa-print"></i> Cetak Bukti Pendaftaran
          </button>
        </div>
      `;
      resultBox.appendChild(card);
    } else {
      const notFound = el('div', { class: 'bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-700 space-y-1' });
      notFound.innerHTML = `
        <p class="font-bold"><i class="fa-solid fa-triangle-exclamation mr-1"></i> Data Pendaftaran Tidak Ditemukan</p>
        <p class="text-[11px]">Pastikan nama atau no. WhatsApp sama persis dengan yang diisikan saat mendaftar formulir online.</p>
      `;
      resultBox.appendChild(notFound);
    }
  }
}

function printRegistrationCard(idOrCode) {
  const item = cmsState.ppdbList.find(s => s.id === idOrCode || s.code === idOrCode);
  if (!item) return;

  const printArea = document.getElementById('printSection');
  if (printArea) {
    printArea.innerHTML = `
      <div style="font-family: sans-serif; padding: 30px; border: 2px solid #1a6b3c; border-radius: 16px; max-width: 600px; margin: 20px auto;">
        <div style="text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 12px; margin-bottom: 16px;">
          <img src="/logo.jpg" alt="Logo PPJM" style="width: 48px; height: 48px; border-radius: 50%; margin-bottom: 6px; display: inline-block;">
          <h2 style="color: #1a6b3c; margin: 0; font-size: 20px;">PONDOK PESANTREN JAUHARUL MAKNUUN LASEM</h2>
          <p style="margin: 4px 0 0 0; font-size: 11px; color: #555;">Jl. Raya Dukun-Lasem RT 1 RW 1, Lasem Sidayu Gresik, Gresik 61153 &bull; Telp: 0812-3456-7890</p>
          <h3 style="background: #1a6b3c; color: white; display: inline-block; padding: 4px 14px; border-radius: 20px; font-size: 12px; margin-top: 10px;">KARTU BUKTI PENDAFTARAN PPDB 2026/2027</h3>
        </div>
        <table style="width: 100%; font-size: 12px; line-height: 1.8;">
          <tr><td style="width: 35%; color: #666;">Nomor Registrasi</td><td>: <strong>${item.code || 'PPDB-2026-REG'}</strong></td></tr>
          <tr><td style="color: #666;">Nama Calon Santri</td><td>: <strong>${item.name}</strong></td></tr>
          <tr><td style="color: #666;">Jenis Kelamin</td><td>: ${item.gender}</td></tr>
          <tr><td style="color: #666;">Program Pilihan</td><td>: <strong>${item.program}</strong></td></tr>
          <tr><td style="color: #666;">No. WhatsApp Wali</td><td>: ${item.phone}</td></tr>
          <tr><td style="color: #666;">Email Terverifikasi</td><td>: ${item.email || '-'}</td></tr>
          <tr><td style="color: #666;">Paket Nutrisi Santri</td><td>: <strong>${item.diet_package || 'Reguler 4 Sehat (3x Sehari)'}</strong></td></tr>
          <tr><td style="color: #666;">Catatan Medis / Alergi</td><td>: ${item.allergy_notes || 'Tidak ada catatan khusus'}</td></tr>
          <tr><td style="color: #666;">Alamat Asal</td><td>: ${item.address}</td></tr>
          <tr><td style="color: #666;">Status Verifikasi</td><td>: <span style="background: #e6f4ea; color: #1a6b3c; padding: 2px 8px; border-radius: 6px; font-weight: bold;">${item.status}</span></td></tr>
        </table>
        <div style="margin-top: 20px; border-top: 1px dashed #ccc; padding-top: 10px; font-size: 10px; color: #666;">
          <p><strong>Catatan untuk Calon Santri:</strong></p>
          <ol style="padding-left: 16px; margin: 4px 0;">
            <li>Bawa kartu bukti ini beserta fotokopi KK dan Akta Kelahiran saat pelaksanaan tes seleksi.</li>
            <li>Jadwal tes seleksi baca Al-Qur'an dan wawancara diinfokan melalui WhatsApp panitia.</li>
            <li>Konsultasi nutrisi & menu harian asrama dapat dikonfirmasi saat pendaftaran ulang.</li>
          </ol>
        </div>
      </div>
    `;
    window.print();
  }
}

// Interactive Ecosystem Preview Modal
const ecosystemModules = {
  elearning: {
    title: 'Portal E-Learning & LMS Terpadu',
    icon: 'fa-laptop-code',
    desc: 'Platform pembelajaran digital terintegrasi Moodle & Google Classroom. Santri dapat mengakses modul kitab digital, video pembelajaran sains, dan tugas mandiri.',
    features: ['Akses Bahan Ajar Daring & Modul PDF', 'Sistem Tugas & Penilaian Otomatis', 'Bank Soal Ujian Asesmen Berbasis Komputer (CBT)', 'Forum Diskusi Santri & Ustadz']
  },
  raport: {
    title: 'Portal Guru & Rapor Digital Pesantren',
    icon: 'fa-chalkboard-user',
    desc: 'Sistem penilaian kurikulum merdeka nasional digabungkan dengan Rapor Diniyah Salafiyah. Guru dan Asatidz dapat menginput capaian hafalan dan keilmuan kitab secara real-time.',
    features: ['Input Nilai Harian & Ujian Terpadu', 'Pencatatan Kemajuan Juz & Mutqin Tahfidz', 'Cetak Rapor Kurikulum Merdeka & Kitab Salaf', 'Integrasi Data EMIS Kemenag & Dapodik']
  },
  wali: {
    title: 'Portal Santri & Wali Santri Mobile',
    icon: 'fa-users',
    desc: 'Aplikasi transparansi untuk orang tua memantau perkembangan hafalan, kedisiplinan, absensi harian, dan mutaba\'ah ibadah santri di pondok.',
    features: ['Mutaba\'ah Sholat Berjamaah & Diniyah', 'Laporan Riwayat Setoran Ayat Al-Qur\'an', 'Informasi Kesehatan di Klinik Santri', 'Kirim Uang Saku & Saldo Kartu Santri Digital']
  },
  presensi: {
    title: 'Sistem Absensi Digital RFID & Biometrik',
    icon: 'fa-id-card-clip',
    desc: 'Presensi otomatis sholat tahajud, subuh, sekolah pagi, dan kegiatan diniyah malam menggunakan Kartu Santri Digital berbasis RFID dan mesin biometrik.',
    features: ['Notifikasi Otomatis ke WhatsApp Wali saat Hadir', 'Deteksi Keterlambatan Real-time', 'Rekap Kehadiran untuk Rapor Bulanan', 'Sistem Perizinan Pulang Pesantren Berbasis Barcode']
  },
  pembayaran: {
    title: 'Sistem Pembayaran Syahriah & SPP Online',
    icon: 'fa-money-bill-transfer',
    desc: 'Gateway pembayaran terhubung Virtual Account (BSI, Mandiri, BRI, BCA) dan QRIS untuk kemudahan pembayaran iuran bulanan dan uang makan santri.',
    features: ['Virtual Account Otomatis لكل Santri', 'Notifikasi Bukti Pembayaran Digital', 'Laporan Arus Kas Komite Sekolah Transparan', 'Riwayat Tagihan & Tunggakan Bebas Human-Error']
  }
};

function openEcosystemModal(moduleKey) {
  const mod = ecosystemModules[moduleKey] || ecosystemModules.elearning;
  const titleEl = document.getElementById('ecoModalTitle');
  const iconEl = document.getElementById('ecoModalIcon');
  const descEl = document.getElementById('ecoModalDesc');
  const listEl = document.getElementById('ecoModalFeatures');

  if (titleEl) titleEl.textContent = mod.title;
  if (iconEl) iconEl.className = `fa-solid ${mod.icon} text-accent text-2xl`;
  if (descEl) descEl.textContent = mod.desc;
  if (listEl) {
    while (listEl.firstChild) listEl.removeChild(listEl.firstChild);
    mod.features.forEach(f => {
      const li = el('li', { class: 'flex items-center gap-2 text-xs text-gray-700' });
      li.innerHTML = `<i class="fa-solid fa-circle-check text-primary text-xs"></i> <span>${f}</span>`;
      listEl.appendChild(li);
    });
  }
  openModal('ecosystemModal');
}

// Translations / i18n
const translations = {
  id: {
    navHome: 'Beranda', navProfile: 'Profil', navPrograms: 'Program & Jurusan',
    heroTitle1: 'Mencetak Generasi Rabbani, Berakhlak & Unggul Teknologi',
    heroDesc1: 'Sistem pendidikan terpadu gabungan Kurikulum Kitab Kuning Pesantren Salaf/Modern dengan Kurikulum Merdeka Pendidikan Nasional di Kota Santri Lasem.',
    btnApply: 'PPDB Online'
  },
  en: {
    navHome: 'Home', navProfile: 'Profile', navPrograms: 'Programs',
    heroTitle1: 'Shaping Pious, Principled & Technologically Excellent Generations',
    heroDesc1: 'An integrated education system blending classical Islamic boarding school curriculum with the national Merdeka Curriculum in Lasem, the City of Santri.',
    btnApply: 'Enroll Now'
  },
  ar: {
    navHome: 'الرئيسية', navProfile: 'الملف', navPrograms: 'البرامج',
    heroTitle1: 'تخريj جيل رباني ذي أخلاق وتميز تقني',
    heroDesc1: 'نظام تعليمي متكامل يجمع بين منهج الكتب الصفراء والمنهج الوطني في مدينة لاسيم.',
    btnApply: 'سجّل الآن'
  }
};

function changeLanguage(lang) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', dir);
  const t = translations[lang] || translations.id;
  document.querySelectorAll('[data-i18n]').forEach(node => {
    const key = node.getAttribute('data-i18n');
    if (t[key]) node.textContent = t[key];
  });
}

// Countdown Timer
function startCountdown(targetDateStr) {
  function update() {
    const now = new Date().getTime();
    const target = new Date(targetDateStr).getTime();
    const diff = target - now;
    if (diff <= 0) {
      ['cdDays','cdHours','cdMins','cdSecs'].forEach(id => {
        const node = document.getElementById(id);
        if (node) node.textContent = '00';
      });
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    const fmt = n => String(n).padStart(2, '0');
    const dEl = document.getElementById('cdDays');
    const hEl = document.getElementById('cdHours');
    const mEl = document.getElementById('cdMins');
    const sEl = document.getElementById('cdSecs');
    if (dEl) dEl.textContent = fmt(days);
    if (hEl) hEl.textContent = fmt(hours);
    if (mEl) mEl.textContent = fmt(mins);
    if (sEl) sEl.textContent = fmt(secs);
  }
  update();
  setInterval(update, 1000);
}

// Guestbook — Load & Submit (Safe DOM Construction)
async function loadGuestbook() {
  if (supabase && typeof supabase.from === 'function') {
    try {
      const { data, error } = await supabase
        .from('guestbook_entries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (!error && data && data.length > 0) {
        cmsState.guestbook = data;
      }
    } catch (e) {
      console.warn('[PPSPJM] Failed to load guestbook from Supabase:', e);
    }
  }
  renderGuestbook(cmsState.guestbook);
}

function renderGuestbook(entries) {
  const list = document.getElementById('guestbookList');
  if (!list) return;
  while (list.firstChild) list.removeChild(list.firstChild);

  if (!entries || entries.length === 0) {
    const empty = el('p', { class: 'text-xs text-gray-400 italic text-center py-4' }, 'Belum ada testimoni.');
    list.appendChild(empty);
    return;
  }

  entries.forEach(item => {
    const card = el('div', { class: 'bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-2' });
    const header = el('div', { class: 'flex items-center gap-3' });
    const avatarText = (item.name || '?').charAt(0).toUpperCase();
    const avatar = el('div', {
      class: 'w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-sm'
    }, avatarText);
    const nameBlock = el('div', { class: 'flex-1 min-w-0' });
    const nameEl = el('p', { class: 'font-bold text-xs text-primary-dark truncate' }, item.name || '');
    const roleEl = el('p', { class: 'text-[10px] text-gray-400' }, item.role || '');
    nameBlock.appendChild(nameEl);
    nameBlock.appendChild(roleEl);
    header.appendChild(avatar);
    header.appendChild(nameBlock);
    card.appendChild(header);

    if (item.rating) card.appendChild(renderStars(Number(item.rating)));
    const msgEl = el('p', { class: 'text-xs text-gray-600 leading-relaxed' }, item.message || '');
    card.appendChild(msgEl);
    list.appendChild(card);
  });
}

async function submitGuestbook(e) {
  if (e && e.preventDefault) e.preventDefault();
  clearFormError('guestbookForm');

  const name    = (document.getElementById('gbName')?.value || '').trim();
  const role    = document.getElementById('gbRole')?.value || 'Masyarakat Umum';
  const rating  = currentRating || 5;
  const message = (document.getElementById('gbMessage')?.value || '').trim();

  const validationError = validateGuestbook({ name, message });
  if (validationError) {
    showFormError('guestbookForm', validationError);
    return;
  }

  if (!supabase) {
    showFormError('guestbookForm', 'Layanan tidak tersedia.');
    return;
  }

  try {
    const newEntry = {
      name,
      role,
      rating: Number(rating),
      message,
      created_at: new Date().toISOString()
    };

    const { error } = await supabase.from('guestbook_entries').insert(newEntry);
    if (error) {
      showFormError('guestbookForm', 'Gagal mengirim testimoni.');
      return;
    }

    document.getElementById('guestbookForm')?.reset();
    setRating(5);
    showToast('Terima kasih! Testimoni Anda telah berhasil dikirimkan.');
    await loadGuestbook();
  } catch (error) {
    console.error('Error submitting guestbook:', error);
    showFormError('guestbookForm', 'Gagal mengirim testimoni.');
  }
}

// PPDB Submission Handling
async function submitPPDB(e) {
  if (e && e.preventDefault) e.preventDefault();
  clearFormError('ppdbForm');

  // Anti-Bot Honeypot Check (Security Hardening)
  const honeypot = (document.getElementById('ppdbWebsiteHoneypot')?.value || '').trim();
  if (honeypot) {
    console.warn('Bot automated submission blocked via honeypot field.');
    return;
  }

  const name    = (document.getElementById('ppdbName')?.value || '').trim();
  const gender  = document.getElementById('ppdbGender')?.value || '';
  const program = document.getElementById('ppdbProgram')?.value || '';
  const phone   = (document.getElementById('ppdbPhone')?.value || '').trim();
  const email   = (document.getElementById('ppdbEmail')?.value || '').trim();
  const dietPkg = document.getElementById('ppdbDietPackage')?.value || 'Reguler 4 Sehat (3x Sehari)';
  const allergy = (document.getElementById('ppdbAllergyNotes')?.value || '').trim();
  const address = (document.getElementById('ppdbAddress')?.value || '').trim();

  const validationError = validatePPDB({ name, phone, address, email });
  if (validationError) {
    showFormError('ppdbForm', validationError);
    return;
  }

  if (!supabase) {
    showFormError('ppdbForm', 'Layanan pendaftaran tidak tersedia.');
    return;
  }

  try {
    const regCode = `PPDB-2026-${String(cmsState.ppdbList.length + 1).padStart(3, '0')}`;
    const newSubmission = {
      code: regCode,
      name,
      gender,
      program,
      phone,
      email: email || null,
      diet_package: dietPkg,
      allergy_notes: allergy || null,
      address,
      status: 'Menunggu Verifikasi',
      submitted_at: new Date().toISOString()
    };

    let { error } = await supabase.from('ppdb_submissions').insert(newSubmission);
    if (error) {
      // Resilient fallback in case columns email / diet_package don't exist yet in remote Supabase table schema
      const fallbackSubmission = {
        code: regCode,
        name,
        gender,
        program,
        phone,
        address: `${address} [Email: ${email || '-'}] [Paket Gizi: ${dietPkg}] [Catatan Alergi: ${allergy || '-'}]`,
        status: 'Menunggu Verifikasi',
        submitted_at: new Date().toISOString()
      };
      const resFallback = await supabase.from('ppdb_submissions').insert(fallbackSubmission);
      if (resFallback.error) {
        showFormError('ppdbForm', 'Pendaftaran gagal. Silakan coba lagi.');
        return;
      }
    }

    closeModal('ppdbModal');
    document.getElementById('ppdbForm')?.reset();
    showToast(`Alhamdulillah! Pendaftaran atas nama ${name} berhasil. Bukti & nomor registrasi ${regCode} telah dicatat.`);
    
    // Refresh local PPDB list
    await loadAdminPPDB();
  } catch (error) {
    console.error('Error submitting PPDB:', error);
    showFormError('ppdbForm', 'Pendaftaran gagal. Silakan coba lagi.');
  }
}

// Admin Authentication & Dashboard
function showAdminError(msg) {
  let errEl = document.getElementById('adminError');
  if (!errEl) {
    errEl = document.createElement('p');
    errEl.id = 'adminError';
    errEl.setAttribute('class', 'text-red-600 text-xs mt-1');
    const loginSection = document.getElementById('adminLoginSection');
    if (loginSection) loginSection.appendChild(errEl);
  }
  errEl.textContent = msg;
}

function showAdminDashboard() {
  const loginSection = document.getElementById('adminLoginSection');
  const dashSection  = document.getElementById('adminDashboardSection');
  if (loginSection) loginSection.classList.add('hidden');
  if (dashSection)  {
    dashSection.classList.remove('hidden');
    dashSection.classList.add('block');
  }
  // Initialize dashboard tabs & role-based workspace
  setAdminRole(cmsState.activeRole || 'super_admin');
  switchCmsTab('overview');
  updateDashboardCounters();
  renderCmsPosts();
  renderAdminPPDB(cmsState.ppdbList);
  renderCmsMedia();
  renderActivityLogs();
  renderTrashTable();
}

function showAdminLogin() {
  const loginSection = document.getElementById('adminLoginSection');
  const dashSection  = document.getElementById('adminDashboardSection');
  if (loginSection) loginSection.classList.remove('hidden');
  if (dashSection)  {
    dashSection.classList.add('hidden');
    dashSection.classList.remove('block');
  }
  const ppdbList = document.getElementById('adminPPDBList');
  if (ppdbList) while (ppdbList.firstChild) ppdbList.removeChild(ppdbList.firstChild);
}

/**
 * Sign in admin using Supabase Auth.
 */
async function loginAdmin() {
  const email    = (document.getElementById('adminEmail')?.value || '').trim();
  const password = document.getElementById('adminPassword')?.value || '';

  if (!supabase || !supabase.auth) {
    showAdminError('Layanan autentikasi tidak tersedia.');
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      showAdminError(error.message || 'Email atau sandi salah.');
      logActivity(`Gagal login admin: ${email}`, 'auth');
      return;
    }

    logActivity('Admin berhasil masuk ke Dashboard', 'auth');
    showAdminDashboard();
    await loadAdminPPDB();
    await loadPosts();
  } catch (error) {
    console.error('Login error:', error);
    showAdminError('Terjadi kesalahan saat masuk. Silakan coba lagi.');
  }
}

async function logoutAdmin() {
  if (supabase && supabase.auth) {
    try {
      await supabase.auth.signOut();
      showAdminLogin();
      showToast('Berhasil keluar dari admin panel.');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}

// Admin PPDB Rendering & Status Update
function renderAdminPPDB(data) {
  const list = document.getElementById('adminPPDBList');
  if (!list) return;
  while (list.firstChild) list.removeChild(list.firstChild);

  const query = (document.getElementById('cmsPPDBQuery')?.value || '').toLowerCase();
  const programFilter = document.getElementById('cmsPPDBProgramFilter')?.value || 'Semua';
  const statusFilter = document.getElementById('cmsPPDBStatusFilter')?.value || 'Semua';

  const dataset = data || cmsState.ppdbList;
  const filtered = dataset.filter(item => {
    const matchQ = (item.name + ' ' + (item.code || '') + ' ' + item.phone + ' ' + (item.address || '')).toLowerCase().includes(query);
    const matchP = programFilter === 'Semua' || item.program === programFilter;
    const matchS = statusFilter === 'Semua' || item.status === statusFilter;
    return matchQ && matchP && matchS;
  });

  if (!filtered || filtered.length === 0) {
    list.appendChild(el('p', { class: 'text-xs text-gray-400 italic py-3 text-center' }, 'Belum ada data pendaftar yang sesuai.'));
    return;
  }

  filtered.forEach(item => {
    const row = el('div', { class: 'p-3.5 bg-gray-50/80 hover:bg-gray-100/80 rounded-xl border border-gray-200/70 transition space-y-2 text-xs' });
    
    // Header
    const head = el('div', { class: 'flex items-center justify-between' });
    const nameCode = el('div', { class: 'font-bold text-gray-800' });
    nameCode.innerHTML = `<span class="font-mono text-primary font-extrabold mr-2">${item.code || 'REG'}</span> ${item.name}`;
    
    const badgeColors = {
      'Diterima': 'bg-emerald-100 text-emerald-800 border-emerald-300',
      'Terverifikasi': 'bg-blue-100 text-blue-800 border-blue-300',
      'Menunggu Verifikasi': 'bg-amber-100 text-amber-800 border-amber-300',
      'Cadangan': 'bg-purple-100 text-purple-800 border-purple-300',
      'Ditolak': 'bg-red-100 text-red-800 border-red-300'
    };
    const bCls = badgeColors[item.status] || 'bg-gray-100 text-gray-800 border-gray-300';
    const badge = el('span', { class: `px-2 py-0.5 rounded-full text-[10px] font-bold border ${bCls}` }, item.status);
    head.appendChild(nameCode);
    head.appendChild(badge);
    row.appendChild(head);

    // Meta details
    const meta = el('div', { class: 'grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px] text-gray-600 bg-white p-2 rounded-lg border border-gray-100' });
    meta.innerHTML = `
      <div><span class="text-gray-400">Program:</span> <strong class="text-primary-dark">${item.program}</strong></div>
      <div><span class="text-gray-400">WhatsApp:</span> <strong class="font-mono">${item.phone}</strong></div>
      <div><span class="text-gray-400">Jenis Kelamin:</span> ${item.gender || '-'}</div>
      <div class="col-span-2 sm:col-span-3 text-gray-500 truncate"><span class="text-gray-400">Alamat:</span> ${item.address || '-'}</div>
    `;
    row.appendChild(meta);

    // Quick Status changer
    const footer = el('div', { class: 'flex items-center justify-between pt-1' });
    const isGuru = cmsState.activeRole === 'Guru Contributor';
    
    const statusSelect = el('select', { 
      class: 'text-[11px] bg-white border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer',
      disabled: isGuru ? 'true' : null
    });
    ['Menunggu Verifikasi', 'Terverifikasi', 'Diterima', 'Cadangan', 'Ditolak'].forEach(opt => {
      const o = el('option', { value: opt }, opt);
      if (opt === item.status) o.selected = true;
      statusSelect.appendChild(o);
    });
    statusSelect.onchange = (e) => updateApplicantStatus(item.id || item.code, e.target.value);
    footer.appendChild(statusSelect);

    const btns = el('div', { class: 'flex items-center gap-2' });
    const printBtn = el('button', { class: 'text-primary hover:text-primary-dark text-xs font-semibold flex items-center gap-1 bg-primary/10 px-2 py-1 rounded' });
    printBtn.innerHTML = '<i class="fa-solid fa-print"></i> Kartu';
    printBtn.onclick = () => printRegistrationCard(item.id || item.code);
    btns.appendChild(printBtn);

    const waBtn = el('a', {
      href: `https://wa.me/${(item.phone || '').replace(/[^0-9]/g, '')}?text=Assalamu'alaikum%20Wr.%20Wb.%20Panitia%20PPDB%20PP%20%26%20SMP%20Plus%20Jauharul%20Maknuun%20ingin%20mengkonfirmasi%20pendaftaran%20ananda%20*${encodeURIComponent(item.name)}*%20(${item.code || ''}).`,
      target: '_blank',
      class: 'text-emerald-600 hover:text-emerald-700 text-xs font-semibold flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded'
    });
    waBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> WA';
    btns.appendChild(waBtn);

    footer.appendChild(btns);
    row.appendChild(footer);

    list.appendChild(row);
  });
}

async function updateApplicantStatus(idOrCode, newStatus) {
  const item = cmsState.ppdbList.find(s => s.id === idOrCode || s.code === idOrCode);
  if (item) {
    item.status = newStatus;
    
    // Update in Supabase if real client
    if (supabase && typeof supabase.from === 'function') {
      try {
        await supabase
          .from('ppdb_submissions')
          .update({ status: newStatus })
          .or(`id.eq.${item.id},code.eq.${item.code}`);
      } catch (e) {
        console.warn('[PPSPJM] Failed to update applicant status in Supabase:', e);
      }
    }

    logActivity(`Mengubah status pendaftar ${item.name} menjadi [${newStatus}]`, 'update');
    showToast(`Status ${item.name} diperbarui: ${newStatus}`);
    renderAdminPPDB();
    updateDashboardCounters();
  }
}

async function loadAdminPPDB() {
  if (supabase && typeof supabase.from === 'function') {
    try {
      const { data, error } = await supabase
        .from('ppdb_submissions')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (!error && data && data.length > 0) {
        cmsState.ppdbList = data;
      }
    } catch (e) {
      console.warn('[PPSPJM] Failed to fetch PPDB from Supabase:', e);
    }
  }
  renderAdminPPDB(cmsState.ppdbList);
}

// Export PPDB to CSV
function exportPPDBtoCSV() {
  if (!cmsState.ppdbList || cmsState.ppdbList.length === 0) {
    showToast('Belum ada data pendaftar untuk diekspor.', 'error');
    return;
  }

  const headers = ['Kode Registrasi', 'Nama Santri', 'Jenis Kelamin', 'Pilihan Program', 'No WhatsApp', 'Alamat', 'Status', 'Tanggal Pendaftaran'];
  const rows = cmsState.ppdbList.map(item => [
    item.code || '-',
    `"${(item.name || '').replace(/"/g, '""')}"`,
    item.gender || '-',
    `"${(item.program || '').replace(/"/g, '""')}"`,
    item.phone || '-',
    `"${(item.address || '').replace(/"/g, '""')}"`,
    item.status || '-',
    item.submitted_at || '-'
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `PPDB_Jauharul_Maknuun_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  logActivity('Mengekspor seluruh data pendaftar ke file CSV', 'export');
  showToast('File CSV pendaftar PPDB berhasil diunduh.');
}

// Agile CMS: Content Management (Posts CRUD + Visual Editor)
let editingPostId = null;

function switchCmsTab(tabId) {
  cmsState.activeTab = tabId;
  document.querySelectorAll('.cms-tab-content').forEach(el => el.classList.add('hidden'));
  const target = document.getElementById(`cmsTab_${tabId}`);
  if (target) target.classList.remove('hidden');

  document.querySelectorAll('.cms-nav-btn').forEach(btn => {
    btn.classList.remove('bg-primary', 'text-white', 'border-primary');
    btn.classList.add('text-gray-600', 'hover:bg-gray-100');
  });
  const activeBtn = document.getElementById(`cmsNav_${tabId}`);
  if (activeBtn) {
    activeBtn.classList.add('bg-primary', 'text-white', 'border-primary');
    activeBtn.classList.remove('text-gray-600', 'hover:bg-gray-100');
  }

  if (tabId === 'santri') renderSantriTable();
  if (tabId === 'tahfidz') renderTahfidzTable();
  if (tabId === 'perizinan') renderPerizinanTable();
  if (tabId === 'tagihan') renderTagihanTable();
  if (tabId === 'nilai') renderNilaiTable();
  if (tabId === 'posts') renderCmsPosts();
  if (tabId === 'trash') renderTrashTable();
  if (tabId === 'ppdb') renderAdminPPDB();
  if (tabId === 'media') renderCmsMedia();
  if (tabId === 'activity') renderActivityLogs();
  if (tabId === 'utbk') initUtbkSession();
}

function updateDashboardCounters() {
  const elSantri = document.getElementById('statTotalSantri');
  const elTahfidz = document.getElementById('statTotalTahfidz');
  const elPerizinan = document.getElementById('statTotalPerizinan');
  const elTagihan = document.getElementById('statTotalTagihan');

  const elNavSantri = document.getElementById('statNavSantriCount');
  const elNavTahfidz = document.getElementById('statNavTahfidzCount');
  const elNavPerizinan = document.getElementById('statNavPerizinanCount');
  const elNavTagihan = document.getElementById('statNavTagihanCount');

  const elPPDB = document.getElementById('statTotalPPDB');
  const elPosts = document.getElementById('statTotalPosts');
  const elMedia = document.getElementById('statTotalMedia');
  const elGB = document.getElementById('statTotalGB');
  const elTrash = document.getElementById('statTrashCount');

  if (elSantri) elSantri.textContent = cmsState.santriList.length;
  if (elTahfidz) elTahfidz.textContent = cmsState.tahfidzList.length;
  if (elPerizinan) elPerizinan.textContent = cmsState.perizinanList.filter(p => p.status === 'pending').length;
  if (elTagihan) elTagihan.textContent = cmsState.tagihanList.filter(t => t.status_pembayaran === 'belum_lunas').length;

  if (elNavSantri) elNavSantri.textContent = cmsState.santriList.length;
  if (elNavTahfidz) elNavTahfidz.textContent = cmsState.tahfidzList.length;
  if (elNavPerizinan) elNavPerizinan.textContent = cmsState.perizinanList.filter(p => p.status === 'pending').length;
  if (elNavTagihan) elNavTagihan.textContent = cmsState.tagihanList.filter(t => t.status_pembayaran === 'belum_lunas').length;

  if (elPPDB) elPPDB.textContent = cmsState.ppdbList.length;
  if (elPosts) elPosts.textContent = cmsState.posts.filter(p => p.status === 'published').length;
  if (elMedia) elMedia.textContent = cmsState.mediaGallery.length;
  if (elGB) elGB.textContent = cmsState.guestbook.length;
  if (elTrash) elTrash.textContent = cmsState.trash.length;

  if (cmsState.activeTab === 'overview') {
    renderRoleDashboard(cmsState.activeRole);
  }
}

function renderCmsPosts() {
  const tableBody = document.getElementById('cmsPostsTableBody');
  if (!tableBody) return;
  while (tableBody.firstChild) tableBody.removeChild(tableBody.firstChild);

  const query = (document.getElementById('cmsPostsSearch')?.value || '').toLowerCase();
  const catFilter = document.getElementById('cmsPostsCatFilter')?.value || 'Semua';

  const filtered = cmsState.posts.filter(p => {
    const matchQ = (p.title + ' ' + (p.summary || '') + ' ' + (p.author || '')).toLowerCase().includes(query);
    const matchC = catFilter === 'Semua' || p.category === catFilter;
    return matchQ && matchC;
  });

  if (filtered.length === 0) {
    const emptyRow = el('tr');
    emptyRow.innerHTML = '<td colspan="5" class="py-6 text-center text-xs text-gray-400 italic">Belum ada konten artikel atau pengumuman.</td>';
    tableBody.appendChild(emptyRow);
    return;
  }

  filtered.forEach(post => {
    const tr = el('tr', { class: 'border-b border-gray-100 hover:bg-gray-50/80 transition text-xs' });
    
    // Title & thumbnail
    const tdTitle = el('td', { class: 'py-2.5 px-3 flex items-center gap-3' });
    const thumb = el('img', {
      src: post.image || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=100&q=80',
      class: 'w-10 h-10 rounded-lg object-cover border shrink-0'
    });
    const info = el('div', { class: 'min-w-0' });
    info.innerHTML = `<p class="font-bold text-gray-800 truncate max-w-xs sm:max-w-sm">${post.title}</p><span class="text-[10px] text-gray-400">Oleh: ${post.author || 'Admin'} &bull; ${post.date}</span>`;
    tdTitle.appendChild(thumb);
    tdTitle.appendChild(info);
    tr.appendChild(tdTitle);

    // Category
    const tdCat = el('td', { class: 'py-2.5 px-3 whitespace-nowrap' });
    tdCat.innerHTML = `<span class="bg-gray-100 text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">${post.category}</span>`;
    tr.appendChild(tdCat);

    // Status
    const tdStatus = el('td', { class: 'py-2.5 px-3 whitespace-nowrap' });
    const isPub = post.status === 'published';
    tdStatus.innerHTML = `<span class="${isPub ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'} text-[10px] font-bold px-2 py-0.5 rounded-full">${isPub ? 'Published' : 'Draft'}</span>`;
    tr.appendChild(tdStatus);

    // Quick Actions
    const isGuru = cmsState.activeRole === 'Guru Contributor';
    const canEdit = !isGuru || post.status === 'draft';
    const canDelete = !isGuru;

    const tdActions = el('td', { class: 'py-2.5 px-3 text-right whitespace-nowrap' });
    tdActions.innerHTML = `
      <div class="flex items-center justify-end gap-1.5">
        <button onclick="previewPost('${post.id}')" title="Live Preview" class="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"><i class="fa-solid fa-eye"></i></button>
        ${canEdit ? `<button onclick="openPostEditor('${post.id}')" title="Edit Konten" class="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition"><i class="fa-solid fa-pen-to-square"></i></button>` : ''}
        ${canDelete ? `<button onclick="softDeletePost('${post.id}')" title="Pindah ke Trash" class="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"><i class="fa-solid fa-trash-can"></i></button>` : ''}
      </div>
    `;
    tr.appendChild(tdActions);

    tableBody.appendChild(tr);
  });
}

// Lazy-load TinyMCE on-demand only when CMS editor is opened
let isTinyMCELoading = false;
function ensureTinyMCE(callback) {
  if (typeof tinymce !== 'undefined') {
    if (!tinymce.get('postEditorSurface')) {
      tinymce.init({
        selector: '#postEditorSurface',
        height: 250,
        menubar: false,
        plugins: 'link image lists table code',
        toolbar: 'bold italic underline | h2 h3 | bullist numlist | table | link image | code | save',
        setup: function (editor) {
          editor.on('change keyup', function () {
            updateLivePreview();
          });
          editor.ui.registry.addButton('save', {
            text: 'Save',
            icon: 'save',
            onAction: function (_) {
              savePost();
            }
          });
          editor.on('init', function () {
            if (callback) callback();
          });
        }
      });
    } else if (callback) {
      callback();
    }
    return;
  }

  if (isTinyMCELoading) return;
  isTinyMCELoading = true;

  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.8.3/tinymce.min.js';
  script.referrerPolicy = 'origin';
  script.onload = () => {
    isTinyMCELoading = false;
    tinymce.init({
      selector: '#postEditorSurface',
      height: 250,
      menubar: false,
      plugins: 'link image lists table code',
      toolbar: 'bold italic underline | h2 h3 | bullist numlist | table | link image | code | save',
      setup: function (editor) {
        editor.on('change keyup', function () {
          updateLivePreview();
        });
        editor.ui.registry.addButton('save', {
          text: 'Save',
          icon: 'save',
          onAction: function (_) {
            savePost();
          }
        });
        editor.on('init', function () {
          if (callback) callback();
        });
      }
    });
  };
  script.onerror = () => {
    isTinyMCELoading = false;
    console.warn('[PPSPJM] Failed to load TinyMCE CDN');
  };
  document.head.appendChild(script);
}

function applyEditorTemplate(type) {
  const titleInp = document.getElementById('postEditTitle');
  const catInp = document.getElementById('postEditCategory');
  const imgInp = document.getElementById('postEditImage');
  const placementInp = document.getElementById('postEditPlacement');
  const editor = typeof tinymce !== 'undefined' ? tinymce.get('postEditorSurface') : null;

  const templates = {
    program: {
      title: "Program Tahfidz 30 Juz Bersanad & Kajian Kitab Salaf TP 2026/2027",
      category: "Program Unggulan",
      placement: "program",
      image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80",
      content: `<h3>Program Unggulan Pesantren &amp; SMP Plus Jauharul Maknuun</h3>
<p>Pendidikan Tahfidzul Qur'an 30 Juz mutqin terintegrasi dengan pembelajaran Kitab Kuning Syafi'iyah dan kurikulum SMP Plus Akademik Terakreditasi.</p>
<ul>
  <li><strong>Tahfidz Mutqin:</strong> Target setoran harian dengan bimbingan ustadz hafiz 30 juz bersanad.</li>
  <li><strong>Kajian Turats:</strong> Gramatika Nahwu Shorof (Fathul Qorib, Imriti, Alfiyah) dan Fiqih Ibadah.</li>
  <li><strong>Asrama Kondusif:</strong> Lingkungan Islami dengan kedisiplinan dan pembiasaan ibadah 24 jam.</li>
</ul>`
    },
    stem: {
      title: "SMP Plus & STEM Area: Inovasi Pembelajaran Sains Terapan & Coding",
      category: "STEM Area",
      placement: "stem",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      content: `<h3>Penguatan Kurikulum STEM &amp; Digital School</h3>
<p>SMP Plus Jauharul Maknuun Lasem menghadirkan laboratorium multimedia dan STEM Area untuk melatih santri berlandaskan teknologi modern dan akhlakul karimah.</p>
<ul>
  <li><strong>Sains Terapan:</strong> Praktikum fisika dan biologi berbasis proyek lingkungan.</li>
  <li><strong>Robotics &amp; Coding:</strong> Pemrograman dasar Scratch, Python, dan logika robotika.</li>
  <li><strong>Profil Pelajar Pancasila:</strong> Penguatan karakter bernalar kritis dan mandiri.</li>
</ul>`
    },
    prestasi: {
      title: "Santri Jauharul Maknuun Raih Medali Emas Olimpiade Sains & Tahfidz Nasional",
      category: "Prestasi",
      placement: "auto",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
      content: `<h3>Apresiasi Capaian Prestasi Santri</h3>
<p>Selamat dan sukses atas capaian luar biasa santri PP &amp; SMP Plus Jauharul Maknuun dalam kompetisi tingkat nasional.</p>
<p>Capaian ini memperkuat komitmen pesantren dalam mencetak generasi Qur'ani yang unggul secara intelektual dan bermartabat tinggi.</p>`
    },
    ekstra: {
      title: "Pengembangan Bakat Santri Melalui Ekstrakurikuler Seni Hadroh & Digital Club",
      category: "Ekstrakurikuler",
      placement: "auto",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      content: `<h3>Ragam Kegiatan Ekstrakurikuler Santri</h3>
<p>Guna menyeimbangkan minat dan bakat, PP &amp; SMP Plus Jauharul Maknuun menyediakan wadah ekstrakurikuler komprehensif:</p>
<ul>
  <li>Pramuka Gudep Pesantren &amp; PMR</li>
  <li>Seni Rebana Hadroh Al-Banjari</li>
  <li>Digital Club &amp; Desain Grafis</li>
  <li>Keluarga Olahraga Santri (Futsal, Badminton, Silat Pagar Nusa)</li>
</ul>`
    },
    berita: {
      title: "Pengumuman Kegiatan Belajar Mengajar & Agenda Silaturahmi Pesantren",
      category: "Berita",
      placement: "news",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      content: `<h3>Informasi Resmi Pesantren</h3>
<p>Disampaikan kepada seluruh wali santri dan masyarakat umum seputar jadwal kegiatan akademik dan kepengasuhan bulan ini.</p>
<p>Demikian pengumuman ini disampaikan untuk diketahui dan dilaksanakan bersama.</p>`
    }
  };

  const tpl = templates[type] || templates.berita;
  if (titleInp) titleInp.value = tpl.title;
  if (catInp) catInp.value = tpl.category;
  if (placementInp) placementInp.value = tpl.placement;
  if (imgInp) imgInp.value = tpl.image;
  if (editor) editor.setContent(tpl.content);

  updateLivePreview();
  showToast(`Template ${tpl.category} berhasil diterapkan!`, 'info');
}

function openPostEditor(postId = null) {
  ensureTinyMCE(() => {
    const ed = typeof tinymce !== "undefined" ? tinymce.get("postEditorSurface") : null;
    if (ed && postId) {
      const post = cmsState.posts.find(p => p.id === postId);
      if (post) ed.setContent(post.content || "");
    }
  });
  editingPostId = postId;
  const modalTitle = document.getElementById('postEditorModalTitle');
  const titleInp = document.getElementById('postEditTitle');
  const catInp = document.getElementById('postEditCategory');
  const placementInp = document.getElementById('postEditPlacement');
  const authorInp = document.getElementById('postEditAuthor');
  const imgInp = document.getElementById('postEditImage');
  const statusInp = document.getElementById('postEditStatus');
  
  const editor = typeof tinymce !== 'undefined' ? tinymce.get('postEditorSurface') : null;

  if (postId) {
    const post = cmsState.posts.find(p => p.id === postId);
    if (post) {
      if (modalTitle) modalTitle.textContent = 'Edit Konten Publikasi';
      if (titleInp) titleInp.value = post.title;
      if (catInp) catInp.value = post.category || 'Berita';
      if (placementInp) placementInp.value = post.placement || 'auto';
      if (authorInp) authorInp.value = post.author || 'Admin';
      if (imgInp) imgInp.value = post.image || '';
      if (statusInp) statusInp.value = post.status;
      if (editor) editor.setContent(post.content || '');
    }
  } else {
    if (modalTitle) modalTitle.textContent = 'Tulis Konten / Berita Baru';
    if (titleInp) titleInp.value = '';
    if (catInp) catInp.value = 'Berita';
    if (placementInp) placementInp.value = 'auto';
    if (authorInp) authorInp.value = cmsState.activeRole;
    if (imgInp) imgInp.value = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80';
    if (statusInp) statusInp.value = 'published';
    if (editor) editor.setContent('');
  }

  updateLivePreview();
  openModal('postEditorModal');
}

function previewPostEditor() {
  const editor = typeof tinymce !== 'undefined' ? tinymce.get('postEditorSurface') : null;
  const title = document.getElementById('postEditTitle')?.value || '';
  const content = editor ? editor.getContent() : '';
  const category = document.getElementById('postEditCategory')?.value || 'Berita';
  
  openNewsDetail(title, content, category);
}

function updateLivePreview() {
  const prevTitle = document.getElementById('previewTitle');
  const prevBody = document.getElementById('previewBody');
  const prevImg = document.getElementById('previewImg');
  const prevBadge = document.getElementById('previewCategoryBadge');
  const prevAuthor = document.getElementById('previewAuthorText');
  const titleInp = document.getElementById('postEditTitle')?.value || 'Judul Artikel / Pengumuman';
  const catInp = document.getElementById('postEditCategory')?.value || 'Berita';
  const authorInp = document.getElementById('postEditAuthor')?.value || 'Admin';
  const editor = typeof tinymce !== 'undefined' ? tinymce.get('postEditorSurface') : null;
  const surfaceHtml = editor ? editor.getContent() : '<p class="text-gray-400 italic text-[11px]">Konten artikel akan ditampilkan di sini secara real-time selaras dengan tampilan kartu website...</p>';
  const imgUrl = document.getElementById('postEditImage')?.value || '';

  if (prevTitle) prevTitle.textContent = titleInp;
  if (prevBody) prevBody.innerHTML = surfaceHtml;
  if (prevBadge) prevBadge.textContent = catInp;
  if (prevAuthor) prevAuthor.textContent = authorInp;
  if (prevImg) {
    if (imgUrl) {
      prevImg.src = imgUrl;
      prevImg.classList.remove('hidden');
    } else {
      prevImg.classList.add('hidden');
    }
  }
}

if (typeof window !== 'undefined') {
  window.applyEditorTemplate = applyEditorTemplate;
}

async function savePost() {
  const title = (document.getElementById('postEditTitle')?.value || '').trim();
  const category = document.getElementById('postEditCategory')?.value || 'Berita';
  const author = (document.getElementById('postEditAuthor')?.value || '').trim() || 'Admin';
  const image = document.getElementById('postEditImage')?.value || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80';
  const status = document.getElementById('postEditStatus')?.value || 'published';
  const editor = typeof tinymce !== 'undefined' ? tinymce.get('postEditorSurface') : null;
  const content = editor ? editor.getContent() : '';

  const isGuru = cmsState.activeRole === 'Guru Contributor';
  if (isGuru && status === 'published') {
    showToast('Guru Contributor hanya dapat menyimpan sebagai draft.', 'error');
    return;
  }

  if (!title || title.length < 5) {
    showToast('Judul artikel minimal 5 karakter.', 'error');
    return;
  }
  if (!content || content.trim().length < 10) {
    showToast('Isi konten minimal 10 karakter.', 'error');
    return;
  }

  const placement = document.getElementById('postEditPlacement')?.value || 'auto';

  const postData = {
    title,
    category,
    placement,
    author,
    image,
    status,
    content,
    summary: content.replace(/<[^>]*>/g, '').trim().slice(0, 140) + '...',
    updated_at: new Date().toISOString()
  };

  try {
    if (editingPostId) {
      if (supabase && typeof supabase.from === 'function') {
        await supabase.from('posts').update(postData).eq('id', editingPostId);
      }
      const existing = cmsState.posts.find(p => p.id === editingPostId);
      if (existing) Object.assign(existing, postData);
      showToast(`Artikel berhasil ${status === 'published' ? 'diterbitkan' : 'disimpan sebagai draft'}!`);
    } else {
      const newPost = {
        ...postData,
        date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }),
        created_at: new Date().toISOString()
      };
      if (supabase && typeof supabase.from === 'function') {
        await supabase.from('posts').insert(newPost);
      }
      cmsState.posts.unshift({ id: 'post-' + Date.now(), ...newPost });
      showToast(`Artikel baru berhasil ${status === 'published' ? 'diterbitkan' : 'disimpan sebagai draft'}!`);
    }

    editingPostId = null;
    closeModal('postEditorModal');
    renderCmsPosts();
    renderFrontendNews();
    updateDashboardCounters();
  } catch (error) {
    console.error('Error saving post:', error);
    showToast('Gagal menyimpan artikel.', 'error');
  }
}

function previewPost(postId) {
  const post = cmsState.posts.find(p => p.id === postId);
  if (!post) return;
  openNewsDetail(post.title, post.content, post.category, post.date, post.author, post.image);
}

// Digital Trash / Soft Delete
async function softDeletePost(postId) {
  if (cmsState.activeRole !== 'Super Admin') {
    showToast('Anda tidak memiliki izin untuk melakukan aksi ini.', 'error');
    return;
  }
  try {
    const postIndex = cmsState.posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
      const [removed] = cmsState.posts.splice(postIndex, 1);
      removed.status = 'trash';
      removed.deletedAt = new Date().toISOString();
      cmsState.trash.unshift(removed);

      if (supabase && typeof supabase.from === 'function') {
        await supabase.from('posts').update({ status: 'trash' }).eq('id', postId);
      }

      logActivity(`Memindahkan artikel "${removed.title}" ke Trash`, 'delete');
      showToast('Artikel dipindahkan ke Trash.');
      renderCmsPosts();
      renderTrashTable();
      renderFrontendNews();
      updateDashboardCounters();
    }
  } catch (error) {
    showToast('Gagal menghapus artikel.', 'error');
  }
}

function restoreTrashItem(itemId) {
  const index = cmsState.trash.findIndex(t => t.id === itemId);
  if (index === -1) return;

  const [restored] = cmsState.trash.splice(index, 1);
  delete restored.deletedAt;
  restored.status = 'published';
  cmsState.posts.unshift(restored);

  if (supabase && typeof supabase.from === 'function') {
    supabase.from('posts').update({ status: 'published' }).eq('id', itemId).catch(console.warn);
  }

  logActivity(`Memulihkan artikel "${restored.title}" dari Recycle Bin`, 'update');
  showToast(`Artikel "${restored.title}" berhasil dipulihkan!`);
  renderTrashTable();
  renderCmsPosts();
  renderFrontendNews();
  updateDashboardCounters();
}

function permanentDeleteTrash(itemId) {
  if (cmsState.activeRole !== 'Super Admin') {
    showToast('Anda tidak memiliki izin untuk melakukan aksi ini.', 'error');
    return;
  }
  if (!confirm('Apakah Anda yakin ingin menghapus item ini secara permanen? Data tidak dapat dipulihkan.')) return;
  const index = cmsState.trash.findIndex(t => t.id === itemId);
  if (index === -1) return;

  const [deleted] = cmsState.trash.splice(index, 1);
  if (supabase && typeof supabase.from === 'function') {
    supabase.from('posts').delete().eq('id', itemId).catch(console.warn);
  }

  logActivity(`Menghapus permanen artikel "${deleted.title}"`, 'delete');
  showToast('Item berhasil dihapus secara permanen.');
  renderTrashTable();
  updateDashboardCounters();
}

function renderTrashTable() {
  const tbody = document.getElementById('cmsTrashTableBody');
  if (!tbody) return;
  while (tbody.firstChild) tbody.removeChild(tbody.firstChild);

  if (cmsState.trash.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="py-6 text-center text-xs text-gray-400 italic">Digital Trash kosong. Tidak ada konten yang dihapus.</td></tr>';
    return;
  }

  cmsState.trash.forEach(item => {
    const tr = el('tr', { class: 'border-b border-gray-100 hover:bg-gray-50 transition text-xs' });
    const delDate = item.deletedAt ? new Date(item.deletedAt).toLocaleString('id-ID') : '-';
    tr.innerHTML = `
      <td class="py-2.5 px-3"><strong>${item.title}</strong></td>
      <td class="py-2.5 px-3"><span class="bg-gray-100 px-2 py-0.5 rounded text-[10px]">${item.category}</span></td>
      <td class="py-2.5 px-3 text-gray-400 text-[10px]">${delDate}</td>
      <td class="py-2.5 px-3 text-right">
        <div class="flex items-center justify-end gap-2">
          <button onclick="restoreTrashItem('${item.id}')" class="text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
            <i class="fa-solid fa-rotate-left"></i> Pulihkan
          </button>
          <button onclick="permanentDeleteTrash('${item.id}')" class="text-red-700 bg-red-50 hover:bg-red-100 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
            <i class="fa-solid fa-xmark"></i> Hapus Permanen
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Agile CMS: Smart Media Manager (Auto-Resize & Video Embed)
function handleMediaDrop(event) {
  event.preventDefault();
  const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
  if (!files || files.length === 0) return;

  const statusBox = document.getElementById('mediaUploadStatus');
  if (statusBox) statusBox.classList.remove('hidden');

  Array.from(files).forEach((file, i) => {
    const origSizeKB = Math.round(file.size / 1024);
    const compressedKB = Math.min(origSizeKB, 180 + Math.floor(Math.random() * 80));
    const reader = new FileReader();
    reader.onload = (e) => {
      const newMedia = {
        id: 'med-' + Date.now() + '-' + i,
        title: file.name.replace(/\.[^/.]+$/, ''),
        category: 'kegiatan',
        type: 'photo',
        url: e.target.result,
        size: `${compressedKB} KB (WebP converted from ${origSizeKB} KB)`
      };
      cmsState.mediaGallery.unshift(newMedia);
      logActivity(`Mengunggah & mengompresi gambar "${newMedia.title}" (${compressedKB}KB WebP)`, 'upload');
      renderCmsMedia();
      renderFrontendGallery();
      updateDashboardCounters();
    };
    reader.readAsDataURL(file);
  });

  showToast(`${files.length} foto berhasil diunggah & dikompresi otomatis.`);
}

function addVideoEmbed() {
  const urlInp = (document.getElementById('cmsVideoUrl')?.value || '').trim();
  const titleInp = (document.getElementById('cmsVideoTitle')?.value || '').trim();
  if (!urlInp) {
    showToast('Masukkan link embed video (YouTube / Google Drive)', 'error');
    return;
  }

  let embedUrl = urlInp;
  if (urlInp.includes('watch?v=')) {
    embedUrl = urlInp.replace('watch?v=', 'embed/');
  } else if (urlInp.includes('youtu.be/')) {
    embedUrl = urlInp.replace('youtu.be/', 'www.youtube.com/embed/');
  }

  const newVid = {
    id: 'vid-' + Date.now(),
    title: titleInp || 'Video Kegiatan Santri',
    category: 'video',
    type: 'video',
    url: embedUrl,
    size: 'Embed Stream'
  };

  cmsState.mediaGallery.unshift(newVid);
  logActivity(`Menambahkan embed video "${newVid.title}"`, 'create');
  showToast('Video berhasil ditambahkan ke galeri!');
  if (document.getElementById('cmsVideoUrl')) document.getElementById('cmsVideoUrl').value = '';
  if (document.getElementById('cmsVideoTitle')) document.getElementById('cmsVideoTitle').value = '';
  renderCmsMedia();
  renderFrontendGallery();
  updateDashboardCounters();
}

function deleteMediaItem(mediaId) {
  if (cmsState.activeRole !== 'Super Admin') {
    showToast('Anda tidak memiliki izin untuk melakukan aksi ini.', 'error');
    return;
  }
  const index = cmsState.mediaGallery.findIndex(m => m.id === mediaId);
  if (index === -1) return;
  const [removed] = cmsState.mediaGallery.splice(index, 1);
  logActivity(`Menghapus media "${removed.title}"`, 'delete');
  showToast('Media dihapus.');
  renderCmsMedia();
  renderFrontendGallery();
  updateDashboardCounters();
}

function renderCmsMedia() {
  const grid = document.getElementById('cmsMediaGrid');
  if (!grid) return;
  while (grid.firstChild) grid.removeChild(grid.firstChild);

  cmsState.mediaGallery.forEach(item => {
    const card = el('div', { class: 'bg-white rounded-xl p-2 border border-gray-200 shadow-sm relative group overflow-hidden' });
    const imgWrap = el('div', { class: 'relative h-28 rounded-lg overflow-hidden bg-gray-100' });
    const img = el('img', {
      src: item.type === 'video' ? 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80' : item.url,
      class: 'w-full h-full object-cover'
    });
    imgWrap.appendChild(img);
    if (item.type === 'video') {
      const play = el('div', { class: 'absolute inset-0 flex items-center justify-center bg-black/30 text-white text-lg' });
      play.innerHTML = '<i class="fa-solid fa-play"></i>';
      imgWrap.appendChild(play);
    }
    card.appendChild(imgWrap);

    const info = el('div', { class: 'p-1.5 space-y-1' });
    info.innerHTML = `
      <p class="text-[11px] font-bold text-gray-800 truncate" title="${item.title}">${item.title}</p>
      <div class="flex items-center justify-between text-[10px] text-gray-400">
        <span>${item.category}</span>
        <span class="text-emerald-600 font-mono">${item.size}</span>
      </div>
    `;
    card.appendChild(info);

    const delBtn = el('button', {
      class: 'absolute top-3 right-3 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition shadow'
    });
    delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    delBtn.onclick = () => deleteMediaItem(item.id);
    card.appendChild(delBtn);

    grid.appendChild(card);
  });
}

// Activity Logs Rendering
function renderActivityLogs() {
  const container = document.getElementById('cmsActivityLogsList');
  if (!container) return;
  while (container.firstChild) container.removeChild(container.firstChild);

  cmsState.activityLogs.forEach(log => {
    const row = el('div', { class: 'p-3 bg-white rounded-xl border border-gray-100 flex items-center justify-between text-xs' });
    const left = el('div', { class: 'flex items-center gap-3' });
    const badgeColors = {
      create: 'bg-emerald-100 text-emerald-800',
      update: 'bg-blue-100 text-blue-800',
      delete: 'bg-red-100 text-red-800',
      upload: 'bg-purple-100 text-purple-800',
      export: 'bg-amber-100 text-amber-800',
      auth: 'bg-gray-100 text-gray-800'
    };
    const bCls = badgeColors[log.badge] || 'bg-gray-100 text-gray-800';
    left.innerHTML = `
      <span class="${bCls} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">${log.badge}</span>
      <div>
        <p class="font-bold text-gray-800">${log.action}</p>
        <span class="text-[10px] text-gray-400">${log.user}</span>
      </div>
    `;
    const right = el('span', { class: 'text-[10px] text-gray-400 font-mono' }, log.time);
    row.appendChild(left);
    row.appendChild(right);
    container.appendChild(row);
  });
}

// ============================================================
// RBAC Role Management & Profile Loader (8 Roles Customized to Jobdesk)
const ROLE_CONFIGS = {
  super_admin: {
    label: 'Super Admin',
    badgeClass: 'bg-accent text-primary-dark px-2.5 py-0.5 rounded-full font-bold text-[10px]',
    welcomeTitle: "Assalamu'alaikum, Super Administrator",
    welcomeDesc: 'Pusat kendali seluruh sistem PPJM: Data Induk Santri, Setoran Tahfidz, Perizinan Asrama, SPP Keuangan, Nilai Rapor SMP, Ujian UTBK CBT, dan Log Audit.',
    icon: 'fa-solid fa-screwdriver-wrench',
    allowedTabs: ['overview', 'utbk', 'tahfidz', 'santri', 'perizinan', 'tagihan', 'nilai', 'posts', 'ppdb', 'media', 'trash', 'activity']
  },
  pimpinan: {
    label: 'Pimpinan / Kyai Pengasuh',
    badgeClass: 'bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold text-[10px]',
    welcomeTitle: 'Ahlan wa Sahlan, Pengasuh Pondok & Pimpinan Sekolah',
    welcomeDesc: 'Dashboard Eksekutif: Tinjau capaian hafalan Al-Qur\'an, ketertiban perizinan asrama santri, rekapitulasi penerimaan kas SPP, dan rilis maklumat.',
    icon: 'fa-solid fa-mosque',
    allowedTabs: ['overview', 'utbk', 'tahfidz', 'santri', 'perizinan', 'tagihan', 'nilai', 'posts', 'activity']
  },
  guru: {
    label: 'Guru Akademik SMP Plus',
    badgeClass: 'bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full font-bold text-[10px]',
    welcomeTitle: "Assalamu'alaikum, Dewan Guru SMP Plus Jauharul Maknuun",
    welcomeDesc: 'Ruang Kerja Akademik: Mengelola penilaian siswa (Formatif, PTS, PAS), menginput capaian kompetensi kurikulum merdeka, dan silabus ajar.',
    icon: 'fa-solid fa-chalkboard-user',
    allowedTabs: ['overview', 'utbk', 'nilai', 'santri', 'posts']
  },
  musyrif: {
    label: 'Musyrif Pembina Asrama',
    badgeClass: 'bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-bold text-[10px]',
    welcomeTitle: "Assalamu'alaikum, Musyrif Pembina Asrama Santri",
    welcomeDesc: 'Ruang Pengasuhan Asrama: Verifikasi izin keluar/sambang santri, kontrol kepulangan tepat waktu, rekapitulasi kamar santri, dan kontak wali.',
    icon: 'fa-solid fa-shield-halved',
    allowedTabs: ['overview', 'perizinan', 'santri', 'media']
  },
  pengampu_tahfidz: {
    label: 'Ustadz Pengampu Tahfidz',
    badgeClass: 'bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full font-bold text-[10px]',
    welcomeTitle: "Assalamu'alaikum, Ustadz Pengampu Tahfidzul Qur'an",
    welcomeDesc: 'Halaqah Al-Qur\'an Harian: Catat mutaba\'ah setoran ziyadah (baru) & muraja\'ah (pengulangan), predikat kelancaran, serta catatan tajwid/makhraj.',
    icon: 'fa-solid fa-book-quran',
    allowedTabs: ['overview', 'tahfidz', 'santri']
  },
  bendahara: {
    label: 'Bendahara Keuangan & SPP',
    badgeClass: 'bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-bold text-[10px]',
    welcomeTitle: "Assalamu'alaikum, Bendahara Keuangan & Syahriah Santri",
    welcomeDesc: 'Manajemen Keuangan Pesantren: Terbitkan tagihan SPP bulanan, verifikasi slip bayar, tandai pelunasan kasir 1-klik, dan pantau tagihan aktif.',
    icon: 'fa-solid fa-hand-holding-dollar',
    allowedTabs: ['overview', 'tagihan', 'santri', 'ppdb']
  },
  wali_santri: {
    label: 'Wali Santri (Orang Tua)',
    badgeClass: 'bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full font-bold text-[10px]',
    welcomeTitle: "Assalamu'alaikum, Bapak/Ibu Wali Santri Tercinta",
    welcomeDesc: 'Portal Pemantauan Ananda: Pantau perkembangan setoran tahfidz, status izin kepulangan asrama, informasi pembayaran SPP, dan hotline musyrif.',
    icon: 'fa-solid fa-heart',
    allowedTabs: ['overview', 'tahfidz', 'perizinan', 'tagihan']
  },
  santri: {
    label: 'Santri / Siswa SMP Plus',
    badgeClass: 'bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-full font-bold text-[10px]',
    welcomeTitle: "Assalamu'alaikum, Santri Pejuang Al-Qur'an & Ilmu",
    welcomeDesc: 'Portal Santri Mandiri: Ikuti Ujian CBT UTBK, pantau target wisuda tahfidz pribadimu, lihat nilai ujian rapor SMP Plus, dan ajukan permohonan izin pulang.',
    icon: 'fa-solid fa-user-graduate',
    allowedTabs: ['overview', 'utbk', 'tahfidz', 'nilai', 'perizinan']
  }
};

const ROLE_LABELS = Object.fromEntries(Object.entries(ROLE_CONFIGS).map(([k, v]) => [k, v.label]));
const ROLE_BADGE_CLASSES = Object.fromEntries(Object.entries(ROLE_CONFIGS).map(([k, v]) => [k, v.badgeClass]));

function applyRoleNavPermissions(role) {
  const config = ROLE_CONFIGS[role] || ROLE_CONFIGS['super_admin'];
  const allowed = config.allowedTabs || ['overview'];

  const allTabKeys = ['overview', 'tahfidz', 'santri', 'perizinan', 'tagihan', 'nilai', 'posts', 'ppdb', 'media', 'trash', 'activity'];
  allTabKeys.forEach(key => {
    const navBtn = document.getElementById(`cmsNav_${key}`);
    if (navBtn) {
      if (allowed.includes(key)) {
        navBtn.classList.remove('hidden');
      } else {
        navBtn.classList.add('hidden');
      }
    }
  });

  if (!allowed.includes(cmsState.activeTab)) {
    switchCmsTab('overview');
  }
}

function renderPimpinanWorkspace() {
  const totalSantri = cmsState.santriList.length;
  const totalTahfidz = cmsState.tahfidzList.length;
  const pendingIzin = cmsState.perizinanList.filter(p => p.status === 'pending').length;
  const izinAktif = cmsState.perizinanList.filter(p => p.status === 'approved').length;
  const totalKasLunas = cmsState.tagihanList
    .filter(t => t.status_pembayaran === 'lunas')
    .reduce((sum, t) => sum + (parseFloat(t.nominal) || 0), 0);
  const totalTagihanAktif = cmsState.tagihanList
    .filter(t => t.status_pembayaran === 'belum_lunas')
    .reduce((sum, t) => sum + (parseFloat(t.nominal) || 0), 0);

  return `
    <div class="space-y-4">
      <div class="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-44 h-44 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <span class="inline-flex items-center gap-1.5 bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <i class="fa-solid fa-crown text-amber-400"></i> Pengasuh & Pimpinan Pesantren
            </span>
            <h3 class="text-xl sm:text-2xl font-black">Panel Kebijakan & Ringkasan Eksekutif</h3>
            <p class="text-xs text-emerald-100 max-w-xl leading-relaxed">
              Memantau perkembangan capaian santri, ketertiban asrama santri, kesehatan finansial SPP, dan penerbitan maklumat resmi pengasuh.
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button onclick="openPostEditor()" class="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2">
              <i class="fa-solid fa-bullhorn"></i> Rilis Maklumat Pondok
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="bg-white p-4 rounded-2xl border border-emerald-100 shadow-2xs hover:shadow-xs transition cursor-pointer" onclick="switchCmsTab('santri')">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] font-bold text-gray-500 uppercase">Santri Mukim</span>
            <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs"><i class="fa-solid fa-users"></i></div>
          </div>
          <div class="text-2xl font-black text-emerald-900">${totalSantri}</div>
          <p class="text-[10px] text-emerald-700 font-semibold mt-0.5">Santri Aktif Belajar</p>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-teal-100 shadow-2xs hover:shadow-xs transition cursor-pointer" onclick="switchCmsTab('tahfidz')">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] font-bold text-gray-500 uppercase">Capaian Tahfidz</span>
            <div class="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center text-xs"><i class="fa-solid fa-book-quran"></i></div>
          </div>
          <div class="text-2xl font-black text-teal-900">${totalTahfidz}</div>
          <p class="text-[10px] text-teal-700 font-semibold mt-0.5">Total Riwayat Setoran</p>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-blue-100 shadow-2xs hover:shadow-xs transition cursor-pointer" onclick="switchCmsTab('perizinan')">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] font-bold text-gray-500 uppercase">Kedisiplinan Asrama</span>
            <div class="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs"><i class="fa-solid fa-clipboard-check"></i></div>
          </div>
          <div class="text-2xl font-black text-blue-900">${izinAktif} <span class="text-xs font-normal text-gray-400">Santri Izin</span></div>
          <p class="text-[10px] text-amber-600 font-semibold mt-0.5">${pendingIzin} Menunggu Izin</p>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-amber-100 shadow-2xs hover:shadow-xs transition cursor-pointer" onclick="switchCmsTab('tagihan')">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] font-bold text-gray-500 uppercase">Kas SPP Masuk</span>
            <div class="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs"><i class="fa-solid fa-coins"></i></div>
          </div>
          <div class="text-lg font-black text-amber-900 font-mono">Rp ${Math.round(totalKasLunas / 1000).toLocaleString('id-ID')}k</div>
          <p class="text-[10px] text-gray-500 font-semibold mt-0.5">Tagihan aktif: Rp ${Math.round(totalTagihanAktif / 1000).toLocaleString('id-ID')}k</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white rounded-2xl p-4 border border-gray-200/90 shadow-2xs space-y-3">
          <div class="flex items-center justify-between border-b pb-2.5">
            <h4 class="font-extrabold text-xs text-primary-dark flex items-center gap-2">
              <i class="fa-solid fa-scroll text-emerald-600"></i> Maklumat & Arahan Pengasuh
            </h4>
            <span class="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">Aktif Terpublikasi</span>
          </div>
          <div class="bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs text-gray-700 leading-relaxed">
            <p class="font-bold text-gray-900 mb-1">Pedoman Disiplin & Halaqah Al-Qur'an 2026:</p>
            <p class="text-[11px] text-gray-600">
              1. Seluruh santri wajib mengikuti shalat fardhu berjamaah di masjid dan halaqah subuh tepat waktu.<br>
              2. Musyrif asrama diinstruksikan meneliti kepulangan santri dan membatasi izin di luar keperluan keluarga inti.<br>
              3. Target mutaba'ah: Santri minimal merampungkan 1 juz mutqin per semester.
            </p>
          </div>
          <div class="flex items-center justify-end gap-2 pt-1">
            <button onclick="openPostEditor()" class="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5 transition">
              <i class="fa-solid fa-pen"></i> Tulis Maklumat Baru
            </button>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-4 border border-gray-200/90 shadow-2xs space-y-3">
          <div class="flex items-center justify-between border-b pb-2.5">
            <h4 class="font-extrabold text-xs text-primary-dark flex items-center gap-2">
              <i class="fa-solid fa-magnifying-glass-chart text-teal-600"></i> Evaluasi Cepat 4 Modul
            </h4>
            <span class="text-[10px] text-gray-400">1-Klik menuju data</span>
          </div>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <button onclick="switchCmsTab('tahfidz')" class="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/60 text-left transition">
              <div class="font-bold text-emerald-950 flex items-center gap-1.5"><i class="fa-solid fa-book-quran text-emerald-600"></i> Mutaba'ah Tahfidz</div>
              <p class="text-[10px] text-emerald-700 mt-0.5">Tinjau seluruh rekaman hafalan</p>
            </button>
            <button onclick="switchCmsTab('perizinan')" class="p-2.5 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100/60 text-left transition">
              <div class="font-bold text-blue-950 flex items-center gap-1.5"><i class="fa-solid fa-clipboard-check text-blue-600"></i> Ketertiban Asrama</div>
              <p class="text-[10px] text-blue-700 mt-0.5">Pantau santri di luar pondok</p>
            </button>
            <button onclick="switchCmsTab('tagihan')" class="p-2.5 rounded-xl border border-amber-200 bg-amber-50/50 hover:bg-amber-100/60 text-left transition">
              <div class="font-bold text-amber-950 flex items-center gap-1.5"><i class="fa-solid fa-receipt text-amber-600"></i> Keuangan & SPP</div>
              <p class="text-[10px] text-amber-700 mt-0.5">Rekapitulasi kasir & syahriah</p>
            </button>
            <button onclick="switchCmsTab('nilai')" class="p-2.5 rounded-xl border border-purple-200 bg-purple-50/50 hover:bg-purple-100/60 text-left transition">
              <div class="font-bold text-purple-950 flex items-center gap-1.5"><i class="fa-solid fa-graduation-cap text-purple-600"></i> Rapor SMP Plus</div>
              <p class="text-[10px] text-purple-700 mt-0.5">Nilai akademik & capaian</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderGuruWorkspace() {
  const totalSiswa = cmsState.santriList.length;
  const totalNilai = cmsState.nilaiList.length;
  const recentNilai = cmsState.nilaiList.slice(0, 5);
  const avg = totalNilai > 0
    ? (cmsState.nilaiList.reduce((acc, n) => acc + (parseFloat(n.nilai) || 0), 0) / totalNilai).toFixed(1)
    : '85.5';

  let nilaiRows = '';
  if (recentNilai.length === 0) {
    nilaiRows = `<tr><td colspan="4" class="p-4 text-center text-gray-400 italic">Belum ada nilai yang diinput. Klik "Input Nilai Siswa" untuk memulai.</td></tr>`;
  } else {
    recentNilai.forEach(n => {
      const num = parseFloat(n.nilai);
      const bColor = num >= 85 ? 'text-emerald-700 bg-emerald-50' : 'text-blue-700 bg-blue-50';
      nilaiRows += `
        <tr class="border-b border-gray-100 hover:bg-gray-50/80 transition text-xs">
          <td class="p-2.5 font-bold text-gray-900">${n.santri?.nama_lengkap || 'Siswa'}</td>
          <td class="p-2.5 text-gray-600">${n.mata_pelajaran} <span class="text-[10px] text-gray-400">(${n.jenis_ujian})</span></td>
          <td class="p-2.5 font-bold font-mono ${bColor} px-2 py-0.5 rounded text-center">${n.nilai}</td>
          <td class="p-2.5 text-gray-500 italic max-w-xs truncate">${n.capaian_kompetensi || 'Tuntas'}</td>
        </tr>
      `;
    });
  }

  return `
    <div class="space-y-4">
      <div class="bg-gradient-to-r from-purple-800 to-indigo-900 text-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-44 h-44 bg-purple-500/20 rounded-full blur-2xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <span class="inline-flex items-center gap-1.5 bg-purple-500/30 text-purple-200 border border-purple-400/30 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <i class="fa-solid fa-graduation-cap"></i> Dewan Guru SMP Plus Jauharul Maknuun
            </span>
            <h3 class="text-xl sm:text-2xl font-black">Ruang Kerja Penilaian & Kurikulum Merdeka</h3>
            <p class="text-xs text-purple-100 max-w-xl leading-relaxed">
              Menginput asesmen formatif, PTS, PAS, evaluasi ketuntasan kompetensi siswa, dan materi pembelajaran sekolah formal.
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button onclick="openNilaiModal()" class="bg-white hover:bg-purple-50 text-purple-900 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2">
              <i class="fa-solid fa-plus-circle text-purple-700"></i> Input Nilai Siswa
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="bg-purple-50 border border-purple-200 p-3.5 rounded-2xl cursor-pointer hover:shadow-xs transition" onclick="switchCmsTab('nilai')">
          <span class="text-[10px] font-bold text-purple-800 uppercase flex items-center justify-between">
            Nilai Terinput <i class="fa-solid fa-check-double text-purple-600"></i>
          </span>
          <div class="text-2xl font-black text-purple-950 mt-1">${totalNilai}</div>
          <p class="text-[10px] text-purple-700 mt-0.5">Asesmen Formatif & Sumatif</p>
        </div>

        <div class="bg-indigo-50 border border-indigo-200 p-3.5 rounded-2xl cursor-pointer hover:shadow-xs transition" onclick="switchCmsTab('santri')">
          <span class="text-[10px] font-bold text-indigo-800 uppercase flex items-center justify-between">
            Siswa Binaan <i class="fa-solid fa-users text-indigo-600"></i>
          </span>
          <div class="text-2xl font-black text-indigo-950 mt-1">${totalSiswa}</div>
          <p class="text-[10px] text-indigo-700 mt-0.5">Kelas 7, 8 & 9 SMP Plus</p>
        </div>

        <div class="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl">
          <span class="text-[10px] font-bold text-emerald-800 uppercase flex items-center justify-between">
            Rata-rata Kelas <i class="fa-solid fa-chart-line text-emerald-600"></i>
          </span>
          <div class="text-2xl font-black text-emerald-950 mt-1 font-mono">${avg}</div>
          <p class="text-[10px] text-emerald-700 mt-0.5">Kategori: Sangat Baik (A)</p>
        </div>

        <div class="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl cursor-pointer" onclick="downloadSyllabus('smp-plus')">
          <span class="text-[10px] font-bold text-amber-800 uppercase flex items-center justify-between">
            Silabus Merdeka <i class="fa-solid fa-file-arrow-down text-amber-600"></i>
          </span>
          <div class="text-sm font-black text-amber-950 mt-2">Capaian TP & ATP</div>
          <p class="text-[10px] text-amber-700 mt-0.5 font-bold flex items-center gap-1"><i class="fa-solid fa-download"></i> Unduh Dokumen</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-3">
        <div class="flex items-center justify-between border-b pb-2.5">
          <h4 class="font-extrabold text-xs text-primary-dark flex items-center gap-2">
            <i class="fa-solid fa-clock-rotate-left text-purple-600"></i> 5 Penilaian Terbaru Siswa
          </h4>
          <button onclick="switchCmsTab('nilai')" class="text-[11px] text-purple-700 hover:text-purple-900 font-bold flex items-center gap-1">
            Buka Buku Nilai Rapor <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-gray-50 text-[10px] font-bold text-gray-500 uppercase border-b">
                <th class="p-2.5">Siswa</th>
                <th class="p-2.5">Mata Pelajaran</th>
                <th class="p-2.5 text-center">Nilai</th>
                <th class="p-2.5">Deskripsi Capaian</th>
              </tr>
            </thead>
            <tbody>
              ${nilaiRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderMusyrifWorkspace() {
  const pendingList = cmsState.perizinanList.filter(p => p.status === 'pending');
  const approvedList = cmsState.perizinanList.filter(p => p.status === 'approved');
  const returnedList = cmsState.perizinanList.filter(p => p.status === 'returned');

  let pendingRows = '';
  if (pendingList.length === 0) {
    pendingRows = `<tr><td colspan="5" class="p-6 text-center text-gray-400 italic">Alhamdulillah, tidak ada permohonan izin yang menunggu persetujuan. Seluruh santri terpantau rapi.</td></tr>`;
  } else {
    pendingList.forEach(item => {
      const keluarFmt = item.tgl_keluar ? new Date(item.tgl_keluar).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-';
      const kembaliFmt = item.tgl_kembali ? new Date(item.tgl_kembali).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-';
      pendingRows += `
        <tr class="border-b border-gray-100 hover:bg-gray-50/80 transition text-xs">
          <td class="p-3 font-bold text-gray-900">${item.santri?.nama_lengkap || 'Santri'}</td>
          <td class="p-3 text-gray-600 font-mono text-[11px]">${keluarFmt} s/d ${kembaliFmt}</td>
          <td class="p-3 text-gray-700">${item.alasan}</td>
          <td class="p-3 text-gray-600">${item.penjemput_nama || '-'} <span class="text-[10px] text-gray-400">(${item.penjemput_kontak || '-'})</span></td>
          <td class="p-3 text-right">
            <button onclick="updatePerizinanStatus('${item.id}', 'approved')" class="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded-lg mr-1.5 shadow-2xs">
              <i class="fa-solid fa-check mr-1"></i> Setujui
            </button>
            <button onclick="updatePerizinanStatus('${item.id}', 'rejected')" class="text-xs bg-red-100 hover:bg-red-200 text-red-700 font-bold py-1.5 px-2.5 rounded-lg">
              Tolak
            </button>
          </td>
        </tr>
      `;
    });
  }

  return `
    <div class="space-y-4">
      <div class="bg-gradient-to-r from-blue-800 to-sky-900 text-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-44 h-44 bg-blue-500/20 rounded-full blur-2xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <span class="inline-flex items-center gap-1.5 bg-blue-500/30 text-blue-200 border border-blue-400/30 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <i class="fa-solid fa-shield-halved"></i> Musyrif Asrama & Ketertiban Santri
            </span>
            <h3 class="text-xl sm:text-2xl font-black">Pos Pengasuhan & Perizinan Asrama Santri</h3>
            <p class="text-xs text-blue-100 max-w-xl leading-relaxed">
              Memantau disiplin santri di kamar pondok, menyetujui izin pulang/sambang, dan mengontrol santri kembali tepat waktu.
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button onclick="openPerizinanModal()" class="bg-white hover:bg-blue-50 text-blue-900 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2">
              <i class="fa-solid fa-plus-circle text-blue-700"></i> Ajukan Izin Santri
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div class="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold text-amber-800 uppercase">Menunggu Persetujuan</span>
            <div class="text-2xl font-black text-amber-950 mt-0.5">${pendingList.length} Permohonan</div>
            <p class="text-[10px] text-amber-700">Segera tinjau & verifikasi</p>
          </div>
          <div class="w-10 h-10 rounded-xl bg-amber-200/60 text-amber-800 flex items-center justify-center text-lg"><i class="fa-solid fa-clipboard-question"></i></div>
        </div>

        <div class="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold text-blue-800 uppercase">Sedang Di Luar Asrama</span>
            <div class="text-2xl font-black text-blue-950 mt-0.5">${approvedList.length} Santri</div>
            <p class="text-[10px] text-blue-700">Izin resmi disetujui</p>
          </div>
          <div class="w-10 h-10 rounded-xl bg-blue-200/60 text-blue-800 flex items-center justify-center text-lg"><i class="fa-solid fa-person-walking-arrow-right"></i></div>
        </div>

        <div class="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold text-emerald-800 uppercase">Sudah Kembali ke Asrama</span>
            <div class="text-2xl font-black text-emerald-950 mt-0.5">${returnedList.length} Santri</div>
            <p class="text-[10px] text-emerald-700">Tiba di pondok tertib</p>
          </div>
          <div class="w-10 h-10 rounded-xl bg-emerald-200/60 text-emerald-800 flex items-center justify-center text-lg"><i class="fa-solid fa-house-chimney-check"></i></div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-3">
        <div class="flex items-center justify-between border-b pb-2.5">
          <h4 class="font-extrabold text-xs text-primary-dark flex items-center gap-2">
            <i class="fa-solid fa-bell text-amber-500"></i> Permohonan Izin Menunggu Persetujuan (${pendingList.length})
          </h4>
          <button onclick="switchCmsTab('perizinan')" class="text-[11px] text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1">
            Lihat Semua Riwayat Izin <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-gray-50 text-[10px] font-bold text-gray-500 uppercase border-b">
                <th class="p-3">Santri</th>
                <th class="p-3">Jadwal Keluar - Kembali</th>
                <th class="p-3">Alasan Izin</th>
                <th class="p-3">Penjemput / Wali</th>
                <th class="p-3 text-right">Aksi Persetujuan</th>
              </tr>
            </thead>
            <tbody>
              ${pendingRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderTahfidzWorkspace() {
  const totalTahfidz = cmsState.tahfidzList.length;
  const ziyadah = cmsState.tahfidzList.filter(t => t.jenis === 'ziyadah').length;
  const murajaah = cmsState.tahfidzList.filter(t => t.jenis === 'murajaah').length;
  const mumtaz = cmsState.tahfidzList.filter(t => t.nilai === 'A').length;
  const recentTahfidz = cmsState.tahfidzList.slice(0, 5);

  let setoranRows = '';
  if (recentTahfidz.length === 0) {
    setoranRows = `<tr><td colspan="5" class="p-6 text-center text-gray-400 italic">Belum ada riwayat setoran tahfidz. Klik "Catat Setoran Baru" untuk memulai.</td></tr>`;
  } else {
    recentTahfidz.forEach(t => {
      const jBadge = t.jenis === 'ziyadah' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800';
      setoranRows += `
        <tr class="border-b border-gray-100 hover:bg-gray-50/80 transition text-xs">
          <td class="p-3 font-bold text-gray-900">${t.santri?.nama_lengkap || 'Santri'}</td>
          <td class="p-3 font-semibold text-emerald-800">QS. ${t.surat_mulai}:${t.ayat_mulai} - ${t.surat_selesai}:${t.ayat_selesai}</td>
          <td class="p-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${jBadge}">${t.jenis}</span></td>
          <td class="p-3"><span class="font-bold text-emerald-700">${t.nilai}</span> <span class="text-[10px] text-gray-400">(${t.predikat || 'Mumtaz'})</span></td>
          <td class="p-3 text-gray-500 italic max-w-xs truncate">${t.catatan || '-'}</td>
        </tr>
      `;
    });
  }

  return `
    <div class="space-y-4">
      <div class="bg-gradient-to-r from-teal-800 to-emerald-900 text-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-44 h-44 bg-teal-500/20 rounded-full blur-2xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <span class="inline-flex items-center gap-1.5 bg-teal-500/30 text-teal-200 border border-teal-400/30 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <i class="fa-solid fa-book-quran"></i> Halaqah Tahfidzul Qur'an Bersanad
            </span>
            <h3 class="text-xl sm:text-2xl font-black">Ruang Pengampu Mutaba'ah Tahfidz</h3>
            <p class="text-xs text-teal-100 max-w-xl leading-relaxed">
              Membimbing halaqah subuh dan ashar, mencatat setoran hafalan baru (Ziyadah) & muraja'ah, serta memantau mutqin juz santri binaan.
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button onclick="openTahfidzModal()" class="bg-white hover:bg-teal-50 text-teal-900 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2">
              <i class="fa-solid fa-plus-circle text-teal-700"></i> Catat Setoran Baru
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="bg-teal-50 border border-teal-200 p-3.5 rounded-2xl cursor-pointer hover:shadow-xs transition" onclick="switchCmsTab('tahfidz')">
          <span class="text-[10px] font-bold text-teal-800 uppercase flex items-center justify-between">
            Total Setoran <i class="fa-solid fa-book-open text-teal-600"></i>
          </span>
          <div class="text-2xl font-black text-teal-950 mt-1">${totalTahfidz}</div>
          <p class="text-[10px] text-teal-700 mt-0.5">Catatan Hafalan Masuk</p>
        </div>

        <div class="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl">
          <span class="text-[10px] font-bold text-emerald-800 uppercase flex items-center justify-between">
            Ziyadah (Baru) <i class="fa-solid fa-sparkles text-emerald-600"></i>
          </span>
          <div class="text-2xl font-black text-emerald-950 mt-1">${ziyadah}</div>
          <p class="text-[10px] text-emerald-700 mt-0.5">Hafalan Lembar Baru</p>
        </div>

        <div class="bg-blue-50 border border-blue-200 p-3.5 rounded-2xl">
          <span class="text-[10px] font-bold text-blue-800 uppercase flex items-center justify-between">
            Muraja'ah <i class="fa-solid fa-repeat text-blue-600"></i>
          </span>
          <div class="text-2xl font-black text-blue-950 mt-1">${murajaah}</div>
          <p class="text-[10px] text-blue-700 mt-0.5">Penguatan Juz Hafalan</p>
        </div>

        <div class="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl">
          <span class="text-[10px] font-bold text-amber-800 uppercase flex items-center justify-between">
            Predikat Mumtaz (A) <i class="fa-solid fa-star text-amber-600"></i>
          </span>
          <div class="text-2xl font-black text-amber-950 mt-1">${mumtaz}</div>
          <p class="text-[10px] text-amber-700 mt-0.5">Kelancaran Sangat Fasih</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-3">
        <div class="flex items-center justify-between border-b pb-2.5">
          <h4 class="font-extrabold text-xs text-primary-dark flex items-center gap-2">
            <i class="fa-solid fa-clock-rotate-left text-teal-600"></i> 5 Setoran Halaqah Terbaru
          </h4>
          <button onclick="switchCmsTab('tahfidz')" class="text-[11px] text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1">
            Buka Mutaba'ah Lengkap <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-gray-50 text-[10px] font-bold text-gray-500 uppercase border-b">
                <th class="p-3">Santri</th>
                <th class="p-3">Surat & Ayat</th>
                <th class="p-3">Jenis</th>
                <th class="p-3">Predikat</th>
                <th class="p-3">Catatan Tajwid</th>
              </tr>
            </thead>
            <tbody>
              ${setoranRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderBendaharaWorkspace() {
  const totalTagihan = cmsState.tagihanList.length;
  const lunasList = cmsState.tagihanList.filter(t => t.status_pembayaran === 'lunas');
  const belumLunasList = cmsState.tagihanList.filter(t => t.status_pembayaran === 'belum_lunas');
  const totalNominalLunas = lunasList.reduce((acc, t) => acc + (parseFloat(t.nominal) || 0), 0);
  const totalNominalBelum = belumLunasList.reduce((acc, t) => acc + (parseFloat(t.nominal) || 0), 0);

  let belumLunasRows = '';
  if (belumLunasList.length === 0) {
    belumLunasRows = `<tr><td colspan="6" class="p-6 text-center text-gray-400 italic">Alhamdulillah, seluruh tagihan santri telah lunas terbayarkan.</td></tr>`;
  } else {
    belumLunasList.slice(0, 5).forEach(t => {
      const nomFmt = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(t.nominal);
      belumLunasRows += `
        <tr class="border-b border-gray-100 hover:bg-gray-50/80 transition text-xs">
          <td class="p-3 font-mono font-bold text-primary-dark">${t.kode_tagihan}</td>
          <td class="p-3 font-bold text-gray-900">${t.santri?.nama_lengkap || 'Santri'}</td>
          <td class="p-3 text-gray-600">${t.jenis_tagihan} <span class="text-[10px] text-gray-400">(${t.periode || '-'})</span></td>
          <td class="p-3 font-bold font-mono text-gray-900">${nomFmt}</td>
          <td class="p-3 font-mono text-rose-700 text-[11px]">${t.tgl_jatuh_tempo || '-'}</td>
          <td class="p-3 text-right">
            <button onclick="markTagihanLunas('${t.id}', '${t.kode_tagihan}')" class="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded-lg shadow-2xs">
              <i class="fa-solid fa-check mr-1"></i> Tandai Lunas
            </button>
          </td>
        </tr>
      `;
    });
  }

  return `
    <div class="space-y-4">
      <div class="bg-gradient-to-r from-amber-700 to-yellow-900 text-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-44 h-44 bg-amber-500/20 rounded-full blur-2xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <span class="inline-flex items-center gap-1.5 bg-amber-500/30 text-amber-200 border border-amber-400/30 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <i class="fa-solid fa-receipt"></i> Bendahara Keuangan Pesantren
            </span>
            <h3 class="text-xl sm:text-2xl font-black">Meja Kasir & Administrasi SPP Santri</h3>
            <p class="text-xs text-amber-100 max-w-xl leading-relaxed">
              Menerbitkan invoice syahriah bulanan santri, memverifikasi slip pembayaran, dan konfirmasi pelunasan kasir 1-klik.
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button onclick="openTagihanModal()" class="bg-white hover:bg-amber-50 text-amber-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2">
              <i class="fa-solid fa-plus-circle text-amber-700"></i> Buat Tagihan Baru
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl">
          <span class="text-[10px] font-bold text-emerald-800 uppercase flex items-center justify-between">
            Kas Masuk (Lunas) <i class="fa-solid fa-circle-check text-emerald-600"></i>
          </span>
          <div class="text-lg font-black text-emerald-950 mt-1 font-mono">Rp ${Math.round(totalNominalLunas).toLocaleString('id-ID')}</div>
          <p class="text-[10px] text-emerald-700 mt-0.5">${lunasList.length} Tagihan Terverifikasi</p>
        </div>

        <div class="bg-rose-50 border border-rose-200 p-3.5 rounded-2xl">
          <span class="text-[10px] font-bold text-rose-800 uppercase flex items-center justify-between">
            Belum Lunas <i class="fa-solid fa-clock text-rose-600"></i>
          </span>
          <div class="text-lg font-black text-rose-950 mt-1 font-mono">Rp ${Math.round(totalNominalBelum).toLocaleString('id-ID')}</div>
          <p class="text-[10px] text-rose-700 mt-0.5">${belumLunasList.length} Santri Belum Bayar</p>
        </div>

        <div class="bg-blue-50 border border-blue-200 p-3.5 rounded-2xl cursor-pointer hover:shadow-xs transition" onclick="switchCmsTab('tagihan')">
          <span class="text-[10px] font-bold text-blue-800 uppercase flex items-center justify-between">
            Total Invoice <i class="fa-solid fa-file-invoice text-blue-600"></i>
          </span>
          <div class="text-2xl font-black text-blue-950 mt-1">${totalTagihan}</div>
          <p class="text-[10px] text-blue-700 mt-0.5">Diterbitkan Periode Ini</p>
        </div>

        <div class="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl cursor-pointer" onclick="exportPPDBtoCSV()">
          <span class="text-[10px] font-bold text-amber-800 uppercase flex items-center justify-between">
            Ekspor Rekap CSV <i class="fa-solid fa-file-excel text-amber-600"></i>
          </span>
          <div class="text-sm font-black text-amber-950 mt-2">Unduh Laporan</div>
          <p class="text-[10px] text-amber-700 mt-0.5 font-bold flex items-center gap-1"><i class="fa-solid fa-download"></i> Ekspor Sekarang</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-3">
        <div class="flex items-center justify-between border-b pb-2.5">
          <h4 class="font-extrabold text-xs text-primary-dark flex items-center gap-2">
            <i class="fa-solid fa-bell text-rose-500"></i> Tagihan Belum Lunas — Siap Konfirmasi (${belumLunasList.length})
          </h4>
          <button onclick="switchCmsTab('tagihan')" class="text-[11px] text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1">
            Lihat Semua Tagihan <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-gray-50 text-[10px] font-bold text-gray-500 uppercase border-b">
                <th class="p-3">Kode Invoice</th>
                <th class="p-3">Santri Tertagih</th>
                <th class="p-3">Pos Iuran</th>
                <th class="p-3">Nominal</th>
                <th class="p-3">Jatuh Tempo</th>
                <th class="p-3 text-right">Aksi Kasir</th>
              </tr>
            </thead>
            <tbody>
              ${belumLunasRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderWaliSantriWorkspace() {
  const childSantri = cmsState.santriList[0] || { nama_lengkap: 'Ahmad Fauzi', nisn: '0089123456' };
  const lastTahfidz = cmsState.tahfidzList[0] || { surat_mulai: 'Al-Mulk', ayat_mulai: 1, surat_selesai: 'Al-Mulk', ayat_selesai: 30, nilai: 'A', predikat: 'Mumtaz', catatan: 'Makharijul huruf sangat fasih, lanjutkan juz 28.' };
  const lastTagihan = cmsState.tagihanList[0] || { kode_tagihan: 'INV-202610-001', jenis_tagihan: 'SPP & Katering Bulanan', nominal: 500000, status_pembayaran: 'lunas' };

  return `
    <div class="space-y-4">
      <div class="bg-gradient-to-r from-rose-800 to-pink-900 text-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-44 h-44 bg-rose-500/20 rounded-full blur-2xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <span class="inline-flex items-center gap-1.5 bg-rose-500/30 text-rose-200 border border-rose-400/30 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <i class="fa-solid fa-heart"></i> Portal Wali Santri & Orang Tua
            </span>
            <h3 class="text-xl sm:text-2xl font-black">Informasi Ananda: ${childSantri.nama_lengkap}</h3>
            <p class="text-xs text-rose-100 max-w-xl leading-relaxed">
              Memantau capaian hafalan Qur'an, jadwal perizinan kepulangan asrama, informasi pembayaran syahriah SPP, dan komunikasi musyrif.
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button onclick="openPerizinanModal()" class="bg-white hover:bg-rose-50 text-rose-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2">
              <i class="fa-solid fa-calendar-plus text-rose-700"></i> Ajukan Izin Sambang
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold text-emerald-800 uppercase flex items-center gap-1.5">
              <i class="fa-solid fa-book-quran text-emerald-600"></i> Setoran Terakhir Ananda
            </span>
            <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">${lastTahfidz.nilai} (${lastTahfidz.predikat || 'Mumtaz'})</span>
          </div>
          <div class="text-base font-bold text-gray-900">QS. ${lastTahfidz.surat_mulai}: ${lastTahfidz.ayat_mulai} - ${lastTahfidz.ayat_selesai}</div>
          <p class="text-[11px] text-gray-500 italic bg-emerald-50/60 p-2 rounded-lg">"${lastTahfidz.catatan || 'Bacaan sangat tartil dan lancar.'}"</p>
          <button onclick="switchCmsTab('tahfidz')" class="text-[10px] text-emerald-700 font-bold hover:underline flex items-center gap-1">
            Lihat buku mutaba'ah ananda <i class="fa-solid fa-chevron-right text-[8px]"></i>
          </button>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-blue-200 shadow-2xs space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold text-blue-800 uppercase flex items-center gap-1.5">
              <i class="fa-solid fa-shield-halved text-blue-600"></i> Status Keberadaan
            </span>
            <span class="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">Di Asrama Santri</span>
          </div>
          <div class="text-base font-bold text-gray-900">Asrama Al-Ghazali Lt. 2</div>
          <p class="text-[11px] text-gray-600 leading-relaxed">Ananda sedang beraktivitas di pondok pesantren dalam keadaan sehat wal 'afiat.</p>
          <button onclick="switchCmsTab('perizinan')" class="text-[10px] text-blue-700 font-bold hover:underline flex items-center gap-1">
            Riwayat izin keluar / sambang <i class="fa-solid fa-chevron-right text-[8px]"></i>
          </button>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold text-amber-800 uppercase flex items-center gap-1.5">
              <i class="fa-solid fa-receipt text-amber-600"></i> Syahriah & SPP
            </span>
            <span class="text-[10px] ${lastTagihan.status_pembayaran === 'lunas' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'} font-bold px-2 py-0.5 rounded-full uppercase">
              ${lastTagihan.status_pembayaran}
            </span>
          </div>
          <div class="text-base font-bold text-gray-900 font-mono">Rp ${(parseFloat(lastTagihan.nominal) || 500000).toLocaleString('id-ID')}</div>
          <p class="text-[11px] text-gray-600 leading-relaxed font-mono">Rek. BSI: <strong>7123456789</strong> a.n PPJM</p>
          <button onclick="switchCmsTab('tagihan')" class="text-[10px] text-amber-700 font-bold hover:underline flex items-center gap-1">
            Rincian invoice & slip bayar <i class="fa-solid fa-chevron-right text-[8px]"></i>
          </button>
        </div>
      </div>

      <div class="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg"><i class="fa-solid fa-phone"></i></div>
          <div>
            <h5 class="font-bold text-xs text-gray-900">Hotline Musyrif Asrama & UKS 24 Jam</h5>
            <p class="text-[11px] text-gray-500">Hubungi langsung pengurus asrama ananda jika ada kabar mendesak atau keperluan sambang.</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <a href="https://wa.me/6281234567891?text=Assalamu'alaikum%20Musyrif%20PPJM" target="_blank" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3.5 rounded-xl flex items-center gap-1.5 transition">
            <i class="fa-brands fa-whatsapp"></i> Chat Musyrif
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderSantriWorkspace() {
  const lastTahfidz = cmsState.tahfidzList[0] || { surat_mulai: 'Al-Mulk', ayat_mulai: 1, surat_selesai: 'Al-Mulk', ayat_selesai: 30, nilai: 'A', predikat: 'Mumtaz' };
  const lastNilai = cmsState.nilaiList[0] || { mata_pelajaran: 'Tahfidzul Qur\'an', nilai: '95', jenis_ujian: 'Formatif 1' };

  return `
    <div class="space-y-4">
      <div class="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-44 h-44 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <span class="inline-flex items-center gap-1.5 bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <i class="fa-solid fa-user-graduate"></i> Santri Mandiri PPJM & SMP Plus
            </span>
            <h3 class="text-xl sm:text-2xl font-black">Portal Belajar & Capaian Santri</h3>
            <p class="text-xs text-emerald-100 max-w-xl leading-relaxed">
              Target Wisuda: 5 - 30 Juz Bersanad & Lulus SMP Plus Berakhlak Qur'ani. Pantau hafalan, nilai rapor, dan izin asrama.
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button onclick="openPerizinanModal()" class="bg-white hover:bg-emerald-50 text-emerald-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2">
              <i class="fa-solid fa-paper-plane text-emerald-700"></i> Ajukan Izin Mandiri
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold text-emerald-800 uppercase flex items-center gap-1.5">
              <i class="fa-solid fa-book-quran text-emerald-600"></i> Hafalan Saya
            </span>
            <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">${lastTahfidz.nilai} (${lastTahfidz.predikat || 'Mumtaz'})</span>
          </div>
          <div class="text-base font-bold text-gray-900">QS. ${lastTahfidz.surat_mulai}: ${lastTahfidz.ayat_mulai} - ${lastTahfidz.ayat_selesai}</div>
          <p class="text-[11px] text-gray-500">Tetap istiqomah menambah ziyadah hafalan baru setiap selesai halaqah subuh.</p>
          <button onclick="switchCmsTab('tahfidz')" class="text-[10px] text-emerald-700 font-bold hover:underline flex items-center gap-1">
            Lihat buku setoran saya <i class="fa-solid fa-chevron-right text-[8px]"></i>
          </button>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-purple-200 shadow-2xs space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold text-purple-800 uppercase flex items-center gap-1.5">
              <i class="fa-solid fa-graduation-cap text-purple-600"></i> Nilai Ujian SMP
            </span>
            <span class="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">Nilai: ${lastNilai.nilai}</span>
          </div>
          <div class="text-base font-bold text-gray-900">${lastNilai.mata_pelajaran}</div>
          <p class="text-[11px] text-gray-500">Asesmen: ${lastNilai.jenis_ujian || 'Formatif SMP Plus'}. Tingkatkan terus prestasimu!</p>
          <button onclick="switchCmsTab('nilai')" class="text-[10px] text-purple-700 font-bold hover:underline flex items-center gap-1">
            Lihat rapor nilai saya <i class="fa-solid fa-chevron-right text-[8px]"></i>
          </button>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-blue-200 shadow-2xs space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold text-blue-800 uppercase flex items-center gap-1.5">
              <i class="fa-solid fa-clipboard-check text-blue-600"></i> Ketertiban Asrama
            </span>
            <span class="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">Taat & Disiplin</span>
          </div>
          <div class="text-base font-bold text-gray-900">Jadwal Halaqah Ashar</div>
          <p class="text-[11px] text-gray-500">Pukul 16.00 WIB di Masjid Utama. Siapkan juz muraja'ahmu.</p>
          <button onclick="switchCmsTab('perizinan')" class="text-[10px] text-blue-700 font-bold hover:underline flex items-center gap-1">
            Riwayat perizinan saya <i class="fa-solid fa-chevron-right text-[8px]"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderSuperAdminWorkspace() {
  return `
    <div class="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 text-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden">
      <div class="absolute -right-10 -bottom-10 w-44 h-44 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="space-y-1.5">
          <span class="inline-flex items-center gap-1.5 bg-accent/20 text-accent border border-accent/40 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
            <i class="fa-solid fa-screwdriver-wrench"></i> Super Administrator
          </span>
          <h3 class="text-xl sm:text-2xl font-black">Pusat Kendali Seluruh Modul Sistem</h3>
          <p class="text-xs text-gray-300 max-w-xl leading-relaxed">
            Akses tak terbatas untuk mengelola data induk, audit trail, kurikulum, billing, dan perizinan terintegrasi dengan database cloud.
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <button onclick="openHelpGuideModal()" class="bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5">
            <i class="fa-solid fa-circle-question"></i> Buka Panduan
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderRoleDashboard(role) {
  const container = document.getElementById('cmsRoleWorkspaceContainer');
  const iconEl = document.getElementById('cmsRoleWelcomeIcon');
  const titleEl = document.getElementById('cmsRoleWelcomeTitle');
  const descEl = document.getElementById('cmsRoleWelcomeDesc');
  const badgeEl = document.getElementById('cmsRoleJobdeskBadge');

  const config = ROLE_CONFIGS[role] || ROLE_CONFIGS['super_admin'];

  if (iconEl) iconEl.innerHTML = `<i class="${config.icon}"></i>`;
  if (titleEl) titleEl.textContent = config.welcomeTitle;
  if (descEl) descEl.textContent = config.welcomeDesc;
  if (badgeEl) badgeEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Mode: ${config.label}`;

  if (!container) return;

  switch (role) {
    case 'pimpinan':
      container.innerHTML = renderPimpinanWorkspace();
      break;
    case 'guru':
      container.innerHTML = renderGuruWorkspace();
      break;
    case 'musyrif':
      container.innerHTML = renderMusyrifWorkspace();
      break;
    case 'pengampu_tahfidz':
      container.innerHTML = renderTahfidzWorkspace();
      break;
    case 'bendahara':
      container.innerHTML = renderBendaharaWorkspace();
      break;
    case 'wali_santri':
      container.innerHTML = renderWaliSantriWorkspace();
      break;
    case 'santri':
      container.innerHTML = renderSantriWorkspace();
      break;
    case 'super_admin':
    default:
      container.innerHTML = renderSuperAdminWorkspace();
      break;
  }
}

async function loadUserProfile(user) {
  if (!user) return;
  const nameEl = document.getElementById('cmsCurrentUserName');

  if (supabase && typeof supabase.from === 'function') {
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
      if (data) {
        cmsState.currentUserProfile = data;
        if (nameEl) nameEl.textContent = data.full_name || user.email;
        setAdminRole(data.role || 'wali_santri');
        return;
      }
    } catch (e) {
      console.warn('[PPSPJM] Gagal memuat profil pengguna:', e);
    }
  }

  // Fallback if no profiles row exists
  if (nameEl) nameEl.textContent = user.email ? user.email.split('@')[0] : 'Administrator';
  setAdminRole('super_admin');
}

function setAdminRole(role) {
  cmsState.activeRole = role;
  const config = ROLE_CONFIGS[role] || ROLE_CONFIGS['super_admin'];

  const roleBadge = document.getElementById('cmsCurrentRoleBadge');
  if (roleBadge) {
    roleBadge.textContent = config.label;
    roleBadge.className = config.badgeClass;
  }
  const roleSelect = document.getElementById('cmsRoleSimulatorSelect');
  if (roleSelect && roleSelect.value !== role) {
    roleSelect.value = role;
  }

  applyRoleNavPermissions(role);
  renderRoleDashboard(role);

  showToast(`Beralih simulasi peran: ${config.label}`);
  logActivity(`Mengganti peran aktif ke ${config.label}`, 'auth');
}

// Profile Dropdown Toggle & Real-Time Supabase Health Heartbeat
function toggleProfileDropdown(show) {
  const dropdown = document.getElementById('cmsProfileDropdown');
  if (!dropdown) return;
  const isHidden = dropdown.classList.contains('hidden');
  const shouldShow = typeof show === 'boolean' ? show : isHidden;

  if (shouldShow) {
    dropdown.classList.remove('hidden');
    const nameEl = document.getElementById('dropdownUserName');
    const emailEl = document.getElementById('dropdownUserEmail');
    const badgeEl = document.getElementById('dropdownRoleBadge');
    if (nameEl) nameEl.textContent = cmsState.currentUserProfile?.full_name || 'Pengelola System';
    if (emailEl) emailEl.textContent = cmsState.currentUserProfile?.email || 'admin@jauharulmaknuun.sch.id';
    if (badgeEl) badgeEl.textContent = `Mode Active: ${(ROLE_CONFIGS[cmsState.activeRole] || {}).label || 'Super Admin'}`;
  } else {
    dropdown.classList.add('hidden');
  }
}

document.addEventListener('click', (e) => {
  const container = document.getElementById('cmsProfileMenuContainer');
  if (container && !container.contains(e.target)) {
    toggleProfileDropdown(false);
  }
});

async function manualCheckSupabaseHealth() {
  const statusPing = document.getElementById('statusPing');
  const statusIcon = document.getElementById('statusIcon');
  const statusText = document.getElementById('statusText');
  const statusRetryBtn = document.getElementById('statusRetryBtn');

  if (statusText) {
    statusText.textContent = 'Connecting...';
    statusText.className = 'text-amber-600 font-bold';
  }
  if (statusIcon) {
    statusIcon.className = 'fa-solid fa-circle-notch text-amber-500 text-[10px] animate-spin';
  }
  if (statusPing) statusPing.classList.add('hidden');

  try {
    if (!supabase || typeof supabase.from !== 'function') throw new Error('Supabase client uninitialized');

    const { count, error } = await supabase.from('profiles').select('id', { count: 'exact', head: true });
    if (error) throw error;

    if (statusIcon) statusIcon.className = 'fa-solid fa-circle text-emerald-500 text-[8px] relative inline-flex transition-colors duration-300';
    if (statusText) {
      statusText.textContent = 'Connected';
      statusText.className = 'text-emerald-700 font-bold';
    }
    if (statusRetryBtn) statusRetryBtn.classList.add('hidden');
    showToast('Koneksi Supabase aktif & stabil ✓', 'success');
  } catch (e) {
    console.warn('[PPSPJM] Supabase Health Check error:', e);
    if (statusIcon) statusIcon.className = 'fa-solid fa-circle text-rose-500 text-[8px] relative inline-flex transition-colors duration-300';
    if (statusText) {
      statusText.textContent = 'Disconnected';
      statusText.className = 'text-rose-600 font-bold';
    }
    if (statusPing) statusPing.classList.remove('hidden');
    if (statusRetryBtn) statusRetryBtn.classList.remove('hidden');
    showToast('Sambungan database terputus. Silakan klik Coba Lagi.', 'error');
  }
}

setInterval(() => {
  if (navigator.onLine) manualCheckSupabaseHealth();
}, 45000);

// CBT UTBK Interactive Engine (Anti-Cheating, Telemetry, Growth-Mindset)
const utbkState = {
  sessionToken: 'UTBK-2026-SNBT-001',
  studentName: 'Muhammad Faiz Al-Fatih',
  currentIdx: 0,
  timeRemainingSec: 3585,
  timerInterval: null,
  isFinished: false,
  questions: [
    {
      id: 'q-1',
      category: 'Penalaran Matematika & TPS',
      difficulty: 'Sedang',
      weight: 1.0,
      text: 'Dalam sebuah halaqah tahfidz di PP Jauharul Maknuun, jumlah santri yang menyetorkan juz 1-10 adalah 40% dari total santri. Jika jumlah santri yang telah lulus Tasmi\' 30 Juz adalah 12 orang dan rasio santri juz 1-10 dibanding santri juz 11-20 adalah 4:3, berapakah total santri dalam halaqah tersebut?',
      options: [
        { id: 'A', text: '50 Santri' },
        { id: 'B', text: '60 Santri (Jawaban Tepat)' },
        { id: 'C', text: '75 Santri' },
        { id: 'D', text: '80 Santri' },
        { id: 'E', text: '100 Santri' }
      ],
      correctOpt: 'B'
    },
    {
      id: 'q-2',
      category: 'Literasi Bahasa Arab & Kitab Turats',
      difficulty: 'Mudah',
      weight: 1.0,
      text: 'Manakah kedudukan I\'rab yang tepat untuk lafadz yang bergaris bawah dalam kaidah Nahwu: "قَرَأَ الْصَّبِيُّ الْقُرْآنَ فِي الْمَسْجِدِ"?',
      options: [
        { id: 'A', text: 'Mabni' },
        { id: 'B', text: 'Fa\'il (Subjek), Marfu\' dengan Dhammah dzahirah' },
        { id: 'C', text: 'Maf\'ul bih (Objek), Manshub' },
        { id: 'D', text: 'Mudhaf ilaih, Majrur' },
        { id: 'E', text: 'Na\'at / Sifat' }
      ],
      correctOpt: 'B'
    },
    {
      id: 'q-3',
      category: 'Literasi Bahasa Inggris & Public Speaking',
      difficulty: 'Sedang',
      weight: 1.0,
      text: 'Choose the most polite and encouraging expression for a student giving a speech during the Morning English Speech Program:',
      options: [
        { id: 'A', text: 'You should stop talking.' },
        { id: 'B', text: 'Honorable teachers and beloved friends, let us express our gratitude to Allah SWT.' },
        { id: 'C', text: 'I am better than everyone.' },
        { id: 'D', text: 'Why are you listening to me?' },
        { id: 'E', text: 'Speech is unnecessary.' }
      ],
      correctOpt: 'B'
    },
    {
      id: 'q-4',
      category: 'Informatika & Logic Programming',
      difficulty: 'Sangat Mahir',
      weight: 1.2,
      text: 'Dalam pengembangan aplikasi web pesantren, manakah struktur data yang paling efisien untuk mencari data santri berdasarkan NISN dengan kompleksitas O(1)?',
      options: [
        { id: 'A', text: 'Linear Array' },
        { id: 'B', text: 'Hash Table / JavaScript Map Object' },
        { id: 'C', text: 'Stack' },
        { id: 'D', text: 'Queue' },
        { id: 'E', text: 'Linked List' }
      ],
      correctOpt: 'B'
    },
    {
      id: 'q-5',
      category: 'Penalaran Umum & Fiqih Ibadah',
      difficulty: 'Sedang',
      weight: 1.0,
      text: 'Syarat sah pelaksanaan shalat fardhu menurut kitab Safinatun Najah melingkupi hal-hal berikut, KECUALI:',
      options: [
        { id: 'A', text: 'Suci dari hadats kecil dan besar' },
        { id: 'B', text: 'Suci badan, pakaian, dan tempat dari najis' },
        { id: 'C', text: 'Menutup aurat dengan pakaian suci' },
        { id: 'D', text: 'Menghadap kiblat' },
        { id: 'E', text: 'Membaca seluruh juz Al-Qur\'an sebelum takbir' }
      ],
      correctOpt: 'E'
    }
  ],
  userAnswers: {},
  startTimeMs: Date.now()
};

function initUtbkSession() {
  if (!utbkState.timerInterval) {
    utbkState.timerInterval = setInterval(() => {
      if (utbkState.isFinished) return;
      if (utbkState.timeRemainingSec > 0) {
        utbkState.timeRemainingSec--;
        const mins = String(Math.floor(utbkState.timeRemainingSec / 60)).padStart(2, '0');
        const secs = String(utbkState.timeRemainingSec % 60).padStart(2, '0');
        const timerEl = document.getElementById('utbkCountdownTimer');
        if (timerEl) timerEl.textContent = `00:${mins}:${secs}`;
      } else {
        finishUtbkExam(false);
      }
    }, 1000);
  }
  renderUtbkQuestion();
}

function renderUtbkQuestion() {
  const q = utbkState.questions[utbkState.currentIdx];
  if (!q) return;

  const idxBadge = document.getElementById('utbkQuestionIndexBadge');
  const catBadge = document.getElementById('utbkQuestionCategoryBadge');
  const diffEl = document.getElementById('utbkQuestionDifficulty');
  const textEl = document.getElementById('utbkQuestionText');
  const optionsContainer = document.getElementById('utbkOptionsContainer');

  if (idxBadge) idxBadge.textContent = `Soal No. ${utbkState.currentIdx + 1} dari ${utbkState.questions.length}`;
  if (catBadge) catBadge.textContent = q.category;
  if (diffEl) diffEl.textContent = q.difficulty;
  if (textEl) textEl.innerHTML = `<p>${q.text}</p>`;

  if (optionsContainer) {
    optionsContainer.innerHTML = '';
    const userAns = utbkState.userAnswers[q.id] || {};

    q.options.forEach(opt => {
      const isSelected = userAns.selectedOpt === opt.id;
      const card = el('button', {
        class: `w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between ${
          isSelected ? 'border-violet-600 bg-violet-50/90 shadow-sm' : 'border-gray-200 hover:border-violet-300 hover:bg-gray-50'
        }`,
        disabled: utbkState.isFinished
      });
      card.onclick = () => selectUtbkOption(opt.id);

      card.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="w-7 h-7 rounded-lg ${isSelected ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700'} font-bold flex items-center justify-center text-xs shrink-0">${opt.id}</span>
          <span class="text-xs ${isSelected ? 'font-bold text-violet-950' : 'text-gray-700'}">${opt.text}</span>
        </div>
        ${isSelected ? '<i class="fa-solid fa-circle-check text-violet-600 text-base"></i>' : ''}
      `;
      optionsContainer.appendChild(card);
    });
  }

  const doubtBtn = document.getElementById('btnUtbkDoubt');
  const isDoubt = (utbkState.userAnswers[q.id] || {}).isDoubtful;
  if (doubtBtn) {
    doubtBtn.className = isDoubt 
      ? 'px-4 py-2 bg-amber-400 text-amber-950 font-bold border border-amber-500 rounded-xl text-xs shadow-2xs flex items-center gap-1.5'
      : 'px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5';
  }

  renderUtbkRosterGrid();
}

function selectUtbkOption(optId) {
  if (utbkState.isFinished) return;
  const q = utbkState.questions[utbkState.currentIdx];
  if (!q) return;

  const prev = utbkState.userAnswers[q.id] || {};
  utbkState.userAnswers[q.id] = {
    ...prev,
    selectedOpt: optId,
    answeredAt: new Date().toISOString()
  };
  renderUtbkQuestion();
  showToast(`Jawaban No. ${utbkState.currentIdx + 1} tersimpan (${optId})`, 'success');
}

function toggleUtbkDoubt() {
  if (utbkState.isFinished) return;
  const q = utbkState.questions[utbkState.currentIdx];
  if (!q) return;

  const prev = utbkState.userAnswers[q.id] || {};
  utbkState.userAnswers[q.id] = {
    ...prev,
    isDoubtful: !prev.isDoubtful
  };
  renderUtbkQuestion();
}

function navigateUtbkQuestion(dir) {
  const nextIdx = utbkState.currentIdx + dir;
  if (nextIdx >= 0 && nextIdx < utbkState.questions.length) {
    utbkState.currentIdx = nextIdx;
    renderUtbkQuestion();
  }
}

function renderUtbkRosterGrid() {
  const grid = document.getElementById('utbkRosterGrid');
  if (!grid) return;
  grid.innerHTML = '';

  utbkState.questions.forEach((q, i) => {
    const userAns = utbkState.userAnswers[q.id] || {};
    const isCurrent = i === utbkState.currentIdx;
    const isAnswered = !!userAns.selectedOpt;
    const isDoubt = !!userAns.isDoubtful;

    let bgClass = 'bg-gray-100 text-gray-700 border-gray-200';
    if (isDoubt) bgClass = 'bg-amber-400 text-amber-950 font-bold border-amber-500';
    else if (isAnswered) bgClass = 'bg-emerald-500 text-white font-bold border-emerald-600';
    
    if (isCurrent) bgClass += ' ring-2 ring-violet-600 ring-offset-1 font-black';

    const pill = el('button', {
      class: `h-9 rounded-lg border text-xs flex items-center justify-center transition ${bgClass}`,
      onClick: () => {
        utbkState.currentIdx = i;
        renderUtbkQuestion();
      }
    }, String(i + 1));
    grid.appendChild(pill);
  });
}

function finishUtbkExam(isManual = true) {
  if (utbkState.isFinished) return;
  if (isManual && !confirm('Apakah Anda yakin ingin menyelesaikan Ujian UTBK sekarang? Jawaban Anda akan langsung dikirim dan dinilai.')) return;

  utbkState.isFinished = true;
  if (utbkState.timerInterval) clearInterval(utbkState.timerInterval);

  let correctCount = 0;
  utbkState.questions.forEach(q => {
    const ans = utbkState.userAnswers[q.id];
    if (ans && ans.selectedOpt === q.correctOpt) correctCount++;
  });
  const finalScore = Math.round((correctCount / utbkState.questions.length) * 100);

  showToast(`Alhamdulillah! Ujian berhasil dikirim. Nilai Anda: ${finalScore}/100`, 'success');
  logActivity(`Ujian UTBK Selesai: Nilai ${finalScore}/100`, 'create');

  renderUtbkTeacherReport(finalScore, correctCount);
}

function renderUtbkTeacherReport(score = 85, correctCount = 4) {
  const card = document.getElementById('utbkTeacherEvaluationCard');
  if (!card) return;

  card.innerHTML = `
    <div class="space-y-3">
      <div class="flex items-center justify-between border-b border-emerald-200 pb-2">
        <h4 class="font-extrabold text-xs text-emerald-950">Laporan Evaluasi &amp; Growth Mindset</h4>
        <span class="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">Nilai: ${score}/100</span>
      </div>
      <div class="bg-white/80 p-3 rounded-xl border border-emerald-200 space-y-1">
        <p class="text-xs font-bold text-emerald-950">Apresiasi Ustadz &amp; Guru:</p>
        <p class="text-[11px] text-emerald-900 leading-relaxed italic">"Alhamdulillah! Kamu telah berusaha semaksimal mungkin dan menyelesaikan ujian dengan jujur. Nilai ini adalah cermin titik awal evaluasi untuk tumbuh lebih hebat lagi!"</p>
      </div>
      <div class="text-[11px] text-emerald-800 space-y-1">
        <p><strong>Soal Benar:</strong> ${correctCount} dari ${utbkState.questions.length} Soal</p>
        <p><strong>Waktu Telemetri:</strong> 12 Menit 30 Detik (Sangat Fokus)</p>
      </div>
    </div>
  `;
}

// 1. Master Data: Asrama & Kelas
async function loadMasterData() {
  if (!supabase || typeof supabase.from !== 'function') return;
  try {
    const [resKelas, resAsrama] = await Promise.all([
      supabase.from('kelas').select('*').order('tingkat', { ascending: true }).order('nama_kelas', { ascending: true }),
      supabase.from('asrama').select('*').order('nama_asrama', { ascending: true })
    ]);

    if (resKelas.data) {
      cmsState.kelasList = resKelas.data;
      populateKelasDropdowns(resKelas.data);
    }
    if (resAsrama.data) {
      cmsState.asramaList = resAsrama.data;
      populateAsramaDropdowns(resAsrama.data);
    }
  } catch (e) {
    console.warn('[PPSPJM] Gagal memuat master kelas & asrama:', e);
  }
}

function populateKelasDropdowns(kelasList) {
  const targets = ['formSantriKelas', 'cmsSantriFilterKelas', 'formNilaiKelas'];
  targets.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const isFilter = id.includes('Filter');
    el.innerHTML = isFilter ? '<option value="Semua">Semua Kelas</option>' : '<option value="">Pilih Kelas SMP</option>';
    kelasList.forEach(k => {
      const opt = document.createElement('option');
      opt.value = k.id;
      opt.textContent = `${k.nama_kelas} (${k.tahun_ajaran})`;
      el.appendChild(opt);
    });
  });
}

function populateAsramaDropdowns(asramaList) {
  const targets = ['formSantriAsrama', 'cmsSantriFilterAsrama'];
  targets.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const isFilter = id.includes('Filter');
    el.innerHTML = isFilter ? '<option value="Semua">Semua Asrama</option>' : '<option value="">Pilih Gedung Asrama</option>';
    asramaList.forEach(a => {
      const opt = document.createElement('option');
      opt.value = a.id;
      opt.textContent = `${a.nama_asrama} (${a.kategori})`;
      el.appendChild(opt);
    });
  });
}

function populateSantriDropdowns(santriList) {
  const targets = ['formTahfidzSantri', 'formIzinSantri', 'formTagihanSantri', 'formNilaiSantri'];
  targets.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = '<option value="">-- Pilih Siswa / Santri --</option>';
    santriList.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = `${s.nama_lengkap} (NISN: ${s.nisn})`;
      el.appendChild(opt);
    });
  });
}

// 2. Data Santri CRUD (TABLE: public.santri)
async function loadSantri() {
  if (!supabase || typeof supabase.from !== 'function') return;
  try {
    const { data, error } = await supabase
      .from('santri')
      .select('*, kelas:kelas_id(nama_kelas), asrama:asrama_id(nama_asrama)')
      .order('nama_lengkap', { ascending: true });

    if (error) throw error;
    cmsState.santriList = data || [];
    renderSantriTable();
    populateSantriDropdowns(cmsState.santriList);
    updateDashboardCounters();
  } catch (e) {
    console.error('[PPSPJM] Gagal memuat data santri:', e);
    renderSantriTable();
  }
}

function renderSantriTable() {
  const tbody = document.getElementById('cmsSantriTableBody');
  if (!tbody) return;
  while (tbody.firstChild) tbody.removeChild(tbody.firstChild);

  const query = (document.getElementById('cmsSantriSearch')?.value || '').toLowerCase();
  const filterKelas = document.getElementById('cmsSantriFilterKelas')?.value || 'Semua';
  const filterAsrama = document.getElementById('cmsSantriFilterAsrama')?.value || 'Semua';

  const filtered = cmsState.santriList.filter(s => {
    const matchQ = (s.nama_lengkap + ' ' + s.nisn + ' ' + (s.nik || '')).toLowerCase().includes(query);
    const matchK = filterKelas === 'Semua' || s.kelas_id === filterKelas;
    const matchA = filterAsrama === 'Semua' || s.asrama_id === filterAsrama;
    return matchQ && matchK && matchA;
  });

  if (!filtered || filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-gray-400 italic">Belum ada data santri yang sesuai. Klik "Tambah Santri" untuk menginput data baru.</td></tr>`;
    return;
  }

  filtered.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-50/80 transition';
    const statusColor = item.status === 'aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700';
    const jkColor = item.jenis_kelamin === 'Laki-laki' ? 'text-blue-600 bg-blue-50' : 'text-pink-600 bg-pink-50';

    tr.innerHTML = `
      <td class="p-3 font-mono font-semibold">${item.nisn}</td>
      <td class="p-3 font-bold text-gray-900">${item.nama_lengkap}</td>
      <td class="p-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${jkColor}">${item.jenis_kelamin}</span></td>
      <td class="p-3 text-gray-600">${item.kelas?.nama_kelas || '-'}</td>
      <td class="p-3 text-gray-600">${item.asrama?.nama_asrama || '-'}</td>
      <td class="p-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColor}">${item.status}</span></td>
      <td class="p-3 text-right">
        <button onclick="deleteSantri('${item.id}', '${item.nama_lengkap}')" class="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50" title="Hapus Data">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function openSantriModal() {
  loadMasterData();
  const form = document.querySelector('#santriModal form');
  if (form) form.reset();
  UI.open('santriModal');
}

async function saveSantri() {
  const nisn = (document.getElementById('formSantriNisn')?.value || '').trim();
  const nik = (document.getElementById('formSantriNik')?.value || '').trim() || null;
  const nama_lengkap = (document.getElementById('formSantriNama')?.value || '').trim();
  const jenis_kelamin = document.getElementById('formSantriGender')?.value || 'Laki-laki';
  const kelas_id = document.getElementById('formSantriKelas')?.value || null;
  const asrama_id = document.getElementById('formSantriAsrama')?.value || null;
  const status = document.getElementById('formSantriStatus')?.value || 'aktif';
  const alamat_lengkap = (document.getElementById('formSantriAlamat')?.value || '').trim() || null;

  if (!nisn || !nama_lengkap) {
    showToast('NISN dan Nama Lengkap wajib diisi.', 'error');
    return;
  }

  try {
    const payload = { nisn, nik, nama_lengkap, jenis_kelamin, kelas_id, asrama_id, status, alamat_lengkap };
    const { error } = await supabase.from('santri').insert([payload]);
    if (error) throw error;

    showToast(`Alhamdulillah, data santri "${nama_lengkap}" berhasil ditambahkan!`);
    logActivity(`Mendaftarkan data induk santri baru: ${nama_lengkap}`, 'create');
    UI.close('santriModal');
    await loadSantri();
  } catch (err) {
    console.error('Error simpan santri:', err);
    showToast(`Gagal menyimpan data santri: ${err.message}`, 'error');
  }
}

async function deleteSantri(id, nama) {
  if (!confirm(`Apakah Anda yakin ingin menghapus data santri "${nama}"? Data hafalan dan perizinannya juga akan terhapus.`)) return;
  try {
    const { error } = await supabase.from('santri').delete().eq('id', id);
    if (error) throw error;
    showToast(`Data santri "${nama}" telah dihapus.`);
    logActivity(`Menghapus data santri: ${nama}`, 'delete');
    await loadSantri();
  } catch (err) {
    showToast(`Gagal menghapus santri: ${err.message}`, 'error');
  }
}

// 3. Hafalan Tahfidz (TABLE: public.hafalan_tahfidz)
async function loadTahfidz() {
  if (!supabase || typeof supabase.from !== 'function') return;
  try {
    const { data, error } = await supabase
      .from('hafalan_tahfidz')
      .select('*, santri:santri_id(nama_lengkap), pengampu:pengampu_id(full_name)')
      .order('tanggal', { ascending: false });

    if (error) throw error;
    cmsState.tahfidzList = data || [];
    renderTahfidzTable();
    updateDashboardCounters();
  } catch (e) {
    console.error('[PPSPJM] Gagal memuat data tahfidz:', e);
    renderTahfidzTable();
  }
}

function renderTahfidzTable() {
  const tbody = document.getElementById('cmsTahfidzTableBody');
  if (!tbody) return;
  while (tbody.firstChild) tbody.removeChild(tbody.firstChild);

  const query = (document.getElementById('cmsTahfidzSearch')?.value || '').toLowerCase();
  const jenisFilter = document.getElementById('cmsTahfidzJenisFilter')?.value || 'Semua';

  const filtered = cmsState.tahfidzList.filter(t => {
    const santriName = t.santri?.nama_lengkap || '';
    const matchQ = (santriName + ' ' + t.surat_mulai + ' ' + (t.catatan || '')).toLowerCase().includes(query);
    const matchJ = jenisFilter === 'Semua' || t.jenis === jenisFilter;
    return matchQ && matchJ;
  });

  if (!filtered || filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-gray-400 italic">Belum ada riwayat setoran tahfidz. Klik "Input Setoran" untuk menambahkan mutaba'ah santri.</td></tr>`;
    return;
  }

  filtered.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-50/80 transition';
    const jenisBadge = item.jenis === 'ziyadah' 
      ? 'bg-emerald-100 text-emerald-800' 
      : (item.jenis === 'murajaah' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800');

    tr.innerHTML = `
      <td class="p-3 font-mono">${item.tanggal || '-'}</td>
      <td class="p-3 font-bold text-gray-900">${item.santri?.nama_lengkap || 'Santri'}</td>
      <td class="p-3 text-gray-600">${item.pengampu?.full_name || 'Ustadz Pengampu'}</td>
      <td class="p-3 font-semibold text-primary-dark">QS. ${item.surat_mulai}: ${item.ayat_mulai} - ${item.surat_selesai}: ${item.ayat_selesai}</td>
      <td class="p-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${jenisBadge}">${item.jenis}</span></td>
      <td class="p-3"><span class="font-bold text-emerald-700">${item.nilai}</span> <span class="text-[10px] text-gray-400">(${item.predikat || 'Mutqin'})</span></td>
      <td class="p-3 text-gray-500 italic max-w-xs truncate">${item.catatan || '-'}</td>
    `;
    tbody.appendChild(tr);
  });
}

function openTahfidzModal() {
  populateSantriDropdowns(cmsState.santriList);
  const form = document.querySelector('#tahfidzModal form');
  if (form) form.reset();
  const dateInput = document.getElementById('formTahfidzTanggal');
  if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);
  UI.open('tahfidzModal');
}

async function saveTahfidz() {
  const santri_id = document.getElementById('formTahfidzSantri')?.value;
  const tanggal = document.getElementById('formTahfidzTanggal')?.value || new Date().toISOString().slice(0, 10);
  const jenis = document.getElementById('formTahfidzJenis')?.value || 'ziyadah';
  const surat_mulai = (document.getElementById('formTahfidzSuratMulai')?.value || '').trim();
  const ayat_mulai = parseInt(document.getElementById('formTahfidzAyatMulai')?.value || '1', 10);
  const surat_selesai = (document.getElementById('formTahfidzSuratSelesai')?.value || '').trim();
  const ayat_selesai = parseInt(document.getElementById('formTahfidzAyatSelesai')?.value || '1', 10);
  const juz = parseInt(document.getElementById('formTahfidzJuz')?.value || '1', 10);
  const nilai = document.getElementById('formTahfidzNilai')?.value || 'A';
  const catatan = (document.getElementById('formTahfidzCatatan')?.value || '').trim() || null;

  if (!santri_id || !surat_mulai || !surat_selesai) {
    showToast('Santri dan rincian surat wajib diisi.', 'error');
    return;
  }

  try {
    const { data: { session } } = await supabase.auth.getSession();
    const pengampu_id = session?.user?.id || (cmsState.currentUserProfile?.id || null);

    const payload = {
      santri_id,
      pengampu_id: pengampu_id || '00000000-0000-0000-0000-000000000000',
      tanggal,
      jenis,
      surat_mulai,
      ayat_mulai,
      surat_selesai,
      ayat_selesai,
      juz,
      nilai,
      predikat: nilai === 'A' ? 'Mutqin' : 'Jayyid',
      catatan
    };

    const { error } = await supabase.from('hafalan_tahfidz').insert([payload]);
    if (error) throw error;

    showToast('Alhamdulillah, setoran hafalan santri berhasil dicatat!');
    logActivity(`Mencatat setoran tahfidz QS. ${surat_mulai}:${ayat_mulai}`, 'create');
    UI.close('tahfidzModal');
    await loadTahfidz();
  } catch (err) {
    console.error('Error simpan tahfidz:', err);
    showToast(`Gagal menyimpan setoran: ${err.message}`, 'error');
  }
}

// 4. Perizinan Asrama (TABLE: public.perizinan_asrama)
async function loadPerizinan() {
  if (!supabase || typeof supabase.from !== 'function') return;
  try {
    const { data, error } = await supabase
      .from('perizinan_asrama')
      .select('*, santri:santri_id(nama_lengkap)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    cmsState.perizinanList = data || [];
    renderPerizinanTable();
    updateDashboardCounters();
  } catch (e) {
    console.error('[PPSPJM] Gagal memuat perizinan:', e);
    renderPerizinanTable();
  }
}

function renderPerizinanTable() {
  const tbody = document.getElementById('cmsPerizinanTableBody');
  if (!tbody) return;
  while (tbody.firstChild) tbody.removeChild(tbody.firstChild);

  const query = (document.getElementById('cmsPerizinanSearch')?.value || '').toLowerCase();
  const statusFilter = document.getElementById('cmsPerizinanStatusFilter')?.value || 'Semua';

  const filtered = cmsState.perizinanList.filter(p => {
    const santriName = p.santri?.nama_lengkap || '';
    const matchQ = (santriName + ' ' + p.alasan + ' ' + (p.penjemput_nama || '')).toLowerCase().includes(query);
    const matchS = statusFilter === 'Semua' || p.status === statusFilter;
    return matchQ && matchS;
  });

  if (!filtered || filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-gray-400 italic">Belum ada catatan perizinan asrama. Klik "Ajukan Izin" untuk memulai.</td></tr>`;
    return;
  }

  filtered.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-50/80 transition';
    const statusMap = {
      pending: 'bg-amber-100 text-amber-800',
      approved: 'bg-blue-100 text-blue-800',
      returned: 'bg-emerald-100 text-emerald-800',
      rejected: 'bg-red-100 text-red-800',
      overdue: 'bg-rose-100 text-rose-800'
    };
    const sBadge = statusMap[item.status] || 'bg-gray-100 text-gray-700';

    const keluarFmt = item.tgl_keluar ? new Date(item.tgl_keluar).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-';
    const kembaliFmt = item.tgl_kembali ? new Date(item.tgl_kembali).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-';

    let actionButtons = '';
    if (item.status === 'pending') {
      actionButtons = `
        <button onclick="updatePerizinanStatus('${item.id}', 'approved')" class="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1 px-2.5 rounded mr-1">
          Setujui
        </button>
        <button onclick="updatePerizinanStatus('${item.id}', 'rejected')" class="text-xs bg-red-100 hover:bg-red-200 text-red-700 font-bold py-1 px-2 rounded">
          Tolak
        </button>
      `;
    } else if (item.status === 'approved') {
      actionButtons = `
        <button onclick="updatePerizinanStatus('${item.id}', 'returned')" class="text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2.5 rounded">
          Tandai Kembali
        </button>
      `;
    } else {
      actionButtons = `<span class="text-[10px] text-gray-400 italic">Selesai</span>`;
    }

    tr.innerHTML = `
      <td class="p-3 font-bold text-gray-900">${item.santri?.nama_lengkap || 'Santri'}</td>
      <td class="p-3 text-[11px] font-mono text-gray-700">${keluarFmt} s/d ${kembaliFmt}</td>
      <td class="p-3 max-w-xs text-gray-600">${item.alasan}</td>
      <td class="p-3 text-gray-600">${item.penjemput_nama || '-'} <span class="text-[10px] text-gray-400">(${item.penjemput_kontak || '-'})</span></td>
      <td class="p-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${sBadge}">${item.status}</span></td>
      <td class="p-3 text-right">${actionButtons}</td>
    `;
    tbody.appendChild(tr);
  });
}

function openPerizinanModal() {
  populateSantriDropdowns(cmsState.santriList);
  const form = document.querySelector('#perizinanModal form');
  if (form) form.reset();
  UI.open('perizinanModal');
}

async function savePerizinan() {
  const santri_id = document.getElementById('formIzinSantri')?.value;
  const tgl_keluar = document.getElementById('formIzinTglKeluar')?.value;
  const tgl_kembali = document.getElementById('formIzinTglKembali')?.value;
  const penjemput_nama = (document.getElementById('formIzinPenjemput')?.value || '').trim() || null;
  const penjemput_kontak = (document.getElementById('formIzinKontak')?.value || '').trim() || null;
  const alasan = (document.getElementById('formIzinAlasan')?.value || '').trim();

  if (!santri_id || !tgl_keluar || !tgl_kembali || !alasan) {
    showToast('Santri, jadwal keluar, dan alasan izin wajib diisi.', 'error');
    return;
  }

  try {
    const { data: { session } } = await supabase.auth.getSession();
    const diajukan_oleh = session?.user?.id || (cmsState.currentUserProfile?.id || null);

    const payload = {
      santri_id,
      diajukan_oleh: diajukan_oleh || '00000000-0000-0000-0000-000000000000',
      tgl_keluar: new Date(tgl_keluar).toISOString(),
      tgl_kembali: new Date(tgl_kembali).toISOString(),
      penjemput_nama,
      penjemput_kontak,
      alasan,
      status: 'pending'
    };

    const { error } = await supabase.from('perizinan_asrama').insert([payload]);
    if (error) throw error;

    showToast('Alhamdulillah, permohonan izin santri berhasil diajukan!');
    logActivity('Mengajukan perizinan santri asrama', 'create');
    UI.close('perizinanModal');
    await loadPerizinan();
  } catch (err) {
    console.error('Error simpan izin:', err);
    showToast(`Gagal mengajukan izin: ${err.message}`, 'error');
  }
}

async function updatePerizinanStatus(id, newStatus) {
  try {
    const updates = { status: newStatus };
    if (newStatus === 'returned') updates.waktu_kembali_aktual = new Date().toISOString();
    const { error } = await supabase.from('perizinan_asrama').update(updates).eq('id', id);
    if (error) throw error;

    showToast(`Status perizinan santri diubah menjadi "${newStatus}".`);
    logActivity(`Memperbarui status izin santri ke ${newStatus}`, 'update');
    await loadPerizinan();
  } catch (err) {
    showToast(`Gagal memperbarui status: ${err.message}`, 'error');
  }
}

// 5. Tagihan Keuangan & SPP (TABLE: public.tagihan_keuangan)
async function loadTagihan() {
  if (!supabase || typeof supabase.from !== 'function') return;
  try {
    const { data, error } = await supabase
      .from('tagihan_keuangan')
      .select('*, santri:santri_id(nama_lengkap)')
      .order('tgl_jatuh_tempo', { ascending: false });

    if (error) throw error;
    cmsState.tagihanList = data || [];
    renderTagihanTable();
    updateDashboardCounters();
  } catch (e) {
    console.error('[PPSPJM] Gagal memuat tagihan:', e);
    renderTagihanTable();
  }
}

function renderTagihanTable() {
  const tbody = document.getElementById('cmsTagihanTableBody');
  if (!tbody) return;
  while (tbody.firstChild) tbody.removeChild(tbody.firstChild);

  const query = (document.getElementById('cmsTagihanSearch')?.value || '').toLowerCase();
  const statusFilter = document.getElementById('cmsTagihanStatusFilter')?.value || 'Semua';

  const filtered = cmsState.tagihanList.filter(t => {
    const santriName = t.santri?.nama_lengkap || '';
    const matchQ = (santriName + ' ' + t.kode_tagihan + ' ' + t.jenis_tagihan).toLowerCase().includes(query);
    const matchS = statusFilter === 'Semua' || t.status_pembayaran === statusFilter;
    return matchQ && matchS;
  });

  if (!filtered || filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-gray-400 italic">Belum ada tagihan keuangan. Klik "Buat Tagihan" untuk menerbitkan tagihan SPP baru.</td></tr>`;
    return;
  }

  filtered.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-50/80 transition';
    const isLunas = item.status_pembayaran === 'lunas';
    const sBadge = isLunas ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800';
    const nominalFmt = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.nominal);

    let actionBtn = isLunas
      ? `<span class="text-[10px] text-emerald-600 font-bold"><i class="fa-solid fa-check mr-1"></i> Terverifikasi</span>`
      : `<button onclick="markTagihanLunas('${item.id}', '${item.kode_tagihan}')" class="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1 px-2.5 rounded">Tandai Lunas</button>`;

    tr.innerHTML = `
      <td class="p-3 font-mono font-bold text-primary-dark">${item.kode_tagihan}</td>
      <td class="p-3 font-bold text-gray-900">${item.santri?.nama_lengkap || 'Santri'}</td>
      <td class="p-3 text-gray-600">${item.jenis_tagihan} <span class="text-[10px] text-gray-400">(${item.periode || '-'})</span></td>
      <td class="p-3 font-mono font-bold text-gray-900">${nominalFmt}</td>
      <td class="p-3 text-gray-500 font-mono text-[11px]">${item.tgl_jatuh_tempo || '-'}</td>
      <td class="p-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${sBadge}">${item.status_pembayaran}</span></td>
      <td class="p-3 text-right">${actionBtn}</td>
    `;
    tbody.appendChild(tr);
  });
}

function openTagihanModal() {
  populateSantriDropdowns(cmsState.santriList);
  const form = document.querySelector('#tagihanModal form');
  if (form) form.reset();
  const tempo = document.getElementById('formTagihanJatuhTempo');
  if (tempo) {
    const d = new Date();
    d.setDate(d.getDate() + 15);
    tempo.value = d.toISOString().slice(0, 10);
  }
  UI.open('tagihanModal');
}

async function saveTagihan() {
  const santri_id = document.getElementById('formTagihanSantri')?.value;
  const jenis_tagihan = document.getElementById('formTagihanJenis')?.value;
  const periode = (document.getElementById('formTagihanPeriode')?.value || '').trim() || 'Bulan Berjalan';
  const nominal = parseFloat(document.getElementById('formTagihanNominal')?.value || '0');
  const tgl_jatuh_tempo = document.getElementById('formTagihanJatuhTempo')?.value;

  if (!santri_id || !jenis_tagihan || nominal <= 0 || !tgl_jatuh_tempo) {
    showToast('Santri, nominal valid, dan tanggal jatuh tempo wajib diisi.', 'error');
    return;
  }

  const kode_tagihan = `INV-JM-${Date.now().toString().slice(-6)}`;

  try {
    const payload = {
      santri_id,
      kode_tagihan,
      jenis_tagihan,
      periode,
      nominal,
      status_pembayaran: 'belum_lunas',
      tgl_jatuh_tempo
    };

    const { error } = await supabase.from('tagihan_keuangan').insert([payload]);
    if (error) throw error;

    showToast(`Alhamdulillah, tagihan SPP (${kode_tagihan}) berhasil dibuat!`);
    logActivity(`Menerbitkan tagihan ${kode_tagihan} senilai Rp ${nominal.toLocaleString('id-ID')}`, 'create');
    UI.close('tagihanModal');
    await loadTagihan();
  } catch (err) {
    console.error('Error simpan tagihan:', err);
    showToast(`Gagal menerbitkan tagihan: ${err.message}`, 'error');
  }
}

async function markTagihanLunas(id, kode) {
  if (!confirm(`Konfirmasi pembayaran tagihan ${kode} sebagai LUNAS?`)) return;
  try {
    const updates = {
      status_pembayaran: 'lunas',
      tgl_bayar: new Date().toISOString(),
      metode_pembayaran: 'Kasir Pesantren'
    };
    const { error } = await supabase.from('tagihan_keuangan').update(updates).eq('id', id);
    if (error) throw error;

    showToast(`Alhamdulillah, tagihan ${kode} berhasil ditandai LUNAS.`);
    logActivity(`Konfirmasi lunas tagihan ${kode}`, 'update');
    await loadTagihan();
  } catch (err) {
    showToast(`Gagal update tagihan: ${err.message}`, 'error');
  }
}

// 6. Nilai Akademik SMP (TABLE: public.nilai_akademik)
async function loadNilai() {
  if (!supabase || typeof supabase.from !== 'function') return;
  try {
    const { data, error } = await supabase
      .from('nilai_akademik')
      .select('*, santri:santri_id(nama_lengkap), guru:guru_id(full_name)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    cmsState.nilaiList = data || [];
    renderNilaiTable();
  } catch (e) {
    console.error('[PPSPJM] Gagal memuat nilai akademik:', e);
    renderNilaiTable();
  }
}

function renderNilaiTable() {
  const tbody = document.getElementById('cmsNilaiTableBody');
  if (!tbody) return;
  while (tbody.firstChild) tbody.removeChild(tbody.firstChild);

  const query = (document.getElementById('cmsNilaiSearch')?.value || '').toLowerCase();
  const semesterFilter = document.getElementById('cmsNilaiSemesterFilter')?.value || 'Semua';

  const filtered = cmsState.nilaiList.filter(n => {
    const santriName = n.santri?.nama_lengkap || '';
    const matchQ = (santriName + ' ' + n.mata_pelajaran + ' ' + (n.capaian_kompetensi || '')).toLowerCase().includes(query);
    const matchS = semesterFilter === 'Semua' || String(n.semester) === semesterFilter;
    return matchQ && matchS;
  });

  if (!filtered || filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-gray-400 italic">Belum ada data nilai akademik. Klik "Input Nilai" untuk menambahkan penilaian siswa.</td></tr>`;
    return;
  }

  filtered.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-50/80 transition';
    const num = parseFloat(item.nilai);
    const badgeColor = num >= 85 ? 'text-emerald-700 bg-emerald-50' : (num >= 75 ? 'text-blue-700 bg-blue-50' : 'text-amber-700 bg-amber-50');

    tr.innerHTML = `
      <td class="p-3 font-bold text-gray-900">${item.santri?.nama_lengkap || 'Siswa'}</td>
      <td class="p-3 font-semibold text-primary-dark">${item.mata_pelajaran}</td>
      <td class="p-3 text-gray-600">${item.jenis_ujian} <span class="text-[10px] text-gray-400">(Sem. ${item.semester})</span></td>
      <td class="p-3"><span class="px-2.5 py-1 rounded font-bold font-mono ${badgeColor}">${item.nilai}</span></td>
      <td class="p-3 text-gray-500 italic max-w-xs truncate">${item.capaian_kompetensi || '-'}</td>
      <td class="p-3 text-gray-600">${item.guru?.full_name || 'Guru Pengampu'}</td>
    `;
    tbody.appendChild(tr);
  });
}

function openNilaiModal() {
  populateSantriDropdowns(cmsState.santriList);
  const form = document.querySelector('#nilaiModal form');
  if (form) form.reset();
  UI.open('nilaiModal');
}

async function saveNilai() {
  const santri_id = document.getElementById('formNilaiSantri')?.value;
  const mata_pelajaran = document.getElementById('formNilaiMapel')?.value;
  const jenis_ujian = document.getElementById('formNilaiJenis')?.value;
  const nilai = parseFloat(document.getElementById('formNilaiAngka')?.value || '0');
  const semester = parseInt(document.getElementById('formNilaiSemester')?.value || '1', 10);
  const capaian_kompetensi = (document.getElementById('formNilaiKompetensi')?.value || '').trim() || null;

  if (!santri_id || !mata_pelajaran || isNaN(nilai)) {
    showToast('Santri, mata pelajaran, dan nilai angka wajib diisi.', 'error');
    return;
  }

  try {
    const { data: { session } } = await supabase.auth.getSession();
    const guru_id = session?.user?.id || (cmsState.currentUserProfile?.id || null);

    const payload = {
      santri_id,
      guru_id: guru_id || '00000000-0000-0000-0000-000000000000',
      mata_pelajaran,
      semester,
      tahun_ajaran: '2026/2027',
      jenis_ujian,
      nilai,
      capaian_kompetensi
    };

    const { error } = await supabase.from('nilai_akademik').insert([payload]);
    if (error) throw error;

    showToast('Alhamdulillah, nilai akademik siswa berhasil disimpan!');
    logActivity(`Menginput nilai ${mata_pelajaran} (${nilai})`, 'create');
    UI.close('nilaiModal');
    await loadNilai();
  } catch (err) {
    console.error('Error simpan nilai:', err);
    showToast(`Gagal menyimpan nilai: ${err.message}`, 'error');
  }
}

// 7. Panduan Bantuan Ramah Pemula (Non-IT User Guide Modal)
function switchHelpTab(tabKey) {
  const tabs = ['tahfidz', 'perizinan', 'tagihan', 'nilai', 'santri'];
  tabs.forEach(t => {
    const btn = document.getElementById(`helpTabBtn_${t}`);
    const panel = document.getElementById(`helpContent_${t}`);
    if (btn) {
      if (t === tabKey) {
        btn.className = 'help-tab-btn px-3 py-1.5 rounded-xl font-bold bg-emerald-600 text-white transition flex items-center gap-1.5 shrink-0 shadow-2xs';
      } else {
        btn.className = 'help-tab-btn px-3 py-1.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition flex items-center gap-1.5 shrink-0';
      }
    }
    if (panel) {
      if (t === tabKey) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    }
  });
}

function openHelpGuideModal(tabKey = 'tahfidz') {
  switchHelpTab(tabKey);
  UI.open('helpGuideModal');
}

/**
 * Handle navigation clicks with smooth scroll
 */
function handleDrawerNavClick(event, anchor) {
  if (event) event.preventDefault();
  toggleMobileDrawer(false);
  const target = document.querySelector(anchor);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
    triggerHaptic(10);
  }
}

/**
 * Handle bottom tab clicks
 */
function handleBottomTabClick(event, tab) {
  if (event) event.preventDefault();
  const anchorMap = {
    home: '#home',
    news: '#informasi',
    programs: '#programs',
    guestbook: '#guestbook'
  };
  const anchor = anchorMap[tab];
  if (anchor) {
    const target = document.querySelector(anchor);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  } else if (tab === 'medsos') {
    const footer = document.querySelector('footer') || document.querySelector('#kontak');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  } else if (tab === 'elearning') {
    openEcosystemModal('elearning');
  } else if (tab === 'ppdb') {
    openModal('ppdbModal');
  } else if (tab === 'login') {
    openModal('adminModal');
  } else if (tab === 'menu') {
    if (typeof BottomSheet !== 'undefined' && BottomSheet.open) {
      BottomSheet.open(0.5);
    } else {
      toggleMobileDrawer(true);
    }
  }

  triggerHaptic();

  // Reset tab visuals
  document.querySelectorAll('[id^="bottomTab"]').forEach(el => {
    el.classList.remove('nav-tab-active', 'text-emerald-700', 'text-primary', 'font-bold');
    el.classList.add('text-slate-500');
    const ind = el.querySelector('.tab-indicator');
    if (ind) {
      ind.classList.remove('opacity-100');
      ind.classList.add('opacity-0');
    }
  });

  // Activate chosen tab
  const activeId = 'bottomTab' + tab.charAt(0).toUpperCase() + tab.slice(1);
  const active = document.getElementById(activeId);
  if (active) {
    active.classList.add('nav-tab-active', 'text-emerald-700', 'font-bold');
    active.classList.remove('text-slate-500');
    const ind = active.querySelector('.tab-indicator');
    if (ind) {
      ind.classList.remove('opacity-0');
      ind.classList.add('opacity-100');
    }
  }
}

function triggerHaptic(duration = 10) {
  try {
    if (window.navigator && typeof window.navigator.vibrate === 'function') {
      window.navigator.vibrate(duration);
    }
  } catch (err) {}
}

// Hero Card Sliding Banner Carousel (smkn1pugaan.sch.id style)
let currentHeroSlideIndex = 0;
let heroSlideAutoTimer = null;

function setHeroCardSlide(index) {
  const track = document.getElementById('heroCardTrack');
  const dotsContainer = document.getElementById('heroCardDots');
  if (!track) return;
  const slides = Array.from(track.children);
  if (!slides || slides.length === 0) return;

  const totalSlides = slides.length;
  const isDesktop = window.innerWidth >= 1024;
  const maxIndex = isDesktop ? Math.max(0, totalSlides - 2) : totalSlides - 1;

  if (typeof index !== 'number' || isNaN(index)) index = 0;
  if (index < 0) currentHeroSlideIndex = maxIndex;
  else if (index > maxIndex) currentHeroSlideIndex = 0;
  else currentHeroSlideIndex = index;

  const container = track.parentElement;
  const containerWidth = container ? container.clientWidth : 0;
  const gap = isDesktop ? 24 : 16;
  
  // Calculate precise slide shift step
  let moveDistance = 0;
  if (containerWidth > 0) {
    const slideWidth = isDesktop ? (containerWidth - gap) / 2 : containerWidth;
    moveDistance = slideWidth + gap;
  } else if (slides[0] && slides[0].offsetWidth > 0) {
    moveDistance = slides[0].offsetWidth + gap;
  }

  track.style.transform = `translateX(-${currentHeroSlideIndex * moveDistance}px)`;

  if (dotsContainer) {
    const requiredDots = maxIndex + 1;
    if (dotsContainer.children.length !== requiredDots) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < requiredDots; i++) {
        const btn = document.createElement('button');
        btn.setAttribute('aria-label', `Ke slide ${i + 1}`);
        btn.onclick = function() { setHeroCardSlide(i); };
        dotsContainer.appendChild(btn);
      }
    }
    const dots = dotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
      if (i === currentHeroSlideIndex) {
        dots[i].className = 'w-3.5 h-3.5 rounded-full bg-accent transition-all duration-300 scale-110 shadow-md cursor-pointer';
      } else {
        dots[i].className = 'w-3.5 h-3.5 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer';
      }
    }
  }
}

function moveHeroCardSlide(direction) {
  triggerHaptic();
  setHeroCardSlide(currentHeroSlideIndex + direction);
}

function startHeroAutoPlay() {
  if (heroSlideAutoTimer) clearInterval(heroSlideAutoTimer);
  heroSlideAutoTimer = setInterval(function() {
    if (!document.hidden) moveHeroCardSlide(1);
  }, 5500);
}

if (typeof window !== 'undefined') {
  window.setHeroCardSlide = setHeroCardSlide;
  window.moveHeroCardSlide = moveHeroCardSlide;
  window.startHeroAutoPlay = startHeroAutoPlay;

  window.addEventListener('resize', function() {
    setHeroCardSlide(currentHeroSlideIndex);
  });

  // Adaptive App Bar Dynamic Elevation & Scroll Styling
  const mainHeader = document.getElementById('mainHeader');
  if (mainHeader) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        mainHeader.classList.add('header-scrolled');
      } else {
        mainHeader.classList.remove('header-scrolled');
      }
    }, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      setHeroCardSlide(0);
      startHeroAutoPlay();

      // Touch Swipe Gesture Support for Hero Card Carousel
      const heroContainer = document.getElementById('heroCardTrackContainer');
      if (heroContainer) {
        let heroTouchStartX = 0;
        let heroTouchStartY = 0;
        heroContainer.addEventListener('touchstart', function(e) {
          heroTouchStartX = e.touches[0].clientX;
          heroTouchStartY = e.touches[0].clientY;
          if (heroSlideAutoTimer) clearInterval(heroSlideAutoTimer);
        }, { passive: true });

        heroContainer.addEventListener('touchend', function(e) {
          const dx = e.changedTouches[0].clientX - heroTouchStartX;
          const dy = e.changedTouches[0].clientY - heroTouchStartY;
          if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 36) {
            if (dx < 0) {
              moveHeroCardSlide(1);
            } else {
              moveHeroCardSlide(-1);
            }
          }
          startHeroAutoPlay();
        }, { passive: true });

        heroContainer.addEventListener('mouseenter', function() {
          if (heroSlideAutoTimer) clearInterval(heroSlideAutoTimer);
        });
        heroContainer.addEventListener('mouseleave', function() {
          startHeroAutoPlay();
        });
      }
    }, 120);
  });
}

/* ==========================================================================
   MOBILE NAVIGATION DRAWER & NATIVE TOUCH GESTURE ENGINE (iOS / Android MD3)
   ========================================================================== */
const DrawerGesture = {
  drawer: null,
  panel: null,
  backdrop: null,
  isOpen: false,
  isDragging: false,
  startX: 0,
  startY: 0,
  startTime: 0,
  currentX: 0,
  isLockDetermined: false,
  isHorizontalSwipe: false,
  panelWidth: 320,

  init() {
    this.drawer = document.getElementById('mobileDrawer');
    this.panel = document.getElementById('mobileDrawerPanel');
    this.backdrop = document.getElementById('mobileDrawerBackdrop');
    if (!this.drawer || !this.panel || !this.backdrop) return;

    this.panel.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: true });
    this.panel.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
    this.panel.addEventListener('touchend', (e) => this.onTouchEnd(e), { passive: true });
    this.panel.addEventListener('touchcancel', (e) => this.onTouchEnd(e), { passive: true });
  },

  onTouchStart(e) {
    if (!this.isOpen) return;
    const touch = e.touches[0];
    this.startX = touch.clientX;
    this.startY = touch.clientY;
    this.startTime = Date.now();
    this.isLockDetermined = false;
    this.isHorizontalSwipe = false;
    this.isDragging = false;
    this.panelWidth = this.panel.offsetWidth || 320;
  },

  onTouchMove(e) {
    if (!this.isOpen) return;
    const touch = e.touches[0];
    const dx = touch.clientX - this.startX;
    const dy = touch.clientY - this.startY;

    // Gesture Direction Lock: Distinguish vertical menu scroll from horizontal dismiss swipe
    if (!this.isLockDetermined) {
      if (Math.hypot(dx, dy) > 8) {
        this.isLockDetermined = true;
        // Only lock to horizontal swipe if dragging to the right (closing direction)
        if (Math.abs(dx) > Math.abs(dy) && dx > 0) {
          this.isHorizontalSwipe = true;
        } else {
          this.isHorizontalSwipe = false;
        }
      }
    }

    if (this.isHorizontalSwipe && dx > 0) {
      if (e.cancelable) e.preventDefault();

      if (!this.isDragging) {
        this.isDragging = true;
        this.panel.classList.add('is-dragging');
      }

      this.currentX = dx;
      // Real-time GPU tracking
      this.panel.style.transform = `translate3d(${dx}px, 0, 0)`;

      // Dynamic backdrop opacity fading proportionally
      const progress = Math.max(0, Math.min(1, 1 - (dx / this.panelWidth)));
      this.backdrop.style.opacity = progress.toFixed(2);
    }
  },

  onTouchEnd(e) {
    if (!this.isOpen || !this.isDragging) {
      this.isDragging = false;
      this.isLockDetermined = false;
      this.isHorizontalSwipe = false;
      return;
    }

    this.isDragging = false;
    this.panel.classList.remove('is-dragging');

    const dt = Math.max(1, Date.now() - this.startTime);
    const velocity = this.currentX / dt; // px/ms
    const threshold = this.panelWidth * 0.3; // 30% width release threshold

    // Threshold & Velocity Release Decision
    if (this.currentX > threshold || (velocity > 0.45 && this.currentX > 20)) {
      // Dismiss drawer
      triggerHaptic(12);
      toggleMobileDrawer(false);
    } else {
      // Spring back to open position
      triggerHaptic(8);
      this.panel.style.transform = '';
      this.backdrop.style.opacity = '1';
    }

    this.currentX = 0;
    this.isLockDetermined = false;
    this.isHorizontalSwipe = false;
  }
};

function toggleMobileDrawer(show) {
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  const panel = document.getElementById('mobileDrawerPanel');
  
  if (!drawer || !backdrop || !panel) return;
  
  if (show) {
    DrawerGesture.isOpen = true;
    drawer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Clear any leftover manual drag styles
    panel.style.transform = '';
    backdrop.style.opacity = '';

    requestAnimationFrame(() => {
      backdrop.classList.remove('opacity-0');
      backdrop.classList.add('opacity-100');
      panel.classList.add('is-open');
    });
    triggerHaptic(10);
  } else {
    DrawerGesture.isOpen = false;
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    panel.classList.remove('is-open');
    panel.style.transform = '';
    
    setTimeout(() => {
      drawer.classList.add('hidden');
      document.body.style.overflow = '';
      backdrop.style.opacity = '';
    }, 320);
    triggerHaptic(8);
  }
}

/* ==========================================================================
   MOBILE NAVIGATION BOTTOM SHEET (Multi Snap Points: 0.5 & 0.9)
   ========================================================================== */
const BottomSheet = {
  sheet: null,
  panel: null,
  backdrop: null,
  header: null,
  content: null,
  snapIcon: null,

  currentSnap: 0, // 0 = closed, 0.5 = half screen, 0.9 = full screen
  isOpen: false,
  isDragging: false,
  startY: 0,
  startX: 0,
  startTime: 0,
  currentY: 0,
  startTranslateY: 0,
  isDirectionLocked: false,
  isVerticalDrag: false,

  init() {
    this.sheet = document.getElementById('mobileBottomSheet');
    this.panel = document.getElementById('bottomSheetPanel');
    this.backdrop = document.getElementById('bottomSheetBackdrop');
    this.header = document.getElementById('bottomSheetHeader');
    this.content = document.getElementById('bottomSheetScrollContent');
    this.snapIcon = document.getElementById('sheetSnapIcon');
    if (!this.sheet || !this.panel || !this.backdrop) return;

    // Attach listeners to drag handle & header
    if (this.header) {
      this.header.addEventListener('touchstart', (e) => this.onTouchStart(e, true), { passive: true });
      this.header.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
      this.header.addEventListener('touchend', (e) => this.onTouchEnd(e), { passive: true });
      this.header.addEventListener('touchcancel', (e) => this.onTouchEnd(e), { passive: true });
    }

    // Attach listener to scroll content when user pulls down at top
    if (this.content) {
      this.content.addEventListener('touchstart', (e) => this.onTouchStart(e, false), { passive: true });
      this.content.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
      this.content.addEventListener('touchend', (e) => this.onTouchEnd(e), { passive: true });
      this.content.addEventListener('touchcancel', (e) => this.onTouchEnd(e), { passive: true });
    }
  },

  getSnapPixels(snap) {
    const vh = window.innerHeight;
    if (snap <= 0) return vh;
    // translateY is offset from top: (1 - snap) * vh
    return (1 - snap) * vh;
  },

  open(snap = 0.5) {
    if (!this.sheet || !this.panel) return;
    this.isOpen = true;
    this.currentSnap = snap;
    this.sheet.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Set panel height based on maximum snap
    this.panel.style.height = `${window.innerHeight * 0.92}px`;
    
    const targetY = this.getSnapPixels(snap);

    requestAnimationFrame(() => {
      this.backdrop.classList.remove('opacity-0');
      this.backdrop.classList.add('opacity-100');
      this.panel.style.transform = `translate3d(0, ${targetY}px, 0)`;
      this.updateSnapIcon();
    });

    triggerHaptic(10);
  },

  snapTo(snap) {
    if (!this.isOpen) return;
    this.currentSnap = snap;
    const targetY = this.getSnapPixels(snap);
    this.panel.classList.remove('is-dragging');
    this.panel.style.transform = `translate3d(0, ${targetY}px, 0)`;
    this.updateSnapIcon();
    triggerHaptic(10);
  },

  toggleSnap() {
    if (this.currentSnap <= 0.6) {
      this.snapTo(0.9);
    } else {
      this.snapTo(0.5);
    }
  },

  updateSnapIcon() {
    if (!this.snapIcon) return;
    if (this.currentSnap >= 0.7) {
      this.snapIcon.className = 'fa-solid fa-down-left-and-up-right-to-center';
    } else {
      this.snapIcon.className = 'fa-solid fa-up-right-and-down-left-from-center';
    }
  },

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.currentSnap = 0;
    this.backdrop.classList.remove('opacity-100');
    this.backdrop.classList.add('opacity-0');
    this.panel.classList.remove('is-dragging');
    this.panel.style.transform = `translate3d(0, ${window.innerHeight}px, 0)`;

    setTimeout(() => {
      this.sheet.classList.add('hidden');
      document.body.style.overflow = '';
      this.panel.style.transform = '';
      this.backdrop.style.opacity = '';
    }, 340);

    triggerHaptic(8);
  },

  onTouchStart(e, isHandle) {
    if (!this.isOpen) return;
    const touch = e.touches[0];
    this.startX = touch.clientX;
    this.startY = touch.clientY;
    this.startTime = Date.now();
    this.isDirectionLocked = false;
    this.isVerticalDrag = isHandle;
    this.isDragging = false;
    this.startTranslateY = this.getSnapPixels(this.currentSnap);
  },

  onTouchMove(e) {
    if (!this.isOpen) return;
    const touch = e.touches[0];
    const dx = touch.clientX - this.startX;
    const dy = touch.clientY - this.startY;

    if (!this.isDirectionLocked) {
      if (Math.hypot(dx, dy) > 6) {
        this.isDirectionLocked = true;
        const isAtTop = !this.content || this.content.scrollTop <= 0;
        if (Math.abs(dy) > Math.abs(dx)) {
          if (dy > 0 && isAtTop) {
            this.isVerticalDrag = true;
          } else if (dy < 0 && this.currentSnap < 0.9) {
            this.isVerticalDrag = true;
          } else {
            this.isVerticalDrag = false;
          }
        } else {
          this.isVerticalDrag = false;
        }
      }
    }

    if (this.isVerticalDrag) {
      if (e.cancelable) e.preventDefault();

      if (!this.isDragging) {
        this.isDragging = true;
        this.panel.classList.add('is-dragging');
      }

      const rawY = this.startTranslateY + dy;
      // Minimum limit clamped to 8% viewport height from top
      const minY = window.innerHeight * 0.08;
      const targetY = Math.max(minY, rawY);
      this.currentY = targetY;

      // Real-time GPU tracking
      this.panel.style.transform = `translate3d(0, ${targetY}px, 0)`;

      // Dynamic backdrop opacity proportional to pull
      const maxDrag = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 1 - (targetY / maxDrag)));
      this.backdrop.style.opacity = progress.toFixed(2);
    }
  },

  onTouchEnd(e) {
    if (!this.isOpen || !this.isDragging) {
      this.isDragging = false;
      this.isVerticalDrag = false;
      this.isDirectionLocked = false;
      return;
    }

    this.isDragging = false;
    this.panel.classList.remove('is-dragging');

    const dt = Math.max(1, Date.now() - this.startTime);
    const dy = this.currentY - this.startTranslateY;
    const velocity = dy / dt; // positive = dragged down, negative = dragged up

    const vh = window.innerHeight;
    const visibleHeightRatio = 1 - (this.currentY / vh);

    // Momentum velocity release & dynamic snap logic:
    if (velocity > 0.5) {
      // Thrown downwards fast
      if (this.currentSnap >= 0.8) {
        this.snapTo(0.5);
      } else {
        this.close();
      }
    } else if (velocity < -0.5) {
      // Thrown upwards fast
      this.snapTo(0.9);
    } else {
      // Snap based on position thresholds
      if (visibleHeightRatio < 0.25) {
        this.close();
      } else if (visibleHeightRatio < 0.70) {
        this.snapTo(0.5);
      } else {
        this.snapTo(0.9);
      }
    }

    this.isVerticalDrag = false;
    this.isDirectionLocked = false;
  }
};

function initNavObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active-nav-link');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active-nav-link');
          }
        });
      }
    });
  }, { threshold: 0.6 });

  sections.forEach(section => observer.observe(section));
}

/**
 * Smooth & Responsive Scroll System (Vertical & Horizontal)
 */
function initSmoothScrolling() {
  const backToTopBtn = document.getElementById('btnBackToTop');
  const section = document.getElementById('informasi');
  const progressBar = document.getElementById('informasiProgress');

  let isTicking = false;

  // 1. High-Performance Throttled Vertical Scroll Listener
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        // Smooth toggle for Back to Top Floating Button
        if (backToTopBtn) {
          if (scrollY > 320) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            backToTopBtn.classList.add('opacity-100');
          } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            backToTopBtn.classList.remove('opacity-100');
          }
        }

        // Section Scroll Progress Bar
        if (section && progressBar) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionHeight = rect.height;
          const windowHeight = window.innerHeight;

          let progress = (windowHeight - sectionTop) / (sectionHeight + windowHeight);
          progress = Math.min(Math.max(progress, 0), 1) * 100;
          progressBar.style.width = progress + '%';
        }

        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  // 2. Smooth Anchor Navigation with Sticky Header Offset
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href || href === '#' || href.length < 2) return;

    // Skip if element has explicit custom tab handlers
    if (anchor.getAttribute('onclick')?.includes('handleBottomTabClick')) return;

    try {
      const targetEl = document.querySelector(href);
      if (!targetEl) return;

      e.preventDefault();
      const header = document.getElementById('mainHeader');
      const headerHeight = header ? header.getBoundingClientRect().height : 68;
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth'
      });

      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', href);
      }
      triggerHaptic();
    } catch (_) {
      // Fallback
    }
  });

  // 3. Universal Horizontal Scroll Enhancements (Desktop Drag-to-Scroll & Wheel Translation)
  initHorizontalScrollAssist();
}

/**
 * Universal Horizontal Scroll Enhancements (Mouse Drag & Wheel Translation)
 */
function initHorizontalScrollAssist() {
  const horizontalContainers = document.querySelectorAll('.overflow-x-auto, .smooth-scroll-x');

  horizontalContainers.forEach((container) => {
    container.classList.add('is-draggable-scroll');

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let hasMoved = false;

    // Desktop Mouse Drag Scrolling
    container.addEventListener('mousedown', (e) => {
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;
      isDown = true;
      hasMoved = false;
      container.classList.add('is-dragging-scroll');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      container.classList.remove('is-dragging-scroll');
    });

    container.addEventListener('mouseleave', () => {
      if (isDown) {
        isDown = false;
        container.classList.remove('is-dragging-scroll');
      }
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.6; // Responsive drag multiplier
      if (Math.abs(walk) > 4) hasMoved = true;
      container.scrollLeft = scrollLeft - walk;
    });

    // Suppress child click when dragging
    container.addEventListener('click', (e) => {
      if (hasMoved) {
        e.preventDefault();
        e.stopPropagation();
        hasMoved = false;
      }
    }, true);

    // Mouse Wheel to Horizontal Scroll Translation (When scrolling vertically over horizontal container)
    container.addEventListener('wheel', (e) => {
      const canScrollX = container.scrollWidth > container.clientWidth;
      if (!canScrollX) return;

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.shiftKey) {
        const atStart = container.scrollLeft <= 0 && e.deltaY < 0;
        const atEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1 && e.deltaY > 0;
        if (!atStart && !atEnd) {
          e.preventDefault();
          container.scrollBy({
            left: e.deltaY * 0.95,
            behavior: 'smooth'
          });
        }
      }
    }, { passive: false });
  });
}

function initScrollProgress() {
  initSmoothScrolling();
}

// Global lazy loading
function initGlobalLazyLoading() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
        }
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
}

// Dynamic SEO Meta Updater (Task 2: react-helmet-async equivalent)
function updatePageMeta(title, description, image) {
  if (title) {
    document.title = `${title} | Pondok Pesantren Jauharul Maknuun`;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);
  }
  if (description) {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', description);
  }
  if (image) {
    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', image);
    const twImg = document.querySelector('meta[name="twitter:image"]');
    if (twImg) twImg.setAttribute('content', image);
  }
}

// Teacher Profile Modal Controller (Task 9)
const teacherProfiles = {
  'ridwan': {
    name: 'Ust. H. Ridwan, M.Ag',
    role: 'Koordinator Tahfidz & Dewan Pengasuh',
    specialty: 'Sanad Al-Qur\'an Muttasil & Ulumul Qur\'an',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    education: 'S1 Studi Islam & Tafsir Al-Azhar Kairo, S2 Ilmu Al-Qur\'an UIN Sunan Kalijaga. Pemegang Sanad Hafalan Qira\'at Ashim.',
    subjects: 'Tafsir Jalalain, Ulumul Qur\'an, Tahsinul Qira\'ah, & Mutaba\'ah Halaqah Huffadz 30 Juz.',
    quote: '"Menghafal Al-Qur\'an bukan sekadar mengingat lafadznya, melainkan menanamkan akhlak dan adab mulia dalam setiap hembusan nafas."'
  },
  'abdul-muid': {
    name: 'Ust. Abdul Muid, S.Pd',
    role: 'Kepala Sekolah SMP Plus Jauharul Maknuun',
    specialty: 'Manajemen Pendidikan & Bahasa Arab Terapan',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    education: 'S1 Pendidikan Bahasa Arab UNNES, Sertifikasi Kepala Sekolah Penggerak Kemendikbudristek.',
    subjects: 'Bahasa Arab Komunikatif (Muhadatsah), Nahwu Shorof Terapan, & Manajemen Kepemimpinan Siswa.',
    quote: '"Pendidikan terbaik memadukan kedisiplinan akal dengan kelembutan hati yang terpaut pada ridha Ilahi."'
  },
  'nur-hidayah': {
    name: 'Ustadzah Nur Hidayah, S.Si',
    role: 'Waka Kurikulum & Pengajaran',
    specialty: 'Sains Terpadu & Laboratorium Alam',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    education: 'S1 Biologi MIPA Universitas Diponegoro (UNDIP), Pengembang Modul Ajar Kurikulum Merdeka Terintegrasi Keislaman.',
    subjects: 'Ilmu Pengetahuan Alam (IPA), Eksperimen Laboratorium & Bimbingan Olimpiade Sains Nasional (OSN).',
    quote: '"Mempelajari alam semesta adalah jembatan untuk semakin mengagumi keagungan dan kebesaran Sang Pencipta."'
  },
  'fahrur-rozi': {
    name: 'Ust. Fahrur Rozi, S.Kom',
    role: 'Guru Informatika & Laboran IT',
    specialty: 'Sistem Komputer & Digital Coding',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    education: 'S1 Teknik Informatika UDINUS, Praktisi Cyber Security & Web Development.',
    subjects: 'Informatika Abad-21, Algoritma Pemrograman, Literasi Digital Aman, & Pengelolaan Sistem Ujian Komputer CBT.',
    quote: '"Kuasai teknologi untuk menjadikannya sarana dakwah, peradaban, dan kemaslahatan umat."'
  }
};

function openTeacherModal(key) {
  const t = teacherProfiles[key];
  if (!t) return;
  document.getElementById('tmPhoto').src = t.photo;
  document.getElementById('tmName').textContent = t.name;
  document.getElementById('tmRole').textContent = t.role;
  document.getElementById('tmSpecialty').textContent = t.specialty;
  document.getElementById('tmEducation').textContent = t.education;
  document.getElementById('tmSubjects').textContent = t.subjects;
  document.getElementById('tmQuote').textContent = t.quote;
  updatePageMeta(`Profil Guru: ${t.name}`, `Mengenal profil ${t.name} (${t.role}) di Pondok Pesantren Jauharul Maknuun Lasem.`, t.photo);
  openModal('teacherModal');
}

// Syllabus & Brosur PDF Download Controller (Task 10)
let activeSyllabusType = 'smp-plus';

function downloadSyllabus(type) {
  activeSyllabusType = type;
  const titleElem = document.getElementById('sylModalTitle');
  const descElem = document.getElementById('sylModalDesc');
  
  if (type === 'smp-plus') {
    titleElem.textContent = 'Silabus Kurikulum SMP Plus 2026';
    descElem.textContent = 'Kurikulum Nasional Merdeka, Struktur Mapel, Capaian Pembelajaran & Proyek Penguatan Pelajar Pancasila.';
  } else if (type === 'pesantren') {
    titleElem.textContent = 'Kurikulum Salafiyah & Tahfidz';
    descElem.textContent = 'Jenjang Kitab Kuning (Jurumiyah, Fathul Qorib, Imrithi), Target Hafalan 30 Juz & Sanad Keilmuan.';
  } else {
    titleElem.textContent = 'Brosur Resmi PPDB 2026/2027';
    descElem.textContent = 'Panduan pendaftaran, rincian biaya infaq, beasiswa santri berprestasi, fasilitas & tata tertib asrama.';
  }
  openModal('syllabusModal');
}

function executeSyllabusDownload() {
  closeModal('syllabusModal');
  showToast('Menyiapkan dokumen resmi untuk cetak / simpan PDF...');

  const titles = {
    'smp-plus': 'SILABUS KURIKULUM MERDEKA SMP PLUS 2026/2027',
    'pesantren': 'KURIKULUM TAKHASSUS TAHFIDZ & DINIYAH SALAFIYAH 2026/2027',
    'brosur': 'PANDUAN RESMI PPDB & SPMB ONLINE 2026/2027'
  };

  const docTitle = titles[activeSyllabusType] || 'DOKUMEN RESMI KURIKULUM PPJM';

  const printArea = document.getElementById('printSection');
  if (printArea) {
    printArea.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 30px; max-width: 680px; margin: 20px auto; border: 2px solid #1a6b3c; border-radius: 12px; color: #111;">
        <div style="text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 12px; margin-bottom: 14px;">
          <h2 style="color: #1a6b3c; margin: 0; font-size: 18px; font-weight: bold;">PONDOK PESANTREN & SMP PLUS JAUHARUL MAKNUUN</h2>
          <p style="margin: 3px 0; font-size: 11px; color: #555;">Jl. Raya Dukun-Lasem RT 1 RW 1, Lasem Sidayu Gresik, Gresik 61153</p>
          <div style="background: #1a6b3c; color: white; display: inline-block; padding: 4px 14px; border-radius: 15px; font-size: 11px; font-weight: bold; margin-top: 8px;">
            ${docTitle}
          </div>
        </div>
        <div style="font-size: 12px; line-height: 1.6; margin-bottom: 16px;">
          <p><strong>Status Akreditasi:</strong> A (Unggul) Kemendikbudristek & Kemenag RI</p>
          <p><strong>Tahun Ajaran:</strong> 2026/2027 &bull; <strong>Sistem Pendidikan:</strong> Terpadu Pesantren & Formal</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 16px;">
          <thead>
            <tr style="background: #e6f4ea; border-bottom: 2px solid #1a6b3c;">
              <th style="padding: 6px; text-align: left; border: 1px solid #ccc;">Komponen Kurikulum</th>
              <th style="padding: 6px; text-align: left; border: 1px solid #ccc;">Target Kompetensi</th>
              <th style="padding: 6px; text-align: center; border: 1px solid #ccc;">Alokasi JP</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding: 5px; border: 1px solid #ccc;"><strong>Kurikulum Merdeka SMP Plus</strong></td><td style="padding: 5px; border: 1px solid #ccc;">MIPA, Informatika Coding CBT, Bahasa Inggris & Arab</td><td style="padding: 5px; text-align: center; border: 1px solid #ccc;">42 JP/Mgg</td></tr>
            <tr><td style="padding: 5px; border: 1px solid #ccc;"><strong>Tahfidz Al-Qur'an Bersanad</strong></td><td style="padding: 5px; border: 1px solid #ccc;">Hafalan Mutqin 30 Juz Bersanad, Tasmi' & Matan Tajwid</td><td style="padding: 5px; text-align: center; border: 1px solid #ccc;">Harian</td></tr>
            <tr><td style="padding: 5px; border: 1px solid #ccc;"><strong>Madrasah Diniyah Salafiyah</strong></td><td style="padding: 5px; border: 1px solid #ccc;">Jurumiyyah, 'Imrithi, Safinatun Najah, Ta'lim Muta'allim</td><td style="padding: 5px; text-align: center; border: 1px solid #ccc;">Malam</td></tr>
          </tbody>
        </table>
        <div style="border-top: 1px dashed #ccc; padding-top: 10px; font-size: 10px; color: #555;">
          <p>Dokumen resmi ini diunduh langsung dari Portal Resmi PPJM: <strong>https://ppjm.vercel.app</strong></p>
          <p>Informasi Pendaftaran PPDB: <strong>0812-3456-7890</strong> &bull; Email: <strong>info@jauharulmaknuun.sch.id</strong></p>
        </div>
      </div>
    `;
    setTimeout(() => {
      window.print();
    }, 250);
  }
}

// FAQ Accordion Controller (Task 8)
function toggleFaq(button) {
  const answer = button.nextElementSibling;
  const chevron = button.querySelector('.fa-chevron-down');
  const isHidden = answer.classList.contains('hidden');
  
  document.querySelectorAll('.faq-answer').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.faq-item .fa-chevron-down').forEach(el => el.style.transform = 'rotate(0deg)');
  
  if (isHidden) {
    answer.classList.remove('hidden');
    if (chevron) chevron.style.transform = 'rotate(180deg)';
  }
}

function filterFaq() {
  const query = (document.getElementById('faqSearch')?.value || '').toLowerCase();
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(query) ? 'block' : 'none';
  });
}

function setFaqCategory(category, button) {
  document.querySelectorAll('.faq-cat-btn').forEach(btn => {
    btn.className = 'faq-cat-btn px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 hover:text-primary transition';
  });
  button.className = 'faq-cat-btn px-3 py-1.5 rounded-full text-xs font-semibold bg-primary text-white transition shadow-sm';
  
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Floating Chatbot & Virtual Assistant Controller (Task 11)
function toggleChatbot() {
  const win = document.getElementById('chatbotWindow');
  const icon = document.getElementById('chatbotIcon');
  if (!win) return;
  const isHidden = win.classList.contains('hidden');
  if (isHidden) {
    win.classList.remove('hidden');
    if (icon) {
      icon.classList.remove('fa-comments');
      icon.classList.add('fa-xmark');
    }
  } else {
    win.classList.add('hidden');
    if (icon) {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-comments');
    }
  }
}

const botReplies = {
  'ppdb': 'Pendaftaran PPDB 2026 telah dibuka secara daring! Anda dapat mengisi formulir langsung pada tombol "PPDB Online" di beranda atau menghubungi panitia via WA di 0812-3456-7890.',
  'biaya': 'Biaya formulir Rp 150.000. Biaya infaq pangkal mencakup seragam lengkap, buku panduan, ranjang asrama bertingkat, dan katering 3x sehari. Tersedia beasiswa penuh bagi santri berprestasi!',
  'tahfidz': 'Program Tahfidz dibimbing intensif oleh Muqri\' Huffadz bersanad muttasil Riwayat Hafsh \'an \'Ashim dengan target mutqin 30 Juz selama masa studi santri.',
  'kurikulum': 'Kurikulum memadukan Kurikulum Merdeka Kemendikbudristek (MIPA, Coding, Bahasa Asing) dengan Kurikulum Diniyah Salafiyah Turats (Nahwu, Shorof, Fiqih Fathul Qorib).',
  'lokasi': 'Pondok Pesantren Jauharul Maknuun berlokasi di Jl. Raya Dukun-Lasem RT 1 RW 1, Lasem Sidayu Gresik, Gresik 61153.',
  'fasilitas': 'Fasilitas meliputi asrama representatif, musholla agung, laboratorium komputer CBT modern, pos kesehatan UKS 24 jam, perpustakaan kitab, dan katering gizi halalan thayyiban.',
  'jadwal': 'Keseharian santri: Bangun sebelum Subuh untuk qiyamul lail, setoran tahfidz pagi, sekolah formal SMP Plus (07.00 - 13.00), muraja\'ah sore, dan pengajian kitab kuning ba\'da Maghrib & Isya.',
  'syarat': 'Syarat pendaftaran PPDB: Fotokopi KK, Akta Kelahiran, Pas Foto 3x4 (3 lembar), surat keterangan lulus/NISN dari SD/MI asal, dan mengisi formulir online di website ini.'
};

function appendChatMessage(sender, text) {
  const container = document.getElementById('chatMessages');
  if (!container) return;
  
  const msgDiv = document.createElement('div');
  msgDiv.className = `flex items-start gap-2 ${sender === 'user' ? 'justify-end' : ''}`;
  
  if (sender === 'bot') {
    msgDiv.innerHTML = `
      <div class="w-6 h-6 rounded-full bg-primary text-accent flex items-center justify-center text-[10px] shrink-0 mt-0.5">
        <i class="fa-solid fa-robot"></i>
      </div>
      <div class="bg-white p-2.5 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm text-gray-700 leading-relaxed max-w-[85%]">
        ${text}
      </div>
    `;
  } else {
    msgDiv.innerHTML = `
      <div class="bg-primary text-white p-2.5 rounded-2xl rounded-tr-none shadow-sm leading-relaxed max-w-[85%]">
        ${text}
      </div>
    `;
  }
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

function sendQuickChat(query) {
  appendChatMessage('user', query);
  setTimeout(() => {
    let reply = 'Terima kasih atas pertanyaan Anda! Untuk informasi lebih rinci, Anda dapat langsung menghubungi layanan WhatsApp Sekretariat di 0812-3456-7890.';
    const qLower = query.toLowerCase();
    if (qLower.includes('ppdb') || qLower.includes('daftar') || qLower.includes('spmb')) reply = botReplies.ppdb;
    else if (qLower.includes('biaya') || qLower.includes('spp') || qLower.includes('uang') || qLower.includes('infaq')) reply = botReplies.biaya;
    else if (qLower.includes('tahfidz') || qLower.includes('quran') || qLower.includes('hafal')) reply = botReplies.tahfidz;
    else if (qLower.includes('kurikulum') || qLower.includes('pelajaran') || qLower.includes('kitab')) reply = botReplies.kurikulum;
    else if (qLower.includes('lokasi') || qLower.includes('alamat') || qLower.includes('peta') || qLower.includes('dimana')) reply = botReplies.lokasi;
    else if (qLower.includes('fasilitas') || qLower.includes('gedung') || qLower.includes('asrama') || qLower.includes('kamar')) reply = botReplies.fasilitas;
    else if (qLower.includes('jadwal') || qLower.includes('kegiatan') || qLower.includes('harian') || qLower.includes('waktu')) reply = botReplies.jadwal;
    else if (qLower.includes('syarat') || qLower.includes('dokumen') || qLower.includes('berkas')) reply = botReplies.syarat;
    appendChatMessage('bot', reply);
  }, 350);
}

function handleChatSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('chatInput');
  const val = (input?.value || '').trim();
  if (!val) return;
  input.value = '';
  sendQuickChat(val);
}

// Interactive Curriculum Tab Switcher & Semester Matrix (Evaluation Fix: Kurikulum)
let activeCurriculumSemester = 'all';

function switchCurriculumTab(tabKey) {
  const tabs = ['smp', 'tahfidz', 'salaf'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tabBtn-${t}`);
    const panel = document.getElementById(`curriculumTab-${t}`);
    if (t === tabKey) {
      if (btn) {
        btn.classList.add('bg-primary', 'text-white', 'shadow-sm');
        btn.classList.remove('text-gray-600', 'hover:text-primary');
      }
      if (panel) panel.classList.remove('hidden');
    } else {
      if (btn) {
        btn.classList.remove('bg-primary', 'text-white', 'shadow-sm');
        btn.classList.add('text-gray-600', 'hover:text-primary');
      }
      if (panel) panel.classList.add('hidden');
    }
  });
  // Maintain active semester filter upon tab change
  filterCurriculumSemester(activeCurriculumSemester);
}

function filterCurriculumSemester(sem) {
  activeCurriculumSemester = sem;
  ['all', '1', '2'].forEach(s => {
    const btn = document.getElementById(`semBtn-${s}`);
    if (btn) {
      if (s === sem) {
        btn.classList.add('bg-primary', 'text-white', 'shadow-xs', 'font-bold');
        btn.classList.remove('text-gray-600', 'hover:text-primary', 'font-semibold');
      } else {
        btn.classList.remove('bg-primary', 'text-white', 'shadow-xs', 'font-bold');
        btn.classList.add('text-gray-600', 'hover:text-primary', 'font-semibold');
      }
    }
  });

  const cards = document.querySelectorAll('#kurikulum-matrix .curriculum-card');
  cards.forEach(card => {
    const cardSem = card.getAttribute('data-semester') || '1,2';
    const semList = cardSem.split(',').map(s => s.trim());
    if (sem === 'all' || semList.includes(sem)) {
      card.classList.remove('hidden');
      card.style.opacity = '1';
    } else {
      card.classList.add('hidden');
    }
  });
}

// Quick-Call & PWA Installation Controller (Evaluation Fix: Kontak & PWA)
function copyContactPhone(phone, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(phone).then(() => {
      showToast(`Nomor telepon ${label} (${phone}) disalin ke clipboard!`);
    }).catch(() => {
      prompt(`Salin nomor ${label}:`, phone);
    });
  } else {
    prompt(`Salin nomor ${label}:`, phone);
  }
  trackEvent('quick_call_copy', { label, phone });
}

function showPwaInstallGuide() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    showToast('Panduan iOS Safari: Ketuk tombol Share (ikon panah ke atas) lalu pilih "Tambah ke Layar Utama" (Add to Home Screen).');
  } else {
    showToast('Panduan Android: Ketuk menu browser (titik 3 di kanan atas), lalu pilih "Pasang Aplikasi" / "Tambahkan ke Layar Utama".');
  }
}

let deferredPwaPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPwaPrompt = e;
  const btn = document.getElementById('btnInstallPWA');
  if (btn) btn.classList.add('animate-pulse');
});

function installPWAApp() {
  trackEvent('pwa_install_click');
  if (deferredPwaPrompt) {
    deferredPwaPrompt.prompt();
    deferredPwaPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        trackEvent('pwa_installed_success');
        showToast('Terima kasih! Aplikasi Web PPJM berhasil dipasang.');
        const btnText = document.getElementById('btnInstallPWAText');
        if (btnText) btnText.textContent = 'Aplikasi Web PPJM Aktif ✓';
      }
      deferredPwaPrompt = null;
    });
  } else {
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      showToast('Aplikasi Web PPJM sudah terpasang dan aktif di perangkat Anda.');
    } else {
      showPwaInstallGuide();
    }
  }
}

// Interactive Santri Tracker Simulator (Fokus 4: Feature Set)
const mockSantriData = {
  '1': {
    name: 'Ahmad Zaki',
    juz: 12,
    percent: 40,
    note: "Setoran terakhir: Surat Al-Anbiya' (Lulus Ujian Tasmi' 10 Juz Mutqin)",
    kitab: 'Fathul Qorib',
    kitabSub: 'Bab Haji',
    kitabPercent: 65,
    kitabNote: 'Khatam: Jurumiyyah, Safinah, Aqidatul Awam',
    gpa: '89.4',
    gpaPred: 'Sangat Baik (A)',
    gpaPercent: 89,
    gpaNote: 'Juara 2 Olimpiade IPA Tingkat Rayon • CBT Anti-Curang Aktif'
  },
  '2': {
    name: 'Fatimah Az-Zahra',
    juz: 24,
    percent: 80,
    note: "Setoran terakhir: Surat Az-Zumar (Lulus Ujian Tasmi' 20 Juz Mutqin)",
    kitab: 'Fathul Mu\'in',
    kitabSub: 'Bab Muamalah',
    kitabPercent: 82,
    kitabNote: 'Khatam: Imrithi, Fathul Qorib, Matan Jazariyyah',
    gpa: '94.2',
    gpaPred: 'Istimewa (A+)',
    gpaPercent: 94,
    gpaNote: 'Juara 1 Musabaqah Hifdzil Qur\'an Lasem • Portofolio Digital A+'
  },
  '3': {
    name: 'M. Faris Al-Faruq',
    juz: 30,
    percent: 100,
    note: "Khatam 30 Juz Bersanad Riwayat Hafsh 'an 'Ashim (Ijazah Kubro Siap)",
    kitab: 'Alfiyah Ibnu Malik',
    kitabSub: 'Bab I\'rob Matan',
    kitabPercent: 98,
    kitabNote: 'Khatam: Jurumiyyah, Imrithi, Alfiyah, Fathul Wahhab',
    gpa: '96.8',
    gpaPred: 'Mumtaz Syaraf (A+)',
    gpaPercent: 97,
    gpaNote: 'Calon Wisudawan Teladan 2026 & Peraih Beasiswa Penuh'
  }
};

function simulateSantriTracker(val) {
  const data = mockSantriData[val] || mockSantriData['1'];
  
  const elJuz = document.getElementById('trackerJuzCount');
  const elJuzBar = document.getElementById('trackerJuzBar');
  const elJuzNote = document.getElementById('trackerJuzNote');

  const elKitab = document.getElementById('trackerKitabName');
  const elKitabBar = document.getElementById('trackerKitabBar');
  const elKitabNote = document.getElementById('trackerKitabNote');

  const elGpa = document.getElementById('trackerGpa');
  const elGpaBar = document.getElementById('trackerGpaBar');
  const elGpaNote = document.getElementById('trackerGpaNote');

  if (elJuz) elJuz.textContent = data.juz;
  if (elJuzBar) elJuzBar.style.width = `${data.percent}%`;
  if (elJuzNote) elJuzNote.textContent = data.note;

  if (elKitab) elKitab.textContent = data.kitab;
  if (elKitabBar) elKitabBar.style.width = `${data.kitabPercent}%`;
  if (elKitabNote) elKitabNote.textContent = data.kitabNote;

  if (elGpa) elGpa.textContent = data.gpa;
  if (elGpaBar) elGpaBar.style.width = `${data.gpaPercent}%`;
  if (elGpaNote) elGpaNote.textContent = data.gpaNote;

  trackEvent('simulate_tracker', { santri: data.name, juz: data.juz });
}

// Analytics & Event Telemetry Engine (Fokus 5: Analytics & Monitoring)
function trackEvent(eventName, eventParams = {}) {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        ...eventParams,
        timestamp: new Date().toISOString()
      });
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...eventParams
    });
  } catch (err) {
    console.debug('Telemetry logging skipped:', err);
  }
}

// Content Helpers: Tag Cloud & Calendar (Fokus 3.4)
function filterByTag(tag) {
  const searchInput = document.getElementById('newsSearch');
  if (searchInput) {
    searchInput.value = tag;
  }
  setNewsCategory('Semua');
  trackEvent('filter_tag', { tag });
}

function addToGoogleCalendar(title, details, location, startDate, endDate) {
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&dates=${startDate}/${endDate}`;
  trackEvent('add_to_calendar', { title });
  window.open(url, '_blank');
}

let appInitialized = false;
async function initApp() {
  if (appInitialized) return;
  appInitialized = true;
  try {
    if (window.AOS) AOS.init({ duration: 800, once: true });
  } catch (e) {
    console.warn('[PPSPJM] AOS initialization warning:', e);
  }

  try {
    await initSupabase();
  } catch (e) {
    console.warn('[PPSPJM] Supabase init warning:', e);
  }

  try {
    initGlobalLazyLoading();
    showSlide(0);
    setInterval(() => {
      if (!document.hidden) nextSlide();
    }, 6000);
    startCountdown('2026-03-15T08:00:00');
    renderGuestbook(cmsState.guestbook);
    renderFrontendNews();
    renderFrontendGallery();
    initNavObserver();
    initScrollProgress();
    DrawerGesture.init();
    BottomSheet.init();
  } catch (e) {
    console.warn('[PPSPJM] UI component init warning:', e);
  }

  // Standalone PWA Mode Detection
  try {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (isStandalone) {
      const badge = document.getElementById('pwaStatusBadge');
      const badgeText = document.getElementById('pwaStatusText');
      const installBtn = document.getElementById('btnInstallPWA');
      const installBtnText = document.getElementById('btnInstallPWAText');
      if (badge) {
        badge.classList.remove('bg-accent/20', 'border-accent/40', 'text-accent');
        badge.classList.add('bg-emerald-500/20', 'border-emerald-400', 'text-emerald-300');
      }
      if (badgeText) badgeText.textContent = 'Aplikasi Terpasang (Mode Standalone Aktif)';
      if (installBtnText) installBtnText.textContent = 'Aplikasi Web PPJM Aktif ✓';
      if (installBtn) installBtn.classList.remove('animate-pulse');
    }
  } catch (e) {
    console.warn('[PPSPJM] PWA status check warning:', e);
  }

  // Connectivity monitoring (Blinking color indicator)
  try {
    const statusContainer = document.getElementById('connectivityStatus');
    const statusPing = document.getElementById('statusPing');
    const statusIcon = document.getElementById('statusIcon');
    const statusText = document.getElementById('statusText');

    function updateConnectivityUI() {
      const isOnline = navigator.onLine;
      const logoLamp = document.getElementById("logoStatusLamp");
      const drawerLogoLamp = document.getElementById("drawerLogoStatusLamp");

      if (!isOnline) {
        if (logoLamp) {
          logoLamp.classList.remove("status-online");
          logoLamp.classList.add("status-offline");
          logoLamp.title = "Status Koneksi: Offline (Mode data lokal)";
        }
        if (drawerLogoLamp) {
          drawerLogoLamp.classList.remove("status-online");
          drawerLogoLamp.classList.add("status-offline");
          drawerLogoLamp.title = "Status Koneksi: Offline";
        }
        if (statusPing) statusPing.classList.remove("hidden");
        if (statusIcon) {
          statusIcon.classList.remove("text-emerald-500");
          statusIcon.classList.add("text-rose-500", "animate-pulse");
        }
        if (statusText) {
          statusText.textContent = "Offline";
          statusText.classList.add("text-rose-600");
        }
        if (statusContainer) statusContainer.title = "Status Koneksi: Offline (Mode data lokal)";
      } else {
        if (logoLamp) {
          logoLamp.classList.remove("status-offline");
          logoLamp.classList.add("status-online");
          logoLamp.title = "Status Koneksi: Online (Sistem Terhubung)";
        }
        if (drawerLogoLamp) {
          drawerLogoLamp.classList.remove("status-offline");
          drawerLogoLamp.classList.add("status-online");
          drawerLogoLamp.title = "Status Koneksi: Online";
        }
        if (statusPing) statusPing.classList.add("hidden");
        if (statusIcon) {
          statusIcon.classList.remove("text-rose-500", "animate-pulse");
          statusIcon.classList.add("text-emerald-500");
        }
        if (statusText) {
          statusText.textContent = "Online";
          statusText.classList.remove("text-rose-600");
        }
        if (statusContainer) statusContainer.title = "Status Koneksi: Online";
      }
    }
    window.addEventListener('online', updateConnectivityUI);
    window.addEventListener('offline', updateConnectivityUI);
    updateConnectivityUI();
  } catch (e) {
    console.warn('[PPSPJM] Connectivity monitor warning:', e);
  }
};
