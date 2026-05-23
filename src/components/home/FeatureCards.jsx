import React from "react";
import { motion } from "framer-motion";
import {
  ChartLineUp,
  CalendarCheck,
  Carrot,
  ChatTeardropDots,
} from "@phosphor-icons/react";

const FeatureCards = ({
  onGrowthClick,
  onImmunizationClick,
  onMPASIClick,
  onCommunityClick,
}) => {
  const cards = [
    {
      title: "Grafik Pertumbuhan",
      desc: "Pantau berat & tinggi badan ideal si kecil sesuai standar WHO.",
      icon: <ChartLineUp size={56} weight="duotone" />,
      btnText: "Cek Sekarang",
      onClick: onGrowthClick,
    },
    {
      title: "Jadwal Imunisasi",
      desc: "Jangan lewatkan jadwal vaksin. Kami ingatkan tepat waktu!",
      icon: <CalendarCheck size={56} weight="duotone" />,
      btnText: "Atur Jadwal",
      onClick: onImmunizationClick,
    },
    {
      title: "MPASI Planner",
      desc: "Ide menu harian & catatan alergi untuk nutrisi terbaik si kecil.",
      icon: <Carrot size={56} weight="duotone" />,
      btnText: "Susun Menu",
      onClick: onMPASIClick,
    },
    {
      title: "Tanya Ahli",
      desc: "Konsultasi langsung dengan tim medis & sharing sesama Moms.",
      icon: <ChatTeardropDots size={56} weight="duotone" />,
      btnText: "Mulai Tanya",
      onClick: onCommunityClick,
    },
  ];

  return (
    <section className="px-6 md:px-20 py-24 grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto bg-bg transition-colors duration-500">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          onClick={() => {
            if (card.onClick) card.onClick();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          whileHover={{ y: -10, scale: 1.02 }}
          className="relative overflow-hidden flex items-center justify-between p-8 md:p-10 rounded-5xl border-2 cursor-pointer transition-all duration-500 group
                     bg-card border-border-soft shadow-soft hover:border-primary/50"
        >
          {/* Konten Teks */}
          <div className="max-w-[65%] z-20">
            <h3
              className="text-2xl font-bold mb-2 font-kids leading-tight transition-colors 
                           text-text-main group-hover:text-primary"
            >
              {card.title}
            </h3>
            <p className="text-sm font-medium mb-6 leading-relaxed text-text-muted">
              {card.desc}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-primary/20 transition-all hover:brightness-110"
            >
              {card.btnText}
            </motion.button>
          </div>

          <div
            className="z-20 p-5 rounded-4xl shadow-inner border transition-all duration-500 
                          group-hover:rotate-12 group-hover:scale-110
                          bg-primary/10 border-primary/10 text-primary"
          >
            {card.icon}
          </div>

          <div
            className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-3xl transition-opacity duration-700
                          bg-primary/20 opacity-40 group-hover:opacity-100"
          ></div>

          <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-primary group-hover:w-full transition-all duration-500"></div>
        </motion.div>
      ))}
    </section>
  );
};

export default FeatureCards;
