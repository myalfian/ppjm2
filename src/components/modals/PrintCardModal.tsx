import React from 'react';
import { X, Printer } from 'lucide-react';
import { PPDBSubmission } from '../../types';

interface PrintCardModalProps {
  submission: PPDBSubmission | null;
  onClose: () => void;
}

export const PrintCardModal: React.FC<PrintCardModalProps> = ({ submission, onClose }) => {
  if (!submission) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-200">
        
        {/* Modal Controls */}
        <div className="sticky top-0 bg-white/95 backdrop-blur px-6 py-3 border-b border-gray-100 flex items-center justify-between z-10 print:hidden">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Pratinjau Kartu Pendaftaran PPDB
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 btn-spring"
            >
              <Printer className="w-4 h-4 text-[#d4af37]" />
              <span>Cetak Sekarang</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Card Area */}
        <div id="printSection" className="p-6 sm:p-10 font-sans text-gray-900">
          <div className="border-2 border-[#1a6b3c] rounded-2xl p-6 sm:p-8 bg-white relative">
            
            {/* Header Kop Surat */}
            <div className="text-center border-b-2 border-[#d4af37] pb-4 mb-5">
              <div className="w-14 h-14 rounded-full overflow-hidden mx-auto mb-2 border-2 border-[#1a6b3c] shadow-sm">
                <img src="/logo.jpg" alt="Logo PPJM" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-lg sm:text-xl font-black text-[#1a6b3c] tracking-tight">
                PONDOK PESANTREN JAUHARUL MAKNUUN LASEM
              </h2>
              <h3 className="text-xs sm:text-sm font-bold text-gray-700">
                SMP PLUS JAUHARUL MAKNUUN ISLAMIC BOARDING SCHOOL
              </h3>
              <p className="text-[11px] text-gray-500 mt-1">
                Jl. Raya Dukun-Lasem RT 1 RW 1, Lasem Sidayu Gresik, Gresik 61153 &bull; Telp: 0812-3456-7890
              </p>
              <div className="inline-block mt-3 px-4 py-1 rounded-full bg-[#1a6b3c] text-white text-xs font-extrabold tracking-wider">
                KARTU BUKTI PENDAFTARAN PPDB TP 2026/2027
              </div>
            </div>

            {/* Student Info Table */}
            <table className="w-full text-xs leading-loose">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="w-40 font-semibold text-gray-500 py-1.5">Nomor Registrasi</td>
                  <td className="font-mono font-extrabold text-[#1a6b3c] text-sm py-1.5">: {submission.code}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="font-semibold text-gray-500 py-1.5">Nama Calon Santri</td>
                  <td className="font-bold text-gray-900 py-1.5">: {submission.name}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="font-semibold text-gray-500 py-1.5">Jenis Kelamin</td>
                  <td className="py-1.5">: {submission.gender}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="font-semibold text-gray-500 py-1.5">Pilihan Program</td>
                  <td className="font-bold text-[#0d4a28] py-1.5">: {submission.program}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="font-semibold text-gray-500 py-1.5">No. WhatsApp Wali</td>
                  <td className="font-mono py-1.5">: {submission.phone}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="font-semibold text-gray-500 py-1.5">Email Wali</td>
                  <td className="py-1.5">: {submission.email || '-'}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="font-semibold text-gray-500 py-1.5">Paket Nutrisi Santri</td>
                  <td className="py-1.5">: {submission.diet_package || 'Reguler 4 Sehat'}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="font-semibold text-gray-500 py-1.5">Catatan Alergi / Medis</td>
                  <td className="py-1.5">: {submission.allergy_notes || 'Tidak ada catatan'}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="font-semibold text-gray-500 py-1.5">Alamat Asal</td>
                  <td className="py-1.5">: {submission.address}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-500 py-1.5">Status Verifikasi</td>
                  <td className="py-1.5">: <span className="font-bold text-[#1a6b3c] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{submission.status}</span></td>
                </tr>
              </tbody>
            </table>

            {/* Notes */}
            <div className="mt-6 pt-4 border-t border-dashed border-gray-300 text-[10px] text-gray-600 space-y-1 leading-relaxed">
              <p className="font-bold text-gray-800">Petunjuk Pelaksanaan Tes Seleksi:</p>
              <ol className="list-decimal pl-4 space-y-0.5">
                <li>Bawa kartu bukti pendaftaran ini beserta fotokopi KK dan Akta Kelahiran saat pelaksanaan tes seleksi.</li>
                <li>Jadwal pelaksanaan tes membaca Al-Qur'an dan wawancara diinfokan melalui pesan WhatsApp panitia.</li>
                <li>Calon santri mengenakan pakaian muslim/muslimah rapi dan sopan saat hadir di pesantren.</li>
              </ol>
            </div>

            {/* Signature Area */}
            <div className="mt-8 pt-4 flex justify-between items-end text-xs text-center">
              <div>
                <p className="text-[10px] text-gray-500">Calon Santri / Wali,</p>
                <div className="h-16"></div>
                <p className="font-bold text-gray-800 underline">{submission.name}</p>
              </div>

              <div>
                <p className="text-[10px] text-gray-500">Lasem, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p className="text-[10px] text-gray-500">Panitia PPDB 2026/2027,</p>
                <div className="h-16 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-emerald-800 border border-emerald-400 px-2 py-0.5 rounded">TERVERIFIKASI SISTEM</span>
                </div>
                <p className="font-bold text-[#1a6b3c] underline">Ust. Ahmad Kholil, S.Pd.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
