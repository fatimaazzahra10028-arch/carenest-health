import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HeroSection from "./components/home/HeroSection";
import AIChatModal from "./components/ai/AiChatModal";
import BackgroundDecor from "./components/layout/BackgroundDecor";
import CategoryBlogSystem from "./components/CategoryBlogSystem";
import TopicPage from "./components/pages/TopicPage";
import BlogDetail from "./components/BlogDetail";
import AuthPage from "./components/AuthPage";
import FavoritePage from "./components/FavoritePage";
import GrowthTracker from "./components/GrowthTracker";
import MPASIPage from "./components/MPASIPage";
import ImmunizationTracker from "./components/ImmunizationTracker";
import AboutPage from "./components/AboutPage";
import FAQPage from "./components/FAQPage";
import ContactPage from "./components/ContactPage";
import FeatureCards from "./components/home/FeatureCards";
import FloatingMascot from "./components/ui/FloatingMascot";

function AppContent() {
  // --- STATE: Navigasi & UI ---
  const [activeArticle, setActiveArticle] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showGrowthTracker, setShowGrowthTracker] = useState(false);
  const [showImmunization, setShowImmunization] = useState(false);
  const [showMPASI, setShowMPASI] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showTopicPage, setShowTopicPage] = useState(null);

  const [showFeatured, setShowFeatured] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [allArticles, setAllArticles] = useState([]);
  const { user } = useAuth();

  // --- AI CHATBOT SYSTEM ---
  const [showAIChat, setShowAIChat] = useState(false);

  // --- STATE DATA ANAK ---
  const [childData, setChildData] = useState({
    name: "",
    age: 0,
    weight: 0,
    height: 0,
  });
  const blogSectionRef = useRef(null);

  const getActivePage = () => {
    if (showAbout) return "about";
    if (showContact) return "contact";
    if (showFAQ) return "faq";
    if (showFeatured) return "featured";
    return "home";
  };

  const handleGoHome = () => {
    setActiveArticle(null);
    setShowFavorites(false);
    setShowGrowthTracker(false);
    setShowImmunization(false);
    setShowTopicPage(null);
    setShowMPASI(false);
    setShowAbout(false);
    setShowFAQ(false);
    setShowContact(false);
    setShowFeatured(false);
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
    handleGoHome();
    setActiveArticle(article);
  };

  const startAIScreening = () => {
    setShowAIChat(true);
  };

  return (
    <div className="min-h-screen bg-[#f0f7ff] relative font-outfit selection:bg-primary/20">
      <BackgroundDecor />

      {/* --- LAYER 1: NAVIGATION --- */}
      <Navbar
        activePage={getActivePage()}
        onOpenAuth={() => setShowAuth(true)}
        onGoHome={handleGoHome}
        onOpenFavorites={() => {
          handleGoHome();
          setShowFavorites(true);
        }}
        onOpenAbout={() => {
          handleGoHome();
          setShowAbout(true);
        }}
        onOpenFeatured={() => {
          handleGoHome();
          setShowFeatured(true);
        }}
        onOpenFaq={() => {
          handleGoHome();
          setShowFAQ(true);
        }}
        onOpenContact={() => {
          handleGoHome();
          setShowContact(true);
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
          ) : showFAQ ? (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <FAQPage onBack={handleGoHome} />
            </motion.div>
          ) : showFeatured ? (
            <motion.div
              key="featured-page"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="py-12"
            >
              <div className="text-center mb-4">
                <h1 className="text-4xl font-kids font-bold text-text-main">
                  Fitur <span className="text-primary">Unggulan</span>
                </h1>
                <p className="text-text-muted mt-2">
                  Pilih alat bantu untuk tumbuh kembang si kecil
                </p>
              </div>
              <FeatureCards
                onGrowthClick={() => {
                  handleGoHome();
                  setShowGrowthTracker(true);
                }}
                onImmunizationClick={() => {
                  handleGoHome();
                  setShowImmunization(true);
                }}
                onMPASIClick={() => {
                  handleGoHome();
                  setShowMPASI(true);
                }}
                onCommunityClick={() => setShowAIChat(true)}
              />
              <div className="flex justify-center mt-10">
                <button
                  onClick={handleGoHome}
                  className="text-text-muted hover:text-primary font-bold flex items-center gap-2 transition-all"
                >
                  ← Kembali ke Beranda
                </button>
              </div>
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
              key="fav"
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
              key="growth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <GrowthTracker
                onBack={handleGoHome}
                onSave={(data) => setChildData(data)}
                initialData={childData}
              />
            </motion.div>
          ) : showImmunization ? (
            <motion.div
              key="imm"
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
              key="mpasi"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <MPASIPage onBack={handleGoHome} />
            </motion.div>
          ) : activeArticle ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <BlogDetail
                article={activeArticle}
                onBack={() => setActiveArticle(null)}
                onArticleClick={handleOpenArticle}
                allArticles={allArticles}
                onConsultClick={startAIScreening}
              />
            </motion.div>
          ) : showTopicPage ? (
            <motion.div
              key="topic"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <TopicPage
                categoryId={showTopicPage}
                allArticles={allArticles}
                onBack={handleGoHome}
                onArticleClick={handleOpenArticle}
              />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <HeroSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearchTrigger}
                onStartAI={startAIScreening}
              />
              <div ref={blogSectionRef}>
                <CategoryBlogSystem
                  onArticleClick={handleOpenArticle}
                  searchQuery={searchQuery}
                  onArticlesLoaded={setAllArticles}
                  onViewAll={(id) => setShowTopicPage(id)}
                />
              </div>
              <FeatureCards
                onMPASIClick={() => {
                  handleGoHome();
                  setShowMPASI(true);
                }}
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

      {/* MODALS */}
      <AnimatePresence>
        {showAuth && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
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

      <AnimatePresence>
        {showAIChat && (
          <AIChatModal
            isOpen={showAIChat}
            onClose={() => setShowAIChat(false)}
            user={user}
          />
        )}
      </AnimatePresence>

      <FloatingMascot startAIScreening={startAIScreening} />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
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