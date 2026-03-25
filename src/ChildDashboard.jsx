import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Baby, Heartbeat, Syringe, ChartLineUp, 
  CalendarCheck, User, TrendUp, Info, CaretRight, ShieldCheck, PawPrint
} from '@phosphor-icons/react';

// Dummy Data untuk Simulasi
// Kamu akan mengganti ini dengan data yang sebenarnya dari API atau Context
const DUMMY_CHILD_DATA = {
  id: 'child-123',
  name: 'Arka',
  gender: 'boy',
  age: 10, // dalam bulan
  weight: 9.5, // kg
  height: 75, // cm
  lastUpdated: '2023-10-26'
};

const DUMMY_VACCINES_DATA = [
  { id: 1, age: 0, name: "Hepatitis B 1", completed: true },
  { id: 2, age: 1, name: "BCG & Polio 1", completed: true },
  { id: 3, age: 2, name: "DPT-HB-Hib 1", completed: true },
  { id: 4, age: 3, name: "DPT-HB-Hib 2", completed: true },
  { id: 5, age: 4, name: "Polio IPV 2", completed: false }, // Ini yang akan terlihat "due"
  { id: 6, age: 9, name: "Campak / MR", completed: false },
];

// Helper Function (bisa dipindahkan ke utils.js)
const getNutritionStatus = (bmi) => {
  const isIdeal = bmi >= 13.5 && bmi <= 18.5;
  const isUnder = bmi < 13.5;
  
  if (isUnder) return { status: "Gizi Kurang", color: "text-amber-500", bg: "bg-amber-500/10", icon: <PawPrint size={24} weight="fill" /> };
  if (isIdeal) return { status: "Gizi Ideal", color: "text-primary", bg: "bg-primary/10", icon: <Heartbeat size={24} weight="fill" /> };
  return { status: "Gizi Lebih", color: "text-rose-500", bg: "bg-rose-500/10", icon: <Baby size={24} weight="fill" /> };
};

