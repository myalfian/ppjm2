-- ==============================================================================
-- SISTEM INFORMASI PONDOK PESANTREN JAUHARUL MAKNUUN LASEM
-- ROLE-BASED ACCESS CONTROL (RBAC) & SUPABASE PRODUCTION DATABASE SCHEMA
-- ==============================================================================
-- Roles:
-- 1. super_admin       : Full system administrator (bypass all rules)
-- 2. pimpinan          : Read-only analytics & monitoring across all modules
-- 3. guru              : Penilaian akademik, presensi & pembelajaran SMP
-- 4. musyrif           : Pengasuhan, perizinan keluar/sambang & ketertiban asrama
-- 5. pengampu_tahfidz  : Setoran hafalan harian (ziyadah) & muraja'ah 30 juz
-- 6. bendahara         : Manajemen tagihan SPP, infaq & konfirmasi transaksi
-- 7. wali_santri       : Pemantauan multi-anak (tahfidz, izin, rapor, tagihan)
-- 8. santri            : Portal mandiri santri (jadwal, nilai & hafalan pribadi)
-- ==============================================================================

-- 0. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. ENUM TYPES
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
        CREATE TYPE public.app_role AS ENUM (
            'super_admin',
            'pimpinan',
            'guru',
            'musyrif',
            'pengampu_tahfidz',
            'bendahara',
            'wali_santri',
            'santri'
        );
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'jenis_kelamin') THEN
        CREATE TYPE public.jenis_kelamin AS ENUM ('Laki-laki', 'Perempuan');
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_santri') THEN
        CREATE TYPE public.status_santri AS ENUM ('aktif', 'alumni', 'mutasi', 'cuti', 'drop_out');
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'jenis_hafalan') THEN
        CREATE TYPE public.jenis_hafalan AS ENUM ('ziyadah', 'murajaah', 'tasmi');
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_perizinan') THEN
        CREATE TYPE public.status_perizinan AS ENUM ('pending', 'approved', 'rejected', 'returned', 'overdue');
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_pembayaran') THEN
        CREATE TYPE public.status_pembayaran AS ENUM ('belum_lunas', 'lunas', 'dibatalkan', 'cicilan');
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'hubungan_wali') THEN
        CREATE TYPE public.hubungan_wali AS ENUM ('ayah', 'ibu', 'wali');
    END IF;
END $$;

-- 2. MASTER & REFERENCE TABLES

-- Master Asrama
CREATE TABLE IF NOT EXISTS public.asrama (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama_asrama VARCHAR(100) NOT NULL,
    kategori public.jenis_kelamin NOT NULL,
    musyrif_id UUID, -- Akan direferensikan ke profiles setelah tabel dibuat
    kapasitas INT NOT NULL DEFAULT 40,
    keterangan TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Master Kelas SMP Plus
CREATE TABLE IF NOT EXISTS public.kelas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama_kelas VARCHAR(50) NOT NULL,
    tingkat INT NOT NULL CHECK (tingkat IN (7, 8, 9)),
    wali_kelas_id UUID, -- Akan direferensikan ke profiles setelah tabel dibuat
    tahun_ajaran VARCHAR(20) NOT NULL DEFAULT '2026/2027',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. CORE PROFILES TABLE (Linked with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    role public.app_role NOT NULL DEFAULT 'wali_santri',
    phone_number VARCHAR(25),
    identity_number VARCHAR(35), -- NIK / NUPTK / NISN
    avatar_url TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Foreign Key Constraints untuk Asrama & Kelas
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_asrama_musyrif'
    ) THEN
        ALTER TABLE public.asrama 
        ADD CONSTRAINT fk_asrama_musyrif 
        FOREIGN KEY (musyrif_id) REFERENCES public.profiles(id) ON DELETE SET NULL;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_kelas_wali'
    ) THEN
        ALTER TABLE public.kelas 
        ADD CONSTRAINT fk_kelas_wali 
        FOREIGN KEY (wali_kelas_id) REFERENCES public.profiles(id) ON DELETE SET NULL;
    END IF;
END $$;

