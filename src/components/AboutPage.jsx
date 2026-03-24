import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, UsersThree, CaretLeft } from '@phosphor-icons/react';

const AboutPage = ({ onBack }) => {
  const values = [
    { 
      icon: <Heart size={32} weight="fill" className="text-pink-400" />, 
      title: "Kasih Sayang", 
      desc: "Setiap informasi dibuat dengan empati untuk mendukung peran luar biasa setiap Ibu." 
    },
    { 
      icon: <ShieldCheck size={32} weight="fill" className="text-blue-400" />, 
      title: "Informasi Terpercaya", 
      desc: "Konten kesehatan yang telah divalidasi oleh tenaga medis profesional." 
    },
    { 
      icon: <UsersThree size={32} weight="fill" className="text-orange-400" />, 
      title: "Komunitas", 
      desc: "Membangun ruang aman bagi Moms untuk tumbuh dan belajar bersama." 
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-sm uppercase tracking-[0.2em] text-primary font-black mb-4">Tentang MomsCare</h2>
          <h1 className="text-4xl md:text-5xl font-kids text-slate-800 mb-6 leading-tight">
            Mendampingi Setiap <br/> <span className="text-primary italic">Detik Pertumbuhan.</span>
          </h1>
          <p className="text-slate-500 leading-relaxed mb-8">
            MomsCare lahir dari kesadaran bahwa menjadi orang tua adalah perjalanan yang menantang namun indah. Kami hadir sebagai asisten digital pintar yang menyediakan edukasi kesehatan, pelacak pertumbuhan, dan pengingat imunisasi dalam satu genggaman.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-primary/10 rounded-[3rem] rotate-6 transform transition-transform group-hover:rotate-0"></div>
          <img 
            src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop" 
            alt="Mom and Baby" 
            className="relative rounded-[3rem] shadow-2xl object-cover h-[400px] w-full"
          />
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-20">
        {values.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-xl shadow-blue-900/5 text-center"
          >
            <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 font-kids">{item.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;