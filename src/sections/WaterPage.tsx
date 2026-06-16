import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IconArrowRight } from "@/icons/MealIcons";
import { IconDroplet } from "@/icons/Icons";
import { useApp } from "@/context/AppContext";

export default function WaterPage() {
  const navigate = useNavigate();
  const { waterGlasses: glasses, setWaterGlasses: setGlasses, plan } = useApp();
  const target = plan ? Math.round(plan.water / 0.25) : 8;
  const percentage = Math.min((glasses / target) * 100, 100);
  const liters = (glasses * 0.25).toFixed(1);

  const toggleGlass = (index: number) => {
    setGlasses(index < glasses ? index : index + 1);
  };

  return (
    <div className="min-h-screen bg-bg pb-8">
      <header className="sticky top-0 z-30 bg-bg/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <button onClick={() => navigate("/")} className="w-10 h-10 rounded-xl flex items-center justify-center text-fg-secondary hover:text-fg hover:bg-bg-card transition-colors">
            <IconArrowRight className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-fg">تتبع الماء</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 max-w-lg mx-auto mt-6 space-y-5">
        {/* Main Circle */}
        <motion.div
          className="bg-bg-card rounded-3xl p-8 shadow-[0_2px_16px_var(--color-shadow)] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="80" fill="none" stroke="var(--color-border)" strokeWidth="12" />
              <motion.circle
                cx="100" cy="100" r="80" fill="none"
                stroke="var(--color-blue)" strokeWidth="12" strokeLinecap="round"
                strokeDasharray={502.65}
                initial={{ strokeDashoffset: 502.65 }}
                animate={{ strokeDashoffset: 502.65 - (percentage / 100) * 502.65 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <IconDroplet className="w-8 h-8 text-blue mb-1" />
              <span className="text-3xl font-extrabold text-fg">{liters}</span>
              <span className="text-sm text-fg-secondary">لتر</span>
            </div>
          </div>
          <p className="text-base font-bold text-fg">{glasses} من {target} أكواب</p>
          <p className="text-sm text-fg-secondary mt-1">
            {glasses >= target ? "أحسنت! وصلت لهدفك اليومي" : `متبقي ${target - glasses} أكواب`}
          </p>
        </motion.div>

        {/* Glass Grid */}
        <motion.div
          className="bg-bg-card rounded-2xl p-5 shadow-[0_2px_12px_var(--color-shadow)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-base font-bold text-fg mb-4">اضغط لتسجيل كوب</h3>
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: target }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => toggleGlass(i)}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all border-2
                  ${i < glasses
                    ? "bg-blue-light border-blue text-blue"
                    : "bg-bg border-border text-fg-light hover:border-blue/30"
                  }`}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * i }}
              >
                <IconDroplet className="w-6 h-6" />
                <span className="text-xs font-bold mt-1">{i + 1}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Quick Add */}
        <div className="flex gap-3">
          <motion.button
            onClick={() => setGlasses(Math.max(0, glasses - 1))}
            className="flex-1 bg-bg-card border border-border rounded-2xl py-3 font-bold text-fg-secondary hover:border-red/30 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            - كوب
          </motion.button>
          <motion.button
            onClick={() => setGlasses(Math.min(12, glasses + 1))}
            className="flex-1 bg-blue text-white rounded-2xl py-3 font-bold shadow-[0_2px_8px_rgba(126,184,216,0.3)] hover:opacity-90 transition-opacity"
            whileTap={{ scale: 0.95 }}
          >
            + كوب
          </motion.button>
        </div>

        {/* Tips */}
        <div className="bg-blue-light rounded-2xl p-4">
          <p className="text-xs text-fg-secondary leading-relaxed">
            شرب الماء الكافي يساعد على تحسين الهضم، زيادة الطاقة، وتسريع حرق الدهون. حاول شرب كوب قبل كل وجبة بـ 30 دقيقة.
          </p>
        </div>
      </main>
    </div>
  );
}
