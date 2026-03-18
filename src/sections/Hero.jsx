import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#F8F9F4] p-4 md:p-6 lg:p-8 font-sans overflow-hidden">
      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-[90vh] min-h-[700px] w-full rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)]"
      >
        
        {/* Background Image & Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10"></div>
        <img 
          src="/src/assets/hero.jpg" 
          className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
          alt="Mother and child healthcare"
        />

        {/* --- NAVBAR --- */}
        <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-8 md:px-16 py-10 z-30">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-12 h-12 bg-[#4A614A] rounded-2xl flex items-center justify-center shadow-lg transition-all group-hover:rotate-12">
              <span className="text-2xl">🌿</span>
            </div>
            <span className="font-black text-2xl tracking-tighter text-slate-800 bg-white/80 backdrop-blur-md px-4 py-1 rounded-xl">CareNest</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-10 bg-white/40 backdrop-blur-xl px-10 py-4 rounded-full border border-white/20 shadow-sm">
            {['Home', 'About', 'Causes', 'Projects', 'Donate', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-900 font-bold hover:text-[#4A614A] transition-colors text-sm uppercase tracking-widest">
                {item === 'Home' ? `● ${item}` : item}
              </a>
            ))}
          </div>

          <button className="bg-[#1A1A1A] text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#4A614A] transition-all hover:scale-105 active:scale-95 shadow-xl">
            Donate Now
          </button>
        </nav>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-8 md:px-20 z-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/30 px-6 py-2 rounded-full text-white text-xs font-black tracking-[0.2em] mb-8 uppercase">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
              Making Lives Better
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-10 drop-shadow-2xl">
              Together We <br /> 
              <span className="text-white/80 underline decoration-green-400/50 underline-offset-8">Support</span> <br /> 
              Educate and Heal
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-xl font-medium leading-relaxed drop-shadow-lg">
              Empowering the next generation (0-10 years) with premium healthcare and educational support.
            </p>
          </motion.div>
        </div>

        {/* --- FLOATING INFO BADGES --- */}
        <div className="absolute top-1/2 right-12 -translate-y-1/2 flex flex-col gap-4 z-30 hidden xl:flex">
          {[
            { text: '100% transparent donations', icon: '💎' },
            { text: 'Fast, effective distribution', icon: '⚡' }
          ].map((badge, i) => (
            <motion.div 
              key={i}
              whileHover={{ x: -10 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-4 rounded-[2rem] text-white text-sm font-bold flex items-center gap-4 shadow-2xl"
            >
               <span className="bg-white/20 p-2 rounded-full">{badge.icon}</span> {badge.text}
            </motion.div>
          ))}
        </div>

        {/* --- PREMIUM DONATION CARD --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute bottom-12 right-12 bg-white p-10 rounded-[3.5rem] w-[420px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] z-30 border border-slate-100 hidden md:block"
        >
           <div className="flex justify-between items-center mb-10">
              <div className="w-16 h-16 bg-[#F1F5EF] rounded-3xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform">
                 <span className="text-3xl text-[#4A614A]">🩺</span>
              </div>
              <span className="text-[10px] font-black text-slate-300 tracking-[0.3em] uppercase italic">Est. 2026</span>
           </div>
           
           <h3 className="text-4xl font-black text-slate-800 leading-[1.1] mb-6 tracking-tight">
             Make an Immediate <span className="text-[#4A614A]">Impact</span>
           </h3>
           
           <p className="text-slate-500 font-semibold mb-12 text-lg leading-relaxed">
             Setiap donasi Anda membantu membiayai pengobatan & nutrisi anak usia dini.
           </p>
           
           <button className="w-full bg-[#4A614A] text-white py-6 rounded-[2rem] font-black text-xl hover:bg-[#1A1A1A] transition-all shadow-[0_20px_40px_rgba(74,97,74,0.3)] active:scale-95 flex items-center justify-center gap-3 group">
             Donate Now
             <span className="group-hover:translate-x-2 transition-transform">→</span>
           </button>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;