-- 4. TABEL SANTRI (Data Induk Santri / Siswa)
CREATE TABLE IF NOT EXISTS public.santri (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL, -- Opsional: akun login santri
    nisn VARCHAR(20) UNIQUE NOT NULL,
    nik VARCHAR(20) UNIQUE,
    nama_lengkap VARCHAR(150) NOT NULL,
    jenis_kelamin public.jenis_kelamin NOT NULL,
    tempat_lahir VARCHAR(100),
    tanggal_lahir DATE,
    kelas_id UUID REFERENCES public.kelas(id) ON DELETE SET NULL,
    asrama_id UUID REFERENCES public.asrama(id) ON DELETE SET NULL,
    status public.status_santri NOT NULL DEFAULT 'aktif',
    alamat_lengkap TEXT,
    foto_santri_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. TABEL RELASI WALI DAN SANTRI (Many-to-Many / Family Binding)
CREATE TABLE IF NOT EXISTS public.wali_santri_relation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wali_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    santri_id UUID NOT NULL REFERENCES public.santri(id) ON DELETE CASCADE,
    hubungan public.hubungan_wali NOT NULL DEFAULT 'wali',
    is_primary BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_wali_santri UNIQUE (wali_id, santri_id)
);

-- 6. TABEL HAFALAN TAHFIDZ (Setoran Harian, Ziyadah & Muraja'ah)
CREATE TABLE IF NOT EXISTS public.hafalan_tahfidz (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    santri_id UUID NOT NULL REFERENCES public.santri(id) ON DELETE CASCADE,
    pengampu_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
    surat_mulai VARCHAR(100) NOT NULL,
    ayat_mulai INT NOT NULL CHECK (ayat_mulai > 0),
    surat_selesai VARCHAR(100) NOT NULL,
    ayat_selesai INT NOT NULL CHECK (ayat_selesai > 0),
    jenis public.jenis_hafalan NOT NULL DEFAULT 'ziyadah',
    nilai VARCHAR(10) NOT NULL DEFAULT 'A', -- A, B+, B, C, Jayyid, Mumtaz
    predikat VARCHAR(50) DEFAULT 'Mutqin',  -- Mutqin, Jayyid Jiddan, Perlu Pengulangan
    catatan TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. TABEL PERIZINAN ASRAMA (Pulang / Izin Keluar Pesantren)
CREATE TABLE IF NOT EXISTS public.perizinan_asrama (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    santri_id UUID NOT NULL REFERENCES public.santri(id) ON DELETE CASCADE,
    diajukan_oleh UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    musyrif_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    tgl_keluar TIMESTAMPTZ NOT NULL,
    tgl_kembali TIMESTAMPTZ NOT NULL,
    alasan TEXT NOT NULL,
    penjemput_nama VARCHAR(100),
    penjemput_kontak VARCHAR(25),
    status public.status_perizinan NOT NULL DEFAULT 'pending',
    catatan_musyrif TEXT,
    waktu_kembali_aktual TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. TABEL TAGIHAN KEUANGAN (SPP, Makan, Infaq Asrama)
CREATE TABLE IF NOT EXISTS public.tagihan_keuangan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    santri_id UUID NOT NULL REFERENCES public.santri(id) ON DELETE CASCADE,
    bendahara_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    kode_tagihan VARCHAR(50) UNIQUE NOT NULL,
    jenis_tagihan VARCHAR(100) NOT NULL, -- SPP & Katering, Uang Pangkal, Buku & Kitab, Ujian CBT
    periode VARCHAR(30) NOT NULL,        -- Contoh: 'Oktober 2026'
    nominal NUMERIC(12,2) NOT NULL CHECK (nominal > 0),
    status_pembayaran public.status_pembayaran NOT NULL DEFAULT 'belum_lunas',
    tgl_jatuh_tempo DATE NOT NULL,
    tgl_bayar TIMESTAMPTZ,
    metode_pembayaran VARCHAR(50),       -- VA BCA, Tunai Kasir, QRIS, Bank Jateng Syariah
    bukti_bayar_url TEXT,
    catatan TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. TABEL NILAI AKADEMIK (Kurikulum Merdeka SMP Plus)
CREATE TABLE IF NOT EXISTS public.nilai_akademik (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    santri_id UUID NOT NULL REFERENCES public.santri(id) ON DELETE CASCADE,
    guru_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    mata_pelajaran VARCHAR(100) NOT NULL,
    semester INT NOT NULL CHECK (semester IN (1, 2)),
    tahun_ajaran VARCHAR(20) NOT NULL DEFAULT '2026/2027',
    jenis_ujian VARCHAR(50) NOT NULL,    -- Tugas, Formatif, Sumatif Lingkup Materi, ATS, AAS
    nilai NUMERIC(5,2) NOT NULL CHECK (nilai >= 0 AND nilai <= 100),
    capaian_kompetensi TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- HELPER FUNCTIONS FOR SECURITY DEFINER & RLS POLICIES
-- ==============================================================================

-- Fungsi helper mengecek role user saat ini secara cepat
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS public.app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT role FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$;

-- Fungsi helper memeriksa apakah auth.uid() adalah wali dari santri_id
CREATE OR REPLACE FUNCTION public.is_wali_of_santri(target_santri_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 
        FROM public.wali_santri_relation 
        WHERE wali_id = auth.uid() 
          AND santri_id = target_santri_id
    );
$$;

-- Fungsi helper memeriksa apakah santri sedang mengakses akun dirinya sendiri
CREATE OR REPLACE FUNCTION public.is_santri_self(target_santri_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 
        FROM public.santri 
        WHERE user_id = auth.uid() 
          AND id = target_santri_id
    );
$$;

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Aktifkan RLS pada seluruh tabel publik
ALTER TABLE public.asrama ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kelas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.santri ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wali_santri_relation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hafalan_tahfidz ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.perizinan_asrama ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tagihan_keuangan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nilai_akademik ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- A. POLICIES: PROFILES
-- ------------------------------------------------------------------------------
-- Super admin memiliki kontrol penuh
CREATE POLICY "super_admin_manage_profiles" ON public.profiles
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'super_admin')
    WITH CHECK (public.current_user_role() = 'super_admin');

-- Pimpinan dapat melihat seluruh profil
CREATE POLICY "pimpinan_view_profiles" ON public.profiles
    FOR SELECT TO authenticated
    USING (public.current_user_role() = 'pimpinan');

-- Pengguna dapat melihat dan mengedit profil miliknya sendiri
CREATE POLICY "user_view_own_profile" ON public.profiles
    FOR SELECT TO authenticated
    USING (id = auth.uid());

CREATE POLICY "user_update_own_profile" ON public.profiles
    FOR UPDATE TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid() AND role = public.current_user_role()); -- Mencegah eskalasi role sendiri

-- Staff (guru, musyrif, tahfidz, bendahara) dapat membaca profil publik staf lainnya
CREATE POLICY "staff_view_all_profiles" ON public.profiles
    FOR SELECT TO authenticated
    USING (public.current_user_role() IN ('guru', 'musyrif', 'pengampu_tahfidz', 'bendahara'));

-- ------------------------------------------------------------------------------
-- B. POLICIES: SANTRI
-- ------------------------------------------------------------------------------
-- Super admin memiliki hak penuh
CREATE POLICY "super_admin_manage_santri" ON public.santri
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'super_admin')
    WITH CHECK (public.current_user_role() = 'super_admin');

-- Pimpinan, Guru, Musyrif, Tahfidz, Bendahara dapat melihat semua santri
CREATE POLICY "staff_and_pimpinan_view_santri" ON public.santri
    FOR SELECT TO authenticated
    USING (public.current_user_role() IN ('pimpinan', 'guru', 'musyrif', 'pengampu_tahfidz', 'bendahara'));

-- Wali santri hanya bisa melihat data santri yang terhubung dengan mereka
CREATE POLICY "wali_view_connected_santri" ON public.santri
    FOR SELECT TO authenticated
    USING (public.is_wali_of_santri(id));

-- Santri hanya bisa melihat data miliknya sendiri
CREATE POLICY "santri_view_self" ON public.santri
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

-- ------------------------------------------------------------------------------
-- C. POLICIES: WALI SANTRI RELATION
-- ------------------------------------------------------------------------------
CREATE POLICY "super_admin_manage_wali_relation" ON public.wali_santri_relation
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'super_admin')
    WITH CHECK (public.current_user_role() = 'super_admin');

