import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

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
    const baseStyle =
      "w-full h-full backdrop-blur-[2px] border-2 shadow-sm transition-all duration-700";
    if (type === "circle")
      return (
        <div
          className={`${baseStyle} rounded-full ${colorClass} border-primary/20`}
        />
      );
    if (type === "ring")
      return (
        <div
          className={`rounded-full border-[3px] ${colorClass} opacity-40 w-full h-full transition-all duration-700`}
        />
      );
    if (type === "pill")
      return (
        <div
          className={`${baseStyle} rounded-full ${colorClass} border-primary/10 w-full h-[60%] my-[20%]`}
        />
      );
    return null;
  };

  const totalElements = 12;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-bg transition-colors duration-700">
      <motion.div
        style={{ x: moveX, y: moveY }}
        className="absolute -top-[5%] -left-[5%] w-[55vw] h-[55vw] bg-primary/15 rounded-full blur-[120px] transition-colors duration-700"
      />

      {[...Array(totalElements)].map((_, i) => {
        const horizontalPosition =
          i * (100 / totalElements) + Math.random() * 5;
        const size = 30 + (i % 3) * 10;
        const duration = 20 + (i % 4) * 5;

        return (
          <motion.div
            key={i}
            initial={{ y: "110vh" }}
            animate={{
              y: "-20vh",
              x: [
                `${horizontalPosition}vw`,
                `${horizontalPosition + (i % 2 === 0 ? 2 : -2)}vw`,
                `${horizontalPosition}vw`,
              ],
              rotate: [0, 180, 360],
              opacity: [0, 0.4, 0.4, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay: i * (duration / totalElements),
              ease: "linear",
            }}
            className="absolute"
            style={{ width: size, height: size, left: 0 }}
          >
            <FloatingShape
              type={["circle", "ring", "pill"][i % 3]}
              colorClass={
                [
                  "bg-primary/20 dark:bg-primary/20",
                  "border-primary/30 dark:border-primary/40",
                  "bg-secondary/20 dark:bg-secondary/20",
                  "bg-white/60 dark:bg-white/5",
                ][i % 4]
              }
            />
          </motion.div>
        );
      })}

      <div className="absolute bottom-0 left-0 w-full leading-[0]">
        <svg
          className="relative block w-full h-[120px] md:h-[160px]"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax transition-all duration-700">
            <use
              href="#wave"
              x="48"
              y="0"
              className="fill-primary/10 transition-colors duration-700"
            />
            <use
              href="#wave"
              x="48"
              y="3"
              className="fill-primary/20 dark:fill-primary/30 transition-colors duration-700"
            />
            <use
              href="#wave"
              x="48"
              y="7"
              className="fill-bg transition-colors duration-700"
            />
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