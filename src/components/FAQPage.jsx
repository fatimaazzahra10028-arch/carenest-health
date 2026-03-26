import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CaretDown,
  Question,
  Lightbulb,
  ShieldCheck,
  Heart,
} from "@phosphor-icons/react";

const FAQItem = ({ question, answer, icon: Icon, isOpen, onClick }) => {
  return (
    <div
      className={`border-b border-border-soft last:border-none transition-all ${isOpen ? "bg-primary/5" : "hover:bg-bg"}`}
    >
      <button
        onClick={onClick}
        className="w-full py-5 px-6 flex items-center justify-between text-left transition-all"
      >
        <div className="flex items-center gap-4">
          <div
            className={`p-2 rounded-lg ${isOpen ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}
          >
            <Icon size={20} weight={isOpen ? "fill" : "bold"} />
          </div>
          <span
            className={`font-bold text-sm md:text-base ${isOpen ? "text-primary" : "text-text-main"}`}
          >
            {question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-text-muted"
        >
          <CaretDown size={20} weight="bold" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 ml-14 text-sm md:text-base text-text-muted leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Apa itu MomsCare?",
      answer:
        "MomsCare adalah asisten digital pintar yang dirancang khusus untuk membantu Ibu memantau tumbuh kembang anak, jadwal imunisasi, serta memberikan tips pengasuhan harian yang valid secara medis.",
      icon: Question,
    },
    {
      question: "Bagaimana cara mencatat jadwal imunisasi?",
      answer:
        "Moms bisa masuk ke menu 'Fitur Unggulan' lalu pilih 'Kalender Imunisasi'. Cukup masukkan tanggal lahir si kecil, dan sistem kami akan otomatis menjadwalkan pengingat untuk Moms.",
      icon: Lightbulb,
    },
    {
      question: "Apakah data medis anak saya aman?",
      answer:
        "Tentu saja, Moms! Kami menggunakan enkripsi tingkat tinggi untuk memastikan semua data profil dan catatan kesehatan si kecil hanya bisa diakses oleh Moms sendiri.",
      icon: ShieldCheck,
    },
    {
      question: "Apakah saya bisa berkonsultasi dengan Dokter?",
      answer:
        "Saat ini kami menyediakan fitur direktori kontak ahli dan artikel yang ditinjau oleh dokter. Fitur chat langsung dengan ahli akan segera hadir pada update mendatang!",
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 px-6 md:px-12 mt-10">
      <div className="max-w-3xl mx-auto">
        {/* Header FAQ */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest"
          >
            Bantuan & FAQ
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-kids font-bold text-text-main mt-4"
          >
            Punya Pertanyaan <span className="text-primary">Moms?</span>
          </motion.h1>
          <p className="text-text-muted mt-3 text-sm md:text-base">
            Kami merangkum pertanyaan yang paling sering diajukan untuk membantu
            Moms lebih nyaman menggunakan MomsCare.
          </p>
        </div>

        {/* List FAQ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border-soft rounded-[2rem] shadow-xl shadow-primary/5 overflow-hidden"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              {...faq}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </motion.div>

        {/* Footer FAQ */}
        <div className="text-center mt-10 p-8 border-2 border-dashed border-border-soft rounded-[2rem]">
          <p className="text-text-muted text-sm italic">
            Masih bingung? Jangan ragu untuk hubungi kami langsung.
          </p>
          <button className="mt-4 text-primary font-bold hover:underline flex items-center gap-2 mx-auto">
            Hubungi Customer Support{" "}
            <CaretDown size={16} className="-rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
