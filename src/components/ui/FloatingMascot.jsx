import { motion } from "framer-motion";
import { ChatCircleDots, Stethoscope } from "@phosphor-icons/react";

const FloatingMascot = ({ startAIScreening }) => (
  <motion.div
    onClick={startAIScreening}
    animate={{ y: [0, -12, 0] }}
    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    className="fixed bottom-8 right-8 w-24 h-24 hidden lg:block cursor-pointer z-50 group"
  >
    <div className="relative">
      <div className="relative w-full h-full bg-card rounded-[2.5rem] p-2 border-4 border-border-soft shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:border-primary/30 overflow-visible">
        <img
          src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Snowball&backgroundColor=b6e3f4&radius=20"
          alt="MomsCare Polar Bear"
          className="w-full h-full rounded-[2rem] object-contain bg-white transition-colors duration-500"
        />

        <div className="absolute -bottom-1 -right-1 bg-primary text-white p-2 rounded-xl shadow-lg border-2 border-card transition-all duration-500 group-hover:bg-charcoal">
          <Stethoscope size={20} weight="fill" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="absolute -top-14 -left-44 bg-card px-5 py-3 rounded-2xl rounded-br-none text-[13px] font-bold shadow-2xl border border-border-soft whitespace-nowrap text-text-main pointer-events-none group-hover:opacity-100 transition-all duration-500 flex items-center gap-2"
      >
        <ChatCircleDots size={20} weight="fill" className="text-primary" />
        Tanya MomsBot AI
        <div className="absolute bottom-[-8px] right-0 w-4 h-4 bg-card rotate-45 border-r border-b border-border-soft transition-colors duration-500"></div>
      </motion.div>
    </div>
  </motion.div>
);

export default FloatingMascot;