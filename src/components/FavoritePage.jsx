import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookmarkSimple, Trash, BookOpen, HeartBreak, 
  ArrowLeft, TrashSimple, Calendar, Clock, 
  Sparkle, ShootingStar, Bookmark
} from '@phosphor-icons/react';

const FavoritePage = ({ onBack, onArticleClick }) => {
  const [favorites, setFavorites] = useState([]);

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

  const clearAllFavorites = () => {
    if (window.confirm("Apakah Moms yakin ingin menghapus semua artikel simpanan?")) {
      setFavorites([]);
      localStorage.setItem('momscare_favorites', JSON.stringify([]));
    }
  };

  return (
    <div className="min-h-screen pb-24 px-4 md:px-8 max-w-7xl mx-auto bg-bg transition-colors duration-500 font-outfit">
      {/* Header Premium */}
      <header className="pt-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border-soft mb-12">
        <div className="flex flex-col gap-6">
          <motion.button 
            whileHover={{ x: -8 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="w-fit flex items-center gap-2 text-text-muted hover:text-primary font-bold text-sm transition-all group"
          >
            <div className="p-2.5 bg-card rounded-xl shadow-sm border border-border-soft group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowLeft size={20} weight="bold" />
            </div>
            Kembali
          </motion.button>
          
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Bookmark size={24} weight="fill" />
              </div>
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Koleksi Pribadi</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-kids text-text-main font-bold">
              Simpanan <span className="text-primary">Moms</span>
            </h1>
          </div>
        </div>

        {favorites.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={clearAllFavorites}
            className="flex items-center gap-2 text-red-500 px-6 py-3.5 rounded-2xl font-bold text-xs hover:bg-red-50 transition-all border border-red-100 bg-white shadow-sm"
          >
            <TrashSimple size={18} weight="bold" /> Bersihkan Koleksi
          </motion.button>
        )}
      </header>

      <AnimatePresence mode="popLayout">
        {favorites.length > 0 ? (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            {favorites.map((article, index) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="group relative flex flex-col"
              >
                {/* Image Container with Floating Badge */}
                <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-6 shadow-2xl shadow-primary/5 border border-border-soft">
                  <img 
                    src={article.img || article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating Action Button - Quick Delete */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeFavorite(article.id); }}
                    className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md text-red-500 rounded-full shadow-xl opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-red-500 hover:text-white"
                  >
                    <Trash size={18} weight="fill" />
                  </button>

                  <div className="absolute bottom-4 left-4 bg-primary/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-wider">
                    {article.categoryId || article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 px-2">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-text-muted mb-3 uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-primary" weight="duotone" /> 
                      {article.date || "Terbaru"}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-primary" weight="duotone" /> 
                      {article.readTime || "5 mnt"}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-text-main line-clamp-2 mb-4 font-kids leading-snug group-hover:text-primary transition-colors cursor-pointer" onClick={() => onArticleClick(article)}>
                    {article.title}
                  </h3>
                </div>

                {/* Bottom Action */}
                <div className="px-2 mt-2">
                  <button 
                    onClick={() => onArticleClick(article)}
                    className="w-full group/btn relative overflow-hidden bg-card border border-border-soft py-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 hover:border-primary transition-all active:scale-95"
                  >
                    <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10 group-hover/btn:text-white flex items-center gap-2 transition-colors">
                      BACA SEKARANG <BookOpen size={18} weight="fill" />
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
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    className="py-32 flex flex-col items-center text-center max-w-md mx-auto"
  >
    <div className="relative mb-10">
      <div className="w-48 h-48 bg-card rounded-[3rem] rotate-12 absolute inset-0 border border-border-soft" />
      <div className="w-48 h-48 bg-primary/5 rounded-[3rem] -rotate-6 absolute inset-0" />
      <div className="w-48 h-48 bg-card rounded-[3rem] flex items-center justify-center border border-border-soft shadow-xl relative z-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }} 
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <ShootingStar size={80} weight="duotone" className="text-primary/30" />
        </motion.div>
      </div>
    </div>
    
    <h2 className="text-3xl font-kids text-text-main font-bold mb-4">Koleksi Masih Kosong</h2>
    <p className="text-text-muted mb-10 leading-relaxed font-medium">
      Moms belum menyimpan artikel apapun. Yuk, jelajahi ribuan tips menarik untuk si kecil!
    </p>
    
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onBack} 
      className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 tracking-widest uppercase"
    >
      Mulai Menjelajah
    </motion.button>
  </motion.div>
);

export default FavoritePage;