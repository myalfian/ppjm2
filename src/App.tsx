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
import { WaveDivider } from './components/WaveDivider';
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
import { CbtExamModal } from './components/modals/CbtExamModal';
import { MobileMenuModal } from './components/modals/MobileMenuModal';

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
  const settings = store.getSettings();
  const slides = store.getSlides();
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
  const [cbtExamSubmission, setCbtExamSubmission] = useState<PPDBSubmission | null>(null);
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

  // Section Navigation from Mobile Menu / Navbar / BottomNav
  const handleNavigateToSection = (targetId: string, hash?: string) => {
    setMobileMenuOpen(false);

    // Return to public website portal view if currently in admin mode
    if (isAdminView) {
      setIsAdminView(false);
    }

    // Dismiss any open modals
    setShowPpdbModal(false);
    setShowStatusModal(false);
    setShowSearchModal(false);
    setSelectedNewsPost(null);
    setSelectedMediaItem(null);
    setSelectedEcosystemKey(null);
    setSelectedSyllabusProgram(null);
    setCbtExamSubmission(null);
    setPrintCardSubmission(null);

    // Ensure route is at root
    if (window.location.pathname && window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
      window.history.pushState({}, '', '/');
    }

    if (hash) {
      window.location.hash = hash;
    }

    // Delay slightly to allow public DOM elements to mount if coming from another view
    setTimeout(() => {
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 120);
  };

  // Scroll Progress Percentage with requestAnimationFrame (LOW-04)
  const [scrollProgress, setScrollProgress] = useState(0);

  // 404 Route path check (MED-06)
  const [invalidRoute, setInvalidRoute] = useState<string | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    if (path && path !== '/' && path !== '/index.html') {
      setInvalidRoute(path);
      window.history.replaceState({}, '', '/');
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const currentProgress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
          } else {
            setScrollProgress(0);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f7f2] font-sans antialiased text-gray-800 overflow-x-hidden w-full max-w-full pb-20 md:pb-0">
      
      {/* Thin Animated Scroll Progress Bar at very top */}
      <div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-black/10 z-[100] pointer-events-none"
        aria-hidden="true"
      >
        <div 
          className="h-full bg-gradient-to-r from-[#1a6b3c] via-[#d4af37] to-[#10b981] transition-all duration-150 ease-out shadow-[0_0_10px_rgba(212,175,55,0.7)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Invalid route 404 notification banner (MED-06) */}
      {invalidRoute && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4">
          <div className="bg-amber-800 text-white p-3 rounded-2xl shadow-xl flex items-center justify-between text-xs border border-amber-600">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Halaman <strong>{invalidRoute}</strong> tidak ditemukan. Dialihkan ke beranda.</span>
            </div>
            <button 
              onClick={() => setInvalidRoute(null)}
              className="p-1 rounded-full hover:bg-amber-700 transition"
              aria-label="Tutup pemberitahuan"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

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
            settings={settings}
            slides={slides}
            onUpdateSettings={(s) => store.updateSettings(s)}
            onUpdateSlide={(id, s) => store.updateSlide(id, s)}
            onAddSlide={(s) => store.addSlide(s)}
            onDeleteSlide={(id) => store.deleteSlide(id)}
            onCleanupTestAudit={() => store.cleanupTestAuditData()}
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
              slides={slides}
              onOpenPpdb={() => setShowPpdbModal(true)}
              onOpenStatus={() => setShowStatusModal(true)}
            />

            {/* Quick Menu (Shortcut Capsules: Sambutan, Visi Misi, Pengumuman, E-Learning, Ekskul, Prestasi) */}
            <QuickMenu
              onOpenElearning={() => setSelectedEcosystemKey('elearning')}
            />

            <WaveDivider 
              bgColor="bg-white" 
              fillColor="text-white/80" 
              variant="gentle" 
            />

            <EcosystemSection
              onOpenEcosystemModal={(key) => setSelectedEcosystemKey(key)}
            />

            <WaveDivider 
              bgColor="bg-white/70" 
              fillColor="text-white" 
              variant="crest" 
            />

            <AboutSection />

            <WaveDivider 
              bgColor="bg-white" 
              fillColor="text-[#f1f7f2]" 
              variant="layered" 
            />

            <CurriculumSection
              onOpenSyllabusModal={(prog) => setSelectedSyllabusProgram(prog)}
            />

            <WaveDivider 
              bgColor="bg-[#f1f7f2]" 
              fillColor="text-white" 
              variant="layered" 
            />

            <ExtracurricularSection />

            <WaveDivider 
              bgColor="bg-white" 
              fillColor="text-[#f1f7f2]" 
              variant="crest" 
            />

            <AchievementsSection />

            <WaveDivider 
              bgColor="bg-[#f1f7f2]" 
              fillColor="text-white" 
              variant="layered" 
            />

            <SteamSection />

            <WaveDivider 
              bgColor="bg-white" 
              fillColor="text-emerald-50/50" 
              variant="gentle" 
            />

            <FacilitiesSection />

            <WaveDivider 
              bgColor="bg-white" 
              fillColor="text-[#f1f7f2]" 
              variant="layered" 
            />

            <NewsSection
              posts={posts}
              onOpenNewsDetail={(p) => setSelectedNewsPost(p)}
              onToast={showToast}
            />

            <WaveDivider 
              bgColor="bg-[#f1f7f2]" 
              fillColor="text-gray-50/70" 
              variant="crest" 
            />

            <GallerySection
              media={mediaList}
              onOpenMediaModal={(m) => setSelectedMediaItem(m)}
            />

            <WaveDivider 
              bgColor="bg-gray-50/70" 
              fillColor="text-[#f1f7f2]" 
              variant="layered" 
            />

            <LocationSection
              settings={settings}
              onToast={showToast}
            />

            <WaveDivider 
              bgColor="bg-[#f1f7f2]" 
              fillColor="text-white" 
              variant="gentle" 
            />

            <GuestbookSection
              entries={guestbook}
              onSubmitEntry={(e) => store.addGuestbook(e)}
              onToast={showToast}
            />

            <WaveDivider 
              bgColor="bg-white" 
              fillColor="text-[#f1f7f2]" 
              variant="layered" 
            />

            <FaqSection />

            <WaveDivider 
              bgColor="bg-[#f1f7f2]" 
              fillColor="text-[#0b3d21]" 
              variant="layered" 
            />
          </main>

          {/* Footer */}
          <Footer settings={settings} />

          {/* Android-style Mobile Bottom Navigation Bar (Home, JM News, Medsos, E-Learning, Menu) */}
          <BottomNav
            onOpenPpdb={() => setShowPpdbModal(true)}
            onOpenMedsos={() => handleNavigateToSection('medsos')}
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
        onStartCbt={(sub) => {
          setShowStatusModal(false);
          setCbtExamSubmission(sub);
        }}
      />

      {cbtExamSubmission && (
        <CbtExamModal
          isOpen={!!cbtExamSubmission}
          submission={cbtExamSubmission}
          onClose={() => setCbtExamSubmission(null)}
          onComplete={(score, total) => {
            store.recordCBTScore(cbtExamSubmission.code, score, total);
            showToast(`CBT Asesmen selesai! Skor: ${score}/${total} telah disimpan pada berkas pendaftaran.`);
          }}
        />
      )}

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

      {/* Full-featured Mobile Menu Bottom Sheet (Visible anywhere in viewport) */}
      <MobileMenuModal
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenSearch={() => setShowSearchModal(true)}
        onOpenPpdb={() => setShowPpdbModal(true)}
        onOpenStatus={() => setShowStatusModal(true)}
        onOpenAdmin={() => setIsAdminView(true)}
        onOpenElearning={() => setSelectedEcosystemKey('elearning')}
        onOpenEcosystem={(key) => setSelectedEcosystemKey(key)}
        onOpenSyllabus={(prog) => setSelectedSyllabusProgram(prog)}
        onNavigateToSection={handleNavigateToSection}
      />

    </div>
  );
};
