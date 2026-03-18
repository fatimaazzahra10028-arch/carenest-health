import { motion } from 'framer-motion';

const Navbar = () => (
  <nav className="sticky top-4 z-50 mx-4 md:mx-12 bg-white/70 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-4 flex justify-between items-center shadow-sm">
    <div className="flex items-center gap-2">
      <div className="text-primary text-2xl">❤️</div>
      <span className="font-kids text-xl text-primary tracking-tight">MomsCare</span>
    </div>
    <div className="hidden md:flex gap-8 font-medium text-sm text-slate-500">
      {['Beranda', 'Kategori Usia', 'Checklist', 'Tanya Dokter'].map((item) => (
        <a key={item} href="#" className="hover:text-primary transition-colors">{item}</a>
      ))}
    </div>
    <button className="bg-primary text-white px-5 py-2 rounded-full text-sm font-bold shadow-md hover:scale-105 transition-transform">
      Daftar
    </button>
  </nav>
);

export default Navbar;