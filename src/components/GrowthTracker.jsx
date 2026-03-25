import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Barbell, Ruler, Calendar, User, 
  ChartLineUp, CheckCircle, WarningCircle, 
  GenderIntersex, Info, TrendUp, Sparkle, Baby
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

// --- REFINED SUB-COMPONENTS ---
const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-2 flex-1">
    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-2">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-slate-50 group-focus-within:bg-primary/10 group-focus-within:text-primary text-slate-400 transition-all">
        <Icon size={18} weight="duotone" />
      </div>
      <input 
        {...props}
        className="w-full pl-14 pr-4 py-4 bg-white rounded-[2rem] border-2 border-slate-100 focus:border-primary/20 focus:ring-4 focus:ring-primary/5 outline-none text-sm font-bold text-slate-700 transition-all shadow-sm"
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
    if (onSave) onSave({ ...formData, bmi });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 font-outfit">
      {/* Header Compact */}
      <header className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-5">
          <motion.button 
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack} 
            className="p-3.5 bg-white rounded-[1.5rem] shadow-sm border border-slate-100 text-slate-500 hover:text-primary transition-all"
          >
            <ArrowLeft size={20} weight="bold" />
          </motion.button>
          <div>
            <h2 className="text-3xl font-bold text-slate-800 font-kids tracking-tight">Cek Pertumbuhan</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Medical Standar WHO 2026</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Left Side: Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 bg-white/60 backdrop-blur-md p-8 rounded-[3.5rem] border border-white shadow-2xl shadow-primary/5"
        >
          <form onSubmit={handleCalculate} className="space-y-6">
            <InputField 
              label="Nama Lengkap" icon={User} placeholder="Contoh: Arka" 
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
            />
            
            <div className="flex gap-4">
              <InputField 
                label="Usia (Bulan)" icon={Calendar} type="number" 
                value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} 
              />
              <div className="space-y-2 flex-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-2">Gender</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-slate-50 text-slate-400">
                    <GenderIntersex size={18} weight="duotone" />
                  </div>
                  <select 
                    className="w-full pl-14 pr-4 py-4 bg-white rounded-[2rem] border-2 border-slate-100 outline-none text-sm font-bold text-slate-700 shadow-sm appearance-none cursor-pointer"
                    value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}
                  >
                    <option value="boy">Jagoan (Laki)</option>
                    <option value="girl">Princess (Perempuan)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <InputField label="Berat (kg)" icon={Barbell} type="number" step="0.1" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} />
              <InputField label="Tinggi (cm)" icon={Ruler} type="number" value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} />
            </div>

            <motion.button 
              whileHover={{ y: -3, scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 bg-primary text-white rounded-[2rem] font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-3 font-kids text-lg mt-4 transition-all"
            >
              <ChartLineUp size={24} weight="bold" /> Kalkulasi Sekarang
            </motion.button>
          </form>
        </motion.div>

        {/* Right Side: Visual Result */}
        <div className="lg:col-span-7 h-full">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div 
                key="empty" 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-full min-h-[450px] border-4 border-dashed border-slate-100 rounded-[4rem] flex flex-col items-center justify-center p-12 text-center bg-white/30"
              >
                <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-sm flex items-center justify-center mb-6">
                  <TrendUp size={40} weight="duotone" className="text-primary/30" />
                </div>
                <h4 className="text-xl font-kids text-slate-400">Siap Melihat Progres?</h4>
                <p className="text-sm text-slate-400 max-w-xs mt-2">Isi data di samping untuk mendapatkan analisis kesehatan mendalam si kecil.</p>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 rounded-[4rem] p-10 text-white relative overflow-hidden shadow-3xl min-h-[450px] flex flex-col justify-between"
              >
                {/* Decorative BG */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                        <Sparkle size={20} className="text-secondary" weight="fill" />
                      </div>
                      <h3 className="text-2xl font-kids tracking-wide">Analisis {formData.name}</h3>
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/60">
                      ID: {Math.floor(Math.random() * 9000) + 1000}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative mx-auto md:mx-0">
                      <svg className="w-44 h-44 -rotate-90">
                        <circle cx="88" cy="88" r="80" className="stroke-white/5 fill-none stroke-[12]" />
                        <motion.circle 
                          cx="88" cy="88" r="80" 
                          className={`fill-none stroke-[12] ${result.percentage === 100 ? 'stroke-primary' : 'stroke-secondary'}`}
                          strokeLinecap="round"
                          strokeDasharray={502.6}
                          initial={{ strokeDashoffset: 502.6 }}
                          animate={{ strokeDashoffset: 502.6 - (502.6 * result.percentage) / 100 }}
                          transition={{ duration: 2, ease: "circOut" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-black">{result.bmi}</span>
                        <span className="text-[10px] uppercase font-bold text-white/40 tracking-[0.2em]">BMI Score</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-[1.5rem] ${result.bg} ${result.color}`}>
                        {result.percentage === 100 ? <CheckCircle size={24} weight="fill" /> : <WarningCircle size={24} weight="fill" />}
                        <span className="text-lg font-black uppercase tracking-tight italic font-outfit">{result.status}</span>
                      </div>
                      <p className="text-lg text-slate-300 leading-relaxed font-medium">"{result.description}"</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-10 relative z-10">
                  <div className="bg-white/5 backdrop-blur-md p-5 rounded-[2.5rem] border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <Ruler size={16} className="text-primary" />
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Tinggi</span>
                    </div>
                    <p className="text-sm font-bold text-white/90">{result.heightStatus}</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md p-5 rounded-[2.5rem] border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <Baby size={16} className="text-secondary" />
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Kategori</span>
                    </div>
                    <p className="text-sm font-bold text-white/90">{formData.gender === 'boy' ? 'Laki-laki' : 'Perempuan'}</p>
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