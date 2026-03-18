import React from 'react';

const Hero = () => {
  return (
    <div className="min-h-screen bg-care-bg p-4 md:p-6 font-sans">
      {/* Container Utama */}
      <div className="relative h-[90vh] w-full rounded-[40px] overflow-hidden shadow-2xl">
        
        {/* Background Image (Pastikan file hero.png ada di src/assets) */}
        <img 
          src="/src/assets/hero.png" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Mother and Child"
        />

        {/* Overlay Navbar Transparan */}
        <nav className="absolute top-0 w-full flex items-center justify-between px-10 py-6 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">🌿</span>
            </div>
            <span className="font-bold text-xl text-gray-800">CareNest</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <a href="#" className="border-b-2 border-gray-800 pb-1 italic">● Home</a>
            <a href="#" className="hover:text-green-800">About</a>
            <a href="#" className="hover:text-green-800">Causes</a>
            <a href="#" className="hover:text-green-800">Projects</a>
            <a href="#" className="hover:text-green-800">Donate</a>
            <a href="#" className="hover:text-green-800">Contact</a>
          </div>

          <button className="bg-white/90 backdrop-blur-md border border-gray-300 px-6 py-2 rounded-full font-semibold shadow-sm hover:bg-white transition">
            Donate Now
          </button>
        </nav>

        {/* Content Text (Kiri Bawah) */}
        <div className="absolute bottom-16 left-12 z-10 max-w-2xl text-white">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-1 rounded-full text-xs w-fit mb-4">
            ● MAKING LIVES BETTER
          </div>
          <h1 className="text-6xl font-bold leading-[1.1] mb-6 drop-shadow-lg">
            Together We Support <br /> Educate and Heal
          </h1>
          <p className="text-lg opacity-90 max-w-md drop-shadow-md">
            Every donation helps a family grow stronger, healthier, and more secure. 
            Together, we build a future full of possibilities.
          </p>
        </div>

        {/* White Card (Kanan Bawah) */}
        <div className="absolute bottom-10 right-10 bg-white p-8 rounded-[32px] w-[340px] shadow-2xl z-10 border border-gray-100">
           <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold text-gray-400 italic">● 2025</span>
           </div>
           <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <span className="text-green-700 text-xl">🏥</span>
           </div>
           <h3 className="text-2xl font-bold text-gray-800 leading-tight mb-4">
             Make an Immediate Impact
           </h3>
           <p className="text-gray-500 text-sm mb-8">
             Every donation directly supports frontline community programs.
           </p>
           <button className="w-full bg-care-green text-white py-4 rounded-full font-bold hover:bg-opacity-90 transition shadow-lg">
             Donate Now
           </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;