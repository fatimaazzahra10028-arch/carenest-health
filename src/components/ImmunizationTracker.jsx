import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Syringe, CheckCircle, 
  BellRinging, 
  CaretRight, MapPin, X, NavigationArrow, Sparkle
} from '@phosphor-icons/react';

const ImmunizationTracker = ({ childData, onBack }) => {
  const childAge = parseInt(childData?.age) || 0;
  const childName = childData?.name || 'Si Kecil';

  // --- STATE ---
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedVax, setSelectedVax] = useState(null);

  const initialVaxList = [
    { id: 1, age: 0, name: "Hepatitis B 1", desc: "Perlindungan Hati", detail: "Mencegah infeksi virus Hepatitis B yang dapat menyebabkan kerusakan hati kronis. Wajib diberikan dalam waktu 24 jam setelah bayi lahir." },
    { id: 2, age: 1, name: "BCG & Polio 1", desc: "Cegah TBC & Lumpuh", detail: "Vaksin BCG melindungi paru-paru dari bakteri Tuberkulosis, sedangkan Polio mencegah risiko kelumpuhan permanen pada anak." },
    { id: 3, age: 2, name: "DPT-HB-Hib 1", desc: "Vaksin Pentavalen", detail: "Memberikan perlindungan dari 5 penyakit sekaligus: Difteri, Tetanus, Pertusis (Batuk Rejan), Hepatitis B, dan Pneumonia/Meningitis (Hib)." },
    { id: 4, age: 3, name: "DPT-HB-Hib 2", desc: "Booster Kekebalan", detail: "Dosis kedua yang berfungsi untuk memperkuat memori sistem imun si kecil terhadap kuman difteri dan tetanus." },
    { id: 5, age: 4, name: "Polio IPV 2", desc: "Proteksi Maksimal", detail: "Vaksin suntik (IPV) memberikan perlindungan yang jauh lebih kuat dan menyeluruh dibandingkan hanya menggunakan vaksin polio tetes." },
    { id: 6, age: 9, name: "Campak / MR", desc: "Cegah Ruam & Radang", detail: "Vaksin ini sangat krusial untuk mencegah komplikasi berbahaya dari campak seperti radang otak, radang paru, dan kebutaan." },
  ];

  const [vaccines, setVaccines] = useState(() => {
    const saved = localStorage.getItem(`vax_data_${childName}`);
    if (saved) return JSON.parse(saved);
    return initialVaxList.map(vax => ({ ...vax, completed: childAge > vax.age }));
  });

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const toggleComplete = (id) => {
    setVaccines(prev => prev.map(v => v.id === id ? { ...v, completed: !v.completed } : v));
    triggerToast("Data imunisasi berhasil diperbarui");
  };

  useEffect(() => {
    localStorage.setItem(`vax_data_${childName}`, JSON.stringify(vaccines));
  }, [vaccines, childName]);

  const stats = useMemo(() => {
    const completed = vaccines.filter(v => v.completed).length;
    return { count: completed, percent: Math.round((completed / vaccines.length) * 100) };
  }, [vaccines]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 font-outfit relative bg-bg transition-colors duration-500 min-h-screen">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-10 left-1/2 z-[100] bg-slate-800 dark:bg-primary text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-bold border border-white/10"
          >
            <CheckCircle size={20} weight="fill" className="text-secondary" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16">
        <div className="flex items-center gap-6">
          <motion.button 
            whileHover={{ scale: 1.1, x: -5 }}
            onClick={onBack}
            className="p-4 bg-card rounded-[1.5rem] shadow-sm text-text-muted border border-border-soft hover:text-primary transition-all"
          >
            <ArrowLeft size={24} weight="bold" />
          </motion.button>
          <div>
            <h2 className="text-4xl font-kids text-text-main leading-tight transition-colors">Jadwal Imunisasi</h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="px-3 py-1 bg-primary/10 rounded-full flex items-center gap-2">
                <Sparkle size={14} weight="fill" className="text-primary" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{childName} • {childAge} Bulan</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => triggerToast("Pengingat otomatis aktif!")}
          className="flex items-center gap-3 bg-card text-primary px-8 py-4 rounded-[2rem] font-bold text-xs border-2 border-primary/10 transition-all active:bg-primary active:text-white"
        >
          <BellRinging size={20} weight="duotone" /> Aktifkan pengingat
        </button>
      </header>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* LEFT: PROGRESS & MAPS */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Card Progress: Tetap Menggunakan warna gelap mewah (bg-card) */}
          <div className="bg-card rounded-[3.5rem] p-10 text-text-main relative overflow-hidden shadow-3xl border border-border-soft">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[80px] -mr-20 -mt-20" />
            <div className="relative z-10">
              <h4 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-2 font-outfit">Total Vaksinasi</h4>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-6xl font-black">{stats.percent}</span>
                <span className="text-2xl font-bold text-secondary">%</span>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-bg rounded-full overflow-hidden p-1">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.percent}%` }}
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" 
                  />
                </div>
                <p className="text-[11px] font-medium text-text-muted text-center tracking-wide uppercase">
                   {stats.count} dari {vaccines.length} selesai
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-md p-8 rounded-[3rem] border border-border-soft flex flex-col items-center text-center shadow-sm group transition-all">
            <div className="w-16 h-16 bg-bg rounded-[1.5rem] flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition-transform">
              <MapPin size={32} weight="duotone" />
            </div>
            <h4 className="font-bold text-text-main mb-2 font-kids text-xl transition-colors">Lokasi Terdekat</h4>
            <p className="text-xs text-text-muted leading-relaxed mb-6 px-4 transition-colors">Cari Puskesmas atau Rumah Sakit penyedia vaksinasi di sekitarmu.</p>
            <button 
              onClick={() => window.open(`https://www.google.com/maps/search/Rumah+Sakit+atau+Puskesmas+terdekat`, '_blank')}
              className="w-full py-4 bg-primary text-white rounded-2xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <NavigationArrow size={18} weight="fill" /> Buka Google Maps
            </button>
          </div>
        </aside>

        {/* RIGHT: TIMELINE */}
        <main className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-kids text-text-main px-4 transition-colors">Timeline Kesehatan</h3>
            <span className="text-[10px] font-black text-text-muted uppercase border-b-2 border-primary/20 pb-1 transition-colors">Standar IDAI 2026</span>
          </div>

          <div className="grid gap-5">
            {vaccines.map((vax, idx) => {
              const isDue = childAge === vax.age && !vax.completed;
              const isLocked = childAge < vax.age;
              
              return (
                <motion.div 
                  key={vax.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`group relative flex items-center gap-6 p-6 rounded-[2.5rem] border-2 transition-all duration-500 ${
                    vax.completed ? 'bg-secondary/5 border-secondary/10' : 
                    isDue ? 'bg-card border-primary shadow-xl ring-8 ring-primary/5' : 
                    'bg-card border-border-soft shadow-sm'
                  } ${isLocked ? 'grayscale opacity-60' : ''}`}
                >
                  <motion.button 
                    whileTap={{ scale: 0.8 }}
                    disabled={isLocked}
                    onClick={() => toggleComplete(vax.id)}
                    className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center shrink-0 transition-all ${
                      vax.completed ? 'bg-secondary text-white rotate-[360deg]' : 
                      isDue ? 'bg-primary text-white animate-pulse' : 'bg-bg text-text-muted'
                    }`}
                  >
                    {vax.completed ? <CheckCircle size={32} weight="fill" /> : <Syringe size={32} weight="duotone" />}
                  </motion.button>

                  <div className="flex-1 cursor-pointer" onClick={() => !isLocked && setSelectedVax(vax)}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold uppercase ${vax.completed ? 'text-secondary' : 'text-text-muted'}`}>
                        Bulan ke-{vax.age}
                      </span>
                    </div>
                    <h5 className="text-lg font-bold text-text-main font-kids transition-colors">{vax.name}</h5>
                    <p className="text-xs text-text-muted font-medium transition-colors">{vax.desc}</p>
                  </div>
                  
                  <CaretRight size={20} className="text-text-muted/30 group-hover:text-primary transition-colors" />
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>

      {/* MODAL INFORMATION */}
      <AnimatePresence>
        {selectedVax && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedVax(null)} 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" 
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 60 }} 
              animate={{ scale: 1, opacity: 1, y: 40 }} 
              exit={{ scale: 0.9, opacity: 0, y: 60 }} 
              className="relative bg-card w-full max-w-md p-10 rounded-[3.5rem] shadow-none overflow-hidden border border-border-soft"
            >
              <button 
                onClick={() => setSelectedVax(null)} 
                className="absolute top-8 right-8 text-text-muted hover:text-text-main transition-colors"
              >
                <X size={24} weight="bold" />
              </button>

              <div className="w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center text-primary mb-8">
                <Syringe size={40} weight="duotone" />
              </div>

              <h4 className="text-3xl font-kids text-text-main mb-4 transition-colors">{selectedVax.name}</h4>
              <p className="text-text-muted leading-relaxed mb-10 font-medium text-sm transition-colors">
                {selectedVax.detail}
              </p>

              <button 
                onClick={() => setSelectedVax(null)} 
                className="w-full py-5 bg-primary text-white font-bold rounded-2xl font-outfit transition-all hover:brightness-110 active:scale-[0.98]"
              >
                Pahami & tutup
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImmunizationTracker;