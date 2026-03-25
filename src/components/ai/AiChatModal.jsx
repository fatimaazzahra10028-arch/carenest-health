import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-blue-900/30 backdrop-blur-md p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white relative"
      >
        {/* Header Modal */}
        <div className="bg-primary p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
              🤖
            </div>
            <div>
              <h3 className="font-bold">MomsBot AI</h3>
              <p className="text-[10px] opacity-80 uppercase tracking-widest">
                Diagnostic Assistant
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Chat Content with Scroll */}
        <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar flex flex-col items-center">
          {chatStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="text-4xl mb-4">👋</div>
              <h4 className="text-xl font-kids text-slate-800 mb-2">
                Halo Moms {user?.name || ""}!
              </h4>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Saya asisten pintar MomsCare. Mari lakukan pengecekan gejala
                awal si kecil sebelum berkonsultasi dengan dokter.
              </p>
              <button
                onClick={() => handleChatNext({})}
                className="bg-primary text-white w-full py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:brightness-110 transition-all"
              >
                Mulai Screening Sekarang
              </button>
            </motion.div>
          )}

          {chatStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full"
            >
              <p className="font-bold text-slate-700 mb-6 text-center">
                Berapa usia si kecil saat ini?
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["0-6 Bulan", "6-12 Bulan", "1-3 Tahun", "3 Tahun+"].map(
                  (age) => (
                    <button
                      key={age}
                      onClick={() => handleChatNext({ age })}
                      className="p-4 border-2 border-slate-100 rounded-2xl hover:border-primary hover:bg-blue-50 transition-all font-medium text-slate-600 text-sm"
                    >
                      {age}
                    </button>
                  ),
                )}
              </div>
            </motion.div>
          )}

          {chatStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full"
            >
              <p className="font-bold text-slate-700 mb-6 text-center">
                Apa keluhan utama yang Moms rasakan pada si kecil?
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Demam / Panas",
                  "Batuk & Pilek",
                  "Masalah Pencernaan / GTM",
                  "Bintik Merah / Alergi",
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleChatNext({ symptom: s })}
                    className="p-4 border-2 border-slate-100 rounded-2xl hover:border-primary hover:bg-blue-50 transition-all font-medium text-slate-600 text-left flex items-center gap-3"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary/40"></span>{" "}
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {chatStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full"
            >
              <p className="font-bold text-slate-700 mb-6 text-center">
                Sudah berapa lama gejala ini berlangsung?
              </p>
              <div className="flex flex-col gap-3">
                {["Baru hari ini", "1 - 2 Hari", "Lebih dari 3 hari"].map(
                  (d) => (
                    <button
                      key={d}
                      onClick={() => handleChatNext({ duration: d })}
                      className="p-4 border-2 border-slate-100 rounded-2xl hover:border-primary hover:bg-blue-50 transition-all font-medium text-slate-600 text-left"
                    >
                      {d}
                    </button>
                  ),
                )}
              </div>
            </motion.div>
          )}

          {chatStep === 5 && (
            <div className="py-10 text-center">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                  }}
                  className="w-full h-full border-4 border-primary border-t-transparent rounded-full"
                ></motion.div>
                <div className="absolute inset-0 flex items-center justify-center text-2xl">
                  🧠
                </div>
              </div>
              <p className="text-slate-500 font-bold animate-pulse">
                AI sedang menganalisis gejala...
              </p>
              <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-tighter italic">
                Mencocokkan dengan Database Medis Standar
              </p>
            </div>
          )}

          {chatStep === 6 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full text-left"
            >
              <div className="bg-blue-50 p-6 rounded-[2rem] border-2 border-blue-100 mb-4 relative overflow-hidden">
                <div className="flex items-center gap-2 text-primary font-bold mb-3">
                  <span className="text-xl">📊</span> Ringkasan Laporan
                </div>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between border-b border-blue-100 pb-1">
                    <span>Usia:</span>
                    <span className="font-bold">{chatData.age}</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-100 pb-1">
                    <span>Keluhan:</span>
                    <span className="font-bold">{chatData.symptom}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Durasi:</span>
                    <span className="font-bold">{chatData.duration}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-[2rem] border-2 border-green-100 mb-6 relative">
                <div className="flex items-center gap-2 text-green-700 font-bold mb-3">
                  <span className="text-xl">🩺</span> Analisis & Tindakan
                </div>
                <p className="text-sm text-green-800 leading-relaxed font-medium">
                  Gejala menunjukkan respon pertahanan tubuh awal.
                </p>
                <ul className="mt-3 space-y-2 text-[13px] text-green-700 list-disc pl-4">
                  <li>Lakukan kompres air hangat di area ketiak/lipatan.</li>
                  <li>
                    Berikan ASI/Cairan lebih sering untuk cegah dehidrasi.
                  </li>
                  <li>Pastikan suhu ruangan sejuk dan nyaman.</li>
                  <li>Gunakan pakaian tipis yang menyerap keringat.</li>
                </ul>
                <div className="mt-4 p-3 bg-white/50 rounded-xl text-[11px] text-green-800 italic">
                  "Pantau suhu tubuh setiap 4 jam. Segera ke dokter jika suhu
                  diatas 38°C atau si kecil lemas."
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={`https://wa.me/628123456789?text=Halo Dokter, saya Moms ${user?.name || ""}. Hasil screening AI menunjukkan anak saya (${chatData.age}) mengalami ${chatData.symptom} selama ${chatData.duration}. Mohon arahannya.`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary text-white py-4 rounded-2xl font-bold text-center shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  🚀 Kirim Hasil ke Dokter
                </a>
                <button
                  onClick={() => setShowAIChat(false)}
                  className="py-3 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors text-center"
                >
                  Tutup
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
