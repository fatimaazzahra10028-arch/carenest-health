import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserPlus, 
  Baby, 
  Files, 
  PencilSimple, 
  Syringe, 
  ChartLineUp,
  CaretRight
} from "@phosphor-icons/react";
import GrowthTracker from "./GrowthTracker";
import ImmunizationTracker from "./ImmunizationTracker";

const ChildDataManager = () => {
  const [childData, setChildData] = useState(null);
  const [activeView, setActiveView] = useState("selection"); // 'selection', 'input', 'growth', 'vax'
  const [isEditing, setIsEditing] = useState(false);

  // Load data saat pertama kali buka
  useEffect(() => {
    const saved = localStorage.getItem("active_child_data");
    if (saved) {
      setChildData(JSON.parse(saved));
    } else {
      setActiveView("input");
    }
  }, []);

  const saveToLocal = (data) => {
    localStorage.setItem("active_child_data", JSON.stringify(data));
    setChildData(data);
    setActiveView("selection");
    setIsEditing(false);
  };

  // Navigasi Render
  if (activeView === "growth") {
    return <GrowthTracker initialData={childData} onBack={() => setActiveView("selection")} onSave={saveToLocal} />;
  }

  if (activeView === "vax") {
    return <ImmunizationTracker childData={childData} onBack={() => setActiveView("selection")} />;
  }

  return (
    <div className="min-h-screen bg-bg font-outfit p-6 flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {activeView === "input" || isEditing ? (
          <InputForm 
            key="form"
            initialData={childData} 
            onSave={saveToLocal} 
            onCancel={() => setActiveView("selection")} 
          />
        ) : (
          <SelectionMenu 
            key="menu"
            childData={childData} 
            onNavigate={setActiveView} 
            onEdit={() => setIsEditing(true)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- SUB-COMPONENT: FORM INPUT ---
const InputForm = ({ onSave, initialData, onCancel }) => {
  const [form, setForm] = useState(initialData || { name: "", age: "", gender: "boy", weight: "", height: "" });

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-card p-10 rounded-[3.5rem] border border-border-soft shadow-2xl w-full max-w-lg"
    >
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mb-4">
          <UserPlus size={40} weight="duotone" />
        </div>
        <h2 className="text-3xl font-kids text-text-main">Data Si Kecil</h2>
        <p className="text-sm text-text-muted mt-2">Lengkapi data untuk personalisasi tracker</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-[10px] font-bold text-text-muted uppercase ml-4 mb-2 block">Nama Panggilan</label>
          <input 
            className="w-full px-6 py-4 bg-bg rounded-2xl border-2 border-border-soft outline-none focus:border-primary transition-all font-bold"
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
            placeholder="Contoh: Arka"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-text-muted uppercase ml-4 mb-2 block">Usia (Bulan)</label>
            <input 
              type="number"
              className="w-full px-6 py-4 bg-bg rounded-2xl border-2 border-border-soft outline-none focus:border-primary transition-all font-bold"
              value={form.age}
              onChange={(e) => setForm({...form, age: e.target.value})}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-text-muted uppercase ml-4 mb-2 block">Gender</label>
            <select 
              className="w-full px-6 py-4 bg-bg rounded-2xl border-2 border-border-soft outline-none focus:border-primary transition-all font-bold appearance-none"
              value={form.gender}
              onChange={(e) => setForm({...form, gender: e.target.value})}
            >
              <option value="boy">Laki-laki</option>
              <option value="girl">Perempuan</option>
            </select>
          </div>
        </div>

        <button 
          onClick={() => onSave(form)}
          className="w-full py-5 bg-primary text-white rounded-[2rem] font-bold text-lg shadow-lg hover:brightness-110 transition-all mt-4"
        >
          Simpan Data
        </button>
        {initialData && (
          <button onClick={onCancel} className="w-full text-text-muted font-bold text-sm">Batal</button>
        )}
      </div>
    </motion.div>
  );
};

// --- SUB-COMPONENT: SELECTION MENU ---
const SelectionMenu = ({ childData, onNavigate, onEdit }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-card rounded-full border border-border-soft mb-6">
          <Baby size={24} weight="duotone" className="text-primary" />
          <span className="font-bold text-text-main">Halo, Bunda {childData?.name}!</span>
          <button onClick={onEdit} className="p-2 hover:bg-bg rounded-full transition-colors text-text-muted">
            <PencilSimple size={18} />
          </button>
        </div>
        <h1 className="text-5xl font-kids text-text-main">Mau cek apa hari ini?</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <MenuCard 
          icon={ChartLineUp} 
          title="Growth Tracker" 
          desc="Cek status gizi, BMI, dan perkembangan fisik."
          color="bg-primary"
          onClick={() => onNavigate("growth")}
        />
        <MenuCard 
          icon={Syringe} 
          title="Immunization" 
          desc="Jadwal vaksinasi dan riwayat imunisasi."
          color="bg-secondary"
          onClick={() => onNavigate("vax")}
        />
      </div>
    </motion.div>
  );
};

const MenuCard = ({ icon: Icon, title, desc, color, onClick }) => (
  <motion.button
    whileHover={{ y: -10 }}
    onClick={onClick}
    className="bg-card p-8 rounded-[3rem] border border-border-soft shadow-xl text-left group transition-all"
  >
    <div className={`w-14 h-14 ${color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20`}>
      <Icon size={28} weight="duotone" />
    </div>
    <h3 className="text-2xl font-kids text-text-main mb-2">{title}</h3>
    <p className="text-xs text-text-muted leading-relaxed mb-6">{desc}</p>
    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
      Buka Tracker <CaretRight weight="bold" />
    </div>
  </motion.button>
);

export default ChildDataManager;