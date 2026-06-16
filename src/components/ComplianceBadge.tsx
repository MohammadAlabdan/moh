import { motion } from "framer-motion";

interface ComplianceBadgeProps {
  percentage: number;
}

export default function ComplianceBadge({ percentage }: ComplianceBadgeProps) {
  const getColor = () => {
    if (percentage >= 80) return "text-green bg-green-light";
    if (percentage >= 50) return "text-orange bg-orange-light";
    return "text-red bg-red-light";
  };

  const getMessage = () => {
    if (percentage >= 80) return "ممتاز! التزام رائع";
    if (percentage >= 50) return "جيد، واصل التحسن";
    return "حاول الالتزام أكثر";
  };

  return (
    <motion.div
      className="bg-bg-card rounded-2xl p-4 shadow-[0_2px_12px_var(--color-shadow)]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${getColor()}`}
          >
            {percentage}%
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-fg">نسبة الالتزام</p>
            <p className="text-xs text-fg-secondary truncate">{getMessage()}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 whitespace-nowrap ${getColor()}`}>
          {percentage >= 80 ? "ممتاز" : percentage >= 50 ? "جيد" : "يحتاج تحسين"}
        </div>
      </div>
    </motion.div>
  );
}
