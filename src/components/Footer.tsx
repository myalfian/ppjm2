import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b3d21] text-white pt-14 pb-10 border-t border-[#d4af37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 shadow-md">
                <img src="/logo.jpg" alt="Logo PPJM" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-[#d4af37] leading-tight">
                  PONDOK PESANTREN
                </h4>
                <h5 className="font-black text-xs text-white">
                  JAUHARUL MAKNUUN LASEM
                </h5>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              Lembaga pendidikan Islam terpadu yang memadukan keilmuan Kitab Kuning Salafiyah dengan Kurikulum Merdeka SMP Plus berakreditasi "A" BAN-PDM.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[#d4af37]">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#d4af37] hover:text-gray-900 transition flex items-center justify-center font-bold text-xs" title="Instagram">
                IG
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#d4af37] hover:text-gray-900 transition flex items-center justify-center font-bold text-xs" title="YouTube">
                YT
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#d4af37] hover:text-gray-900 transition flex items-center justify-center font-bold text-xs" title="Facebook">
                FB
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#d4af37] uppercase tracking-wider">
              Tautan Cepat
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="#home" className="hover:text-[#d4af37] transition">Beranda Utama</a></li>
              <li><a href="#about" className="hover:text-[#d4af37] transition">Profil & Sambutan Pengasuh</a></li>
              <li><a href="#programs" className="hover:text-[#d4af37] transition">Program Takhassus Tahfidz</a></li>
              <li><a href="#programs" className="hover:text-[#d4af37] transition">SMP Plus Kurikulum Merdeka</a></li>
              <li><a href="#facilities" className="hover:text-[#d4af37] transition">Fasilitas Pesantren</a></li>
              <li><a href="#news" className="hover:text-[#d4af37] transition">Berita & Informasi Santri</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#d4af37] uppercase tracking-wider">
              Program Unggulan
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>✨ Takhassus Tahfidz 30 Juz Bersanad</li>
              <li>🏆 SMP Plus Akademik Akreditasi "A"</li>
              <li>📖 Madrasah Diniyah Salafiyah Maknani</li>
              <li>🗣️ Bilingual Program (Arab & Inggris)</li>
              <li>🔬 Praktikum Komputer & Riset STEAM</li>
              <li>🥋 Ekstrakurikuler Banjari & Bela Diri</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#d4af37] uppercase tracking-wider">
              Sekretariat & Asrama
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>Jl. Raya Dukun-Lasem RT 1 RW 1, Lasem Sidayu Gresik, Gresik 61153</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>+62 812-3456-7890 (Panitia PPDB)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>admin@jauharulmaknuun.sch.id</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span>&copy; 2026 Pondok Pesantren Jauharul Maknuun Lasem. All rights reserved.</span>
          </div>
          <div>
            <span>Mencetak Generasi Qur'ani, Berakhlak Mulia & Melek Teknologi.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
