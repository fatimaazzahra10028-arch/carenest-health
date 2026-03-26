import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash, BookOpen, ArrowLeft, TrashSimple, 
  Calendar, Clock, Bookmark, ShootingStar, WarningCircle
} from '@phosphor-icons/react';

const FavoritePage = ({ onBack, onArticleClick }) => {
  const [favorites, setFavorites] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('momscare_favorites');
      const parsed = saved ? JSON.parse(saved) : [];
      setFavorites(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
      setFavorites([]);
    }
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter(item => item.id !== id);
    setFavorites(updated);
    localStorage.setItem('momscare_favorites', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setFavorites([]);
    localStorage.setItem('momscare_favorites', JSON.stringify([]));
    setIsConfirmOpen(false);
  };

  return (
    <div className="min-h-screen pb-20 px-6 max-w-7xl mx-auto bg-transparent font-outfit transition-colors duration-500">
      
      {/* Custom Confirmation Modal */}
      <AnimatePresence>
        {isConfirmOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsConfirmOpen(false)}
              className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center border border-slate-100 dark:border-slate-700"
            >
              <div className="w-20 h-20 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                <WarningCircle size={48} weight="duotone" />
              </div>
              <h3 className="text-2xl font-kids font-bold text-slate-800 dark:text-slate-100 mb-2">Hapus Semua?</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">
                Semua artikel favorit Moms akan terhapus secara permanen dari koleksi ini.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsConfirmOpen(false)}
                  className="flex-1 py-3.5 rounded-2xl font-bold text-xs text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                >
                  Batal
                </button>
                <button 
                  onClick={handleClearAll}
                  className="flex-1 py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold text-xs shadow-lg shadow-red-500/20 transition-all"
                >
                  Ya, Hapus
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <header className="pt-12 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 mb-10">
        <div className="flex flex-col gap-4">
          <motion.button 
            whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="w-fit flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary font-bold text-sm transition-all group"
          >
            <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowLeft size={20} weight="bold" />
            </div>
            Kembali
          </motion.button>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Bookmark size={18} weight="fill" className="text-primary" />
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">Koleksi Favorit</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-kids text-slate-800 dark:text-white font-bold leading-tight">
              Simpanan <span className="text-primary italic">Moms</span>
            </h1>
          </div>
        </div>

        {favorites.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => setIsConfirmOpen(true)}
            className="flex items-center gap-2 text-red-500 px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-red-50 dark:hover:bg-red-500/10 transition-all border border-red-100 dark:border-red-500/20 bg-white dark:bg-slate-800 shadow-sm"
          >
            <TrashSimple size={18} weight="bold" /> Kosongkan Koleksi
          </motion.button>
        )}
      </header>

      {/* Grid Content */}
      <AnimatePresence mode="popLayout">
        {favorites.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((article, index) => (
              <motion.div
                key={article.id} layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white dark:bg-slate-800 rounded-[2.2rem] border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-500"
              >
                {/* Image Section */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={article.img || article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Remove Button Overlay */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeFavorite(article.id); }}
                    className="absolute top-4 right-4 p-2.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-red-500 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-red-500 hover:text-white"
                  >
                    <Trash size={18} weight="fill" />
                  </button>

                  <div className="absolute bottom-4 left-4 bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-black text-white uppercase tracking-wider">
                    {article.categoryId || article.category}
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-7 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-primary" /> 
                      {article.date || "Terbaru"}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-primary" /> 
                      {article.readTime || "5 mnt"}
                    </div>
                  </div>

                  <h3 
                    className="text-lg font-bold text-slate-800 dark:text-slate-100 line-clamp-2 mb-8 font-kids leading-snug group-hover:text-primary transition-colors cursor-pointer"
                    onClick={() => onArticleClick(article)}
                  >
                    {article.title}
                  </h3>

                  {/* Button Read More */}
                  <button 
                    onClick={() => onArticleClick(article)}
                    className="mt-auto relative w-full group/btn overflow-hidden bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 py-4 rounded-2xl text-[11px] font-black transition-all active:scale-95"
                  >
                    <div className="absolute inset-0 bg-primary translate-y-[102%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="relative z-10 flex items-center justify-center gap-2 text-primary dark:text-primary-light group-hover/btn:text-white transition-colors duration-300">
                      BACA LENGKAP <BookOpen size={18} weight="fill" />
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyState onBack={onBack} />
        )}
      </AnimatePresence>
    </div>
  );
};

const EmptyState = ({ onBack }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-24 flex flex-col items-center text-center max-w-sm mx-auto">
    <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center border border-slate-100 dark:border-slate-700 shadow-xl mb-8 rotate-6 transition-colors duration-500">
      <ShootingStar size={60} weight="duotone" className="text-primary/30 dark:text-primary/20" />
    </div>
    <h2 className="text-2xl font-kids text-slate-800 dark:text-white font-bold mb-3">Belum Ada Simpanan</h2>
    <p className="text-sm text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">
      Kumpulkan tips kesehatan dan parenting yang Moms sukai di sini untuk dibaca nanti.
    </p>
    <button 
      onClick={onBack} 
      className="bg-primary text-white px-10 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
    >
      Mulai Cari Artikel
    </button>
  </motion.div>
);

export default FavoritePage;