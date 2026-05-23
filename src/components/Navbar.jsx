import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  UserPlus,
  Info,
  PhoneCall,
  House,
  UserCircle,
  SignOut,
  BookmarkSimple,
  Moon,
  Sun,
  Star,
  Question,
  List,
  X,
  CaretRight,
  Bell,
  CheckCircle,
  ChatTeardropText,
  Megaphone,
} from "@phosphor-icons/react";
import { useAuth } from "../context/AuthContext";

const Navbar = ({
  onOpenAuth,
  onOpenFavorites,
  onGoHome,
  isFavoritePage,
  onOpenAbout,
  onOpenContact,
  onOpenFeatured,
  onOpenFaq,
  activePage = "home",
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { user, logout } = useAuth();

  const notifRef = useRef(null);

  const [notifications] = useState([
    {
      id: 1,
      text: "Waktunya si kecil imunisasi DPT besok!",
      type: "urgent",
      time: "2 jam yang lalu",
    },
    {
      id: 2,
      text: "Artikel baru: 5 Cara Stimulasi Bayi 3 Bulan",
      type: "info",
      time: "5 jam yang lalu",
    },
    {
      id: 3,
      text: "Moms, ada promo vitamin anak di toko partner!",
      type: "promo",
      time: "1 hari yang lalu",
    },
  ]);

  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("momscare_theme") === "dark",
  );

  useEffect(() => {
    const root = window.document.documentElement;
    isDarkMode ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("momscare_theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target))
        setIsNotifOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    {
      label: "Beranda",
      icon: <House size={22} weight="duotone" />,
      action: onGoHome,
      id: "home",
      color: "bg-primary text-primary",
    },
    {
      label: "Fitur Unggulan",
      icon: <Star size={22} weight="duotone" />,
      action: onOpenFeatured,
      id: "featured",
      color: "bg-primary text-primary",
    },
    {
      label: "Tentang Kami",
      icon: <Info size={22} weight="duotone" />,
      action: onOpenAbout,
      id: "about",
      color: "bg-primary text-primary",
    },
    {
      label: "Tanya Jawab",
      icon: <Question size={22} weight="duotone" />,
      action: onOpenFaq,
      id: "faq",
      color: "bg-primary text-primary",
    },
    {
      label: "Kontak",
      icon: <PhoneCall size={22} weight="duotone" />,
      action: onOpenContact,
      id: "contact",
      color: "bg-primary text-primary",
    },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 md:top-4 z-[100] transition-all duration-500 mx-0 md:mx-12 flex justify-between items-center px-6
          ${
            isScrolled
              ? "py-3 bg-card/90 backdrop-blur-xl shadow-soft border-b md:border border-primary/20 md:rounded-[2rem]"
              : "py-5 bg-card/70 backdrop-blur-lg border-b md:border border-border-soft md:rounded-[2rem]"
          }`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2.5 bg-bg dark:bg-primary/10 rounded-xl text-text-main border border-border-soft hover:border-primary/50 transition-all active:scale-90"
          >
            <List size={26} weight="bold" />
          </button>

          <div
            className="flex items-center gap-2 group cursor-pointer"
            onClick={onGoHome}
          >
            <div className="bg-primary shadow-lg shadow-primary/30 p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <Heart size={24} weight="fill" className="text-white" />
            </div>
            <span className="font-kids text-2xl text-text-main font-bold tracking-tight">
              Moms<span className="text-primary">Care</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className={`p-2.5 rounded-full border transition-all relative ${isNotifOpen ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-bg text-text-muted border-border-soft hover:text-primary"}`}
            >
              <Bell size={22} weight={isNotifOpen ? "fill" : "bold"} />
              {notifications.length > 0 && (
                <span
                  className={`absolute top-2 right-2 w-3 h-3 bg-red-500 border-2 rounded-full animate-pulse ${isNotifOpen ? "border-primary" : "border-card"}`}
                ></span>
              )}
            </button>

            <AnimatePresence>
              {isNotifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-80 bg-card border border-border-soft rounded-[2rem] shadow-2xl z-[150] overflow-hidden"
                >
                  <div className="p-5 border-b border-border-soft bg-primary/5 flex justify-between items-center">
                    <span className="font-bold text-sm text-text-main">
                      Pusat Notifikasi
                    </span>
                    <span className="bg-primary/20 text-primary text-[10px] px-2 py-1 rounded-full font-black uppercase">
                      Baru
                    </span>
                  </div>
                  <div className="max-h-[350px] overflow-y-auto scrollbar-hide">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-4 border-b border-border-soft hover:bg-bg transition-colors cursor-pointer flex gap-4 group"
                      >
                        <div
                          className={`mt-1 p-2.5 rounded-xl h-fit shrink-0 ${n.type === "urgent" ? "bg-red-100 text-red-500" : n.type === "promo" ? "bg-amber-100 text-amber-500" : "bg-blue-100 text-blue-500"} dark:bg-white/5`}
                        >
                          {n.type === "urgent" ? (
                            <CheckCircle size={20} weight="fill" />
                          ) : n.type === "promo" ? (
                            <Megaphone size={20} weight="fill" />
                          ) : (
                            <ChatTeardropText size={20} weight="fill" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-text-main leading-relaxed font-semibold group-hover:text-primary transition-colors">
                            {n.text}
                          </p>
                          <p className="text-[10px] text-text-muted mt-1.5 font-medium">
                            {n.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-full bg-bg text-text-muted border border-border-soft hover:text-primary transition-all hidden sm:flex"
          >
            {isDarkMode ? (
              <Sun size={22} weight="fill" className="text-amber-400" />
            ) : (
              <Moon size={22} weight="bold" />
            )}
          </button>

          <button
            onClick={onOpenFavorites}
            className={`p-2.5 rounded-full border transition-all ${isFavoritePage ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-bg text-text-muted border-border-soft hover:border-primary/50"}`}
          >
            <BookmarkSimple
              size={22}
              weight={isFavoritePage ? "fill" : "bold"}
            />
          </button>

          <div
            className="relative ml-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait">
              {!user ? (
                <motion.button
                  key="login"
                  onClick={onOpenAuth}
                  className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <UserPlus size={20} weight="bold" />
                  <span className="hidden sm:inline">Masuk</span>
                </motion.button>
              ) : (
                <motion.div
                  key="user"
                  className="w-11 h-11 rounded-full bg-primary/10 p-0.5 border-2 border-primary hover:scale-105 transition-all cursor-pointer shadow-soft"
                >
                  <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white">
                    <UserCircle size={32} weight="fill" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isHovered && user && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-72 bg-card border border-border-soft rounded-[2rem] shadow-2xl z-[150] overflow-hidden"
                >
                  <div className="bg-primary/5 p-6 border-b border-border-soft flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg">
                      <UserCircle size={32} weight="fill" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-1">
                        Moms Profile
                      </p>
                      <p className="font-bold text-text-main truncate">
                        {user.name}
                      </p>
                    </div>
                  </div>
                  <div className="p-3">
                    <button className="flex items-center justify-between w-full p-4 hover:bg-bg rounded-2xl transition-all text-sm font-bold text-text-muted hover:text-primary group">
                      <div className="flex items-center gap-3">
                        <UserCircle
                          size={20}
                          weight="duotone"
                          className="text-primary"
                        />
                        <span>Pengaturan Akun</span>
                      </div>
                      <CaretRight size={14} weight="bold" />
                    </button>
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 w-full p-4 hover:bg-red-500/10 rounded-2xl transition-all text-sm text-red-500 font-bold group"
                    >
                      <SignOut
                        size={20}
                        weight="bold"
                        className="group-hover:translate-x-1 transition-transform"
                      />
                      <span>Keluar Sesi</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[200]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[320px] bg-card z-[210] shadow-2xl p-8 flex flex-col rounded-r-[3rem] border-r border-border-soft transition-colors duration-500"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <div className="bg-primary p-2 rounded-xl text-white shadow-lg">
                    <Heart size={22} weight="fill" />
                  </div>
                  <span className="font-kids text-2xl text-text-main font-bold tracking-tight">
                    Moms<span className="text-primary">Care</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 bg-gray-500/10 text-charcoal rounded-full hover:rotate-90 transition-transform"
                >
                  <X size={24} weight="bold" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.action();
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all font-bold group ${activePage === item.id ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-text-muted hover:bg-bg hover:text-primary"}`}
                  >
                    <div
                      className={`p-2.5 rounded-xl transition-colors shrink-0 ${activePage === item.id ? "bg-white/20" : item.color} dark:bg-white/5`}
                    >
                      {item.icon}
                    </div>
                    <span className="text-base">{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-auto p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 text-center">
                  MomsCare - love
                </p>
                <p className="text-[11px] text-text-muted text-center leading-relaxed">
                  Dibuat dengan penuh cinta untuk kesehatan si kecil.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
