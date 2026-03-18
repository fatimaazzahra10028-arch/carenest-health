import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookmarkSimple, Trash, BookOpen, HeartBreak, ArrowLeft, TrashSimple } from '@phosphor-icons/react';

const FavoritePage = ({ onBack, onArticleClick }) => {
  const [favorites, setFavorites] = useState([]);

  // Ambil data dari LocalStorage saat komponen dimuat
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('momscare_favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  // Fungsi Hapus Satu Artikel
  const removeFavorite = (id) => {
    const updated = favorites.filter(item => item.id !== id);
    setFavorites(updated);
    localStorage.setItem('momscare_favorites', JSON.stringify(updated));
  };

  // Fungsi Hapus Semua Artikel (Clear All)
  const clearAllFavorites = () => {
    if (window.confirm("Apakah Moms yakin ingin menghapus semua artikel simpanan?")) {
      setFavorites([]);
      localStorage.setItem('momscare_favorites', JSON.stringify([]));
      // Reset juga counter view di Navbar agar sinkron
      localStorage.setItem('momscare_fav_count_viewed', '0');
    }
  };

  return (
    <div className="min-h-screen pb-20 px-6 max-w-7xl mx-auto">
      {/* Header Halaman */}
      <header className="pt-10 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-3 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-primary transition-colors border border-slate-50"
          >
            <ArrowLeft size={24} weight="bold" />
          </motion.button>
          <div>
            <h1 className="text-3xl font-kids text-slate-800 font-bold">Simpanan <span className="text-primary">Moms</span></h1>
            <p className="text-slate-500 text-sm font-medium">Artikel yang Moms sukai ada di sini.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Badge Jumlah */}
          <div className="flex items-center gap-2 bg-primary/10 px-5 py-2.5 rounded-2xl text-primary font-bold text-xs border border-primary/10">
            <BookmarkSimple size={18} weight="fill" />
            {favorites.length} Artikel
          </div>

          {/* Tombol Clear All - Hanya muncul jika ada isi */}
          {favorites.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearAllFavorites}
              className="flex items-center gap-2 bg-red-50 text-red-500 px-5 py-2.5 rounded-2xl font-bold text-xs hover:bg-red-500 hover:text-white transition-all border border-red-100"
            >
              <TrashSimple size={18} weight="bold" />
              Hapus Semua
            </motion.button>
          )}
        </div>
      </header>

      {/* Konten Utama */}
      <AnimatePresence mode="popLayout">
        {favorites.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {favorites.map((article) => (
              <motion.div
                key={article.id}
                layout
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                whileHover={{ y: -8 }}
                className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-5 border-2 border-white shadow-xl shadow-blue-900/5 group relative flex flex-col h-full"
              >
                {/* Thumbnail */}
                <div className="aspect-video rounded-[1.8rem] overflow-hidden mb-4 bg-slate-100 relative">
                  <img 
                    src={article.image || `https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=400`} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase shadow-sm">
                    {article.category}
                  </div>
                </div>

                {/* Info Artikel */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800 line-clamp-2 mb-2 leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-xs line-clamp-2 mb-6 font-medium leading-relaxed">
                    {article.excerpt || "Klik baca sekarang untuk melihat informasi lengkap kesehatan si kecil..."}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-auto">
                  <button 
                    onClick={() => onArticleClick(article)}
                    className="flex-1 bg-primary text-white py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 hover:brightness-105 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
                  >
                    <BookOpen size={18} weight="bold" />
                    Baca Sekarang
                  </button>
                  <button 
                    onClick={() => removeFavorite(article.id)}
                    className="p-3.5 bg-white text-red-400 border border-red-50 rounded-2xl hover:bg-red-50 transition-colors shadow-sm"
                    title="Hapus"
                  >
                    <Trash size={18} weight="bold" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Tampilan Jika Kosong */
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-32 flex flex-col items-center text-center"
          >
            <div className="w-44 h-44 bg-white/50 rounded-full flex items-center justify-center mb-8 border-4 border-white shadow-xl relative">
               <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
               >
                 <HeartBreak size={85} weight="duotone" className="text-slate-300" />
               </motion.div>
               <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md text-primary">
                 <BookmarkSimple size={24} weight="bold" />
               </div>
            </div>
            <h2 className="text-2xl font-kids text-slate-800 font-bold mb-3">Belum ada favorit nih, Moms.</h2>
            <p className="text-slate-400 text-sm max-w-xs mb-10 font-medium">Jelajahi artikel kesehatan dan klik ikon simpan untuk membacanya nanti.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="bg-primary text-white px-10 py-4 rounded-full font-bold text-sm shadow-xl shadow-primary/20 hover:brightness-110 transition-all"
            >
              Mulai Eksplorasi Sekarang
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FavoritePage;