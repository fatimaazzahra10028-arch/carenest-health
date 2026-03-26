// src/components/CategoryBlogSystem.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'; // Tambah LayoutGroup
import { 
  Clock, 
  ArrowRight, 
  Baby, 
  Stethoscope, 
  Flask, 
  AppleLogo, 
  Brain, 
  FirstAid,
  Article 
} from '@phosphor-icons/react';
import { categories, allArticles } from '../data/blogData';

const CategoryBlogSystem = ({ onArticleClick, searchQuery = "", onArticlesLoaded }) => {
  const [selectedCategory, setSelectedCategory] = useState('neonatal');
  
  useEffect(() => {
    if (onArticlesLoaded && allArticles) {
      onArticlesLoaded(allArticles);
    }
  }, [onArticlesLoaded]);

  const filteredArticles = allArticles.filter(art => {
    const matchesCategory = art.categoryId === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getArticleIcon = (categoryId) => {
    switch (categoryId) {
      case 'neonatal': return <Baby size={32} weight="duotone" className="text-blue-500" />;
      case 'health': return <Stethoscope size={32} weight="duotone" className="text-red-500" />;
      case 'vaccine': return <Flask size={32} weight="duotone" className="text-purple-500" />;
      case 'nutrition': return <AppleLogo size={32} weight="duotone" className="text-green-500" />;
      case 'development': return <Brain size={32} weight="duotone" className="text-yellow-500" />;
      default: return <Article size={32} weight="duotone" className="text-primary" />;
    }
  };

  return (
    <div className="relative z-30 font-outfit"> 
      {/* GRID KATEGORI */}
      <section className="px-6 md:px-20 py-12">
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-6xl mx-auto">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="flex flex-col items-center group cursor-pointer"
            >
              <motion.div
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  ${cat.color} w-20 h-20 md:w-28 md:h-28 rounded-[2.5rem] flex items-center justify-center border-4 transition-all duration-500
                  ${selectedCategory === cat.id 
                    ? 'border-primary scale-105 shadow-xl shadow-primary/20' 
                    : 'border-card shadow-sm hover:shadow-md'}
                `}
              >
                <div className={`${cat.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                  {cat.icon}
                </div>
              </motion.div>
              <div className="mt-4 text-center">
                <h3 className={`font-kids text-sm md:text-base transition-colors ${selectedCategory === cat.id ? 'text-primary font-bold' : 'text-text-main'}`}>
                  {cat.age}
                </h3>
                <p className="text-[9px] md:text-[10px] text-text-muted font-bold uppercase tracking-wider">({cat.range})</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIST ARTIKEL */}
      <section className="px-6 md:px-20 py-16 bg-bg/60 backdrop-blur-xl rounded-t-[3rem] md:rounded-t-[5rem] border-t border-border-soft transition-all duration-700 min-h-[600px]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-kids text-text-main capitalize">
              Topik <span className="text-primary">{selectedCategory}</span>
            </h2>
            <div className="h-[2px] flex-grow mx-6 bg-primary/20 rounded-full hidden md:block" />
          </div>

          {/* LayoutGroup membungkus grid agar transisi posisi antar elemen lancar */}
          <LayoutGroup>
            <motion.div 
              layout 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                    <motion.div
                      key={article.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      onClick={() => onArticleClick && onArticleClick(article)}
                      className="bg-card p-5 rounded-[2rem] shadow-sm flex gap-4 border border-border-soft hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-shadow group cursor-pointer h-full"
                    >
                      <div className="w-20 h-20 bg-bg rounded-2xl flex items-center justify-center shrink-0 overflow-hidden shadow-inner border border-border-soft">
                        {article.img && typeof article.img === 'string' && article.img.startsWith('http') ? (
                          <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="group-hover:scale-110 transition-transform duration-500">
                            {getArticleIcon(article.categoryId)}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-1.5 text-[10px] text-text-muted font-bold mb-1.5 uppercase tracking-tighter">
                          <Clock size={12} weight="bold" className="text-secondary" /> {article.date}
                        </div>
                        <h4 className="font-kids font-bold text-text-main text-sm md:text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-[11px] text-primary/80 font-bold mt-1.5">
                          Oleh {article.author}
                        </p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    key="empty"
                    layout
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="col-span-full py-20 text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <FirstAid size={48} weight="duotone" className="text-text-muted opacity-50" />
                    </div>
                    <p className="text-text-muted font-kids italic">
                      {searchQuery 
                        ? `Tidak ada artikel "${searchQuery}" di kategori ini.` 
                        : "Belum ada artikel untuk kategori ini."}
                      <br/> Coba cari topik lain ya Moms! 
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>
      </section>
    </div>
  );
};

export default CategoryBlogSystem;