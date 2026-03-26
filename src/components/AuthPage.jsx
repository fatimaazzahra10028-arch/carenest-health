import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Envelope, 
  Lock, 
  User, 
  ArrowRight, 
  WarningCircle, 
  CheckCircle, 
  X, 
  Eye, 
  EyeSlash 
} from '@phosphor-icons/react';
import { useAuth } from '../context/AuthContext';

const AuthPage = ({ onSuccess, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
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

    // Simulasi Backend dengan LocalStorage
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
          const newUser = { 
            name: formData.name, 
            email: formData.email, 
            password: formData.password 
          };
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
    <div className="w-full max-w-4xl mx-auto bg-card rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row border border-border-soft font-outfit overflow-hidden relative transition-all duration-500">
      
      {/* SISI KIRI: Visual & Info (Responsive Hidden on Mobile) */}
      <div className="hidden md:flex w-2/5 bg-bg/50 p-10 flex-col justify-between border-r border-border-soft relative overflow-hidden text-left transition-colors duration-500">
        {/* Dekorasi Background */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />

        <div className="flex items-center gap-2 relative z-10">
          <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
            <Heart size={24} weight="fill" className="text-white" />
          </div>
          <span className="font-kids text-2xl text-text-main font-bold tracking-tight transition-colors">MomsCare</span>
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
              <h2 className="text-4xl font-kids text-text-main leading-[1.1] whitespace-pre-line transition-colors">
                {isLogin ? 'Senang Melihat \nMoms Kembali!' : 'Gabung Jadi \nIbu Hebat!'}
              </h2>
              <p className="mt-5 text-text-muted text-sm leading-relaxed max-w-[200px] transition-colors">
                {isLogin ? 'Yuk, lanjut pantau tumbuh kembang si kecil hari ini.' : 'Daftar sekarang untuk akses fitur lengkap MomsCare.'}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-2 relative z-10">
          <div className={`h-1.5 rounded-full transition-all duration-500 ${isLogin ? 'w-10 bg-primary' : 'w-3 bg-border-soft'}`} />
          <div className={`h-1.5 rounded-full transition-all duration-500 ${!isLogin ? 'w-10 bg-primary' : 'w-3 bg-border-soft'}`} />
        </div>
      </div>

      {/* SISI KANAN: Form */}
      <div className="w-full md:w-3/5 p-8 md:p-14 relative bg-card text-left transition-colors duration-500">
        
        {/* TOMBOL CLOSE (X) */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 p-2 rounded-full text-text-muted hover:bg-bg hover:text-text-main transition-all z-50"
        >
          <X size={24} weight="bold" />
        </button>

        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl font-bold text-text-main tracking-tight transition-colors">
              {isLogin ? 'Selamat Datang' : 'Buat Akun Baru'}
            </h3>
            <p className="text-text-muted text-sm mt-1 transition-colors">Silakan lengkapi detail di bawah ini ya, Moms.</p>
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
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-green-500 text-xs font-bold transition-all">
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
                <InputGroup 
                  name="name" 
                  icon={<User />} 
                  type="text" 
                  placeholder="Nama Lengkap Moms" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  error={errors.name} 
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          <InputGroup 
            name="email" 
            icon={<Envelope />} 
            type="email" 
            placeholder="Alamat Email" 
            value={formData.email} 
            onChange={handleInputChange} 
            error={errors.email} 
          />
          
          <InputGroup 
            name="password" 
            icon={<Lock />} 
            type="password" 
            placeholder="Kata Sandi" 
            value={formData.password} 
            onChange={handleInputChange} 
            error={errors.password}
            isPassword={true}
            showPasswordState={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
          />

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
          <p className="text-sm text-text-muted transition-colors">
            {isLogin ? 'Belum bergabung?' : 'Sudah menjadi member?'} {' '}
            <button 
              type="button" 
              onClick={() => { 
                setIsLogin(!isLogin); 
                setErrors({}); 
                setSuccessMsg(""); 
                setShowPassword(false);
              }} 
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

// Sub-komponen InputGroup yang Dioptimalkan
const InputGroup = ({ 
  icon, 
  type, 
  placeholder, 
  value, 
  onChange, 
  name, 
  error, 
  isPassword, 
  showPasswordState, 
  togglePassword 
}) => (
  <div className="relative group text-left">
    <div className={`absolute left-4 top-[15px] transition-colors duration-300 ${error ? 'text-red-400' : 'text-text-muted group-focus-within:text-primary'}`}>
      {React.cloneElement(icon, { size: 20, weight: "regular" })}
    </div>
    
    <input 
      name={name} 
      type={isPassword ? (showPasswordState ? "text" : "password") : type} 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange}
      className={`w-full bg-bg border-2 py-3.5 pl-12 ${isPassword ? 'pr-12' : 'pr-4'} rounded-2xl outline-none transition-all text-sm font-medium
        ${error ? 'border-red-500/20 bg-red-500/5 focus:border-red-500/40 text-red-500' : 'border-border-soft focus:border-primary/40 text-text-main placeholder:text-text-muted/50'}
      `}
    />

    {/* Fitur Lihat Password */}
    {isPassword && (
      <button
        type="button"
        onClick={togglePassword}
        className="absolute right-4 top-[15px] text-text-muted hover:text-primary transition-colors focus:outline-none"
      >
        {showPasswordState ? <EyeSlash size={20} weight="bold" /> : <Eye size={20} weight="bold" />}
      </button>
    )}

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