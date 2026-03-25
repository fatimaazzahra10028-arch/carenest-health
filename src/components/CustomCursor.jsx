import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);

  // Menggunakan useMotionValue agar performa tetap 60fps+ tanpa re-render
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Konfigurasi Spring yang sangat halus (Premium feel)
  const springConfig = { damping: 35, stiffness: 350, mass: 0.5 };
  const circleX = useSpring(mouseX, springConfig);
  const circleY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest('button') ||
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* 1. Lingkaran Luar (Menggunakan Secondary Color) */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: circleX,
          y: circleY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 1.6 : 1,
          borderColor: 'var(--color-secondary)',
        }}
        animate={{
          backgroundColor: isHovering ? 'rgba(168, 230, 207, 0.15)' : 'transparent', // Opacity dari secondary
          borderWidth: isHovering ? '1px' : '2px',
        }}
      />

      {/* 2. Titik Tengah (Menggunakan Primary Color) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: 'var(--color-primary)',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
      />
    </>
  );
};

export default CustomCursor;