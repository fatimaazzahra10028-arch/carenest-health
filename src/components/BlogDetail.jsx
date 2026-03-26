import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Calendar, User, ShareNetwork, 
  BookmarkSimple, Clock, ChatCircleDots, 
  Quotes, Sparkle, CheckCircle, CaretRight,
  SpeakerHigh, StopCircle, PlayCircle,
  Newspaper, Lightbulb, Heartbeat,
  ShieldCheck
} from '@phosphor-icons/react';

const BlogDetail = ({ article, onBack, allArticles = [], onArticleClick, onConsultClick }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);

  // 1. Inisialisasi daftar suara (PENTING: Agar suara Indo ketemu)
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (article?.id) {
      try {
        const savedData = localStorage.getItem('momscare_favorites');
        const favorites = savedData ? JSON.parse(savedData) : [];
        if (Array.isArray(favorites)) {
          setIsSaved(favorites.some(fav => fav.id === article.id));
        }
      } catch (e) { console.error(e); }
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [article]);

  // 2. Fungsi Audio yang sudah diperbaiki logatnya
  const handleSpeech = () => {
    if (!article) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const contentText = article.content?.map(c => c.text).join('. ') || "";
    const stepsText = article.steps ? "Langkah-langkah: " + article.steps.join('. ') : "";
    const fullText = `${article.title}. ${article.desc || ""}. ${contentText}. ${stepsText}`;
    
    const utterance = new SpeechSynthesisUtterance(fullText);
    
    // Cari suara Indonesia (ID) yang paling bagus
    const idVoice = voices.find(v => v.lang.startsWith('id') || v.name.includes('Indonesia'));
    
    if (idVoice) {
      utterance.voice = idVoice;
    }
    
    utterance.lang = 'id-ID';
    utterance.rate = 0.95; // Kecepatan sedikit diperlambat agar artikulasi jelas
    utterance.pitch = 1.0; // Nada normal manusia
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const toggleFavorite = () => {
    try {
      const savedData = localStorage.getItem('momscare_favorites');
      let favorites = savedData ? JSON.parse(savedData) : [];
      if (!Array.isArray(favorites)) favorites = [];
      
      if (isSaved) {
        favorites = favorites.filter(fav => fav.id !== article.id);
        setToastMessage("Dihapus dari koleksi");
        setIsSaved(false);
      } else {
        favorites.push({ ...article, savedAt: new Date().toISOString() });
        setToastMessage("Berhasil disimpan!");
        setIsSaved(true);
      }
      localStorage.setItem('momscare_favorites', JSON.stringify(favorites));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (e) { console.error(e); }
  };

  if (!article) return <div className="min-h-screen flex items-center justify-center bg-bg"><Clock size={48} className="animate-spin text-primary opacity-40" /></div>;

  const currentCategory = article.categoryId || article.category;
  const relatedArticles = Array.isArray(allArticles) 
    ? allArticles.filter(item => item && item.id !== article.id && (item.categoryId === currentCategory)).slice(0, 4)
    : [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen pb-20 bg-bg font-outfit">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ opacity: 0, y: 50, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: 20, x: "-50%" }} className="fixed bottom-10 left-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-bold">
            <CheckCircle size={22} weight="fill" className="text-green-400" /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <div className="absolute inset-0 overflow-hidden">
          {article.img ? <img src={article.img} alt={article.title} className="w-full h-full object-cover brightness-90" /> : <div className="w-full h-full bg-slate-200 flex items-center justify-center"><Newspaper size={64} opacity={0.2} /></div>}
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
        </div>
        <div className="relative z-30 max-w-7xl mx-auto px-6 pt-8 flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl text-primary font-bold border border-white/50 hover:scale-105 transition-transform"><ArrowLeft size={20} weight="bold" /> <span className="text-sm">Kembali</span></button>
          <div className="bg-primary/90 backdrop-blur-md text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">{currentCategory}</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-40">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <main className="lg:w-[66%] w-full">
            <div className="bg-white dark:bg-card rounded-[3.5rem] p-8 md:p-14 shadow-2xl shadow-black/5 border border-border-soft">
              <h1 className="text-3xl md:text-5xl font-kids text-text-main leading-tight mb-8">{article.title}</h1>

              {/* AUDIO PLAYER - SEKARANG LEBIH JELAS */}
              <div className="flex items-center gap-5 p-5 bg-primary/5 rounded-[2rem] mb-10 border border-primary/10">
                <button onClick={handleSpeech} className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${isSpeaking ? 'bg-red-500 text-white animate-pulse' : 'bg-primary text-white hover:scale-105 active:scale-95'}`}>
                  {isSpeaking ? <StopCircle size={32} weight="fill" /> : <PlayCircle size={32} weight="fill" />}
                </button>
                <div className="flex-1">
                  <h4 className="text-xs font-black uppercase text-primary tracking-widest mb-1">MomsCare Audio</h4>
                  <p className="text-sm text-text-muted font-medium">{isSpeaking ? "Membacakan dalam Bahasa Indonesia..." : "Dengarkan artikel dengan suara jernih"}</p>
                </div>
                {!isSpeaking && <SpeakerHigh size={24} className="text-primary/30 mr-2" />}
              </div>

              <div className="relative mb-12 p-8 bg-slate-50 dark:bg-bg/40 rounded-3xl italic text-text-muted text-lg leading-relaxed border-l-8 border-primary/20">
                <Quotes size={40} weight="fill" className="text-primary/5 absolute top-4 right-6" />
                {article.desc}
              </div>

              <div className="space-y-6 text-text-muted text-lg leading-relaxed">
                {Array.isArray(article.content) && article.content.map((block, idx) => (
                  block.type === 'subtitle' ? <h2 key={idx} className="text-2xl font-kids text-text-main pt-6 pb-2">{block.text}</h2> : <p key={idx}>{block.text}</p>
                ))}
              </div>

              {article.steps && (
                <div className="mt-14 p-8 md:p-10 bg-secondary/5 rounded-[3rem] border border-secondary/10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-secondary/20 rounded-2xl text-secondary"><Sparkle size={28} weight="fill" /></div>
                    <h3 className="text-2xl font-kids text-text-main">Langkah Penting Moms</h3>
                  </div>
                  <div className="grid gap-6">
                    {article.steps.map((step, i) => (
                      <div key={i} className="flex gap-5 items-start group">
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-card shadow-md flex items-center justify-center shrink-0 text-primary font-black group-hover:bg-primary group-hover:text-white transition-all border border-border-soft">{i + 1}</div>
                        <p className="text-text-main font-semibold pt-1.5 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-16 pt-10 border-t border-border-soft flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-3">
                  <button onClick={toggleFavorite} className={`relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg ${isSaved ? 'bg-primary text-white' : 'bg-slate-100 text-text-muted'}`}>
                    {isSaved && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full border border-primary shadow-[0_0_5px_rgba(74,222,128,0.8)]" />}
                    <BookmarkSimple size={24} weight={isSaved ? "fill" : "bold"} /> {isSaved ? "Tersimpan" : "Simpan"}
                  </button>
                  <button onClick={() => window.print()} className="p-4 bg-slate-100 rounded-2xl text-text-muted hover:text-primary transition-all"><ShareNetwork size={24} /></button>
                </div>
                <button onClick={onConsultClick} className="w-full md:w-auto bg-secondary hover:bg-secondary/90 text-white px-10 py-4 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-3 transition-transform active:scale-95">
                  <ChatCircleDots size={26} weight="fill" /> Konsultasi Sekarang
                </button>
              </div>
            </div>
          </main>

          <aside className="lg:w-[34%] w-full space-y-8 lg:sticky lg:top-10">
            {/* Meta Card */}
            <div className="bg-white dark:bg-card p-8 rounded-[3rem] border border-border-soft shadow-xl shadow-black/5">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border-soft">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"><User size={28} weight="duotone" /></div>
                <div>
                  <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">Ditinjau Oleh</p>
                  <p className="text-base font-bold text-text-main">{article.author || "Tim Ahli MomsCare"}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-bold text-text-muted"><Calendar size={20} className="text-primary" /> {article.date}</div>
                <div className="flex items-center gap-3 text-sm font-bold text-text-muted"><Clock size={20} className="text-primary" /> {article.readTime || "5 Menit Baca"}</div>
                <div className="flex items-center gap-3 text-sm font-bold text-green-500"><ShieldCheck size={20} weight="fill" /> Terverifikasi Medis</div>
              </div>
            </div>

            {/* Topics Card */}
            <div className="space-y-5">
              <h3 className="text-xl font-kids text-text-main flex items-center gap-3 px-2"><Heartbeat size={28} weight="duotone" className="text-red-500" /> Topik Serupa</h3>
              <div className="grid gap-4">
                {relatedArticles.map((item) => (
                  <motion.div key={item.id} whileHover={{ x: 8 }} onClick={() => onArticleClick(item)} className="bg-white dark:bg-card p-3 rounded-3xl border border-border-soft flex gap-4 cursor-pointer group shadow-sm hover:shadow-lg transition-all">
                    <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden shrink-0"><img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /></div>
                    <div className="flex flex-col justify-center py-1">
                      <h4 className="text-sm font-bold text-text-main line-clamp-2 group-hover:text-primary transition-colors mb-2">{item.title}</h4>
                      <div className="flex items-center gap-1 text-primary text-[10px] font-black uppercase">Baca <CaretRight weight="bold" /></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetail;