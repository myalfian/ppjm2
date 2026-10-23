import React from 'react';
import { 
  Laptop, 
  GraduationCap, 
  Users, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  QrCode
} from 'lucide-react';

interface EcosystemSectionProps {
  onOpenEcosystemModal: (moduleKey: string) => void;
}

const modules = [
  {
    key: 'elearning',
    title: 'Portal E-Learning & LMS',
    desc: 'Platform belajar daring terintegrasi materi kitab digital, bank soal CBT, dan video sains.',
    icon: Laptop,
    badge: 'Moodle & CBT',
    color: 'emerald'
  },
  {
    key: 'raport',
    title: 'Rapor Digital Terpadu',
    desc: 'Integrasi penilaian Kurikulum Merdeka nasional dan Rapor Diniyah Kitab Salafiyah.',
    icon: GraduationCap,
    badge: 'Dapodik & EMIS',
    color: 'amber'
  },
  {
    key: 'wali',
    title: 'Portal Wali Santri',
    desc: 'Pantau riwayat hafalan Quran, izin sambang, dan mutaba\'ah ibadah santri real-time.',
    icon: Users,
    badge: 'Mutaba\'ah 24 Jam',
    color: 'blue'
  },
  {
    key: 'presensi',
    title: 'Presensi RFID Santri',
    desc: 'Kartu santri pintar untuk absensi sholat berjamaah, sekolah, dan akses asrama.',
    icon: QrCode,
    badge: 'Notifikasi WA',
    color: 'purple'
  },
  {
    key: 'pembayaran',
    title: 'SPP Online & Syahriah',
    desc: 'Kemudahan iuran bulanan via Virtual Account (BSI, Mandiri, BRI) & QRIS otomatis.',
    icon: CreditCard,
    badge: 'Multi-Bank VA',
    color: 'emerald'
  }
];

export const EcosystemSection: React.FC<EcosystemSectionProps> = ({ onOpenEcosystemModal }) => {
  return (
    <section className="py-12 bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[11px] font-bold text-[#1a6b3c] uppercase tracking-wider bg-[#1a6b3c]/10 px-3 py-1 rounded-full">
            Inovasi Pesantren Modern
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0d4a28] mt-2">
            Ekosistem Digital Pondok & SMP Plus JM
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Teknologi terintegrasi untuk kenyamanan santri, kemudahan asatidz, dan transparansi wali santri.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.key}
                onClick={() => onOpenEcosystemModal(m.key)}
                className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#1a6b3c]/50 transition cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1a6b3c]/10 text-[#1a6b3c] flex items-center justify-center group-hover:bg-[#1a6b3c] group-hover:text-white transition duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold text-[#d4af37] bg-[#fef3c7] px-2 py-0.5 rounded-md">
                      {m.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-[#1a6b3c] transition">
                    {m.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed line-clamp-3">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 mt-3 flex items-center justify-between text-[11px] font-bold text-[#1a6b3c]">
                  <span>Fitur Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
