import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Printer,
  ArrowLeft,
  Calendar,
  ShoppingCart,
  Clock,
  AppleLogo,
  Heartbeat,
  Info,
  Basket,
  CheckCircle,
  Fire,
  MagicWand,
  CookingPot,
  Star,
  Leaf,
  Baby,
  ArrowsClockwise,
} from "@phosphor-icons/react";

const MPASIPage = ({ onBack }) => {
  const [selectedDay, setSelectedDay] = useState("Senin");
  const [completedMeals, setCompletedMeals] = useState({});
  const [isChefMode, setIsChefMode] = useState(false);
  const [ageFilter, setAgeFilter] = useState("6-8");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const initialMenuData = {
    Senin: {
      theme: "Boster berat badan",
      pagi: "Hati ayam dan wortel",
      siang: "Puree alpukat mentega dan chia",
      malam: "Labu parang dan daging giling",
      ingredients: [
        "Hati ayam",
        "Labu parang",
        "Alpukat",
        "Beras putih",
        "Daging sapi giling",
      ],
    },
    Selasa: {
      theme: "Nutrisi kecerdasan otak",
      pagi: "Oatmeal dan kuning telur",
      siang: "Smoothie buah naga dan asi",
      malam: "Ikan salmon dan bayam jepang",
      ingredients: [
        "Salmon fillet",
        "Bayam",
        "Kuning telur",
        "Oatmeal",
        "Buah naga",
      ],
    },
    Rabu: {
      theme: "Zat besi tinggi",
      pagi: "Jagung dan daging sapi",
      siang: "Puree pepaya california dan jeruk baby",
      malam: "Tahu dan telur puyuh creamy",
      ingredients: [
        "Daging sapi",
        "Jagung manis",
        "Pepaya",
        "Telur puyuh",
        "Tahu sutra",
      ],
    },
    Kamis: {
      theme: "Kesehatan pencernaan",
      pagi: "Beras merah ikan kembung",
      siang: "Mashed banana dan cinnamon",
      malam: "Telur bebek dan tomat ungu",
      ingredients: [
        "Ikan kembung",
        "Beras merah",
        "Pisang ambon",
        "Telur bebek",
        "Tomat",
      ],
    },
    Jumat: {
      theme: "Penguat imun tubuh",
      pagi: "Mashed potato dan ayam kampung",
      siang: "Puree mangga gadung arumanis",
      malam: "Brokoli dan hati sapi",
      ingredients: [
        "Kentang",
        "Ayam kampung",
        "Mangga",
        "Hati sapi",
        "Brokoli",
      ],
    },
    Sabtu: {
      theme: "Spesial anti gtm",
      pagi: "Schotel nasi keju",
      siang: "Puree pir hijau dan mint",
      malam: "Gurame dan labu siam",
      ingredients: [
        "Ikan gurame",
        "Beras putih",
        "Pir hijau",
        "Labu siam",
        "Keju belcube",
      ],
    },
    Minggu: {
      theme: "Pesta akhir pekan",
      pagi: "Creamy chicken rice soup",
      siang: "Jeruk peras baby puree",
      malam: "Telur wortel",
      ingredients: [
        "Daging ayam",
        "Wortel",
        "Jeruk baby",
        "Beras",
        "Bawang putih",
      ],
    },
  };

  const [weeklyMenu, setWeeklyMenu] = useState(initialMenuData);

  const handleRefreshMenu = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      const days = Object.keys(initialMenuData);
      const shuffledValues = [...days].sort(() => Math.random() - 0.5);

      const newMenu = {};
      days.forEach((day, index) => {
        newMenu[day] = initialMenuData[shuffledValues[index]];
      });

      setWeeklyMenu(newMenu);
      setCompletedMeals({});
      setIsRefreshing(false);
    }, 800);
  };

  const textureMap = {
    "6-8": { label: "bubur halus / lumat", suffix: "lumat halus" },
    "9-11": { label: "bubur kasar / cincang", suffix: "cincang kasar" },
    "12+": { label: "nasi tim / menu keluarga", suffix: "padat sehat" },
  };

  const toggleMeal = (mealKey) => {
    setCompletedMeals((prev) => ({
      ...prev,
      [`${selectedDay}-${mealKey}`]: !prev[`${selectedDay}-${mealKey}`],
    }));
  };

  const getDynamicName = (baseName, mealTime) => {
    if (mealTime === "siang") return baseName;
    return `${baseName} ${textureMap[ageFilter].suffix}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen bg-bg text-text-main transition-colors duration-500">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          #print-area { display: block !important; visibility: visible !important; color: black !important; }
          body { background: white !important; }
        }
        .menu-container { min-height: 550px; }
      `}</style>

      <div className="no-print">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-4 bg-card rounded-4xl shadow-soft border border-border-soft text-text-muted"
            >
              <ArrowLeft size={24} weight="bold" />
            </motion.button>
            <div>
              <h2 className="text-4xl font-kids text-text-main tracking-tight">
                Mpasi planner
              </h2>
              <p className="text-sm font-medium text-text-muted italic">
                Nutrisi 4 bintang untuk tumbuh kembang optimal 2026
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRefreshMenu}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-6 py-4 rounded-4xl font-bold text-sm bg-card border border-border-soft text-primary shadow-soft hover:bg-primary/5 transition-all disabled:opacity-50"
            >
              <ArrowsClockwise
                size={20}
                className={isRefreshing ? "animate-spin" : ""}
              />
              {isRefreshing ? "Mengacak..." : "Acak Menu"}
            </button>

            <button
              onClick={() => setIsChefMode(!isChefMode)}
              className={`flex items-center gap-2 px-6 py-4 rounded-4xl font-bold text-sm shadow-soft transition-all ${isChefMode ? "bg-primary text-white" : "bg-card text-text-muted border border-border-soft"}`}
            >
              <MagicWand size={20} />{" "}
              {isChefMode ? "Mode chef aktif" : "Mode chef"}
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-primary text-white px-6 py-4 rounded-4xl font-bold text-sm shadow-soft"
            >
              <Printer size={20} weight="fill" /> Simpan pdf
            </button>
          </div>
        </header>

        <div className="mb-8 flex flex-wrap gap-4 items-center p-2 bg-card rounded-4xl border border-border-soft shadow-soft max-w-fit">
          <div className="px-4 py-2 text-xs font-bold text-text-muted flex items-center gap-2">
            <Baby size={20} className="text-primary" /> Filter usia:
          </div>
          {["6-8", "9-11", "12+"].map((age) => (
            <button
              key={age}
              onClick={() => setAgeFilter(age)}
              className={`px-6 py-2 rounded-3xl text-xs font-bold transition-all ${
                ageFilter === age
                  ? "bg-primary text-white shadow-md"
                  : "hover:bg-bg text-text-muted"
              }`}
            >
              {age} bulan
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-card p-6 rounded-5xl border border-border-soft shadow-soft">
              <h3 className="text-xs font-bold text-text-muted mb-6 flex items-center justify-between px-2">
                <span>Jadwal mingguan</span>
                <Calendar size={18} className="text-primary" />
              </h3>
              <div className="space-y-2">
                {Object.keys(weeklyMenu).map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${
                      selectedDay === day
                        ? "bg-primary text-white shadow-lg translate-x-1"
                        : "hover:bg-border-soft text-text-muted"
                    }`}
                  >
                    <span>{day}</span>
                    <span className="text-[10px] opacity-70 font-normal truncate ml-2">
                      {weeklyMenu[day].theme}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section className="bg-card p-8 rounded-5xl border border-border-soft shadow-soft">
              <h3 className="text-xs font-bold text-text-muted mb-6 flex items-center gap-2">
                <ShoppingCart size={18} className="text-primary" /> Daftar
                belanja
              </h3>
              <div className="space-y-3">
                {weeklyMenu[selectedDay].ingredients.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-bg border border-border-soft"
                  >
                    <CheckCircle
                      size={18}
                      className="text-primary"
                      weight="fill"
                    />
                    <span className="text-sm font-medium text-text-main">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-8 menu-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedDay}-${ageFilter}-${weeklyMenu[selectedDay].pagi}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-card p-10 rounded-5xl border border-border-soft shadow-soft relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20" />
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-5xl font-kids text-primary mb-2">
                        {selectedDay}
                      </h3>
                      <div className="flex items-center gap-3 text-text-muted">
                        <span className="text-sm font-semibold">
                          {weeklyMenu[selectedDay].theme}
                        </span>
                        <span className="w-1 h-1 bg-text-muted rounded-full"></span>
                        <span className="text-xs font-bold text-primary italic">
                          Tekstur: {textureMap[ageFilter].label}
                        </span>
                      </div>
                    </div>
                    <Basket
                      size={48}
                      weight="duotone"
                      className="text-primary/20"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {["pagi", "siang", "malam"].map((mealTime) => {
                    const mealName = weeklyMenu[selectedDay][mealTime];
                    const isDone = completedMeals[`${selectedDay}-${mealTime}`];
                    return (
                      <motion.div
                        key={mealTime}
                        whileHover={{ y: -2 }}
                        onClick={() => toggleMeal(mealTime)}
                        className={`p-6 rounded-4xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                          isDone
                            ? "bg-secondary/10 border-secondary"
                            : "bg-card border-border-soft shadow-soft hover:border-primary/30"
                        }`}
                      >
                        <div className="flex items-center gap-6">
                          <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDone ? "bg-secondary text-white" : "bg-primary/10 text-primary"}`}
                          >
                            {mealTime === "pagi" && (
                              <Clock size={28} weight="duotone" />
                            )}
                            {mealTime === "siang" && (
                              <AppleLogo size={28} weight="duotone" />
                            )}
                            {mealTime === "malam" && (
                              <Heartbeat size={28} weight="duotone" />
                            )}
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-text-muted mb-1 italic">
                              {mealTime === "siang"
                                ? "Selingan snack"
                                : "Makan utama"}{" "}
                              •{" "}
                              {mealTime === "pagi"
                                ? "08:00"
                                : mealTime === "siang"
                                  ? "11:00"
                                  : "17:00"}
                            </p>
                            <h4
                              className={`text-lg font-bold ${isDone ? "text-text-muted line-through opacity-60" : "text-text-main"}`}
                            >
                              {getDynamicName(mealName, mealTime)}
                            </h4>
                          </div>
                        </div>
                        {isChefMode && (
                          <div className="flex items-center gap-1 text-[10px] font-bold bg-accent/20 text-text-main px-3 py-1 rounded-full">
                            <Fire size={12} />{" "}
                            {mealTime === "pagi"
                              ? "20m"
                              : mealTime === "siang"
                                ? "5m"
                                : "25m"}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                <div className="bg-primary p-8 rounded-5xl text-white flex items-start gap-6 shadow-lg shadow-primary/20">
                  <div className="p-3 bg-white/20 rounded-2xl">
                    <Leaf size={28} weight="fill" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">
                      Catatan tekstur {ageFilter} bulan
                    </h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {ageFilter === "6-8" &&
                        "Pastikan makanan disaring hingga halus dan tidak ada gumpalan untuk mencegah tersedak."}
                      {ageFilter === "9-11" &&
                        "Mulai perkenalkan tekstur cincang kasar untuk melatih kemampuan mengunyah si kecil."}
                      {ageFilter === "12+" &&
                        "Si kecil sudah bisa mulai mencoba menu keluarga dengan rasa yang lebih ringan (rendah garam/gula)."}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div id="print-area" className="hidden">
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "32px", margin: 0 }}>
            Momscare mpasi planner
          </h1>
          <p style={{ color: "#666" }}>
            Rencana nutrisi mingguan - Usia {ageFilter} bulan (2026)
          </p>
        </div>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "2px solid black",
          }}
        >
          <thead style={{ background: "#f8f8f8" }}>
            <tr>
              <th style={{ border: "1px solid black", padding: "12px" }}>
                Hari
              </th>
              <th style={{ border: "1px solid black", padding: "12px" }}>
                Pagi (Tekstur {textureMap[ageFilter].suffix})
              </th>
              <th style={{ border: "1px solid black", padding: "12px" }}>
                Snack
              </th>
              <th style={{ border: "1px solid black", padding: "12px" }}>
                Sore (Tekstur {textureMap[ageFilter].suffix})
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(weeklyMenu).map(([day, data]) => (
              <tr key={day}>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {day}
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {getDynamicName(data.pagi, "pagi")}
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {data.siang}
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {getDynamicName(data.malam, "malam")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MPASIPage;
