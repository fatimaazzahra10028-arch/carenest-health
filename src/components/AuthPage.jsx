import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Envelope, Lock, User, ArrowRight, GoogleLogo, FacebookLogo, WarningCircle } from '@phosphor-icons/react';
import { useAuth } from '../context/AuthContext';

const AuthPage = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // 1. Validasi Input Dasar
    let newErrors = {};
    if (!isLogin && !formData.name.trim()) newErrors.name = "Nama wajib diisi.";
    if (!formData.email) newErrors.email = "Email jangan kosong.";
    if (!formData.password) newErrors.password = "Kata sandi wajib diisi.";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulasi Database dengan LocalStorage (Daftar seluruh akun terdaftar)
    const registeredUsers = JSON.parse(localStorage.getItem('moms_accounts') || '[]');

    setTimeout(() => {
      if (isLogin) {
        // --- LOGIKA LOGIN ---
        const foundUser = registeredUsers.find(u => u.email === formData.email);
        
        if (!foundUser) {
          setErrors({ email: "Akun tidak ditemukan. Silakan daftar dulu ya, Moms." });
          setIsLoading(false);
        } else if (foundUser.password !== formData.password) {
          setErrors({ password: "Kata sandi salah nih, Moms." });
          setIsLoading(false);
        } else {
          // Login Berhasil
          login(foundUser);
          setIsLoading(false);
          if (onSuccess) onSuccess();
        }
      } else {
        // --- LOGIKA DAFTAR ---
        const isExist = registeredUsers.some(u => u.email === formData.email);
        
        if (isExist) {
          setErrors({ email: "Email ini sudah terdaftar. Silakan login saja." });
          setIsLoading(false);
        } else {
          // Simpan ke "Database" LocalStorage
          const newUser = { name: formData.name, email: formData.email, password: formData.password };
          const updatedUsers = [...registeredUsers, newUser];
          localStorage.setItem('moms_accounts', JSON.stringify(updatedUsers));
          
          // Langsung Login setelah Daftar
          login(newUser);
          setIsLoading(false);
          if (onSuccess) onSuccess();
        }
      }
    }, 1200);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
      
      {/* SISI KIRI: Visual */}
      <div className="hidden md:flex w-2/5 bg-slate-50 p-10 flex-col justify-between border-r border-slate-100">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <Heart size={24} weight="fill" className="text-white" />
          </div>
          <span className="font-kids text-xl text-slate-800 font-bold">MomsCare</span>
        </div>

        <div>
          <h2 className="text-3xl font-kids text-slate-800 leading-tight">
            {isLogin ? 'Senang Melihat \nMoms Kembali!' : 'Gabung Jadi \nIbu Hebat!'}
          </h2>
          <p className="mt-4 text-slate-500 text-sm leading-relaxed">
            {isLogin ? 'Masukkan akun terdaftar Moms.' : 'Daftar sekarang untuk memantau tumbuh kembang si kecil.'}
          </p>
        </div>
        <div className="flex gap-2"><div className="w-8 h-1 bg-primary rounded-full" /><div className="w-2 h-1 bg-slate-200 rounded-full" /></div>
      </div>

      {/* SISI KANAN: Form */}
      <div className="w-full md:w-3/5 p-8 md:p-12">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-800">{isLogin ? 'Masuk Akun' : 'Daftar Baru'}</h3>
          <p className="text-slate-400 text-xs">Ayo lanjut rawat si kecil bersama MomsCare</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <InputGroup name="name" icon={<User />} type="text" placeholder="Nama Lengkap" value={formData.name} onChange={handleInputChange} error={errors.name} />
          )}
          <InputGroup name="email" icon={<Envelope />} type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} error={errors.email} />
          <InputGroup name="password" icon={<Lock />} type="password" placeholder="Kata Sandi" value={formData.password} onChange={handleInputChange} error={errors.password} />

          <motion.button 
            whileTap={{ scale: 0.97 }}
            disabled={isLoading}
            className="w-full bg-primary text-white py-3.5 rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-2 hover:brightness-105 transition-all disabled:opacity-50"
          >
            {isLoading ? "Memproses..." : (isLogin ? 'Masuk Sekarang' : 'Buat Akun')}
            {!isLoading && <ArrowRight weight="bold" size={18} />}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'} {' '}
            <button type="button" onClick={() => { setIsLogin(!isLogin); setErrors({}); }} className="text-primary font-bold hover:underline">
              {isLogin ? 'Daftar Disini' : 'Login Disini'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ icon, type, placeholder, value, onChange, name, error }) => (
  <div className="relative group">
    <div className={`absolute left-4 top-[14px] ${error ? 'text-red-400' : 'text-slate-400 group-focus-within:text-primary'}`}>
      {React.cloneElement(icon, { size: 18 })}
    </div>
    <input 
      name={name} type={type} placeholder={placeholder} value={value} onChange={onChange}
      className={`w-full bg-slate-50 border py-3 pl-11 pr-4 rounded-xl outline-none transition-all text-xs
        ${error ? 'border-red-200 bg-red-50/30' : 'border-slate-100 focus:border-primary focus:bg-white'}
      `}
    />
    {error && (
      <motion.p initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-[10px] text-red-500 mt-1 ml-1 font-bold flex items-center gap-1">
        <WarningCircle size={12} weight="fill" /> {error}
      </motion.p>
    )}
  </div>
);

export default AuthPage;