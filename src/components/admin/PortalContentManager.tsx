import React, { useState } from 'react';
import { 
  Trophy, 
  Activity, 
  Building2, 
  HelpCircle, 
  UserCheck, 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  Download, 
  Upload, 
  Save, 
  Eye, 
  X,
  Compass,
  CheckCircle2,
  Calendar,
  Clock,
  Layers,
  FileJson
} from 'lucide-react';
import { 
  AchievementItem, 
  ExtracurricularItem, 
  FacilityItem, 
  FAQItem, 
  AboutData, 
  InstitutionSettings,
  MediaGalleryItem
} from '../../types';
import { SmoothCurvedTabs, TabItem } from '../common/SmoothCurvedTabs';
import { DriveMediaPicker } from '../common/DriveMediaPicker';

interface PortalContentManagerProps {
  achievements: AchievementItem[];
  extracurriculars: ExtracurricularItem[];
  facilities: FacilityItem[];
  faqs: FAQItem[];
  aboutData: AboutData;
  settings?: InstitutionSettings;
  mediaList?: MediaGalleryItem[];
  onAddAchievement?: (item: Omit<AchievementItem, 'id'>) => void;
  onUpdateAchievement?: (item: AchievementItem) => void;
  onDeleteAchievement?: (id: string) => void;
  onAddExtracurricular?: (item: Omit<ExtracurricularItem, 'id'>) => void;
  onUpdateExtracurricular?: (item: ExtracurricularItem) => void;
  onDeleteExtracurricular?: (id: string) => void;
  onAddFacility?: (item: Omit<FacilityItem, 'id'>) => void;
  onUpdateFacility?: (item: FacilityItem) => void;
  onDeleteFacility?: (id: string) => void;
  onAddFaq?: (item: Omit<FAQItem, 'id'>) => void;
  onUpdateFaq?: (item: FAQItem) => void;
  onDeleteFaq?: (id: string) => void;
  onUpdateAboutData?: (data: AboutData) => void;
  onExportData?: () => string;
  onImportData?: (json: string) => boolean;
  onToast: (msg: string) => void;
}

