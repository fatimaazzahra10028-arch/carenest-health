import React from 'react';
import { motion } from 'framer-motion';

const IllustrationWrapper = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#f0f7ff] overflow-hidden">
      {/* Awan-awan */}
      <motion.div 
        animate={{ x: [0, 50, 0] }} 
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-[10%] opacity-60"
      >
        <svg width="100" height="40" viewBox="0 0 100 40" fill="white"><circle cx="20" cy="25" r="15"/><circle cx="45" cy="20" r="20"/><circle cx="75" cy="25" r="15"/></svg>
      </motion.div>

      <motion.div 
        animate={{ x: [0, -40, 0] }} 
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 right-[15%] opacity-50"
      >
        <svg width="120" height="50" viewBox="0 0 100 40" fill="white"><circle cx="20" cy="25" r="15"/><circle cx="45" cy="20" r="20"/><circle cx="75" cy="25" r="15"/></svg>
      </motion.div>

      {/* Gunung di Latar Belakang */}
      <div className="absolute bottom-0 left-0 w-full flex items-end justify-between -z-10 opacity-20 pointer-events-none">
        <svg viewBox="0 0 500 200" className="w-[40%] text-blue-300 fill-current">
          <path d="M0 200 L250 50 L500 200 Z" />
        </svg>
        <svg viewBox="0 0 500 250" className="w-[50%] text-blue-400 fill-current -ml-20">
          <path d="M0 250 L250 0 L500 250 Z" />
        </svg>
        <svg viewBox="0 0 500 200" className="w-[30%] text-blue-200 fill-current">
          <path d="M0 200 L250 70 L500 200 Z" />
        </svg>
      </div>

      {/* Konten Utama */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default IllustrationWrapper;