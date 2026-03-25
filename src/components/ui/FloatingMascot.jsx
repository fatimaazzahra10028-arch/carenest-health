import { motion } from "framer-motion";

const FloatingMascot = ({ startAIScreening }) => (
      <motion.div
        onClick={startAIScreening}
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="fixed bottom-8 right-8 w-20 h-20 hidden lg:block cursor-pointer z-50 group"
      >
        <div className="relative">
          <img
            src="https://api.dicebear.com/7.x/bottts/svg?seed=Panda&backgroundColor=7DA2C3"
            alt="Mascot"
            className="w-full h-full bg-white rounded-3xl p-2 border-4 border-white shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-6"
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="absolute -top-14 -left-44 bg-white px-5 py-3 rounded-2xl rounded-br-none text-[13px] font-bold shadow-2xl border border-slate-50 whitespace-nowrap text-slate-700 pointer-events-none group-hover:opacity-100 transition-opacity"
          >
            Tanya MomsBot AI? 👋
            <div className="absolute bottom-[-8px] right-0 w-4 h-4 bg-white rotate-45 border-r border-b border-slate-50"></div>
          </motion.div>
        </div>
      </motion.div>
);

export default FloatingMascot;