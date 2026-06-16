import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6">
      <motion.div
        className="text-center max-w-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <motion.div
          className="w-24 h-24 rounded-3xl bg-accent/15 flex items-center justify-center mx-auto mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <svg className="w-12 h-12 text-accent" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c-1.5 0-2.8.6-3.8 1.5C7.2 4.5 6 6.5 6 9c0 3 1.5 5.5 3.5 7 .5.4.8 1 .8 1.6V19a1.7 1.7 0 001.7 1.7h0A1.7 1.7 0 0013.7 19v-1.4c0-.6.3-1.2.8-1.6C16.5 14.5 18 12 18 9c0-2.5-1.2-4.5-2.2-5.5C14.8 2.6 13.5 2 12 2z" />
            <circle cx="12" cy="22" r="1.2" opacity=".6" />
          </svg>
        </motion.div>

        <motion.h1
          className="text-3xl font-extrabold text-fg mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          NutriFlow
        </motion.h1>

        <motion.p
          className="text-base text-fg-secondary leading-relaxed mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          رفيقك الذكي لحياة صحية أفضل
        </motion.p>

        <motion.p
          className="text-sm text-fg-light leading-relaxed mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          تتبع سعراتك، سجل وجباتك، واحصل على نصائح ذكية تساعدك للوصول لهدفك
        </motion.p>

        <motion.button
          onClick={() => navigate("/onboarding/goal")}
          className="w-full bg-accent text-white py-4 rounded-2xl font-bold text-base
            shadow-[0_4px_16px_rgba(232,168,124,0.3)]
            hover:bg-accent-hover transition-colors
            focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.97 }}
        >
          ابدأ الآن
        </motion.button>

        <motion.p
          className="text-xs text-fg-light mt-6 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          هذا التطبيق ليس بديلاً عن الطبيب أو أخصائي التغذية.
          <br />
          استشر مختصًا للحالات الصحية الخاصة.
        </motion.p>
      </motion.div>
    </div>
  );
}
