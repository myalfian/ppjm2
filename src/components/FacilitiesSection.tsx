import React from 'react';
import { Monitor, Home, BookOpen, Stethoscope, Utensils, Shield, Sparkles } from 'lucide-react';

const facilities = [
  {
    title: 'Lab Komputer & Riset STEM',
    desc: 'Dilengkapi 40 unit PC modern dengan koneksi fiber optic cepat untuk praktikum coding, literasi digital, dan ujian CBT.',
    icon: Monitor,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    tag: 'Laboratorium IT'
  },
  {
    title: 'Asrama Santri Putra & Putri',
    desc: 'Kamar representatif, ranjang bertingkat kokoh, sirkulasi udara sejuk, lemari pribadi, serta pemisahan area putra-putri yang terjaga.',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
    tag: 'Boarding Kondusif'
  },
  {
    title: 'Masjid Jami\' Pesantren',
    desc: 'Pusat ibadah shalat berjamaah 5 waktu, dzikir ratibul haddad, serta halaqah tahfidz ba\'da Subuh dan Maghrib santri.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=600&q=80',
    tag: 'Pusat Ibadah'
  },
  {
    title: 'Perpustakaan Kitab & Digital',
    desc: 'Menyimpan ribuan jilid kitab kuning klasik, buku referensi kurikulum nasional, serta akses jurnal digital santri.',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
    tag: 'Khazanah Turats'
  },
  {
    title: 'Poskestren & UKS 24 Jam',
    desc: 'Klinik kesehatan dasar dengan perawat siaga, obat-obatan esensial, serta kerja sama rujukan dengan RSUD terdekat.',
    icon: Stethoscope,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    tag: 'Layanan Medis'
  },
  {
    title: 'Dapur & Katering Gizi Terpadu',
    desc: 'Penyajian makanan halalan thayyiban 3 kali sehari dengan menu 4 sehat 5 sempurna dan perhatian khusus alergi santri.',
    icon: Utensils,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80',
    tag: 'Nutrisi Halal'
  }
];

export const FacilitiesSection: React.FC = () => {
  return (
    <section id="facilities" className="py-16 bg-white relative scroll-mt-20">
      <div id="fasilitas" className="absolute -top-16 left-0 scroll-mt-24 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[11px] font-bold text-[#1a6b3c] uppercase tracking-wider bg-[#1a6b3c]/10 px-3 py-1 rounded-full">
            Sarana & Prasarana
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4a28] mt-2">
            Fasilitas Penunjang Pendidikan & Asrama
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Menciptakan lingkungan belajar dan tinggal yang aman, nyaman, dan mendukung akselerasi prestasi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <div
                key={idx}
                className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-md transition group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img
                      src={fac.image}
                      alt={fac.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#1a6b3c] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow">
                      {fac.tag}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#1a6b3c]/10 text-[#1a6b3c] flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-[#1a6b3c] transition">
                        {fac.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {fac.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 text-[11px] font-bold text-[#1a6b3c] flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Standar Higienis & Terawat</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
