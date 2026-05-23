import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CaretLeft,
  CaretRight,
  Clock,
  User,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { allArticles, categories } from "../../data/blogData";

const TopicPage = ({ categoryId, onBack, onArticleClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categoryId, currentPage]);

  const categoryInfo = useMemo(() => {
    return categories?.find((c) => c.id === categoryId) || null;
  }, [categoryId]);

  const topicArticles = useMemo(() => {
    return allArticles?.filter((art) => art.categoryId === categoryId) || [];
  }, [categoryId]);

  const totalPages = Math.ceil(topicArticles.length / articlesPerPage);
  const currentArticles = topicArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage,
  );

  if (!categoryInfo) return null;

  return (
    <div className="min-h-screen bg-[#F9FBFC] font-outfit pb-20">
      {/* Header Kecil & Elegan */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm"
          >
            <CaretLeft weight="bold" /> Kembali
          </button>
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black text-primary uppercase tracking-widest">
              Category
            </span>
            <span className="font-kids text-lg text-slate-800 leading-none">
              {categoryInfo.age}
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 mt-10">
        <header className="mb-10">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-kids text-slate-900 mb-2">
              Edukasi{" "}
              <span className="text-primary italic">{categoryInfo.age}</span>
            </h1>
            <p className="text-slate-400 text-sm font-medium tracking-tight">
              Ditemukan {topicArticles.length} materi edukasi pilihan untuk Moms
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <AnimatePresence mode="wait">
            {currentArticles.map((article, index) => {
              const isLarge = index === 0 || index === 3;
              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => onArticleClick(article)}
                  className={`group cursor-pointer relative ${isLarge ? "md:col-span-7" : "md:col-span-5"}`}
                >
                  <div className="h-full bg-white border border-slate-100 rounded-[2rem] p-3 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 flex flex-col">
                    <div
                      className={`relative overflow-hidden rounded-[1.6rem] ${isLarge ? "h-52 md:h-64" : "h-44"}`}
                    >
                      <img
                        src={article.img}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        alt=""
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-bold text-primary">
                        {article.date}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                          Oleh {article.author}
                        </span>
                      </div>

                      <h3
                        className={`font-kids text-slate-800 group-hover:text-primary transition-colors leading-tight mb-2 italic ${isLarge ? "text-xl md:text-2xl" : "text-lg"}`}
                      >
                        {article.title}
                      </h3>

                      <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed">
                        {article.desc}
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-50">
                        <span className="text-[10px] font-bold text-primary uppercase">
                          Baca Selengkapnya
                        </span>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-45">
                          <ArrowUpRight size={14} weight="bold" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-50 disabled:opacity-20 transition-all text-slate-500"
              >
                <CaretLeft weight="bold" size={16} />
              </button>

              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                      currentPage === i + 1
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "text-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-50 disabled:opacity-20 transition-all text-slate-500"
              >
                <CaretRight weight="bold" size={16} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TopicPage;
