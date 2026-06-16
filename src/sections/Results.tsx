import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";

export default function Results() {
  const navigate = useNavigate();
  const { profile, plan } = useApp();

  if (!profile || !plan) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-fg-secondary mb-4">لم يتم حساب البيانات بعد</p>
          <button
            onClick={() => navigate("/onboarding/goal")}
            className="bg-accent text-white px-6 py-3 rounded-2xl font-bold"
          >
            ابدأ من جديد
          </button>
        </div>
      </div>
    );
  }

  const goalLabels: Record<string, string> = {
    lose: "نزول وزن",
    gain: "زيادة وزن",
    muscle: "بناء عضل",
    maintain: "تثبيت الوزن",
    health: "تحسين الصحة",
  };

  const stats = [
    { label: "معدل الأيض BMR", value: plan.bmr, unit: "سعرة", color: "var(--color-fg)" },
    { label: "الاحتياج اليومي TDEE", value: plan.tdee, unit: "سعرة", color: "var(--color-fg)" },
    { label: "السعرات المستهدفة", value: plan.dailyCalories, unit: "سعرة", color: "var(--color-accent)", big: true },
    { label: "البروتين", value: plan.protein, unit: "غ", color: "var(--color-red)" },
    { label: "الكربوهيدرات", value: plan.carbs, unit: "غ", color: "var(--color-orange)" },
    { label: "الدهون", value: plan.fat, unit: "غ", color: "var(--color-blue)" },
    { label: "الماء المقترح", value: plan.water, unit: "لتر", color: "var(--color-blue)" },
  ];

  return (
    <div className="min-h-screen bg-bg pb-8">
      <header className="pt-12 pb-2 px-5 max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-green-light flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-fg mb-1">خطتك جاهزة!</h1>
          <p className="text-sm text-fg-secondary">
            هدفك: {goalLabels[profile.goal] || profile.goal} &middot; {profile.name}
          </p>
        </motion.div>
      </header>

      <main className="px-4 max-w-lg mx-auto mt-6 space-y-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className={`bg-bg-card rounded-2xl p-4 shadow-[0_2px_12px_var(--color-shadow)] flex items-center justify-between
              ${s.big ? "border-2 border-accent/30" : ""}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.3 }}
          >
            <span className="text-sm font-bold text-fg">{s.label}</span>
            <div className="flex items-baseline gap-1">
              <span
                className={`font-extrabold ${s.big ? "text-2xl" : "text-xl"}`}
                style={{ color: s.color }}
              >
                {s.value}
              </span>
              <span className="text-xs text-fg-secondary">{s.unit}</span>
            </div>
          </motion.div>
        ))}

        {/* Info */}
        <motion.div
          className="bg-accent/10 rounded-2xl p-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-xs text-fg-secondary leading-relaxed">
            هذه النتائج مبنية على معادلة Mifflin-St Jeor العلمية. يمكنك تعديل القيم يدويًا لاحقًا من الإعدادات.
            النتائج تقديرية وقد تختلف حسب طبيعة جسمك ونشاطك الفعلي.
          </p>
        </motion.div>

        {/* Progress */}
        <div className="pt-2">
          <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={{ width: "66%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
          </div>
        </div>

        <motion.button
          onClick={() => navigate("/")}
          className="w-full bg-accent text-white py-4 rounded-2xl font-bold text-base
            shadow-[0_4px_16px_rgba(232,168,124,0.3)]
            hover:bg-accent-hover transition-colors
            focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileTap={{ scale: 0.97 }}
        >
          ابدأ تتبع يومك
        </motion.button>
      </main>
    </div>
  );
}
