import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IconArrowRight } from "@/icons/MealIcons";
import { useApp } from "@/context/AppContext";

type ScoreLevel = "excellent" | "good" | "needs_improvement";

interface MealAnalysis {
  name: string;
  totalCalories: number;
  breakdown: { item: string; calories: number }[];
  score: ScoreLevel;
  scoreLabel: string;
  reduce: string[];
  add: string[];
  calorieSavings: number;
  encouragement: string;
}

const scoreConfig: Record<ScoreLevel, { label: string; color: string; bg: string }> = {
  excellent: { label: "ممتاز", color: "var(--color-green)", bg: "var(--color-green-light)" },
  good: { label: "جيد", color: "var(--color-orange)", bg: "var(--color-orange-light)" },
  needs_improvement: { label: "يحتاج تحسين", color: "var(--color-red)", bg: "var(--color-red-light)" },
};

const preloadedAnalyses: Record<string, MealAnalysis> = {
  "كبسة": {
    name: "كبسة دجاج مع رز ولبن",
    totalCalories: 680,
    breakdown: [
      { item: "كبسة دجاج (فخذ مع رز)", calories: 420 },
      { item: "رز إضافي (نصف كوب)", calories: 150 },
      { item: "لبن (كوب)", calories: 62 },
      { item: "سلطة جانبية", calories: 48 },
    ],
    score: "good",
    scoreLabel: "جيد",
    reduce: [
      "قلل حصة الرز الإضافي للنصف (وفّر ٧٥ سعرة)",
      "اختر صدر الدجاج بدلاً من الفخذ (وفّر ٤٠ سعرة)",
      "قلل الزيت في الطبخ",
    ],
    add: [
      "أضف سلطة خضار كبيرة بدل الرز الإضافي",
      "أضف خيار وطماطم على الجانب",
      "اللبن خيار ممتاز! واصل عليه",
    ],
    calorieSavings: 115,
    encouragement: "وجبة جيدة بشكل عام! مع تعديلات بسيطة تقدر توفر ١١٥ سعرة وتحصل على توازن أفضل في الماكروز. الكبسة من الأكلات اللي تقدر تخليها صحية بسهولة! 💪",
  },
  "شاورما": {
    name: "شاورما دجاج",
    totalCalories: 520,
    breakdown: [
      { item: "شاورما دجاج (ساندويتش)", calories: 350 },
      { item: "بطاطس مقلية (حصة صغيرة)", calories: 170 },
    ],
    score: "needs_improvement",
    scoreLabel: "يحتاج تحسين",
    reduce: [
      "استبدل البطاطس المقلية بسلطة (وفّر ١٣٠ سعرة)",
      "اطلب الشاورما بخبز عربي بدل الصامولي (وفّر ٤٠ سعرة)",
      "قلل الثومية أو اطلبها على الجانب",
    ],
    add: [
      "أضف سلطة خضار أو تبولة",
      "اشرب ماء أو لبن بدل المشروب الغازي",
      "أضف خضار مشوية إذا متوفرة",
    ],
    calorieSavings: 170,
    encouragement: "الشاورما ممكن تكون خيار معقول إذا عدّلت الإضافات! البروتين فيها جيد. المفتاح هو تقليل الدهون والكربوهيدرات الإضافية. جرّب التعديلات وبتلاحظ فرق كبير! 🌟",
  },
  "بيتزا": {
    name: "بيتزا مارغريتا",
    totalCalories: 540,
    breakdown: [
      { item: "بيتزا مارغريتا (٣ شرائح)", calories: 400 },
      { item: "مشروب غازي", calories: 140 },
    ],
    score: "needs_improvement",
    scoreLabel: "يحتاج تحسين",
    reduce: [
      "قلل لشريحتين بدل ثلاث (وفّر ١٣٣ سعرة)",
      "استبدل المشروب الغازي بماء (وفّر ١٤٠ سعرة)",
      "اختر عجينة رقيقة إذا متوفرة",
    ],
    add: [
      "أضف سلطة كبيرة قبل البيتزا للشبع",
      "اختر بيتزا بالخضار بدل اللحوم المصنعة",
      "أضف بروتين مثل صدر دجاج مشوي على الجانب",
    ],
    calorieSavings: 273,
    encouragement: "البيتزا مو ممنوعة! المهم التحكم بالكمية والإضافات. مع التعديلات المقترحة تقدر توفر أكثر من ٢٧٠ سعرة! وتستمتع بوجبتك بدون ذنب 😊",
  },
};

