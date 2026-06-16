import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IconHome,
  IconChart,
  IconDroplet,
  IconScale,
  IconSettings,
} from "@/icons/Icons";

const navItems = [
  { icon: IconSettings, label: "الإعدادات", path: "/settings" },
  { icon: IconScale, label: "الوزن", path: "/weight" },
  { icon: IconDroplet, label: "الماء", path: "/water" },
  { icon: IconChart, label: "التقارير", path: "/reports" },
  { icon: IconHome, label: "الرئيسية", path: "/" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 bg-bg-card border-t border-border shadow-[0_-4px_20px_var(--color-shadow)] z-40"
      initial={{ y: 60 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
    >
      <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-colors duration-200 min-w-[56px] min-h-[44px]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
                ${isActive ? "text-accent" : "text-fg-light hover:text-fg-secondary"}`}
              aria-label={item.label}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
