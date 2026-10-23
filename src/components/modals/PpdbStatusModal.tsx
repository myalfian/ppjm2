import React, { useState } from 'react';
import { X, Search, CheckCircle, Printer, AlertTriangle, Calendar, Phone, Mail, Utensils } from 'lucide-react';
import { PPDBSubmission } from '../../types';

interface PpdbStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: PPDBSubmission[];
  onOpenPrintCard: (submission: PPDBSubmission) => void;
}

export const PpdbStatusModal: React.FC<PpdbStatusModalProps> = ({
  isOpen,
  onClose,
  submissions,
  onOpenPrintCard
}) => {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [result, setResult] = useState<PPDBSubmission | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);

    const clean = query.trim().toLowerCase();
    if (!clean) {
      setResult(null);
      return;
    }

    const found = submissions.find(s => 
      s.code.toLowerCase().includes(clean) ||
      s.name.toLowerCase().includes(clean) ||
      s.phone.replace(/[^0-9]/g, '').includes(clean.replace(/[^0-9]/g, ''))
    );

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
                Pondok Pesantren & SMP Plus Jauharul Maknuun
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

        {/* Search input form */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-xs font-bold text-gray-700">
              Masukkan Nomor Registrasi, Nama Calon Santri, atau No. WhatsApp:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Contoh: PPDB-2026-001 atau 08123456789"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs focus:bg-white focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold text-xs rounded-xl shadow-md btn-spring flex items-center gap-1.5 shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Cari</span>
              </button>
            </div>
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
                      <span className="text-gray-500 block text-[10px]">No. WhatsApp</span>
                      <span className="font-mono text-gray-800">{result.phone}</span>
                    </div>

                    {result.email && (
                      <div className="sm:col-span-2">
                        <span className="text-gray-500 block text-[10px]">Email Wali</span>
                        <span className="text-gray-800">{result.email}</span>
                      </div>
                    )}

                    <div className="sm:col-span-2 bg-emerald-100/50 p-2.5 rounded-xl border border-emerald-200">
                      <span className="text-[#0d4a28] font-bold text-[11px] flex items-center gap-1">
                        <Utensils className="w-3.5 h-3.5 text-[#1a6b3c]" />
                        Paket Nutrisi: {result.diet_package || 'Reguler 4 Sehat'}
                      </span>
                      {result.allergy_notes && (
                        <p className="text-[10px] text-amber-800 mt-0.5">
                          <strong>Catatan Alergi:</strong> {result.allergy_notes}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <span className="text-gray-500 block text-[10px]">Alamat Asal</span>
                      <p className="text-gray-700 leading-relaxed">{result.address}</p>
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
                  </div>

                  <div className="pt-2 flex gap-3 border-t border-emerald-200">
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
