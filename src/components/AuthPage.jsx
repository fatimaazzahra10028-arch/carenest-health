import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Envelope, Lock, User, ArrowRight, WarningCircle, CheckCircle, X } from '@phosphor-icons/react';
import { useAuth } from '../context/AuthContext';

const AuthPage = ({ onSuccess, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg("");
    
    let newErrors = {};
    if (!isLogin && !formData.name.trim()) newErrors.name = "Nama wajib diisi.";
    if (!formData.email) newErrors.email = "Email jangan kosong.";
    if (!formData.password) newErrors.password = "Kata sandi wajib diisi.";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    const registeredUsers = JSON.parse(localStorage.getItem('moms_accounts') || '[]');

    setTimeout(() => {
      if (isLogin) {
        const foundUser = registeredUsers.find(u => u.email === formData.email);
        
        if (!foundUser) {
          setErrors({ email: "Akun tidak ditemukan. Silakan daftar dulu ya, Moms." });
          setIsLoading(false);
        } else if (foundUser.password !== formData.password) {
          setErrors({ password: "Kata sandi salah nih, Moms." });
          setIsLoading(false);
        } else {
          login(foundUser);
          setIsLoading(false);
          if (onSuccess) onSuccess();
        }
      } else {
        const isExist = registeredUsers.some(u => u.email === formData.email);
        
        if (isExist) {
          setErrors({ email: "Email ini sudah terdaftar. Silakan login saja." });
          setIsLoading(false);
        } else {
          const newUser = { name: formData.name, email: formData.email, password: formData.password };
          const updatedUsers = [...registeredUsers, newUser];
          localStorage.setItem('moms_accounts', JSON.stringify(updatedUsers));
          
          setIsLoading(false);
          setSuccessMsg("Pendaftaran berhasil! Silakan login ya, Moms.");
          
          setTimeout(() => {
            setIsLogin(true);
            setSuccessMsg("");
            setFormData(prev => ({ ...prev, password: '' })); 
          }, 1500);
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
    <div className="w-full max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row border border-slate-100 font-outfit overflow-hidden relative">
      
      {/* SISI KIRI: Visual & Info */}
      <div className="hidden md:flex w-2/5 bg-slate-50 p-10 flex-col justify-between border-r border-slate-100 relative overflow-hidden text-left">
        {/* Dekorasi Background */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />

        <div className="flex items-center gap-2 relative z-10">
          <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
            <Heart size={24} weight="fill" className="text-white" />
          </div>
          <span className="font-kids text-2xl text-slate-800 font-bold tracking-tight">MomsCare</span>
        </div>

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login-text' : 'reg-text'}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-4xl font-kids text-slate-800 leading-[1.1] whitespace-pre-line">
                {isLogin ? 'Senang Melihat \nMoms Kembali!' : 'Gabung Jadi \nIbu Hebat!'}
              </h2>
              <p className="mt-5 text-slate-500 text-sm leading-relaxed max-w-[200px]">
                {isLogin ? 'Yuk, lanjut pantau tumbuh kembang si kecil hari ini.' : 'Daftar sekarang untuk akses fitur lengkap MomsCare.'}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-2 relative z-10">
          <div className={`h-1.5 rounded-full transition-all duration-500 ${isLogin ? 'w-10 bg-primary' : 'w-3 bg-slate-200'}`} />
          <div className={`h-1.5 rounded-full transition-all duration-500 ${!isLogin ? 'w-10 bg-primary' : 'w-3 bg-slate-200'}`} />
        </div>
      </div>

      {/* SISI KANAN: Form */}
      <div className="w-full md:w-3/5 p-8 md:p-14 relative bg-white text-left">
        
        {/* TOMBOL CLOSE (X) */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 p-2 rounded-full text-slate-300 hover:bg-slate-50 hover:text-slate-500 transition-all z-50"
        >
          <X size={24} weight="bold" />
        </button>

        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
              {isLogin ? 'Selamat Datang' : 'Buat Akun Baru'}
            </h3>
            <p className="text-slate-400 text-sm mt-1">Silakan lengkapi detail di bawah ini ya, Moms.</p>
          </motion.div>
        </div>

        {/* Notifikasi Sukses */}
        <AnimatePresence>
          {successMsg && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 text-green-600 text-xs font-bold">
                <CheckCircle size={22} weight="fill" />
                {successMsg}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <InputGroup name="name" icon={<User />} type="text" placeholder="Nama Lengkap Moms" value={formData.name} onChange={handleInputChange} error={errors.name} />
              </motion.div>
            )}
          </AnimatePresence>
          
          <InputGroup name="email" icon={<Envelope />} type="email" placeholder="Alamat Email" value={formData.email} onChange={handleInputChange} error={errors.email} />
          <InputGroup name="password" icon={<Lock />} type="password" placeholder="Kata Sandi" value={formData.password} onChange={handleInputChange} error={errors.password} />

          <div className="pt-2">
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading || successMsg}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary/25 flex items-center justify-center gap-3 hover:brightness-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? 'Masuk ke Akun' : 'Daftar Sekarang'}</span>
                  <ArrowRight weight="bold" size={18} />
                </>
              )}
            </motion.button>
          </div>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500">
            {isLogin ? 'Belum bergabung?' : 'Sudah menjadi member?'} {' '}
            <button 
              type="button" 
              onClick={() => { setIsLogin(!isLogin); setErrors({}); setSuccessMsg(""); }} 
              className="text-primary font-bold hover:underline underline-offset-4"
            >
              {isLogin ? 'Daftar Disini' : 'Login Disini'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ icon, type, placeholder, value, onChange, name, error }) => (
  <div className="relative group text-left">
    <div className={`absolute left-4 top-[15px] transition-colors duration-300 ${error ? 'text-red-400' : 'text-slate-400 group-focus-within:text-primary'}`}>
      {React.cloneElement(icon, { size: 20, weight: "regular" })}
    </div>
    <input 
      name={name} 
      type={type} 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange}
      className={`w-full bg-slate-50 border-2 py-3.5 pl-12 pr-4 rounded-2xl outline-none transition-all text-sm font-medium
        ${error ? 'border-red-100 bg-red-50/30 focus:border-red-200' : 'border-slate-50 focus:border-primary/20 focus:bg-white'}
      `}
    />
    <AnimatePresence>
      {error && (
        <motion.p 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: 'auto' }} 
          className="text-[11px] text-red-500 mt-1.5 ml-2 font-semibold flex items-center gap-1.5"
        >
          <WarningCircle size={14} weight="fill" /> {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

export default AuthPage;