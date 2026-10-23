import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

const faqs = [
  {
    category: 'PPDB 2026',
    q: 'Bagaimana prosedur pendaftaran santri baru (PPDB) 2026/2027?',
    a: 'Pendaftaran dapat dilakukan secara online melalui tombol PPDB pada website ini dengan mengisi biodata calon santri, memilih paket nutrisi asrama, dan mengunggah berkas. Setelah itu calon santri akan mendapatkan Kartu Registrasi untuk jadwal tes baca Al-Qur\'an.'
  },
  {
    category: 'PPDB 2026',
    q: 'Berapa kuota penerimaan santri baru tahun ajaran 2026/2027?',
    a: 'Untuk menjaga kualitas bimbingan intensif dan kenyamanan asrama, kuota santri baru dibatasi 60 santri putra dan 60 santri putri untuk SMP Plus & Program Takhassus Tahfidz.'
  },
  {
    category: 'Kurikulum',
    q: 'Apa saja kurikulum yang diajarkan di SMP Plus Jauharul Maknuun?',
    a: 'Kurikulum memadukan standar nasional Kurikulum Merdeka Kemendikbudristek (berakreditasi "A" BAN-PDM), Program Takhassus Tahfidz Al-Qur\'an 30 Juz Bersanad, dan Madrasah Diniyah Salafiyah pengkajian kitab kuning maknani gandul.'
  },
  {
    category: 'Kurikulum',
    q: 'Bagaimana metode pembelajaran kitab kuning di pesantren?',
    a: 'Kami melestarikan metode khas pesantren Nusantara yaitu Sorogan (bimbingan privat per santri langsung kepada ustadz) dan Bandongan (pembacaan serta pemaknaan kitab secara klasikal berkelompok).'
  },
  {
    category: 'Asrama',
    q: 'Apakah asrama santri putra dan putri terpisah?',
    a: 'Ya, asrama santri putra dan santri putri berada di kompleks gedung terpisah dengan pengawasan ustadz/ustadzah pembina asrama serta petugas keamanan gerbang 24 jam.'
  },
  {
    category: 'Asrama',
    q: 'Bagaimana sistem katering makanan dan paket nutrisi santri?',
    a: 'Pesantren menyediakan katering halalan thayyiban 3 kali sehari. Tersedia pilihan paket Reguler 4 Sehat, Nutrisi Khusus Huffadz (asupan madu & omega-3), serta Menu Ramah Alergen bagi santri yang memiliki riwayat alergi tertentu.'
  }
];

import { FAQItem } from '../types';

export const FaqSection: React.FC<{ faqs?: FAQItem[] }> = ({ faqs: propFaqs = faqs }) => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const filtered = propFaqs.filter(f => {
    const matchCat = activeCategory === 'Semua' || f.category === activeCategory;
    const q = search.toLowerCase();
    const matchQ = f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <section id="faq" className="py-8 sm:py-10 bg-[#f1f7f2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-5 sm:space-y-6">
        
        <div className="text-center space-y-2">
          <span className="text-[11px] font-bold text-[#1a6b3c] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-emerald-200">
            Pusat Informasi
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4a28]">
            Pertanyaan Yang Sering Diajukan (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Jawaban lengkap seputar pendaftaran, kurikulum terpadu, serta kehidupan asrama santri.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {['Semua', 'PPDB 2026', 'Kurikulum', 'Asrama'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                activeCategory === cat
                  ? 'bg-[#1a6b3c] text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {filtered.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-[#0d4a28] flex items-center justify-between gap-3 hover:bg-gray-50/50 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#1a6b3c] shrink-0" />
                    <span>{item.q}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/30">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
