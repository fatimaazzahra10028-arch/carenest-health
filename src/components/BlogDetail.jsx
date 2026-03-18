import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, ShareNetwork, BookmarkSimple, Clock, ChatCircleDots, CheckCircle } from '@phosphor-icons/react';

const BlogDetail = ({ article, onBack }) => {
  // Otomatis scroll ke atas saat detail dibuka
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="max-w-4xl mx-auto px-6 py-10 relative z-20"
    >
      {/* Tombol Kembali */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-primary font-bold mb-8 group"
      >
        <div className="bg-white p-2 rounded-full shadow-md group-hover:bg-primary group-hover:text-white transition-all">
          <ArrowLeft size={20} weight="bold" />
        </div>
        <span className="font-kids text-slate-600 group-hover:text-primary transition-colors">Kembali</span>
      </button>

      {/* Konten Utama */}
      <div className="bg-white/70 backdrop-blur-md rounded-[3rem] p-6 md:p-12 border border-white shadow-xl">
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              {article.categoryId}
            </span>
            <div className="flex items-center gap-4 text-slate-400 text-xs font-bold">
              <span className="flex items-center gap-1"><Calendar size={16} /> {article.date}</span>
              <span className="flex items-center gap-1"><User size={16} /> {article.author}</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-kids text-slate-800 leading-tight mb-8">
            {article.title}
          </h1>

          <div className="w-full h-64 md:h-[400px] bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-inner flex items-center justify-center relative border-4 border-white">
            {article.img.startsWith('http') ? (
              <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
            ) : (
              <div className="bg-gradient-to-br from-primary/5 to-secondary/10 w-full h-full flex items-center justify-center">
                <span className="text-[120px] drop-shadow-lg">{article.img}</span>
              </div>
            )}
          </div>
        </header>

        {/* BAGIAN DESKRIPSI & LANGKAH PRAKTIS */}
        <article className="prose prose-blue max-w-none text-slate-600 font-medium leading-relaxed">
          {/* Deskripsi Artikel */}
          <div className="text-lg mb-8 leading-relaxed italic border-l-4 border-primary/20 pl-6 text-slate-600 bg-primary/5 py-4 rounded-r-2xl">
            {article.desc}
          </div>

          <h3 className="text-2xl font-kids text-slate-800 mt-10 mb-6 flex items-center gap-2">
            <span className="bg-secondary/20 p-2 rounded-xl text-secondary">
              <Clock size={24} weight="duotone" />
            </span>
            Langkah Praktis untuk Moms
          </h3>

          {/* List Langkah Praktis dari Data Article */}
          <div className="grid gap-4">
            {article.steps && article.steps.map((step, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={index} 
                className="flex items-start gap-4 bg-white/50 p-4 rounded-2xl border border-white hover:border-primary/20 transition-colors"
              >
                <div className="bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-bold text-sm shadow-md shadow-primary/20">
                  {index + 1}
                </div>
                <p className="text-slate-700 font-semibold">{step}</p>
              </motion.div>
            ))}
          </div>
        </article>

        {/* Action Buttons */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-slate-100 px-6 py-3 rounded-2xl font-bold text-slate-600 hover:bg-primary/10 hover:text-primary transition-all active:scale-95">
              <ShareNetwork size={20} /> Share
            </button>
            <button className="flex items-center gap-2 bg-slate-100 px-6 py-3 rounded-2xl font-bold text-slate-600 hover:bg-primary/10 hover:text-primary transition-all active:scale-95">
              <BookmarkSimple size={20} /> Simpan
            </button>
          </div>
          <button className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2 active:scale-95">
            <ChatCircleDots size={22} weight="bold" /> Konsultasi Ahli
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetail;