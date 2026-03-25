import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Syringe, CheckCircle, Clock, 
  BellRinging, CalendarCheck, 
  CaretRight, MapPin, X, NavigationArrow, Sparkle
} from '@phosphor-icons/react';

const ImmunizationTracker = ({ childData, onBack }) => {
  const childAge = parseInt(childData?.age) || 0;
  const childName = childData?.name || 'Si Kecil';

  const initialVaxData = useMemo(() => [
    { id: 1, age: 0, name: "Hepatitis B 1", desc: "Perlindungan Hati", detail: "Mencegah infeksi virus Hepatitis B yang dapat menyebabkan kerusakan hati kronis. Wajib 24 jam setelah lahir.", completed: childAge > 0 },
    { id: 2, age: 1, name: "BCG & Polio 1", desc: "Cegah TBC & Lumpuh", detail: "BCG melindungi paru-paru dari bakteri Tuberkulosis, Polio mencegah kelumpuhan permanen.", completed: childAge > 1 },
    { id: 3, age: 2, name: "DPT-HB-Hib 1", desc: "Vaksin Pentavalen", detail: "Melindungi dari 5 penyakit: Difteri, Tetanus, Pertusis, Hepatitis B, dan Pneumonia/Meningitis (Hib).", completed: false },
    { id: 4, age: 3, name: "DPT-HB-Hib 2", desc: "Booster Kekebalan", detail: "Dosis kedua untuk memperkuat memori sistem imun terhadap kuman difteri dan tetanus.", completed: false },
    { id: 5, age: 4, name: "Polio IPV 2", desc: "Proteksi Maksimal", detail: "Vaksin suntik (IPV) memberikan perlindungan lebih kuat dibanding hanya polio tetes.", completed: false },
    { id: 6, age: 9, name: "Campak / MR", desc: "Cegah Ruam & Radang", detail: "Sangat penting untuk mencegah komplikasi campak seperti radang otak dan kebutaan.", completed: false },
  ], [childAge]);

  const [vaccines, setVaccines] = useState(() => {
    const saved = localStorage.getItem(`vax_data_${childName}`);
    return saved ? JSON.parse(saved) : initialVaxData;
  });

  const [selectedVax, setSelectedVax] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(`vax_data_${childName}`, JSON.stringify(vaccines));
  }, [vaccines, childName]);

  const toggleComplete = (id) => {
    setVaccines(prev => prev.map(v => v.id === id ? { ...v, completed: !v.completed } : v));
  };

  const stats = useMemo(() => {
    const completed = vaccines.filter(v => v.completed).length;
    return { count: completed, percent: Math.round((completed / vaccines.length) * 100) };
  }, [vaccines]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 font-outfit">
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16">
        <div className="flex items-center gap-6">
          <motion.button 
            whileHover={{ scale: 1.1, x: -5 }}
            onClick={onBack}
            className="p-4 bg-white rounded-[1.5rem] shadow-sm text-slate-400 border border-slate-100 hover:text-primary transition-all"
          >
            <ArrowLeft size={24} weight="bold" />
          </motion.button>
          <div>
            <h2 className="text-4xl font-kids text-slate-800 leading-tight">Jadwal Imunisasi</h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="px-3 py-1 bg-primary/10 rounded-full flex items-center gap-2">
                <Sparkle size={14} weight="fill" className="text-primary" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{childName} • {childAge} Bulan</span>
              </div>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ y: -3, shadow: "0 20px 25px -5px rgb(125 162 195 / 0.2)" }}
          className="flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-[2rem] font-bold text-xs uppercase tracking-widest border-2 border-primary/10 transition-all shadow-xl shadow-primary/5"
        >
          <BellRinging size={20} weight="duotone" /> Pengingat Otomatis
        </motion.button>
      </header>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* LEFT: PROGRESS DASHBOARD */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white relative overflow-hidden shadow-3xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-[80px] -mr-20 -mt-20" />
            
            <div className="relative z-10">
              <h4 className="text-sm font-bold opacity-60 uppercase tracking-widest mb-2 font-outfit">Total Vaksinasi</h4>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-6xl font-black">{stats.percent}</span>
                <span className="text-2xl font-bold text-secondary">%</span>
              </div>

              <div className="space-y-4">
                <div className="h-4 bg-white/10 rounded-full overflow-hidden p-1">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.percent}%` }}
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_15px_rgba(168,230,207,0.5)]" 
                  />
                </div>
                <p className="text-[11px] font-medium text-white/50 text-center tracking-wide uppercase">
                   {stats.count} dari {vaccines.length} imunisasi selesai
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-md p-8 rounded-[3rem] border border-white flex flex-col items-center text-center shadow-sm group">
            <div className="w-16 h-16 bg-accent/20 rounded-[1.5rem] flex items-center justify-center text-amber-600 mb-4 transition-transform group-hover:scale-110">
              <MapPin size={32} weight="duotone" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2 font-kids">Lokasi Terdekat</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">Cari Rumah Sakit atau Puskesmas penyedia vaksinasi di sekitarmu.</p>
            <button className="w-full py-3 bg-slate-800 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-colors">Cek Maps</button>
          </div>
        </aside>

        {/* RIGHT: INTERACTIVE TIMELINE */}
        <main className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-kids text-slate-800 px-4">Timeline Kesehatan</h3>
            <span className="text-[10px] font-black text-slate-400 uppercase border-b-2 border-primary/20 pb-1">Standar IDAI 2026</span>
          </div>

          <div className="grid gap-5">
            {vaccines.map((vax, idx) => {
              const isDue = childAge === vax.age && !vax.completed;
              const isLocked = childAge < vax.age;
              
              return (
                <motion.div 
                  key={vax.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`group relative flex items-center gap-6 p-6 rounded-[2.5rem] border-2 transition-all duration-500 ${
                    vax.completed ? 'bg-secondary/5 border-secondary/10' : 
                    isDue ? 'bg-white border-primary shadow-2xl shadow-primary/10 ring-8 ring-primary/5' : 
                    'bg-white border-slate-50 shadow-sm'
                  } ${isLocked ? 'grayscale opacity-60' : ''}`}
                >
                  <motion.button 
                    whileTap={{ scale: 0.8 }}
                    disabled={isLocked}
                    onClick={() => toggleComplete(vax.id)}
                    className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center shrink-0 transition-all duration-500 ${
                      vax.completed ? 'bg-secondary text-white rotate-[360deg]' : 
                      isDue ? 'bg-primary text-white animate-pulse shadow-lg shadow-primary/30' : 'bg-slate-100 text-slate-300'
                    }`}
                  >
                    {vax.completed ? <CheckCircle size={32} weight="fill" /> : <Syringe size={32} weight="duotone" />}
                  </motion.button>

                  <div className="flex-1 cursor-pointer" onClick={() => !isLocked && setSelectedVax(vax)}>
                    <div className="flex items-center gap-2 mb-1">
                       <span className={`text-[10px] font-bold uppercase tracking-tighter ${vax.completed ? 'text-secondary' : 'text-slate-400'}`}>
                        Bulan ke-{vax.age}
                      </span>
                      {isDue && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />}
                    </div>
                    <h5 className="text-lg font-bold text-slate-800 font-kids">{vax.name}</h5>
                    <p className="text-xs text-slate-400 font-medium">{vax.desc}</p>
                  </div>

                  {!isLocked && (
                    <button onClick={() => setSelectedVax(vax)} className="p-3 bg-slate-50 rounded-2xl text-slate-300 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                      <CaretRight size={20} weight="bold" />
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>

      {/* MODAL INFORMATION (Glassmorphism) */}
      <AnimatePresence>
        {selectedVax && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedVax(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" 
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }} 
              animate={{ scale: 1, y: 0, opacity: 1 }} 
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative bg-white w-full max-w-md p-10 rounded-[4rem] shadow-3xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
              <button onClick={() => setSelectedVax(null)} className="absolute top-8 right-8 p-2 rounded-full bg-slate-50 text-slate-400 hover:text-slate-800 transition-colors">
                <X size={20} weight="bold" />
              </button>
              
              <div className="w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center text-primary mb-8 border border-primary/10">
                <Syringe size={40} weight="duotone" />
              </div>
              
              <h4 className="text-3xl font-kids text-slate-800 mb-4">{selectedVax.name}</h4>
              <p className="text-slate-500 leading-relaxed mb-10 font-medium">
                {selectedVax.detail}
              </p>
              
              <button 
                onClick={() => setSelectedVax(null)}
                className="w-full py-5 bg-primary text-white font-bold rounded-[2rem] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all font-outfit uppercase tracking-widest text-xs"
              >
                Pahami & Tutup
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImmunizationTracker;