import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, UserPlus, ListChecks, ChatCircleDots, House, SquaresFour, UserCircle, SignOut, BookmarkSimple } from '@phosphor-icons/react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenAuth, onOpenFavorites, onGoHome, isFavoritePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const { user, logout } = useAuth();

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
          ? 'py-3 bg-white/90 backdrop-blur-xl shadow-xl shadow-blue-100/30 border-b md:border border-primary/20 md:rounded-[2rem]' 
          : 'py-5 bg-white/70 backdrop-blur-lg border-b md:border border-white/40 md:rounded-[2rem]'}`}
    >
      {/* Brand - Klik ini juga balik ke Beranda */}
      <div 
        className="flex items-center gap-2 group cursor-pointer" 
        onClick={onGoHome}
      >
        <div className="bg-primary/10 p-2 rounded-xl group-hover:rotate-12 transition-transform">
          <Heart size={28} weight="fill" className="text-primary" />
        </div>
        <span className="font-kids text-2xl text-slate-800 font-bold">Moms<span className="text-primary">Care</span></span>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex gap-8 items-center">
        {/* Tombol Beranda diperbaiki dengan onClick */}
        <button onClick={onGoHome} className="focus:outline-none">
          <NavLink 
            icon={<House size={20} weight="duotone" />} 
            label="Beranda" 
            active={!isFavoritePage} 
          />
        </button>
        
        <NavLink icon={<SquaresFour size={20} weight="duotone" />} label="Kategori" />
        <NavLink icon={<ListChecks size={20} weight="duotone" />} label="Checklist" />
        <NavLink icon={<ChatCircleDots size={20} weight="duotone" />} label="Konsultasi" />
      </div>

      {/* Action Section (Favorite & Auth) */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Ikon Favorite */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onOpenFavorites}
          className={`relative p-2.5 rounded-full transition-all shadow-sm group border
            ${isFavoritePage 
              ? 'bg-primary text-white border-primary' 
              : 'bg-white border-slate-100 text-slate-400 hover:text-primary hover:border-primary/30'}`}
          title="Simpanan Saya"
        >
          <BookmarkSimple size={22} weight={isFavoritePage ? "fill" : "bold"} />
          
          <AnimatePresence>
            {showBadge && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-white shadow-sm"
              ></motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Auth Section */}
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
                className="flex items-center gap-3 bg-white/80 p-1.5 pr-4 rounded-full border border-primary/20 shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  <UserCircle size={24} weight="fill" />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Halo, Moms!</p>
                  <p className="text-xs font-bold text-slate-700 leading-none">{user.name}</p>
                </div>
                <button 
                  onClick={logout}
                  className="ml-2 p-1.5 hover:bg-red-50 rounded-full text-red-400 transition-colors"
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

// NavLink diubah sedikit agar props active bekerja maksimal
const NavLink = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-1.5 text-sm font-bold transition-all hover:text-primary cursor-pointer ${active ? 'text-primary' : 'text-slate-500'}`}>
    {icon} <span>{label}</span>
  </div>
);

export default Navbar;