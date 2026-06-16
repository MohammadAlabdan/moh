import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const goals = [
  { id: "lose" as const, label: "نزول وزن", desc: "خسارة دهون مع الحفاظ على العضلات", icon: "↓", color: "var(--color-green)", bg: "var(--color-green-light)" },
  { id: "gain" as const, label: "زيادة وزن", desc: "زيادة الوزن بطريقة صحية", icon: "↑", color: "var(--color-blue)", bg: "var(--color-blue-light)" },
  { id: "muscle" as const, label: "بناء عضل", desc: "زيادة الكتلة العضلية وتحسين القوة", icon: "💪", color: "var(--color-red)", bg: "var(--color-red-light)" },
  { id: "maintain" as const, label: "تثبيت الوزن", desc: "الحفاظ على وزنك الحالي", icon: "=", color: "var(--color-orange)", bg: "var(--color-orange-light)" },
  { id: "health" as const, label: "تحسين الصحة", desc: "نمط حياة صحي ومتوازن", icon: "♥", color: "var(--color-purple)", bg: "#F3E5F5" },
];

export default function GoalSelection() {
  const navigate = useNavigate();

  const handleSelect = (goalId: string) => {
    navigate(`/onboarding/body-data?goal=${goalId}`);
  };

  return (
    <div className="min-h-screen bg-bg">
      <header className="pt-12 pb-4 px-5 max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm text-fg-secondary mb-1">الخطوة 1 من 3</p>
          <h1 className="text-2xl font-extrabold text-fg">ما هو هدفك؟</h1>
          <p className="text-sm text-fg-secondary mt-1">اختر الهدف الذي يناسبك</p>
        </motion.div>
      </header>

      <main className="px-4 max-w-lg mx-auto space-y-3 pb-8">
        {goals.map((g, i) => (
          <motion.button
            key={g.id}
            onClick={() => handleSelect(g.id)}
            className="w-full bg-bg-card rounded-2xl p-5 shadow-[0_2px_12px_var(--color-shadow)] flex items-center gap-4
              text-right hover:shadow-[0_4px_20px_var(--color-shadow)] transition-shadow
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent border border-transparent hover:border-accent/30"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.3 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
              style={{ backgroundColor: g.bg, color: g.color }}
            >
              {g.icon}
            </div>
            <div className="min-w-0">
              <p className="text-base font-bold text-fg">{g.label}</p>
              <p className="text-xs text-fg-secondary mt-0.5">{g.desc}</p>
            </div>
          </motion.button>
        ))}

        {/* Progress bar */}
        <div className="pt-4">
          <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: "33%" }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