export const PortalContentManager: React.FC<PortalContentManagerProps> = ({
  achievements,
  extracurriculars,
  facilities,
  faqs,
  aboutData,
  settings,
  mediaList = [],
  onAddAchievement,
  onUpdateAchievement,
  onDeleteAchievement,
  onAddExtracurricular,
  onUpdateExtracurricular,
  onDeleteExtracurricular,
  onAddFacility,
  onUpdateFacility,
  onDeleteFacility,
  onAddFaq,
  onUpdateFaq,
  onDeleteFaq,
  onUpdateAboutData,
  onExportData,
  onImportData,
  onToast
}) => {
  const [subTab, setSubTab] = useState<'prestasi' | 'ekskul' | 'fasilitas' | 'faq' | 'profil' | 'backup'>('prestasi');

  // Modal states
  const [editingAchievement, setEditingAchievement] = useState<AchievementItem | null>(null);
  const [showAchModal, setShowAchModal] = useState(false);
  const [achTitle, setAchTitle] = useState('');
  const [achLevel, setAchLevel] = useState<'Nasional' | 'Provinsi' | 'Kabupaten'>('Nasional');
  const [achCategory, setAchCategory] = useState('Tahfidz');
  const [achWinner, setAchWinner] = useState('');
  const [achClassGrade, setAchClassGrade] = useState('');
  const [achOrganizer, setAchOrganizer] = useState('');
  const [achYear, setAchYear] = useState('2025');
  const [achImage, setAchImage] = useState('');
  const [achDescription, setAchDescription] = useState('');

  // Ekskul Modal states
  const [editingEkskul, setEditingEkskul] = useState<ExtracurricularItem | null>(null);
  const [showEkskulModal, setShowEkskulModal] = useState(false);
  const [exName, setExName] = useState('');
  const [exCategory, setExCategory] = useState('Seni Islami');
  const [exImage, setExImage] = useState('');
  const [exShortDesc, setExShortDesc] = useState('');
  const [exFullDesc, setExFullDesc] = useState('');
  const [exSchedule, setExSchedule] = useState('');
  const [exCoach, setExCoach] = useState('');
  const [exLocation, setExLocation] = useState('Pesantren JM');

  // Facility Modal states
  const [editingFacility, setEditingFacility] = useState<FacilityItem | null>(null);
  const [showFacModal, setShowFacModal] = useState(false);
  const [facTitle, setFacTitle] = useState('');
  const [facDesc, setFacDesc] = useState('');
  const [facIconName, setFacIconName] = useState('Sparkles');
  const [facImage, setFacImage] = useState('');
  const [facTag, setFacTag] = useState('Fasilitas Unggulan');

  // FAQ Modal states
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [faqCategory, setFaqCategory] = useState('PPDB 2026');
  const [faqQ, setFaqQ] = useState('');
  const [faqA, setFaqA] = useState('');

  // About / Profil Edit states
  const [dirName, setDirName] = useState(aboutData.directorName);
  const [dirTitle, setDirTitle] = useState(aboutData.directorTitle);
  const [dirImage, setDirImage] = useState(aboutData.directorImage);
  const [dirQuote, setDirQuote] = useState(aboutData.directorQuote);
  const [dirSpeech, setDirSpeech] = useState(aboutData.directorSpeech);
  const [visionText, setVisionText] = useState(aboutData.vision);
  const [missionItems, setMissionItems] = useState<string[]>(aboutData.mission);
  const [newMissionInput, setNewMissionInput] = useState('');

  // Tab Definitions
  const cmsTabs: TabItem<'prestasi' | 'ekskul' | 'fasilitas' | 'faq' | 'profil' | 'backup'>[] = [
    { id: 'prestasi', label: 'Prestasi Santri', icon: <Trophy className="w-3.5 h-3.5" />, badge: achievements.length },
    { id: 'ekskul', label: 'Ekstrakurikuler', icon: <Activity className="w-3.5 h-3.5" />, badge: extracurriculars.length },
    { id: 'fasilitas', label: 'Fasilitas Pesantren', icon: <Building2 className="w-3.5 h-3.5" />, badge: facilities.length },
    { id: 'faq', label: 'FAQ Pertanyaan', icon: <HelpCircle className="w-3.5 h-3.5" />, badge: faqs.length },
    { id: 'profil', label: 'Profil, Sambutan & Visi', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'backup', label: 'Backup / Restore JSON', icon: <FileJson className="w-3.5 h-3.5" /> },
  ];

  // ==========================
  // HANDLERS: PRESTASI
  // ==========================
  const handleOpenAddAch = () => {
    setEditingAchievement(null);
    setAchTitle('');
    setAchLevel('Nasional');
    setAchCategory('Tahfidz');
    setAchWinner('');
    setAchClassGrade('');
    setAchOrganizer('');
    setAchYear('2025');
    setAchImage('');
    setAchDescription('');
    setShowAchModal(true);
  };

  const handleOpenEditAch = (item: AchievementItem) => {
    setEditingAchievement(item);
    setAchTitle(item.title);
    setAchLevel(item.level);
    setAchCategory(item.category);
    setAchWinner(item.winner);
    setAchClassGrade(item.classGrade);
    setAchOrganizer(item.organizer);
    setAchYear(item.year);
    setAchImage(item.image);
    setAchDescription(item.description);
    setShowAchModal(true);
  };

  const handleSaveAch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!achTitle.trim() || !achWinner.trim()) {
      onToast('Judul prestasi dan nama pemenang wajib diisi.');
      return;
    }
    const payload = {
      title: achTitle.trim(),
      level: achLevel,
      category: achCategory,
      winner: achWinner.trim(),
      classGrade: achClassGrade.trim() || 'Santri PPJM',
      organizer: achOrganizer.trim() || 'Kemenag / Puspresnas',
      year: achYear.trim() || '2025',
      image: achImage.trim() || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      description: achDescription.trim() || 'Prestasi gemilang santri Jauharul Maknuun.'
    };

    if (editingAchievement) {
      onUpdateAchievement?.({ ...payload, id: editingAchievement.id });
      onToast(`Prestasi "${payload.title}" berhasil diperbarui.`);
    } else {
      onAddAchievement?.(payload);
      onToast(`Prestasi baru "${payload.title}" berhasil ditambahkan.`);
    }
    setShowAchModal(false);
  };

  // ==========================
  // HANDLERS: EKSKUL
  // ==========================
  const handleOpenAddEkskul = () => {
    setEditingEkskul(null);
    setExName('');
    setExCategory('Seni Islami');
    setExImage('');
    setExShortDesc('');
    setExFullDesc('');
    setExSchedule('Ahad Sore (16.00 - 17.30)');
    setExCoach('Ust. Pembina Ekskul');
    setExLocation('Aula / Halaman Pesantren');
    setShowEkskulModal(true);
  };

  const handleOpenEditEkskul = (item: ExtracurricularItem) => {
    setEditingEkskul(item);
    setExName(item.name);
    setExCategory(item.category);
    setExImage(item.image);
    setExShortDesc(item.shortDesc);
    setExFullDesc(item.fullDesc);
    setExSchedule(item.schedule);
    setExCoach(item.coach);
    setExLocation(item.location);
    setShowEkskulModal(true);
  };

  const handleSaveEkskul = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exName.trim()) {
      onToast('Nama ekstrakurikuler wajib diisi.');
      return;
    }
    const payload = {
      name: exName.trim(),
      category: exCategory,
      image: exImage.trim() || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      shortDesc: exShortDesc.trim() || 'Pengembangan bakat dan potensi santri terpadu.',
      fullDesc: exFullDesc.trim() || exShortDesc.trim() || 'Program ekstrakurikuler resmi Pondok Pesantren Jauharul Maknuun.',
      schedule: exSchedule.trim() || 'Jadwal Reguler Mingguan',
      coach: exCoach.trim() || 'Pelatih Berlisensi',
      location: exLocation.trim() || 'Kompleks Pesantren',
      activities: ['Pembinaan rutin berkala', 'Simulasi uji tanding dan pentas seni', 'Evaluasi kompetensi santri'],
      achievements: ['Sertifikat partisipasi kejuaraan']
    };

    if (editingEkskul) {
      onUpdateExtracurricular?.({ ...payload, id: editingEkskul.id });
      onToast(`Ekstrakurikuler "${payload.name}" berhasil diperbarui.`);
    } else {
      onAddExtracurricular?.(payload);
      onToast(`Ekstrakurikuler baru "${payload.name}" berhasil ditambahkan.`);
    }
    setShowEkskulModal(false);
  };

  // ==========================
  // HANDLERS: FASILITAS
  // ==========================
  const handleOpenAddFac = () => {
    setEditingFacility(null);
    setFacTitle('');
    setFacDesc('');
    setFacIconName('Sparkles');
    setFacImage('');
    setFacTag('Fasilitas Unggulan');
    setShowFacModal(true);
  };

  const handleOpenEditFac = (item: FacilityItem) => {
    setEditingFacility(item);
    setFacTitle(item.title);
    setFacDesc(item.desc);
    setFacIconName(item.iconName || 'Sparkles');
    setFacImage(item.image);
    setFacTag(item.tag || 'Fasilitas Unggulan');
    setShowFacModal(true);
  };

  const handleSaveFac = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facTitle.trim()) {
      onToast('Nama fasilitas wajib diisi.');
      return;
    }
    const payload = {
      title: facTitle.trim(),
      desc: facDesc.trim() || 'Fasilitas sarana prasarana representatif penunjang aktivitas santri.',
      iconName: facIconName,
      image: facImage.trim() || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
      tag: facTag.trim() || 'Sarana Pesantren'
    };

    if (editingFacility) {
      onUpdateFacility?.({ ...payload, id: editingFacility.id });
      onToast(`Fasilitas "${payload.title}" berhasil diperbarui.`);
    } else {
      onAddFacility?.(payload);
      onToast(`Fasilitas baru "${payload.title}" berhasil ditambahkan.`);
    }
    setShowFacModal(false);
  };

  // ==========================
  // HANDLERS: FAQ
  // ==========================
  const handleOpenAddFaq = () => {
    setEditingFaq(null);
    setFaqCategory('PPDB 2026');
    setFaqQ('');
    setFaqA('');
    setShowFaqModal(true);
  };

  const handleOpenEditFaq = (item: FAQItem) => {
    setEditingFaq(item);
    setFaqCategory(item.category);
    setFaqQ(item.q);
    setFaqA(item.a);
    setShowFaqModal(true);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQ.trim() || !faqA.trim()) {
      onToast('Pertanyaan dan jawaban FAQ wajib diisi.');
      return;
    }
    const payload = {
      category: faqCategory,
      q: faqQ.trim(),
      a: faqA.trim()
    };

    if (editingFaq) {
      onUpdateFaq?.({ ...payload, id: editingFaq.id });
      onToast(`FAQ berhasil diperbarui.`);
    } else {
      onAddFaq?.(payload);
      onToast(`FAQ baru berhasil ditambahkan.`);
    }
    setShowFaqModal(false);
  };

  // ==========================
  // HANDLERS: PROFIL & SAMBUTAN
  // ==========================
  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dirName.trim()) {
      onToast('Nama pimpinan wajib diisi.');
      return;
    }
    onUpdateAboutData?.({
      directorName: dirName.trim(),
      directorTitle: dirTitle.trim(),
      directorImage: dirImage.trim(),
      directorQuote: dirQuote.trim(),
      directorSpeech: dirSpeech.trim(),
      vision: visionText.trim(),
      mission: missionItems.filter(Boolean),
      history: aboutData.history
    });
    onToast('Profil pimpinan, sambutan, dan visi misi berhasil disimpan!');
  };

  const handleAddMission = () => {
    if (newMissionInput.trim()) {
      setMissionItems(prev => [...prev, newMissionInput.trim()]);
      setNewMissionInput('');
    }
  };

  const handleRemoveMission = (index: number) => {
    setMissionItems(prev => prev.filter((_, i) => i !== index));
  };

  // ==========================
  // HANDLERS: BACKUP & RESTORE
  // ==========================
  const handleDownloadBackup = () => {
    if (!onExportData) return;
    const jsonStr = onExportData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PPJM_Backup_Portal_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onToast('File backup portal JSON berhasil diunduh.');
  };

  const handleFileRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && onImportData) {
        if (window.confirm('PERINGATAN: Restore data dari file ini akan menimpa data portal yang ada saat ini. Lanjutkan?')) {
          const success = onImportData(content);
          if (success) {
            onToast('Restore data portal berhasil! Seluruh komponen telah disinkronkan.');
          } else {
            onToast('Gagal memproses file JSON backup. Pastikan format valid.');
          }
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0d4a28] flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#d4af37]" />
            <span>Manajemen Konten & Card Web Publik</span>
          </h2>
          <p className="text-xs text-gray-500">
            Perbarui teks, gambar, dan kartu di setiap section website secara terintegrasi dan tersinkronisasi instan.
          </p>
        </div>
      </div>

      {/* Sub-Tabs Nav using SmoothCurvedTabs */}
      <div className="flex justify-start sm:justify-center overflow-x-auto no-scrollbar">
        <SmoothCurvedTabs<'prestasi' | 'ekskul' | 'fasilitas' | 'faq' | 'profil' | 'backup'>
          tabs={cmsTabs}
          activeTab={subTab}
          onChange={setSubTab}
          size="sm"
        />
      </div>

      {/* ========================================================
          SUB-TAB 1: PRESTASI SANTRI
      ======================================================== */}
      {subTab === 'prestasi' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600">
              Total {achievements.length} Prestasi Terdaftar di Web
            </span>
            <button
              onClick={handleOpenAddAch}
              className="px-3.5 py-1.5 rounded-xl bg-[#1a6b3c] text-white text-xs font-bold hover:bg-[#0d4a28] flex items-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Prestasi</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="relative h-36 rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#0d4a28]/90 text-[#d4af37]">
                      {item.level}
                    </span>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 text-gray-800 shadow">
                      Tahun {item.year}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm text-gray-900 line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="text-xs text-[#1a6b3c] font-semibold mt-1">
                    👤 {item.winner} ({item.classGrade})
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1.5">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 text-xs">
                  <span className="text-[11px] text-gray-400 font-medium">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditAch(item)}
                      className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                      title="Edit Prestasi"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Hapus prestasi "${item.title}"?`)) {
                          onDeleteAchievement?.(item.id);
                          onToast(`Prestasi "${item.title}" berhasil dihapus.`);
                        }
                      }}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"
                      title="Hapus Prestasi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 2: EKSTRAKURIKULER
      ======================================================== */}
      {subTab === 'ekskul' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600">
              Total {extracurriculars.length} Ekstrakurikuler Aktif
            </span>
            <button
              onClick={handleOpenAddEkskul}
              className="px-3.5 py-1.5 rounded-xl bg-[#1a6b3c] text-white text-xs font-bold hover:bg-[#0d4a28] flex items-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Ekskul</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {extracurriculars.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="relative h-36 rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#1a6b3c] text-white">
                      {item.category}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm text-gray-900 line-clamp-2">
                    {item.name}
                  </h4>
                  <div className="text-[11px] text-gray-500 mt-1 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-[#1a6b3c]" />
                    <span className="truncate">{item.schedule}</span>
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1.5">
                    <UserCheck className="w-3 h-3 text-[#1a6b3c]" />
                    <span className="truncate">{item.coach}</span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-2">
                    {item.shortDesc}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-1 pt-3 mt-3 border-t border-gray-100 text-xs">
                  <button
                    onClick={() => handleOpenEditEkskul(item)}
                    className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                    title="Edit Ekskul"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Hapus ekstrakurikuler "${item.name}"?`)) {
                        onDeleteExtracurricular?.(item.id);
                        onToast(`Ekstrakurikuler "${item.name}" berhasil dihapus.`);
                      }
                    }}
                    className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"
                    title="Hapus Ekskul"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 3: FASILITAS PESANTREN
      ======================================================== */}
      {subTab === 'fasilitas' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600">
              Total {facilities.length} Fasilitas & Sarana Prasarana
            </span>
            <button
              onClick={handleOpenAddFac}
              className="px-3.5 py-1.5 rounded-xl bg-[#1a6b3c] text-white text-xs font-bold hover:bg-[#0d4a28] flex items-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Fasilitas</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilities.map((fac) => (
              <div 
                key={fac.id}
                className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="relative h-36 rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <img 
                      src={fac.image} 
                      alt={fac.title} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#0d4a28] text-white">
                      {fac.tag}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm text-gray-900">
                    {fac.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-3 mt-1.5">
                    {fac.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 text-xs">
                  <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-semibold">
                    Ikon: {fac.iconName}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditFac(fac)}
                      className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                      title="Edit Fasilitas"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Hapus fasilitas "${fac.title}"?`)) {
                          onDeleteFacility?.(fac.id);
                          onToast(`Fasilitas "${fac.title}" berhasil dihapus.`);
                        }
                      }}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"
                      title="Hapus Fasilitas"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 4: FAQ PERTANYAAN
      ======================================================== */}
      {subTab === 'faq' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600">
              Total {faqs.length} Pertanyaan Umum (FAQ)
            </span>
            <button
              onClick={handleOpenAddFaq}
              className="px-3.5 py-1.5 rounded-xl bg-[#1a6b3c] text-white text-xs font-bold hover:bg-[#0d4a28] flex items-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah FAQ</span>
            </button>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <div 
                key={faq.id}
                className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs flex items-start justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-[#1a6b3c]">
                      {faq.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-gray-900">
                    {faq.q}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleOpenEditFaq(faq)}
                    className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                    title="Edit FAQ"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Hapus pertanyaan FAQ ini?`)) {
                        onDeleteFaq?.(faq.id);
                        onToast(`FAQ berhasil dihapus.`);
                      }
                    }}
                    className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"
                    title="Hapus FAQ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 5: PROFIL, SAMBUTAN & VISI-MISI
      ======================================================== */}
      {subTab === 'profil' && (
        <form onSubmit={handleSaveAbout} className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-base font-bold text-[#0d4a28]">
              Sambutan Direktur / Pimpinan Lembaga
            </h3>
            <p className="text-xs text-gray-500">
              Menyesuaikan profil pimpinan, foto pimpinan, kutipan pembuka, dan naskah sambutan resmi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Nama Pimpinan / Direktur
              </label>
              <input
                type="text"
                value={dirName}
                onChange={(e) => setDirName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                placeholder="Contoh: KH. Ahmad Zaini, M.Pd.I / Ir. M. Alfian"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Jabatan / Gelar Resmi
              </label>
              <input
                type="text"
                value={dirTitle}
                onChange={(e) => setDirTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                placeholder="Contoh: Pimpinan Pondok Pesantren Jauharul Maknuun"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Foto Pimpinan Pesantren
              </label>
              <DriveMediaPicker
                value={dirImage}
                onChange={(url) => setDirImage(url)}
                mediaType="image"
                label="Pilih Foto Pimpinan (Desktop / Cloud / Galeri)"
                placeholder="Pilih foto pimpinan dari desktop drive atau link cloud..."
                galleryItems={mediaList}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Kutipan Filosofis Sambutan (Quote)
              </label>
              <input
                type="text"
                value={dirQuote}
                onChange={(e) => setDirQuote(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                placeholder="Contoh: Mendidik dengan Hati, Menuntun dengan Sanad..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Naskah Lengkap Sambutan
              </label>
              <textarea
                rows={4}
                value={dirSpeech}
                onChange={(e) => setDirSpeech(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                placeholder="Tuliskan naskah sambutan resmi pimpinan..."
              />
            </div>
          </div>

          {/* Visi & Misi */}
          <div className="border-t border-gray-100 pt-6 space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#0d4a28]">
                Visi & Misi Kelembagaan
              </h3>
              <p className="text-xs text-gray-500">
                Landasan filosofis pendidikan dan panca jiwa santri yang ditampilkan pada card profil.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Rumusan Visi Pesantren
              </label>
              <textarea
                rows={2}
                value={visionText}
                onChange={(e) => setVisionText(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Daftar Misi Utama Pesantren
              </label>
              <div className="space-y-2 mb-3">
                {missionItems.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 border border-gray-200 text-xs">
                    <span className="w-5 h-5 rounded-full bg-[#1a6b3c] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="flex-1 text-gray-800">{m}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMission(idx)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Hapus Misi"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMissionInput}
                  onChange={(e) => setNewMissionInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddMission();
                    }
                  }}
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  placeholder="Ketik butir misi baru lalu klik Tambah..."
                />
                <button
                  type="button"
                  onClick={handleAddMission}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
                >
                  Tambah Misi
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#1a6b3c] text-white text-xs font-bold hover:bg-[#0d4a28] flex items-center gap-2 transition shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Profil & Sambutan</span>
            </button>
          </div>
        </form>
      )}

      {/* ========================================================
          SUB-TAB 6: BACKUP & RESTORE JSON
      ======================================================== */}
      {subTab === 'backup' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="text-base font-bold text-[#0d4a28] flex items-center gap-2">
              <FileJson className="w-5 h-5 text-[#d4af37]" />
              <span>Pencadangan & Pemulihan Portal (JSON Backup/Restore)</span>
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Simpan seluruh database website (Prestasi, Ekskul, Fasilitas, FAQ, Berita, Banner Slides, dan Pengaturan) ke dalam satu file berkas aman, atau pulihkan kapan saja.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Export Card */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#1a6b3c] text-white flex items-center justify-center mb-3">
                  <Download className="w-5 h-5 text-[#d4af37]" />
                </div>
                <h4 className="font-bold text-sm text-[#0d4a28]">Ekspor Backup Database Portal</h4>
                <p className="text-xs text-gray-600 leading-relaxed mt-1">
                  Mengunduh seluruh konfigurasi card, gambar, dan konten portal web ke dalam berkas format JSON terstandar.
                </p>
              </div>

              <button
                type="button"
                onClick={handleDownloadBackup}
                className="w-full py-2.5 px-4 rounded-xl bg-[#1a6b3c] text-white text-xs font-bold hover:bg-[#0d4a28] flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Unduh File Backup Portal (.json)</span>
              </button>
            </div>

            {/* Import Card */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#d4af37] text-gray-900 flex items-center justify-center mb-3">
                  <Upload className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-gray-900">Pulihkan Data dari File Backup</h4>
                <p className="text-xs text-gray-600 leading-relaxed mt-1">
                  Unggah berkas JSON cadangan portal untuk memperbarui dan mengembalikan seluruh data portal secara langsung.
                </p>
              </div>

              <label className="w-full py-2.5 px-4 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 flex items-center justify-center gap-2 transition shadow-sm cursor-pointer text-center">
                <Upload className="w-4 h-4" />
                <span>Pilih Berkas JSON Restore</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileRestore}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: TAMBAH / EDIT PRESTASI
      ======================================================== */}
      {showAchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="font-extrabold text-sm sm:text-base text-[#0d4a28]">
                {editingAchievement ? 'Edit Prestasi Santri' : 'Tambah Prestasi Baru'}
              </h3>
              <button onClick={() => setShowAchModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAch} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Judul Kejuaraan / Prestasi</label>
                <input
                  type="text"
                  required
                  value={achTitle}
                  onChange={(e) => setAchTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  placeholder="Contoh: Juara 1 Musabaqah Hifdzil Qur'an 30 Juz"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tingkat Prestasi</label>
                  <select
                    value={achLevel}
                    onChange={(e) => setAchLevel(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none cursor-pointer"
                  >
                    <option value="Nasional">Nasional</option>
                    <option value="Provinsi">Provinsi</option>
                    <option value="Kabupaten">Kabupaten</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Kategori</label>
                  <select
                    value={achCategory}
                    onChange={(e) => setAchCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none cursor-pointer"
                  >
                    <option value="Tahfidz">Tahfidz</option>
                    <option value="Sains & Teknologi">Sains & Teknologi</option>
                    <option value="Bahasa & Pidato">Bahasa & Pidato</option>
                    <option value="Seni Islami">Seni Islami</option>
                    <option value="Olahraga">Olahraga</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Nama Pemenang / Santri</label>
                  <input
                    type="text"
                    required
                    value={achWinner}
                    onChange={(e) => setAchWinner(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                    placeholder="Contoh: Muhammad Fatih Al-Habsyi"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Kelas / Regu</label>
                  <input
                    type="text"
                    value={achClassGrade}
                    onChange={(e) => setAchClassGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                    placeholder="Contoh: Santri Pondok Pesantren Jauharul Maknuun"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Penyelenggara Resmi</label>
                  <input
                    type="text"
                    value={achOrganizer}
                    onChange={(e) => setAchOrganizer(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                    placeholder="Contoh: Kemenag RI / PWNU"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tahun Perolehan</label>
                  <input
                    type="text"
                    value={achYear}
                    onChange={(e) => setAchYear(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                    placeholder="2025"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Foto Dokumentasi / Piagam</label>
                <DriveMediaPicker
                  value={achImage}
                  onChange={(url) => setAchImage(url)}
                  mediaType="image"
                  label="Pilih Foto Prestasi (Drive / Cloud / Galeri)"
                  placeholder="Pilih foto dokumentasi/piagam dari desktop drive atau link cloud..."
                  galleryItems={mediaList}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={achDescription}
                  onChange={(e) => setAchDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  placeholder="Ceritakan capaian kejuaraan..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAchModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1a6b3c] text-white text-xs font-bold hover:bg-[#0d4a28] shadow-sm"
                >
                  Simpan Prestasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: TAMBAH / EDIT EKSKUL
      ======================================================== */}
      {showEkskulModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="font-extrabold text-sm sm:text-base text-[#0d4a28]">
                {editingEkskul ? 'Edit Ekstrakurikuler' : 'Tambah Ekstrakurikuler Baru'}
              </h3>
              <button onClick={() => setShowEkskulModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEkskul} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nama Ekstrakurikuler</label>
                <input
                  type="text"
                  required
                  value={exName}
                  onChange={(e) => setExName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  placeholder="Contoh: Pencak Silat Pagar Nusa / Jam'iyyah Sholawat"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Kategori</label>
                  <select
                    value={exCategory}
                    onChange={(e) => setExCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none cursor-pointer"
                  >
                    <option value="Seni Islami">Seni Islami</option>
                    <option value="Bela Diri">Bela Diri</option>
                    <option value="Bahasa">Bahasa</option>
                    <option value="Teknologi">Teknologi</option>
                    <option value="Kepanduan">Kepanduan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Jadwal Latihan</label>
                  <input
                    type="text"
                    value={exSchedule}
                    onChange={(e) => setExSchedule(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                    placeholder="Contoh: Ahad Sore (16.00 - 17.30)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Pelatih / Pembina Ekskul</label>
                <input
                  type="text"
                  value={exCoach}
                  onChange={(e) => setExCoach(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  placeholder="Contoh: Ust. M. Syamsul Huda / Pendekar M. Ridwan"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Foto Kegiatan Ekskul</label>
                <DriveMediaPicker
                  value={exImage}
                  onChange={(url) => setExImage(url)}
                  mediaType="image"
                  label="Pilih Foto Ekskul (Drive / Cloud / Galeri)"
                  placeholder="Pilih foto kegiatan ekskul dari desktop drive atau link cloud..."
                  galleryItems={mediaList}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={exShortDesc}
                  onChange={(e) => setExShortDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  placeholder="Keterangan singkat materi ekstrakurikuler..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowEkskulModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1a6b3c] text-white text-xs font-bold hover:bg-[#0d4a28] shadow-sm"
                >
                  Simpan Ekskul
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: TAMBAH / EDIT FASILITAS
      ======================================================== */}
      {showFacModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="font-extrabold text-sm sm:text-base text-[#0d4a28]">
                {editingFacility ? 'Edit Fasilitas Pesantren' : 'Tambah Fasilitas Baru'}
              </h3>
              <button onClick={() => setShowFacModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveFac} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nama Fasilitas</label>
                <input
                  type="text"
                  required
                  value={facTitle}
                  onChange={(e) => setFacTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  placeholder="Contoh: Lab Komputer & Riset STEM"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Label Tag</label>
                  <input
                    type="text"
                    value={facTag}
                    onChange={(e) => setFacTag(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                    placeholder="Contoh: Laboratorium IT"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Ikon Tampilan</label>
                  <select
                    value={facIconName}
                    onChange={(e) => setFacIconName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none cursor-pointer"
                  >
                    <option value="Monitor">Monitor (Komputer/IT)</option>
                    <option value="Home">Home (Gedung/Asrama)</option>
                    <option value="Sparkles">Sparkles (Masjid/Ibadah)</option>
                    <option value="BookOpen">BookOpen (Perpustakaan)</option>
                    <option value="Stethoscope">Stethoscope (Klinik/UKS)</option>
                    <option value="Utensils">Utensils (Dapur/Katering)</option>
                    <option value="Shield">Shield (Keamanan/Pos)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Foto Sarana Fasilitas</label>
                <DriveMediaPicker
                  value={facImage}
                  onChange={(url) => setFacImage(url)}
                  mediaType="image"
                  label="Pilih Foto Fasilitas (Drive / Cloud / Galeri)"
                  placeholder="Pilih foto fasilitas dari desktop drive atau link cloud..."
                  galleryItems={mediaList}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Deskripsi Lengkap Fasilitas</label>
                <textarea
                  rows={3}
                  value={facDesc}
                  onChange={(e) => setFacDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  placeholder="Uraikan kelengkapan dan fungsi fasilitas..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowFacModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1a6b3c] text-white text-xs font-bold hover:bg-[#0d4a28] shadow-sm"
                >
                  Simpan Fasilitas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: TAMBAH / EDIT FAQ
      ======================================================== */}
      {showFaqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="font-extrabold text-sm sm:text-base text-[#0d4a28]">
                {editingFaq ? 'Edit Pertanyaan FAQ' : 'Tambah Pertanyaan FAQ Baru'}
              </h3>
              <button onClick={() => setShowFaqModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Kategori Pertanyaan</label>
                <select
                  value={faqCategory}
                  onChange={(e) => setFaqCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none cursor-pointer"
                >
                  <option value="PPDB 2026">PPDB 2026</option>
                  <option value="Kurikulum">Kurikulum & Pembelajaran</option>
                  <option value="Asrama">Asrama & Kehidupan Santri</option>
                  <option value="Tahfidz">Tahfidz Al-Qur'an</option>
                  <option value="Biaya">Biaya & Administrasi</option>
                  <option value="Umum">Umum</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Kalimat Pertanyaan (Q)</label>
                <input
                  type="text"
                  required
                  value={faqQ}
                  onChange={(e) => setFaqQ(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  placeholder="Contoh: Bagaimana prosedur pendaftaran santri baru?"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Jawaban Penjelasan (A)</label>
                <textarea
                  rows={4}
                  required
                  value={faqA}
                  onChange={(e) => setFaqA(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1a6b3c] focus:outline-none"
                  placeholder="Berikan penjelasan yang jelas, ramah, dan informatif..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowFaqModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1a6b3c] text-white text-xs font-bold hover:bg-[#0d4a28] shadow-sm"
                >
                  Simpan FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
