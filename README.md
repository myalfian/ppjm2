# Pondok Pesantren & SMP Plus Jauharul Maknuun Lasem - Web Portal & CMS

Portal Resmi Pondok Pesantren & SMP Plus Jauharul Maknuun Lasem Sidayu Gresik, dibangun sebagai aplikasi React Single Page Application (SPA) modern berbasis Vite, TypeScript, dan Tailwind CSS.

## Fitur Utama

### 1. Portal Publik & Informasi Santri
- **Pengumuman Berjalan (News Ticker)**: Menampilkan info terkini pendaftaran santri baru dan kabar prestasi.
- **Hero Slider & Hitung Mundur PPDB 2026**: Slider interaktif dengan sorotan akreditasi "A" BAN-PDM, tahfidz 30 juz, dan kurikulum merdeka.
- **Profil Pesantren & Visi Misi**: Sambutan Pengasuh (KH. Ahmad Zaini), Panca Jiwa Santri, dan dewan asatidz.
- **Pilar Kurikulum Terpadu**: Takhassus Tahfidzul Qur'an 30 Juz Bersanad, SMP Plus Akademik Kurikulum Merdeka, Madrasah Diniyah Salafiyah Maknani Gandul, dan Program Bilingual (Arab-Inggris).
- **Fasilitas Representatif**: Laboratorium STEAM & Komputer, Asrama Putra-Putri terpisah, Masjid Jami', Perpustakaan Turats, Poskestren, dan Dapur Gizi.
- **Berita & Agenda**: Filter kategori (Prestasi, Kegiatan, Pengumuman, Agenda), pencarian real-time, pembaca artikel lengkap, dan Web Share.
- **Galeri Foto & Video**: Dokumentasi multimedia dengan lightbox interaktif dan pemutar video.
- **Lokasi & Kontak Darurat**: Integrasi peta, petunjuk arah, serta hotline 24 jam (PPDB, Sekretariat, UKS, dan Keamanan).
- **Buku Tamu & Testimoni**: Kirim ulasan dan rating bintang 1-5 dengan verifikasi otomatis.
- **Tanya Jawab (FAQ)**: Accordion informasi prosedur PPDB, kurikulum, dan asrama.

### 2. Layanan PPDB Online 2026/2027
- **Formulir Pendaftaran Online**: Pilihan program, no. WhatsApp, validasi email RFC 5322, honeypot anti-bot, pilihan paket nutrisi & catatan alergen asrama.
- **Cek Status Pendaftaran**: Pelacakan status instan (Menunggu Verifikasi, Terverifikasi, Diterima, Cadangan, Ditolak).
- **Cetak Bukti Registrasi**: Pratinjau dan pencetakan Kartu Bukti Pendaftaran berstandar kop surat resmi untuk dibawa saat tes seleksi.

### 3. Portal Administrasi & Agile CMS (RBAC)
- **Role-Based Access Control**: Super Admin, Panitia PPDB, Guru & Asatidz, serta Santri/Wali.
- **Verifikasi PPDB**: Pencarian, filter status, pengubahan status verifikasi, direct WhatsApp chatting, dan ekspor data pendaftar format CSV.
- **Direktori Santri**: Manajemen data santri aktif, NIS, kelas, dan asrama.
- **Tracker Setoran Tahfidz**: Pencatatan capaian hafalan juz, halaman, status mutqin/lancar, dan ustadz penguji.
- **Perizinan Asrama**: Workflow persetujuan izin pulang/keluar santri oleh pos keamanan.
- **Keuangan & SPP**: Monitoring tagihan syahriah dan verifikasi lunas.
- **Rapor & Nilai**: Rekapitulasi nilai akademik & diniyah per semester.
- **CMS Berita & Tempat Sampah**: Penerbitan artikel berita, kelola kategori, soft delete, dan pemulihan dari tempat sampah.
- **Manajer Galeri**: Penambahan foto dan streaming video dokumenter.
- **Simulasi CBT Asesmen Santri**: Platform ujian asesmen mandiri berbasis komputer dengan skor real-time.
- **Audit Trail Log**: Riwayat jejak aktivitas administratif.

## Menjalankan Aplikasi

```bash
# Jalankan development server
npm run dev

# Kompilasi & build aplikasi untuk produksi
npm run build
```
