import React, { useState } from 'react';
import { Lock, Mail, ShieldAlert, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (email: string) => void;
  onBack: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('admin@jauharulmaknuun.sch.id');
  const [password, setPassword] = useState('Maknuun2026!');
  const [error, setError] = useState<string | null>(null);

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isLocked) {
      setError('Terlalu banyak percobaan gagal. Silakan tunggu 30 detik.');
      return;
    }

    // Strict credential validation (admin@jauharulmaknuun.sch.id / Maknuun2026!)
    if (email.trim().toLowerCase() === 'admin@jauharulmaknuun.sch.id' && password === 'Maknuun2026!') {
      setFailedAttempts(0);
      onLogin(email.trim());
    } else {
      const nextFail = failedAttempts + 1;
      setFailedAttempts(nextFail);
      if (nextFail >= 5) {
        setIsLocked(true);
        setError('Akses dikunci sementara karena 5 kali percobaan gagal.');
        setTimeout(() => {
          setIsLocked(false);
          setFailedAttempts(0);
        }, 30000);
      } else {
        setError(`Email atau kata sandi pengelola salah. (Percobaan ${nextFail}/5)`);
      }
    }
  };

  const fillDemo = () => {
    setEmail('admin@jauharulmaknuun.sch.id');
    setPassword('Maknuun2026!');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#f1f7f2] flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-gray-200 space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#1a6b3c]/10 text-[#1a6b3c] flex items-center justify-center mx-auto border border-[#1a6b3c]/20">
            <Lock className="w-7 h-7" />
          </div>
          <span className="text-[10px] text-[#d4af37] font-bold uppercase tracking-wider block">
            Portal Administrasi & CMS
          </span>
          <h2 className="text-xl font-extrabold text-[#0d4a28]">
            Pondok Pesantren Jauharul Maknuun
          </h2>
          <p className="text-xs text-gray-500">
            Masuk untuk mengelola mengelolah dan publikasi berita website Pondok Pesantren
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-200 text-xs font-semibold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-700 font-bold mb-1">
              Email Pengelola
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jauharulmaknuun.sch.id"
                className="w-full pl-9 pr-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">
              Kata Sandi
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold rounded-xl shadow-md btn-spring flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-[#d4af37]" />
              <span>Masuk ke Dashboard</span>
            </button>

            <button
              type="button"
              onClick={fillDemo}
              className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-[#1a6b3c] font-semibold rounded-xl border border-emerald-200 transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Gunakan Akun Demo Pengelola</span>
            </button>
          </div>
        </form>

        <div className="pt-2 border-t border-gray-100 text-center">
          <button
            onClick={onBack}
            className="text-xs font-bold text-gray-500 hover:text-[#1a6b3c] flex items-center justify-center gap-1.5 mx-auto transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Website Utama</span>
          </button>
        </div>

      </div>
    </div>
  );
};
