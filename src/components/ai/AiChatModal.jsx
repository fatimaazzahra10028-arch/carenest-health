import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import { 
  Robot, X, WhatsappLogo, CaretRight, 
  PaperPlaneRight, Smiley, Stethoscope,
  BookOpenText, DotsThreeOutline, CaretLeft,
  Lightbulb
} from "@phosphor-icons/react";

const AIChatModal = ({ isOpen, onClose, user }) => {
  const [view, setView] = useState("chat"); 
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const scrollRef = useRef(null);

  const [consultData, setConsultData] = useState({ age: "", symptom: "", duration: "" });

  // Pertanyaan yang direkomendasikan
  const quickQuestions = [
    "Cara rawat tali pusar?",
    "Tanda bayi kuning?",
    "Tips MPASI 6 bulan",
    "Anak susah makan",
    "Posisi gendong M-Shape"
  ];

  const articleDb = [
    { 
      id: 1, 
      tags: ["tali pusar", "pusar", "newborn", "infeksi", "puser"], 
      title: "perawatan tali pusar bayi baru lahir", 
      link: "/blog/1",
      proAnswer: "untuk perawatan tali pusar, kuncinya adalah 'dry care'. biarkan area pusar kering secara alami, jangan gunakan alkohol atau bedak. pastikan popok dilipat di bawah pusar agar tidak lembap terkena urin."
    },
    { 
      id: 13, 
      tags: ["kuning", "ikterus", "bayi kuning", "bilirubin", "jemur"], 
      title: "mengenali tanda bayi kuning (ikterus)", 
      link: "/blog/13",
      proAnswer: "bayi kuning atau ikterus wajar terjadi di minggu pertama. namun, moms perlu waspada jika kuningnya sudah mencapai perut atau kaki. pastikan si kecil menyusu 8-12 kali sehari untuk membuang bilirubin lewat urin."
    },
    { 
      id: 2, 
      tags: ["gendong", "m-shape", "mshape", "panggul", "gendongan"], 
      title: "teknik menggendong m-shape yang aman", 
      link: "/blog/2",
      proAnswer: "posisi m-shape sangat baik untuk pertumbuhan tulang panggul. pastikan lutut bayi lebih tinggi dari bokong dan punggungnya membentuk kurva huruf c yang alami."
    },
    { 
      id: 3, 
      tags: ["mpasi", "makan", "6 bulan", "menu 4 bintang", "gizi"], 
      title: "jadwal mpasi pertama: menu 4 bintang", 
      link: "/blog/3",
      proAnswer: "saat mulai mpasi di usia 6 bulan, moms bisa gunakan menu 4 bintang: karbohidrat, protein hewani (utama), protein nabati, dan sedikit sayur sebagai perkenalan serat."
    },
    { 
      id: 5, 
      tags: ["pilih makanan", "picky eater", "susah makan", "batita"], 
      title: "anak pilih-pilih makanan? ini solusinya", 
      link: "/blog/5",
      proAnswer: "fase picky eater itu normal pada batita. tipsnya: jangan paksa anak makan, sajikan dalam porsi kecil yang menarik, dan ajak si kecil makan bersama keluarga."
    }
  ];

  const fuse = new Fuse(articleDb, {
    keys: ["tags", "title"],
    threshold: 0.4
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setSuggestions([]);
      setView("chat");
    } else {
      setMessages([{ 
        role: "bot", 
        content: `halo moms ${user?.name || "putri"}! ✨ ada yang ingin ditanyakan seputar kesehatan si kecil hari ini?` 
      }]);
    }
  }, [isOpen, user]);

  const processChat = (text) => {
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsTyping(true);
    setSuggestions([]);

    setTimeout(() => {
      const searchResults = fuse.search(text.toLowerCase());
      if (searchResults.length > 0) {
        const bestMatch = searchResults[0].item;
        setMessages((prev) => [...prev, { role: "bot", content: bestMatch.proAnswer }]);
        setSuggestions(searchResults.map(r => r.item));
      } else {
        setMessages((prev) => [...prev, { 
          role: "bot", 
          content: "mohon maaf moms, saya belum menemukan jawaban spesifik. tapi moms bisa coba konsultasi langsung dengan dokter spesialis kami." 
        }]);
      }
      setIsTyping(false);
    }, 1200);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    processChat(inputValue);
    setInputValue("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-900/10 backdrop-blur-md p-4 font-outfit">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-lg h-[85vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-white"
      >
        {/* Header */}
        <div className="p-5 flex justify-between items-center border-b border-slate-50">
          <div className="flex items-center gap-3">
            {view === "form" && <CaretLeft size={24} onClick={() => setView("chat")} className="cursor-pointer" />}
            <div className="w-10 h-10 bg-[#8da8c3]/10 rounded-xl flex items-center justify-center text-[#8da8c3]">
              <Robot size={24} weight="duotone" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">momsbot expert</h3>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">● online</p>
            </div>
          </div>
          <X size={24} className="text-slate-300 cursor-pointer" onClick={onClose} />
        </div>

        {/* Chat Area */}
        <div className="flex-grow p-6 overflow-y-auto bg-[#fcfdfe] space-y-6" ref={scrollRef}>
          <AnimatePresence>
            {view === "chat" ? (
              <>
                {messages.map((msg, i) => (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} className={`flex ${msg.role === "bot" ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[85%] px-5 py-3 text-sm leading-relaxed shadow-sm ${msg.role === "bot" ? "bg-white rounded-2xl rounded-bl-none text-slate-600 border border-slate-100" : "bg-[#8da8c3] text-white rounded-2xl rounded-br-none"}`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {/* Quick Questions (Hanya muncul jika baru mulai chat) */}
                {messages.length === 1 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {quickQuestions.map((q, i) => (
                      <button 
                        key={i} 
                        onClick={() => processChat(q)}
                        className="text-[11px] font-medium bg-white border border-slate-200 text-slate-500 px-4 py-2 rounded-full hover:border-[#8da8c3] hover:text-[#8da8c3] transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <Lightbulb size={14} weight="fill" className="text-amber-400" />
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {isTyping && <div className="text-xs text-slate-400 animate-pulse ml-2 italic">momsbot sedang mengetik...</div>}

                {/* Referensi Artikel */}
                {suggestions.length > 0 && (
                  <div className="pt-4 space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">rekomendasi artikel:</p>
                    {suggestions.map((art, i) => (
                      <a key={i} href={art.link} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-all">
                        <span className="text-xs font-semibold text-slate-700">{art.title}</span>
                        <CaretRight size={14} />
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* View Form Konsultasi (Sama seperti sebelumnya) */
              <div className="p-2 text-center">
                 <Stethoscope size={48} weight="duotone" className="mx-auto text-[#8da8c3] mb-4" />
                 <h4 className="font-bold">konsultasi langsung</h4>
                 <p className="text-xs text-slate-400 mb-6">lengkapi data untuk dokter</p>
                 <input type="text" placeholder="Usia si kecil" className="w-full p-4 bg-slate-50 rounded-2xl mb-3 outline-none border-none text-sm" onChange={(e) => setConsultData({...consultData, age: e.target.value})} />
                 <input type="text" placeholder="Keluhan utama" className="w-full p-4 bg-slate-50 rounded-2xl mb-3 outline-none border-none text-sm" onChange={(e) => setConsultData({...consultData, symptom: e.target.value})} />
                 <button onClick={() => window.open(`https://wa.me/628123456789?text=Halo dokter...`, "_blank")} className="w-full bg-green-500 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2">
                   <WhatsappLogo size={20} weight="fill" /> kirim ke whatsapp
                 </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Input */}
        <div className="p-6 bg-white border-t border-slate-50">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tanya Momsbot..." 
              className="flex-grow p-4 bg-slate-50 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#8da8c3]/20 transition-all"
            />
            <button type="submit" className="bg-[#8da8c3] p-4 rounded-2xl text-white">
              <PaperPlaneRight size={22} weight="fill" />
            </button>
          </form>
          {view === "chat" && (
            <button onClick={() => setView("form")} className="w-full mt-3 text-[11px] font-bold text-slate-400 flex items-center justify-center gap-2">
              <Stethoscope size={16} /> butuh bantuan dokter? klik di sini
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AIChatModal;