CREATE POLICY "staff_pimpinan_view_wali_relation" ON public.wali_santri_relation
    FOR SELECT TO authenticated
    USING (public.current_user_role() IN ('pimpinan', 'guru', 'musyrif', 'pengampu_tahfidz', 'bendahara'));

CREATE POLICY "wali_view_own_relations" ON public.wali_santri_relation
    FOR SELECT TO authenticated
    USING (wali_id = auth.uid());

-- ------------------------------------------------------------------------------
-- D. POLICIES: HAFALAN TAHFIDZ
-- ------------------------------------------------------------------------------
-- Super admin full access
CREATE POLICY "super_admin_manage_hafalan" ON public.hafalan_tahfidz
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'super_admin')
    WITH CHECK (public.current_user_role() = 'super_admin');

-- Pimpinan read-only monitoring
CREATE POLICY "pimpinan_view_hafalan" ON public.hafalan_tahfidz
    FOR SELECT TO authenticated
    USING (public.current_user_role() = 'pimpinan');

-- Pengampu tahfidz dapat mengelola (SELECT, INSERT, UPDATE, DELETE) seluruh data setoran
CREATE POLICY "tahfidz_manage_hafalan" ON public.hafalan_tahfidz
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'pengampu_tahfidz')
    WITH CHECK (public.current_user_role() = 'pengampu_tahfidz');

