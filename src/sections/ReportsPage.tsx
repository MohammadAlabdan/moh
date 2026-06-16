import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IconArrowRight } from "@/icons/MealIcons";
import { useApp, goalLabels } from "@/context/AppContext";

type Tab = "daily" | "weekly" | "monthly";

export default function ReportsPage() {
  const navigate = useNavigate();
  const { profile, plan, consumed, todayMeals, waterGlasses, weightEntries } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>("daily");

  const tabs: { key: Tab; label: string }[] = [
    { key: "daily", label: "يومي" },
    { key: "weekly", label: "أسبوعي" },
    { key: "monthly", label: "شهري" },
  ];

  const dailyCals = plan?.dailyCalories ?? 2200;
  const compliance = dailyCals > 0 ? Math.min(100, Math.round((consumed.calories / dailyCals) * 100)) : 0;
  const proteinPct = plan ? Math.round((consumed.protein / plan.protein) * 100) : 0;
  const carbsPct = plan ? Math.round((consumed.carbs / plan.carbs) * 100) : 0;
  const fatPct = plan ? Math.round((consumed.fat / plan.fat) * 100) : 0;
  const waterTarget = plan ? Math.round(plan.water / 0.25) : 8;
  const waterPct = waterTarget > 0 ? Math.round((waterGlasses / waterTarget) * 100) : 0;

  const currentWeight = profile?.weight ?? 80;
  const targetWeight = profile?.targetWeight ?? 72;
  const latestWeight = weightEntries.length > 0 ? weightEntries[0].weight : currentWeight;

  // Smart summary
  const summary = useMemo(() => {
    if (todayMeals.length === 0) return "لم تسجل وجبات بعد. ابدأ بتسجيل وجباتك للحصول على تقرير مفصل.";
    const parts: string[] = [];
    if (compliance <= 80) parts.push(`استهلكت ${consumed.calories} سعرة من أصل ${dailyCals}، أنت ملتزم بشكل جيد.`);
    else if (compliance <= 100) parts.push(`استهلاكك قريب من الهدف (${consumed.calories}/${dailyCals}).`);
    else parts.push(`تجاوزت هدفك اليومي بـ ${consumed.calories - dailyCals} سعرة. حاول تقليل الكمية غدًا.`);

    if (proteinPct < 50) parts.push("البروتين منخفض جدًا، أضف مصادر بروتين لوجباتك.");
    else if (proteinPct < 80) parts.push("البروتين جيد لكن يمكن تحسينه.");
    if (waterPct < 50) parts.push("اشرب ماء أكثر! هدفك " + waterTarget + " كوب.");
    if (waterPct >= 100) parts.push("أحسنت! أكملت هدفك من الماء.");
    return parts.join(" ");
  }, [todayMeals, consumed, dailyCals, compliance, proteinPct, waterPct, waterTarget]);

  const tipForNextWeek = useMemo(() => {
    const tips = [
      "حاول توزيع وجباتك على 4-5 وجبات صغيرة بدل 2-3 وجبات كبيرة.",
      "أضف سلطة كبيرة قبل كل وجبة رئيسية للشبع السريع.",
      "استبدل المشروبات الغازية بالماء أو الشاي الأخضر.",
      "جرب تحضير وجباتك مسبقًا يوم الأحد لتجنب الأكل العشوائي.",
      "امشِ 30 دقيقة يوميًا لتحسين حرق السعرات.",
    ];
    return tips[Math.floor(Date.now() / 86400000) % tips.length];
  }, []);

  return (
    <div className="min-h-screen bg-bg pb-24" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-bg/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-fg-secondary hover:text-fg hover:bg-bg-card transition-colors"
          >
            <IconArrowRight className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-fg">التقارير</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 max-w-lg mx-auto mt-4 space-y-4">
        {/* Tabs */}
        <div className="bg-bg-card rounded-2xl p-1 flex gap-1 shadow-[0_1px_6px_var(--color-shadow)]">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all
                ${activeTab === t.key ? "bg-accent text-white shadow-sm" : "text-fg-secondary hover:text-fg"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Goal Badge */}
        {profile && (
          <motion.div
            className="bg-accent/10 rounded-2xl px-4 py-3 flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-sm text-fg-secondary">الهدف</span>
            <span className="text-sm font-bold text-accent">{goalLabels[profile.goal] || profile.goal}</span>
          </motion.div>
        )}

        {/* Calories Overview */}
        <motion.div
          className="bg-bg-card rounded-2xl p-5 shadow-[0_2px_12px_var(--color-shadow)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <h3 className="text-sm font-bold text-fg mb-4">السعرات</h3>
          <div className="flex items-center justify-center mb-4">
            <svg viewBox="0 0 120 120" className="w-28 h-28">
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-border)" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="52"
                fill="none"
                stroke={compliance > 100 ? "var(--color-red)" : "var(--color-green)"}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${Math.min(compliance, 100) * 3.27} 327`}
                transform="rotate(-90 60 60)"
              />
              <text x="60" y="55" textAnchor="middle" fontSize="18" fontWeight="bold" fill="var(--color-fg)">
                {compliance}%
              </text>
              <text x="60" y="72" textAnchor="middle" fontSize="9" fill="var(--color-fg-secondary)">
                التزام
              </text>
            </svg>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-lg font-extrabold text-fg">{dailyCals}</p>
              <p className="text-xs text-fg-secondary">الهدف</p>
            </div>
            <div>
              <p className="text-lg font-extrabold text-accent">{consumed.calories}</p>
              <p className="text-xs text-fg-secondary">مستهلك</p>
            </div>
            <div>
              <p className="text-lg font-extrabold text-green">{Math.max(0, dailyCals - consumed.calories)}</p>
              <p className="text-xs text-fg-secondary">متبقي</p>
            </div>
          </div>
        </motion.div>

        {/* Macros Bars */}
        <motion.div
          className="bg-bg-card rounded-2xl p-5 shadow-[0_2px_12px_var(--color-shadow)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-sm font-bold text-fg mb-4">الماكروز</h3>
          <div className="space-y-4">
            <MacroBar label="البروتين" current={consumed.protein} target={plan?.protein ?? 165} pct={proteinPct} color="var(--color-red)" bgColor="var(--color-red-light)" />
            <MacroBar label="الكربوهيدرات" current={consumed.carbs} target={plan?.carbs ?? 248} pct={carbsPct} color="var(--color-orange)" bgColor="var(--color-orange-light)" />
            <MacroBar label="الدهون" current={consumed.fat} target={plan?.fat ?? 73} pct={fatPct} color="var(--color-purple)" bgColor="#F3E5F5" />
          </div>
        </motion.div>

        {/* Water & Weight Row */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            className="bg-bg-card rounded-2xl p-4 shadow-[0_2px_12px_var(--color-shadow)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <p className="text-xs text-fg-secondary mb-1">الماء</p>
            <p className="text-2xl font-extrabold text-blue">{waterGlasses}<span className="text-sm font-normal text-fg-secondary">/{waterTarget}</span></p>
            <p className="text-xs text-fg-light">{waterPct}% من الهدف</p>
          </motion.div>
          <motion.div
            className="bg-bg-card rounded-2xl p-4 shadow-[0_2px_12px_var(--color-shadow)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.17 }}
          >
            <p className="text-xs text-fg-secondary mb-1">الوزن</p>
            <p className="text-2xl font-extrabold text-fg">{latestWeight} <span className="text-sm font-normal text-fg-secondary">كجم</span></p>
            <p className="text-xs text-fg-light">الهدف {targetWeight} كجم</p>
          </motion.div>
        </div>

        {/* Meals Summary */}
        <motion.div
          className="bg-bg-card rounded-2xl p-5 shadow-[0_2px_12px_var(--color-shadow)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-bold text-fg mb-3">ملخص الوجبات</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-bg rounded-xl p-3 text-center">
              <p className="text-xl font-extrabold text-accent">{todayMeals.length}</p>
              <p className="text-xs text-fg-secondary">وجبات مسجلة</p>
            </div>
            <div className="bg-bg rounded-xl p-3 text-center">
              <p className="text-xl font-extrabold text-fg">
                {todayMeals.length > 0 ? Math.round(consumed.calories / todayMeals.length) : 0}
              </p>
              <p className="text-xs text-fg-secondary">متوسط السعرات/وجبة</p>
            </div>
          </div>
          {todayMeals.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-fg-secondary mb-2">أعلى وجبة سعرات:</p>
              <div className="flex items-center justify-between bg-red-light/50 rounded-xl px-3 py-2">
                <span className="text-sm text-fg">{todayMeals.reduce((max, m) => m.calories > max.calories ? m : max, todayMeals[0]).name}</span>
                <span className="text-sm font-bold text-red">{todayMeals.reduce((max, m) => m.calories > max.calories ? m : max, todayMeals[0]).calories} سعرة</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Smart Summary */}
        <motion.div
          className="bg-green-light rounded-2xl p-5 border border-green/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h3 className="text-sm font-bold text-green mb-2">ملخص ذكي</h3>
          <p className="text-sm text-fg leading-relaxed">{summary}</p>
        </motion.div>

        {/* Tip for next week */}
        <motion.div
          className="bg-accent/10 rounded-2xl p-5 border border-accent/15"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-bold text-accent mb-2">نصيحة الأسبوع</h3>
          <p className="text-sm text-fg leading-relaxed">{tipForNextWeek}</p>
        </motion.div>

        {/* Disclaimer */}
        <p className="text-[10px] text-fg-light text-center pt-2 pb-4">
          هذا التقرير لأغراض تتبع عامة وليس بديلاً عن استشارة أخصائي التغذية.
        </p>
      </main>
    </div>
  );
}

function MacroBar({ label, current, target, pct, color, bgColor }: {
  label: string; current: number; target: number; pct: number; color: string; bgColor: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-fg">{label}</span>
        <span className="text-xs text-fg-secondary">{current}/{target} غ ({pct}%)</span>
      </div>
      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: bgColor }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, pct)}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
