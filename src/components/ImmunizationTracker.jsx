import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Syringe, CheckCircle, Clock, 
  Info, BellRinging, CalendarCheck, 
  CaretRight, MapPin, X, NavigationArrow
} from '@phosphor-icons/react';

const ImmunizationTracker = ({ childData, onBack }) => {
  const childAge = parseInt(childData?.age) || 0;
  const childName = childData?.name || 'Si Kecil';

  // --- 1. STATE & STORAGE PERSISTENCE ---
  const [vaccines, setVaccines] = useState(() => {
    const saved = localStorage.getItem(`vax_data_${childName}`);
    if (saved) return JSON.parse(saved);
    
    return [
      { id: 1, age: 0, name: "Hepatitis B 1", desc: "Mencegah infeksi hati & kuning.", detail: "Diberikan dalam 24 jam setelah lahir.", completed: childAge > 0 },
      { id: 2, age: 0, name: "BCG & Polio 0", desc: "Mencegah TBC & Kelumpuhan.", detail: "BCG memberikan perlindungan terhadap TBC berat.", completed: childAge > 0 },
      { id: 3, age: 2, name: "DPT-HB-Hib 1", desc: "Difteri, Pertusis, Tetanus.", detail: "Mencegah 5 penyakit sekaligus dalam satu suntikan.", completed: false },
      { id: 4, age: 2, name: "PCV 1", desc: "Mencegah Radang Paru (Pneumonia).", detail: "Sangat penting untuk mencegah infeksi bakteri pneumokokus.", completed: false },
      { id: 5, age: 3, name: "DPT-HB-Hib 2", desc: "Dosis lanjutan kekebalan.", detail: "Memperkuat antibodi dari dosis pertama.", completed: false },
      { id: 6, age: 4, name: "Polio IPV 2", desc: "Vaksin polio suntik.", detail: "Melengkapi perlindungan polio tetes.", completed: false },
      { id: 7, age: 9, name: "Campak / MR 1", desc: "Mencegah Campak & Rubella.", detail: "Diberikan saat anak berusia 9 bulan.", completed: false },
    ];
  });

  const [selectedVax, setSelectedVax] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(`vax_data_${childName}`, JSON.stringify(vaccines));
  }, [vaccines, childName]);

  // --- 2. PROFESIONAL NOTIFICATION SYSTEM ---
  const requestNotification = () => {
    if (!("Notification" in window)) {
      alert("Browser Moms tidak mendukung notifikasi.");
      return;
    }

    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("MomsCare Aktif!", {
          body: `Jadwal imunisasi ${childName} akan kami ingatkan tepat waktu.`,
          icon: "https://cdn-icons-png.flaticon.com/512/3063/3063176.png"
        });
      }
    });
  };

  // --- 3. GEOLOCATION SYSTEM (CEK LOKASI NYATA) ---
  const findHospital = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          // Membuka Google Maps dengan query RS/Puskesmas terdekat dari posisi user
          window.open(`https://www.google.com/maps/search/Rumah+Sakit+atau+Puskesmas/@${lat},${lng},15z`, '_blank');
          setLocationLoading(false);
        },
        () => {
          // Fallback jika GPS dimatikan
          window.open(`https://www.google.com/maps/search/Rumah+Sakit+atau+Puskesmas+terdekat`, '_blank');
          setLocationLoading(false);
        }
      );
    }
  };

  const toggleComplete = (id) => {
    setVaccines(vaccines.map(v => 
      v.id === id ? { ...v, completed: !v.completed } : v
    ));
  };

  const completedCount = vaccines.filter(v => v.completed).length;
  const progressPercent = (completedCount / vaccines.length) * 100;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-5">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-3.5 bg-white rounded-2xl shadow-sm text-slate-400 border border-slate-100 transition-all hover:text-primary"
          >
            <ArrowLeft size={22} weight="bold" />
          </motion.button>
          <div>
            <h2 className="text-3xl font-kids text-slate-800 font-bold tracking-tight">Jadwal Imunisasi</h2>
            <p className="text-slate-500 text-sm flex items-center gap-1.5 mt-1">
              <CalendarCheck size={18} className="text-primary" weight="fill" />
              Rencana kesehatan untuk <b>{childName}</b>
            </p>
          </div>
        </div>
        
        <motion.button
          onClick={requestNotification}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 bg-primary/10 text-primary px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider border border-primary/20 transition-all hover:bg-primary hover:text-white shadow-lg shadow-primary/5"
        >
          <BellRinging size={20} weight="fill" />
          Aktifkan Pengingat
        </motion.button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* --- LEFT: SUMMARY CARD --- */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
          <div className="bg-gradient-to-br from-primary to-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Usia {childName}</p>
              <h3 className="text-4xl font-black mb-2">{childAge} <span className="text-lg font-medium text-white/80">Bulan</span></h3>
              
              <div className="h-2.5 bg-white/20 rounded-full mt-8 mb-3 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[11px] font-bold text-white/90 uppercase tracking-wide">{completedCount} Selesai</p>
                <p className="text-[11px] font-black text-white">{Math.round(progressPercent)}%</p>
              </div>
            </div>
            <Syringe size={140} weight="duotone" className="absolute -bottom-10 -right-10 opacity-20 rotate-12" />
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
              <Info size={40} weight="fill" className="text-amber-500" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">Tips Sehat</h4>
            <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
              Pastikan {childName} sedang dalam kondisi fit (tidak demam tinggi) sebelum berangkat ke fasilitas kesehatan ya, Moms.
            </p>
          </div>
        </div>

        {/* --- RIGHT: TIMELINE LIST --- */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2 mb-4">
            <h4 className="font-black text-slate-400 text-[11px] uppercase tracking-widest">Garis Waktu Imunisasi</h4>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">IDAI Standard 2026</span>
          </div>

          <div className="space-y-4 relative before:absolute before:inset-0 before:left-[27px] before:w-0.5 before:bg-slate-100 before:z-0">
            {vaccines.map((vax, idx) => {
              const isDue = childAge === vax.age && !vax.completed;
              const isLocked = childAge < vax.age;
              
              return (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={vax.id} 
                  className={`relative z-10 flex items-center gap-5 p-5 rounded-[2rem] border transition-all duration-300 ${
                    vax.completed ? 'bg-emerald-50/60 border-emerald-100' : 
                    isDue ? 'bg-white border-primary shadow-lg shadow-primary/5 scale-[1.02]' : 
                    'bg-white border-slate-100 shadow-sm'
                  } ${isLocked ? 'opacity-50 grayscale-[0.5]' : 'opacity-100'}`}
                >
                  <button 
                    disabled={isLocked}
                    onClick={() => toggleComplete(vax.id)}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
                      vax.completed ? 'bg-emerald-500 text-white shadow-emerald-200 shadow-lg' : 
                      isDue ? 'bg-primary text-white shadow-primary/30 shadow-lg animate-pulse' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {vax.completed ? <CheckCircle size={28} weight="fill" /> : <Clock size={28} weight="bold" />}
                  </button>

                  <div className="flex-1 cursor-pointer" onClick={() => setSelectedVax(vax)}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-black uppercase tracking-tighter ${vax.completed ? 'text-emerald-500' : 'text-slate-400'}`}>
                        Usia {vax.age} Bulan
                      </span>
                      {isDue && <span className="text-[9px] font-bold bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">Jadwal Sekarang</span>}
                    </div>
                    <h5 className="font-bold text-slate-800 text-base leading-none mb-1">{vax.name}</h5>
                    <p className="text-xs text-slate-400 font-medium truncate max-w-[180px] md:max-w-none">{vax.desc}</p>
                  </div>

                  <motion.button 
                    whileHover={{ x: 5 }}
                    onClick={() => setSelectedVax(vax)}
                    className={`p-2 rounded-xl transition-colors ${vax.completed ? 'text-emerald-200' : 'text-slate-300 hover:bg-slate-50'}`}
                  >
                    <CaretRight size={20} weight="bold" />
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {/* CEK LOKASI BUTTON */}
          <motion.button 
            onClick={findHospital}
            whileHover={{ y: -3, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
            disabled={locationLoading}
            className="w-full mt-6 py-5 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-bold text-sm hover:border-primary/30 hover:text-primary transition-all flex items-center justify-center gap-2 group"
          >
            {locationLoading ? (
              <div className="flex items-center gap-2 animate-pulse">
                <NavigationArrow size={20} weight="fill" className="animate-spin" />
                Mencari Lokasi...
              </div>
            ) : (
              <>
                <MapPin size={20} weight="fill" className="group-hover:animate-bounce text-rose-500" />
                Cari RS / Puskesmas Terdekat
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* --- DETAIL MODAL --- */}
      <AnimatePresence>
        {selectedVax && (
          <div className="fixed inset-0 z-[300] flex items-end md:items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedVax(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
              className="relative bg-white w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <button onClick={() => setSelectedVax(null)} className="absolute top-6 right-6 p-2 hover:bg-slate-50 rounded-full transition-colors">
                <X size={20} weight="bold" className="text-slate-400" />
              </button>
              
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Syringe size={32} weight="fill" />
              </div>
              
              <p className="text-[11px] font-black text-primary uppercase tracking-widest mb-2">Informasi Vaksin</p>
              <h4 className="text-2xl font-bold text-slate-800 mb-4">{selectedVax.name}</h4>
              <p className="text-slate-500 leading-relaxed font-medium mb-8">
                {selectedVax.detail} <br/><br/>
                <span className="italic text-slate-400 text-xs">Manfaat: {selectedVax.desc}</span>
              </p>
              
              <button 
                onClick={() => setSelectedVax(null)}
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
              >
                Mengerti, Terima Kasih
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImmunizationTracker;