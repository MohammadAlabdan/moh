import { motion } from "framer-motion";
import { IconScale } from "@/icons/Icons";

interface WeightCardProps {
  currentWeight: number;
  targetWeight: number;
}

export default function WeightCard({
  currentWeight,
  targetWeight,
}: WeightCardProps) {
  const diff = currentWeight - targetWeight;
  const isLosing = diff > 0;

  return (
    <div className="bg-bg-card rounded-2xl p-5 shadow-[0_2px_12px_var(--color-shadow)]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-xl bg-purple/15 flex items-center justify-center text-purple">
          <IconScale className="w-4 h-4" />
        </div>
        <h3 className="text-base font-bold text-fg">الوزن</h3>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <motion.span
            className="text-3xl font-extrabold text-fg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {currentWeight}
          </motion.span>
          <span className="text-sm text-fg-secondary mr-1">كجم</span>
        </div>
        <div className="text-left">
          <p className="text-xs text-fg-secondary">الهدف</p>
          <p className="text-sm font-bold text-green">{targetWeight} كجم</p>
          <p className="text-xs text-fg-light mt-1">
            {isLosing ? "متبقي" : "زيادة"} {Math.abs(diff).toFixed(1)} كجم
          </p>
        </div>
      </div>
    </div>
  );
}
