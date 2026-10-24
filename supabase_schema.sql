-- ============================================================
-- PPSPJM Portal — Supabase Schema & Security Setup
-- Pondok Pesantren Jauharul Maknuun Lasem
-- ============================================================

-- 1. Tabel PPDB (Pendaftaran Peserta Didik Baru)
CREATE TABLE IF NOT EXISTS ppdb_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  gender text,
  program text,
  phone text,
  address text,
  status text DEFAULT 'Menunggu Verifikasi',
  submitted_at timestamptz DEFAULT now()
);

-- Index untuk pencarian cepat
CREATE INDEX IF NOT EXISTS idx_ppdb_code ON ppdb_submissions(code);
CREATE INDEX IF NOT EXISTS idx_ppdb_phone ON ppdb_submissions(phone);
CREATE INDEX IF NOT EXISTS idx_ppdb_status ON ppdb_submissions(status);
CREATE INDEX IF NOT EXISTS idx_ppdb_submitted ON ppdb_submissions(submitted_at DESC);

-- RLS untuk PPDB: Anonim hanya boleh INSERT data baru; SELECT hanya untuk pengguna terautentikasi (pengelola/admin)
ALTER TABLE ppdb_submissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_ppdb" ON ppdb_submissions;
DROP POLICY IF EXISTS "anon_select_ppdb" ON ppdb_submissions;
DROP POLICY IF EXISTS "auth_all_ppdb" ON ppdb_submissions;

CREATE POLICY "anon_insert_ppdb" ON ppdb_submissions FOR INSERT TO anon WITH CHECK (true);
-- Anonim dilarang dump data (SELECT diserahkan ke RPC terverifikasi atau admin terautentikasi)
CREATE POLICY "auth_all_ppdb" ON ppdb_submissions FOR ALL TO authenticated USING (true);

-- 2. Tabel Buku Tamu / Testimoni
CREATE TABLE IF NOT EXISTS guestbook_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text DEFAULT 'Masyarakat Umum',
  rating integer CHECK (rating BETWEEN 1 AND 5) DEFAULT 5,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_gb_created ON guestbook_entries(created_at DESC);

-- RLS untuk Buku Tamu
ALTER TABLE guestbook_entries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_gb" ON guestbook_entries;
DROP POLICY IF EXISTS "anon_select_gb" ON guestbook_entries;
DROP POLICY IF EXISTS "auth_all_gb" ON guestbook_entries;

CREATE POLICY "anon_insert_gb" ON guestbook_entries FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_select_gb" ON guestbook_entries FOR SELECT TO anon USING (true);
CREATE POLICY "auth_all_gb" ON guestbook_entries FOR ALL TO authenticated USING (true);

-- 3. Tabel Artikel / Berita CMS (Posts)
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE,
  category text DEFAULT 'Berita',
  author text DEFAULT 'Panitia PPJM',
  date text,
  image text,
  status text DEFAULT 'published', -- 'published' | 'draft' | 'trash'
  tags text[],
  summary text,
  content text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at DESC);

-- RLS untuk Artikel CMS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_posts" ON posts;
DROP POLICY IF EXISTS "auth_all_posts" ON posts;

CREATE POLICY "anon_select_posts" ON posts FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "auth_all_posts" ON posts FOR ALL TO authenticated USING (true);

-- 4. Tabel Audit Trail & Log Aktivitas
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text,
  user_role text DEFAULT 'Admin',
  action text NOT NULL,
  badge text DEFAULT 'update',
  status text DEFAULT 'success',
  timestamp timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_logs_timestamp ON activity_logs(timestamp DESC);

-- RLS untuk Activity Logs
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_logs" ON activity_logs;
DROP POLICY IF EXISTS "auth_all_logs" ON activity_logs;

CREATE POLICY "anon_insert_logs" ON activity_logs FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "auth_all_logs" ON activity_logs FOR ALL TO authenticated USING (true);

-- ============================================================
-- Seed Data Awal (Opsional)
-- ============================================================
INSERT INTO posts (title, slug, category, author, date, image, status, summary, content)
VALUES
  (
    'Pendaftaran PPDB Santri Baru TP 2026/2027 Resmi Dibuka',
    'ppdb-santri-baru-2026-2027',
    'Pengumuman',
    'Panitia PPDB',
    '2026-02-20',
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    'published',
    'Pondok Pesantren Jauharul Maknuun Lasem resmi membuka Pendaftaran Peserta Didik Baru Gelombang I.',
    'Alhamdulillah, Pondok Pesantren Jauharul Maknuun Lasem membuka Pendaftaran Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027. Tersedia Program Pendidikan Terpadu Terakreditasi, Takhassus Tahfidzul Qur''an 30 Juz, dan Diniyah Kitab Kuning Salaf. Kuota terbatas 120 santri dengan sistem seleksi berkas, baca Al-Qur''an, dan tes potensi akademik.'
  ),
  (
    'Santri Jauharul Maknuun Raih Juara 1 Musabaqah Hifdzil Qur''an (MHQ) se-Jawa Tengah',
    'juara-1-mhq-jawa-tengah',
    'Prestasi',
    'Humas PPJM',
    '2026-02-14',
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    'published',
    'Prestasi gemilang diraih ananda Muhammad Faiz Al-Fatih kategori Tahfidz 10 Juz putra.',
    'Selamat dan apresiasi setinggi-tingginya kepada santri kami, Muhammad Faiz Al-Fatih yang berhasil meraih Juara 1 cabang MHQ 10 Juz dalam ajang Festival Santri Jawa Tengah di Semarang. Keberhasilan ini membuktikan komitmen PPJM dalam mencetak penghafal Al-Qur''an mutqin bersanad.'
  )
ON CONFLICT (slug) DO NOTHING;
