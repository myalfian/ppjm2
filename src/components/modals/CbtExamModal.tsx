import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Clock, BookOpen, Award, ArrowRight, RotateCcw } from 'lucide-react';
import { PPDBSubmission } from '../../types';
import { utbkQuestions } from '../../data/initialData';

interface CbtExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: PPDBSubmission;
  onComplete: (score: number, total: number) => void;
}

export const CbtExamModal: React.FC<CbtExamModalProps> = ({
  isOpen,
  onClose,
  submission,
  onComplete
}) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  if (!isOpen) return null;

  const totalQuestions = utbkQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answeredCount < totalQuestions) {
      if (!confirm(`Anda baru menjawab ${answeredCount} dari ${totalQuestions} soal. Tetap kirimkan lembar jawaban?`)) {
        return;
      }
    }

    const calculatedScore = utbkQuestions.filter(q => answers[q.id] === q.correct).length;
    setScore(calculatedScore);
    setIsSubmitted(true);
    onComplete(calculatedScore, totalQuestions);
  };

  const handleReset = () => {
    setAnswers({});
    setIsSubmitted(false);
    setScore(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-emerald-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c] text-white px-5 sm:px-7 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#d4af37] border border-white/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base">
                  CBT Asesmen Masuk Santri Baru 2026
                </h3>
                <span className="text-[10px] bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 px-2 py-0.5 rounded-full font-bold">
                  Online Test
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/80">
                Pondok Pesantren & SMP Plus Jauharul Maknuun
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Bar */}
        <div className="bg-emerald-50/80 px-5 sm:px-7 py-2.5 border-b border-emerald-100 flex flex-wrap items-center justify-between text-xs text-gray-700 gap-2 shrink-0">
          <div className="flex items-center gap-3">
            <span>Pendaftar: <strong className="text-[#0d4a28]">{submission.name}</strong></span>
            <span className="font-mono bg-white px-2 py-0.5 rounded-md border border-emerald-200 font-bold text-[#1a6b3c]">
              {submission.code}
            </span>
          </div>
          <div className="flex items-center gap-2 text-emerald-900 font-semibold text-[11px]">
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            <span>Target: Dirasah, Sains & Wawasan Santri</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-1.5 shrink-0">
          <div
            className="bg-emerald-600 h-1.5 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5">
          {/* Result Banner if submitted */}
          {isSubmitted && score !== null && (
            <div className="bg-gradient-to-br from-emerald-500 to-[#0d4a28] text-white p-5 rounded-2xl shadow-lg space-y-2 animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-[#d4af37]" />
                  <h4 className="font-extrabold text-base">Hasil Ujian Asesmen Selesai</h4>
                </div>
                <span className="text-xl sm:text-2xl font-black text-[#d4af37]">
                  {Math.round((score / totalQuestions) * 100)} / 100
                </span>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Alhamdulillah! Anda menjawab benar <strong>{score}</strong> dari <strong>{totalQuestions}</strong> soal. Nilai Anda telah otomatis tercatat pada berkas pendaftaran panitia PPDB.
              </p>
            </div>
          )}

          {/* Questions List */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {utbkQuestions.map((q, idx) => {
              const selected = answers[q.id];
              const isCorrect = selected === q.correct;

              return (
                <div
                  key={q.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all text-xs space-y-3 ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : 'bg-rose-50/60 border-rose-300'
                      : 'bg-white border-gray-200 hover:border-emerald-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[#1a6b3c] flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#1a6b3c] flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <span>{q.subject}</span>
                    </span>

                    {isSubmitted && (
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}>
                        {isCorrect ? 'Jawaban Benar ✓' : 'Jawaban Salah ✗'}
                      </span>
                    )}
                  </div>

                  <p className="font-semibold text-gray-800 text-xs sm:text-sm leading-relaxed">
                    {q.question}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    {q.options.map((opt, oIdx) => {
                      const isOptionChecked = selected === oIdx;
                      let optionStyle = 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100';

                      if (isSubmitted) {
                        if (oIdx === q.correct) {
                          optionStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                        } else if (isOptionChecked && !isCorrect) {
                          optionStyle = 'bg-rose-100 border-rose-400 text-rose-900 font-bold';
                        } else {
                          optionStyle = 'bg-gray-50 border-gray-100 text-gray-400 opacity-60';
                        }
                      } else if (isOptionChecked) {
                        optionStyle = 'bg-emerald-50 border-[#1a6b3c] text-[#0d4a28] font-bold ring-1 ring-[#1a6b3c]';
                      }

                      return (
                        <label
                          key={oIdx}
                          className={`flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl border cursor-pointer transition ${optionStyle}`}
                        >
                          <input
                            type="radio"
                            name={`cbt_q_${q.id}`}
                            checked={isOptionChecked}
                            onChange={() => !isSubmitted && setAnswers(prev => ({ ...prev, [q.id]: oIdx }))}
                            disabled={isSubmitted}
                            className="mt-0.5 text-[#1a6b3c] focus:ring-[#1a6b3c]"
                          />
                          <span className="leading-snug">{opt}</span>
                        </label>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className="p-3 bg-white/80 rounded-xl border border-gray-200 text-[11px] text-gray-700 space-y-0.5">
                      <span className="font-bold text-[#0d4a28] block">Pembahasan Akademik:</span>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom Actions */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur pt-3 pb-1 border-t border-gray-100 flex items-center justify-between gap-3">
              <span className="text-[11px] text-gray-500">
                Terjawab: <strong>{answeredCount}</strong> / {totalQuestions} soal
              </span>

              <div className="flex items-center gap-2">
                {isSubmitted ? (
                  <>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-bold text-xs flex items-center gap-1.5 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Ulangi Tes</span>
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2 rounded-xl bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold text-xs flex items-center gap-1.5 shadow btn-spring"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Selesai & Tutup</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-bold text-xs flex items-center gap-2 shadow-lg btn-spring"
                  >
                    <span>Kirim Jawaban CBT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
