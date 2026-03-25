import React from 'react';
import { motion } from "framer-motion";
import { ChatCircleDots } from '@phosphor-icons/react'; // Perhatikan: Nama icon biasanya tanpa kata 'Icon' di akhir untuk library @phosphor-icons/react

const HeroSection = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  onStartAI,
}) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };

  return (
    <section className="pt-16 pb-12 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl text-slate-800 font-bold leading-[1.3] mb-8 font-kids drop-shadow-sm">
          MomsCare: Teman Setia <br />
          {/* BAGIAN HIGHLIGHT DENGAN SUDUT BULAT */}
          <span className="relative inline-block mt-2 px-6 py-2 bg-primary text-white rounded-full shadow-lg shadow-primary/20">
            Ibu Rawat Si Kecil.
          </span>
        </h1>
        
        <p className="text-lg text-slate-500 mb-10 font-medium max-w-2xl mx-auto">
          Informasi kesehatan akurat untuk setiap langkah pertumbuhan buah hati.
          <br className="hidden md:block" />
          <span className="text-primary font-bold italic">
            "Tumbuh Hebat Bersama Ibu"
          </span>
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto mb-12">
          {/* FORM PENCARIAN */}
          <form
            onSubmit={handleSubmit}
            className="relative flex-1 group w-full"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari: Imunisasi, MPASI, Gizi..."
              className="w-full px-8 py-4 rounded-full border-2 border-white/50 bg-white/60 backdrop-blur-md focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium shadow-xl"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-primary p-2.5 rounded-full text-white px-7 font-bold text-sm hover:brightness-110 shadow-lg"
            >
              Cari
            </button>
          </form>

          {/* TOMBOL AI */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartAI}
            className="bg-white text-primary border-2 border-primary/20 px-8 py-4 rounded-full font-bold shadow-xl hover:bg-primary hover:text-white transition-all flex items-center gap-2 whitespace-nowrap group"
          >
            <span className="text-2xl group-hover:rotate-12 transition-transform">
              <ChatCircleDots weight="bold" />
            </span>
            Konsultasi AI
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;