-- Wali santri hanya bisa SELECT data hafalan santri binaannya
CREATE POLICY "wali_view_santri_hafalan" ON public.hafalan_tahfidz
    FOR SELECT TO authenticated
    USING (public.is_wali_of_santri(santri_id));

-- Santri bisa membaca riwayat hafalan dirinya
CREATE POLICY "santri_view_own_hafalan" ON public.hafalan_tahfidz
    FOR SELECT TO authenticated
    USING (public.is_santri_self(santri_id));

-- ------------------------------------------------------------------------------
-- E. POLICIES: PERIZINAN ASRAMA
-- ------------------------------------------------------------------------------
-- Super admin full access
CREATE POLICY "super_admin_manage_perizinan" ON public.perizinan_asrama
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'super_admin')
    WITH CHECK (public.current_user_role() = 'super_admin');

-- Pimpinan read-only
CREATE POLICY "pimpinan_view_perizinan" ON public.perizinan_asrama
    FOR SELECT TO authenticated
    USING (public.current_user_role() = 'pimpinan');

-- Musyrif mengontrol & memverifikasi perizinan asrama (SELECT, INSERT, UPDATE)
CREATE POLICY "musyrif_manage_perizinan" ON public.perizinan_asrama
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'musyrif')
    WITH CHECK (public.current_user_role() = 'musyrif');

-- Wali santri bisa melihat perizinan santrinya
CREATE POLICY "wali_view_santri_perizinan" ON public.perizinan_asrama
    FOR SELECT TO authenticated
    USING (public.is_wali_of_santri(santri_id));

-- Wali santri dapat mengajukan permohonan izin (INSERT) untuk santrinya
CREATE POLICY "wali_request_perizinan" ON public.perizinan_asrama
    FOR INSERT TO authenticated
    WITH CHECK (
        public.is_wali_of_santri(santri_id) 
        AND diajukan_oleh = auth.uid()
        AND status = 'pending'
    );

-- Santri bisa melihat status perizinan dirinya
CREATE POLICY "santri_view_own_perizinan" ON public.perizinan_asrama
    FOR SELECT TO authenticated
    USING (public.is_santri_self(santri_id));

-- ------------------------------------------------------------------------------
-- F. POLICIES: TAGIHAN KEUANGAN
-- ------------------------------------------------------------------------------
-- Super admin full access
CREATE POLICY "super_admin_manage_tagihan" ON public.tagihan_keuangan
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'super_admin')
    WITH CHECK (public.current_user_role() = 'super_admin');

-- Pimpinan read-only monitoring keuangan
CREATE POLICY "pimpinan_view_tagihan" ON public.tagihan_keuangan
    FOR SELECT TO authenticated
    USING (public.current_user_role() = 'pimpinan');

-- Bendahara mengelola penuh tabel tagihan keuangan (INSERT, UPDATE, DELETE, SELECT)
CREATE POLICY "bendahara_manage_tagihan" ON public.tagihan_keuangan
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'bendahara')
    WITH CHECK (public.current_user_role() = 'bendahara');

