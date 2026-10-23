export type PPDBStatus = 'Menunggu Verifikasi' | 'Terverifikasi' | 'Diterima' | 'Cadangan' | 'Ditolak';

export interface PPDBSubmission {
  id: string;
  code: string;
  name: string;
  gender: string;
  program: string;
  phone: string;
  email?: string | null;
  diet_package?: string;
  allergy_notes?: string | null;
  address: string;
  status: PPDBStatus;
  submitted_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  category: 'Prestasi' | 'Kegiatan' | 'Pengumuman' | 'Agenda' | string;
  author: string;
  date: string;
  image: string;
  status: 'published' | 'draft';
  tags: string[];
  summary: string;
  content: string;
}

export interface MediaGalleryItem {
  id: string;
  title: string;
  category: 'kegiatan' | 'fasilitas' | 'prestasi' | 'video' | string;
  type: 'photo' | 'video';
  url: string;
  size?: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  role: string;
  rating: number;
  message: string;
  created_at: string;
}

export interface ActivityLog {
  time: string;
  user: string;
  action: string;
  badge: 'create' | 'update' | 'upload' | 'export' | 'auth' | 'delete';
}

export interface Santri {
  id: string;
  nis: string;
  name: string;
  gender: 'Laki-laki' | 'Perempuan';
  className: string;
  dormName: string;
  status: 'Aktif' | 'Alumni' | 'Cuti';
  guardianName: string;
  guardianPhone: string;
}

export interface TahfidzRecord {
  id: string;
  santriName: string;
  surahJuz: string;
  halamanAyat: string;
  status: 'Mutqin' | 'Lancar' | 'Murajaah' | 'Perbaikan';
  examiner: string;
  date: string;
  notes?: string;
}

export interface Perizinan {
  id: string;
  santriName: string;
  reason: string;
  leaveDate: string;
  returnDate: string;
  status: 'Disetujui' | 'Menunggu' | 'Ditolak';
  approver?: string;
}

export interface Tagihan {
  id: string;
  santriName: string;
  billTitle: string;
  amount: number;
  dueDate: string;
  status: 'Lunas' | 'Belum Lunas';
  paidDate?: string;
}

export interface NilaiAkademik {
  id: string;
  santriName: string;
  subject: string;
  score: number;
  semester: 'Ganjil' | 'Genap';
  academicYear: string;
}

export type AdminRole = 'super_admin' | 'panitia_ppdb' | 'guru' | 'santri_wali';

export interface EcosystemModule {
  title: string;
  icon: string;
  desc: string;
  features: string[];
}
