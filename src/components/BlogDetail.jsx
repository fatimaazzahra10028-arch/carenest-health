import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Calendar, User, ShareNetwork, 
  BookmarkSimple, Clock, ChatCircleDots, 
  Quotes, Sparkle, CheckCircle, CaretRight
} from '@phosphor-icons/react';

const BlogDetail = ({ article, onBack, allArticles = [], onArticleClick, onConsultClick }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (article) {
      const favorites = JSON.parse(localStorage.getItem('momscare_favorites') || '[]');
      const exist = favorites.some(fav => fav.id === article.id);
      setIsSaved(exist);
    }
  }, [article]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('momscare_favorites') || '[]');
    
    if (isSaved) {
      const updated = favorites.filter(fav => fav.id !== article.id);
      localStorage.setItem('momscare_favorites', JSON.stringify(updated));
      setIsSaved(false);
      setToastMessage("Dihapus dari Favorite");
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
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: article.desc || article.excerpt,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setToastMessage("Link berhasil disalin!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    } catch (err) {
      console.log("Error sharing:", err);
    }
  };

  if (!article) return null;

  const currentCategory = article.categoryId || article.category;
  const relatedArticles = allArticles
    .filter(item => 
      (item.categoryId === currentCategory || item.category === currentCategory) && 
      item.id !== article.id
    )
    .slice(0, 3);

  const displayImage = article.img || article.image || "";

  const renderContent = () => {
    if (article.content && Array.isArray(article.content)) {
      return article.content.map((block, idx) => {
        if (block.type === 'subtitle') return <h3 key={idx} className="text-2xl font-kids text-text-main mt-10 mb-4 transition-colors">{block.text}</h3>;
        return <p key={idx} className="text-text-muted leading-relaxed mb-6 text-lg transition-colors">{block.text}</p>;
      });
    }
    return null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pb-20 bg-bg relative font-outfit transition-colors duration-500"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-10 left-1/2 z-[100] bg-slate-800 dark:bg-primary text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-bold whitespace-nowrap"
          >
            <CheckCircle size={20} weight="fill" className="text-secondary" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 1. HERO SECTION --- */}
      <div className="relative h-[45vh] md:h-[55vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          {displayImage && typeof displayImage === 'string' && (displayImage.startsWith('http') || displayImage.startsWith('/')) ? (
            <img 
              src={displayImage} 
              alt={article.title} 
              className="w-full h-full object-cover brightness-[0.9]" 
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
               <span className="text-[100px] opacity-20">{displayImage || "🍼"}</span>
            </div>
          )}
          {/* Gradient Overlay menyesuaikan warna background dark mode */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent transition-colors duration-500" />
        </div>

        <div className="relative z-30 max-w-6xl mx-auto px-6 pt-8 flex justify-between items-center">
          <motion.button 
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 bg-card/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg text-primary font-bold border border-border-soft transition-all"
          >
            <ArrowLeft size={18} weight="bold" />
            <span className="font-kids text-xs">Kembali</span>
          </motion.button>
          
          <span className="bg-primary text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">
            {currentCategory}
          </span>
        </div>
      </div>

      {/* --- 2. MAIN CONTENT AREA --- */}
      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-40">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* SISI KIRI: Konten Utama */}
          <main className="lg:w-[72%] w-full">
            <div className="bg-card rounded-[3rem] p-8 md:p-14 shadow-2xl shadow-black/5 border border-border-soft transition-all duration-500">
              
              <h1 className="text-3xl md:text-5xl font-kids text-text-main leading-[1.2] mb-10 transition-colors">
                {article.title}
              </h1>

              {/* Kutipan Deskripsi */}
              <div className="relative mb-14 p-8 bg-bg rounded-[2rem] border-l-4 border-secondary/30 transition-colors">
                <Quotes size={40} weight="fill" className="text-primary/10 absolute top-4 right-6" />
                <p className="text-text-muted text-base md:text-lg italic leading-relaxed relative z-10 transition-colors">
                  {article.desc || article.excerpt}
                </p>
              </div>

              {/* Content render */}
              <div className="mb-12">
                {renderContent()}
              </div>

              {/* Langkah Praktis */}
              <div className="space-y-12">
                <div className="flex items-center gap-3 pb-4 border-b border-border-soft transition-colors">
                  <span className="p-2 bg-secondary/10 rounded-lg text-secondary">
                    <Sparkle size={24} weight="fill" />
                  </span>
                  <h3 className="text-2xl font-kids text-text-main transition-colors">Langkah Penting</h3>
                </div>

                <div className="grid gap-12">
                  {(article.steps || ["Langkah-langkah detail sedang dimuat..."]).map((step, index) => (
                    <div key={index} className="relative group">
                      {/* Nomor besar di background dibuat redup saat dark mode */}
                      <span className="absolute -top-10 -left-4 text-8xl font-black text-text-main opacity-[0.03] group-hover:text-primary/10 transition-colors select-none -z-10">
                        {index + 1}
                      </span>
                      <div className="relative z-10 pl-2 flex gap-5 items-start">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold text-sm shadow-lg shadow-primary/20 mt-1">
                          {index + 1}
                        </div>
                        <p className="text-text-main font-medium text-base md:text-xl leading-relaxed transition-colors">
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Artikel */}
              <footer className="mt-20 pt-10 border-t border-border-soft flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="flex gap-4">
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleFavorite}
                    className={`p-4 rounded-2xl transition-all shadow-sm flex items-center gap-2 font-bold text-xs
                      ${isSaved 
                        ? 'bg-primary text-white shadow-primary/20' 
                        : 'bg-bg text-text-muted hover:text-primary'}`}
                  >
                    <BookmarkSimple size={24} weight={isSaved ? "fill" : "bold"} />
                    {isSaved ? "Tersimpan" : "Simpan"}
                  </motion.button>
                  
                  <button 
                    onClick={handleShare}
                    className="p-4 bg-bg rounded-2xl text-text-muted hover:text-primary transition-all shadow-sm active:scale-90"
                  >
                    <ShareNetwork size={24} weight="bold" />
                  </button>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onConsultClick}
                  className="w-full md:w-auto bg-primary text-white px-10 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3"
                >
                  <ChatCircleDots size={24} weight="fill" /> Konsultasi Sekarang
                </motion.button>
              </footer>
            </div>
          </main>

          {/* SISI KANAN: Sidebar Sticky */}
          <aside className="lg:w-[28%] w-full lg:sticky lg:top-10 h-fit space-y-6">
            <div className="bg-card p-6 rounded-[2.5rem] border border-border-soft shadow-xl shadow-black/5 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <User size={24} weight="duotone" />
                </div>
                <div>
                  <p className="text-[10px] text-text-muted font-black uppercase tracking-widest transition-colors">Penulis</p>
                  <p className="text-sm font-bold text-text-main transition-colors">{article.author || "Tim MomsCare"}</p>
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t border-border-soft transition-colors">
                <div className="flex items-center gap-2 text-[11px] font-bold text-text-muted transition-colors">
                  <Calendar size={16} className="text-primary" /> {article.date || "Baru saja"}
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-text-muted transition-colors">
                  <Clock size={16} className="text-primary" /> {article.readTime || "5 Menit Baca"}
                </div>
              </div>
            </div>

            <div className="bg-secondary/5 p-6 rounded-[2.5rem] border border-secondary/10 transition-colors">
              <p className="text-[10px] text-secondary font-black uppercase mb-2 tracking-widest">Tips Hari Ini</p>
              <p className="text-xs text-text-muted leading-relaxed font-medium transition-colors">
                Jangan lupa Moms, setiap anak unik. Tetap semangat memantau tumbuh kembang si kecil dengan sabar dan kasih sayang!
              </p>
            </div>
          </aside>
        </div>

        {/* --- 3. REKOMENDASI ARTIKEL --- */}
        {relatedArticles.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8 px-4">
              <h3 className="text-2xl font-kids text-text-main transition-colors">Lainnya di {currentCategory}</h3>
              <div className="h-1 flex-1 bg-border-soft mx-6 rounded-full opacity-50" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5 }}
                  onClick={() => onArticleClick && onArticleClick(item)}
                  className="bg-card p-4 rounded-[2rem] border border-border-soft shadow-xl shadow-black/5 group cursor-pointer transition-all duration-500"
                >
                  <div className="aspect-[16/10] rounded-[1.5rem] overflow-hidden mb-4 relative">
                    <img 
                      src={item.img || item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[9px] font-black text-primary uppercase tracking-wider">
                      {item.categoryId || item.category}
                    </div>
                  </div>
                  <h4 className="font-bold text-text-main line-clamp-2 mb-3 px-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between px-1 text-text-muted text-[10px] font-bold transition-colors">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {item.date}
                    </span>
                    <span className="text-primary flex items-center gap-1 font-black uppercase tracking-tighter">
                      Baca <CaretRight weight="bold" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BlogDetail;