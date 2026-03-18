import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Baby, OrangeSlice, Footprints, Shapes, Backpack, Books, Clock, ArrowRight } from '@phosphor-icons/react';

const categories = [
  // Warna menggunakan kombinasi opacity dari primary agar selaras
  { id: 'neonatal', age: 'Neonatal', range: '0–28 Hari', icon: <Baby size={32} weight="duotone" />, color: 'bg-primary/10', iconColor: 'text-primary' },
  { id: 'bayi', age: 'Bayi', range: '0–11 Bulan', icon: <OrangeSlice size={32} weight="duotone" />, color: 'bg-secondary/20', iconColor: 'text-green-600' },
  { id: 'batita', age: 'Batita', range: '1–3 Tahun', icon: <Footprints size={32} weight="duotone" />, color: 'bg-accent/20', iconColor: 'text-orange-400' },
  { id: 'balita', age: 'Balita', range: '3–5 Tahun', icon: <Shapes size={32} weight="duotone" />, color: 'bg-pink-100', iconColor: 'text-pink-400' },
  { id: 'prasekolah', age: 'Prasekolah', range: '5–6 Tahun', icon: <Backpack size={32} weight="duotone" />, color: 'bg-purple-100', iconColor: 'text-purple-400' },
  { id: 'sekolah', age: 'Sekolah', range: '6–10 Tahun', icon: <Books size={32} weight="duotone" />, color: 'bg-blue-100', iconColor: 'text-blue-400' },
];

const allArticles = [
  { 
    id: 1, 
    categoryId: 'neonatal', 
    title: "Perawatan Tali Pusar Bayi Baru Lahir", 
    author: "dr. Siska", 
    date: "2 Jam lalu", 
    img: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?q=80&w=200&auto=format&fit=crop" 
  },
  { 
    id: 2, 
    categoryId: 'bayi', 
    title: "Jadwal MPASI Pertama: Menu 4 Bintang", 
    author: "Akil Girtzi, S.Gz", 
    date: "1 hari lalu", 
    img: "🥣" 
  },
  { 
    id: 3, 
    categoryId: 'batita', 
    title: "Anak Pilih-pilih Makanan? Ini Solusinya", 
    author: "dr. Budi", 
    date: "3 hari lalu", 
    img: "🥦" 
  },
  { 
    id: 4, 
    categoryId: 'neonatal', 
    title: "Bayi Sering Kuning? Kenali Penyebabnya", 
    author: "dr. Siska", 
    date: "5 hari lalu", 
    img: "🌞" 
  },
  { 
    id: 5, 
    categoryId: 'balita', 
    title: "Aktivitas Motorik Kasar di Rumah", 
    author: "dr. Sari", 
    date: "6 hari lalu", 
    img: "🏃" 
  },
];

const CategoryBlogSystem = () => {
  const [selectedCategory, setSelectedCategory] = useState('neonatal');

  const filteredArticles = allArticles.filter(art => art.categoryId === selectedCategory);

  return (
    <div className="relative z-30 font-outfit"> 
      {/* GRID KATEGORI (FILTER) */}
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
                  ${cat.color} w-20 h-20 md:w-28 md:h-28 rounded-3xl flex items-center justify-center border-4 transition-all duration-300
                  ${selectedCategory === cat.id 
                    ? 'border-primary scale-105 shadow-xl shadow-primary/20' 
                    : 'border-white shadow-sm hover:shadow-md'}
                `}
              >
                <div className={`${cat.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                  {cat.icon}
                </div>
              </motion.div>
              <div className="mt-4 text-center">
                <h3 className={`font-kids text-sm md:text-base transition-colors ${selectedCategory === cat.id ? 'text-primary' : 'text-slate-600'}`}>
                  {cat.age}
                </h3>
                <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">({cat.range})</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIST ARTIKEL */}
      <section className="px-6 md:px-20 py-16 bg-white/60 backdrop-blur-xl rounded-t-[3rem] md:rounded-t-[5rem] border-t border-white shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-kids text-slate-800 capitalize">
              Topik <span className="text-primary">{selectedCategory}</span>
            </h2>
            <div className="h-[2px] flex-grow mx-6 bg-primary/20 rounded-full hidden md:block" />
            <motion.button 
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-primary font-bold text-sm"
            >
              Lihat Semua <ArrowRight size={16} weight="bold" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="wait">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-5 rounded-[2rem] shadow-sm flex gap-4 border border-slate-50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all group"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-bg rounded-2xl flex items-center justify-center text-3xl shrink-0 overflow-hidden shadow-inner border border-slate-50">
                      {article.img.startsWith('http') ? (
                        <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <span className="group-hover:scale-125 transition-transform duration-500 inline-block">{article.img}</span>
                      )}
                    </div>

                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-tighter">
                        <Clock size={12} weight="bold" className="text-secondary" /> {article.date}
                      </div>
                      <h4 className="font-kids font-bold text-slate-800 text-sm md:text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
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
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="col-span-full py-20 text-center"
                >
                  <div className="text-4xl mb-4">✨</div>
                  <p className="text-slate-400 font-kids italic">Belum ada artikel untuk kategori ini. <br/> Tim ahli kami sedang menyiapkannya untuk Moms! 👋</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryBlogSystem;