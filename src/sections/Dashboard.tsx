import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp, getTodayArabic, getNowTimeArabic } from "@/context/AppContext";
import { mostUsedFoods, type FoodItem } from "@/data/foodData";
import CalorieRing from "@/components/CalorieRing";
import MacroCard from "@/components/MacroCard";
import WaterTracker from "@/components/WaterTracker";
import WeightCard from "@/components/WeightCard";
import ComplianceBadge from "@/components/ComplianceBadge";
import AiTipCard from "@/components/AiTipCard";
import MealList from "@/components/MealList";
import FloatingActionButton from "@/components/FloatingActionButton";
import BottomNav from "@/components/BottomNav";
import { IconDroplet, IconScale, IconBrain, IconPlus, IconChart, IconMeat, IconWheat, IconOil } from "@/icons/Icons";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    profile, plan, onboardingComplete,
    todayMeals, consumed, waterGlasses,
    addMeal, notifications,
  } = useApp();

  if (!onboardingComplete || !profile || !plan) {
    return <Navigate to="/welcome" replace />;
  }

  const remaining = {
    calories: Math.max(0, plan.dailyCalories - consumed.calories),
    protein: Math.max(0, plan.protein - consumed.protein),
    carbs: Math.max(0, plan.carbs - consumed.carbs),
    fat: Math.max(0, plan.fat - consumed.fat),
  };

  const waterTarget = Math.round(plan.water / 0.25);
  const compliance = plan.dailyCalories > 0
    ? Math.min(100, Math.round((consumed.calories / plan.dailyCalories) * 100))
    : 0;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "صباح الخير" : hour < 17 ? "مساء الخير" : "مساء الخير";

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const handleQuickAdd = (food: FoodItem) => {
    addMeal({
      name: food.name,
      time: getNowTimeArabic(),
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
    });
  };

  return (
    <div className="min-h-screen bg-bg pb-28" dir="rtl">
      <motion.main
        className="px-4 max-w-lg mx-auto pt-6 space-y-4"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* ── Header ── */}
        <motion.div className="flex items-start justify-between" variants={fadeUp}>
          <div>
            <p className="text-sm text-fg-secondary">{greeting}،</p>
            <h1 className="text-2xl font-extrabold text-fg">{profile.name}</h1>
            <p className="text-xs text-fg-light mt-0.5">{getTodayArabic()}</p>
          </div>
          <button
            onClick={() => navigate("/notifications")}
            className="relative w-10 h-10 rounded-xl bg-bg-card flex items-center justify-center shadow-[0_1px_4px_var(--color-shadow)]"
          >
            <span className="text-fg text-sm font-bold">{profile.name.charAt(0)}</span>
            {unreadNotifs > 0 && (
              <span className="absolute -top-1 -left-1 w-4.5 h-4.5 bg-red text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadNotifs}
              </span>
            )}
          </button>
        </motion.div>

        {/* ── Quick Stats Row ── */}
        <motion.div variants={fadeUp}>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
            <QuickStat
              icon={<IconScale className="w-4.5 h-4.5" />}
              label="السعرات المتبقية"
              value={remaining.calories.toLocaleString("ar-EG")}
              unit="سعرة"
              color="var(--color-accent)"
              bgColor="var(--color-orange-light)"
              onClick={() => navigate("/reports")}
            />
            <QuickStat
              icon={<IconDroplet className="w-4 h-4" />}
              label="الماء"
              value={`${waterGlasses}/${waterTarget}`}
              unit="كوب"
              color="var(--color-blue)"
              bgColor="var(--color-blue-light)"
              onClick={() => navigate("/water")}
            />
            <QuickStat
              icon={<IconChart className="w-4.5 h-4.5" />}
              label="الوجبات"
              value={todayMeals.length.toLocaleString("ar-EG")}
              unit="وجبة"
              color="var(--color-green)"
              bgColor="var(--color-green-light)"
              onClick={() => navigate("/meal-history")}
            />
            <QuickStat
              icon={<IconBrain className="w-4.5 h-4.5" />}
              label="الالتزام"
              value={`${compliance}%`}
              unit=""
              color="var(--color-purple)"
              bgColor="#F3E5F5"
              onClick={() => navigate("/reports")}
            />
          </div>
        </motion.div>

        {/* ── Quick Actions ── */}
        <motion.div variants={fadeUp}>
          <div className="flex gap-2.5">
            <QuickAction
              icon={<IconPlus className="w-5 h-5" />}
              label="أضف وجبة"
              color="var(--color-accent)"
              bgColor="var(--color-accent)"
              textWhite
              onClick={() => navigate("/add-meal")}
            />
            <QuickAction
              icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>}
              label="صحّح وجبتي"
              color="var(--color-green)"
              bgColor="var(--color-green-light)"
              onClick={() => navigate("/fix-meal")}
            />
            <QuickAction
              icon={<IconBrain className="w-5 h-5" />}
              label="المساعد"
              color="var(--color-purple)"
              bgColor="#F3E5F5"
              onClick={() => navigate("/ai-assistant")}
            />
          </div>
        </motion.div>

        {/* ── Calorie Ring ── */}
        <motion.div variants={fadeUp}>
          <CalorieRing
            budget={plan.dailyCalories}
            consumed={consumed.calories}
          />
        </motion.div>

        {/* ── Macro Cards ── */}
        <motion.div className="grid grid-cols-3 gap-2.5" variants={fadeUp}>
          <MacroCard label="البروتين" consumed={consumed.protein} target={plan.protein} color="var(--color-red)" bgColor="var(--color-red-light)" icon={<IconMeat className="w-4 h-4" />} />
          <MacroCard label="الكربوهيدرات" consumed={consumed.carbs} target={plan.carbs} color="var(--color-orange)" bgColor="var(--color-orange-light)" icon={<IconWheat className="w-4 h-4" />} />
          <MacroCard label="الدهون" consumed={consumed.fat} target={plan.fat} color="var(--color-purple)" bgColor="#F3E5F5" icon={<IconOil className="w-4 h-4" />} />
        </motion.div>

        {/* ── Quick Add Meals (Shortcuts) ── */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-fg">إضافة سريعة</h2>
            <button
              onClick={() => navigate("/add-meal")}
              className="text-xs text-accent font-medium hover:underline"
            >
              عرض الكل
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
            {mostUsedFoods.map((food) => (
              <motion.button
                key={food.id}
                className="shrink-0 bg-bg-card rounded-2xl px-3.5 py-3 shadow-[0_1px_6px_var(--color-shadow)] border border-border
                  hover:border-accent/40 transition-colors text-right min-w-[130px]"
                onClick={() => handleQuickAdd(food)}
                whileTap={{ scale: 0.96 }}
              >
                <p className="text-xs font-bold text-fg truncate mb-1">{food.name}</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-extrabold text-accent">{food.calories}</span>
                  <span className="text-[10px] text-fg-light">سعرة</span>
                </div>
                <div className="flex gap-1.5 mt-1.5">
                  <span className="text-[9px] bg-red-light text-red rounded px-1 py-0.5">ب{food.protein}</span>
                  <span className="text-[9px] bg-orange-light text-orange rounded px-1 py-0.5">ك{food.carbs}</span>
                  <span className="text-[9px] bg-blue-light text-blue rounded px-1 py-0.5">د{food.fat}</span>
                </div>
                <div className="mt-2 w-full bg-accent text-white text-[10px] font-bold text-center rounded-lg py-1">
                  + أضف
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Water + Weight Row ── */}
        <motion.div className="grid grid-cols-2 gap-2.5" variants={fadeUp}>
          <WaterTracker current={waterGlasses} target={waterTarget} />
          <WeightCard currentWeight={profile.weight} targetWeight={profile.targetWeight} />
        </motion.div>

        {/* ── Compliance ── */}
        <motion.div variants={fadeUp}>
          <ComplianceBadge percentage={compliance} />
        </motion.div>

        {/* ── AI Tip ── */}
        <motion.div variants={fadeUp}>
          <AiTipCard caloriesRemaining={remaining.calories} proteinRemaining={remaining.protein} />
        </motion.div>

        {/* ── Today's Meals ── */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-fg">وجبات اليوم</h2>
            <span className="text-xs text-fg-light">{todayMeals.length} وجبات</span>
          </div>
          {todayMeals.length > 0 ? (
            <MealList meals={todayMeals} />
          ) : (
            <div className="bg-bg-card rounded-2xl p-6 text-center shadow-[0_2px_12px_var(--color-shadow)]">
              <div className="w-14 h-14 rounded-2xl bg-border/50 flex items-center justify-center mx-auto mb-3">
                <IconPlus className="w-6 h-6 text-fg-light" />
              </div>
              <p className="text-sm text-fg-secondary mb-1">لم تسجل وجبات اليوم بعد</p>
              <p className="text-xs text-fg-light">اضغط + لإضافة وجبتك الأولى</p>
            </div>
          )}
        </motion.div>
      </motion.main>

      <FloatingActionButton />
      <BottomNav />
    </div>
  );
}

/* ── Quick Stat Card ── */
function QuickStat({ icon, label, value, unit, color, bgColor, onClick }: {
  icon: React.ReactNode; label: string; value: string; unit: string;
  color: string; bgColor: string; onClick: () => void;
}) {
  return (
    <motion.button
      className="shrink-0 bg-bg-card rounded-2xl px-3.5 py-3 shadow-[0_1px_6px_var(--color-shadow)] border border-border
        min-w-[115px] text-right hover:border-accent/30 transition-colors"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
    >
      <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ background: bgColor, color }}>
        {icon}
      </div>
      <p className="text-[10px] text-fg-light mb-0.5">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-extrabold" style={{ color }}>{value}</span>
        {unit && <span className="text-[10px] text-fg-light">{unit}</span>}
      </div>
    </motion.button>
  );
}

/* ── Quick Action Button ── */
function QuickAction({ icon, label, color, bgColor, textWhite, onClick }: {
  icon: React.ReactNode; label: string; color: string; bgColor: string;
  textWhite?: boolean; onClick: () => void;
}) {
  return (
    <motion.button
      className="flex-1 rounded-2xl py-3 px-2 flex flex-col items-center gap-1.5 shadow-[0_2px_8px_var(--color-shadow)] transition-colors"
      style={{ background: bgColor, color: textWhite ? "white" : color }}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
    >
      {icon}
      <span className="text-[11px] font-bold">{label}</span>
    </motion.button>
  );
}
