import { motion } from "framer-motion";
import { IconDroplet } from "@/icons/Icons";
import { useApp } from "@/context/AppContext";

interface WaterTrackerProps {
  current: number;
  target: number;
}

export default function WaterTracker({ current, target }: WaterTrackerProps) {
  const { setWaterGlasses } = useApp();

  const handleToggle = (index: number) => {
    // If tapping a filled glass, unfill from that point; otherwise fill up to it
    if (index < current) {
      setWaterGlasses(index);
    } else {
      setWaterGlasses(index + 1);
    }
  };

  return (
    <div className="bg-bg-card rounded-2xl p-5 shadow-[0_2px_12px_var(--color-shadow)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-light flex items-center justify-center text-blue">
            <IconDroplet className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-fg">الماء</h3>
        </div>
        <span className="text-sm text-fg-secondary font-medium">
          {current} / {target} أكواب
        </span>
      </div>
      <div className="flex gap-2 justify-center flex-wrap">
        {Array.from({ length: target }).map((_, i) => (
          <motion.button
            key={i}
            onClick={() => handleToggle(i)}
            className="transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue rounded-lg p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.3 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`كوب ${i + 1}`}
          >
            <IconDroplet
              className={`w-7 h-7 transition-colors duration-200 ${
                i < current ? "text-blue" : "text-border"
              }`}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
