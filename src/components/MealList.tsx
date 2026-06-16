import { motion } from "framer-motion";
import type { TrackedMeal } from "@/context/AppContext";

interface MealListProps {
  meals: TrackedMeal[];
}

function MealTimeIcon({ time }: { time: string }) {
  if (time.includes("ص")) {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  if (time.includes("م") && parseInt(time) < 5) {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="14" r="5" />
        <path d="M12 5v2M5.64 8.64l1.41 1.41M18.36 8.64l-1.41 1.41M4 14h2M18 14h2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <line x1="3" y1="20" x2="21" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export default function MealList({ meals }: MealListProps) {
  return (
    <div className="bg-bg-card rounded-2xl p-5 shadow-[0_2px_12px_var(--color-shadow)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-fg">وجبات اليوم</h3>
        <span className="text-sm text-fg-secondary">{meals.length} وجبات</span>
      </div>
      <div className="space-y-1">
        {meals.map((meal, i) => (
          <motion.div
            key={meal.id}
            className="flex items-center justify-between py-3 border-b border-border last:border-0 cursor-pointer hover:bg-bg/50 rounded-xl px-2 -mx-2 transition-colors"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.3 }}
            whileHover={{ x: -4 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-light flex items-center justify-center text-green shrink-0">
                <MealTimeIcon time={meal.time} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-fg truncate">{meal.name}</p>
                <p className="text-xs text-fg-secondary mt-0.5">{meal.time}</p>
              </div>
            </div>
            <div className="text-left shrink-0 mr-2">
              <p className="text-sm font-bold text-accent">
                {meal.calories} سعرة
              </p>
              <p className="text-xs text-fg-secondary">
                ب{meal.protein} ك{meal.carbs} د{meal.fat}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