const ChildDashboard = ({ child, onNavigateToGrowth, onNavigateToImmunization }) => {
  const [childInfo, setChildInfo] = useState(child || DUMMY_CHILD_DATA);
  const [vaccines, setVaccines] = useState(DUMMY_VACCINES_DATA); // Ini harusnya dari props/context

  // Hitung BMI
  const bmi = (childInfo.weight / Math.pow(childInfo.height / 100, 2)).toFixed(1);
  const nutritionStatus = getNutritionStatus(Number(bmi));

  // Hitung Progress Imunisasi
  const completedVaccines = vaccines.filter(v => v.completed).length;
  const immunizationPercent = Math.round((completedVaccines / vaccines.length) * 100) || 0;
  const nextVaccine = vaccines.find(v => v.age <= childInfo.age && !v.completed);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-outfit">
      {/* HEADER: Welcome & Child Profile */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex items-center justify-between flex-wrap gap-6 mb-16"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-kids text-slate-800 leading-tight">Halo, Moms!</h1>
          <p className="text-slate-500 mt-2 text-lg">Bagaimana kabar <b className="text-primary">{childInfo.name}</b> hari ini?</p>
        </div>

        <div className="bg-white p-4 rounded-[2.5rem] shadow-lg border border-slate-100 flex items-center gap-4 group cursor-pointer">
          <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center ${childInfo.gender === 'boy' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'} transition-all group-hover:scale-105`}>
            <User size={32} weight="duotone" />
          </div>
          <div>
            <h3 className="text-xl font-kids text-slate-800">{childInfo.name}</h3>
            <p className="text-sm text-slate-500">{childInfo.age} Bulan</p>
          </div>
          <CaretRight size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
        </div>
      </motion.div>

      {/* MAIN CARDS: Growth & Immunization */}
      <div className="grid lg:grid-cols-2 gap-10 mb-12">
        {/* CARD 1: Growth Tracker Summary */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
          className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-100 relative overflow-hidden group hover:shadow-2xl transition-all"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform" />
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <ChartLineUp size={32} weight="duotone" />
              </div>
              <div>
                <h3 className="text-xl font-kids text-slate-800">Progres Tumbuh</h3>
                <p className="text-sm text-slate-500">BMI: <b className="font-bold text-slate-700">{bmi}</b></p>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onNavigateToGrowth}
              className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <CaretRight size={20} weight="bold" />
            </motion.button>
          </div>

          <div className="flex items-center justify-center gap-8 relative z-10">
            <div className="relative shrink-0">
              <svg className="w-32 h-32 -rotate-90">
                <circle cx="64" cy="64" r="58" className="stroke-slate-100 fill-none stroke-[8]" />
                <motion.circle 
                  cx="64" cy="64" r="58" 
                  className={`fill-none stroke-[8] ${nutritionStatus.color.replace('text', 'stroke')}`}
                  strokeLinecap="round"
                  strokeDasharray={364.4}
                  initial={{ strokeDashoffset: 364.4 }}
                  animate={{ strokeDashoffset: 364.4 - (364.4 * 100 * (Number(bmi) / 25)) / 100 }} // Asumsi max BMI 25
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-800">{bmi}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">BMI Score</span>
              </div>
            </div>
            
            <div className="space-y-2 text-left">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${nutritionStatus.bg} ${nutritionStatus.color}`}>
                {nutritionStatus.icon}
                <span className="uppercase tracking-wide">{nutritionStatus.status}</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Kondisi {childInfo.name} saat ini {nutritionStatus.status === "Gizi Ideal" ? "sangat baik" : "memerlukan perhatian"}.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CARD 2: Immunization Tracker Summary */}
        <motion.div
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          className="bg-primary/90 p-10 rounded-[3.5rem] shadow-xl shadow-primary/20 relative overflow-hidden group hover:shadow-2xl transition-all"
        >
          <div className="absolute top-0 left-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -ml-20 -mt-20 group-hover:scale-110 transition-transform" />

          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                <Syringe size={32} weight="duotone" />
              </div>
              <div>
                <h3 className="text-xl font-kids text-white">Jadwal Imunisasi</h3>
                <p className="text-sm text-white/70">Progres: <b className="font-bold text-white">{immunizationPercent}%</b></p>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onNavigateToImmunization}
              className="p-3 bg-white/20 rounded-xl text-white hover:bg-white/30 transition-colors"
            >
              <CaretRight size={20} weight="bold" />
            </motion.button>
          </div>

          <div className="relative z-10">
            <div className="h-4 bg-white/20 rounded-full overflow-hidden mb-4 p-1">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${immunizationPercent}%` }}
                className="h-full bg-secondary rounded-full shadow-[0_0_15px_rgba(168,230,207,0.5)]" 
              />
            </div>
            <p className="text-[11px] font-medium text-white/70 text-center tracking-wide uppercase">
              {completedVaccines} dari {vaccines.length} vaksinasi selesai
            </p>

            {nextVaccine && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-white/10 border border-white/20 rounded-2xl flex items-center gap-4"
              >
                <div className="p-2 bg-white/20 rounded-lg text-white">
                  <CalendarCheck size={20} weight="fill" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Berikutnya di Bulan {nextVaccine.age}</p>
                  <h4 className="text-sm font-bold text-white">{nextVaccine.name}</h4>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* SMART TIPS / Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-white to-slate-50 p-10 rounded-[4rem] border border-slate-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
      >
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-accent/20 rounded-[2rem] flex items-center justify-center text-amber-600 shrink-0">
            <Info size={40} weight="duotone" />
          </div>
          <div>
            <h3 className="text-xl font-kids text-slate-800 mb-2">Penting: Pantau Terus Perkembangan Si Kecil!</h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-lg">
              Setiap momen adalah emas. Pastikan tidak ada jadwal penting yang terlewatkan.
            </p>
          </div>
        </div>
        <motion.button 
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-[2rem] font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
        >
          <ShieldCheck size={20} weight="fill" /> Cek Semua Jadwal
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ChildDashboard;