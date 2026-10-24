import React from 'react';
import { X, Download, FileText, CheckCircle2 } from 'lucide-react';

interface SyllabusModalProps {
  programName: string | null;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const SyllabusModal: React.FC<SyllabusModalProps> = ({ programName, onClose, onToast }) => {
  if (!programName) return null;

  const handleDownload = () => {
    const content = `PONDOK PESANTREN JAUHARUL MAKNUUN\nSILABUS & STRUKTUR KURIKULUM: ${programName}\n\nTahun Ajaran: 2026/2027\nAkreditasi: "A" BAN-PDM\nWebsite: https://ppjauharulmaknuun.sch.id/\n\n1. Target Capaian Pembelajaran Terpadu\n2. Standar Kelulusan Santri & Sertifikasi Sanad\n3. Jadwal Pembinaan Asrama & Halaqah Harian\n\nDokumen resmi diterbitkan oleh Sekretariat Pondok Pesantren Jauharul Maknuun.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Silabus_${programName.replace(/[^a-zA-Z0-9]/g, '_')}_2026.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
    onToast(`Silabus ${programName} berhasil diunduh.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-200">
        
        {/* Header */}
        <div className="bg-[#1a6b3c] p-6 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#d4af37]">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-[#d4af37] font-bold uppercase tracking-wider">
                Dokumen Kurikulum
              </span>
              <h3 className="text-base font-bold">{programName}</h3>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-white/80">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          <p className="text-gray-600 leading-relaxed">
            Silabus dan panduan kurikulum ini memuat rincian kompetensi dasar, capaian pembelajaran per semester, daftar literatur kitab kuning, serta bobot penilaian santri.
          </p>

          <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 space-y-1.5 text-gray-700">
            <div className="flex items-center gap-2 font-bold text-[#0d4a28]">
              <CheckCircle2 className="w-4 h-4 text-[#1a6b3c]" />
              <span>Memenuhi Standar Kurikulum Merdeka & Salaf</span>
            </div>
            <p className="text-[11px] text-gray-600 pl-6">
              Terakreditasi "A" BAN-PDM dengan evaluasi mutaba'ah mingguan.
            </p>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 py-2.5 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold rounded-xl shadow flex items-center justify-center gap-2 btn-spring"
            >
              <Download className="w-4 h-4 text-[#d4af37]" />
              <span>Unduh Silabus (PDF/Teks)</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl"
            >
              Tutup
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
