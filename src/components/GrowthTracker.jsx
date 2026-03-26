import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Barbell, Ruler, Calendar, User, 
  ChartLineUp, TrendUp
} from '@phosphor-icons/react';

// --- LOGIC UTILS ---
const getNutritionStatus = (bmi, name, age, height) => {
  const isIdeal = bmi >= 13.5 && bmi <= 18.5;
  const isUnder = bmi < 13.5;
  const minHeight = (age * 1.5) + 48;
  const isShort = height < minHeight;
  const heightStatus = isShort ? "Perlu Stimulasi" : "Tinggi Badan Ideal";

  if (isUnder) return {
    status: "Gizi Kurang",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    description: `Si kecil ${name} butuh tambahan asupan kalori & protein.`,
    percentage: 45,
    heightStatus
  };

  if (isIdeal) return {
    status: "Gizi Ideal",
    color: "text-primary",
    bg: "bg-primary/10",
    description: `Luar biasa! Pertumbuhan ${name} sesuai jalur hijau standar WHO.`,
    percentage: 100,
    heightStatus
  };

  return {
    status: "Gizi Lebih",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    description: `Ajak ${name} lebih aktif bergerak dan atur pola makan seimbang.`,
    percentage: 75,
    heightStatus
  };
};

// InputField yang sudah Support Dark Mode tanpa ubah tampilan
const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-2 flex-1">
    <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest ml-2 transition-colors">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-bg text-text-muted transition-colors">
        <Icon size={18} weight="duotone" />
      </div>
      <input 
        {...props}
        className="w-full pl-14 pr-4 py-4 bg-card rounded-[2rem] border-2 border-border-soft outline-none text-sm font-bold text-text-main shadow-sm focus:border-primary transition-all duration-300"
      />
    </div>
  </div>
);

const GrowthTracker = ({ onBack, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    age: initialData?.age || '',
    weight: initialData?.weight || '',
    height: initialData?.height || '',
    gender: initialData?.gender || 'boy'
  });
  
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    if(!formData.weight || !formData.height) return;
    
    const bmi = (formData.weight / Math.pow(formData.height / 100, 2)).toFixed(1);
    const analysis = getNutritionStatus(Number(bmi), formData.name, Number(formData.age), Number(formData.height));
    
    setResult({ ...analysis, bmi });
    
    if (onSave) {
      onSave({
        ...formData,
        bmi: bmi,
        lastUpdated: new Date().toISOString()
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 font-outfit bg-bg transition-colors duration-500 min-h-screen">
      <header className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-5">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            onClick={onBack} 
            className="p-3.5 bg-card rounded-[1.5rem] shadow-sm border border-border-soft text-text-muted transition-all"
          >
            <ArrowLeft size={20} weight="bold" />
          </motion.button>
          <div>
            <h2 className="text-3xl font-bold text-text-main font-kids transition-colors">Cek Pertumbuhan</h2>
            <p className="text-[11px] font-bold text-text-muted uppercase transition-colors">Medical Standar WHO 2026</p>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Form Section */}
        <motion.div className="lg:col-span-5 bg-card/60 backdrop-blur-md p-8 rounded-[3.5rem] border border-border-soft shadow-2xl shadow-primary/5 transition-all duration-500">
          <form onSubmit={handleCalculate} className="space-y-6">
            <InputField label="Nama Lengkap" icon={User} placeholder="Nama si kecil" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <div className="flex gap-4">
              <InputField label="Usia (Bulan)" icon={Calendar} type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
              <div className="space-y-2 flex-1">
                <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest ml-2 transition-colors">Gender</label>
                <select className="w-full h-[58px] px-6 bg-card rounded-[2rem] border-2 border-border-soft outline-none text-sm font-bold text-text-main shadow-sm transition-all" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                  <option value="boy">Jagoan (Laki)</option>
                  <option value="girl">Princess (Perempuan)</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4">
              <InputField label="Berat (kg)" icon={Barbell} type="number" step="0.1" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} />
              <InputField label="Tinggi (cm)" icon={Ruler} type="number" value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} />
            </div>
            <button className="w-full py-5 bg-primary text-white rounded-[2rem] font-bold shadow-xl flex items-center justify-center gap-3 font-kids text-lg mt-4 hover:brightness-110 transition-all">
              <ChartLineUp size={24} weight="bold" /> Kalkulasi
            </button>
          </form>
        </motion.div>

        {/* Result Section */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div key="empty" className="h-full min-h-[450px] border-4 border-dashed border-border-soft rounded-[4rem] flex flex-col items-center justify-center p-12 text-center bg-card/30 transition-all">
                <TrendUp size={40} className="text-primary/30 mb-4" />
                <h4 className="text-xl font-kids text-text-muted">Siap Melihat Progres?</h4>
              </motion.div>
            ) : (
              <motion.div key="result" className="bg-card rounded-[4rem] p-10 text-text-main relative overflow-hidden shadow-3xl min-h-[450px] flex flex-col justify-between border border-border-soft transition-all duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-kids mb-10 transition-colors">Analisis {formData.name}</h3>
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                      <svg className="w-44 h-44 -rotate-90">
                        <circle cx="88" cy="88" r="80" className="stroke-bg fill-none stroke-[12] transition-colors" />
                        <motion.circle cx="88" cy="88" r="80" className={`fill-none stroke-[12] ${result.percentage === 100 ? 'stroke-primary' : 'stroke-secondary'}`} strokeLinecap="round" strokeDasharray={502.6} initial={{ strokeDashoffset: 502.6 }} animate={{ strokeDashoffset: 502.6 - (502.6 * result.percentage) / 100 }} transition={{ duration: 2 }} />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-black text-text-main transition-colors">{result.bmi}</span>
                        <span className="text-[10px] uppercase font-bold text-text-muted">BMI Score</span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-[1.5rem] ${result.bg} ${result.color}`}>
                        <span className="text-lg font-black italic">{result.status}</span>
                      </div>
                      <p className="text-lg text-text-muted leading-relaxed transition-colors">"{result.description}"</p>
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