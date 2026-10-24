import React from 'react';
import { MapPin, Phone, MessageSquare, Copy, Navigation, Shield, HeartPulse, Building, Clock } from 'lucide-react';
import { InstitutionSettings } from '../types';
import { initialSettings } from '../data/initialData';

interface LocationSectionProps {
  onToast: (msg: string) => void;
  settings?: InstitutionSettings;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onToast, settings: propSettings }) => {
  const settings = propSettings || initialSettings;
  const handleCopy = (phone: string, title: string) => {
    navigator.clipboard?.writeText(phone);
    onToast(`Nomor telepon ${title} (${phone}) berhasil disalin.`);
  };

  return (
    <section id="lokasi" className="py-8 sm:py-10 bg-[#f1f7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[11px] font-bold text-[#1a6b3c] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-emerald-200">
            Akses & Kontak
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4a28] mt-2">
            Lokasi Kompleks Pesantren & Kontak Layanan
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Terletak strategis di perbatasan Lasem Sidayu Gresik, mudah dijangkau dengan transportasi umum dan pribadi.
          </p>
        </div>

        {/* Quick Call Emergency Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Panitia PPDB */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#1a6b3c] flex items-center justify-center text-base">
                  <Building className="w-5 h-5" />
                </div>
                <span className="text-[10px] bg-emerald-50 text-[#1a6b3c] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  PPDB Online
                </span>
              </div>
              <h4 className="font-bold text-sm text-[#0d4a28]">Panitia PPDB 2026</h4>
              <div className="font-mono text-xs font-bold text-gray-700 mt-0.5">{settings.phone}</div>
              <p className="text-[11px] text-gray-500 leading-relaxed mt-1">Konsultasi pendaftaran, tes seleksi, & verifikasi berkas santri baru.</p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5">
              <a 
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} 
                aria-label="Telepon Panitia PPDB 2026"
                className="flex-1 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white text-xs font-bold py-2 rounded-xl text-center flex items-center justify-center gap-1 btn-spring"
              >
                <Phone className="w-3.5 h-3.5" /> Telepon
              </a>
              <button 
                onClick={() => handleCopy(settings.phone, 'Panitia PPDB')}
                aria-label="Salin nomor telepon Panitia PPDB 2026"
                className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-xs transition" 
                title="Salin Nomor"
              >
                <Copy className="w-4 h-4" />
              </button>
              <a 
                href={`https://wa.me/${settings.whatsapp}?text=Assalamu'alaikum%20Panitia%20PPDB`} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Chat WhatsApp Panitia PPDB 2026"
                className="p-2 bg-emerald-50 hover:bg-emerald-100 text-[#1a6b3c] rounded-xl text-xs transition" 
                title="Chat WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: Sekretariat */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-base">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                  07:00 - 17:00
                </span>
              </div>
              <h4 className="font-bold text-sm text-[#0d4a28]">Sekretariat & Asrama</h4>
              <div className="font-mono text-xs font-bold text-gray-700 mt-0.5">0812-3456-7891</div>
              <p className="text-[11px] text-gray-500 leading-relaxed mt-1">Layanan administrasi, perizinan pulang santri, dan surat pengantar.</p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5">
              <a 
                href="tel:081234567891" 
                aria-label="Telepon Sekretariat dan Asrama"
                className="flex-1 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold py-2 rounded-xl text-center flex items-center justify-center gap-1 btn-spring"
              >
                <Phone className="w-3.5 h-3.5" /> Kantor
              </a>
              <button 
                onClick={() => handleCopy('081234567891', 'Sekretariat')}
                aria-label="Salin nomor telepon Sekretariat dan Asrama"
                className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-xs transition" 
                title="Salin Nomor"
              >
                <Copy className="w-4 h-4" />
              </button>
              <a 
                href="https://wa.me/6281234567891?text=Halo%20Sekretariat%20PPJM" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Chat WhatsApp Sekretariat dan Asrama"
                className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-xl text-xs transition" 
                title="Chat WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 3: UKS Medis */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center text-base">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded-full border border-rose-200">
                  UKS 24 Jam
                </span>
              </div>
              <h4 className="font-bold text-sm text-[#0d4a28]">Pos Medis & Poskestren</h4>
              <div className="font-mono text-xs font-bold text-rose-700 mt-0.5">0812-3456-7892</div>
              <p className="text-[11px] text-gray-500 leading-relaxed mt-1">Layanan darurat medis santri, konsultasi gizi, dan dokter klinik.</p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5">
              <a 
                href="tel:081234567892" 
                aria-label="Telepon Pos Medis UKS 24 Jam"
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2 rounded-xl text-center flex items-center justify-center gap-1 btn-spring"
              >
                <Phone className="w-3.5 h-3.5" /> Pos Medis
              </a>
              <button 
                onClick={() => handleCopy('081234567892', 'Pos Medis')}
                aria-label="Salin nomor telepon Pos Medis"
                className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-xs transition" 
                title="Salin Nomor"
              >
                <Copy className="w-4 h-4" />
              </button>
              <a 
                href="https://wa.me/6281234567892?text=Emergency%20Medis%20PPJM" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Chat WhatsApp Pos Medis"
                className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs transition" 
                title="Chat WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 4: Keamanan */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-base">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200">
                  Siaga Gerbang
                </span>
              </div>
              <h4 className="font-bold text-sm text-[#0d4a28]">Keamanan & Tamu</h4>
              <div className="font-mono text-xs font-bold text-gray-700 mt-0.5">0812-3456-7893</div>
              <p className="text-[11px] text-gray-500 leading-relaxed mt-1">Konfirmasi izin sambang wali santri, keamanan gerbang, & parkir.</p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5">
              <a 
                href="tel:081234567893" 
                aria-label="Telepon Pos Keamanan dan Gerbang"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-xl text-center flex items-center justify-center gap-1 btn-spring"
              >
                <Phone className="w-3.5 h-3.5" /> Pos Jaga
              </a>
              <button 
                onClick={() => handleCopy('081234567893', 'Pos Keamanan')}
                aria-label="Salin nomor telepon Pos Keamanan"
                className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-xs transition" 
                title="Salin Nomor"
              >
                <Copy className="w-4 h-4" />
              </button>
              <a 
                href="https://wa.me/6281234567893?text=Halo%20Pos%20Keamanan%20PPJM" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Chat WhatsApp Pos Keamanan"
                className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs transition" 
                title="Chat WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0d4a28]">
                Peta Lokasi Kompleks Pondok Pesantren Jauharul Maknuun
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Jl. Raya Dukun-Lasem RT 1 RW 1, Lasem Sidayu Gresik, Gresik 61153
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Lasem+Sidayu+Gresik"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buka petunjuk arah Google Maps ke Lasem Sidayu Gresik"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-4 py-2 rounded-xl border border-gray-300 flex items-center gap-2 self-start sm:self-auto transition"
            >
              <Navigation className="w-4 h-4 text-[#1a6b3c]" />
              <span>Buka Petunjuk Arah</span>
            </a>
          </div>

          <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
            <iframe
              title="Peta Lokasi Pondok Pesantren Jauharul Maknuun Lasem Sidayu Gresik"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Desa%20Lasem%2C%20Kecamatan%20Sidayu%2C%20Kabupaten%20Gresik%2C%20Jawa%20Timur&t=&z=15&ie=UTF8&iwloc=&output=embed"
            />
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-[#1a6b3c] shadow-md flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>Pondok Pesantren Jauharul Maknuun (Lasem Sidayu Gresik)</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
