import { motion } from 'framer-motion';
import { Heart, UserPlus, ListChecks, ChatCircleDots, House, SquaresFour } from '@phosphor-icons/react';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-4 z-50 mx-4 md:mx-12 bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] px-6 py-4 flex justify-between items-center shadow-lg shadow-blue-100/50"
    >
      {/* Brand Logo dengan Phosphor Icon */}
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="bg-primary/10 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
          <Heart size={28} weight="fill" className="text-primary" />
        </div>
        <span className="font-kids text-2xl text-slate-800 font-bold tracking-tight">
          Moms<span className="text-primary">Care</span>
        </span>
      </div>

      {/* Navigation Links dengan Ikon Kecil */}
      <div className="hidden md:flex gap-8 items-center">
        <NavLink icon={<House size={20} />} label="Beranda" active />
        <NavLink icon={<SquaresFour size={20} />} label="Kategori" />
        <NavLink icon={<ListChecks size={20} />} label="Checklist" />
        <NavLink icon={<ChatCircleDots size={20} />} label="Konsultasi" />
      </div>

      {/* Button dengan Phosphor Icon */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md shadow-primary/30 hover:bg-blue-500 transition-all"
      >
        <UserPlus size={20} weight="bold" />
        <span>Daftar</span>
      </motion.button>
    </motion.nav>
  );
};

// Komponen Helper untuk Link agar rapi
const NavLink = ({ icon, label, active = false }) => (
  <a 
    href="#" 
    className={`flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 hover:text-primary ${
      active ? 'text-primary' : 'text-slate-500'
    }`}
  >
    {icon}
    <span>{label}</span>
  </a>
);

export default Navbar;