function getDefaultAnalysis(mealText: string): MealAnalysis {
  return {
    name: mealText,
    totalCalories: 450,
    breakdown: [
      { item: "الوجبة الرئيسية", calories: 350 },
      { item: "إضافات جانبية", calories: 100 },
    ],
    score: "good",
    scoreLabel: "جيد",
    reduce: [
      "حاول تقليل حصة الكربوهيدرات قليلاً",
      "قلل الزيوت والدهون المضافة",
    ],
    add: [
      "أضف مصدر بروتين إذا لم يكن موجودًا",
      "أضف خضار أو سلطة لزيادة الألياف",
      "اشرب كوب ماء قبل الوجبة",
    ],
    calorieSavings: 80,
    encouragement: "كل وجبة فرصة لتحسين! حتى التعديلات الصغيرة تصنع فرق كبير مع الوقت. واصل تتبع وجباتك وبتشوف نتائج رائعة! ✨",
  };
}

function findAnalysis(text: string): MealAnalysis {
  const lower = text.trim();
  for (const key of Object.keys(preloadedAnalyses)) {
    if (lower.includes(key)) return preloadedAnalyses[key];
  }
  return getDefaultAnalysis(text);
}

export default function FixMealPage() {
  const navigate = useNavigate();
  const { plan, consumed } = useApp();
  const [mealText, setMealText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<MealAnalysis | null>(null);
  const [inputMethod, setInputMethod] = useState<"text" | "recent">("text");

  const remaining = plan ? plan.dailyCalories - consumed.calories : 0;

  const recentMeals = [
    "كبسة دجاج مع رز ولبن",
    "شاورما دجاج مع بطاطس",
    "بيتزا مارغريتا ٣ شرائح مع كولا",
  ];

  const handleAnalyze = (text?: string) => {
    const meal = text || mealText;
    if (!meal.trim()) return;
    setResult(null);
    setIsAnalyzing(true);
    setTimeout(() => {
      setResult(findAnalysis(meal));
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bg pb-8" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-bg/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-fg-secondary hover:text-fg hover:bg-bg-card transition-colors"
          >
            <IconArrowRight className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green/15 flex items-center justify-center">
              <svg className="w-4 h-4 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="text-lg font-bold text-fg">صحّح وجبتي</h1>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 max-w-lg mx-auto mt-4 space-y-4">
        {/* Remaining Calories Info */}
        {plan && (
          <motion.div
            className="bg-bg-card rounded-2xl p-4 shadow-[0_1px_8px_var(--color-shadow)] flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 23c-4.97 0-9-3.58-9-8 0-3.19 2.13-6.02 3.5-7.56.42-.47 1.17-.13 1.1.5-.23 1.96.58 3.06 1.4 3.06.6 0 .9-.55.9-1.5 0-1.5-.5-3.5-1.5-5.5-.27-.55.2-1.18.8-1.04C13.5 4.5 19 8 19 15c0 4.42-3.13 8-7 8z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-fg-secondary">المتبقي لك اليوم</p>
              <p className="text-lg font-extrabold text-accent">{Math.max(0, remaining).toLocaleString("ar-EG")} سعرة</p>
            </div>
          </motion.div>
        )}

        {/* Input Method Toggle */}
        <motion.div
          className="flex gap-2 bg-bg-card rounded-2xl p-1.5 shadow-[0_1px_6px_var(--color-shadow)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <button
            onClick={() => { setInputMethod("text"); setResult(null); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all
              ${inputMethod === "text"
                ? "bg-accent text-white shadow-[0_2px_8px_rgba(232,168,124,0.3)]"
                : "text-fg-secondary hover:text-fg"
              }`}
          >
            اكتب وجبتك
          </button>
          <button
            onClick={() => { setInputMethod("recent"); setResult(null); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all
              ${inputMethod === "recent"
                ? "bg-accent text-white shadow-[0_2px_8px_rgba(232,168,124,0.3)]"
                : "text-fg-secondary hover:text-fg"
              }`}
          >
            وجبات سابقة
          </button>
        </motion.div>

        {/* Input Area */}
        <AnimatePresence mode="wait">
          {inputMethod === "text" ? (
            <motion.div
              key="text-input"
              className="space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <textarea
                value={mealText}
                onChange={(e) => setMealText(e.target.value)}
                placeholder="اكتب وجبتك هنا... مثلاً: كبسة دجاج مع رز ولبن"
                className="field-input min-h-[120px] resize-none"
                dir="rtl"
              />
              <motion.button
                onClick={() => handleAnalyze()}
                disabled={!mealText.trim() || isAnalyzing}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all
                  ${mealText.trim() && !isAnalyzing
                    ? "bg-accent text-white hover:bg-accent-hover shadow-[0_4px_15px_rgba(232,168,124,0.3)]"
                    : "bg-border text-fg-light cursor-not-allowed"
                  }`}
                whileTap={mealText.trim() && !isAnalyzing ? { scale: 0.97 } : {}}
              >
                {isAnalyzing ? "جاري التحليل..." : "حلل وجبتي"}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="recent-input"
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="text-xs text-fg-light px-1">اختر وجبة لتحليلها وتصحيحها:</p>
              {recentMeals.map((meal, i) => (
                <motion.button
                  key={meal}
                  onClick={() => { setMealText(meal); handleAnalyze(meal); }}
                  className="w-full text-right bg-bg-card border border-border rounded-2xl px-4 py-3.5 text-sm text-fg
                    hover:border-accent/30 hover:shadow-[0_2px_8px_var(--color-shadow)] transition-all"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg ml-2">🍽️</span>
                  {meal}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Spinner */}
        {isAnalyzing && (
          <motion.div
            className="flex flex-col items-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="relative w-16 h-16">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-border"
              />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            </div>
            <p className="text-sm text-fg-secondary mt-4">جاري تحليل وجبتك بالذكاء الاصطناعي...</p>
          </motion.div>
        )}

        {/* Result Card */}
        <AnimatePresence>
          {result && !isAnalyzing && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Meal Name & Score */}
              <div className="bg-bg-card rounded-2xl p-5 shadow-[0_2px_12px_var(--color-shadow)]">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="text-sm text-fg-secondary">تحليل الوجبة</p>
                    <h3 className="text-base font-bold text-fg mt-1">{result.name}</h3>
                  </div>
                  <span
                    className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: scoreConfig[result.score].bg,
                      color: scoreConfig[result.score].color,
                    }}
                  >
                    {scoreConfig[result.score].label}
                  </span>
                </div>

                {/* Calories Breakdown */}
                <div className="space-y-2">
                  {result.breakdown.map((item, i) => (
                    <motion.div
                      key={item.item}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <span className="text-sm text-fg-secondary">{item.item}</span>
                      <span className="text-sm font-bold text-fg">{item.calories} سعرة</span>
                    </motion.div>
                  ))}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-bold text-fg">المجموع</span>
                    <span className="text-base font-extrabold text-accent">{result.totalCalories} سعرة</span>
                  </div>
                </div>
              </div>

              {/* Suggestions: Reduce */}
              <div className="bg-red-light rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <h4 className="text-sm font-bold text-fg">قلّل من</h4>
                </div>
                <ul className="space-y-2">
                  {result.reduce.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-fg-secondary">
                      <span className="text-red shrink-0 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggestions: Add */}
              <div className="bg-green-light rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <h4 className="text-sm font-bold text-fg">أضف</h4>
                </div>
                <ul className="space-y-2">
                  {result.add.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-fg-secondary">
                      <span className="text-green shrink-0 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Calorie Savings */}
              <motion.div
                className="bg-bg-card rounded-2xl p-5 shadow-[0_2px_12px_var(--color-shadow)] text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm text-fg-secondary mb-1">التوفير المتوقع</p>
                <p className="text-3xl font-extrabold text-green">{result.calorieSavings} سعرة</p>
                <p className="text-xs text-fg-light mt-1">
                  بعد التعديل: ~{result.totalCalories - result.calorieSavings} سعرة بدلاً من {result.totalCalories}
                </p>
              </motion.div>

              {/* Encouragement */}
              <motion.div
                className="bg-accent/10 border border-accent/20 rounded-2xl p-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-sm text-fg leading-relaxed">{result.encouragement}</p>
              </motion.div>

              {/* Try Another */}
              <motion.button
                onClick={() => { setResult(null); setMealText(""); }}
                className="w-full py-3 rounded-2xl border-2 border-border text-sm font-bold text-fg-secondary
                  hover:border-accent/30 hover:text-fg transition-all"
                whileTap={{ scale: 0.97 }}
              >
                حلل وجبة أخرى
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
