import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Barbell,
  Ruler,
  Calendar,
  User,
  ChartLineUp,
  TrendUp,
  CheckCircle
} from "@phosphor-icons/react";

// --- LOGIC UTILS ---
const getNutritionStatus = (bmi, name, age, height) => {
  const isIdeal = bmi >= 13.5 && bmi <= 18.5;
  const isUnder = bmi < 13.5;
  const minHeight = age * 1.5 + 48; 
  const isShort = height < minHeight;
  const heightStatus = isShort ? "Perlu Stimulasi" : "Tinggi Badan Ideal";

  if (isUnder)
    return {
      status: "Gizi Kurang",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      description: `Si kecil ${name} butuh tambahan asupan kalori & protein.`,
      percentage: 45,
      heightStatus,
    };

  if (isIdeal)
    return {
      status: "Gizi Ideal",
      color: "text-primary",
      bg: "bg-primary/10",
      description: `Luar biasa! Pertumbuhan ${name} sesuai jalur hijau standar WHO.`,
      percentage: 100,
      heightStatus,
    };

  return {
    status: "Gizi Lebih",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    description: `Ajak ${name} lebih aktif bergerak dan atur pola makan seimbang.`,
    percentage: 75,
    heightStatus,
  };
};

const GrowthTracker = ({ onBack, onSave, initialData }) => {
  // 1. Inisialisasi State langsung dari initialData (Child Manager)
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    age: initialData?.age || "",
    weight: initialData?.weight || "",
    height: initialData?.height || "",
    gender: initialData?.gender || "boy",
  });

  const [result, setResult] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  // 2. Sinkronisasi jika initialData berubah (misal user ganti profil anak)
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        name: initialData.name,
        age: initialData.age,
        gender: initialData.gender
      }));
    }
  }, [initialData]);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!formData.weight || !formData.height) return;

    const bmi = (formData.weight / Math.pow(formData.height / 100, 2)).toFixed(1);
    const analysis = getNutritionStatus(
      Number(bmi),
      formData.name,
      Number(formData.age),
      Number(formData.height)
    );

    setResult({ ...analysis, bmi });

    // 3. Kirim balik ke ChildDataManager untuk disimpan ke LocalStorage
    if (onSave) {
      onSave({
        ...formData,
        bmi: bmi,
        status: analysis.status,
        lastUpdated: new Date().toISOString(),
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 font-outfit bg-bg min-h-screen">
      <header className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={onBack}
            className="p-3.5 bg-card rounded-[1.5rem] shadow-sm border border-border-soft text-text-muted"
          >
            <ArrowLeft size={20} weight="bold" />
          </motion.button>
          <div>
            <h2 className="text-3xl font-bold text-text-main font-kids">
              Update Pertumbuhan
            </h2>
            <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest">
              Profil: <span className="text-primary">{formData.name}</span>
            </p>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* FORM INPUT */}
        <motion.div className="lg:col-span-5 space-y-6">
          <div className="bg-card/60 backdrop-blur-md p-8 rounded-[3rem] border border-border-soft shadow-xl">
            <form onSubmit={handleCalculate} className="space-y-6">
              
              {/* Info Anak (Read Only) */}
              <div className="p-4 bg-bg/50 rounded-2xl border border-border-soft flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <User size={24} weight="duotone" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase">Nama & Usia</p>
                  <p className="text-sm font-bold text-text-main">{formData.name} • {formData.age} Bulan</p>
                </div>
              </div>

              {/* Input Berat & Tinggi (Fokus Utama) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-text-muted uppercase ml-2">Berat (kg)</label>
                  <div className="relative">
                    <Barbell size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                    <input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      className="w-full pl-12 pr-4 py-4 bg-card rounded-2xl border-2 border-border-soft focus:border-primary outline-none font-bold text-sm"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-text-muted uppercase ml-2">Tinggi (cm)</label>
                  <div className="relative">
                    <Ruler size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full pl-12 pr-4 py-4 bg-card rounded-2xl border-2 border-border-soft focus:border-primary outline-none font-bold text-sm"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <button className="w-full py-5 bg-primary text-white rounded-[2rem] font-bold shadow-lg flex items-center justify-center gap-3 font-kids text-lg hover:scale-[1.02] transition-all">
                {isSaved ? <CheckCircle size={24} weight="fill" /> : <ChartLineUp size={24} weight="bold" />}
                {isSaved ? "Data Tersimpan!" : "Kalkulasi"}
              </button>
            </form>
          </div>
        </motion.div>

        {/* HASIL ANALISIS */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div className="h-full min-h-[400px] border-4 border-dashed border-border-soft rounded-[4rem] flex flex-col items-center justify-center p-12 text-center bg-card/30">
                <TrendUp size={48} className="text-primary/20 mb-4" />
                <h4 className="text-xl font-kids text-text-muted">Lihat Hasil Analisis</h4>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-[4rem] p-10 text-text-main relative overflow-hidden shadow-2xl border border-border-soft">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-10">
                    <h3 className="text-2xl font-kids">Hasil Analisis</h3>
                    <div className={`px-4 py-2 rounded-xl text-xs font-bold ${result.bg} ${result.color}`}>
                      {result.status}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className="relative w-40 h-40">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="80" cy="80" r="70" className="stroke-bg fill-none stroke-[10]" />
                        <motion.circle 
                          cx="80" cy="80" r="70" 
                          className={`fill-none stroke-[10] ${result.percentage === 100 ? 'stroke-primary' : 'stroke-secondary'}`}
                          strokeDasharray={440}
                          initial={{ strokeDashoffset: 440 }}
                          animate={{ strokeDashoffset: 440 - (440 * result.percentage) / 100 }}
                          transition={{ duration: 1.5 }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black">{result.bmi}</span>
                        <span className="text-[8px] uppercase font-bold text-text-muted">BMI Score</span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <p className="text-lg font-medium leading-relaxed italic text-text-muted">
                        "{result.description}"
                      </p>
                      <div className="pt-4 border-t border-border-soft">
                        <p className="text-xs font-bold text-text-muted uppercase mb-1">Status Tinggi Badan:</p>
                        <p className="text-sm font-extrabold text-primary">{result.heightStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GrowthTracker;