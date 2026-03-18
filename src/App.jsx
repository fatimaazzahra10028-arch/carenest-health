import Navbar from './components/Navbar';
import CategoryGrid from './components/CategoryGrid';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-10 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl text-slate-800 leading-tight mb-6">
            MomsCare: Teman Setia <br/> <span className="text-primary italic">Ibu Rawat Si Kecil.</span>
          </h1>
          <p className="text-lg text-slate-500 mb-10 font-medium">
            Informasi kesehatan akurat untuk setiap langkah pertumbuhan buah hati. <br/>
            <span className="text-accent font-bold italic">"Tumbuh Hebat Bersama Ibu"</span>
          </p>

          {/* Search Bar with Glow */}
          <div className="relative max-w-lg mx-auto group">
            <input 
              type="text" 
              placeholder="Cari: Imunisasi, MPASI, Gizi..."
              className="w-full px-8 py-4 rounded-full border-2 border-slate-100 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium shadow-sm group-hover:shadow-md"
            />
            <button className="absolute right-3 top-3 bg-primary p-2 rounded-full text-white px-6 font-bold text-sm">Cari</button>
          </div>
        </motion.div>
      </section>

      <CategoryGrid />

      {/* CTA Cards Section */}
      <section className="px-6 md:px-20 pb-20 grid md:grid-cols-2 gap-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-primary/10 p-10 rounded-[3rem] border-2 border-primary/20 flex items-center justify-between group cursor-pointer"
        >
          <div>
            <h3 className="font-kids text-2xl text-primary mb-2">Cek Grafik Pertumbuhan</h3>
            <p className="text-slate-600 text-sm font-medium">Pantau berat & tinggi badan ideal.</p>
          </div>
          <div className="text-4xl group-hover:scale-110 transition-transform">📊</div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-secondary/20 p-10 rounded-[3rem] border-2 border-secondary/30 flex items-center justify-between group cursor-pointer"
        >
          <div>
            <h3 className="font-kids text-2xl text-secondary-dark font-bold text-[#4D8C75] mb-2">Reminder Imunisasi</h3>
            <p className="text-slate-600 text-sm font-medium">Jadwal vaksin jangan sampai terlewat!</p>
          </div>
          <div className="text-4xl group-hover:rotate-12 transition-transform">🗓️</div>
        </motion.div>
      </section>

      {/* Maskot Floating Panda (Static for now, can use Lottie) */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="fixed bottom-10 right-10 w-24 h-24 hidden md:block cursor-help drop-shadow-xl"
      >
        <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Panda" alt="Mascot" className="w-full h-full" />
        <div className="absolute -top-10 -left-10 bg-white p-2 rounded-xl text-[10px] font-bold shadow-md border border-slate-100">Halo, Moms! 👋</div>
      </motion.div>
    </div>
  );
}

export default App;