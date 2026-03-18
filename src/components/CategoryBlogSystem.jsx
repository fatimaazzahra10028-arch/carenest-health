import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Baby, OrangeSlice, Footprints, Shapes, Backpack, Books, Clock } from '@phosphor-icons/react';

const categories = [
  { id: 'neonatal', age: 'Neonatal', range: '0–28 Hari', icon: <Baby size={32} weight="duotone" />, color: 'bg-green-100', iconColor: 'text-green-600' },
  { id: 'bayi', age: 'Bayi', range: '0–11 Bulan', icon: <OrangeSlice size={32} weight="duotone" />, color: 'bg-orange-100', iconColor: 'text-orange-500' },
  { id: 'batita', age: 'Batita', range: '1–3 Tahun', icon: <Footprints size={32} weight="duotone" />, color: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  { id: 'balita', age: 'Balita', range: '3–5 Tahun', icon: <Shapes size={32} weight="duotone" />, color: 'bg-pink-100', iconColor: 'text-pink-500' },
  { id: 'prasekolah', age: 'Prasekolah', range: '5–6 Tahun', icon: <Backpack size={32} weight="duotone" />, color: 'bg-purple-100', iconColor: 'text-purple-500' },
  { id: 'sekolah', age: 'Sekolah', range: '6–10 Tahun', icon: <Books size={32} weight="duotone" />, color: 'bg-blue-100', iconColor: 'text-blue-500' },
];

const allArticles = [
  { 
    id: 1, 
    categoryId: 'neonatal', 
    title: "Perawatan Tali Pusar Bayi", 
    author: "dr. Siska", 
    date: "2 Jam lalu", 
    img: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?q=80&w=200&auto=format&fit=crop" 
  },
  { 
    id: 2, 
    categoryId: 'bayi', 
    title: "Jadwal MPASI Pertama", 
    author: "Akil Girtzi, S.Gz", 
    date: "1 hari lalu", 
    img: "🥣" 
  },
  { 
    id: 3, 
    categoryId: 'batita', 
    title: "Anak Pilih-pilih Makanan?", 
    author: "dr. Budi", 
    date: "3 hari lalu", 
    img: "🥦" 
  },
  { 
    id: 4, 
    categoryId: 'neonatal', 
    title: "Bayi Sering Kuning?", 
    author: "dr. Siska", 
    date: "5 hari lalu", 
    img: "🌞" 
  },
  { 
    id: 5, 
    categoryId: 'balita', 
    title: "Aktivitas Motorik Kasar", 
    author: "dr. Sari", 
    date: "6 hari lalu", 
    img: "🏃" 
  },
];

const CategoryBlogSystem = () => {
  const [selectedCategory, setSelectedCategory] = useState('neonatal');

  // Filter artikel berdasarkan kategori yang dipilih
  const filteredArticles = allArticles.filter(art => art.categoryId === selectedCategory);

  return (
    <div className="relative z-30"> 
      {/* GRID KATEGORI (FILTER) */}
      <section className="px-6 md:px-20 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="flex flex-col items-center group cursor-pointer"
            >
              <motion.div
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.9 }}
                className={`
                  ${cat.color} w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center border-4 transition-all duration-500
                  ${selectedCategory === cat.id ? 'border-blue-500 scale-110 shadow-2xl ring-4 ring-blue-500/10' : 'border-white shadow-md'}
                `}
              >
                <div className={`${cat.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                  {cat.icon}
                </div>
              </motion.div>
              <div className="mt-4 text-center">
                <h3 className={`font-bold transition-colors ${selectedCategory === cat.id ? 'text-blue-600' : 'text-slate-700'}`}>
                  {cat.age}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">({cat.range})</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIST ARTIKEL */}
      <section className="px-6 md:px-20 py-16 bg-white/40 backdrop-blur-xl rounded-t-[5rem] border-t border-white/50 shadow-inner">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-slate-800 capitalize">
              Topik <span className="text-blue-500">{selectedCategory}</span>
            </h2>
            <div className="h-1 flex-grow mx-6 bg-slate-200/50 rounded-full hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 rounded-[2.5rem] shadow-sm flex gap-5 border border-white hover:shadow-xl transition-all group"
                  >
                    {/* Thumbnail Handler (Support Image URL & Emoji) */}
                    <div className="w-20 h-20 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-4xl shrink-0 overflow-hidden shadow-inner border border-slate-100">
                      {article.img.startsWith('http') ? (
                        <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
                      ) : (
                        article.img
                      )}
                    </div>

                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold mb-2 uppercase">
                        <Clock size={12} weight="bold" /> {article.date}
                      </div>
                      <h4 className="font-bold text-slate-800 text-base leading-tight group-hover:text-blue-500 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-[11px] text-blue-400 font-extrabold mt-2 italic">
                        By {article.author}
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
                  <p className="text-slate-400 font-medium italic">Belum ada artikel untuk kategori ini. Nantikan segera! 👋</p>
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