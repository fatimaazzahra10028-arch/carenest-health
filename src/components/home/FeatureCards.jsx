import React from "react";
import { motion } from "framer-motion";
// Import Icon yang dibutuhkan
import { ChartLineUp, CalendarCheck } from "@phosphor-icons/react";

const FeatureCards = ({ onGrowthClick, onImmunizationClick }) => {
  const cards = [
    {
      title: "Cek Grafik Pertumbuhan",
      desc: "Pantau berat & tinggi badan ideal si kecil sesuai standar WHO.",
      // Icon tetap menggunakan warna primary agar tetap kontras di kedua mode
      icon: <ChartLineUp size={64} weight="duotone" className="text-primary" />,
      btnText: "Mulai Cek Sekarang",
      btnColor: "bg-primary", 
      shadowColor: "shadow-primary/20",
      decorColor: "bg-primary/10", 
      onClick: onGrowthClick,
    },
    {
      title: "Reminder Imunisasi",
      desc: "Jangan lewatkan jadwal vaksin. Kami ingatkan tepat waktu!",
      icon: <CalendarCheck size={64} weight="duotone" className="text-primary" />,
      btnText: "Daftar Sekarang",
      btnColor: "bg-primary", 
      shadowColor: "shadow-primary/20",
      decorColor: "bg-primary/10",
      onClick: onImmunizationClick,
    },
  ];

  return (
    <section className="px-6 md:px-20 py-24 grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          onClick={() => {
            card.onClick();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          whileHover={{ y: -8, scale: 1.02 }}
          /* Ganti bg-white/40 ke bg-card/40 dan border-white ke border-border-soft */
          className="bg-card/40 backdrop-blur-md p-10 rounded-[3rem] border-2 border-border-soft flex items-center justify-between group cursor-pointer shadow-xl shadow-black/5 transition-all duration-500 overflow-hidden relative"
        >
          {/* Konten Teks */}
          <div className="max-w-[70%] z-10">
            {/* Teks slate-800 ganti ke text-text-main agar otomatis putih di dark mode */}
            <h3 className="text-2xl text-text-main font-bold mb-2 font-kids transition-colors">
              {card.title}
            </h3>
            {/* Teks slate-500 ganti ke text-text-muted */}
            <p className="text-text-muted text-sm font-medium mb-6 leading-relaxed transition-colors">
              {card.desc}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${card.btnColor} text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg ${card.shadowColor}`}
            >
              {card.btnText}
            </motion.button>
          </div>

          {/* Icon Box: bg-white/50 ganti ke bg-bg/50 agar menyesuaikan background */}
          <div className="group-hover:rotate-12 group-hover:scale-110 transition-transform z-10 p-4 bg-bg/50 rounded-3xl shadow-inner border border-border-soft">
            {card.icon}
          </div>

          {/* Dekorasi Background Bulat (Blur) */}
          <div className={`absolute -right-10 -bottom-10 w-40 h-40 ${card.decorColor} rounded-full blur-3xl`}></div>
        </motion.div>
      ))}
    </section>
  );
};

export default FeatureCards;