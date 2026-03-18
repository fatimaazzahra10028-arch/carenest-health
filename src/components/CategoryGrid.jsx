import { motion } from 'framer-motion';

const categories = [
  { age: 'Neonatal', range: '0–28 Hari', icon: '👶', color: 'bg-[#E0F2FE]' },
  { age: 'Bayi', range: '0–11 Bulan', icon: '🍼', color: 'bg-[#FEF3C7]' },
  { age: 'Batita', range: '1–3 Tahun', icon: '👟', color: 'bg-[#DCFCE7]' },
  { age: 'Balita', range: '3–5 Tahun', icon: '🧩', color: 'bg-[#FEE2E2]' },
  { age: 'Prasekolah', range: '5–6 Tahun', icon: '🎒', color: 'bg-[#F3E8FF]' },
  { age: 'Usia Sekolah', range: '6–10 Tahun', icon: '📚', color: 'bg-[#E0E7FF]' },
];

const CategoryGrid = () => (
  <section className="px-6 md:px-20 py-16">
    <h2 className="font-kids text-3xl text-center mb-12 text-slate-800">Pilih Fase Tumbuh Kembang</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {categories.map((cat, index) => (
        <motion.div
          key={cat.age}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          className={`${cat.color} p-6 rounded-[2.5rem] flex flex-col items-center text-center cursor-pointer shadow-sm hover:shadow-xl transition-all`}
        >
          <span className="text-4xl mb-4 drop-shadow-sm">{cat.icon}</span>
          <h3 className="font-kids text-lg leading-tight">{cat.age}</h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">{cat.range}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default CategoryGrid;