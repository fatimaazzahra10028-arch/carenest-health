import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Barbell, Ruler, Calendar, User, 
  ChartLineUp, CheckCircle, WarningCircle, 
  GenderIntersex, Info, TrendUp 
} from '@phosphor-icons/react';

const GrowthTracker = ({ onBack, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    age: initialData?.age || '',
    weight: initialData?.weight || '',
    height: initialData?.height || '',
    gender: initialData?.gender || 'boy'
  });
  
  const [result, setResult] = useState(null);

  // Fungsi untuk menghitung status gizi secara otomatis
  const calculateStatus = (e) => {
    if (e) e.preventDefault();
    
    const w = parseFloat(formData.weight);
    const h = parseFloat(formData.height);
    const age = parseInt(formData.age);
    
    if (!w || !h) return;

    const hMeter = h / 100;
    const bmi = w / (hMeter * hMeter);
    
    // --- Logika Dinamis Status Tinggi Badan ---
    let heightStatus = "Normal";
    const minHeightStandard = (age * 1.5) + 48; // Estimasi kasar standar WHO
    if (h < minHeightStandard) heightStatus = "Pendek (Stunting?)";
    else if (h > minHeightStandard + 35) heightStatus = "Tinggi";
    else heightStatus = "Normal (Ideal)";

    let status = "";
    let color = "";
    let description = "";
    let percentage = 0;

    // --- Klasifikasi BMI WHO Child Standards ---
    if (bmi < 13.5) { 
      status = "Gizi Kurang"; 
      color = "from-amber-400 to-orange-500"; 
      description = `Si kecil ${formData.name} memerlukan perhatian khusus pada asupan nutrisi harian untuk mengejar berat badan ideal.`;
      percentage = 40;
    } else if (bmi >= 13.5 && bmi <= 18.5) { 
      status = "Gizi Baik (Ideal)"; 
      color = "from-emerald-400 to-teal-500"; 
      description = `Pertumbuhan yang luar biasa! Kondisi ${formData.name} saat ini sangat sehat. Pertahankan ya, Moms!`;
      percentage = 100;
    } else { 
      status = "Gizi Lebih"; 
      color = "from-rose-400 to-red-500"; 
      description = `Mohon konsultasikan pola makan Si Kecil agar tetap seimbang dan ajak ${formData.name} aktif bermain.`;
      percentage = 70;
    }

    const finalResult = { 
        bmi: bmi.toFixed(1), 
        status, 
        color, 
        description, 
        percentage,
        heightStatus,
        methodology: `WHO 2026 ${formData.gender === 'boy' ? 'Boy' : 'Girl'} Standard`
    };

    setResult(finalResult);

    // KIRIM DATA KE APP.JSX
    if (onSave) {
      onSave({
        ...formData,
        bmi: finalResult.bmi,
        status: finalResult.status
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-5">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-3.5 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-primary transition-all border border-slate-100"
          >
            <ArrowLeft size={22} weight="bold" />
          </motion.button>
          <div>
            <h2 className="text-3xl font-kids text-slate-800 font-bold tracking-tight">Growth Tracker</h2>
            <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
              <CheckCircle size={16} className="text-primary" weight="fill" />
              <p className="font-medium">Sesuai Standar Antropometri {result ? result.methodology : 'WHO 2026'}</p>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex bg-white/50 backdrop-blur-sm p-2 rounded-2xl border border-white items-center gap-3 pr-6">
          <div className="bg-primary/10 p-2 rounded-xl text-primary">
            <Info size={20} weight="duotone" />
          </div>
          <p className="text-[11px] font-bold text-slate-500 leading-tight uppercase tracking-wider">
            Data terhubung otomatis <br/> & aman secara lokal
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Form Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-[3rem] border border-white shadow-2xl shadow-blue-900/5 relative overflow-hidden"
        >
          <form onSubmit={calculateStatus} className="relative z-10 space-y-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Nama Si Kecil</label>
              <div className="relative group">
                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input 
                  required
                  type="text"
                  value={formData.name}
                  className="w-full pl-12 pr-4 py-4 bg-white/80 rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none text-sm font-bold text-slate-700 transition-all shadow-sm"
                  placeholder="Contoh: Arka"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Usia (Bulan)</label>
                <div className="relative group">
                  <Calendar size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    required type="number"
                    value={formData.age}
                    className="w-full pl-12 pr-4 py-4 bg-white/80 rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none text-sm font-bold text-slate-700 transition-all shadow-sm"
                    placeholder="0-60"
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Gender</label>
                <div className="relative group">
                  <GenderIntersex size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <select 
                    value={formData.gender}
                    className="w-full pl-12 pr-4 py-4 bg-white/80 rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none text-sm font-bold text-slate-700 transition-all shadow-sm appearance-none"
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  >
                    <option value="boy">Laki-laki</option>
                    <option value="girl">Perempuan</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Ukuran Fisik</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative group">
                  <Barbell size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    required type="number" step="0.1"
                    value={formData.weight}
                    className="w-full pl-12 pr-4 py-4 bg-white/80 rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none text-sm font-bold text-slate-700 transition-all shadow-sm"
                    placeholder="Berat (kg)"
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  />
                </div>
                <div className="relative group">
                  <Ruler size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    required type="number"
                    value={formData.height}
                    className="w-full pl-12 pr-4 py-4 bg-white/80 rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none text-sm font-bold text-slate-700 transition-all shadow-sm"
                    placeholder="Tinggi (cm)"
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-primary to-blue-600 text-white rounded-[2rem] font-bold text-base shadow-xl shadow-primary/20 mt-4 flex items-center justify-center gap-3"
            >
              <ChartLineUp size={22} weight="bold" />
              Cek Progres Si Kecil
            </motion.button>
          </form>
        </motion.div>

        {/* Results Card */}
        <div className="lg:col-span-7 h-full">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="h-full min-h-[450px] border-2 border-dashed border-white rounded-[3.5rem] flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <TrendUp size={44} className="text-slate-200" weight="duotone" />
                </div>
                <h4 className="text-xl font-bold text-slate-400 font-kids">Siap Pantau Si Kecil?</h4>
                <p className="text-sm text-slate-400/80 max-w-[280px] mt-2 font-medium">Lengkapi data di samping untuk melihat kartu analisis kesehatan Si Kecil.</p>
              </motion.div>
            ) : (
              <motion.div 
                key="active"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[3.5rem] shadow-2xl shadow-blue-900/5 p-10 md:p-12 border border-slate-50 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Pertumbuhan</p>
                      <h3 className="text-2xl font-bold text-slate-800 font-kids">Progres {formData.name}</h3>
                    </div>
                    <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 font-bold text-slate-400 text-[10px]">
                      DATA TERHUBUNG
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12 items-center mb-10">
                    <div className="relative inline-flex flex-col items-center">
                      <svg className="w-40 h-40 transform -rotate-90">
                        <circle cx="80" cy="80" r="70" className="stroke-slate-50 fill-none stroke-[12]" />
                        <motion.circle 
                          cx="80" cy="80" r="70" 
                          className={`fill-none stroke-[12] stroke-current transition-all duration-1000`}
                          style={{ stroke: result.status.includes('Ideal') ? '#10b981' : '#f59e0b' }}
                          strokeDasharray={440}
                          initial={{ strokeDashoffset: 440 }}
                          animate={{ strokeDashoffset: 440 - (440 * result.percentage) / 100 }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <span className="text-4xl font-black text-slate-800 block leading-none">{result.bmi}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">BMI Score</span>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r ${result.color} shadow-lg shadow-current/20`}>
                        {result.status.includes("Ideal") ? <CheckCircle size={22} weight="fill" /> : <WarningCircle size={22} weight="fill" />}
                        {result.status}
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed font-medium italic">
                        "{result.description}"
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100 text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Tinggi Badan</p>
                      <p className="font-bold text-slate-700 text-sm">{result.heightStatus}</p>
                    </div>
                    <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100 text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Kategori Usia</p>
                      <p className="font-bold text-slate-700 text-sm">{formData.age} Bulan</p>
                    </div>
                    <div className="bg-primary/5 p-5 rounded-[2rem] border border-primary/10 text-center">
                      <p className="text-[10px] font-bold text-primary uppercase mb-1">Standar</p>
                      <p className="font-bold text-primary text-[10px] truncate">WHO v.2026</p>
                    </div>
                  </div>
                </div>

                <div className={`absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br ${result.color} opacity-[0.05] rounded-full blur-3xl`} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GrowthTracker;