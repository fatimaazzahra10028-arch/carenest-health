import React from 'react';
import { motion } from 'framer-motion';
import { Baby, OrangeSlice, Footprints, Shapes, Backpack, Books } from '@phosphor-icons/react';

const categories = [
  { age: 'Neonatal', range: '0–28 Hari', icon: <Baby size={32} weight="duotone" />, color: 'bg-[#dcfce7]', iconColor: 'text-green-600' },
  { age: 'Bayi', range: '0–11 Bulan', icon: <OrangeSlice size={32} weight="duotone" />, color: 'bg-[#fff7ed]', iconColor: 'text-orange-500' },
  { age: 'Batita', range: '1–3 Tahun', icon: <Footprints size={32} weight="duotone" />, color: 'bg-[#fef9c3]', iconColor: 'text-yellow-600' },
  { age: 'Balita', range: '3–5 Tahun', icon: <Shapes size={32} weight="duotone" />, color: 'bg-[#fce7f3]', iconColor: 'text-pink-500' },
  { age: 'Prasekolah', range: '5–6 Tahun', icon: <Backpack size={32} weight="duotone" />, color: 'bg-[#f3e8ff]', iconColor: 'text-purple-500' },
  { age: 'Sekolah', range: '6–10 Tahun', icon: <Books size={32} weight="duotone" />, color: 'bg-[#e0f2fe]', iconColor: 'text-blue-500' },
];

const CategoryGrid = () => (
  <section className="px-6 md:px-20 py-12">

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
      {categories.map((cat, index) => (
        <motion.div
          key={cat.age}
          whileHover={{ y: -10 }}
          className="flex flex-col items-center group cursor-pointer"
        >
          <div className={`${cat.color} w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center border-4 border-white shadow-xl group-hover:shadow-2xl transition-all duration-300`}>
            <div className={cat.iconColor}>{cat.icon}</div>
          </div>
          <div className="mt-4 text-center">
            <h3 className="font-bold text-slate-700">{cat.age}</h3>
            <p className="text-xs text-slate-400 font-medium tracking-wide">({cat.range})</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default CategoryGrid;