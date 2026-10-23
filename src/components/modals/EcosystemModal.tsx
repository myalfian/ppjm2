import React from 'react';
import { X, CheckCircle2, Laptop, GraduationCap, Users, CreditCard, QrCode } from 'lucide-react';

interface EcosystemModalProps {
  moduleKey: string | null;
  onClose: () => void;
}

const ecosystemData: Record<string, { title: string; desc: string; icon: any; features: string[] }> = {
  elearning: {
    title: 'Portal E-Learning & LMS Terpadu',
    desc: 'Platform pembelajaran digital terintegrasi Moodle & Google Classroom. Santri dapat mengakses modul kitab digital, video pembelajaran sains, dan tugas mandiri.',
    icon: Laptop,
    features: [
      'Akses Bahan Ajar Daring & Modul Kitab PDF',
      'Sistem Tugas & Penilaian Otomatis Santri',
      'Bank Soal Ujian Asesmen Berbasis Komputer (CBT)',
      'Forum Diskusi Santri & Asatidz Pengajar'
    ]
  },
  raport: {
    title: 'Portal Guru & Rapor Digital Pesantren',
    desc: 'Sistem penilaian Kurikulum Merdeka nasional digabungkan dengan Rapor Diniyah Salafiyah. Guru dan Asatidz dapat menginput capaian hafalan dan keilmuan kitab secara real-time.',
    icon: GraduationCap,
    features: [
      'Input Nilai Harian & Ujian Terpadu',
      'Pencatatan Kemajuan Juz & Mutqin Tahfidz',
      'Cetak Rapor Kurikulum Merdeka & Kitab Salaf',
      'Integrasi Data EMIS Kemenag & Dapodik Nasional'
    ]
  },
  wali: {
    title: 'Portal Santri & Wali Santri Mobile',
    desc: 'Aplikasi transparansi untuk orang tua memantau perkembangan hafalan, kedisiplinan, absensi harian, dan mutaba\'ah ibadah santri di pondok.',
    icon: Users,
    features: [
      'Mutaba\'ah Sholat Berjamaah & Pengajian Diniyah',
      'Laporan Riwayat Setoran Ayat Al-Qur\'an Ba\'da Shubuh',
      'Informasi Riwayat Kesehatan di Pos Medis Santri',
      'Sistem Izin Sambang & Pulang Berbasis Verifikasi'
    ]
  },
  presensi: {
    title: 'Sistem Absensi Digital RFID & Biometrik',
    desc: 'Presensi otomatis sholat tahajud, subuh berjamaah, sekolah pagi, dan kegiatan diniyah malam menggunakan Kartu Santri Digital berbasis RFID.',
    icon: QrCode,
    features: [
      'Notifikasi Otomatis ke WhatsApp Wali saat Hadir',
      'Deteksi Keterlambatan Real-time',
      'Rekap Kehadiran untuk Rapor Bulanan Santri',
      'Sistem Perizinan Pulang Pesantren Berbasis Barcode'
    ]
  },
  pembayaran: {
    title: 'Sistem Pembayaran Syahriah & SPP Online',
    desc: 'Gateway pembayaran terhubung Virtual Account (BSI, Mandiri, BRI, BCA) dan QRIS untuk kemudahan pembayaran iuran bulanan dan uang makan santri.',
    icon: CreditCard,
    features: [
      'Virtual Account Otomatis لكل Santri Baru',
      'Notifikasi Bukti Pembayaran Digital Otomatis',
      'Laporan Arus Kas Komite Sekolah Transparan',
      'Riwayat Tagihan & Bebas Antre Loket Pesantren'
    ]
  }
};

export const EcosystemModal: React.FC<EcosystemModalProps> = ({ moduleKey, onClose }) => {
  if (!moduleKey) return null;
  const data = ecosystemData[moduleKey] || ecosystemData.elearning;
  const Icon = data.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c] p-6 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-[#d4af37]">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-[#d4af37] font-bold uppercase tracking-wider">
                Ekosistem Digital PPJM
              </span>
              <h3 className="text-base sm:text-lg font-bold">{data.title}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-gray-600 leading-relaxed">
            {data.desc}
          </p>

          <div className="space-y-2 pt-2">
            <h4 className="font-bold text-xs text-[#0d4a28] uppercase tracking-wider">
              Fitur Utama Sistem:
            </h4>
            <ul className="space-y-2">
              {data.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-[#1a6b3c] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold text-xs rounded-xl shadow-md transition"
            >
              Tutup Pratinjau
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
