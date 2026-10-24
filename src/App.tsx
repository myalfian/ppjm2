import React, { useState, useEffect, lazy, Suspense } from 'react';
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

// Code-split Modals with dynamic import (loaded on demand)
const PpdbModal = lazy(() => import('./components/modals/PpdbModal').then(m => ({ default: m.PpdbModal })));
const PpdbStatusModal = lazy(() => import('./components/modals/PpdbStatusModal').then(m => ({ default: m.PpdbStatusModal })));
const PrintCardModal = lazy(() => import('./components/modals/PrintCardModal').then(m => ({ default: m.PrintCardModal })));
const NewsDetailModal = lazy(() => import('./components/modals/NewsDetailModal').then(m => ({ default: m.NewsDetailModal })));
const MediaModal = lazy(() => import('./components/modals/MediaModal').then(m => ({ default: m.MediaModal })));
const EcosystemModal = lazy(() => import('./components/modals/EcosystemModal').then(m => ({ default: m.EcosystemModal })));
const SyllabusModal = lazy(() => import('./components/modals/SyllabusModal').then(m => ({ default: m.SyllabusModal })));
const SearchModal = lazy(() => import('./components/modals/SearchModal').then(m => ({ default: m.SearchModal })));
const CbtExamModal = lazy(() => import('./components/modals/CbtExamModal').then(m => ({ default: m.CbtExamModal })));
const MobileMenuModal = lazy(() => import('./components/modals/MobileMenuModal').then(m => ({ default: m.MobileMenuModal })));

// Code-split Admin Views (loaded only when accessing Admin panel)
const AdminLogin = lazy(() => import('./components/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

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
  const achievements = store.getAchievements();
  const extracurriculars = store.getExtracurriculars();
  const facilities = store.getFacilities();
  const faqs = store.getFaqs();
  const aboutData = store.getAboutData();
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

  // Secure Hash-based Admin Access (#yaieditor)
  useEffect(() => {
    const handleHashCheck = () => {
      if (window.location.hash === '#yaieditor') {
        setIsAdminView(true);
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const handleExitAdmin = () => {
    setIsAdminView(false);
    if (window.location.hash === '#yaieditor') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

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
      handleExitAdmin();
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
    <div className="min-h-screen flex flex-col bg-[#f1f7f2] font-sans antialiased text-gray-800 overflow-x-clip w-full max-w-full pb-20 md:pb-0">
      
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
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-[#1a6b3c] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-semibold text-gray-600">Memuat Portal Administrasi...</p>
            </div>
          </div>
        }>
          {!isAuthenticated ? (
            <AdminLogin
              onLogin={(email) => store.login(email)}
              onBack={handleExitAdmin}
            />
          ) : (
            <AdminDashboard
              currentRole={currentRole}
              onRoleChange={(r) => store.setRole(r)}
              onLogout={() => store.logout()}
              onBackToWebsite={handleExitAdmin}
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
              achievements={achievements}
              extracurriculars={extracurriculars}
              facilities={facilities}
              faqs={faqs}
              aboutData={aboutData}
              onUpdateSettings={(s) => store.updateSettings(s)}
              onUpdateSlide={(id, s) => store.updateSlide(id, s)}
              onAddSlide={(s) => store.addSlide(s)}
              onDeleteSlide={(id) => store.deleteSlide(id)}
              onCleanupTestAudit={() => store.cleanupTestAuditData()}
              onAddAchievement={(a) => store.addAchievement(a)}
              onUpdateAchievement={(a) => store.updateAchievement(a)}
              onDeleteAchievement={(id) => store.deleteAchievement(id)}
              onAddExtracurricular={(e) => store.addExtracurricular(e)}
              onUpdateExtracurricular={(e) => store.updateExtracurricular(e)}
              onDeleteExtracurricular={(id) => store.deleteExtracurricular(id)}
              onAddFacility={(f) => store.addFacility(f)}
              onUpdateFacility={(f) => store.updateFacility(f)}
              onDeleteFacility={(id) => store.deleteFacility(id)}
              onAddFaq={(faq) => store.addFaq(faq)}
              onUpdateFaq={(faq) => store.updateFaq(faq)}
              onDeleteFaq={(id) => store.deleteFaq(id)}
              onUpdateAboutData={(data) => store.updateAboutData(data)}
              onExportAllData={() => store.exportAllData()}
              onImportAllData={(json) => store.importAllData(json)}
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
          )}
        </Suspense>
      ) : (
        <>
          {/* Public Portal Navigation */}
          <Navbar
            onOpenSearch={() => setShowSearchModal(true)}
            onOpenPpdb={() => setShowPpdbModal(true)}
            onOpenStatus={() => setShowStatusModal(true)}
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

            <AboutSection 
              aboutData={aboutData}
              settings={settings}
            />

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

            <ExtracurricularSection 
              items={extracurriculars}
            />

            <WaveDivider 
              bgColor="bg-white" 
              fillColor="text-[#f1f7f2]" 
              variant="crest" 
            />

            <AchievementsSection 
              items={achievements}
            />

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

            <FacilitiesSection 
              facilities={facilities}
            />

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

            <FaqSection 
              faqs={faqs}
            />

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

      {/* Interactive Modals (Loaded On-Demand) */}
      <Suspense fallback={null}>
        {showPpdbModal && (
          <PpdbModal
            isOpen={showPpdbModal}
            onClose={() => setShowPpdbModal(false)}
            onSubmit={(sub) => store.addPPDB(sub)}
            onOpenPrintCard={(sub) => {
              setShowPpdbModal(false);
              setPrintCardSubmission(sub);
            }}
          />
        )}

        {showStatusModal && (
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
        )}

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

        {printCardSubmission && (
          <PrintCardModal
            submission={printCardSubmission}
            onClose={() => setPrintCardSubmission(null)}
          />
        )}

        {selectedNewsPost && (
          <NewsDetailModal
            post={selectedNewsPost}
            onClose={() => setSelectedNewsPost(null)}
            onToast={showToast}
          />
        )}

        {selectedMediaItem && (
          <MediaModal
            item={selectedMediaItem}
            onClose={() => setSelectedMediaItem(null)}
          />
        )}

        {selectedEcosystemKey && (
          <EcosystemModal
            moduleKey={selectedEcosystemKey}
            onClose={() => setSelectedEcosystemKey(null)}
          />
        )}

        {selectedSyllabusProgram && (
          <SyllabusModal
            programName={selectedSyllabusProgram}
            onClose={() => setSelectedSyllabusProgram(null)}
            onToast={showToast}
          />
        )}

        {showSearchModal && (
          <SearchModal
            isOpen={showSearchModal}
            onClose={() => setShowSearchModal(false)}
            posts={posts}
            mediaList={mediaList}
            ppdbList={ppdbList}
            achievements={achievements}
            extracurriculars={extracurriculars}
            facilities={facilities}
            faqs={faqs}
            onOpenNewsDetail={(p) => setSelectedNewsPost(p)}
            onOpenMediaModal={(m) => setSelectedMediaItem(m)}
          />
        )}

        {mobileMenuOpen && (
          <MobileMenuModal
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            onOpenSearch={() => setShowSearchModal(true)}
            onOpenPpdb={() => setShowPpdbModal(true)}
            onOpenStatus={() => setShowStatusModal(true)}
            onOpenElearning={() => setSelectedEcosystemKey('elearning')}
            onOpenEcosystem={(key) => setSelectedEcosystemKey(key)}
            onOpenSyllabus={(prog) => setSelectedSyllabusProgram(prog)}
            onNavigateToSection={handleNavigateToSection}
          />
        )}
      </Suspense>

    </div>
  );
};
