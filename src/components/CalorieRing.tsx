import { motion } from "framer-motion";

interface CalorieRingProps {
  consumed: number;
  budget: number;
}

export default function CalorieRing({ consumed, budget }: CalorieRingProps) {
  const remaining = Math.max(0, budget - consumed);
  const percentage = Math.min((consumed / budget) * 100, 100);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-bg-card rounded-3xl p-6 shadow-[0_2px_16px_var(--color-shadow)]">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-fg">السعرات اليومية</h2>
        <span className="text-sm text-fg-secondary font-medium">
          {Math.round(percentage)}% مكتمل
        </span>
      </div>
      <div className="flex items-center justify-center py-4">
        <div className="relative w-[200px] h-[200px]">
          <svg
            className="w-full h-full -rotate-90"
            viewBox="0 0 200 200"
          >
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="14"
            />
            <motion.circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="text-4xl font-extrabold text-fg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {remaining}
            </motion.span>
            <span className="text-sm text-fg-secondary mt-1">سعرة متبقية</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-center mt-2">
        <div className="flex-1 min-w-0">
          <p className="text-xl font-bold text-fg">{budget}</p>
          <p className="text-xs text-fg-secondary">الهدف</p>
        </div>
        <div className="w-px bg-border" />
        <div className="flex-1 min-w-0">
          <p className="text-xl font-bold text-accent">{consumed}</p>
          <p className="text-xs text-fg-secondary">مستهلك</p>
        </div>
        <div className="w-px bg-border" />
        <div className="flex-1 min-w-0">
          <p className="text-xl font-bold text-green">{remaining}</p>
          <p className="text-xs text-fg-secondary">متبقي</p>
        </div>
      </div>
    </div>
  );
}
