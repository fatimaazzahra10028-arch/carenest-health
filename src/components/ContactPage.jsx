import React from 'react';
import { motion } from 'framer-motion';
import { EnvelopeSimple, WhatsappLogo, InstagramLogo, PaperPlaneTilt, CaretLeft } from '@phosphor-icons/react';

const ContactPage = ({ onBack }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-bg transition-colors duration-500 font-outfit">
      {/* Tombol Back yang konsisten dengan halaman lain */}
      <motion.button
        whileHover={{ x: -4 }}
        onClick={onBack}
        className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8 text-sm font-semibold"
      >
        <CaretLeft size={18} weight="bold" />
        Kembali
      </motion.button>

      <div className="bg-card rounded-[3rem] border-2 border-border-soft overflow-hidden shadow-2xl flex flex-col md:flex-row transition-all duration-500">
        {/* Kolom Info - Tetap Primary karena ini identitas brand */}
        <div className="bg-primary p-12 text-white md:w-1/3">
          <h2 className="text-3xl font-kids mb-6">Hubungi Kami</h2>
          <p className="text-blue-100 mb-10 text-sm leading-relaxed opacity-90">
            Punya pertanyaan seputar layanan kami atau ingin bekerja sama? Jangan ragu untuk menyapa!
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><WhatsappLogo size={24} weight="bold" /></div>
              <span className="font-bold text-sm">+62 812-3456-7890</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><EnvelopeSimple size={24} weight="bold" /></div>
              <span className="font-bold text-sm">halo@momscare.id</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><InstagramLogo size={24} weight="bold" /></div>
              <span className="font-bold text-sm">@momscare.id</span>
            </div>
          </div>
        </div>

        {/* Kolom Form */}
        <div className="p-12 md:w-2/3 bg-card/40 backdrop-blur-xl transition-colors duration-500">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-text-muted uppercase ml-2 tracking-wider transition-colors">Nama Lengkap</label>
                <input 
                  type="text" 
                  className="w-full px-6 py-4 rounded-2xl border-2 border-border-soft bg-bg text-text-main placeholder:text-text-muted/50 focus:border-primary focus:outline-none transition-all" 
                  placeholder="Masukkan nama..." 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-text-muted uppercase ml-2 tracking-wider transition-colors">Email</label>
                <input 
                  type="email" 
                  className="w-full px-6 py-4 rounded-2xl border-2 border-border-soft bg-bg text-text-main placeholder:text-text-muted/50 focus:border-primary focus:outline-none transition-all" 
                  placeholder="email@contoh.com" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-text-muted uppercase ml-2 tracking-wider transition-colors">Pesan</label>
              <textarea 
                rows="4" 
                className="w-full px-6 py-4 rounded-3xl border-2 border-border-soft bg-bg text-text-main placeholder:text-text-muted/50 focus:border-primary focus:outline-none transition-all" 
                placeholder="Tulis pesan Moms di sini..."
              ></textarea>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary text-white w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:brightness-110 transition-all"
            >
              <PaperPlaneTilt size={22} weight="bold" /> Kirim Pesan
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;