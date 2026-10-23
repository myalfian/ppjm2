import React, { useState } from 'react';
import { X, UserCheck, ShieldCheck, CheckCircle2, Printer, Sparkles, AlertCircle } from 'lucide-react';
import { PPDBSubmission } from '../../types';

interface PpdbModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<PPDBSubmission, 'id' | 'code' | 'status' | 'submitted_at'>) => PPDBSubmission;
  onOpenPrintCard: (submission: PPDBSubmission) => void;
}

const RFC5322_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const PpdbModal: React.FC<PpdbModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onOpenPrintCard
}) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Laki-laki');
  const [program, setProgram] = useState('SMP Plus & Pesantren');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dietPackage, setDietPackage] = useState('Reguler 4 Sehat (3x Sehari)');
  const [allergyNotes, setAllergyNotes] = useState('');
  const [address, setAddress] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [successEntry, setSuccessEntry] = useState<PPDBSubmission | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Anti-bot Honeypot check
    if (honeypot.trim()) {
      return;
    }

    // Strict validation
    if (!name.trim() || name.trim().length < 3 || name.trim().length > 100) {
      setError('Nama calon santri harus 3–100 karakter.');
      return;
    }

    const cleanPhone = phone.trim();
    if (!cleanPhone || !/^(\+628|08)\d{8,12}$/.test(cleanPhone)) {
      setError('Nomor WhatsApp tidak valid (contoh: 08123456789 atau +6281234567890).');
      return;
    }

    if (email.trim() && !RFC5322_EMAIL_REGEX.test(email.trim())) {
      setError('Format email wali tidak valid (contoh: wali@gmail.com).');
      return;
    }

    if (!address.trim() || address.trim().length < 10 || address.trim().length > 500) {
      setError('Alamat lengkap harus 10–500 karakter.');
      return;
    }

    const newSub = onSubmit({
      name: name.trim(),
      gender,
      program,
      phone: cleanPhone,
      email: email.trim() || null,
      diet_package: dietPackage,
      allergy_notes: allergyNotes.trim() || null,
      address: address.trim()
    });

    setSuccessEntry(newSub);
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setAllergyNotes('');
    setAddress('');
    setError(null);
    setSuccessEntry(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur px-6 py-4 border-b border-gray-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1a6b3c]/10 text-[#1a6b3c] flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-[#1a6b3c]" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#0d4a28]">
                Formulir PPDB Online 2026/2027
              </h3>
              <p className="text-[11px] text-gray-500">
                Pondok Pesantren & SMP Plus Jauharul Maknuun
              </p>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {successEntry ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#1a6b3c] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                  Pendaftaran Berhasil!
                </span>
                <h4 className="text-xl font-extrabold text-[#0d4a28] mt-1">
                  Alhamdulillah, Data Telah Diterima
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  Nomor registrasi resmi calon santri baru Anda adalah:
                </p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 max-w-sm mx-auto">
                <span className="font-mono text-2xl font-black text-[#1a6b3c] tracking-wider">
                  {successEntry.code}
                </span>
                <p className="text-[11px] text-gray-600 mt-1 font-semibold">
                  Nama: {successEntry.name} ({successEntry.program})
                </p>
              </div>

              <p className="text-[11px] text-gray-500 max-w-md mx-auto leading-relaxed">
                Silakan simpan atau cetak Kartu Bukti Pendaftaran di bawah ini untuk dibawa saat pelaksanaan seleksi baca Al-Qur'an dan wawancara.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => onOpenPrintCard(successEntry)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 btn-spring"
                >
                  <Printer className="w-4 h-4 text-[#d4af37]" />
                  <span>Cetak Bukti Pendaftaran</span>
                </button>

                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-200 font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Honeypot field (hidden from real users) */}
              <div className="hidden">
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">
                  Nama Lengkap Calon Santri *
                </label>
                <input
                  type="text"
                  placeholder="Sesuai Akta Kelahiran / KK"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">
                    Jenis Kelamin *
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  >
                    <option value="Laki-laki">Laki-laki (Putra)</option>
                    <option value="Perempuan">Perempuan (Putri)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">
                    Pilihan Program *
                  </label>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  >
                    <option value="SMP Plus & Pesantren">SMP Plus & Pesantren Terpadu</option>
                    <option value="Takhassus Tahfidz">Takhassus Tahfidz 30 Juz Bersanad</option>
                    <option value="Kajian Kitab Kuning">Kajian Kitab Kuning Salafiyah</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">
                    No. WhatsApp Wali Santri *
                  </label>
                  <input
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">
                    Email Wali (Opsional)
                  </label>
                  <input
                    type="email"
                    placeholder="contoh: wali@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  />
                </div>
              </div>

              {/* Paket Nutrisi & Diet Asrama */}
              <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-[#0d4a28]">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  <span>Paket Gizi & Katering Asrama</span>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Pilihan Paket Makanan 3x Sehari
                  </label>
                  <select
                    value={dietPackage}
                    onChange={(e) => setDietPackage(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-emerald-300 focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  >
                    <option value="Reguler 4 Sehat (3x Sehari)">Reguler 4 Sehat (3x Sehari)</option>
                    <option value="Nutrisi Khusus Huffadz (Omega-3 & Madu)">Nutrisi Khusus Huffadz (Omega-3 & Madu)</option>
                    <option value="Menu Ramah Alergen & Lambung">Menu Ramah Alergen & Lambung</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Catatan Khusus Alergi / Medis Santri
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Alergi udang, riwayat asma ringan, dll."
                    value={allergyNotes}
                    onChange={(e) => setAllergyNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-emerald-300 focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">
                  Alamat Lengkap Asal Calon Santri *
                </label>
                <textarea
                  rows={2}
                  placeholder="Jalan, RT/RW, Dusun, Desa, Kecamatan, Kabupaten/Kota, Provinsi"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-extrabold rounded-2xl shadow-lg shadow-[#1a6b3c]/30 flex items-center justify-center gap-2 btn-spring"
                >
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <span>Kirim Formulir Pendaftaran PPDB</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
