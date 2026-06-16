import { motion } from "framer-motion";

interface MacroCardProps {
  label: string;
  consumed: number;
  target: number;
  unit?: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}

export default function MacroCard({
  label,
  consumed,
  target,
  unit = "غ",
  color,
  bgColor,
  icon,
}: MacroCardProps) {
  const percentage = Math.min((consumed / target) * 100, 100);
  const remaining = Math.max(0, target - consumed);

  return (
    <div className="bg-bg-card rounded-2xl p-3 sm:p-4 shadow-[0_2px_12px_var(--color-shadow)] flex-1 min-w-0">
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: bgColor, color }}
        >
          {icon}
        </div>
        <span className="text-xs sm:text-sm font-bold text-fg truncate">{label}</span>
      </div>
      <div className="mb-2">
        <span className="text-lg sm:text-2xl font-extrabold" style={{ color }}>
          {consumed}
        </span>
        <span className="text-[10px] sm:text-xs text-fg-secondary mr-1">
          / {target} {unit}
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-border overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </div>
      <p className="text-xs text-fg-secondary mt-2">
        متبقي {remaining} {unit}
      </p>
    </div>
  );
}
