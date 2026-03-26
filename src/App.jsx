import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Context & Components
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HeroSection from "./components/home/HeroSection";
import AIChatModal from "./components/ai/AiChatModal";
import BackgroundDecor from "./components/layout/BackgroundDecor";
import CategoryBlogSystem from "./components/CategoryBlogSystem";
import BlogDetail from "./components/BlogDetail";
import AuthPage from "./components/AuthPage";
import FavoritePage from "./components/FavoritePage";
import GrowthTracker from "./components/GrowthTracker";
import MPASIPage from "./components/MPASIPage";
import ImmunizationTracker from "./components/ImmunizationTracker";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import FeatureCards from "./components/home/FeatureCards";
import FloatingMascot from "./components/ui/FloatingMascot";

function AppContent() {
  // STATE: Navigasi & UI
  const [activeArticle, setActiveArticle] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showGrowthTracker, setShowGrowthTracker] = useState(false);
  const [showImmunization, setShowImmunization] = useState(false);
  const [showMPASI, setShowMPASI] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allArticles, setAllArticles] = useState([]);
  const { user } = useAuth();

  // --- NEW STATE: AI CHATBOT SYSTEM ---
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatStep, setChatStep] = useState(1);
  const [chatData, setChatData] = useState({
    childName: "",
    age: "",
    symptom: "",
    duration: "",
  });

  // --- STATE DATA ANAK ---
  const [childData, setChildData] = useState({
    name: "",
    age: 0,
    weight: 0,
    height: 0,
  });
  const blogSectionRef = useRef(null);

  // FUNGSI: Logika penentuan string activePage untuk Navbar
  const getActivePage = () => {
    if (showAbout) return "about";
    if (showContact) return "contact";
    return "home";
  };

  // FUNGSI: Kembali ke Beranda (Reset semua state halaman)
  const handleGoHome = () => {
    setActiveArticle(null);
    setShowFavorites(false);
    setShowGrowthTracker(false);
    setShowImmunization(false);
    setShowMPASI(false);
    setShowAbout(false);
    setShowContact(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchTrigger = (e) => {
    if (e) e.preventDefault();
    if (blogSectionRef.current) {
      blogSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleOpenArticle = (article) => {
    setActiveArticle(article);
    setShowFavorites(false);
    setShowGrowthTracker(false);
    setShowImmunization(false);
    setShowAbout(false);
    setShowContact(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveGrowthData = (data) => {
    setChildData(data);
  };

  const handleOpenMPASI = () => {
    handleGoHome(); // Bersihkan halaman lain dulu
    setShowMPASI(true);
  };

  // --- NEW FUNCTIONS: AI SCREENING LOGIC ---
  const startAIScreening = () => {
    setChatStep(1);
    setShowAIChat(true);
  };

  // Auto-advance untuk simulasi "AI Thinking"
  useEffect(() => {
    if (chatStep === 5) {
      const timer = setTimeout(() => setChatStep(6), 2500);
      return () => clearTimeout(timer);
    }
  }, [chatStep]);

  return (
    <div className="min-h-screen bg-[#f0f7ff] relative font-outfit selection:bg-primary/20">
      {/* --- LAYER 0: BACKGROUND ILLUSTRATIONS --- */}
      <BackgroundDecor />
      {/* <CustomCursor /> */}

      {/* --- LAYER 1: NAVIGATION --- */}
      <Navbar
        activePage={getActivePage()}
        onOpenAuth={() => setShowAuth(true)}
        onGoHome={handleGoHome}
        onOpenFavorites={() => {
          setShowFavorites(true);
          setActiveArticle(null);
          setShowGrowthTracker(false);
          setShowImmunization(false);
          setShowAbout(false);
          setShowContact(false);
        }}
        onOpenAbout={() => {
          setShowAbout(true);
          setShowContact(false);
          setActiveArticle(null);
          setShowFavorites(false);
          setShowGrowthTracker(false);
          setShowImmunization(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenContact={() => {
          setShowContact(true);
          setShowAbout(false);
          setActiveArticle(null);
          setShowFavorites(false);
          setShowGrowthTracker(false);
          setShowImmunization(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        isFavoritePage={showFavorites}
      />

      {/* --- LAYER 2: MAIN CONTENT --- */}
      <main className="relative z-10 min-h-screen pt-4 md:pt-10">
        <AnimatePresence mode="wait">
          {showAbout ? (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <AboutPage onBack={handleGoHome} />
            </motion.div>
          ) : showContact ? (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <ContactPage onBack={handleGoHome} />
            </motion.div>
          ) : showFavorites ? (
            <motion.div
              key="favorites-page"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <FavoritePage
                onBack={handleGoHome}
                onArticleClick={handleOpenArticle}
              />
            </motion.div>
          ) : showGrowthTracker ? (
            <motion.div
              key="growth-tracker"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <GrowthTracker
                onBack={handleGoHome}
                onSave={handleSaveGrowthData}
                initialData={childData}
              />
            </motion.div>
          ) : showImmunization ? (
            <motion.div
              key="immunization-tracker"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <ImmunizationTracker
                childData={childData}
                onBack={handleGoHome}
              />
            </motion.div>
          ) : showMPASI ? (
            <motion.div
              key="mpasi-planner"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Pastikan sudah import MPASIPage di atas ya Moms */}
              <MPASIPage onBack={handleGoHome} />
            </motion.div>
          ) : activeArticle ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <BlogDetail
                article={activeArticle}
                onBack={() => setActiveArticle(null)}
                onArticleClick={handleOpenArticle}
                allArticles={allArticles}
                onConsultClick={startAIScreening} // Integrasi tombol konsultasi di detail artikel
              />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {/* --- PERBAIKAN PEMANGGILAN HERO SECTION --- */}
              <HeroSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearchTrigger}
                onStartAI={startAIScreening}
              />

              <div className="relative" ref={blogSectionRef}>
                <CategoryBlogSystem
                  onArticleClick={handleOpenArticle}
                  searchQuery={searchQuery}
                  onArticlesLoaded={(articles) => setAllArticles(articles)}
                />
              </div>
              <FeatureCards
onMPASIClick={handleOpenMPASI}
                onGrowthClick={() => setShowGrowthTracker(true)}
                onImmunizationClick={() => setShowImmunization(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <footer className="py-12 text-center border-t border-white/20">
          <p className="text-xs font-bold text-slate-400 tracking-[0.2em] uppercase">
            © 2026 MomsCare Indonesia • Crafted with Heart
          </p>
        </footer>
      </main>

      {/* --- LAYER 3: AUTH OVERLAY --- */}
      <AnimatePresence>
        {showAuth && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl"
            >
              <AuthPage
                onSuccess={() => setShowAuth(false)}
                onClose={() => setShowAuth(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- LAYER 4: AI POCKET CONSULTANT MODAL (NEW) --- */}
      <AnimatePresence>
        {showAIChat && (
          <AIChatModal
            isOpen={showAIChat}
            onClose={() => setShowAIChat(false)}
            user={user}
          />
        )}
      </AnimatePresence>

      {/* --- MASKOT FLOATING HELP --- */}
      <FloatingMascot startAIScreening={startAIScreening} />

      {/* CSS untuk Scrollbar Custom di Modal */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
