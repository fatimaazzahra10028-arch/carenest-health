import React from "react";
import { motion } from "framer-motion";
// Tambahkan Icon baru: Carrot untuk MPASI, ChatTeardropDots untuk Komunitas
import { ChartLineUp, CalendarCheck, Carrot, ChatTeardropDots } from "@phosphor-icons/react";

const FeatureCards = ({ 
  onGrowthClick, 
  onImmunizationClick, 
  onMPASIClick, 
  onCommunityClick 
}) => {
  const cards = [
    {
      title: "Grafik Pertumbuhan",
      desc: "Pantau berat & tinggi badan ideal si kecil sesuai standar WHO.",
      icon: <ChartLineUp size={56} weight="duotone" className="text-primary" />,
      btnText: "Cek Sekarang",
      btnColor: "bg-primary", 
      shadowColor: "shadow-primary/20",
      decorColor: "bg-primary/10", 
      onClick: onGrowthClick,
    },
    {
      title: "Jadwal Imunisasi",
      desc: "Jangan lewatkan jadwal vaksin. Kami ingatkan tepat waktu!",
      icon: <CalendarCheck size={56} weight="duotone" className="text-primary" />,
      btnText: "Atur Jadwal",
      btnColor: "bg-primary", 
      shadowColor: "shadow-primary/20",
      decorColor: "bg-primary/10",
      onClick: onImmunizationClick,
    },
    // FITUR BARU 1: MPASI PLANNER
    {
      title: "MPASI Planner",
      desc: "Ide menu harian & catatan alergi untuk nutrisi terbaik si kecil.",
      icon: <Carrot size={56} weight="duotone" className="text-orange-500" />,
      btnText: "Susun Menu",
      btnColor: "bg-orange-500", 
      shadowColor: "shadow-orange-200",
      decorColor: "bg-orange-500/10",
      onClick: onMPASIClick,
    },
    // FITUR BARU 2: TANYA AHLI / KOMUNITAS
    {
      title: "Tanya Ahli",
      desc: "Konsultasi langsung dengan tim medis & sharing sesama Moms.",
      icon: <ChatTeardropDots size={56} weight="duotone" className="text-secondary" />,
      btnText: "Mulai Tanya",
      btnColor: "bg-secondary", 
      shadowColor: "shadow-secondary/20",
      decorColor: "bg-secondary/10",
      onClick: onCommunityClick,
    },
  ];

  return (
    <section className="px-6 md:px-20 py-24 grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          onClick={() => {
            if(card.onClick) card.onClick();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="bg-card/40 backdrop-blur-md p-8 md:p-10 rounded-[3rem] border-2 border-border-soft flex items-center justify-between group cursor-pointer shadow-xl shadow-black/5 transition-all duration-500 overflow-hidden relative"
        >
          {/* Konten Teks */}
          <div className="max-w-[65%] z-10">
            <h3 className="text-2xl text-text-main font-bold mb-2 font-kids transition-colors leading-tight">
              {card.title}
            </h3>
            <p className="text-text-muted text-sm font-medium mb-6 leading-relaxed transition-colors">
              {card.desc}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${card.btnColor} text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg ${card.shadowColor} transition-transform`}
            >
              {card.btnText}
            </motion.button>
          </div>

          {/* Icon Box */}
          <div className="group-hover:rotate-12 group-hover:scale-110 transition-transform z-10 p-5 bg-bg/50 rounded-[2rem] shadow-inner border border-border-soft">
            {card.icon}
          </div>

          {/* Dekorasi Background Bulat */}
          <div className={`absolute -right-10 -bottom-10 w-40 h-40 ${card.decorColor} rounded-full blur-3xl`}></div>
        </motion.div>
      ))}
    </section>
  );
};

export default FeatureCards;