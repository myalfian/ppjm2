import React from 'react';
import { Award, Check, ShieldCheck, Heart, Compass, Users2, BookMarked, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Sambutan Direktur / Pengasuh */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                alt="Pengasuh PP Jauharul Maknuun"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] text-[#d4af37] font-bold uppercase tracking-wider">Pengasuh Pesantren</span>
                <h3 className="text-lg font-bold">KH. Ahmad Zaini, M.Pd.I</h3>
                <p className="text-xs text-gray-300">Direktur Pondok & SMP Plus Jauharul Maknuun</p>
              </div>
            </div>
            {/* Accreditation Badge floating */}
            <div className="absolute -bottom-4 -right-4 bg-[#1a6b3c] text-white p-3.5 rounded-2xl shadow-xl border-2 border-white flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37] text-gray-900 flex items-center justify-center font-black text-lg">
                A
              </div>
              <div className="text-left">
                <div className="text-xs font-bold leading-tight">Terakreditasi "A"</div>
                <div className="text-[10px] text-emerald-200">BAN-PDM Resmi</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a6b3c]/10 text-[#1a6b3c] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Sambutan Pengasuh</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4a28] leading-tight">
              Menjaga Tradisi Keilmuan Salaf, Menjawab Tantangan Zaman Digital
            </h2>

            <blockquote className="p-4 bg-emerald-50/70 border-l-4 border-[#1a6b3c] rounded-r-2xl italic text-xs sm:text-sm text-gray-700 leading-relaxed font-serif">
              "Pondok Pesantren Jauharul Maknuun hadir bukan sekadar sebagai tempat menuntut ilmu formal, melainkan kawah candradimuka pembinaan adab santri, benteng akidah ahlussunnah wal jama’ah, dan sarana mencetak generasi penghafal Qur'an yang cerdas sains serta berakhlak mulia."
            </blockquote>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Didirikan di Lasem Sidayu Gresik, pesantren kami mengkombinasikan kurikulum pesantren salafiyah dengan metode maknani gandul ala Jawa, halaqah takhassus tahfidzul Qur'an 30 juz bersanad, dan kurikulum nasional terpadu SMP Plus yang telah terakreditasi "A".
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2 text-xs text-gray-700">
                <Check className="w-4 h-4 text-[#1a6b3c] shrink-0 mt-0.5" />
                <span>Sanad hafalan Qur'an bersambung hingga Rasulullah SAW</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-700">
                <Check className="w-4 h-4 text-[#1a6b3c] shrink-0 mt-0.5" />
                <span>Pembiasaan bahasa Arab & Inggris aktif di asrama</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-700">
                <Check className="w-4 h-4 text-[#1a6b3c] shrink-0 mt-0.5" />
                <span>Katering bergizi 3x sehari ramah nutrisi huffadz</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-700">
                <Check className="w-4 h-4 text-[#1a6b3c] shrink-0 mt-0.5" />
                <span>Asrama santri putra dan putri terpisah & aman</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visi Misi */}
        <div id="visi-misi" className="bg-[#f1f7f2] rounded-3xl p-6 sm:p-10 border border-emerald-100">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[11px] font-bold text-[#1a6b3c] uppercase tracking-wider">
              Landasan Filosofis
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0d4a28] mt-1">
              Visi & Misi Lembaga
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visi */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#1a6b3c] text-white flex items-center justify-center">
                <Compass className="w-5 h-5 text-[#d4af37]" />
              </div>
              <h4 className="font-bold text-base text-[#0d4a28]">Visi Pesantren</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                "Terwujudnya lembaga pendidikan Islam terpadu yang unggul dalam mencetak generasi muttaqin, hafidz Qur'an yang mutqin, menguasai khazanah kitab kuning salafiyah, serta cakap dalam sains dan teknologi informasi berlandaskan Ahlussunnah wal Jama'ah An-Nahdliyyah."
              </p>
            </div>

            {/* Misi */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37] text-gray-900 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[#0d4a28]">Misi Utama</h4>
              <ul className="text-xs text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a6b3c] mt-1.5 shrink-0"></span>
                  <span>Menyelenggarakan halaqah tahfidz Al-Qur'an 30 juz dengan bimbingan bersanad.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a6b3c] mt-1.5 shrink-0"></span>
                  <span>Mengkaji kitab kuning turats salafiyah metode maknani gandul secara istiqomah.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a6b3c] mt-1.5 shrink-0"></span>
                  <span>Menerapkan kurikulum nasional Kurikulum Merdeka berstandar BAN-PDM Akreditasi A.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a6b3c] mt-1.5 shrink-0"></span>
                  <span>Menanamkan pembiasaan akhlaqul karimah dan kemandirian hidup santri.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Panca Jiwa Santri */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-bold text-[#1a6b3c] uppercase tracking-wider">
              Nilai Luhur Karakter
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0d4a28] mt-1">
              Panca Jiwa Pondok Pesantren
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-center">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-[#1a6b3c] transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a6b3c] mx-auto flex items-center justify-center font-bold text-lg mb-3">
                ١
              </div>
              <h5 className="font-bold text-sm text-gray-900">Keikhlasan</h5>
              <p className="text-[11px] text-gray-500 mt-1">Semata-mata mengharap ridho Allah SWT dalam setiap amal dan belajar.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-[#1a6b3c] transition">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 mx-auto flex items-center justify-center font-bold text-lg mb-3">
                ٢
              </div>
              <h5 className="font-bold text-sm text-gray-900">Kesederhanaan</h5>
              <p className="text-[11px] text-gray-500 mt-1">Bersahaja dalam bersikap, berpakaian, dan membina ketabahan mental.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-[#1a6b3c] transition">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 mx-auto flex items-center justify-center font-bold text-lg mb-3">
                ٣
              </div>
              <h5 className="font-bold text-sm text-gray-900">Kemandirian</h5>
              <p className="text-[11px] text-gray-500 mt-1">Mampu mengatur diri sendiri, bertanggung jawab atas tugas dan adab.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-[#1a6b3c] transition">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 mx-auto flex items-center justify-center font-bold text-lg mb-3">
                ٤
              </div>
              <h5 className="font-bold text-sm text-gray-900">Ukhuwah Islamiyah</h5>
              <p className="text-[11px] text-gray-500 mt-1">Persaudaraan sejati sesama santri laksana satu tubuh yang kokoh.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-[#1a6b3c] transition">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 mx-auto flex items-center justify-center font-bold text-lg mb-3">
                ٥
              </div>
              <h5 className="font-bold text-sm text-gray-900">Kebebasan Terpimpin</h5>
              <p className="text-[11px] text-gray-500 mt-1">Kreatif dan berpikiran maju namun tetap berpegang teguh pada syariat.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
