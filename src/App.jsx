import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Context & Components
import { AuthProvider, useAuth } from './context/AuthContext'; 
import Navbar from './components/Navbar';
import CategoryBlogSystem from './components/CategoryBlogSystem';
import BlogDetail from './components/BlogDetail';
import AuthPage from './components/AuthPage';
import FavoritePage from './components/FavoritePage'; 

function AppContent() {
  // STATE: Navigasi & UI
  const [activeArticle, setActiveArticle] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const { user } = useAuth(); 

  // REF: Untuk menandai lokasi bagian blog
  const blogSectionRef = useRef(null);

  // FUNGSI: Scroll ke bagian blog saat cari diklik/enter
  const handleSearchTrigger = (e) => {
    if (e) e.preventDefault();
    if (blogSectionRef.current) {
      blogSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // FUNGSI PUSAT: Buka artikel (Dipakai di Home & Favorite)
  const handleOpenArticle = (article) => {
    setActiveArticle(article);   // Set artikel aktif untuk ditampilkan di BlogDetail
    setShowFavorites(false);      // Pastikan halaman favorite tertutup
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll ke atas otomatis
  };

  return (
    <div className="min-h-screen bg-[#f0f7ff] relative font-outfit selection:bg-primary/20">
      
      {/* --- LAYER 0: BACKGROUND ILLUSTRATIONS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ x: [0, 40, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] opacity-60"
        >
          <svg width="120" height="60" viewBox="0 0 100 40" fill="white">
            <circle cx="20" cy="25" r="15"/><circle cx="45" cy="20" r="20"/><circle cx="75" cy="25" r="15"/>
          </svg>
        </motion.div>

        <motion.div 
          animate={{ x: [0, -30, 0] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-[15%] opacity-40"
        >
          <svg width="150" height="70" viewBox="0 0 100 40" fill="white">
            <circle cx="20" cy="25" r="18"/><circle cx="50" cy="20" r="22"/><circle cx="80" cy="25" r="18"/>
          </svg>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full flex items-end justify-between opacity-30">
          <svg viewBox="0 0 500 200" className="w-[45%] text-blue-200 fill-current mb-[-2px]">
            <path d="M0 200 L250 40 L500 200 Z" />
          </svg>
          <svg viewBox="0 0 500 250" className="w-[55%] text-blue-300 fill-current ml-[-15%] mb-[-2px]">
            <path d="M0 250 L250 20 L500 250 Z" />
          </svg>
          <svg viewBox="0 0 500 200" className="w-[35%] text-blue-100 fill-current mb-[-2px]">
            <path d="M0 200 L250 80 L500 200 Z" />
          </svg>
        </div>
      </div>

      {/* --- LAYER 1: NAVIGATION --- */}
      <Navbar 
        onOpenAuth={() => setShowAuth(true)} 
        onOpenFavorites={() => {
            setShowFavorites(true);
            setActiveArticle(null); 
        }}
        isFavoritePage={showFavorites}
      />

      {/* --- LAYER 2: MAIN CONTENT --- */}
      <main className="relative z-10 min-h-screen pt-4 md:pt-10">
        <AnimatePresence mode="wait">
          
          {/* TAMPILAN 1: HALAMAN FAVORITE */}
          {showFavorites ? (
            <motion.div
              key="favorites-page"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <FavoritePage 
                onBack={() => setShowFavorites(false)} 
                onArticleClick={handleOpenArticle} 
              />
            </motion.div>
          ) : 
          
          /* TAMPILAN 2: DETAIL ARTIKEL */
          activeArticle ? (
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
              />
            </motion.div>
          ) : (
            
            /* TAMPILAN 3: HOME / BERANDA */
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero Section */}
              <section className="pt-16 pb-12 px-6 text-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-4xl mx-auto"
                >
                  <h1 className="text-4xl md:text-6xl text-slate-800 font-bold leading-[1.1] mb-6 font-kids">
                    MomsCare: Teman Setia <br/> 
                    <span className="text-primary italic">Ibu Rawat Si Kecil.</span>
                  </h1>
                  <p className="text-lg text-slate-500 mb-10 font-medium max-w-2xl mx-auto">
                    Informasi kesehatan akurat untuk setiap langkah pertumbuhan buah hati. <br className="hidden md:block"/>
                    <span className="text-primary font-bold italic">"Tumbuh Hebat Bersama Ibu"</span>
                  </p>

                  <form 
                    onSubmit={handleSearchTrigger}
                    className="relative max-w-lg mx-auto group"
                  >
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)} 
                      placeholder="Cari: Imunisasi, MPASI, Gizi..."
                      className="w-full px-8 py-4 rounded-full border-2 border-white/50 bg-white/60 backdrop-blur-md focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium shadow-xl group-hover:shadow-2xl"
                    />
                    <button 
                      type="submit"
                      className="absolute right-2 top-2 bg-primary p-2.5 rounded-full text-white px-7 font-bold text-sm hover:brightness-110 transition-all shadow-lg active:scale-95"
                    >
                      Cari
                    </button>
                  </form>
                </motion.div>
              </section>

              <div className="relative" ref={blogSectionRef}>
                <CategoryBlogSystem 
                  onArticleClick={handleOpenArticle} 
                  searchQuery={searchQuery} 
                />
              </div>

              <section className="px-6 md:px-20 py-24 grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                <motion.div 
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white/40 backdrop-blur-md p-10 rounded-[3rem] border-2 border-white flex items-center justify-between group cursor-pointer shadow-xl shadow-blue-900/5 transition-all"
                >
                  <div className="max-w-[70%]">
                    <h3 className="text-2xl text-slate-800 font-bold mb-2 font-kids">Cek Grafik Pertumbuhan</h3>
                    <p className="text-slate-500 text-sm font-medium">Pantau berat & tinggi badan ideal si kecil sesuai standar WHO.</p>
                  </div>
                  <div className="text-6xl group-hover:scale-110 transition-transform">📊</div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white/40 backdrop-blur-md p-10 rounded-[3rem] border-2 border-white flex items-center justify-between group cursor-pointer shadow-xl shadow-green-900/5 transition-all"
                >
                  <div className="max-w-[70%]">
                    <h3 className="text-2xl text-slate-800 font-bold mb-2 font-kids">Reminder Imunisasi</h3>
                    <p className="text-slate-500 text-sm font-medium">Jangan lewatkan jadwal vaksin. Kami ingatkan tepat waktu!</p>
                  </div>
                  <div className="text-6xl group-hover:rotate-12 transition-transform">🗓️</div>
                </motion.div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="py-12 text-center border-t border-white/20">
          <p className="text-xs font-bold text-slate-400 tracking-[0.2em] uppercase">© 2026 MomsCare Indonesia • Crafted with Heart</p>
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
                <button 
                 onClick={() => setShowAuth(false)}
                 className="absolute top-8 right-12 z-[210] bg-white/10 hover:bg-white/20 p-2 rounded-full text-slate-500 hover:text-slate-800 transition-all font-bold backdrop-blur-md"
                >
                  ✕
                </button>
                <AuthPage onSuccess={() => setShowAuth(false)} />
              </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MASKOT FLOATING HELP --- */}
      <motion.div 
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="fixed bottom-8 right-8 w-20 h-20 hidden lg:block cursor-help z-50 group"
      >
        <div className="relative">
          <img 
            src="https://api.dicebear.com/7.x/bottts/svg?seed=Panda&backgroundColor=7DA2C3" 
            alt="Mascot" 
            className="w-full h-full bg-white rounded-3xl p-2 border-4 border-white shadow-2xl transition-transform group-hover:scale-110" 
          />
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="absolute -top-14 -left-32 bg-white px-5 py-3 rounded-2xl rounded-br-none text-[13px] font-bold shadow-2xl border border-slate-50 whitespace-nowrap text-slate-700 pointer-events-none"
          >
            Halo Moms {user ? user.name : ''}! 👋
            <div className="absolute bottom-[-8px] right-0 w-4 h-4 bg-white rotate-45 border-r border-b border-slate-50"></div>
          </motion.div>
        </div>
      </motion.div>
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