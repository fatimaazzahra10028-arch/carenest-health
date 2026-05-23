import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  User,
  ShareNetwork,
  BookmarkSimple,
  Clock,
  ChatCircleDots,
  Quotes,
  Sparkle,
  CheckCircle,
  CaretRight,
  StopCircle,
  PlayCircle,
  Newspaper,
  Heartbeat,
  ShieldCheck,
  Printer,
} from "@phosphor-icons/react";

const BlogDetail = ({
  article,
  onBack,
  allArticles = [],
  onArticleClick,
  onConsultClick,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (article?.id) {
      const savedData = localStorage.getItem("momscare_favorites");
      const favorites = savedData ? JSON.parse(savedData) : [];
      setIsSaved(favorites.some((fav) => fav.id === article.id));
    }
    return () => window.speechSynthesis.cancel();
  }, [article]);

  const relatedArticles = useMemo(() => {
    if (!allArticles.length || !article) return [];
    const currentCat = article.categoryId || article.category;
    return allArticles
      .filter(
        (item) =>
          (item.categoryId || item.category) == currentCat &&
          item.id !== article.id,
      )
      .slice(0, 4);
  }, [allArticles, article]);

  const handleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const contentText = article.content?.map((c) => c.text).join(". ") || "";
    const utterance = new SpeechSynthesisUtterance(
      `${article.title}. ${article.desc}. ${contentText}`,
    );
    const idVoice = voices.find((v) => v.lang.startsWith("id"));
    if (idVoice) utterance.voice = idVoice;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const toggleFavorite = () => {
    const savedData = localStorage.getItem("momscare_favorites");
    let favorites = savedData ? JSON.parse(savedData) : [];
    if (isSaved) {
      favorites = favorites.filter((fav) => fav.id !== article.id);
      setToastMessage("Dihapus dari koleksi");
      setIsSaved(false);
    } else {
      favorites.push({ ...article, savedAt: new Date().toISOString() });
      setToastMessage("Berhasil disimpan!");
      setIsSaved(true);
    }
    localStorage.setItem("momscare_favorites", JSON.stringify(favorites));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  if (!article) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-bg transition-colors duration-500 font-outfit overflow-x-hidden"
    >
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-10 left-1/2 z-[100] bg-text-main text-bg px-6 py-3 rounded-2xl shadow-soft flex items-center gap-3 text-sm font-bold border border-white/10"
          >
            <CheckCircle size={22} weight="fill" className="text-secondary" />{" "}
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header */}
      <div className="relative h-[45vh] md:h-[55vh] w-full">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={article.img}
            alt=""
            className="w-full h-full object-cover brightness-[0.8] dark:brightness-[0.5]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
        </div>

        <div className="relative z-30 max-w-7xl mx-auto px-6 pt-8 flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-card/80 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-soft text-primary font-bold border border-border-soft hover:scale-105 transition-all"
          >
            <ArrowLeft size={20} weight="bold" /> <span>Kembali</span>
          </button>
          <div className="bg-primary text-bg px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
            {article.category || "Edukasi"}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-40 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <main className="lg:w-[68%] w-full">
            <article className="bg-card rounded-5xl p-8 md:p-14 shadow-soft border border-border-soft transition-colors duration-500">
              <h1 className="text-3xl md:text-5xl font-kids text-text-main leading-tight mb-8">
                {article.title}
              </h1>

              <div className="flex items-center gap-5 p-6 bg-primary/10 rounded-3xl mb-12 border border-primary/20">
                <button
                  onClick={handleSpeech}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg ${isSpeaking ? "bg-red-500 text-white animate-pulse" : "bg-primary text-bg hover:scale-105"}`}
                >
                  {isSpeaking ? (
                    <StopCircle size={32} weight="fill" />
                  ) : (
                    <PlayCircle size={32} weight="fill" />
                  )}
                </button>
                <div className="flex-1">
                  <h4 className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">
                    MomsCare Reader
                  </h4>
                  <p className="text-sm text-text-muted font-medium">
                    {isSpeaking
                      ? "Membacakan artikel..."
                      : "Dengarkan via suara"}
                  </p>
                </div>
              </div>

              <div className="relative mb-12 p-8 bg-bg/50 rounded-3xl italic text-text-muted text-lg leading-relaxed border-l-4 border-primary">
                <Quotes
                  size={40}
                  weight="fill"
                  className="text-primary/10 absolute top-4 right-6"
                />
                {article.desc}
              </div>

              <div className="space-y-8 text-text-muted text-lg leading-relaxed font-medium">
                {article.content?.map((block, idx) =>
                  block.type === "subtitle" ? (
                    <h2
                      key={idx}
                      className="text-2xl md:text-3xl font-kids text-text-main pt-6"
                    >
                      {block.text}
                    </h2>
                  ) : (
                    <p key={idx}>{block.text}</p>
                  ),
                )}
              </div>

              {article.steps && (
                <div className="mt-14 p-8 md:p-10 bg-primary/5 rounded-[2.5rem] border border-primary/10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-primary text-bg rounded-2xl">
                      <Sparkle size={24} weight="fill" />
                    </div>
                    <h3 className="text-2xl font-kids text-text-main">
                      Langkah Praktis
                    </h3>
                  </div>
                  <div className="space-y-6">
                    {article.steps.map((step, i) => (
                      <div key={i} className="flex gap-5 items-start">
                        <div className="w-8 h-8 rounded-lg bg-primary text-bg flex items-center justify-center shrink-0 font-black text-sm">
                          {i + 1}
                        </div>
                        <p className="text-text-main font-semibold pt-0.5 leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-16 pt-10 border-t border-border-soft flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex gap-3 w-full md:w-auto">
                  <button
                    onClick={toggleFavorite}
                    className={`flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all shadow-soft border border-border-soft ${isSaved ? "bg-primary text-bg" : "bg-bg text-text-muted"}`}
                  >
                    <BookmarkSimple
                      size={24}
                      weight={isSaved ? "fill" : "bold"}
                    />{" "}
                    {isSaved ? "Tersimpan" : "Simpan"}
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="p-4 bg-bg rounded-2xl text-text-muted hover:text-primary transition-all border border-border-soft shadow-soft"
                  >
                    <Printer size={24} />
                  </button>
                </div>
                <button
                  onClick={onConsultClick}
                  className="w-full md:w-auto bg-secondary text-text-main px-10 py-4 rounded-2xl font-bold shadow-soft flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all"
                >
                  <ChatCircleDots size={26} weight="fill" /> Tanya AI MomsCare
                </button>
              </div>
            </article>
          </main>

          <aside className="lg:w-[32%] w-full space-y-8 lg:sticky lg:top-24">
            {/* Meta Info */}
            <div className="bg-card p-8 rounded-4xl border border-border-soft shadow-soft transition-colors duration-500">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border-soft">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <User size={28} weight="duotone" />
                </div>
                <div>
                  <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">
                    Penulis
                  </p>
                  <p className="text-base font-bold text-text-main">
                    {article.author || "Tim MomsCare"}
                  </p>
                </div>
              </div>
              <div className="space-y-5">
                <div className="flex items-center gap-4 text-sm font-bold text-text-muted">
                  <Calendar size={22} className="text-primary" /> {article.date}
                </div>
                <div className="flex items-center gap-4 text-sm font-bold text-text-muted">
                  <Clock size={22} className="text-primary" />{" "}
                  {article.readTime || "5 Menit"}
                </div>
                <div className="flex items-center gap-4 text-sm font-bold text-green-500">
                  <ShieldCheck size={22} weight="fill" /> Verifikasi Medis
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-kids text-text-main flex items-center gap-3 px-2">
                <Heartbeat
                  size={28}
                  weight="duotone"
                  className="text-red-500"
                />{" "}
                Topik Terkait
              </h3>
              <div className="grid gap-4">
                {relatedArticles.length > 0 ? (
                  relatedArticles.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ x: 10 }}
                      onClick={() => onArticleClick(item)}
                      className="bg-card p-3 rounded-3xl border border-border-soft flex gap-4 cursor-pointer group shadow-soft hover:border-primary/30 transition-all"
                    >
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                        <img
                          src={item.img}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-xs font-bold text-text-main line-clamp-2 group-hover:text-primary transition-colors mb-1">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-1 text-primary text-[10px] font-black uppercase">
                          Baca <CaretRight weight="bold" />
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="bg-card p-8 rounded-3xl border border-dashed border-border-soft text-center italic text-text-muted text-sm">
                    Belum ada topik serupa.
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetail;
