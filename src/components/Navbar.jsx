import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, UserPlus, ListChecks, ChatCircleDots, House, SquaresFour } from '@phosphor-icons/react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Deteksi scroll untuk mengubah style navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`
        sticky top-0 md:top-4 z-[100] transition-all duration-300
        mx-0 md:mx-12 flex justify-between items-center px-6
        ${isScrolled 
          ? 'py-3 bg-white/90 backdrop-blur-xl shadow-xl shadow-blue-100/30 border-b md:border border-primary/20 md:rounded-[2rem]' 
          : 'py-5 bg-white/70 backdrop-blur-lg border-b md:border border-white/40 md:rounded-[2rem]'}
      `}
    >
      {/* Brand Logo */}
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="bg-primary/10 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
          <Heart size={28} weight="fill" className="text-primary" />
        </div>
        <span className="font-kids text-2xl text-slate-800 font-bold tracking-tight">
          Moms<span className="text-primary">Care</span>
        </span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-8 items-center">
        <NavLink icon={<House size={20} weight="duotone" />} label="Beranda" active />
        <NavLink icon={<SquaresFour size={20} weight="duotone" />} label="Kategori" />
        <NavLink icon={<ListChecks size={20} weight="duotone" />} label="Checklist" />
        <NavLink icon={<ChatCircleDots size={20} weight="duotone" />} label="Konsultasi" />
      </div>

      {/* Action Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md shadow-primary/30 hover:opacity-90 transition-all"
      >
        <UserPlus size={20} weight="bold" />
        <span>Daftar</span>
      </motion.button>
    </motion.nav>
  );
};

const NavLink = ({ icon, label, active = false }) => (
  <a 
    href="#" 
    className={`flex items-center gap-1.5 text-sm font-bold transition-all duration-200 hover:text-primary ${
      active ? 'text-primary' : 'text-slate-500'
    }`}
  >
    {icon}
    <span>{label}</span>
  </a>
);

export default Navbar;