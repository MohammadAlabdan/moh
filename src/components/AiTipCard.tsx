import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IconBrain } from "@/icons/Icons";

interface AiTipCardProps {
  caloriesRemaining: number;
  proteinRemaining: number;
}

export default function AiTipCard({
  caloriesRemaining,
  proteinRemaining,
}: AiTipCardProps) {
  const navigate = useNavigate();

  const tip =
    caloriesRemaining > 400
      ? `باقي لك اليوم ${caloriesRemaining} سعرة و${proteinRemaining} غرام بروتين. يمكنك اختيار وجبة خفيفة مثل صدر دجاج مشوي مع سلطة أو زبادي يوناني مع فواكه.`
      : caloriesRemaining > 0
        ? `أنت قريب من هدفك اليومي! متبقي ${caloriesRemaining} سعرة فقط. حاول اختيار وجبة خفيفة مثل حفنة مكسرات أو كوب حليب.`
        : "أحسنت! وصلت لهدفك اليومي من السعرات. حافظ على هذا الالتزام الرائع!";

  return (
    <motion.div
      className="bg-gradient-to-l from-orange-light to-bg-card rounded-2xl p-5 shadow-[0_2px_12px_var(--color-shadow)] border border-border cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      onClick={() => navigate("/ai-assistant")}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
            <IconBrain className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-fg">المساعد الذكي</h3>
        </div>
        <span className="text-xs text-accent font-medium">اسأل المساعد</span>
      </div>
      <p className="text-sm text-fg-secondary leading-relaxed">{tip}</p>
    </motion.div>
  );
}
