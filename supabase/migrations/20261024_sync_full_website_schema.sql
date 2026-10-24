-- ==============================================================================
-- PONDOK PESANTREN JAUHARUL MAKNUUN LASEM
-- MIGRATION: 20261024_sync_full_website_schema.sql
-- Sinkronisasi Skema Database Supabase dengan Kebutuhan Website Secara Menyeluruh
-- ==============================================================================

-- 1. Tambah Kolom Ujian CBT Online di Tabel PPDB Submissions
ALTER TABLE public.ppdb_submissions 
  ADD COLUMN IF NOT EXISTS cbt_score INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS cbt_total INTEGER DEFAULT 20,
  ADD COLUMN IF NOT EXISTS cbt_status TEXT DEFAULT 'Belum Mengikuti';

-- 2. Pembuatan Tabel Dokumentasi & Galeri Media (Foto / Video)
CREATE TABLE IF NOT EXISTS public.media_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text DEFAULT 'kegiatan',
  type text DEFAULT 'photo',
  url text NOT NULL,
  size text,
  description text,
  date text,
  location text,
  duration text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_media_category ON public.media_gallery(category);
CREATE INDEX IF NOT EXISTS idx_media_created ON public.media_gallery(created_at DESC);

ALTER TABLE public.media_gallery ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'media_gallery' AND policyname = 'anon_select_media') THEN
    CREATE POLICY "anon_select_media" ON public.media_gallery FOR SELECT TO anon USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'media_gallery' AND policyname = 'auth_all_media') THEN
    CREATE POLICY "auth_all_media" ON public.media_gallery FOR ALL TO authenticated USING (true);
  END IF;
END $$;

-- 3. Pembuatan Tabel Profil & Pengaturan Identitas Resmi Lembaga
CREATE TABLE IF NOT EXISTS public.institution_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL DEFAULT 'main',
  name text NOT NULL DEFAULT 'Pondok Pesantren Jauharul Maknuun',
  tagline text,
  address text,
  city text,
  phone text,
  whatsapp text,
  email text,
  accreditation text,
  npsn text,
  nsm text,
  foundation text,
  maps_embed_url text,
  facebook_url text,
  instagram_url text,
  youtube_url text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.institution_settings ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'institution_settings' AND policyname = 'anon_select_settings') THEN
    CREATE POLICY "anon_select_settings" ON public.institution_settings FOR SELECT TO anon USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'institution_settings' AND policyname = 'auth_all_settings') THEN
    CREATE POLICY "auth_all_settings" ON public.institution_settings FOR ALL TO authenticated USING (true);
  END IF;
END $$;

-- 4. Pembuatan Tabel Konten Portal Dinamis (Hero Slider, FAQ, Fasilitas, About)
CREATE TABLE IF NOT EXISTS public.portal_content (
  key text PRIMARY KEY,
  content jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.portal_content ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'portal_content' AND policyname = 'anon_select_portal_content') THEN
    CREATE POLICY "anon_select_portal_content" ON public.portal_content FOR SELECT TO anon USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'portal_content' AND policyname = 'auth_all_portal_content') THEN
    CREATE POLICY "auth_all_portal_content" ON public.portal_content FOR ALL TO authenticated USING (true);
  END IF;
END $$;
