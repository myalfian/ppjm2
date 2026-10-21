# PPSPJM Portal

Portal Web Resmi & Agile CMS **PP & SMP Plus Jauharul Maknuun Lasem, Rembang**.
Dilengkapi dengan sistem PPDB Online (Pendaftaran Peserta Didik Baru), verifikasi status pendaftaran, pencetakan kartu registrasi, buku tamu & testimoni interaktif, galeri media multimedia, serta Agile CMS Admin Panel terintegrasi **Supabase (PostgreSQL & Supabase Auth)**.

---

## Struktur Proyek

```
PPJM/
├── index.html            — Markup halaman utama, navigasi, modal, & panel admin
├── style.css             — Desain kustom (Islamic pattern, glassmorphism, animasi ticker)
├── script.js             — Logika aplikasi frontend & interaksi Supabase
├── maps.js               — Integrasi peta interaktif Google Maps (Lasem, Rembang)
├── server.js             — Server lokal Express dengan auto-loader .env
├── supabase_schema.sql   — Skrip DDL lengkap Supabase (tabel, RLS policies, index, seeds)
├── api/
│   └── env.js            — Vercel Serverless Function (injeksi aman environment variable)
├── tests/                — Unit testing & property-based security tests
│   ├── admin-auth-gate.property.test.html
│   ├── ppdb-submission.property.test.html
│   ├── validation.test.html
│   └── xss-surface.property.test.html
├── vercel.json           — Konfigurasi deployment & routing Vercel
├── .env.example          — Contoh konfigurasi environment variable
└── package.json          — Konfigurasi dependensi & skrip npm
```

---

## Setup Backend Supabase

### 1. Buat Project Supabase
1. Kunjungi [supabase.com](https://supabase.com) dan buat project baru.
2. Buka menu **Project Settings → API** dan salin **Project URL** serta **anon public key**.

### 2. Eksekusi Skema Database
Buka **SQL Editor** di dashboard Supabase Anda, buka file [`supabase_schema.sql`](file:///C:/Users/hp_fl/.gemini/antigravity-ide/scratch/PPJM/supabase_schema.sql), lalu salin dan jalankan seluruh isinya:
- **`ppdb_submissions`**: Tabel data pendaftaran santri baru beserta kode registrasi & status.
- **`guestbook_entries`**: Tabel testimoni dan buku tamu pengunjung.
- **`posts`**: Tabel manajemen konten artikel & berita Agile CMS.
- **`activity_logs`**: Tabel audit log aktivitas pengelola/admin.
- **Row Level Security (RLS)**: Perlindungan otorisasi level database untuk keamanan data pendaftar.

### 3. Buat Akun Admin
1. Di dashboard Supabase, buka menu **Authentication → Users**.
2. Klik **Add User** (atau **Invite User**), masukkan email (misal: `admin@jauharulmaknuun.sch.id`) dan password aman Anda.
3. Akun tersebut kini dapat digunakan untuk login ke Admin Panel di web portal.

---

## Environment Variables

Buat file `.env` di direktori root untuk pengujian lokal, atau atur pada **Vercel Settings → Environment Variables**:

| Nama Variabel | Keterangan | Wajib |
| :--- | :--- | :---: |
| `SUPABASE_URL` | URL project Supabase (`https://xxxx.supabase.co`) | Ya |
| `SUPABASE_ANON_KEY` | Public Anon Key Supabase | Ya |
| `GOOGLE_MAPS_API_KEY` | API Key Google Maps Javascript API (opsional) | Opsional |

---

## Menjalankan Secara Lokal

### Menggunakan Node.js Dev Server (Direkomendasikan)
```bash
# 1. Install dependensi
npm install

# 2. Jalankan server lokal
npm run dev
```
Buka browser di `http://localhost:3000`.

### Menggunakan Vercel CLI
```bash
vercel dev
```

> **Catatan Offline & Standalone:**  
> Jika environment variable belum dikonfigurasi, sistem secara otomatis beralih ke mode **graceful in-memory mock**, sehingga seluruh tampilan UI, simulasi pendaftaran PPDB, buku tamu, dan panel admin tetap dapat didemokan tanpa error.

---

## Menjalankan Pengujian (Testing)

Proyek ini dilengkapi suite pengujian otomatis untuk validasi input, keamanan autentikasi, dan perlindungan XSS:
- Buka file `tests/validation.test.html` di browser untuk validasi unit test.
- Buka `tests/admin-auth-gate.property.test.html` untuk pengujian otentikasi admin.
- Buka `tests/ppdb-submission.property.test.html` untuk pengujian integritas pengiriman PPDB.
- Buka file `tests/xss-surface.property.test.html` untuk validasi keamanan injeksi script/XSS.

### Go-Live checklist

Sebelum production release:

1. Pastikan proyek Vercel terhubung ke `myalfian/PPJM`, branch `main`, dengan **Root Directory** `/` dan **Output Directory** `dist`.
   Konfigurasi repository saat ini menjalankan `npm run build` dan menghasilkan output production di `dist/`; jangan menimpa konfigurasi ini dengan output directory lain di Project Settings.
2. Isi `SUPABASE_URL`, `SUPABASE_ANON_KEY`, dan `GOOGLE_MAPS_API_KEY` melalui Vercel Environment Variables. Jangan menaruh nilai asli di `.env.example` atau Git.
3. Jalankan pemeriksaan lokal:

   ```bash
   npm run lint
   npm run build
   npm test
   npm run smoke
   ```

4. Setelah deploy, verifikasi `/api/health`, `/script.js`, `/style.css`, `/maps.js`, `/manifest.json`, dan `/sw.js` mengembalikan content type yang sesuai, bukan HTML fallback.
5. Karena kredensial pernah tersimpan pada histori repository, rotasi Google Maps API key dan tinjau/rotasi Supabase anon key sebelum production jika belum dilakukan.

`npm run smoke` menjalankan server lokal sementara dan memverifikasi routing asset, MIME type, fallback HTML, endpoint health, dan endpoint environment.

---

## Fitur Utama

1. **PPDB Terpadu**: Formulir online dengan validasi ketat, pelacakan status pendaftaran mandiri (Cek Status), dan cetak bukti registrasi resmi.
2. **Keamanan RLS & Audit Trail**: Perlindungan data pribadi pendaftar via Supabase Row Level Security dan log audit aktivitas admin.
3. **Agile School CMS**: Manajemen artikel, visual rich text editor TinyMCE, sistem recycle bin (soft-delete), dan manajemen galeri foto/video.
4. **Ekspor Data Pendaftar**: Kemudahan unduh seluruh data calon santri ke format CSV/Excel dengan satu klik.
5. **Aksesibilitas & Multi-Bahasa**: Dukungan Bahasa Indonesia (ID), English (EN), dan Arab (AR) dengan layout RTL dinamis.
