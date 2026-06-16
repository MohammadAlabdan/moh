import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IconArrowRight, IconX } from "@/icons/MealIcons";
import { IconFire, IconPlus } from "@/icons/Icons";
import { useApp } from "@/context/AppContext";
import type { TrackedMeal } from "@/context/AppContext";

export default function MealHistoryPage() {
  const navigate = useNavigate();
  const { meals, removeMeal } = useApp();

  // Group meals by date
  const grouped = useMemo(() => {
    const map = new Map<string, TrackedMeal[]>();
    for (const meal of meals) {
      const dateKey = meal.date || "اليوم";
      if (!map.has(dateKey)) map.set(dateKey, []);
      map.get(dateKey)!.push(meal);
    }
    return Array.from(map.entries());
  }, [meals]);

  // Today's summary
  const todayKey = new Date().toISOString().split("T")[0];
  const todayMeals = meals.filter((m) => m.date === todayKey);
  const todayCalories = todayMeals.reduce((s, m) => s + m.calories, 0);

  return (
    <div className="min-h-screen bg-bg pb-24" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-bg/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-fg-secondary hover:text-fg hover:bg-bg-card transition-colors"
            aria-label="رجوع"
          >
            <IconArrowRight className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-fg">سجل الوجبات</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 max-w-lg mx-auto mt-4 space-y-4">
        {/* Summary Card */}
        <motion.div
          className="bg-bg-card rounded-2xl p-5 shadow-[0_2px_12px_var(--color-shadow)] flex items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center text-accent shrink-0">
            <IconFire className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-fg-secondary">سعرات اليوم</p>
            <p className="text-2xl font-extrabold text-fg">{todayCalories.toLocaleString("ar-EG")}</p>
          </div>
          <div className="text-center shrink-0">
            <p className="text-2xl font-extrabold text-accent">{todayMeals.length}</p>
            <p className="text-xs text-fg-secondary">وجبات</p>
          </div>
        </motion.div>

        {/* Empty State */}
        {meals.length === 0 ? (
          <motion.div
            className="flex flex-col items-center text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-20 h-20 rounded-3xl bg-accent/10 flex items-center justify-center mb-5">
              <IconFire className="w-10 h-10 text-accent" />
            </div>
            <p className="text-base font-bold text-fg mb-2">لم تسجل وجبات بعد</p>
            <p className="text-sm text-fg-secondary mb-6">ابدأ بإضافة أول وجبة لتتبع سعراتك</p>
            <motion.button
              onClick={() => navigate("/add-meal")}
              className="bg-accent text-white px-8 py-3 rounded-2xl font-bold text-sm
                shadow-[0_2px_8px_rgba(232,168,124,0.3)]
                hover:bg-accent-hover transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              إضافة وجبة
            </motion.button>
          </motion.div>
        ) : (
          /* Grouped Meals */
          <AnimatePresence mode="popLayout">
            {grouped.map(([dateKey, dateMeals], gi) => {
              const displayDate = formatDateLabel(dateKey);
              const dateCals = dateMeals.reduce((s, m) => s + m.calories, 0);

              return (
                <motion.div
                  key={dateKey}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * gi }}
                >
                  {/* Date Header */}
                  <div className="flex items-center justify-between mb-2 px-1">
                    <h3 className="text-sm font-bold text-fg-secondary">{displayDate}</h3>
                    <span className="text-xs text-fg-light">{dateCals} سعرة</span>
                  </div>

                  {/* Meals */}
                  <div className="bg-bg-card rounded-2xl shadow-[0_1px_8px_var(--color-shadow)] overflow-hidden">
                    {dateMeals.map((meal, mi) => (
                      <MealItem
                        key={meal.id}
                        meal={meal}
                        isLast={mi === dateMeals.length - 1}
                        onRemove={() => removeMeal(meal.id)}
                        index={mi}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}

        {/* Add Meal Link */}
        {meals.length > 0 && (
          <motion.button
            onClick={() => navigate("/add-meal")}
            className="w-full flex items-center justify-center gap-2 bg-accent text-white rounded-2xl py-3.5 font-bold text-sm
              shadow-[0_2px_8px_rgba(232,168,124,0.3)]
              hover:bg-accent-hover transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.98 }}
          >
            <IconPlus className="w-5 h-5" />
            إضافة وجبة جديدة
          </motion.button>
        )}
      </main>
    </div>
  );
}

/* ── Meal Item ── */

function MealItem({
  meal,
  isLast,
  onRemove,
  index,
}: {
  meal: TrackedMeal;
  isLast: boolean;
  onRemove: () => void;
  index: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60, height: 0 }}
      transition={{ delay: 0.03 * index, duration: 0.2 }}
      className={`flex items-center gap-3 px-4 py-3.5 ${!isLast ? "border-b border-border" : ""}`}
    >
      {/* Calorie badge */}
      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-accent">{meal.calories}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-fg truncate">{meal.name}</p>
          <span className="text-[11px] text-fg-light shrink-0">{meal.time}</span>
        </div>
        <p className="text-xs text-fg-secondary mt-0.5">
          ب {meal.protein}غ &middot; ك {meal.carbs}غ &middot; د {meal.fat}غ
        </p>
      </div>

      {/* Remove */}
      <button
        onClick={onRemove}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-fg-light hover:text-red hover:bg-red-light transition-colors shrink-0"
        aria-label={`حذف ${meal.name}`}
      >
        <IconX className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

/* ── Helpers ── */

function formatDateLabel(dateKey: string): string {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  if (dateKey === today) return "اليوم";
  if (dateKey === yesterday) return "أمس";

  // Try to parse ISO date and format in Arabic
  try {
    const d = new Date(dateKey);
    if (isNaN(d.getTime())) return dateKey;
    const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    return `${d.getDate()} ${months[d.getMonth()]}`;
  } catch {
    return dateKey;
  }
}
