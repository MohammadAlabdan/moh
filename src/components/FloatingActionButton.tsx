import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IconPlus } from "@/icons/Icons";

export default function FloatingActionButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate("/add-meal")}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50
        w-14 h-14 rounded-full bg-accent text-white
        shadow-[0_4px_20px_rgba(232,168,124,0.4)]
        flex items-center justify-center
        hover:bg-accent-hover active:scale-95
        focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/30
        transition-colors duration-200"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.7, type: "spring", stiffness: 260, damping: 20 }}
      aria-label="إضافة وجبة"
    >
      <IconPlus className="w-6 h-6" />
    </motion.button>
  );
}
