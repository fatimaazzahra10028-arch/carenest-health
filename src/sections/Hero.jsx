import React from 'react';

const Hero = () => {
  return (
    <section className="relative h-[600px] m-4 rounded-3xl overflow-hidden bg-gray-200">
      {/* Background Image */}
      <img src="/path-to-your-image.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Mother and Child" />
      
      {/* Overlay Content */}
      <div className="relative z-10 p-12 flex flex-col justify-center h-full text-white max-w-2xl">
        <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm mb-4 w-fit italic">
          ● MAKING LIVES BETTER
        </span>
        <h1 className="text-6xl font-bold leading-tight mb-6">
          Together We Support <br /> Educate and Heal
        </h1>
        <p className="text-lg opacity-90">
          Every donation helps a family grow stronger, healthier, and more secure.
        </p>
      </div>
      
      {/* Donation Card (Kanan Bawah) */}
      <div className="absolute bottom-8 right-8 bg-white p-8 rounded-2xl shadow-xl w-80 text-gray-800">
         <h3 className="text-xl font-bold mb-4">Make an Immediate Impact</h3>
         <button className="w-full bg-care-green text-white py-3 rounded-full font-semibold">
           Donate Now
         </button>
      </div>
    </section>
  );
};