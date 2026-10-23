import React, { useState, useEffect } from 'react';
import { store } from './services/store';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { QuickMenu } from './components/QuickMenu';
import { EcosystemSection } from './components/EcosystemSection';
import { AboutSection } from './components/AboutSection';
import { CurriculumSection } from './components/CurriculumSection';
import { ExtracurricularSection } from './components/ExtracurricularSection';
import { AchievementsSection } from './components/AchievementsSection';
import { SteamSection } from './components/SteamSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { NewsSection } from './components/NewsSection';
import { GallerySection } from './components/GallerySection';
import { LocationSection } from './components/LocationSection';
import { GuestbookSection } from './components/GuestbookSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';

// Modals
import { PpdbModal } from './components/modals/PpdbModal';
import { PpdbStatusModal } from './components/modals/PpdbStatusModal';
import { PrintCardModal } from './components/modals/PrintCardModal';
import { NewsDetailModal } from './components/modals/NewsDetailModal';
import { MediaModal } from './components/modals/MediaModal';
import { EcosystemModal } from './components/modals/EcosystemModal';
import { SyllabusModal } from './components/modals/SyllabusModal';
import { SearchModal } from './components/modals/SearchModal';

// Admin Views
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

import { Post, MediaGalleryItem, PPDBSubmission } from './types';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export const App: React.FC = () => {
  // Reactive Store State
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsub = store.subscribe(() => setTick(t => t + 1));
    return () => {
      unsub();
    };
  }, []);

  const posts = store.getPosts();
  const trash = store.getTrash();
  const ppdbList = store.getPPDBList();
  const mediaList = store.getMediaList();
  const guestbook = store.getGuestbook();
  const activityLogs = store.getActivityLogs();
  const santriList = store.getSantriList();
  const tahfidzList = store.getTahfidzList();
  const perizinanList = store.getPerizinanList();
  const tagihanList = store.getTagihanList();
  const nilaiList = store.getNilaiList();
  const currentRole = store.getCurrentRole();
  const isAuthenticated = store.getIsAuthenticated();

  // Navigation & View Mode
  const [isAdminView, setIsAdminView] = useState(false);
  const [currentLang, setCurrentLang] = useState('id');

  // Mobile Menu Drawer State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal States
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showPpdbModal, setShowPpdbModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [printCardSubmission, setPrintCardSubmission] = useState<PPDBSubmission | null>(null);
  const [selectedNewsPost, setSelectedNewsPost] = useState<Post | null>(null);
  const [selectedMediaItem, setSelectedMediaItem] = useState<MediaGalleryItem | null>(null);
  const [selectedEcosystemKey, setSelectedEcosystemKey] = useState<string | null>(null);
  const [selectedSyllabusProgram, setSelectedSyllabusProgram] = useState<string | null>(null);

  // Global Ctrl+K / Cmd+K Search Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearchModal(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toast Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Language Change
  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    const langNames: Record<string, string> = { id: 'Indonesia', en: 'English', ar: 'العربية' };
    showToast(`Bahasa diubah ke: ${langNames[lang] || lang}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f7f2] font-sans antialiased text-gray-800 overflow-x-hidden w-full max-w-full pb-20 md:pb-0">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 bg-[#1a6b3c] text-white rounded-2xl shadow-2xl border border-[#d4af37] text-xs font-semibold animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-75">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Admin Mode vs Public Portal View */}
      {isAdminView ? (
        !isAuthenticated ? (
          <AdminLogin
            onLogin={(email) => store.login(email)}
            onBack={() => setIsAdminView(false)}
          />
        ) : (
          <AdminDashboard
            currentRole={currentRole}
            onRoleChange={(r) => store.setRole(r)}
            onLogout={() => store.logout()}
            onBackToWebsite={() => setIsAdminView(false)}
            ppdbList={ppdbList}
            posts={posts}
            trash={trash}
            mediaList={mediaList}
            activityLogs={activityLogs}
            santriList={santriList}
            tahfidzList={tahfidzList}
            perizinanList={perizinanList}
            tagihanList={tagihanList}
            nilaiList={nilaiList}
            onUpdatePPDBStatus={(id, s) => store.updatePPDBStatus(id, s)}
            onOpenPrintCard={(s) => setPrintCardSubmission(s)}
            onAddPost={(p) => store.addPost(p)}
            onDeletePost={(id) => store.deletePost(id)}
            onRestorePost={(id) => store.restorePost(id)}
            onPermanentDeletePost={(id) => store.permanentDeletePost(id)}
            onAddMedia={(m) => store.addMedia(m)}
            onDeleteMedia={(id) => store.deleteMedia(id)}
            onAddSantri={(s) => store.addSantri(s)}
            onDeleteSantri={(id) => store.deleteSantri(id)}
            onAddTahfidz={(t) => store.addTahfidz(t)}
            onAddPerizinan={(p) => store.addPerizinan(p)}
            onUpdatePerizinanStatus={(id, s) => store.updatePerizinanStatus(id, s)}
            onMarkTagihanLunas={(id) => store.markTagihanLunas(id)}
            onAddNilai={(n) => store.addNilai(n)}
            onToast={showToast}
          />
        )
      ) : (
        <>
          {/* Public Portal Navigation */}
          <Navbar
            onOpenSearch={() => setShowSearchModal(true)}
            onOpenPpdb={() => setShowPpdbModal(true)}
            onOpenStatus={() => setShowStatusModal(true)}
            onOpenAdmin={() => setIsAdminView(true)}
            currentLang={currentLang}
            onLanguageChange={handleLanguageChange}
            isMobileMenuOpen={mobileMenuOpen}
            onToggleMobileMenu={() => setMobileMenuOpen(prev => !prev)}
          />

          {/* Main Landing Sections */}
          <main className="flex-1">
            <HeroSlider
              onOpenPpdb={() => setShowPpdbModal(true)}
              onOpenStatus={() => setShowStatusModal(true)}
            />

            {/* Quick Menu (Shortcut Capsules: Sambutan, Visi Misi, Pengumuman, E-Learning, Ekskul, Prestasi) */}
            <QuickMenu
              onOpenElearning={() => setSelectedEcosystemKey('elearning')}
            />

            <EcosystemSection
              onOpenEcosystemModal={(key) => setSelectedEcosystemKey(key)}
            />

            <AboutSection />

            <CurriculumSection
              onOpenSyllabusModal={(prog) => setSelectedSyllabusProgram(prog)}
            />

            <ExtracurricularSection />

            <AchievementsSection />

            <SteamSection />

            <FacilitiesSection />

            <NewsSection
              posts={posts}
              onOpenNewsDetail={(p) => setSelectedNewsPost(p)}
              onToast={showToast}
            />

            <GallerySection
              media={mediaList}
              onOpenMediaModal={(m) => setSelectedMediaItem(m)}
            />

            <LocationSection
              onToast={showToast}
            />

            <GuestbookSection
              entries={guestbook}
              onSubmitEntry={(e) => store.addGuestbook(e)}
              onToast={showToast}
            />

            <FaqSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Android-style Mobile Bottom Navigation Bar (Home, JM News, Medsos, E-Learning, Menu) */}
          <BottomNav
            onOpenPpdb={() => setShowPpdbModal(true)}
            onOpenElearning={() => setSelectedEcosystemKey('elearning')}
            onOpenMenu={() => setMobileMenuOpen(prev => !prev)}
            isMenuOpen={mobileMenuOpen}
          />
        </>
      )}

      {/* Interactive Modals */}
      <PpdbModal
        isOpen={showPpdbModal}
        onClose={() => setShowPpdbModal(false)}
        onSubmit={(sub) => store.addPPDB(sub)}
        onOpenPrintCard={(sub) => {
          setShowPpdbModal(false);
          setPrintCardSubmission(sub);
        }}
      />

      <PpdbStatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        submissions={ppdbList}
        onOpenPrintCard={(sub) => {
          setShowStatusModal(false);
          setPrintCardSubmission(sub);
        }}
      />

      <PrintCardModal
        submission={printCardSubmission}
        onClose={() => setPrintCardSubmission(null)}
      />

      <NewsDetailModal
        post={selectedNewsPost}
        onClose={() => setSelectedNewsPost(null)}
        onToast={showToast}
      />

      <MediaModal
        item={selectedMediaItem}
        onClose={() => setSelectedMediaItem(null)}
      />

      <EcosystemModal
        moduleKey={selectedEcosystemKey}
        onClose={() => setSelectedEcosystemKey(null)}
      />

      <SyllabusModal
        programName={selectedSyllabusProgram}
        onClose={() => setSelectedSyllabusProgram(null)}
        onToast={showToast}
      />

      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        posts={posts}
        mediaList={mediaList}
        ppdbList={ppdbList}
        onOpenNewsDetail={(p) => setSelectedNewsPost(p)}
        onOpenMediaModal={(m) => setSelectedMediaItem(m)}
      />

    </div>
  );
};
