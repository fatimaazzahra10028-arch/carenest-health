import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import {
  Robot,
  X,
  WhatsappLogo,
  CaretRight,
  PaperPlaneRight,
  Stethoscope,
  CaretLeft,
  Lightbulb,
} from "@phosphor-icons/react";

const AIChatModal = ({ isOpen, onClose, user }) => {
  const [view, setView] = useState("chat");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const scrollRef = useRef(null);

  const [consultData, setConsultData] = useState({ age: "", symptom: "" });

  const quickQuestions = [
    "Cara rawat tali pusar?",
    "Tanda bayi kuning?",
    "Tips MPASI 6 bulan",
    "Anak susah makan",
    "Posisi gendong M-Shape",
  ];

  const articleDb = [
    {
      id: 1,
      tags: ["tali pusar", "pusar", "newborn", "infeksi"],
      title: "Perawatan Tali Pusar Bayi Baru Lahir",
      link: "/blog/1",
      proAnswer:
        "Untuk perawatan tali pusar, kuncinya adalah 'dry care'. Biarkan area pusar kering secara alami, jangan gunakan alkohol atau bedak.",
    },
    {
      id: 13,
      tags: ["kuning", "ikterus", "bayi kuning"],
      title: "Mengenali Tanda Bayi Kuning",
      link: "/blog/13",
      proAnswer:
        "Bayi kuning wajar terjadi di minggu pertama. Pastikan si kecil menyusu 8-12 kali sehari untuk membantu membuang bilirubin.",
    },
  ];

  const fuse = new Fuse(articleDb, { keys: ["tags", "title"], threshold: 0.4 });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setSuggestions([]);
      setView("chat");
    } else {
      setMessages([
        {
          role: "bot",
          content: `Halo Moms ${user?.name || "Putri"}! ✨ Ada yang ingin ditanyakan seputar kesehatan si kecil hari ini?`,
        },
      ]);
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
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: bestMatch.proAnswer },
        ]);
        setSuggestions(searchResults.map((r) => r.item));
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content:
              "Mohon maaf Moms, saya belum menemukan jawaban spesifik. Tapi Moms bisa coba konsultasi langsung dengan dokter spesialis kami.",
          },
        ]);
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
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/20 dark:bg-black/40 backdrop-blur-md p-4 font-outfit">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card w-full max-w-lg h-[85vh] rounded-[2.5rem] shadow-soft overflow-hidden flex flex-col border border-border-soft transition-colors duration-500"
      >
        {/* Header - Menggunakan text-text-main */}
        <div className="p-6 flex justify-between items-center border-b border-border-soft">
          <div className="flex items-center gap-3">
            {view === "form" && (
              <CaretLeft
                size={24}
                onClick={() => setView("chat")}
                className="cursor-pointer text-text-main"
              />
            )}
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
              <Robot size={28} weight="duotone" />
            </div>
            <div>
              <h3 className="font-bold text-text-main text-lg leading-none">
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-bg rounded-full transition-colors"
          >
            <X size={24} className="text-text-muted" />
          </button>
        </div>

        <div
          className="flex-grow p-6 overflow-y-auto bg-bg/50 space-y-6 scrollbar-hide"
          ref={scrollRef}
        >
          <AnimatePresence>
            {view === "chat" ? (
              <>
                {messages.map((msg, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i}
                    className={`flex ${msg.role === "bot" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[85%] px-5 py-3.5 text-sm leading-relaxed shadow-soft ${
                        msg.role === "bot"
                          ? "bg-card rounded-3xl rounded-bl-none text-text-main border border-border-soft"
                          : "bg-primary text-white rounded-3xl rounded-br-none shadow-primary/20"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {messages.length === 1 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {quickQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => processChat(q)}
                        className="text-[11px] font-bold bg-card border border-border-soft text-text-muted px-4 py-2.5 rounded-full hover:border-primary hover:text-primary transition-all flex items-center gap-2 shadow-sm"
                      >
                        <Lightbulb
                          size={14}
                          weight="fill"
                          className="text-amber-400"
                        />
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {isTyping && (
                  <div className="text-xs text-primary font-bold animate-pulse ml-2 italic">
                    MomsBot sedang mengetik...
                  </div>
                )}

                {suggestions.length > 0 && (
                  <div className="pt-4 space-y-2">
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest px-2">
                      Rekomendasi Artikel:
                    </p>
                    {suggestions.map((art, i) => (
                      <a
                        key={i}
                        href={art.link}
                        className="flex items-center justify-between p-4 bg-card border border-border-soft rounded-2xl hover:shadow-md transition-all group"
                      >
                        <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors">
                          {art.title}
                        </span>
                        <CaretRight size={16} className="text-primary" />
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="p-4 text-center space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                  <Stethoscope size={40} weight="duotone" />
                </div>
                <div>
                  <h4 className="font-kids text-xl text-text-main">
                    Konsultasi Langsung
                  </h4>
                  <p className="text-xs text-text-muted mt-1">
                    Lengkapi data singkat untuk dikirim ke Dokter Ahli
                  </p>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Usia si kecil (contoh: 6 bulan)"
                    className="w-full p-4 bg-card rounded-2xl outline-none border border-border-soft text-sm text-text-main focus:border-primary transition-all"
                    onChange={(e) =>
                      setConsultData({ ...consultData, age: e.target.value })
                    }
                  />
                  <textarea
                    placeholder="Keluhan utama Moms..."
                    rows="3"
                    className="w-full p-4 bg-card rounded-2xl outline-none border border-border-soft text-sm text-text-main focus:border-primary transition-all resize-none"
                    onChange={(e) =>
                      setConsultData({
                        ...consultData,
                        symptom: e.target.value,
                      })
                    }
                  />
                </div>
                <button
                  onClick={() =>
                    window.open(
                      `https://wa.me/628123456789?text=Halo dokter...`,
                      "_blank",
                    )
                  }
                  className="w-full bg-green-500 hover:bg-green-600 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-green-500/20 transition-all active:scale-95"
                >
                  <WhatsappLogo size={24} weight="fill" /> Kirim ke WhatsApp
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 bg-card border-t border-border-soft">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tanya MomsBot..."
              className="flex-grow p-4 bg-bg rounded-2xl text-sm outline-none border border-border-soft focus:ring-2 focus:ring-primary/20 text-text-main placeholder:text-text-muted transition-all"
            />
            <button
              type="submit"
              className="bg-primary p-4 rounded-2xl text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              <PaperPlaneRight size={22} weight="fill" />
            </button>
          </form>
          {view === "chat" && (
            <button
              onClick={() => setView("form")}
              className="w-full mt-4 text-[11px] font-bold text-text-muted hover:text-primary flex items-center justify-center gap-2 transition-colors"
            >
              <Stethoscope size={16} /> Butuh bantuan dokter spesialis? Klik di
              sini
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AIChatModal;
