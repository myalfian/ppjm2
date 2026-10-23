import { 
  PPDBSubmission, 
  Post, 
  MediaGalleryItem, 
  GuestbookEntry, 
  ActivityLog, 
  Santri, 
  TahfidzRecord, 
  Perizinan, 
  Tagihan, 
  NilaiAkademik,
  AdminRole,
  InstitutionSettings,
  HeroSlide,
  AchievementItem,
  ExtracurricularItem,
  FacilityItem,
  FAQItem,
  AboutData
} from '../types';
import { 
  initialPosts, 
  initialPPDB, 
  initialMedia, 
  initialGuestbook, 
  initialActivityLogs, 
  initialSantri, 
  initialTahfidz, 
  initialPerizinan, 
  initialTagihan, 
  initialNilai,
  initialSettings,
  initialHeroSlides,
  initialAchievements,
  initialExtracurriculars,
  initialFacilities,
  initialFaqs,
  initialAboutData
} from '../data/initialData';

// Local storage helper with fallbacks
function getStored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(`ppjm_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`ppjm_${key}`, JSON.stringify(value));
  } catch (e) {
    console.warn('Storage set failed', e);
  }
}

class AppStore {
  private posts: Post[] = getStored('posts', initialPosts);
  private trash: Post[] = getStored('trash', []);
  private ppdbList: PPDBSubmission[] = getStored('ppdb', initialPPDB);
  private mediaList: MediaGalleryItem[] = getStored('media', initialMedia);
  private guestbook: GuestbookEntry[] = getStored('guestbook', initialGuestbook);
  private activityLogs: ActivityLog[] = getStored('activity_logs', initialActivityLogs);
  private santriList: Santri[] = getStored('santri', initialSantri);
  private tahfidzList: TahfidzRecord[] = getStored('tahfidz', initialTahfidz);
  private perizinanList: Perizinan[] = getStored('perizinan', initialPerizinan);
  private tagihanList: Tagihan[] = getStored('tagihan', initialTagihan);
  private nilaiList: NilaiAkademik[] = getStored('nilai', initialNilai);
  private settings: InstitutionSettings = getStored('settings', initialSettings);
  private slides: HeroSlide[] = getStored('slides', initialHeroSlides);
  private achievements: AchievementItem[] = getStored('achievements', initialAchievements);
  private extracurriculars: ExtracurricularItem[] = getStored('extracurriculars', initialExtracurriculars);
  private facilities: FacilityItem[] = getStored('facilities', initialFacilities);
  private faqs: FAQItem[] = getStored('faqs', initialFaqs);
  private aboutData: AboutData = getStored('about_data', initialAboutData);
  
  private currentRole: AdminRole = 'super_admin';
  private isAuthenticated: boolean = false;
  private currentUserEmail: string | null = null;
  private listeners: Set<() => void> = new Set();

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  // Getters
  getPosts() { return this.posts; }
  getTrash() { return this.trash; }
  getPPDBList() { return this.ppdbList; }
  getMediaList() { return this.mediaList; }
  getGuestbook() { return this.guestbook; }
  getActivityLogs() { return this.activityLogs; }
  getSantriList() { return this.santriList; }
  getTahfidzList() { return this.tahfidzList; }
  getPerizinanList() { return this.perizinanList; }
  getTagihanList() { return this.tagihanList; }
  getNilaiList() { return this.nilaiList; }
  getSettings() { return this.settings; }
  getAchievements() { return this.achievements; }
  getExtracurriculars() { return this.extracurriculars; }
  getFacilities() { return this.facilities; }
  getFaqs() { return this.faqs; }
  getAboutData() { return this.aboutData; }
  getSlides() { 
    if (!this.slides || this.slides.length < 5) {
      this.slides = initialHeroSlides;
      setStored('slides', this.slides);
    }
    return this.slides; 
  }
  getCurrentRole() { return this.currentRole; }
  getIsAuthenticated() { return this.isAuthenticated; }
  getCurrentUserEmail() { return this.currentUserEmail; }

  setRole(role: AdminRole) {
    this.currentRole = role;
    this.notify();
  }

  login(email: string) {
    this.isAuthenticated = true;
    this.currentUserEmail = email;
    this.logActivity(`Admin login (${email})`, 'auth');
    this.notify();
  }

  logout() {
    this.isAuthenticated = false;
    this.currentUserEmail = null;
    this.logActivity('Admin logged out', 'auth');
    this.notify();
  }

  logActivity(action: string, badge: ActivityLog['badge'] = 'update') {
    const now = new Date();
    const timeStr = 'Hari ini, ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const newLog: ActivityLog = {
      time: timeStr,
      user: `${this.currentRole} (Pengelola)`,
      action,
      badge
    };
    this.activityLogs = [newLog, ...this.activityLogs.slice(0, 49)];
    setStored('activity_logs', this.activityLogs);
    this.notify();
  }

  // PPDB actions
  addPPDB(submission: Omit<PPDBSubmission, 'id' | 'code' | 'status' | 'submitted_at'>): PPDBSubmission {
    const code = `PPDB-2026-${String(this.ppdbList.length + 1).padStart(3, '0')}`;
    const newEntry: PPDBSubmission = {
      id: `ppdb-${Date.now()}`,
      code,
      status: 'Menunggu Verifikasi',
      submitted_at: new Date().toISOString(),
      ...submission
    };
    this.ppdbList = [newEntry, ...this.ppdbList];
    setStored('ppdb', this.ppdbList);
    this.logActivity(`Pendaftaran baru: ${newEntry.name} (${code})`, 'create');
    this.notify();
    return newEntry;
  }

  updatePPDBStatus(id: string, status: PPDBSubmission['status']) {
    this.ppdbList = this.ppdbList.map(item => {
      if (item.id === id || item.code === id) {
        this.logActivity(`Memperbarui status ${item.name} -> [${status}]`, 'update');
        return { ...item, status };
      }
      return item;
    });
    setStored('ppdb', this.ppdbList);
    this.notify();
  }

  // Guestbook
  addGuestbook(entry: Omit<GuestbookEntry, 'id' | 'created_at'>): GuestbookEntry {
    const newEntry: GuestbookEntry = {
      id: `gb-${Date.now()}`,
      created_at: new Date().toISOString(),
      ...entry
    };
    this.guestbook = [newEntry, ...this.guestbook];
    setStored('guestbook', this.guestbook);
    this.logActivity(`Testimoni baru dari ${entry.name}`, 'create');
    this.notify();
    return newEntry;
  }

  // Posts CRUD
  addPost(post: Omit<Post, 'id'>): Post {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      ...post
    };
    this.posts = [newPost, ...this.posts];
    setStored('posts', this.posts);
    this.logActivity(`Menerbitkan artikel "${post.title}"`, 'create');
    this.notify();
    return newPost;
  }

  updatePost(id: string, updates: Partial<Post>) {
    this.posts = this.posts.map(p => (p.id === id ? { ...p, ...updates } : p));
    setStored('posts', this.posts);
    this.logActivity(`Memperbarui artikel [${updates.title || id}]`, 'update');
    this.notify();
  }

  deletePost(id: string) {
    const target = this.posts.find(p => p.id === id);
    if (target) {
      this.trash = [target, ...this.trash];
      this.posts = this.posts.filter(p => p.id !== id);
      setStored('posts', this.posts);
      setStored('trash', this.trash);
      this.logActivity(`Memindahkan artikel "${target.title}" ke tempat sampah`, 'delete');
      this.notify();
    }
  }

  restorePost(id: string) {
    const target = this.trash.find(p => p.id === id);
    if (target) {
      this.posts = [target, ...this.posts];
      this.trash = this.trash.filter(p => p.id !== id);
      setStored('posts', this.posts);
      setStored('trash', this.trash);
      this.logActivity(`Memulihkan artikel "${target.title}"`, 'update');
      this.notify();
    }
  }

  permanentDeletePost(id: string) {
    this.trash = this.trash.filter(p => p.id !== id);
    setStored('trash', this.trash);
    this.logActivity(`Menghapus permanen artikel ID ${id}`, 'delete');
    this.notify();
  }

  // Media
  addMedia(item: Omit<MediaGalleryItem, 'id'>) {
    const newMedia: MediaGalleryItem = {
      id: `med-${Date.now()}`,
      ...item
    };
    this.mediaList = [newMedia, ...this.mediaList];
    setStored('media', this.mediaList);
    this.logActivity(`Mengunggah media "${item.title}"`, 'upload');
    this.notify();
    return newMedia;
  }

  deleteMedia(id: string) {
    this.mediaList = this.mediaList.filter(m => m.id !== id);
    setStored('media', this.mediaList);
    this.logActivity(`Menghapus media ID ${id}`, 'delete');
    this.notify();
  }

  // Santri
  addSantri(item: Omit<Santri, 'id'>) {
    const newSantri: Santri = { id: `san-${Date.now()}`, ...item };
    this.santriList = [newSantri, ...this.santriList];
    setStored('santri', this.santriList);
    this.logActivity(`Menambah santri: ${item.name}`, 'create');
    this.notify();
  }

  deleteSantri(id: string) {
    this.santriList = this.santriList.filter(s => s.id !== id);
    setStored('santri', this.santriList);
    this.logActivity(`Menghapus santri ID ${id}`, 'delete');
    this.notify();
  }

  // Tahfidz
  addTahfidz(item: Omit<TahfidzRecord, 'id'>) {
    const newRecord: TahfidzRecord = { id: `thf-${Date.now()}`, ...item };
    this.tahfidzList = [newRecord, ...this.tahfidzList];
    setStored('tahfidz', this.tahfidzList);
    this.logActivity(`Setoran tahfidz ${item.santriName} (${item.surahJuz})`, 'create');
    this.notify();
  }

  // Perizinan
  addPerizinan(item: Omit<Perizinan, 'id'>) {
    const newPermit: Perizinan = { id: `pzn-${Date.now()}`, ...item };
    this.perizinanList = [newPermit, ...this.perizinanList];
    setStored('perizinan', this.perizinanList);
    this.logActivity(`Pengajuan izin ${item.santriName}`, 'create');
    this.notify();
  }

  updatePerizinanStatus(id: string, status: Perizinan['status'], approver: string = 'Keamanan') {
    this.perizinanList = this.perizinanList.map(p => (p.id === id ? { ...p, status, approver } : p));
    setStored('perizinan', this.perizinanList);
    this.logActivity(`Status izin diperbarui -> [${status}]`, 'update');
    this.notify();
  }

  // Tagihan
  markTagihanLunas(id: string) {
    this.tagihanList = this.tagihanList.map(t => (t.id === id ? { ...t, status: 'Lunas', paidDate: new Date().toISOString().slice(0, 10) } : t));
    setStored('tagihan', this.tagihanList);
    this.logActivity(`Pembayaran tagihan diverifikasi: ${id}`, 'update');
    this.notify();
  }

  addTagihan(item: Omit<Tagihan, 'id'>) {
    const newTagihan: Tagihan = { id: `tgh-${Date.now()}`, ...item };
    this.tagihanList = [newTagihan, ...this.tagihanList];
    setStored('tagihan', this.tagihanList);
    this.logActivity(`Membuat tagihan ${item.billTitle} untuk ${item.santriName}`, 'create');
    this.notify();
  }

  // Nilai
  addNilai(item: Omit<NilaiAkademik, 'id'>) {
    const newNilai: NilaiAkademik = { id: `nil-${Date.now()}`, ...item };
    this.nilaiList = [newNilai, ...this.nilaiList];
    setStored('nilai', this.nilaiList);
    this.logActivity(`Input nilai ${item.subject} (${item.score}) untuk ${item.santriName}`, 'create');
    this.notify();
  }

  // Settings
  updateSettings(updates: Partial<InstitutionSettings>) {
    this.settings = { ...this.settings, ...updates };
    setStored('settings', this.settings);
    this.logActivity('Memperbarui informasi & kontak lembaga', 'update');
    this.notify();
  }

  // Slides
  updateSlide(id: string, updates: Partial<HeroSlide>) {
    this.slides = this.slides.map(s => (s.id === id ? { ...s, ...updates } : s));
    setStored('slides', this.slides);
    this.logActivity('Memperbarui slide banner promosi', 'update');
    this.notify();
  }

  addSlide(slide: Omit<HeroSlide, 'id'>): HeroSlide {
    const newSlide: HeroSlide = {
      id: `slide-${Date.now()}`,
      ...slide
    };
    this.slides = [...this.slides, newSlide];
    setStored('slides', this.slides);
    this.logActivity(`Menambah slide banner baru: "${slide.title}"`, 'create');
    this.notify();
    return newSlide;
  }

  deleteSlide(id: string) {
    this.slides = this.slides.filter(s => s.id !== id);
    setStored('slides', this.slides);
    this.logActivity(`Menghapus slide banner ID ${id}`, 'delete');
    this.notify();
  }

  // Record CBT result for PPDB
  recordCBTScore(codeOrId: string, score: number, total: number) {
    this.ppdbList = this.ppdbList.map(item => {
      if (item.code.toLowerCase() === codeOrId.toLowerCase() || item.id === codeOrId) {
        return {
          ...item,
          cbt_score: score,
          cbt_total: total,
          cbt_status: 'Sudah Mengikuti'
        };
      }
      return item;
    });
    setStored('ppdb', this.ppdbList);
    this.logActivity(`Hasil CBT dicatat untuk [${codeOrId}]: Skor ${score}/${total}`, 'create');
    this.notify();
  }

  // Cleanup TEST-AUDIT data
  cleanupTestAuditData(): number {
    let removedCount = 0;
    const isTest = (str: string) => /TEST-AUDIT/i.test(str);

    // Filter posts
    const prevPostsCount = this.posts.length;
    this.posts = this.posts.filter(p => !isTest(p.title) && !isTest(p.content) && !isTest(p.id));
    removedCount += prevPostsCount - this.posts.length;

    // Filter trash
    const prevTrashCount = this.trash.length;
    this.trash = this.trash.filter(p => !isTest(p.title) && !isTest(p.content) && !isTest(p.id));
    removedCount += prevTrashCount - this.trash.length;

    // Filter PPDB
    const prevPpdbCount = this.ppdbList.length;
    this.ppdbList = this.ppdbList.filter(p => !isTest(p.name) && !isTest(p.code) && !isTest(p.id));
    removedCount += prevPpdbCount - this.ppdbList.length;

    // Filter Media
    const prevMediaCount = this.mediaList.length;
    this.mediaList = this.mediaList.filter(m => !isTest(m.title) && !isTest(m.id));
    removedCount += prevMediaCount - this.mediaList.length;

    // Filter Guestbook
    const prevGbCount = this.guestbook.length;
    this.guestbook = this.guestbook.filter(g => !isTest(g.name) && !isTest(g.message) && !isTest(g.id));
    removedCount += prevGbCount - this.guestbook.length;

    // Filter Activity logs
    const prevLogsCount = this.activityLogs.length;
    this.activityLogs = this.activityLogs.filter(l => !isTest(l.action));
    removedCount += prevLogsCount - this.activityLogs.length;

    setStored('posts', this.posts);
    setStored('trash', this.trash);
    setStored('ppdb', this.ppdbList);
    setStored('media', this.mediaList);
    setStored('guestbook', this.guestbook);
    setStored('activity_logs', this.activityLogs);

    this.logActivity(`Pembersihan data audit: ${removedCount} entri TEST-AUDIT dibersihkan`, 'delete');
    this.notify();
    return removedCount;
  }

  // ==========================================
  // PORTAL CARDS & CONTENT CRUD METHODS
  // ==========================================

  // Achievements CRUD
  addAchievement(item: Omit<AchievementItem, 'id'>) {
    const newAch: AchievementItem = { ...item, id: `ach-${Date.now()}` };
    this.achievements = [newAch, ...this.achievements];
    setStored('achievements', this.achievements);
    this.logActivity(`Tambah prestasi santri: ${newAch.title}`, 'create');
    this.notify();
  }

  updateAchievement(item: AchievementItem) {
    this.achievements = this.achievements.map(a => a.id === item.id ? item : a);
    setStored('achievements', this.achievements);
    this.logActivity(`Update prestasi santri: ${item.title}`, 'update');
    this.notify();
  }

  deleteAchievement(id: string) {
    const ach = this.achievements.find(a => a.id === id);
    this.achievements = this.achievements.filter(a => a.id !== id);
    setStored('achievements', this.achievements);
    this.logActivity(`Hapus prestasi santri: ${ach?.title || id}`, 'delete');
    this.notify();
  }

  // Extracurriculars CRUD
  addExtracurricular(item: Omit<ExtracurricularItem, 'id'>) {
    const newEx: ExtracurricularItem = { ...item, id: `ekskul-${Date.now()}` };
    this.extracurriculars = [newEx, ...this.extracurriculars];
    setStored('extracurriculars', this.extracurriculars);
    this.logActivity(`Tambah ekstrakurikuler: ${newEx.name}`, 'create');
    this.notify();
  }

  updateExtracurricular(item: ExtracurricularItem) {
    this.extracurriculars = this.extracurriculars.map(e => e.id === item.id ? item : e);
    setStored('extracurriculars', this.extracurriculars);
    this.logActivity(`Update ekstrakurikuler: ${item.name}`, 'update');
    this.notify();
  }

  deleteExtracurricular(id: string) {
    const ex = this.extracurriculars.find(e => e.id === id);
    this.extracurriculars = this.extracurriculars.filter(e => e.id !== id);
    setStored('extracurriculars', this.extracurriculars);
    this.logActivity(`Hapus ekstrakurikuler: ${ex?.name || id}`, 'delete');
    this.notify();
  }

  // Facilities CRUD
  addFacility(item: Omit<FacilityItem, 'id'>) {
    const newFac: FacilityItem = { ...item, id: `fac-${Date.now()}` };
    this.facilities = [...this.facilities, newFac];
    setStored('facilities', this.facilities);
    this.logActivity(`Tambah fasilitas: ${newFac.title}`, 'create');
    this.notify();
  }

  updateFacility(item: FacilityItem) {
    this.facilities = this.facilities.map(f => f.id === item.id ? item : f);
    setStored('facilities', this.facilities);
    this.logActivity(`Update fasilitas: ${item.title}`, 'update');
    this.notify();
  }

  deleteFacility(id: string) {
    const fac = this.facilities.find(f => f.id === id);
    this.facilities = this.facilities.filter(f => f.id !== id);
    setStored('facilities', this.facilities);
    this.logActivity(`Hapus fasilitas: ${fac?.title || id}`, 'delete');
    this.notify();
  }

  // FAQs CRUD
  addFaq(item: Omit<FAQItem, 'id'>) {
    const newFaq: FAQItem = { ...item, id: `faq-${Date.now()}` };
    this.faqs = [...this.faqs, newFaq];
    setStored('faqs', this.faqs);
    this.logActivity(`Tambah FAQ: ${newFaq.q}`, 'create');
    this.notify();
  }

  updateFaq(item: FAQItem) {
    this.faqs = this.faqs.map(f => f.id === item.id ? item : f);
    setStored('faqs', this.faqs);
    this.logActivity(`Update FAQ: ${item.q}`, 'update');
    this.notify();
  }

  deleteFaq(id: string) {
    const faq = this.faqs.find(f => f.id === id);
    this.faqs = this.faqs.filter(f => f.id !== id);
    setStored('faqs', this.faqs);
    this.logActivity(`Hapus FAQ: ${faq?.q || id}`, 'delete');
    this.notify();
  }

  // About Data Update
  updateAboutData(data: AboutData) {
    this.aboutData = data;
    setStored('about_data', this.aboutData);
    this.logActivity(`Update profil pimpinan & visi-misi`, 'update');
    this.notify();
  }

  // Backup & Restore
  exportAllData(): string {
    return JSON.stringify({
      version: '2.0',
      exportedAt: new Date().toISOString(),
      posts: this.posts,
      slides: this.slides,
      media: this.mediaList,
      achievements: this.achievements,
      extracurriculars: this.extracurriculars,
      facilities: this.facilities,
      faqs: this.faqs,
      aboutData: this.aboutData,
      settings: this.settings
    }, null, 2);
  }

  importAllData(jsonStr: string): boolean {
    try {
      const data = JSON.parse(jsonStr);
      if (Array.isArray(data.posts)) { this.posts = data.posts; setStored('posts', this.posts); }
      if (Array.isArray(data.slides)) { this.slides = data.slides; setStored('slides', this.slides); }
      if (Array.isArray(data.media)) { this.mediaList = data.media; setStored('media', this.mediaList); }
      if (Array.isArray(data.achievements)) { this.achievements = data.achievements; setStored('achievements', this.achievements); }
      if (Array.isArray(data.extracurriculars)) { this.extracurriculars = data.extracurriculars; setStored('extracurriculars', this.extracurriculars); }
      if (Array.isArray(data.facilities)) { this.facilities = data.facilities; setStored('facilities', this.facilities); }
      if (Array.isArray(data.faqs)) { this.faqs = data.faqs; setStored('faqs', this.faqs); }
      if (data.aboutData && typeof data.aboutData === 'object') { this.aboutData = data.aboutData; setStored('about_data', this.aboutData); }
      if (data.settings && typeof data.settings === 'object') { this.settings = data.settings; setStored('settings', this.settings); }
      
      this.logActivity(`Restore data portal dari file backup JSON`, 'upload');
      this.notify();
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  }
}

export const store = new AppStore();
