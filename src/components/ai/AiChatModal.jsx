import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Robot, X, Sparkle, Target, 
  Hourglass, ThermometerHot, 
  FirstAid, FileText, WhatsappLogo,
  CaretRight, Brain
} from "@phosphor-icons/react";

const AIChatModal = ({ isOpen, onClose, user }) => {
  const [chatStep, setChatStep] = useState(1);
  const [chatData, setChatData] = useState({
    age: "",
    symptom: "",
    duration: "",
  });

  const handleChatNext = (update) => {
    setChatData((prev) => ({ ...prev, ...update }));
    setChatStep((prev) => prev + 1);
  };

  useEffect(() => {
    if (chatStep === 5) {
      const timer = setTimeout(() => setChatStep(6), 2500);
      return () => clearTimeout(timer);
    }
  }, [chatStep]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 font-outfit">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        /* bg-white ganti ke bg-card, border-white ganti ke border-border-soft */
        className="bg-card w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden border border-border-soft relative transition-colors duration-500"
      >
        {/* Header Modal - Tetap Gelap/Slate agar Kontras */}
        <div className="bg-slate-900 p-7 text-white flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white border border-white/10">
              <Robot size={28} weight="duotone" />
            </div>
            <div>
              <h3 className="font-kids text-xl leading-tight">MomsBot AI</h3>
              <p className="text-[10px] opacity-60 uppercase tracking-[0.2em] font-bold">
                Diagnostic Assistant
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors text-white/50 hover:text-white"
          >
            <X size={24} weight="bold" />
          </button>
        </div>

        {/* Chat Content */}
        <div className="p-10 max-h-[75vh] overflow-y-auto custom-scrollbar flex flex-col items-center">
          
          {/* STEP 1: WELCOME */}
          {chatStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mx-auto mb-6">
                <Sparkle size={40} weight="fill" />
              </div>
              <h4 className="text-3xl font-kids text-text-main mb-3 transition-colors">
                Halo Moms {user?.name || ""}!
              </h4>
              <p className="text-text-muted text-sm mb-10 leading-relaxed font-medium transition-colors">
                Saya asisten pintar MomsCare. Mari lakukan pengecekan gejala
                awal si kecil sebelum berkonsultasi dengan dokter.
              </p>
              <button
                onClick={() => handleChatNext({})}
                className="bg-primary text-white w-full py-5 rounded-[2rem] font-bold shadow-xl shadow-primary/20 hover:brightness-110 transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-widest"
              >
                Mulai Screening <CaretRight size={18} weight="bold" />
              </button>
            </motion.div>
          )}

          {/* STEP 2: USIA */}
          {chatStep === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full">
              <div className="flex items-center gap-2 mb-6 justify-center">
                <Target size={20} className="text-primary" weight="bold" />
                <p className="font-kids text-xl text-text-main transition-colors">Berapa usia si kecil?</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["0-6 Bulan", "6-12 Bulan", "1-3 Tahun", "3 Tahun+"].map((age) => (
                  <button
                    key={age}
                    onClick={() => handleChatNext({ age })}
                    /* bg-slate-50 ganti ke bg-bg, border-slate-50 ganti ke border-border-soft */
                    className="p-5 border-2 border-border-soft bg-bg rounded-3xl hover:border-primary hover:bg-primary/5 transition-all font-bold text-text-main text-sm shadow-sm"
                  >
                    {age}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: GEJALA */}
          {chatStep === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full">
              <div className="flex items-center gap-2 mb-6 justify-center">
                <ThermometerHot size={24} className="text-primary" weight="bold" />
                <p className="font-kids text-xl text-text-main text-center transition-colors">Apa keluhan utamanya?</p>
              </div>
              <div className="flex flex-col gap-3">
                {["Demam / Panas", "Batuk & Pilek", "Masalah Pencernaan", "Bintik Merah / Alergi"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleChatNext({ symptom: s })}
                    className="p-5 border-2 border-border-soft bg-bg rounded-2xl hover:border-primary hover:bg-primary/5 transition-all font-bold text-text-main text-left flex items-center justify-between group shadow-sm"
                  >
                    <span className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-border-soft group-hover:bg-primary transition-colors" />
                      {s}
                    </span>
                    <CaretRight size={16} className="text-text-muted/40" weight="bold" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4: DURASI */}
          {chatStep === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full">
              <div className="flex items-center gap-2 mb-6 justify-center">
                <Hourglass size={24} className="text-primary" weight="bold" />
                <p className="font-kids text-xl text-text-main transition-colors">Berapa lama gejala ini?</p>
              </div>
              <div className="flex flex-col gap-3">
                {["Baru hari ini", "1 - 2 Hari", "Lebih dari 3 hari"].map((d) => (
                  <button
                    key={d}
                    onClick={() => handleChatNext({ duration: d })}
                    className="p-5 border-2 border-border-soft bg-bg rounded-2xl hover:border-primary hover:bg-primary/5 transition-all font-bold text-text-main shadow-sm"
                  >
                    {d}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 5: ANALYZING */}
          {chatStep === 5 && (
            <div className="py-10 text-center">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-full h-full border-4 border-primary/20 border-t-primary rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center text-primary">
                  <Brain size={40} weight="duotone" className="animate-pulse" />
                </div>
              </div>
              <p className="text-text-main font-kids text-2xl mb-2 transition-colors">Menganalisis Gejala...</p>
              <p className="text-[10px] text-text-muted font-black uppercase tracking-[0.2em] transition-colors">
                Database Medis Standar IDAI
              </p>
            </div>
          )}

          {/* STEP 6: RESULT */}
          {chatStep === 6 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
              
              {/* Summary Card */}
              <div className="bg-bg p-6 rounded-[2rem] border border-border-soft mb-5 relative overflow-hidden transition-colors">
                <div className="flex items-center gap-3 text-text-main font-kids text-lg mb-4">
                  <FileText size={24} weight="duotone" className="text-primary" /> Ringkasan Laporan
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Usia", val: chatData.age },
                    { label: "Keluhan", val: chatData.symptom },
                    { label: "Durasi", val: chatData.duration }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-card p-2 px-4 rounded-xl border border-border-soft transition-colors">
                      <span className="text-[11px] font-black text-text-muted uppercase tracking-tighter">{item.label}</span>
                      <span className="text-sm font-bold text-text-main">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Card */}
              <div className="bg-secondary/10 p-7 rounded-[2.5rem] border border-secondary/20 mb-8 transition-colors">
                <div className="flex items-center gap-3 text-secondary font-kids text-lg mb-4">
                  <FirstAid size={24} weight="fill" /> Tindakan Awal
                </div>
                <ul className="space-y-3 text-[13px] text-text-main font-medium opacity-90">
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                    Berikan ASI/Cairan lebih sering untuk mencegah dehidrasi.
                  </li>
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                    Pastikan suhu ruangan sejuk dan si kecil menggunakan pakaian tipis.
                  </li>
                </ul>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-4">
                <a
                  href={`https://wa.me/628123456789?text=Halo Dokter, saya Moms ${user?.name || ""}. Anak saya (${chatData.age}) mengalami ${chatData.symptom} selama ${chatData.duration}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary text-white py-5 rounded-[1.8rem] font-bold text-center shadow-xl shadow-primary/20 hover:brightness-110 transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest"
                >
                  <WhatsappLogo size={22} weight="fill" /> Kirim ke Dokter
                </a>
                <button
                  onClick={onClose}
                  className="py-2 text-text-muted font-bold text-xs uppercase tracking-widest hover:text-text-main transition-colors"
                >
                  Tutup Diagnosa
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AIChatModal;