-- Wali santri hanya bisa melihat tagihan santrinya
CREATE POLICY "wali_view_santri_tagihan" ON public.tagihan_keuangan
    FOR SELECT TO authenticated
    USING (public.is_wali_of_santri(santri_id));

-- Wali santri dapat mengunggah bukti pembayaran (UPDATE field bukti_bayar_url saat belum lunas)
CREATE POLICY "wali_upload_bukti_tagihan" ON public.tagihan_keuangan
    FOR UPDATE TO authenticated
    USING (public.is_wali_of_santri(santri_id))
    WITH CHECK (
        public.is_wali_of_santri(santri_id)
        AND status_pembayaran = 'belum_lunas'
    );

-- Santri bisa melihat tagihan miliknya
CREATE POLICY "santri_view_own_tagihan" ON public.tagihan_keuangan
    FOR SELECT TO authenticated
    USING (public.is_santri_self(santri_id));

-- ------------------------------------------------------------------------------
-- G. POLICIES: NILAI AKADEMIK
-- ------------------------------------------------------------------------------
-- Super admin full access
CREATE POLICY "super_admin_manage_nilai" ON public.nilai_akademik
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'super_admin')
    WITH CHECK (public.current_user_role() = 'super_admin');

-- Pimpinan read-only
CREATE POLICY "pimpinan_view_nilai" ON public.nilai_akademik
    FOR SELECT TO authenticated
    USING (public.current_user_role() = 'pimpinan');

-- Guru dapat menginput dan mengedit nilai akademik (INSERT, UPDATE, SELECT)
CREATE POLICY "guru_manage_nilai" ON public.nilai_akademik
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'guru')
    WITH CHECK (public.current_user_role() = 'guru');

-- Wali santri hanya bisa SELECT nilai rapor akademik santrinya
CREATE POLICY "wali_view_santri_nilai" ON public.nilai_akademik
    FOR SELECT TO authenticated
    USING (public.is_wali_of_santri(santri_id));

-- Santri bisa membaca nilai hasil belajarnya sendiri
CREATE POLICY "santri_view_own_nilai" ON public.nilai_akademik
    FOR SELECT TO authenticated
    USING (public.is_santri_self(santri_id));

-- ------------------------------------------------------------------------------
-- H. POLICIES: KELAS & ASRAMA (MASTER)
-- ------------------------------------------------------------------------------
CREATE POLICY "all_authenticated_view_kelas" ON public.kelas
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "super_admin_manage_kelas" ON public.kelas
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'super_admin')
    WITH CHECK (public.current_user_role() = 'super_admin');

CREATE POLICY "all_authenticated_view_asrama" ON public.asrama
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "musyrif_manage_asrama" ON public.asrama
    FOR UPDATE TO authenticated
    USING (public.current_user_role() IN ('super_admin', 'musyrif'))
    WITH CHECK (public.current_user_role() IN ('super_admin', 'musyrif'));

-- ==============================================================================
-- DATABASE TRIGGERS & SECURITY AUDITING
-- ==============================================================================

-- 1. Otomatisasi Updated_At Timestamp Function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Terapkan Trigger Updated_At ke seluruh tabel yang relevan
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at 
    BEFORE UPDATE ON public.profiles 
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_santri_updated_at ON public.santri;
CREATE TRIGGER trg_santri_updated_at 
    BEFORE UPDATE ON public.santri 
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_perizinan_updated_at ON public.perizinan_asrama;
CREATE TRIGGER trg_perizinan_updated_at 
    BEFORE UPDATE ON public.perizinan_asrama 
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_tagihan_updated_at ON public.tagihan_keuangan;
CREATE TRIGGER trg_tagihan_updated_at 
    BEFORE UPDATE ON public.tagihan_keuangan 
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_nilai_updated_at ON public.nilai_akademik;
CREATE TRIGGER trg_nilai_updated_at 
    BEFORE UPDATE ON public.nilai_akademik 
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 2. Trigger Otomatis Pembuatan Record Profile saat User Mendaftar di auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    default_role public.app_role;
    user_full_name TEXT;
    user_identity TEXT;
    user_phone TEXT;
