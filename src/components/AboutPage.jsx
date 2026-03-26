import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  ShieldCheck,
  UsersThree,
  CaretLeft,
  Sparkle,
  Quotes,
  Info // Tambahkan icon Info untuk disclaimer
} from "@phosphor-icons/react";

const AboutPage = ({ onBack }) => {
  const values = [
    {
      icon: <Heart size={28} weight="duotone" className="text-primary" />,
      title: "Kasih Sayang",
      desc: "Dibuat dengan empati untuk mendukung peran luar biasa setiap Ibu.",
    },
    {
      icon: <ShieldCheck size={28} weight="duotone" className="text-primary" />,
      title: "Terpercaya",
      desc: "Konten kesehatan yang telah divalidasi oleh tenaga medis profesional.",
    },
    {
      icon: <UsersThree size={28} weight="duotone" className="text-primary" />,
      title: "Komunitas",
      desc: "Ruang aman bagi Moms untuk tumbuh dan belajar bersama.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 relative bg-bg transition-colors duration-500 font-outfit">
      <motion.button
        whileHover={{ x: -4 }}
        onClick={onBack}
        className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-10 text-sm font-semibold"
      >
        <CaretLeft size={18} weight="bold" />
        Kembali
      </motion.button>

      <div className="grid lg:grid-cols-10 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-5"
        >
          <h1 className="text-4xl md:text-5xl font-kids text-text-main mb-6 leading-[1.2] transition-colors">
            Mendampingi <span className="text-primary italic">Momen</span>{" "}
            <br />
            Terindah Ibu.
          </h1>

          <p className="text-text-muted leading-relaxed text-sm md:text-base mb-8 max-w-md transition-colors">
            MomsCare bukan sekadar aplikasi. Kami adalah asisten digital yang
            memastikan setiap langkah pengasuhan terasa lebih ringan dan
            terarah.
          </p>

          <div className="p-5 bg-card rounded-3xl border border-border-soft shadow-sm flex items-start gap-4 max-w-sm transition-all duration-500">
            <Quotes
              size={32}
              weight="fill"
              className="text-primary/20 flex-shrink-0"
            />
            <p className="text-xs italic text-text-muted leading-relaxed transition-colors">
              "Tujuan kami adalah meminimalisir kekhawatiran Ibu melalui edukasi
              yang tepat dan teknologi yang ramah."
            </p>
          </div>
        </motion.div>

        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-[380px]"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-[3rem] -rotate-3 -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=600&auto=format&fit=crop"
              alt="Mom and Baby"
              className="rounded-[3rem] rounded-tr-[7rem] shadow-xl object-cover h-[420px] w-full border-4 border-card transition-all duration-500"
            />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 bg-card/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-border-soft flex items-center gap-3 transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
                <UsersThree size={20} weight="bold" />
              </div>
              <div>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-tighter transition-colors">
                  Dipercaya Oleh
                </p>
                <p className="text-sm font-black text-text-main transition-colors">
                  10k+ Indonesia
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Core Values Section */}
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
            <h3 className="text-lg font-bold text-text-main mb-2 font-kids transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-text-muted leading-relaxed font-medium transition-colors">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* --- BAGIAN DISCLAIMER TAMBAHAN --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 p-8 glass-card rounded-4xl border border-border-soft transition-all duration-500"
      >
        <div className="flex items-center gap-3 mb-4">
          <Info size={24} weight="duotone" className="text-primary" />
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-text-main">
            Penting untuk Dipahami
          </h4>
        </div>
        
        <div className="space-y-4 text-sm leading-relaxed text-text-muted font-medium">
          <p>
            Seluruh informasi di <span className="text-text-main font-bold">MomsCare.id</span>, termasuk panduan perkembangan anak dan saran dari <span className="text-primary font-bold italic">MomsBot AI</span>, disediakan hanya untuk tujuan edukasi dan informasi umum.
          </p>
          <p>
            Materi ini <strong>bukan merupakan pengganti saran medis profesional</strong>, diagnosis, atau perawatan dari tenaga medis. Setiap anak memiliki kondisi kesehatan yang unik. Kami sangat menyarankan Moms untuk selalu berkonsultasi dengan <strong>dokter spesialis anak</strong> sebelum mengambil keputusan medis atau perubahan pola asuh yang signifikan.
          </p>
          <p className="text-primary/70 italic text-xs border-l-2 border-primary/20 pl-4">
            "Keamanan buah hati adalah prioritas utama. Teknologi membantu kita belajar, namun dokter membantu kita bertindak."
          </p>
        </div>
      </motion.div>

      {/* Simple Footer Copyright */}
      <footer className="mt-12 py-8 text-center border-t border-border-soft">
        <p className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">
          © 2026 MomsCare Indonesia • Crafted with Heart
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;