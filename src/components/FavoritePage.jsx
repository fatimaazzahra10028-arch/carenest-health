import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookmarkSimple, Trash, BookOpen, HeartBreak, ArrowLeft, TrashSimple, Calendar, Clock, Sparkle } from '@phosphor-icons/react';

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
    <div className="min-h-screen pb-20 px-6 max-w-7xl mx-auto bg-bg transition-colors duration-500 font-outfit">
      <header className="pt-10 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ x: -5 }}
            onClick={onBack}
            className="p-3 bg-card rounded-2xl shadow-sm text-text-muted hover:text-primary transition-all border border-border-soft"
          >
            <ArrowLeft size={24} weight="bold" />
          </motion.button>
          <div>
            <h1 className="text-3xl font-kids text-text-main font-bold">
              Simpanan <span className="text-primary">Moms</span>
            </h1>
            <p className="text-text-muted text-sm font-medium">Lanjutkan membaca artikel favorit Moms.</p>
          </div>
        </div>

        {favorites.length > 0 && (
          <button
            onClick={clearAllFavorites}
            className="flex items-center gap-2 bg-red-500/10 text-red-500 px-5 py-2.5 rounded-2xl font-bold text-xs hover:bg-red-500 hover:text-white transition-all border border-red-500/10"
          >
            <TrashSimple size={18} /> Hapus Semua
          </button>
        )}
      </header>

      <AnimatePresence mode="popLayout">
        {favorites.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((article) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-card rounded-[2.5rem] p-5 border border-border-soft shadow-xl group flex flex-col h-full relative"
              >
                {/* Badge Indikator Data Lengkap */}
                <div className="absolute top-8 right-8 z-20 bg-green-500 text-white p-1.5 rounded-full shadow-lg">
                  <Sparkle size={12} weight="fill" />
                </div>

                <div className="aspect-[16/10] rounded-[1.8rem] overflow-hidden mb-5 bg-slate-100 relative">
                  <img 
                    src={article.img || article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black text-primary uppercase tracking-wider shadow-sm">
                    {article.categoryId || article.category}
                  </div>
                </div>

                <div className="flex-1 px-1">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-text-muted mb-3 uppercase">
                    <div className="flex items-center gap-1"><Calendar size={14} className="text-primary" /> {article.date || "Terbaru"}</div>
                    <div className="flex items-center gap-1"><Clock size={14} className="text-primary" /> {article.readTime || "5 mnt"}</div>
                  </div>
                  <h3 className="text-lg font-bold text-text-main line-clamp-2 mb-3 font-kids group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 mt-6">
                  <button 
                    onClick={() => onArticleClick(article)} // Mengirim SELURUH data article
                    className="flex-1 bg-primary text-white py-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95"
                  >
                    <BookOpen size={20} weight="fill" /> Baca Lengkap
                  </button>
                  <button 
                    onClick={() => removeFavorite(article.id)}
                    className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm border border-red-100"
                  >
                    <Trash size={20} weight="bold" />
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
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-32 flex flex-col items-center text-center">
    <div className="w-48 h-48 bg-card rounded-full flex items-center justify-center mb-8 border border-border-soft shadow-2xl relative">
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
        <HeartBreak size={100} weight="duotone" className="text-primary/20" />
      </motion.div>
    </div>
    <h2 className="text-2xl font-kids text-text-main font-bold mb-3">Belum ada simpanan</h2>
    <button onClick={onBack} className="bg-primary text-white px-12 py-4 rounded-2xl font-bold text-sm shadow-xl">Cari Artikel</button>
  </motion.div>
);

export default FavoritePage;