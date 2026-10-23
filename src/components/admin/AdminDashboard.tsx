import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  GraduationCap, 
  Newspaper, 
  Trash2, 
  Image as ImageIcon, 
  Activity, 
  FileQuestion, 
  LogOut, 
  Home, 
  Plus, 
  Search, 
  Printer, 
  Download, 
  MessageSquare, 
  Check, 
  X, 
  AlertCircle,
  Eye,
  RefreshCw,
  ShieldCheck,
  Award
} from 'lucide-react';
import { 
  AdminRole, 
  PPDBSubmission, 
  Post, 
  MediaGalleryItem, 
  ActivityLog, 
  Santri, 
  TahfidzRecord, 
  Perizinan, 
  Tagihan, 
  NilaiAkademik 
} from '../../types';
import { utbkQuestions } from '../../data/initialData';

interface AdminDashboardProps {
  currentRole: AdminRole;
  onRoleChange: (role: AdminRole) => void;
  onLogout: () => void;
  onBackToWebsite: () => void;
  ppdbList: PPDBSubmission[];
  posts: Post[];
  trash: Post[];
  mediaList: MediaGalleryItem[];
  activityLogs: ActivityLog[];
  santriList: Santri[];
  tahfidzList: TahfidzRecord[];
  perizinanList: Perizinan[];
  tagihanList: Tagihan[];
  nilaiList: NilaiAkademik[];
  onUpdatePPDBStatus: (id: string, status: PPDBSubmission['status']) => void;
  onOpenPrintCard: (submission: PPDBSubmission) => void;
  onAddPost: (post: Omit<Post, 'id'>) => void;
  onDeletePost: (id: string) => void;
  onRestorePost: (id: string) => void;
  onPermanentDeletePost: (id: string) => void;
  onAddMedia: (item: Omit<MediaGalleryItem, 'id'>) => void;
  onDeleteMedia: (id: string) => void;
  onAddSantri: (item: Omit<Santri, 'id'>) => void;
  onDeleteSantri: (id: string) => void;
  onAddTahfidz: (item: Omit<TahfidzRecord, 'id'>) => void;
  onAddPerizinan: (item: Omit<Perizinan, 'id'>) => void;
  onUpdatePerizinanStatus: (id: string, status: Perizinan['status']) => void;
  onMarkTagihanLunas: (id: string) => void;
  onAddNilai: (item: Omit<NilaiAkademik, 'id'>) => void;
  onToast: (msg: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentRole,
  onRoleChange,
  onLogout,
  onBackToWebsite,
  ppdbList,
  posts,
  trash,
  mediaList,
  activityLogs,
  santriList,
  tahfidzList,
  perizinanList,
  tagihanList,
  nilaiList,
  onUpdatePPDBStatus,
  onOpenPrintCard,
  onAddPost,
  onDeletePost,
  onRestorePost,
  onPermanentDeletePost,
  onAddMedia,
  onDeleteMedia,
  onAddSantri,
  onDeleteSantri,
  onAddTahfidz,
  onAddPerizinan,
  onUpdatePerizinanStatus,
  onMarkTagihanLunas,
  onAddNilai,
  onToast
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ppdb' | 'santri' | 'tahfidz' | 'perizinan' | 'tagihan' | 'nilai' | 'posts' | 'trash' | 'media' | 'activity' | 'cbt'>('overview');

  // Search & Filter state
  const [ppdbQuery, setPpdbQuery] = useState('');
  const [ppdbProgramFilter, setPpdbProgramFilter] = useState('Semua');
  const [ppdbStatusFilter, setPpdbStatusFilter] = useState('Semua');

  // New Post Form State
  const [showPostModal, setShowPostModal] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState('Kegiatan');
  const [postSummary, setPostSummary] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState('');
  const [postTags, setPostTags] = useState('Santri, Pesantren, Tahfidz');

  // New Santri Form State
  const [showSantriModal, setShowSantriModal] = useState(false);
  const [newSantriName, setNewSantriName] = useState('');
  const [newSantriNis, setNewSantriNis] = useState('');
  const [newSantriGender, setNewSantriGender] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [newSantriClass, setNewSantriClass] = useState('VII-A (Tahfidz)');
  const [newSantriDorm, setNewSantriDorm] = useState('Asrama Putra');
  const [newSantriGuardian, setNewSantriGuardian] = useState('');
  const [newSantriPhone, setNewSantriPhone] = useState('');

  // New Tahfidz Form State
  const [showTahfidzModal, setShowTahfidzModal] = useState(false);
  const [tahfidzSantriName, setTahfidzSantriName] = useState('');
  const [tahfidzSurahJuz, setTahfidzSurahJuz] = useState('Juz 1 (Al-Baqarah)');
  const [tahfidzHalaman, setTahfidzHalaman] = useState('Hal 1-5');
  const [tahfidzStatus, setTahfidzStatus] = useState<TahfidzRecord['status']>('Mutqin');
  const [tahfidzExaminer, setTahfidzExaminer] = useState('Ust. H. Syamsul Arifin');

  // New Media Form State
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaCategory, setMediaCategory] = useState('kegiatan');
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');
  const [mediaUrl, setMediaUrl] = useState('');

