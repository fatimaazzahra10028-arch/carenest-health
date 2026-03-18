import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Calendar, User, ShareNetwork, 
  BookmarkSimple, Clock, ChatCircleDots, 
  Quotes, Sparkle, CheckCircle, CaretRight
} from '@phosphor-icons/react';

const BlogDetail = ({ article, onBack, allArticles = [] }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // 1. Cek apakah artikel sudah ada di favorite saat halaman dibuka
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (article) {
      const favorites = JSON.parse(localStorage.getItem('momscare_favorites') || '[]');
      const exist = favorites.some(fav => fav.id === article.id);
      setIsSaved(exist);
    }
  }, [article]);

  // 2. Fungsi Tambah/Hapus Favorite
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('momscare_favorites') || '[]');
    
    if (isSaved) {
      const updated = favorites.filter(fav => fav.id !== article.id);
      localStorage.setItem('momscare_favorites', JSON.stringify(updated));
      setIsSaved(false);
    } else {
      const newFavorite = {
        id: article.id,
        title: article.title,
        image: article.img || article.image, 
        category: article.categoryId || article.category,
        excerpt: article.desc || article.excerpt,
        author: article.author,
        date: article.date
      };
      favorites.push(newFavorite);
      localStorage.setItem('momscare_favorites', JSON.stringify(favorites));
      setIsSaved(true);
      
      setToastMessage("Berhasil disimpan ke Favorite!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  // 3. FUNGSI SHARE (Logika Utama)
  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: article.desc || article.excerpt,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        // Munculkan menu share native HP
        await navigator.share(shareData);
      } else {
        // Fallback: Copy Link untuk Laptop/Desktop
        await navigator.clipboard.writeText(window.location.href);
        setToastMessage("Link berhasil disalin ke papan klip!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    } catch (err) {
      console.log("Error sharing:", err);
    }
  };

  if (!article) return null;

  // Filter Artikel Terkait (Mencari kategori yang sama, maksimal 2 artikel)
  const relatedArticles = allArticles
    .filter(item => (item.categoryId === article.categoryId || item.category === article.category) && item.id !== article.id)
    .slice(0, 2);

  const displayImage = article.img || article.image || "";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pb-20 bg-[#fbfdff] relative"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-slate-800 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-bold whitespace-nowrap"
          >
            <CheckCircle size={20} weight="fill" className="text-secondary" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 1. HERO SECTION --- */}
      <div className="relative h-[45vh] md:h-[55vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          {displayImage && typeof displayImage === 'string' && displayImage.startsWith('http') ? (
            <img 
              src={displayImage} 
              alt={article.title} 
              className="w-full h-full object-cover brightness-[0.95]" 
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
               <span className="text-[100px] opacity-10">{displayImage || "🍼"}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#fbfdff] via-transparent to-transparent opacity-60" />
        </div>

        {/* Navigasi Atas */}
        <div className="relative z-30 max-w-5xl mx-auto px-6 pt-8 flex justify-between items-center">
          <motion.button 
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg text-primary font-bold border border-white"
          >
            <ArrowLeft size={18} weight="bold" />
            <span className="font-kids text-xs">Kembali</span>
          </motion.button>
          
          <span className="bg-black/20 backdrop-blur-md text-white border border-white/30 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest">
            {article.categoryId || article.category}
          </span>
        </div>
      </div>

      {/* --- 2. MAIN CONTENT AREA --- */}
      <div className="max-w-5xl mx-auto px-6 mt-6 relative z-40">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* SISI KIRI: Penulis & Metadata */}
          <aside className="lg:w-[28%]">
            <div className="lg:sticky lg:top-10 space-y-6">
              <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-900/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                    <User size={24} weight="duotone" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Penulis</p>
                    <p className="text-sm font-bold text-slate-700">{article.author || "Tim MomsCare"}</p>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                    <Calendar size={16} className="text-primary" /> {article.date || "Baru saja"}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                    <Clock size={16} className="text-primary" /> 5 Menit Baca
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* SISI KANAN: Konten Artikel Utama */}
          <main className="lg:w-[72%]">
            <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl shadow-blue-900/5 border border-slate-50">
              
              <h1 className="text-3xl md:text-5xl font-kids text-slate-800 leading-[1.2] mb-10">
                {article.title}
              </h1>

              {/* Kutipan Deskripsi */}
              <div className="relative mb-14 p-8 bg-slate-50 rounded-[2rem] border-l-4 border-secondary/30">
                <Quotes size={40} weight="fill" className="text-primary/5 absolute top-4 right-6" />
                <p className="text-slate-600 text-base md:text-lg italic leading-relaxed relative z-10">
                  {article.desc || article.excerpt}
                </p>
              </div>

              {/* Langkah Praktis */}
              <div className="space-y-12">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                  <span className="p-2 bg-secondary/10 rounded-lg text-secondary">
                    <Sparkle size={24} weight="fill" />
                  </span>
                  <h3 className="text-2xl font-kids text-slate-800">Langkah Penting</h3>
                </div>

                <div className="grid gap-12">
                  {(article.steps || ["Langkah-langkah detail sedang dimuat..."]).map((step, index) => (
                    <div key={index} className="relative group">
                      <span className="absolute -top-10 -left-4 text-8xl font-black text-slate-50 group-hover:text-primary/5 transition-colors select-none -z-10">
                        {index + 1}
                      </span>
                      <div className="relative z-10 pl-2 flex gap-5 items-start">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold text-sm shadow-lg shadow-primary/20 mt-1">
                          {index + 1}
                        </div>
                        <p className="text-slate-700 font-medium text-base md:text-xl leading-relaxed">
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Artikel: Bookmark & Share */}
              <footer className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="flex gap-4">
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleFavorite}
                    className={`p-4 rounded-2xl transition-all shadow-sm flex items-center gap-2 font-bold text-xs
                      ${isSaved 
                        ? 'bg-primary text-white shadow-primary/20' 
                        : 'bg-slate-50 text-slate-400 hover:text-primary'}`}
                  >
                    <BookmarkSimple size={24} weight={isSaved ? "fill" : "bold"} />
                    {isSaved ? "Tersimpan" : "Simpan"}
                  </motion.button>
                  
                  {/* ICON SHARE DENGAN LOGIKA */}
                  <button 
                    onClick={handleShare}
                    className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-primary transition-all shadow-sm active:scale-90"
                  >
                    <ShareNetwork size={24} weight="bold" />
                  </button>
                </div>
                
                <button className="w-full md:w-auto bg-primary text-white px-10 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 font-outfit">
                  <ChatCircleDots size={24} weight="fill" /> Konsultasi Sekarang
                </button>
              </footer>
            </div>

            {/* --- 3. RELATED ARTICLES SECTION --- */}
            {relatedArticles.length > 0 && (
              <div className="mt-16">
                <div className="flex items-center justify-between mb-8 px-4">
                  <h3 className="text-2xl font-kids text-slate-800">Mungkin Moms Suka</h3>
                  <div className="h-1 flex-1 bg-slate-100 mx-6 rounded-full opacity-50" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedArticles.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -5 }}
                      className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-xl shadow-blue-900/5 group cursor-pointer"
                    >
                      <div className="aspect-[16/10] rounded-[1.5rem] overflow-hidden mb-4 relative">
                        <img 
                          src={item.img || item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[9px] font-black text-primary uppercase tracking-wider">
                          {item.categoryId || item.category}
                        </div>
                      </div>
                      <h4 className="font-bold text-slate-800 line-clamp-2 mb-3 px-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <div className="flex items-center justify-between px-1 text-slate-400 text-[10px] font-bold">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {item.date}</span>
                        <span className="text-primary flex items-center gap-1 font-black uppercase tracking-tighter">
                          Baca <CaretRight weight="bold" />
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetail;