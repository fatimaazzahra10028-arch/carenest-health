import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Barbell, Ruler, Calendar, User, 
  ChartLineUp, CheckCircle, WarningCircle, 
  GenderIntersex, Sparkle, Baby, Syringe,
  TrendUp, ListChecks
} from '@phosphor-icons/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// --- LOGIC UTILS (DARI KODE ANDA) ---
const getNutritionStatus = (bmi, name, age, height) => {
  const isIdeal = bmi >= 13.5 && bmi <= 18.5;
  const isUnder = bmi < 13.5;
  const minHeight = (age * 1.5) + 48;
  const isShort = height < minHeight;
  const heightStatus = isShort ? "Perlu Stimulasi" : "Tinggi Badan Ideal";

  if (isUnder) return {
    status: "Gizi Kurang", color: "text-amber-500", bg: "bg-amber-500/10",
    description: `Si kecil ${name} butuh tambahan asupan kalori & protein.`,
    percentage: 45, heightStatus
  };
  if (isIdeal) return {
    status: "Gizi Ideal", color: "text-primary", bg: "bg-primary/10",
    description: `Luar biasa! Pertumbuhan ${name} sesuai jalur hijau WHO.`,
    percentage: 100, heightStatus
  };
  return {
    status: "Gizi Lebih", color: "text-rose-500", bg: "bg-rose-500/10",
    description: `Ajak ${name} lebih aktif bergerak.`,
    percentage: 75, heightStatus
  };
};

// --- SUB-COMPONENTS ---
const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-2 flex-1">
    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-2">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-slate-50 text-slate-400">
        <Icon size={18} weight="duotone" />
      </div>
      <input {...props} className="w-full pl-14 pr-4 py-4 bg-white rounded-[1.5rem] border-2 border-slate-100 focus:border-primary/20 outline-none text-sm font-bold shadow-sm" />
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---
const KidsDashboard = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('input'); // input, graph, vaccine
  const [childData, setChildData] = useState({
    name: 'Si Kecil',
    age: '12',
    weight: '9.5',
    height: '75',
    gender: 'boy',
    history: [
      { month: '6 bln', weight: 7.2, height: 65 },
      { month: '8 bln', weight: 8.0, height: 68 },
      { month: '10 bln', weight: 8.8, height: 72 },
      { month: '12 bln', weight: 9.5, height: 75 },
    ]
  });

  const [analysis, setAnalysis] = useState(null);

  // Efek untuk kalkulasi awal
  useEffect(() => {
    handleCalculate();
  }, []);

  const handleCalculate = () => {
    const bmi = (childData.weight / Math.pow(childData.height / 100, 2)).toFixed(1);
    const result = getNutritionStatus(Number(bmi), childData.name, Number(childData.age), Number(childData.height));
    setAnalysis({ ...result, bmi });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] pt-24 pb-12 px-6 font-outfit">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* --- SIDEBAR KIRI: PROFIL ANAK --- */}
        <aside className="lg:w-1/3 xl:w-1/4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[3rem] p-8 shadow-xl shadow-slate-200/50 sticky top-28 border border-white"
          >
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 border-4 border-white shadow-lg flex items-center justify-center relative">
                <Baby size={48} weight="duotone" className="text-primary" />
                <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-md">
                   {childData.gender === 'boy' ? <GenderIntersex size={16} className="text-blue-500" /> : <GenderIntersex size={16} className="text-pink-500" />}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 font-kids tracking-tight">{childData.name}</h2>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{childData.age} Bulan</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase">Status Gizi</span>
                <span className={`text-xs font-black uppercase ${analysis?.color}`}>{analysis?.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <Barbell size={20} weight="duotone" className="text-primary mb-2" />
                  <p className="text-lg font-black text-slate-700">{childData.weight} <span className="text-xs">kg</span></p>
                </div>
                <div className="p-4 bg-secondary/5 rounded-2xl border border-secondary/10">
                  <Ruler size={20} weight="duotone" className="text-secondary mb-2" />
                  <p className="text-lg font-black text-slate-700">{childData.height} <span className="text-xs">cm</span></p>
                </div>
              </div>
            </div>

            {/* Navigasi Tab */}
            <nav className="mt-8 flex flex-col gap-2">
              {[
                { id: 'input', label: 'Update Data', icon: TrendUp },
                { id: 'graph', label: 'Grafik WHO', icon: ChartLineUp },
                { id: 'vaccine', label: 'Imunisasi', icon: Syringe },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${
                    activeTab === item.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <item.icon size={20} weight={activeTab === item.id ? 'bold' : 'duotone'} />
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        </aside>

        {/* --- KONTEN UTAMA: MONITORING --- */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: INPUT DATA (LOGIC ANDA) */}
            {activeTab === 'input' && (
              <motion.div 
                key="input-tab" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-white">
                  <h3 className="text-2xl font-bold text-slate-800 font-kids mb-8 flex items-center gap-3">
                    <Sparkle size={28} className="text-primary" weight="fill" /> Update Tumbuh Kembang
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <InputField label="Nama Panggilan" icon={User} value={childData.name} onChange={(e) => setChildData({...childData, name: e.target.value})} />
                    <InputField label="Usia (Bulan)" icon={Calendar} type="number" value={childData.age} onChange={(e) => setChildData({...childData, age: e.target.value})} />
                    <InputField label="Berat (kg)" icon={Barbell} type="number" value={childData.weight} onChange={(e) => setChildData({...childData, weight: e.target.value})} />
                    <InputField label="Tinggi (cm)" icon={Ruler} type="number" value={childData.height} onChange={(e) => setChildData({...childData, height: e.target.value})} />
                  </div>
                  <button 
                    onClick={handleCalculate}
                    className="w-full py-5 bg-primary text-white rounded-2xl font-bold font-kids text-lg hover:brightness-110 transition-all shadow-xl shadow-primary/20"
                  >
                    Kalkulasi & Simpan
                  </button>
                </div>

                {analysis && (
                   <div className="bg-slate-900 rounded-[3rem] p-8 text-white flex flex-col md:flex-row items-center gap-8 border border-white/10 overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                      <div className="text-center md:text-left space-y-2 relative z-10">
                        <div className={`inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${analysis.bg} ${analysis.color}`}>
                          {analysis.status}
                        </div>
                        <p className="text-lg font-medium text-slate-300">"{analysis.description}"</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl text-center min-w-[120px]">
                        <p className="text-3xl font-black">{analysis.bmi}</p>
                        <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest">BMI Score</p>
                      </div>
                   </div>
                )}
              </motion.div>
            )}

            {/* TAB 2: GRAFIK (WHO STANDAR) */}
            {activeTab === 'graph' && (
              <motion.div 
                key="graph-tab" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[3rem] p-10 shadow-xl border border-white"
              >
                <div className="flex justify-between items-end mb-10">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 font-kids">Grafik Pertumbuhan</h3>
                    <p className="text-sm text-slate-400 font-medium">Berdasarkan data 6 bulan terakhir</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                      <span className="w-3 h-3 rounded-full bg-primary" /> Berat Badan
                    </div>
                  </div>
                </div>

                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={childData.history}>
                      <defs>
                        <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                      <Tooltip 
                        contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                      />
                      <Area type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorWeight)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {/* TAB 3: IMUNISASI (TIMELINE) */}
            {activeTab === 'vaccine' && (
              <motion.div 
                key="vaccine-tab" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[3rem] p-10 shadow-xl border border-white"
              >
                <h3 className="text-2xl font-bold text-slate-800 font-kids mb-10">Jadwal Imunisasi</h3>
                <div className="space-y-6">
                  {[
                    { name: 'BCG, Polio 1', age: '0 Bulan', status: 'done', date: '12 Jan 2025' },
                    { name: 'DPT-HB-Hib 1, Polio 2', age: '2 Bulan', status: 'done', date: '12 Mar 2025' },
                    { name: 'PCV 2, Polio 4', age: '4 Bulan', status: 'next', date: 'Mei 2025' },
                    { name: 'Campak Rubella 1', age: '9 Bulan', status: 'future', date: 'Okt 2025' },
                  ].map((vax, idx) => (
                    <div key={idx} className="flex items-center gap-6 p-6 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-all">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${
                        vax.status === 'done' ? 'bg-green-100 text-green-600' : 
                        vax.status === 'next' ? 'bg-primary text-white animate-pulse' : 'bg-white text-slate-300'
                      }`}>
                        {vax.status === 'done' ? <CheckCircle size={28} weight="bold" /> : <Syringe size={28} weight="duotone" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{vax.age}</p>
                        <h4 className="font-bold text-slate-800">{vax.name}</h4>
                        <p className="text-xs text-slate-400 font-medium">{vax.date}</p>
                      </div>
                      {vax.status === 'next' && (
                        <button className="px-5 py-2 bg-primary/10 text-primary text-xs font-black rounded-xl uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                          Ingatkan
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default KidsDashboard;