  // CBT / UTBK Simulator State
  const [cbtAnswers, setCbtAnswers] = useState<Record<number, number>>({});
  const [cbtSubmitted, setCbtSubmitted] = useState(false);

  // Filtered PPDB
  const filteredPPDB = ppdbList.filter(item => {
    const q = ppdbQuery.toLowerCase();
    const matchQ = (item.name + ' ' + item.code + ' ' + item.phone + ' ' + item.address).toLowerCase().includes(q);
    const matchP = ppdbProgramFilter === 'Semua' || item.program === ppdbProgramFilter;
    const matchS = ppdbStatusFilter === 'Semua' || item.status === ppdbStatusFilter;
    return matchQ && matchP && matchS;
  });

  // Export PPDB to CSV
  const handleExportCSV = () => {
    if (ppdbList.length === 0) {
      onToast('Belum ada data pendaftar untuk diekspor.');
      return;
    }
    const headers = ['Kode Registrasi', 'Nama Santri', 'Jenis Kelamin', 'Program', 'No WhatsApp', 'Alamat', 'Status', 'Tanggal Daftar'];
    const rows = ppdbList.map(item => [
      item.code,
      `"${item.name.replace(/"/g, '""')}"`,
      item.gender,
      `"${item.program}"`,
      item.phone,
      `"${item.address.replace(/"/g, '""')}"`,
      item.status,
      item.submitted_at
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encoded;
    link.download = `PPDB_Jauharul_Maknuun_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onToast('File CSV pendaftar PPDB berhasil diunduh.');
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) {
      onToast('Judul dan konten berita wajib diisi.');
      return;
    }
    onAddPost({
      title: postTitle.trim(),
      slug: postTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: postCategory,
      author: 'Humas PPJM',
      date: new Date().toISOString().slice(0, 10),
      image: postImage.trim() || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      status: 'published',
      tags: postTags.split(',').map(s => s.trim()).filter(Boolean),
      summary: postSummary.trim() || postContent.substring(0, 120) + '...',
      content: postContent.trim()
    });
    setPostTitle('');
    setPostSummary('');
    setPostContent('');
    setPostImage('');
    setShowPostModal(false);
    onToast('Artikel berhasil diterbitkan!');
  };

  const handleCreateSantri = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSantriName.trim() || !newSantriNis.trim()) {
      onToast('Nama dan NIS wajib diisi.');
      return;
    }
    onAddSantri({
      name: newSantriName.trim(),
      nis: newSantriNis.trim(),
      gender: newSantriGender,
      className: newSantriClass,
      dormName: newSantriDorm,
      status: 'Aktif',
      guardianName: newSantriGuardian.trim() || 'Wali Santri',
      guardianPhone: newSantriPhone.trim() || '081234567890'
    });
    setNewSantriName('');
    setNewSantriNis('');
    setShowSantriModal(false);
    onToast('Data santri baru berhasil ditambahkan.');
  };

  const handleCreateTahfidz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tahfidzSantriName.trim()) {
      onToast('Nama santri wajib diisi.');
      return;
    }
    onAddTahfidz({
      santriName: tahfidzSantriName.trim(),
      surahJuz: tahfidzSurahJuz,
      halamanAyat: tahfidzHalaman,
      status: tahfidzStatus,
      examiner: tahfidzExaminer,
      date: new Date().toISOString().slice(0, 10),
      notes: 'Bimbingan tasmi\' harian'
    });
    setTahfidzSantriName('');
    setShowTahfidzModal(false);
    onToast('Setoran tahfidz berhasil dicatat.');
  };

  const handleCreateMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaTitle.trim() || !mediaUrl.trim()) {
      onToast('Judul dan URL media wajib diisi.');
      return;
    }
    onAddMedia({
      title: mediaTitle.trim(),
      category: mediaCategory,
      type: mediaType,
      url: mediaUrl.trim(),
      size: mediaType === 'video' ? 'Stream' : '200 KB'
    });
    setMediaTitle('');
    setMediaUrl('');
    setShowMediaModal(false);
    onToast('Media berhasil ditambahkan ke galeri.');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1a6b3c] text-white flex items-center justify-center font-bold">
              JM
            </div>
            <div>
              <h1 className="font-extrabold text-sm sm:text-base text-[#0d4a28]">
                Portal Pengelola PP & SMP Plus JM
              </h1>
              <p className="text-[10px] text-gray-500">
                Sistem Terpadu Akademik, Asrama & Agile CMS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* RBAC Role Selector */}
            <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-xl border border-gray-200">
              <ShieldCheck className="w-4 h-4 text-[#1a6b3c]" />
              <select
                value={currentRole}
                onChange={(e) => {
                  onRoleChange(e.target.value as AdminRole);
                  onToast(`Peran diubah ke: ${e.target.value}`);
                }}
                className="bg-transparent text-xs font-bold text-gray-800 focus:outline-none cursor-pointer"
              >
                <option value="super_admin">Super Admin</option>
                <option value="panitia_ppdb">Panitia PPDB</option>
                <option value="guru">Guru & Asatidz</option>
                <option value="santri_wali">Santri / Wali</option>
              </select>
            </div>

            <button
              onClick={onBackToWebsite}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100 border border-gray-200 flex items-center gap-1.5 transition"
              title="Kembali ke Beranda"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Web Publik</span>
            </button>

            <button
              onClick={onLogout}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 flex items-center gap-1.5 transition"
              title="Keluar"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-4 space-y-1">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
            Modul Administrasi
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'overview' ? 'bg-[#1a6b3c] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Ringkasan (Overview)</span>
          </button>

          <button
            onClick={() => setActiveTab('ppdb')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'ppdb' ? 'bg-[#1a6b3c] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <UserCheck className="w-4 h-4" />
              <span>Verifikasi PPDB</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
              activeTab === 'ppdb' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-[#1a6b3c]'
            }`}>
              {ppdbList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('santri')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'santri' ? 'bg-[#1a6b3c] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Direktori Santri</span>
          </button>

          <button
            onClick={() => setActiveTab('tahfidz')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'tahfidz' ? 'bg-[#1a6b3c] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Setoran Tahfidz</span>
          </button>

          <button
            onClick={() => setActiveTab('perizinan')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'perizinan' ? 'bg-[#1a6b3c] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Perizinan Asrama</span>
          </button>

          <button
            onClick={() => setActiveTab('tagihan')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'tagihan' ? 'bg-[#1a6b3c] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Keuangan / SPP</span>
          </button>

          <button
            onClick={() => setActiveTab('nilai')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'nilai' ? 'bg-[#1a6b3c] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Rapor & Nilai</span>
          </button>

          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 pt-3 mb-2">
            CMS & Publikasi
          </div>

          <button
            onClick={() => setActiveTab('posts')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'posts' ? 'bg-[#1a6b3c] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>Berita & Artikel</span>
          </button>

          <button
            onClick={() => setActiveTab('trash')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'trash' ? 'bg-[#1a6b3c] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Trash2 className="w-4 h-4" />
              <span>Tempat Sampah</span>
            </div>
            {trash.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-600 font-bold">
                {trash.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'media' ? 'bg-[#1a6b3c] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Manajer Galeri</span>
          </button>

          <button
            onClick={() => setActiveTab('cbt')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'cbt' ? 'bg-[#1a6b3c] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FileQuestion className="w-4 h-4" />
            <span>CBT / Ujian Asesmen</span>
          </button>

          <button
            onClick={() => setActiveTab('activity')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'activity' ? 'bg-[#1a6b3c] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Audit Trail Log</span>
          </button>
        </aside>

        {/* Tab Content Panel */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#0d4a28]">Ringkasan Statistik Sistem</h2>
                <p className="text-xs text-gray-500">Status operasional pesantren & pendaftaran santri baru 2026/2027.</p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-500">Pendaftar PPDB</div>
                  <div className="text-2xl font-black text-[#1a6b3c] mt-1">{ppdbList.length}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-1">
                    {ppdbList.filter(s => s.status === 'Diterima').length} Diterima
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-500">Santri Terdaftar</div>
                  <div className="text-2xl font-black text-blue-600 mt-1">{santriList.length}</div>
                  <div className="text-[10px] text-gray-400 mt-1">Asrama Putra & Putri</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-500">Setoran Tahfidz</div>
                  <div className="text-2xl font-black text-amber-600 mt-1">{tahfidzList.length}</div>
                  <div className="text-[10px] text-amber-600 font-semibold mt-1">
                    {tahfidzList.filter(t => t.status === 'Mutqin').length} Status Mutqin
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-500">Artikel Terbit</div>
                  <div className="text-2xl font-black text-purple-600 mt-1">{posts.length}</div>
                  <div className="text-[10px] text-gray-400 mt-1">Publikasi Portal</div>
                </div>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                  <h3 className="font-bold text-sm text-[#0d4a28]">Aksi Cepat Pengelola</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setActiveTab('ppdb')}
                      className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#1a6b3c] font-bold text-left border border-emerald-200 transition"
                    >
                      <UserCheck className="w-4 h-4 mb-1" />
                      Verifikasi Berkas PPDB
                    </button>
                    <button
                      onClick={() => { setActiveTab('posts'); setShowPostModal(true); }}
                      className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-left border border-blue-200 transition"
                    >
                      <Plus className="w-4 h-4 mb-1" />
                      Tulis Berita Baru
                    </button>
                    <button
                      onClick={() => { setActiveTab('santri'); setShowSantriModal(true); }}
                      className="p-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-left border border-purple-200 transition"
                    >
                      <Users className="w-4 h-4 mb-1" />
                      Tambah Data Santri
                    </button>
                    <button
                      onClick={handleExportCSV}
                      className="p-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-left border border-amber-200 transition"
                    >
                      <Download className="w-4 h-4 mb-1" />
                      Ekspor CSV PPDB
                    </button>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-[#0d4a28]">Log Aktivitas Terbaru</h3>
                    <button onClick={() => setActiveTab('activity')} className="text-xs text-[#1a6b3c] font-bold">
                      Lihat Semua
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    {activityLogs.slice(0, 4).map((log, i) => (
                      <div key={i} className="flex items-start justify-between p-2 rounded-xl bg-gray-50 border border-gray-100">
                        <div>
                          <p className="font-semibold text-gray-800">{log.action}</p>
                          <span className="text-[10px] text-gray-400">{log.user}</span>
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono shrink-0 ml-2">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PPDB VERIFICATION TAB */}
          {activeTab === 'ppdb' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[#0d4a28]">Manajemen & Verifikasi PPDB</h2>
                  <p className="text-xs text-gray-500">Kelola status pendaftaran, konfirmasi WA, dan cetak kartu bukti.</p>
                </div>
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold text-xs rounded-xl shadow flex items-center gap-2 self-start sm:self-auto btn-spring"
                >
                  <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Ekspor CSV</span>
                </button>
              </div>

              {/* Filters */}
              <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap items-center gap-3 text-xs">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari nama, kode registrasi, no HP..."
                    value={ppdbQuery}
                    onChange={(e) => setPpdbQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#1a6b3c]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-semibold">Program:</span>
                  <select
                    value={ppdbProgramFilter}
                    onChange={(e) => setPpdbProgramFilter(e.target.value)}
                    className="px-2.5 py-1.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none"
                  >
                    <option value="Semua">Semua Program</option>
                    <option value="SMP Plus & Pesantren">SMP Plus & Pesantren</option>
                    <option value="Takhassus Tahfidz">Takhassus Tahfidz</option>
                    <option value="Kajian Kitab Kuning">Kajian Kitab Kuning</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-semibold">Status:</span>
                  <select
                    value={ppdbStatusFilter}
                    onChange={(e) => setPpdbStatusFilter(e.target.value)}
                    className="px-2.5 py-1.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none"
                  >
                    <option value="Semua">Semua Status</option>
                    <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                    <option value="Terverifikasi">Terverifikasi</option>
                    <option value="Diterima">Diterima</option>
                    <option value="Cadangan">Cadangan</option>
                    <option value="Ditolak">Ditolak</option>
                  </select>
                </div>
              </div>

              {/* Submissions List */}
              <div className="space-y-3">
                {filteredPPDB.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-[#1a6b3c] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {item.code}
                        </span>
                        <strong className="text-sm text-gray-900">{item.name}</strong>
                        <span className="text-gray-500 text-[11px]">({item.gender})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500 font-semibold">Ubah Status:</span>
                        <select
                          value={item.status}
                          onChange={(e) => onUpdatePPDBStatus(item.id, e.target.value as PPDBSubmission['status'])}
                          className="px-2 py-1 rounded-lg border border-gray-300 font-bold focus:outline-none text-[11px]"
                        >
                          <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                          <option value="Terverifikasi">Terverifikasi</option>
                          <option value="Diterima">Diterima</option>
                          <option value="Cadangan">Cadangan</option>
                          <option value="Ditolak">Ditolak</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-gray-600 text-[11px]">
                      <div>
                        <span className="text-gray-400 block text-[10px]">Program:</span>
                        <strong className="text-[#0d4a28]">{item.program}</strong>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">WhatsApp:</span>
                        <span className="font-mono">{item.phone}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">Paket Nutrisi:</span>
                        <span>{item.diet_package || 'Reguler 4 Sehat'}</span>
                      </div>
                      <div className="sm:col-span-3">
                        <span className="text-gray-400 block text-[10px]">Alamat:</span>
                        <span>{item.address}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] text-gray-400">
                        Daftar: {new Date(item.submitted_at).toLocaleDateString('id-ID')}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onOpenPrintCard(item)}
                          className="px-2.5 py-1 bg-emerald-50 text-[#1a6b3c] font-bold rounded-lg hover:bg-emerald-100 flex items-center gap-1"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Kartu</span>
                        </button>
                        <a
                          href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=Assalamu'alaikum%20Wr.%20Wb.%20Panitia%20PPDB%20PPJM%20mengkonfirmasi%20pendaftaran%20ananda%20*${encodeURIComponent(item.name)}*`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 flex items-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Hubungi WA</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SANTRI DIRECTORY TAB */}
          {activeTab === 'santri' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#0d4a28]">Direktori Santri Aktif</h2>
                  <p className="text-xs text-gray-500">Database identitas santri, kelas akademik, dan asrama.</p>
                </div>
                <button
                  onClick={() => setShowSantriModal(true)}
                  className="px-3.5 py-2 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 btn-spring"
                >
                  <Plus className="w-4 h-4 text-[#d4af37]" />
                  <span>Tambah Santri</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-xs text-left">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
                    <tr>
                      <th className="p-3">NIS</th>
                      <th className="p-3">Nama Santri</th>
                      <th className="p-3">Kelas</th>
                      <th className="p-3">Asrama</th>
                      <th className="p-3">Wali & No Telp</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {santriList.map((s) => (
                      <tr key={s.id} className="hover:bg-gray-50">
                        <td className="p-3 font-mono font-bold text-[#1a6b3c]">{s.nis}</td>
                        <td className="p-3 font-bold text-gray-900">{s.name}</td>
                        <td className="p-3">{s.className}</td>
                        <td className="p-3 text-gray-600">{s.dormName}</td>
                        <td className="p-3 text-gray-600">{s.guardianName} ({s.guardianPhone})</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => onDeleteSantri(s.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAHFIDZ TRACKER TAB */}
          {activeTab === 'tahfidz' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#0d4a28]">Rekap Setoran Tahfidz 30 Juz</h2>
                  <p className="text-xs text-gray-500">Pencatatan kemajuan hafalan Al-Qur'an dan mutaba'ah asatidz.</p>
                </div>
                <button
                  onClick={() => setShowTahfidzModal(true)}
                  className="px-3.5 py-2 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 btn-spring"
                >
                  <Plus className="w-4 h-4 text-[#d4af37]" />
                  <span>Catat Setoran</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-xs text-left">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
                    <tr>
                      <th className="p-3">Tanggal</th>
                      <th className="p-3">Nama Santri</th>
                      <th className="p-3">Surah / Juz</th>
                      <th className="p-3">Halaman / Ayat</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Penguji</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {tahfidzList.map((t) => (
                      <tr key={t.id} className="hover:bg-gray-50">
                        <td className="p-3 text-gray-500 font-mono">{t.date}</td>
                        <td className="p-3 font-bold text-gray-900">{t.santriName}</td>
                        <td className="p-3 font-semibold text-[#0d4a28]">{t.surahJuz}</td>
                        <td className="p-3 text-gray-600">{t.halamanAyat}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                            t.status === 'Mutqin' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="p-3 text-gray-600">{t.examiner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PERIZINAN TAB */}
          {activeTab === 'perizinan' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#0d4a28]">Perizinan Pulang & Sambang</h2>
                  <p className="text-xs text-gray-500">Verifikasi izin keluar santri oleh bagian keamanan & pengasuh.</p>
                </div>
              </div>

              <div className="space-y-3">
                {perizinanList.map((p) => (
                  <div key={p.id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-sm text-gray-900">{p.santriName}</strong>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.status === 'Disetujui' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {p.status}
                        </span>
                      </div>
                      <p className="text-gray-600">Alasan: {p.reason}</p>
                      <p className="text-gray-400 text-[10px]">
                        Periode: {p.leaveDate} s/d {p.returnDate}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {p.status === 'Menunggu' && (
                        <>
                          <button
                            onClick={() => onUpdatePerizinanStatus(p.id, 'Disetujui')}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" /> Setujui
                          </button>
                          <button
                            onClick={() => onUpdatePerizinanStatus(p.id, 'Ditolak')}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg flex items-center gap-1"
                          >
                            <X className="w-3.5 h-3.5" /> Tolak
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KEUANGAN TAB */}
          {activeTab === 'tagihan' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#0d4a28]">Keuangan & Tagihan SPP</h2>
                  <p className="text-xs text-gray-500">Monitoring pembayaran syahriah dan katering santri.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-xs text-left">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
                    <tr>
                      <th className="p-3">Nama Santri</th>
                      <th className="p-3">Keterangan Tagihan</th>
                      <th className="p-3">Nominal</th>
                      <th className="p-3">Jatuh Tempo</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {tagihanList.map((t) => (
                      <tr key={t.id} className="hover:bg-gray-50">
                        <td className="p-3 font-bold text-gray-900">{t.santriName}</td>
                        <td className="p-3">{t.billTitle}</td>
                        <td className="p-3 font-mono font-bold text-gray-800">
                          Rp {t.amount.toLocaleString('id-ID')}
                        </td>
                        <td className="p-3 font-mono text-gray-500">{t.dueDate}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                            t.status === 'Lunas' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'
                          }`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          {t.status !== 'Lunas' ? (
                            <button
                              onClick={() => onMarkTagihanLunas(t.id)}
                              className="px-2.5 py-1 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold rounded-lg text-[10px]"
                            >
                              Tandai Lunas
                            </button>
                          ) : (
                            <span className="text-gray-400 text-[10px]">Telah Dibayar</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* NILAI TAB */}
          {activeTab === 'nilai' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-[#0d4a28]">Rapor & Penilaian Terpadu</h2>
                <p className="text-xs text-gray-500">Capaian kurikulum nasional Kemendikbud & Diniyah Salafiyah.</p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-xs text-left">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
                    <tr>
                      <th className="p-3">Santri</th>
                      <th className="p-3">Mata Pelajaran / Kitab</th>
                      <th className="p-3">Nilai</th>
                      <th className="p-3">Semester</th>
                      <th className="p-3">Tahun Ajaran</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {nilaiList.map((n) => (
                      <tr key={n.id} className="hover:bg-gray-50">
                        <td className="p-3 font-bold text-gray-900">{n.santriName}</td>
                        <td className="p-3 font-semibold text-[#0d4a28]">{n.subject}</td>
                        <td className="p-3 font-mono font-bold text-base text-[#1a6b3c]">{n.score}</td>
                        <td className="p-3">{n.semester}</td>
                        <td className="p-3 text-gray-500">{n.academicYear}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* POSTS TAB */}
          {activeTab === 'posts' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#0d4a28]">CMS Berita & Pengumuman</h2>
                  <p className="text-xs text-gray-500">Publikasi artikel, kabar prestasi santri, dan pengumuman resmi.</p>
                </div>
                <button
                  onClick={() => setShowPostModal(true)}
                  className="px-3.5 py-2 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 btn-spring"
                >
                  <Plus className="w-4 h-4 text-[#d4af37]" />
                  <span>Tulis Berita</span>
                </button>
              </div>

              <div className="space-y-3">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-emerald-50 text-[#1a6b3c] font-bold px-2 py-0.5 rounded">
                          {post.category}
                        </span>
                        <strong className="text-sm text-gray-900">{post.title}</strong>
                      </div>
                      <p className="text-gray-500 line-clamp-1">{post.summary}</p>
                      <span className="text-[10px] text-gray-400">
                        Diterbitkan: {post.date} oleh {post.author}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => onDeletePost(post.id)}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-lg flex items-center gap-1 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Pindahkan ke Sampah</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TRASH TAB */}
          {activeTab === 'trash' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-[#0d4a28]">Tempat Sampah (Trash)</h2>
                <p className="text-xs text-gray-500">Artikel yang dihapus sementara. Anda dapat memulihkan atau menghapus permanen.</p>
              </div>

              {trash.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center text-xs text-gray-400 italic">
                  Tempat sampah kosong.
                </div>
              ) : (
                <div className="space-y-3">
                  {trash.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between text-xs">
                      <div>
                        <strong className="text-gray-900">{item.title}</strong>
                        <span className="block text-[10px] text-gray-400">Kategori: {item.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onRestorePost(item.id)}
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#1a6b3c] font-bold rounded-lg flex items-center gap-1"
                        >
                          <RefreshCw className="w-3.5 h-3.5" /> Pulihkan
                        </button>
                        <button
                          onClick={() => onPermanentDeletePost(item.id)}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-lg flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Hapus Permanen
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MEDIA MANAGER TAB */}
          {activeTab === 'media' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#0d4a28]">Manajer Galeri & Media</h2>
                  <p className="text-xs text-gray-500">Kelola foto dokumentasi dan embed video profil santri.</p>
                </div>
                <button
                  onClick={() => setShowMediaModal(true)}
                  className="px-3.5 py-2 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 btn-spring"
                >
                  <Plus className="w-4 h-4 text-[#d4af37]" />
                  <span>Tambah Media</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediaList.map((m) => (
                  <div key={m.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="h-40 bg-gray-100 overflow-hidden relative">
                        <img src={m.url} alt={m.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          {m.type}
                        </span>
                      </div>
                      <div className="p-3">
                        <h4 className="font-bold text-xs text-gray-800 line-clamp-1">{m.title}</h4>
                        <span className="text-[10px] text-gray-400 capitalize">{m.category}</span>
                      </div>
                    </div>
                    <div className="p-3 pt-0 flex justify-end">
                      <button
                        onClick={() => onDeleteMedia(m.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACTIVITY AUDIT TAB */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-[#0d4a28]">Audit Trail & Log Aktivitas</h2>
                <p className="text-xs text-gray-500">Riwayat audit perubahan data oleh akun pengelola sistem.</p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm divide-y divide-gray-100 text-xs">
                {activityLogs.map((log, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between hover:bg-gray-50">
                    <div>
                      <p className="font-bold text-gray-800">{log.action}</p>
                      <span className="text-[10px] text-gray-500">{log.user}</span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CBT / UTBK SIMULATOR TAB */}
          {activeTab === 'cbt' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#0d4a28]">Simulasi CBT Asesmen Santri</h2>
                <p className="text-xs text-gray-500">Platform ujian berbasis komputer mandiri untuk santri SMP Plus & Diniyah.</p>
              </div>

              <div className="space-y-4">
                {utbkQuestions.map((q, idx) => (
                  <div key={q.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1a6b3c]">Soal #{idx + 1} - {q.subject}</span>
                      {cbtSubmitted && (
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          cbtAnswers[q.id] === q.correct ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {cbtAnswers[q.id] === q.correct ? 'Benar ✓' : 'Salah ✗'}
                        </span>
                      )}
                    </div>

                    <p className="font-semibold text-gray-800 leading-relaxed">{q.question}</p>

                    <div className="space-y-1.5">
                      {q.options.map((opt, oIdx) => (
                        <label
                          key={oIdx}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition ${
                            cbtAnswers[q.id] === oIdx
                              ? 'bg-emerald-50 border-[#1a6b3c] font-bold text-[#0d4a28]'
                              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q_${q.id}`}
                            checked={cbtAnswers[q.id] === oIdx}
                            onChange={() => !cbtSubmitted && setCbtAnswers(prev => ({ ...prev, [q.id]: oIdx }))}
                            disabled={cbtSubmitted}
                            className="text-[#1a6b3c]"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>

                    {cbtSubmitted && (
                      <div className="p-3 bg-blue-50 text-blue-900 rounded-xl border border-blue-200 text-[11px]">
                        <strong>Pembahasan:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}

                <div className="pt-2 flex gap-3">
                  {!cbtSubmitted ? (
                    <button
                      onClick={() => {
                        setCbtSubmitted(true);
                        const correctCount = utbkQuestions.filter(q => cbtAnswers[q.id] === q.correct).length;
                        onToast(`Ujian selesai! Skor: ${correctCount}/${utbkQuestions.length}`);
                      }}
                      className="px-6 py-2.5 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold text-xs rounded-xl shadow btn-spring"
                    >
                      Kirim Jawaban CBT
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setCbtAnswers({});
                        setCbtSubmitted(false);
                      }}
                      className="px-6 py-2.5 bg-gray-700 hover:bg-gray-800 text-white font-bold text-xs rounded-xl shadow btn-spring"
                    >
                      Ulangi Ujian Asesmen
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* CREATE POST MODAL */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-bold text-sm text-[#0d4a28]">Tulis Artikel / Berita Baru</h3>
              <button onClick={() => setShowPostModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Judul Artikel *</label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Contoh: Santri JM Raih Juara 1 MHQ Tingkat Provinsi"
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a6b3c]"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Kategori *</label>
                <select
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none"
                >
                  <option value="Prestasi">Prestasi</option>
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Agenda">Agenda</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Ringkasan Singkat</label>
                <input
                  type="text"
                  value={postSummary}
                  onChange={(e) => setPostSummary(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat untuk kartu berita"
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a6b3c]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Isi Artikel Lengkap *</label>
                <textarea
                  rows={5}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Tuliskan berita lengkap di sini..."
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a6b3c]"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">URL Foto Sampul</label>
                <input
                  type="url"
                  value={postImage}
                  onChange={(e) => setPostImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a6b3c]"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold rounded-xl shadow btn-spring"
                >
                  Terbitkan Artikel
                </button>
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE SANTRI MODAL */}
      {showSantriModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-bold text-sm text-[#0d4a28]">Tambah Santri Baru</h3>
              <button onClick={() => setShowSantriModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSantri} className="space-y-3">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Nama Santri *</label>
                <input
                  type="text"
                  value={newSantriName}
                  onChange={(e) => setNewSantriName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a6b3c]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">NIS *</label>
                  <input
                    type="text"
                    value={newSantriNis}
                    onChange={(e) => setNewSantriNis(e.target.value)}
                    placeholder="2026001"
                    className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a6b3c]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Jenis Kelamin</label>
                  <select
                    value={newSantriGender}
                    onChange={(e) => setNewSantriGender(e.target.value as any)}
                    className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Kelas</label>
                  <input
                    type="text"
                    value={newSantriClass}
                    onChange={(e) => setNewSantriClass(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a6b3c]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Asrama</label>
                  <input
                    type="text"
                    value={newSantriDorm}
                    onChange={(e) => setNewSantriDorm(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a6b3c]"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button type="submit" className="flex-1 py-2.5 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold rounded-xl btn-spring">
                  Simpan Santri
                </button>
                <button type="button" onClick={() => setShowSantriModal(false)} className="px-4 py-2.5 bg-gray-100 rounded-xl">
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE TAHFIDZ MODAL */}
      {showTahfidzModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-bold text-sm text-[#0d4a28]">Catat Setoran Tahfidz</h3>
              <button onClick={() => setShowTahfidzModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTahfidz} className="space-y-3">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Nama Santri *</label>
                <input
                  type="text"
                  value={tahfidzSantriName}
                  onChange={(e) => setTahfidzSantriName(e.target.value)}
                  placeholder="Pilih atau ketik nama santri"
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a6b3c]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Surah / Juz</label>
                  <input
                    type="text"
                    value={tahfidzSurahJuz}
                    onChange={(e) => setTahfidzSurahJuz(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Halaman / Ayat</label>
                  <input
                    type="text"
                    value={tahfidzHalaman}
                    onChange={(e) => setTahfidzHalaman(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Status Kelancaran</label>
                <select
                  value={tahfidzStatus}
                  onChange={(e) => setTahfidzStatus(e.target.value as any)}
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none"
                >
                  <option value="Mutqin">Mutqin (Sangat Lancar)</option>
                  <option value="Lancar">Lancar</option>
                  <option value="Murajaah">Murajaah Ulang</option>
                  <option value="Perbaikan">Perbaikan Makhraj/Tajwid</option>
                </select>
              </div>

              <div className="pt-2 flex gap-2">
                <button type="submit" className="flex-1 py-2.5 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold rounded-xl btn-spring">
                  Simpan Setoran
                </button>
                <button type="button" onClick={() => setShowTahfidzModal(false)} className="px-4 py-2.5 bg-gray-100 rounded-xl">
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE MEDIA MODAL */}
      {showMediaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-bold text-sm text-[#0d4a28]">Tambah Media Galeri</h3>
              <button onClick={() => setShowMediaModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMedia} className="space-y-3">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Judul Media *</label>
                <input
                  type="text"
                  value={mediaTitle}
                  onChange={(e) => setMediaTitle(e.target.value)}
                  placeholder="Contoh: Praktikum STEM Santri"
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a6b3c]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Tipe Media</label>
                  <select
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none"
                  >
                    <option value="photo">Foto</option>
                    <option value="video">Video YouTube</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Kategori</label>
                  <select
                    value={mediaCategory}
                    onChange={(e) => setMediaCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none"
                  >
                    <option value="kegiatan">Kegiatan</option>
                    <option value="fasilitas">Fasilitas</option>
                    <option value="prestasi">Prestasi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">URL Media *</label>
                <input
                  type="url"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder={mediaType === 'video' ? 'https://www.youtube.com/embed/...' : 'https://images.unsplash.com/...'}
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a6b3c]"
                  required
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button type="submit" className="flex-1 py-2.5 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold rounded-xl btn-spring">
                  Simpan Media
                </button>
                <button type="button" onClick={() => setShowMediaModal(false)} className="px-4 py-2.5 bg-gray-100 rounded-xl">
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
