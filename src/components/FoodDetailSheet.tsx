import { useState } from "react";
import { motion } from "framer-motion";
import type { FoodItem } from "@/data/foodData";
import { IconX } from "@/icons/MealIcons";

interface FoodDetailSheetProps {
  food: FoodItem;
  onClose: () => void;
  onAdd: (servings: number) => void;
}

export default function FoodDetailSheet({ food, onClose, onAdd }: FoodDetailSheetProps) {
  const [servings, setServings] = useState(1);

  const cal = Math.round(food.calories * servings);
  const pro = Math.round(food.protein * servings * 10) / 10;
  const carb = Math.round(food.carbs * servings * 10) / 10;
  const fat = Math.round(food.fat * servings * 10) / 10;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/30 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Sheet */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 bg-bg-card rounded-t-3xl shadow-[0_-4px_30px_rgba(0,0,0,0.1)] max-h-[85vh] overflow-y-auto"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        <div className="max-w-lg mx-auto px-5 py-6">
          {/* Handle */}
          <div className="flex justify-center mb-4">
            <div className="w-10 h-1 rounded-full bg-border" />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-fg">{food.name}</h2>
              <p className="text-sm text-fg-secondary mt-1">{food.servingSize}</p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-bg flex items-center justify-center text-fg-secondary hover:text-fg transition-colors"
              aria-label="إغلاق"
            >
              <IconX className="w-4 h-4" />
            </button>
          </div>

          {/* Calories */}
          <div className="bg-accent/10 rounded-2xl p-4 text-center mb-5">
            <p className="text-3xl font-extrabold text-accent">{cal}</p>
            <p className="text-sm text-fg-secondary">سعرة حرارية</p>
          </div>

          {/* Macros Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <MacroStat label="بروتين" value={pro} unit="غ" color="var(--color-red)" bgColor="var(--color-red-light)" />
            <MacroStat label="كربوهيدرات" value={carb} unit="غ" color="var(--color-orange)" bgColor="var(--color-orange-light)" />
            <MacroStat label="دهون" value={fat} unit="غ" color="var(--color-blue)" bgColor="var(--color-blue-light)" />
          </div>

          {/* Servings */}
          <div className="mb-6">
            <label className="text-sm font-bold text-fg mb-2 block">عدد الحصص</label>
            <div className="flex items-center gap-3 bg-bg rounded-2xl p-2">
              <button
                onClick={() => setServings((s) => Math.max(0.5, s - 0.5))}
                className="w-11 h-11 rounded-xl bg-bg-card border border-border flex items-center justify-center text-fg font-bold text-lg
                  hover:border-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="تقليل"
              >
                -
              </button>
              <span className="flex-1 text-center text-xl font-extrabold text-fg">
                {servings}
              </span>
              <button
                onClick={() => setServings((s) => Math.min(10, s + 0.5))}
                className="w-11 h-11 rounded-xl bg-bg-card border border-border flex items-center justify-center text-fg font-bold text-lg
                  hover:border-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="زيادة"
              >
                +
              </button>
            </div>
          </div>

          {/* Add Button */}
          <motion.button
            onClick={() => onAdd(servings)}
            className="w-full bg-accent text-white py-4 rounded-2xl font-bold text-base
              shadow-[0_4px_16px_rgba(232,168,124,0.3)]
              hover:bg-accent-hover active:scale-[0.98]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40
              transition-colors"
            whileTap={{ scale: 0.97 }}
          >
            إضافة للوجبات ({cal} سعرة)
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

function MacroStat({
  label,
  value,
  unit,
  color,
  bgColor,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
  bgColor: string;
}) {
  return (
    <div
      className="rounded-2xl p-3 text-center"
      style={{ backgroundColor: bgColor }}
    >
      <p className="text-lg font-extrabold" style={{ color }}>
        {value}
      </p>
      <p className="text-[10px] text-fg-secondary font-medium">
        {unit} {label}
      </p>
    </div>
  );
}