BEGIN
    -- Ekstrak data dari metadata auth jika tersedia
    user_full_name := COALESCE(
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'name',
        SPLIT_PART(NEW.email, '@', 1)
    );

    user_identity := NEW.raw_user_meta_data->>'identity_number';
    user_phone := COALESCE(NEW.phone, NEW.raw_user_meta_data->>'phone');

    -- Tentukan role awal (fallback ke wali_santri jika tidak ditentukan)
    BEGIN
        default_role := (NEW.raw_user_meta_data->>'role')::public.app_role;
    EXCEPTION WHEN OTHERS THEN
        default_role := 'wali_santri'::public.app_role;
    END;

    INSERT INTO public.profiles (
        id,
        full_name,
        role,
        phone_number,
        identity_number,
        avatar_url,
        metadata
    ) VALUES (
        NEW.id,
        user_full_name,
        default_role,
        user_phone,
        user_identity,
        NEW.raw_user_meta_data->>'avatar_url',
        COALESCE(NEW.raw_user_meta_data, '{}'::jsonb)
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        phone_number = COALESCE(EXCLUDED.phone_number, public.profiles.phone_number),
        updated_at = now();

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- DATABASE INDEXES (Optimal RLS Performance & Fast Querying)
-- ==============================================================================

-- Index pada Profil
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles (role);
CREATE INDEX IF NOT EXISTS idx_profiles_identity ON public.profiles (identity_number);

-- Index pada Santri (Pencarian & Foreign Keys)
CREATE INDEX IF NOT EXISTS idx_santri_nisn ON public.santri (nisn);
CREATE INDEX IF NOT EXISTS idx_santri_nama ON public.santri (nama_lengkap);
CREATE INDEX IF NOT EXISTS idx_santri_status ON public.santri (status);
CREATE INDEX IF NOT EXISTS idx_santri_kelas_id ON public.santri (kelas_id);
CREATE INDEX IF NOT EXISTS idx_santri_asrama_id ON public.santri (asrama_id);
CREATE INDEX IF NOT EXISTS idx_santri_user_id ON public.santri (user_id);

-- Composite Index Krusial untuk Filter RLS Wali
CREATE INDEX IF NOT EXISTS idx_wali_santri_rel ON public.wali_santri_relation (wali_id, santri_id);
CREATE INDEX IF NOT EXISTS idx_santri_wali_rel ON public.wali_santri_relation (santri_id, wali_id);

-- Index Tahfidz
CREATE INDEX IF NOT EXISTS idx_hafalan_santri ON public.hafalan_tahfidz (santri_id, tanggal DESC);
CREATE INDEX IF NOT EXISTS idx_hafalan_pengampu ON public.hafalan_tahfidz (pengampu_id);
CREATE INDEX IF NOT EXISTS idx_hafalan_jenis ON public.hafalan_tahfidz (jenis);

-- Index Perizinan Asrama
CREATE INDEX IF NOT EXISTS idx_perizinan_santri ON public.perizinan_asrama (santri_id, status);
CREATE INDEX IF NOT EXISTS idx_perizinan_status ON public.perizinan_asrama (status);
CREATE INDEX IF NOT EXISTS idx_perizinan_diajukan ON public.perizinan_asrama (diajukan_oleh);

-- Index Tagihan Keuangan
CREATE INDEX IF NOT EXISTS idx_tagihan_santri ON public.tagihan_keuangan (santri_id, status_pembayaran);
CREATE INDEX IF NOT EXISTS idx_tagihan_status ON public.tagihan_keuangan (status_pembayaran);
CREATE INDEX IF NOT EXISTS idx_tagihan_kode ON public.tagihan_keuangan (kode_tagihan);
CREATE INDEX IF NOT EXISTS idx_tagihan_jatuh_tempo ON public.tagihan_keuangan (tgl_jatuh_tempo);

-- Index Nilai Akademik
CREATE INDEX IF NOT EXISTS idx_nilai_santri ON public.nilai_akademik (santri_id, mata_pelajaran);
CREATE INDEX IF NOT EXISTS idx_nilai_guru ON public.nilai_akademik (guru_id);
CREATE INDEX IF NOT EXISTS idx_nilai_mapel_semester ON public.nilai_akademik (mata_pelajaran, semester, tahun_ajaran);
