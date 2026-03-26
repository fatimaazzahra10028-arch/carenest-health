import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, UserPlus, Info, PhoneCall, House, 
  UserCircle, SignOut, BookmarkSimple, Moon, Sun 
} from '@phosphor-icons/react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ 
  onOpenAuth, 
  onOpenFavorites, 
  onGoHome, 
  isFavoritePage, 
  onOpenAbout, 
  onOpenContact,
  activePage = 'home'
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const { user, logout } = useAuth();

  // --- LOGIKA DARK MODE ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('momscare_theme') === 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('momscare_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('momscare_theme', 'light');
    }
  }, [isDarkMode]);

  // 1. Logika Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Logika Badge Notifikasi
  useEffect(() => {
    const checkNewFavorites = () => {
      const favs = JSON.parse(localStorage.getItem('momscare_favorites') || '[]');
      const lastCount = parseInt(localStorage.getItem('momscare_fav_count_viewed') || '0');

      if (favs.length > lastCount && !isFavoritePage) {
        setShowBadge(true);
      } else if (isFavoritePage) {
        setShowBadge(false);
        localStorage.setItem('momscare_fav_count_viewed', favs.length.toString());
      } else if (favs.length === 0) {
        setShowBadge(false);
        localStorage.setItem('momscare_fav_count_viewed', '0');
      }
    };

    checkNewFavorites();
    const interval = setInterval(checkNewFavorites, 1000);
    window.addEventListener('storage', checkNewFavorites);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkNewFavorites);
    };
  }, [isFavoritePage]);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 md:top-4 z-[100] transition-all duration-300 mx-0 md:mx-12 flex justify-between items-center px-6
        ${isScrolled 
          ? 'py-3 bg-card/90 backdrop-blur-xl shadow-xl border-b md:border border-primary/20 md:rounded-[2rem]' 
          : 'py-5 bg-card/70 backdrop-blur-lg border-b md:border border-border-soft md:rounded-[2rem]'}`}
    >
      {/* Brand */}
      <div 
        className="flex items-center gap-2 group cursor-pointer" 
        onClick={onGoHome}
      >
        <div className="bg-primary/10 p-2 rounded-xl group-hover:rotate-12 transition-transform">
          <Heart size={28} weight="fill" className="text-primary" />
        </div>
        <span className="font-kids text-2xl text-text-main font-bold">Moms<span className="text-primary">Care</span></span>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex gap-8 items-center">
        <button onClick={onGoHome} className="focus:outline-none">
          <NavLink 
            icon={<House size={20} weight="duotone" />} 
            label="Beranda" 
            active={activePage === 'home' && !isFavoritePage} 
          />
        </button>
        
        <button onClick={onOpenAbout} className="focus:outline-none">
          <NavLink 
            icon={<Info size={20} weight="duotone" />} 
            label="Tentang Kami" 
            active={activePage === 'about'} 
          />
        </button>

        <button onClick={onOpenContact} className="focus:outline-none">
          <NavLink 
            icon={<PhoneCall size={20} weight="duotone" />} 
            label="Kontak" 
            active={activePage === 'contact'} 
          />
        </button>
      </div>

      {/* Action Section */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Tombol Dark Mode */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2.5 rounded-full bg-bg text-text-muted hover:text-primary border border-border-soft transition-all shadow-sm"
          title={isDarkMode ? "Mode Terang" : "Mode Malam"}
        >
          {isDarkMode ? <Sun size={22} weight="fill" className="text-amber-400" /> : <Moon size={22} weight="bold" />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onOpenFavorites}
          className={`relative p-2.5 rounded-full transition-all shadow-sm group border
            ${isFavoritePage 
              ? 'bg-primary text-white border-primary' 
              : 'bg-card border-border-soft text-text-muted hover:text-primary hover:border-primary/30'}`}
          title="Simpanan Saya"
        >
          <BookmarkSimple size={22} weight={isFavoritePage ? "fill" : "bold"} />
          <AnimatePresence>
            {showBadge && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-card shadow-sm"
              ></motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="flex items-center">
          <AnimatePresence mode="wait">
            {!user ? (
              <motion.button 
                key="login-btn"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={onOpenAuth}
                className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md shadow-primary/30 hover:opacity-90 transition-all"
              >
                <UserPlus size={20} weight="bold" />
                <span className="hidden sm:inline">Daftar / Masuk</span>
              </motion.button>
            ) : (
              <motion.div 
                key="user-profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 bg-bg p-1.5 pr-4 rounded-full border border-primary/20 shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  <UserCircle size={24} weight="fill" />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider leading-none mb-1">Halo, Moms!</p>
                  <p className="text-xs font-bold text-text-main leading-none">{user.name}</p>
                </div>
                <button 
                  onClick={logout}
                  className="ml-2 p-1.5 hover:bg-red-500/10 rounded-full text-red-400 transition-colors"
                  title="Keluar"
                >
                  <SignOut size={18} weight="bold" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

const NavLink = ({ icon, label, active = false }) => (
  <div className={`relative flex flex-col items-center gap-1 text-sm font-bold transition-all duration-300 cursor-pointer 
    ${active ? 'text-primary' : 'text-text-muted hover:text-primary'}`}>
    
    <div className="flex items-center gap-1.5">
      {icon} <span>{label}</span>
    </div>

    {active && (
      <motion.div 
        layoutId="activeUnderline"
        className="absolute -bottom-2 h-0.5 bg-primary rounded-full w-full"
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    )}
  </div>
);

export default Navbar;