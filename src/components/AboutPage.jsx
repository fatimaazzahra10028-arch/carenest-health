import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  ShieldCheck, 
  UsersThree, 
  CaretLeft, 
  Sparkle,
  Quotes
} from '@phosphor-icons/react';

const AboutPage = ({ onBack }) => {
  const values = [
    { 
      icon: <Heart size={28} weight="duotone" className="text-primary" />, 
      title: "Kasih Sayang", 
      desc: "Dibuat dengan empati untuk mendukung peran luar biasa setiap Ibu." 
    },
    { 
      icon: <ShieldCheck size={28} weight="duotone" className="text-primary" />, 
      title: "Terpercaya", 
      desc: "Konten kesehatan yang telah divalidasi oleh tenaga medis profesional." 
    },
    { 
      icon: <UsersThree size={28} weight="duotone" className="text-primary" />, 
      title: "Komunitas", 
      desc: "Ruang aman bagi Moms untuk tumbuh dan belajar bersama." 
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 relative bg-bg transition-colors duration-500 font-outfit">
      {/* Tombol Back - Lebih Kecil & Subtle */}
      <motion.button
        whileHover={{ x: -4 }}
        onClick={onBack}
        className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-10 text-sm font-semibold"
      >
        <CaretLeft size={18} weight="bold" />
        Kembali
      </motion.button>

      <div className="grid lg:grid-cols-10 gap-16 items-center">
        {/* KIRI: Konten Teks (Lebih Rapat) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-5"
        >
          
          <h1 className="text-4xl md:text-5xl font-kids text-text-main mb-6 leading-[1.2] transition-colors">
            Mendampingi <span className="text-primary italic">Momen</span> <br/>Terindah Ibu.
          </h1>
          
          <p className="text-text-muted leading-relaxed text-sm md:text-base mb-8 max-w-md transition-colors">
            MomsCare bukan sekadar aplikasi. Kami adalah asisten digital yang memastikan setiap langkah pengasuhan terasa lebih ringan dan terarah.
          </p>

          {/* Mini Stats/Quote Card */}
          <div className="p-5 bg-card rounded-3xl border border-border-soft shadow-sm flex items-start gap-4 max-w-sm transition-all duration-500">
            <Quotes size={32} weight="fill" className="text-primary/20 flex-shrink-0" />
            <p className="text-xs italic text-text-muted leading-relaxed transition-colors">
              "Tujuan kami adalah meminimalisir kekhawatiran Ibu melalui edukasi yang tepat dan teknologi yang ramah."
            </p>
          </div>
        </motion.div>

        {/* KANAN: Visual (Compact & Creative) */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-[380px]"
          >
            {/* Background Shape - Opacity disesuaikan agar tetap terlihat di dark mode */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-[3rem] -rotate-3 -z-10"></div>
            
            {/* Image dengan Border-Radius Variatif */}
            <img 
              src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=600&auto=format&fit=crop" 
              alt="Mom and Baby" 
              className="rounded-[3rem] rounded-tr-[7rem] shadow-xl object-cover h-[420px] w-full border-4 border-card transition-all duration-500"
            />

            {/* Floating Achievement Card */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 bg-card/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-border-soft flex items-center gap-3 transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
                <UsersThree size={20} weight="bold" />
              </div>
              <div>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-tighter transition-colors">Dipercaya Oleh</p>
                <p className="text-sm font-black text-text-main transition-colors">10k+ Indonesia</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* VALUES SECTION (Grid Lebih Compact) */}
      <div className="grid md:grid-cols-3 gap-6 mt-20">
        {values.map((item, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -5 }}
            className="group p-6 bg-card/50 hover:bg-card rounded-[2rem] border border-border-soft hover:border-primary/20 hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-lg font-bold text-text-main mb-2 font-kids transition-colors">{item.title}</h3>
            <p className="text-xs text-text-muted leading-relaxed font-medium transition-colors">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;