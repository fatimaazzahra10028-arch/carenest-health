import React from "react";
import { motion, LayoutGroup } from "framer-motion";
import {
  Baby,
  OrangeSlice,
  Footprints,
  Shapes,
  Backpack,
  Books,
} from "@phosphor-icons/react";

const categories = [
  {
    id: "neonatal",
    age: "Neonatal",
    range: "0–28 Hari",
    icon: <Baby size={36} weight="duotone" />,
    color: "bg-green-500/10 dark:bg-green-500/20",
    iconColor: "text-green-600 dark:text-green-400",
    border: "border-green-500/20",
  },
  {
    id: "bayi",
    age: "Bayi",
    range: "0–11 Bulan",
    icon: <OrangeSlice size={36} weight="duotone" />,
    color: "bg-orange-500/10 dark:bg-orange-500/20",
    iconColor: "text-orange-500 dark:text-orange-400",
    border: "border-orange-500/20",
  },
  {
    id: "batita",
    age: "Batita",
    range: "1–3 Tahun",
    icon: <Footprints size={36} weight="duotone" />,
    color: "bg-yellow-500/10 dark:bg-yellow-500/20",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    border: "border-yellow-500/20",
  },
  {
    id: "balita",
    age: "Balita",
    range: "3–5 Tahun",
    icon: <Shapes size={36} weight="duotone" />,
    color: "bg-pink-500/10 dark:bg-pink-500/20",
    iconColor: "text-pink-500 dark:text-pink-400",
    border: "border-pink-500/20",
  },
  {
    id: "prasekolah",
    age: "Prasekolah",
    range: "5–6 Tahun",
    icon: <Backpack size={36} weight="duotone" />,
    color: "bg-purple-500/10 dark:bg-purple-500/20",
    iconColor: "text-purple-500 dark:text-purple-400",
    border: "border-purple-500/20",
  },
  {
    id: "sekolah",
    age: "Sekolah",
    range: "6–10 Tahun",
    icon: <Books size={36} weight="duotone" />,
    color: "bg-blue-500/10 dark:bg-blue-500/20",
    iconColor: "text-blue-500 dark:text-blue-400",
    border: "border-blue-500/20",
  },
];

const CategoryGrid = ({ selectedCategory, onCategoryChange }) => (
  <section className="px-6 md:px-20 py-12 bg-bg transition-colors duration-500">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
      <LayoutGroup>
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            layout
            onClick={() => onCategoryChange && onCategoryChange(cat.id)}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div
              className={`
              relative overflow-hidden
              ${cat.color} w-24 h-24 md:w-28 md:h-28 
              rounded-[2.5rem] flex items-center justify-center 
              border-2 ${cat.border}
              transition-all duration-500
              ${selectedCategory === cat.id ? "ring-4 ring-primary ring-offset-4 ring-offset-bg shadow-2xl scale-105" : "shadow-lg hover:shadow-xl"}
            `}
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${cat.iconColor.replace("text", "bg")}`}
              />

              <div
                className={`${cat.iconColor} z-10 transition-transform duration-500 group-hover:scale-110`}
              >
                {cat.icon}
              </div>
            </div>

            <div className="mt-5 text-center">
              <h3
                className={`font-kids font-bold transition-colors duration-300 ${selectedCategory === cat.id ? "text-primary scale-110" : "text-text-main"}`}
              >
                {cat.age}
              </h3>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">
                {cat.range}
              </p>
            </div>
          </motion.div>
        ))}
      </LayoutGroup>
    </div>
  </section>
);

export default CategoryGrid;
