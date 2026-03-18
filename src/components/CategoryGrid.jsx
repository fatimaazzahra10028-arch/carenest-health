import { motion } from 'framer-motion';
import { 
  Baby, 
  OrangeSlice, 
  Footprints, 
  Tetrahedron, 
  Backpack, 
  Books 
} from '@phosphor-icons/react';

const categories = [
  { age: 'Neonatal', range: '0–28 Hari', icon: <Baby size={42} weight="duotone" />, color: 'bg-blue-50', iconColor: 'text-blue-500', blobColor: 'bg-blue-200/50' },
  { age: 'Bayi', range: '0–11 Bulan', icon: <OrangeSlice size={42} weight="duotone" />, color: 'bg-orange-50', iconColor: 'text-orange-500', blobColor: 'bg-orange-200/50' },
  { age: 'Batita', range: '1–3 Tahun', icon: <Footprints size={42} weight="duotone" />, color: 'bg-green-50', iconColor: 'text-green-500', blobColor: 'bg-green-200/50' },
  { age: 'Balita', range: '3–5 Tahun', icon: <Tetrahedron size={42} weight="duotone" />, color: 'bg-red-50', iconColor: 'text-red-500', blobColor: 'bg-red-200/50' },
  { age: 'Prasekolah', range: '5–6 Tahun', icon: <Backpack size={42} weight="duotone" />, color: 'bg-purple-50', iconColor: 'text-purple-500', blobColor: 'bg-purple-200/50' },
  { age: 'Usia Sekolah', range: '6–10 Tahun', icon: <Books size={42} weight="duotone" />, color: 'bg-indigo-50', iconColor: 'text-indigo-500', blobColor: 'bg-indigo-200/50' },
];

const CategoryGrid = () => (
  <section className="px-6 md:px-20 py-20 relative overflow-hidden">
    {/* Ornamen Latar Belakang (Ilustrasi Subtle) */}
    <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
       {/* Kamu bisa masukkan SVG pola lucu di sini */}
    </div>

    <motion.h2 
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="font-kids text-4xl text-center mb-16 text-slate-800"
    >
      Pilih Fase <span className="text-primary">Tumbuh Kembang</span>
    </motion.h2>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
      {categories.map((cat, index) => (
        <motion.div
          key={cat.age}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20, 
            delay: index * 0.1 
          }}
          whileHover={{ 
            y: -12,
            transition: { duration: 0.3 }
          }}
          className={`${cat.color} group relative p-8 rounded-[3rem] flex flex-col items-center text-center cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-primary/20 transition-all border border-white/50`}
        >
          {/* Ikon dengan Background Blob (Efek Ilustrasi) */}
          <div className="relative mb-6">
            <div className={`absolute inset-0 ${cat.blobColor} rounded-full scale-150 blur-lg group-hover:scale-[2] transition-transform duration-500`} />
            <div className={`relative z-10 ${cat.iconColor} transform group-hover:rotate-12 transition-transform duration-300`}>
              {cat.icon}
            </div>
          </div>

          <h3 className="font-kids text-xl text-slate-800 font-bold mb-1 leading-tight">
            {cat.age}
          </h3>
          <p className="text-xs text-slate-500 font-semibold tracking-wide uppercase">
            {cat.range}
          </p>

          {/* Aksesori Dekoratif (Dot kecil) */}
          <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity">
            <div className={`w-2 h-2 rounded-full ${cat.iconColor}`} />
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default CategoryGrid;