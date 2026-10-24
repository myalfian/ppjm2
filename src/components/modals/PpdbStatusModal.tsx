import React, { useState } from 'react';
import { X, Search, CheckCircle, Printer, AlertTriangle, Calendar, Phone, Mail, Utensils, BookOpen } from 'lucide-react';
import { PPDBSubmission } from '../../types';

interface PpdbStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: PPDBSubmission[];
  onOpenPrintCard: (submission: PPDBSubmission) => void;
  onStartCbt?: (submission: PPDBSubmission) => void;
}

export const PpdbStatusModal: React.FC<PpdbStatusModalProps> = ({
  isOpen,
  onClose,
  submissions,
  onOpenPrintCard,
  onStartCbt
}) => {
  const [regCode, setRegCode] = useState('');
  const [phoneLast4, setPhoneLast4] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [result, setResult] = useState<PPDBSubmission | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);

    const cleanCode = regCode.trim().toLowerCase();
    const cleanPhone = phoneLast4.trim().replace(/[^0-9]/g, '');

    if (!cleanCode || cleanPhone.length < 4) {
      setResult(null);
      return;
    }

    const found = submissions.find(s => {
      const matchCode = s.code.toLowerCase() === cleanCode || s.code.toLowerCase().includes(cleanCode);
      const digitsOnly = s.phone.replace(/[^0-9]/g, '');
      const matchPhone = digitsOnly.endsWith(cleanPhone) || digitsOnly.includes(cleanPhone);
      return matchCode && matchPhone;
    });

    setResult(found || null);
  };

  const getStatusBadgeClass = (status: PPDBSubmission['status']) => {
    switch (status) {
      case 'Diterima':
        return 'bg-emerald-600 text-white';
      case 'Terverifikasi':
        return 'bg-blue-600 text-white';
      case 'Menunggu Verifikasi':
        return 'bg-amber-500 text-white';
      case 'Cadangan':
        return 'bg-purple-600 text-white';
      case 'Ditolak':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Mask phone number for privacy protection (0812****7890)
  const maskPhone = (phone: string) => {
    const clean = phone.replace(/[^0-9]/g, '');
    if (clean.length < 8) return phone;
    return `${clean.slice(0, 4)}****${clean.slice(-4)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur px-6 py-4 border-b border-gray-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1a6b3c]/10 text-[#1a6b3c] flex items-center justify-center">
              <Search className="w-5 h-5 text-[#1a6b3c]" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#0d4a28]">
                Cek Status Pendaftaran PPDB 2026
              </h3>
              <p className="text-[11px] text-gray-500">
                Pondok Pesantren Jauharul Maknuun
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input form with 2-point verification */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleSearch} className="space-y-3.5 bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
              <Search className="w-3.5 h-3.5 text-[#1a6b3c]" />
              <span>Verifikasi Kepemilikan Pendaftaran:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-gray-600 font-semibold mb-1">
                  Nomor Registrasi PPDB *
                </label>
                <input
                  type="text"
                  placeholder="Contoh: PPDB-2026-001"
                  value={regCode}
                  onChange={(e) => setRegCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 font-mono text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 font-semibold mb-1">
                  4 Digit Terakhir No. WhatsApp *
                </label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="Contoh: 7890"
                  value={phoneLast4}
                  onChange={(e) => setPhoneLast4(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 font-mono text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold text-xs rounded-xl shadow-md btn-spring flex items-center justify-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Cek Status Verifikasi</span>
            </button>
          </form>

          {/* Result Card */}
          {hasSearched && (
            <div>
              {result ? (
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                    <span className="font-mono font-extrabold text-[#1a6b3c] text-sm sm:text-base">
                      {result.code}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold shadow-sm ${getStatusBadgeClass(result.status)}`}>
                      {result.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-500 block text-[10px]">Nama Lengkap</span>
                      <strong className="text-gray-900 font-bold">{result.name}</strong>
                    </div>

                    <div>
                      <span className="text-gray-500 block text-[10px]">Pilihan Program</span>
                      <strong className="text-[#0d4a28] font-bold">{result.program}</strong>
                    </div>

                    <div>
                      <span className="text-gray-500 block text-[10px]">Jenis Kelamin</span>
                      <span className="text-gray-800">{result.gender}</span>
                    </div>

                    <div>
                      <span className="text-gray-500 block text-[10px]">No. WhatsApp Terdaftar</span>
                      <span className="font-mono text-gray-800">{maskPhone(result.phone)}</span>
                    </div>

                    <div className="sm:col-span-2">
                      <span className="text-gray-500 block text-[10px]">Tanggal Pendaftaran</span>
                      <span className="text-gray-800">
                        {new Date(result.submitted_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <div className="sm:col-span-2 bg-white/70 p-2.5 rounded-xl border border-emerald-200/80 flex items-center justify-between">
                      <div>
                        <span className="text-gray-500 block text-[10px]">Asesmen Seleksi Masuk (CBT Online)</span>
                        <div className="text-xs font-bold mt-0.5">
                          {result.cbt_status === 'Sudah Mengikuti' ? (
                            <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                              ✓ Selesai Mengikuti (Skor: {result.cbt_score}/{result.cbt_total || 5})
                            </span>
                          ) : (
                            <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                              ⏳ Belum Mengikuti Asesmen
                            </span>
                          )}
                        </div>
                      </div>

                      {onStartCbt && (
                        <button
                          type="button"
                          onClick={() => onStartCbt(result)}
                          className="px-3 py-1.5 bg-[#0d4a28] hover:bg-[#1a6b3c] text-white font-bold text-[11px] rounded-lg shadow-sm flex items-center gap-1.5 btn-spring border border-[#d4af37]/30"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>{result.cbt_status === 'Sudah Mengikuti' ? 'Buka Lembar CBT' : 'Mulai Ujian CBT'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2.5 border-t border-emerald-200">
                    <button
                      onClick={() => onOpenPrintCard(result)}
                      className="px-4 py-2 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 btn-spring"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Cetak Bukti Pendaftaran</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 space-y-1">
                  <div className="flex items-center gap-2 font-bold">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Data Pendaftaran Tidak Ditemukan</span>
                  </div>
                  <p className="text-[11px] text-red-600">
                    Mohon pastikan nomor registrasi (contoh: PPDB-2026-001) atau nomor WhatsApp sesuai dengan formulir saat mendaftar.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
