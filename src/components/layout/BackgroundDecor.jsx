import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

const BackgroundDecor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 250 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 250 });

  const moveX = useTransform(smoothX, [0, 2000], [35, -35]);
  const moveY = useTransform(smoothY, [0, 1000], [35, -35]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const FloatingShape = ({ type, colorClass }) => {
    const baseStyle = "w-full h-full backdrop-blur-[2px] border-2 shadow-sm transition-colors duration-500";
    
    if (type === 'circle') return (
      <div className={`${baseStyle} rounded-full ${colorClass} border-blue-200/40`} />
    );
    
    if (type === 'ring') return (
      <div className={`rounded-full border-[3px] ${colorClass} opacity-50 w-full h-full`} />
    );

    if (type === 'pill') return (
      <div className={`${baseStyle} rounded-full ${colorClass} border-blue-100/30 w-full h-[60%] my-[20%]`} />
    );
    
    return null;
  };

  // Pengaturan jumlah elemen
  const totalElements = 12;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#f0f7ff]">
      
      {/* LAYER 1: AMBIENT GLOW */}
      <motion.div
        style={{ x: moveX, y: moveY }}
        className="absolute -top-[5%] -left-[5%] w-[55vw] h-[55vw] bg-blue-500/10 rounded-full blur-[120px]"
      />

      {/* LAYER 2: CONSISTENT FLOATING SHAPES */}
      {[...Array(totalElements)].map((_, i) => {
        // Membuat posisi X konsisten terbagi rata (grid-like) tapi tetap dinamis
        const horizontalPosition = (i * (100 / totalElements)) + (Math.random() * 5); 
        const size = 30 + (i % 3 * 10); // Ukuran bergantian (30px, 40px, 50px)
        const duration = 20 + (i % 4 * 5); // Durasi bergantian agar flow tidak serentak

        return (
          <motion.div
            key={i}
            initial={{ y: "110vh" }}
            animate={{ 
              y: "-20vh",
              // Gerakan mengayun yang konsisten
              x: [`${horizontalPosition}vw`, `${horizontalPosition + (i % 2 === 0 ? 2 : -2)}vw`, `${horizontalPosition}vw`],
              rotate: [0, 180, 360],
              opacity: [0, 0.6, 0.6, 0]
            }}
            transition={{ 
              duration: duration, 
              repeat: Infinity, 
              delay: (i * (duration / totalElements)), // Staggered delay agar muncul satu per satu secara teratur
              ease: "linear" 
            }}
            className="absolute"
            style={{ 
              width: size, 
              height: size,
              left: 0 // Posisi dikontrol oleh animasi x
            }}
          >
            <FloatingShape 
              type={['circle', 'ring', 'pill'][i % 3]} 
              colorClass={[
                'bg-blue-500/15', 
                'border-blue-500/30', 
                'bg-blue-400/10', 
                'bg-white/70'
              ][i % 4]}
            />
          </motion.div>
        );
      })}

      {/* LAYER 3: WAVE */}
      <div className="absolute bottom-0 left-0 w-full leading-[0]">
        <svg className="relative block w-full h-[120px] md:h-[160px]" viewBox="0 24 150 28" preserveAspectRatio="none">
          <defs>
            <path id="wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use href="#wave" x="48" y="0" fill="rgba(59, 130, 246, 0.1)" />
            <use href="#wave" x="48" y="3" fill="rgba(59, 130, 246, 0.2)" />
            <use href="#wave" x="48" y="7" fill="#ffffff" />
          </g>
        </svg>
      </div>

      <style>{`
        .parallax > use { animation: move-wave 25s cubic-bezier(.55,.5,.45,.5) infinite; }
        .parallax > use:nth-child(1) { animation-delay: -2s; animation-duration: 10s; }
        .parallax > use:nth-child(2) { animation-delay: -4s; animation-duration: 15s; }
        .parallax > use:nth-child(3) { animation-delay: -5s; animation-duration: 22s; }
        @keyframes move-wave {
          0% { transform: translate3d(-90px,0,0); }
          100% { transform: translate3d(85px,0,0); }
        }
      `}</style>
    </div>
  );
};

export default BackgroundDecor;