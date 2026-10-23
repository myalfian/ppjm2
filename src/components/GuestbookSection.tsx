import React, { useState } from 'react';
import { GuestbookEntry } from '../types';
import { Star, MessageSquarePlus, Send, CheckCircle, UserCheck } from 'lucide-react';

interface GuestbookSectionProps {
  entries: GuestbookEntry[];
  onSubmitEntry: (entry: Omit<GuestbookEntry, 'id' | 'created_at'>) => void;
  onToast: (msg: string) => void;
}

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({ entries, onSubmitEntry, onToast }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Wali Santri');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || name.trim().length < 2 || name.trim().length > 100) {
      setError('Nama harus 2–100 karakter.');
      return;
    }
    if (!message.trim() || message.trim().length < 5 || message.trim().length > 1000) {
      setError('Pesan testimoni harus 5–1000 karakter.');
      return;
    }

    onSubmitEntry({
      name: name.trim(),
      role: role.trim(),
      rating,
      message: message.trim()
    });

    setName('');
    setMessage('');
    setRating(5);
    onToast('Alhamdulillah! Testimoni Anda berhasil dikirimkan.');
  };

  return (
    <section id="testimoni" className="py-16 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[11px] font-bold text-[#1a6b3c] uppercase tracking-wider bg-[#1a6b3c]/10 px-3 py-1 rounded-full">
            Kesan & Pengalaman
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4a28] mt-2">
            Buku Tamu & Testimoni Wali Santri
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Apresiasi dan pengalaman orang tua serta alumni selama mempercayakan pendidikan di Jauharul Maknuun.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Testimonies List */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-bold text-sm text-gray-800 flex items-center gap-2">
              <span>Testimoni Terbaru</span>
              <span className="text-xs bg-[#1a6b3c]/10 text-[#1a6b3c] px-2 py-0.5 rounded-full font-bold">
                {entries.length} Catatan
              </span>
            </h3>

            <div className="space-y-3.5 max-h-[520px] overflow-y-auto pr-2">
              {entries.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-2xl p-4.5 border border-gray-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#1a6b3c] text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-sm">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[#0d4a28]">{item.name}</h4>
                        <span className="text-[10px] text-gray-500">{item.role}</span>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${star <= item.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed italic">
                    "{item.message}"
                  </p>

                  <div className="text-[9px] text-gray-400">
                    {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Testimony Form */}
          <div className="lg:col-span-5 bg-[#f1f7f2] p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-emerald-200">
              <MessageSquarePlus className="w-5 h-5 text-[#1a6b3c]" />
              <h3 className="font-bold text-sm text-[#0d4a28]">Tulis Kesan & Pesan Anda</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {error && (
                <div className="p-2.5 bg-red-50 text-red-600 rounded-xl border border-red-200 text-xs font-semibold">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-gray-700 font-bold mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  placeholder="Contoh: H. Ahmad Subhan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Status / Peran *</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                >
                  <option value="Wali Santri">Wali Santri</option>
                  <option value="Alumni Pesantren">Alumni Pesantren</option>
                  <option value="Tokoh Masyarakat">Tokoh Masyarakat</option>
                  <option value="Pengunjung">Pengunjung / Umum</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Penilaian (Bintang) *</label>
                <div className="flex items-center gap-1.5 p-2 bg-white rounded-xl border border-gray-200">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                      />
                    </button>
                  ))}
                  <span className="text-[11px] font-bold text-gray-500 ml-2">{rating} dari 5 Bintang</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Pesan / Testimoni *</label>
                <textarea
                  rows={4}
                  placeholder="Tuliskan pengalaman Anda mengenai pembinaan adab santri, keilmuan kitab, atau fasilitas..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 btn-spring"
              >
                <Send className="w-4 h-4 text-[#d4af37]" />
                <span>Kirimkan Testimoni</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
