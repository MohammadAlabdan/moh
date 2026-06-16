import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IconArrowRight } from "@/icons/MealIcons";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface SubPlan {
  id: string;
  name: string;
  nameEn: string;
  price: string;
  period: string;
  badge?: string;
  color: string;
  bg: string;
  features: PlanFeature[];
}

const plans: SubPlan[] = [
  {
    id: "free",
    name: "مجاني",
    nameEn: "Free",
    price: "0",
    period: "مجاني للأبد",
    color: "var(--color-fg-secondary)",
    bg: "var(--color-border)",
    features: [
      { text: "حساب السعرات و BMR/TDEE", included: true },
      { text: "إضافة 10 وجبات يوميًا", included: true },
      { text: "تقرير يومي بسيط", included: true },
      { text: "متابعة الوزن", included: true },
      { text: "قاعدة بيانات أطعمة أساسية", included: true },
      { text: "تحليل صور الوجبات بالذكاء الاصطناعي", included: false },
      { text: "تقارير أسبوعية وشهرية متقدمة", included: false },
      { text: "المساعد الغذائي الذكي", included: false },
      { text: "اقتراح وجبات مخصصة", included: false },
      { text: "صحّح وجبتي", included: false },
      { text: "خطط غذائية مخصصة", included: false },
    ],
  },
  {
    id: "pro_monthly",
    name: "برو شهري",
    nameEn: "Pro Monthly",
    price: "29",
    period: "ريال / شهر",
    badge: "الأكثر شعبية",
    color: "var(--color-accent)",
    bg: "rgba(232,168,124,0.12)",
    features: [
      { text: "جميع مميزات المجاني", included: true },
      { text: "وجبات غير محدودة", included: true },
      { text: "تحليل صور الوجبات بالذكاء الاصطناعي", included: true },
      { text: "تقارير أسبوعية وشهرية متقدمة", included: true },
      { text: "المساعد الغذائي الذكي", included: true },
      { text: "اقتراح وجبات مخصصة", included: true },
      { text: "صحّح وجبتي", included: true },
      { text: "متابعة متقدمة للماكروز", included: true },
      { text: "خطط غذائية مخصصة", included: false },
      { text: "دعم أولوية", included: false },
    ],
  },
  {
    id: "pro_annual",
    name: "برو سنوي",
    nameEn: "Pro Annual",
    price: "199",
    period: "ريال / سنة",
    badge: "وفّر 45%",
    color: "var(--color-green)",
    bg: "rgba(123,174,127,0.12)",
    features: [
      { text: "جميع مميزات البرو الشهري", included: true },
      { text: "خطط غذائية مخصصة", included: true },
      { text: "دعم أولوية", included: true },
      { text: "تقارير PDF قابلة للتحميل", included: true },
      { text: "مميزات جديدة أولاً", included: true },
    ],
  },
];

export default function SubscriptionsPage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("pro_monthly");

  return (
    <div className="min-h-screen bg-bg pb-24" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-bg/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-fg-secondary hover:text-fg hover:bg-bg-card transition-colors"
          >
            <IconArrowRight className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-fg">الاشتراكات</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 max-w-lg mx-auto mt-4 space-y-4">
        {/* Hero */}
        <motion.div
          className="text-center py-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-extrabold text-fg mb-2">ارتقِ بنظامك الغذائي</h2>
          <p className="text-sm text-fg-secondary leading-relaxed">
            احصل على تحليل ذكي لوجباتك، تقارير متقدمة، واقتراحات مخصصة لتحقيق هدفك بشكل أسرع.
          </p>
        </motion.div>

        {/* Plans */}
        {plans.map((plan, i) => (
          <motion.button
            key={plan.id}
            className={`w-full text-right bg-bg-card rounded-2xl overflow-hidden shadow-[0_2px_12px_var(--color-shadow)] transition-all border-2
              ${selectedPlan === plan.id ? "" : "border-transparent"}`}
            style={selectedPlan === plan.id ? { borderColor: plan.color } : {}}
            onClick={() => setSelectedPlan(plan.id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * (i + 1) }}
            whileTap={{ scale: 0.99 }}
          >
            {/* Badge */}
            {plan.badge && (
              <div className="text-center py-1.5 text-xs font-bold text-white" style={{ background: plan.color }}>
                {plan.badge}
              </div>
            )}

            <div className="p-5">
              {/* Plan Name & Price */}
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-base font-bold text-fg">{plan.name}</p>
                  <p className="text-xs text-fg-light">{plan.nameEn}</p>
                </div>
                <div className="text-left">
                  <span className="text-2xl font-extrabold" style={{ color: plan.color }}>{plan.price}</span>
                  <p className="text-xs text-fg-secondary">{plan.period}</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                {plan.features.map((f) => (
                  <div key={f.text} className="flex items-center gap-2">
                    {f.included ? (
                      <svg className="w-4 h-4 shrink-0" style={{ color: plan.color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-fg-light/40 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    )}
                    <span className={`text-xs ${f.included ? "text-fg" : "text-fg-light/60 line-through"}`}>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.button>
        ))}

        {/* Subscribe Button */}
        {selectedPlan !== "free" && (
          <motion.button
            className="w-full bg-accent text-white rounded-2xl py-4 font-bold text-base
              shadow-[0_4px_15px_rgba(232,168,124,0.3)] hover:bg-accent-hover transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.98 }}
          >
            اشترك الآن - {plans.find((p) => p.id === selectedPlan)?.price} ريال
          </motion.button>
        )}

        {/* Guarantee */}
        <p className="text-center text-xs text-fg-light pt-2 pb-4">
          ضمان استرجاع المبلغ خلال 7 أيام. يمكنك الإلغاء في أي وقت.
        </p>
      </main>
    </div>
  );
}
