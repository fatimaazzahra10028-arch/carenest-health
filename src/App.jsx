import React from 'react';
import Navbar from './components/Navbar';
import CategoryBlogSystem from './components/CategoryBlogSystem'; // Menggunakan sistem blog baru
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-[#f0f7ff] relative overflow-hidden">
      
      {/* --- BACKGROUND ILLUSTRATION ELEMENTS (Z-0 & Pointer Events None) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Awan Kiri */}
        <motion.div 
          animate={{ x: [0, 40, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] opacity-60"
        >
          <svg width="120" height="60" viewBox="0 0 100 40" fill="white">
            <circle cx="20" cy="25" r="15"/><circle cx="45" cy="20" r="20"/><circle cx="75" cy="25" r="15"/>
          </svg>
        </motion.div>

        {/* Awan Kanan */}
        <motion.div 
          animate={{ x: [0, -30, 0] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-[15%] opacity-40"
        >
          <svg width="150" height="70" viewBox="0 0 100 40" fill="white">
            <circle cx="20" cy="25" r="18"/><circle cx="50" cy="20" r="22"/><circle cx="80" cy="25" r="18"/>
          </svg>
        </motion.div>

        {/* Gunung Latar Belakang */}
        <div className="absolute bottom-0 left-0 w-full flex items-end justify-between opacity-30">
          <svg viewBox="0 0 500 200" className="w-[45%] text-blue-200 fill-current mb-[-2px]">
            <path d="M0 200 L250 40 L500 200 Z" />
          </svg>
          <svg viewBox="0 0 500 250" className="w-[55%] text-blue-300 fill-current ml-[-15%] mb-[-2px]">
            <path d="M0 250 L250 20 L500 250 Z" />
          </svg>
          <svg viewBox="0 0 500 200" className="w-[35%] text-blue-100 fill-current mb-[-2px]">
            <path d="M0 200 L250 80 L500 200 Z" />
          </svg>
        </div>
      </div>
      {/* --- END BACKGROUND ILLUSTRATION --- */}

      {/* Main Content Layer (Z-10 agar di atas background) */}
      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-20 pb-10 px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl text-slate-800 font-bold leading-tight mb-6">
              MomsCare: Teman Setia <br/> <span className="text-blue-500 italic">Ibu Rawat Si Kecil.</span>
            </h1>
            <p className="text-lg text-slate-500 mb-10 font-medium">
              Informasi kesehatan akurat untuk setiap langkah pertumbuhan buah hati. <br/>
              <span className="text-blue-400 font-bold italic">"Tumbuh Hebat Bersama Ibu"</span>
            </p>

            {/* Search Bar with Glow */}
            <div className="relative max-w-lg mx-auto group">
              <input 
                type="text" 
                placeholder="Cari: Imunisasi, MPASI, Gizi..."
                className="w-full px-8 py-4 rounded-full border-2 border-white/50 bg-white/80 backdrop-blur-md focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400/10 transition-all text-sm font-medium shadow-lg group-hover:shadow-xl"
              />
              <button className="absolute right-3 top-2.5 bg-blue-500 p-2 rounded-full text-white px-6 font-bold text-sm hover:bg-blue-600 transition-colors shadow-md">
                Cari
              </button>
            </div>
          </motion.div>
        </section>

        {/* --- SYSTEM BLOG DENGAN FILTER KLIK --- */}
        <CategoryBlogSystem />

        {/* CTA Cards Section */}
        <section className="px-6 md:px-20 py-20 grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-blue-50/80 backdrop-blur-sm p-10 rounded-[3rem] border-2 border-white flex items-center justify-between group cursor-pointer shadow-sm hover:shadow-xl transition-all"
          >
            <div>
              <h3 className="text-2xl text-blue-600 font-bold mb-2">Cek Grafik Pertumbuhan</h3>
              <p className="text-slate-600 text-sm font-medium">Pantau berat & tinggi badan ideal.</p>
            </div>
            <div className="text-5xl group-hover:scale-110 transition-transform">📊</div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-green-50/80 backdrop-blur-sm p-10 rounded-[3rem] border-2 border-white flex items-center justify-between group cursor-pointer shadow-sm hover:shadow-xl transition-all"
          >
            <div>
              <h3 className="text-2xl text-green-700 font-bold mb-2">Reminder Imunisasi</h3>
              <p className="text-slate-600 text-sm font-medium">Jadwal vaksin jangan sampai terlewat!</p>
            </div>
            <div className="text-5xl group-hover:rotate-12 transition-transform">🗓️</div>
          </motion.div>
        </section>

        {/* Maskot Floating Panda */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="fixed bottom-10 right-10 w-24 h-24 hidden md:block cursor-help drop-shadow-2xl z-50"
        >
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Panda" alt="Mascot" className="w-full h-full bg-white rounded-full p-2 border-2 border-blue-100 shadow-xl" />
          <div className="absolute -top-10 -left-12 bg-white px-4 py-2 rounded-2xl text-[12px] font-bold shadow-lg border border-slate-100 whitespace-nowrap">
            Halo, Moms! 👋
          </div>
        </motion.div>

        {/* Footer Kecil */}
        <footer className="py-10 text-center opacity-50">
           <p className="text-xs font-medium text-slate-400">© 2026 MomsCare Indonesia</p>
        </footer>
      </div>
    </div>
  );
}

export default App;