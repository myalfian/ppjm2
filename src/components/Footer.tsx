import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  ExternalLink,
  Calendar,
  Lock,
  MessageCircle,
  FileText,
  X,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  return (
    <>
      <footer className="bg-[#0b3d21] text-white pt-14 pb-10 border-t border-[#d4af37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Main Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Column 1: Identity */}
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

              <div className="flex items-center gap-2.5 pt-1 text-[#d4af37]">
                <a
                  href="https://facebook.com/ppjauharulmaknuun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#1877F2] hover:text-white transition-all flex items-center justify-center shadow-sm"
                  title="Facebook Resmi"
                  aria-label="Facebook Resmi Pondok Pesantren Jauharul Maknuun"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/ppjauharulmaknuun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white transition-all flex items-center justify-center shadow-sm"
                  title="Instagram Resmi"
                  aria-label="Instagram Resmi Pondok Pesantren Jauharul Maknuun"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com/@ppjauharulmaknuun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#FF0000] hover:text-white transition-all flex items-center justify-center shadow-sm"
                  title="YouTube Resmi"
                  aria-label="YouTube Resmi Pondok Pesantren Jauharul Maknuun"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 9v6l5.194-3Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: EXPANDED QUICK LINKS */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5">
                <span>Tautan Cepat (Quick Links)</span>
              </h4>
              <ul className="space-y-2 text-xs text-gray-300">
                <li>
                  <a href="#lokasi" className="hover:text-[#d4af37] transition flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
                    <span className="font-semibold text-white">Hubungi Kami (Contact Us)</span>
                  </a>
                </li>
                <li>
                  <button 
                    onClick={() => setShowCalendarModal(true)} 
                    className="hover:text-[#d4af37] transition flex items-center gap-2 group text-left w-full"
                  >
                    <ArrowRight className="w-3 h-3 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
                    <span>Kalender Akademik (Academic Calendar)</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setShowPrivacyModal(true)} 
                    className="hover:text-[#d4af37] transition flex items-center gap-2 group text-left w-full"
                  >
                    <ArrowRight className="w-3 h-3 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
                    <span>Kebijakan Privasi (Privacy Policy)</span>
                  </button>
                </li>
                <li>
                  <a href="#home" className="hover:text-[#d4af37] transition flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
                    <span>Beranda Utama</span>
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#d4af37] transition flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
                    <span>Profil &amp; Visi Misi</span>
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#d4af37] transition flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
                    <span>Tanya Jawab (FAQ PPDB)</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Program Unggulan */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-[#d4af37] uppercase tracking-wider">
                Program Unggulan
              </h4>
              <ul className="space-y-2 text-xs text-gray-300">
                <li>✨ Takhassus Tahfidz 30 Juz Bersanad</li>
                <li>🏆 SMP Plus Akademik Akreditasi "A"</li>
                <li>📖 Madrasah Diniyah Salafiyah Maknani</li>
                <li>🗣️ Bilingual Program (Arab &amp; Inggris)</li>
                <li>🔬 Praktikum Komputer &amp; Riset STEAM</li>
                <li>🥋 Ekstrakurikuler Banjari &amp; Bela Diri</li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-[#d4af37] uppercase tracking-wider">
                Sekretariat &amp; Asrama
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
                <div className="pt-1">
                  <a
                    href="#lokasi"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#d4af37] hover:underline"
                  >
                    <span>Buka Layanan Kontak Lengkap</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* DEDICATED SOCIAL MEDIA SECTION */}
          <div id="medsos" className="bg-emerald-950/60 rounded-3xl p-6 sm:p-8 border border-emerald-800/60 space-y-6 scroll-mt-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-800/40 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest bg-[#d4af37]/20 px-2.5 py-0.5 rounded-full border border-[#d4af37]/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#d4af37]" />
                    Media Sosial Resmi
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-white mt-1.5">
                  Terhubung dengan Kanal Resmi Pondok Pesantren Jauharul Maknuun
                </h3>
                <p className="text-xs text-gray-300 mt-0.5">
                  Ikuti rekaman kajian kitab kuning maknani, setoran tahfidz santri, dokumentasi kegiatan, dan informasi PPDB terkini.
                </p>
              </div>
              
              <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-900/60 px-3 py-1.5 rounded-xl border border-emerald-700/50 self-start md:self-auto shrink-0 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                Akun Resmi Terverifikasi
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Facebook Card */}
              <a
                href="https://facebook.com/ppjauharulmaknuun"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#1877F2]/60 rounded-2xl p-4 transition-all duration-300 flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#1877F2]/20 text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0 shadow-md">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-[#d4af37] transition-colors">
                      Facebook
                    </h4>
                    <p className="text-[11px] text-gray-400 font-mono">
                      @ppjauharulmaknuun
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#1877F2]/30 text-gray-400 group-hover:text-white flex items-center justify-center transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>

              {/* Instagram Card */}
              <a
                href="https://instagram.com/ppjauharulmaknuun"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#DD2A7B]/60 rounded-2xl p-4 transition-all duration-300 flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#DD2A7B]/20 text-[#DD2A7B] group-hover:bg-gradient-to-tr group-hover:from-[#F58529] group-hover:via-[#DD2A7B] group-hover:to-[#8134AF] group-hover:text-white transition-all duration-300 flex items-center justify-center shrink-0 shadow-md">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-[#d4af37] transition-colors">
                    Instagram
                  </h4>
                  <p className="text-[11px] text-gray-400 font-mono">
                    @ppjauharulmaknuun
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#DD2A7B]/30 text-gray-400 group-hover:text-white flex items-center justify-center transition-colors">
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>

            {/* YouTube Card */}
            <a
              href="https://youtube.com/@ppjauharulmaknuun"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FF0000]/60 rounded-2xl p-4 transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#FF0000]/20 text-[#FF0000] group-hover:bg-[#FF0000] group-hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0 shadow-md">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 9v6l5.194-3Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-[#d4af37] transition-colors">
                    YouTube
                  </h4>
                  <p className="text-[11px] text-gray-400 font-mono">
                    @ppjauharulmaknuun
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#FF0000]/30 text-gray-400 group-hover:text-white flex items-center justify-center transition-colors">
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>

          </div>
        </div>

        {/* Bottom copyright & Auxiliary Quick Links */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span>&copy; 2026 Pondok Pesantren Jauharul Maknuun Lasem. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <a href="#lokasi" className="hover:text-[#d4af37] transition">
              Hubungi Kami (Contact Us)
            </a>
            <span className="text-gray-600">&bull;</span>
            <button onClick={() => setShowCalendarModal(true)} className="hover:text-[#d4af37] transition">
              Kalender Akademik (Academic Calendar)
            </button>
            <span className="text-gray-600">&bull;</span>
            <button onClick={() => setShowPrivacyModal(true)} className="hover:text-[#d4af37] transition">
              Kebijakan Privasi (Privacy Policy)
            </button>
          </div>
        </div>

      </div>
    </footer>

    {/* ACADEMIC CALENDAR MODAL */}
    {showCalendarModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 text-gray-800">
          
          <div className="sticky top-0 bg-white/95 backdrop-blur px-6 py-4 border-b border-gray-100 flex items-center justify-between z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#1a6b3c]/10 text-[#1a6b3c] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#1a6b3c]" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#0d4a28]">
                  Kalender Akademik TP 2026/2027
                </h3>
                <p className="text-[11px] text-gray-500">
                  Pondok Pesantren &amp; SMP Plus Jauharul Maknuun Lasem
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCalendarModal(false)}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 text-xs">
            {/* Semester Ganjil */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-[#1a6b3c]"></span>
                <h4 className="font-bold text-sm text-[#0d4a28]">Semester Ganjil (Juli – Desember 2026)</h4>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pl-2">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-start justify-between gap-3">
                  <div>
                    <span className="font-bold text-gray-900 block">Kedatangan Santri Baru &amp; Masa Ta'aruf (MOS)</span>
                    <span className="text-[11px] text-gray-500">Orientasi kepesantrenan, pembagian kamar asrama, &amp; pembukaan halaqah tahfidz.</span>
                  </div>
                  <span className="px-2 py-1 bg-white rounded-lg border border-gray-200 text-[#1a6b3c] font-mono font-bold shrink-0 text-[10px]">
                    10 – 15 Juli 2026
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-start justify-between gap-3">
                  <div>
                    <span className="font-bold text-gray-900 block">Awal KBM Sekolah &amp; Madrasah Diniyah Salafiyah</span>
                    <span className="text-[11px] text-gray-500">Permulaan jam sekolah formal SMP Plus dan pengajian kitab maknani Jawa.</span>
                  </div>
                  <span className="px-2 py-1 bg-white rounded-lg border border-gray-200 text-[#1a6b3c] font-mono font-bold shrink-0 text-[10px]">
                    20 Juli 2026
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-start justify-between gap-3">
                  <div>
                    <span className="font-bold text-gray-900 block">Peringatan Hari Santri Nasional (HSN 2026)</span>
                    <span className="text-[11px] text-gray-500">Apel akbar santri, kirab budaya Nusantara, dan Gebyar Sholawat Al-Banjari.</span>
                  </div>
                  <span className="px-2 py-1 bg-white rounded-lg border border-gray-200 text-[#1a6b3c] font-mono font-bold shrink-0 text-[10px]">
                    22 Oktober 2026
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-start justify-between gap-3">
                  <div>
                    <span className="font-bold text-gray-900 block">Asesmen Sumatif Akhir Semester &amp; Tasmi' Akbar 30 Juz</span>
                    <span className="text-[11px] text-gray-500">Evaluasi Kurikulum Merdeka CBT dan ujian hafalan Al-Qur'an sekali duduk.</span>
                  </div>
                  <span className="px-2 py-1 bg-white rounded-lg border border-gray-200 text-[#1a6b3c] font-mono font-bold shrink-0 text-[10px]">
                    1 – 15 Des 2026
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-start justify-between gap-3">
                  <div>
                    <span className="font-bold text-gray-900 block">Pembagian Rapor Terpadu &amp; Liburan Semester</span>
                    <span className="text-[11px] text-gray-500">Penerimaan Rapor Dapodik &amp; Rapor Diniyah Kitab Salaf oleh wali santri.</span>
                  </div>
                  <span className="px-2 py-1 bg-white rounded-lg border border-gray-200 text-[#1a6b3c] font-mono font-bold shrink-0 text-[10px]">
                    19 – 31 Des 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Semester Genap */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                <h4 className="font-bold text-sm text-[#0d4a28]">Semester Genap (Januari – Juni 2027)</h4>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pl-2">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-start justify-between gap-3">
                  <div>
                    <span className="font-bold text-gray-900 block">Santri Kembali ke Asrama &amp; Awal KBM Genap</span>
                    <span className="text-[11px] text-gray-500">Pemeriksaan ketertiban asrama dan pembukaan halaqah semester 2.</span>
                  </div>
                  <span className="px-2 py-1 bg-white rounded-lg border border-gray-200 text-amber-700 font-mono font-bold shrink-0 text-[10px]">
                    4 Januari 2027
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-start justify-between gap-3">
                  <div>
                    <span className="font-bold text-gray-900 block">Pesantren Ramadhan &amp; Pengajian Kilatan Kitab Pasanan</span>
                    <span className="text-[11px] text-gray-500">Mengkhatamkan kitab turats pilihan bersama para asatidz sepuh.</span>
                  </div>
                  <span className="px-2 py-1 bg-white rounded-lg border border-gray-200 text-amber-700 font-mono font-bold shrink-0 text-[10px]">
                    Maret 2027
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-start justify-between gap-3">
                  <div>
                    <span className="font-bold text-gray-900 block">Haflah Akhirussanah &amp; Wisuda Tahfidz Al-Qur'an</span>
                    <span className="text-[11px] text-gray-500">Pemberian ijazah sanad tahfidz bagi santri khatam dan wisuda kelulusan.</span>
                  </div>
                  <span className="px-2 py-1 bg-white rounded-lg border border-gray-200 text-amber-700 font-mono font-bold shrink-0 text-[10px]">
                    15 Juni 2027
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowCalendarModal(false)}
                className="px-5 py-2 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold rounded-xl transition"
              >
                Tutup Kalender
              </button>
            </div>
          </div>

        </div>
      </div>
    )}

    {/* PRIVACY POLICY MODAL */}
    {showPrivacyModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 text-gray-800">
          
          <div className="sticky top-0 bg-white/95 backdrop-blur px-6 py-4 border-b border-gray-100 flex items-center justify-between z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#1a6b3c]/10 text-[#1a6b3c] flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#1a6b3c]" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#0d4a28]">
                  Kebijakan Privasi (Privacy Policy)
                </h3>
                <p className="text-[11px] text-gray-500">
                  Pondok Pesantren &amp; SMP Plus Jauharul Maknuun Lasem
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowPrivacyModal(false)}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4 text-xs leading-relaxed text-gray-600">
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#1a6b3c] shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900 block text-xs">Komitmen Perlindungan Data Pribadi</strong>
                <p className="text-[11px] text-gray-600 mt-0.5">
                  Pondok Pesantren Jauharul Maknuun berkomitmen menjaga keamanan dan kerahasiaan data pribadi calon santri, santri aktif, serta wali santri sesuai Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1a6b3c]" />
                1. Data Yang Kami Kumpulkan
              </h4>
              <p className="pl-5 text-[11px]">
                Data yang dikumpulkan melalui formulir PPDB online dan aplikasi portal mencakup: nama lengkap santri, NIK/NISN, nomor kartu keluarga, nomor WhatsApp wali santri, alamat domisili, data kesehatan/alergi makanan untuk penyesuaian katering asrama, serta riwayat capaian hafalan tahfidz.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1a6b3c]" />
                2. Tujuan Penggunaan Data
              </h4>
              <p className="pl-5 text-[11px]">
                Data pribadi digunakan secara eksklusif untuk:
              </p>
              <ul className="list-disc pl-9 text-[11px] space-y-1 text-gray-600">
                <li>Proses administrasi seleksi dan penerimaan peserta didik baru (PPDB).</li>
                <li>Sinkronisasi data pokok pendidikan nasional (Dapodik Kemendikbudristek &amp; EMIS Kemenag).</li>
                <li>Pelaporan mutaba'ah hafalan Qur'an, perizinan asrama, dan rekapitulasi nilai rapor santri kepada wali santri.</li>
                <li>Penyediaan menu makanan katering yang aman dari risiko alergi santri.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1a6b3c]" />
                3. Keamanan &amp; Kerahasiaan
              </h4>
              <p className="pl-5 text-[11px]">
                Kami menerapkan enkripsi HTTPS/TLS standar industri dan sistem autentikasi bertingkat (RBAC). Data pribadi Anda tidak pernah diperjualbelikan, disewakan, atau dibagikan kepada pihak ketiga di luar kepentingan sah administrasi pendidikan pesantren.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1a6b3c]" />
                4. Hak Wali Santri
              </h4>
              <p className="pl-5 text-[11px]">
                Wali santri berhak meminta klarifikasi, pembaruan, atau perbaikan data pribadi ananda yang tersimpan di sistem melalui sekretariat pesantren atau narahubung resmi PPDB.
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="px-5 py-2 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold rounded-xl transition"
              >
                Saya Memahami
              </button>
            </div>
          </div>

        </div>
      </div>
    )}
  </>
  );
};
