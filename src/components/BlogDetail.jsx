import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Calendar, User, ShareNetwork, 
  BookmarkSimple, Clock, ChatCircleDots, 
  Quotes, Sparkle 
} from '@phosphor-icons/react';

const BlogDetail = ({ article, onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!article) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pb-20 bg-[#fbfdff]"
    >
      {/* --- 1. HERO SECTION (Ditingkatkan tingginya agar image Jelas) --- */}
      <div className="relative h-[45vh] md:h-[55vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          {article.img.startsWith('http') ? (
            <img 
              src={article.img} 
              alt={article.title} 
              /* Menggunakan h-full object-cover agar gambar mengisi area dengan benar */
              className="w-full h-full object-cover brightness-[0.95]" 
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
               <span className="text-[100px] opacity-10">{article.img}</span>
            </div>
          )}
          {/* Overlay gradasi diperhalus agar tidak menutupi gambar bagian atas */}
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
            {article.categoryId}
          </span>
        </div>
      </div>

      {/* --- 2. MAIN CONTENT (Margin Top dihilangkan agar image terlihat utuh) --- */}
      <div className="max-w-5xl mx-auto px-6 mt-6 relative z-40">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* SISI KIRI: Penulis */}
          <aside className="lg:w-[28%]">
            <div className="lg:sticky lg:top-10 space-y-6">
              <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-900/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                    <User size={24} weight="duotone" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Penulis</p>
                    <p className="text-sm font-bold text-slate-700">{article.author}</p>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                    <Calendar size={16} className="text-primary" /> {article.date}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                    <Clock size={16} className="text-primary" /> 5 Menit Baca
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* SISI KANAN: Konten */}
          <main className="lg:w-[72%]">
            <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl shadow-blue-900/5 border border-slate-50">
              
              <h1 className="text-3xl md:text-5xl font-kids text-slate-800 leading-[1.2] mb-10">
                {article.title}
              </h1>

              {/* Kutipan / Intro */}
              <div className="relative mb-14 p-8 bg-slate-50 rounded-[2rem] border-l-4 border-secondary/30">
                <Quotes size={40} weight="fill" className="text-primary/5 absolute top-4 right-6" />
                <p className="text-slate-600 text-base md:text-lg italic leading-relaxed relative z-10">
                  {article.desc}
                </p>
              </div>

              {/* Langkah Praktis */}
              <div className="space-y-12">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                  <Sparkle size={28} weight="fill" className="text-secondary" />
                  <h3 className="text-2xl font-kids text-slate-800">Langkah Penting</h3>
                </div>

                <div className="grid gap-12">
                  {article.steps && article.steps.map((step, index) => (
                    <div key={index} className="relative group">
                      <span className="absolute -top-10 -left-4 text-8xl font-black text-slate-50 group-hover:text-primary/5 transition-colors select-none -z-10">
                        {index + 1}
                      </span>
                      <div className="relative z-10 pl-2">
                        <p className="text-slate-700 font-medium text-base md:text-xl leading-relaxed">
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <footer className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="flex gap-4">
                  <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-primary transition-all shadow-sm">
                    <BookmarkSimple size={24} weight="bold" />
                  </button>
                  <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-primary transition-all shadow-sm">
                    <ShareNetwork size={24} weight="bold" />
                  </button>
                </div>
                
                <button className="w-full md:w-auto bg-primary text-white px-10 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                  <ChatCircleDots size={24} weight="fill" /> Konsultasi Sekarang
                </button>
              </footer>
            </div>
          </main>

        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetail;