import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IconArrowRight } from "@/icons/MealIcons";
import { useApp, goalLabels } from "@/context/AppContext";

const settingSections = [
  {
    title: "الحساب",
    items: [
      { label: "تعديل الملف الشخصي", desc: "الاسم، العمر، الجنس، الطول، الوزن", to: "/onboarding/body-data" },
      { label: "الهدف والخطة", desc: "تغيير الهدف وإعادة حساب السعرات", to: "/onboarding/goal" },
      { label: "الاشتراكات", desc: "ترقية أو إدارة الاشتراك", to: "/subscriptions" },
    ],
  },
  {
    title: "البيانات",
    items: [
      { label: "سجل الوجبات", desc: "عرض جميع الوجبات المسجلة", to: "/meal-history" },
      { label: "تصدير البيانات", desc: "تحميل بياناتك بصيغة CSV", to: null },
      { label: "حذف الحساب", desc: "حذف جميع بياناتك نهائياً", to: null, danger: true },
    ],
  },
  {
    title: "الدعم",
    items: [
      { label: "الأسئلة الشائعة", desc: "إجابات على الأسئلة المتكررة", to: null },
      { label: "تواصل معنا", desc: "الدعم الفني والاستفسارات", to: null },
      { label: "سياسة الخصوصية", desc: "كيف نحمي بياناتك", to: "/privacy" },
      { label: "الشروط والأحكام", desc: "شروط استخدام التطبيق", to: null },
      { label: "لوحة الإدارة", desc: "للمشرفين فقط", to: "/admin" },
    ],
  },
];

export default function SettingsPage() {
  const navigate = useNavigate();
  const { profile, plan, theme, toggleTheme, notifications } = useApp();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-bg pb-24" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-bg/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-fg-secondary hover:text-fg hover:bg-bg-card transition-colors"
          >
            <IconArrowRight className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-fg">الإعدادات</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 max-w-lg mx-auto mt-4 space-y-4">
        {/* Profile Card */}
        {profile && plan && (
          <motion.div
            className="bg-bg-card rounded-2xl p-5 shadow-[0_2px_12px_var(--color-shadow)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-accent/15 flex items-center justify-center shrink-0">
                <span className="text-accent text-xl font-bold">{profile.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-fg truncate">{profile.name}</h2>
                <p className="text-sm text-fg-secondary">{goalLabels[profile.goal] || profile.goal}</p>
                <p className="text-xs text-fg-light mt-0.5">{plan.dailyCalories.toLocaleString("ar-EG")} سعرة / يوم</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* App Settings Section */}
        <motion.div
          className="bg-bg-card rounded-2xl shadow-[0_2px_12px_var(--color-shadow)] overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div className="px-5 pt-4 pb-2">
            <h3 className="text-sm font-bold text-fg-secondary">التطبيق</h3>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
            <div>
              <p className="text-sm font-medium text-fg">الوضع الليلي</p>
              <p className="text-xs text-fg-light mt-0.5">تبديل بين المظهر الفاتح والداكن</p>
            </div>
            <div
              className={`toggle-switch ${theme === "dark" ? "active" : ""}`}
              onClick={toggleTheme}
            />
          </div>

          {/* Language */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
            <div>
              <p className="text-sm font-medium text-fg">اللغة</p>
              <p className="text-xs text-fg-light mt-0.5">العربية</p>
            </div>
            <svg className="w-4 h-4 text-fg-light rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

          {/* Notifications */}
          <button
            className="w-full flex items-center justify-between px-5 py-3.5 text-right"
            onClick={() => navigate("/notifications")}
          >
            <div>
              <p className="text-sm font-medium text-fg">التنبيهات</p>
              <p className="text-xs text-fg-light mt-0.5">تذكيرات الوجبات والماء والتقارير</p>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <span className="bg-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
              <svg className="w-4 h-4 text-fg-light rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </button>
        </motion.div>

        {/* Other Setting Sections */}
        {settingSections.map((section, si) => (
          <motion.div
            key={section.title}
            className="bg-bg-card rounded-2xl shadow-[0_2px_12px_var(--color-shadow)] overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * (si + 2) }}
          >
            <div className="px-5 pt-4 pb-2">
              <h3 className="text-sm font-bold text-fg-secondary">{section.title}</h3>
            </div>
            {section.items.map((item, ii) => (
              <button
                key={item.label}
                className={`w-full flex items-center justify-between px-5 py-3.5 text-right transition-colors hover:bg-bg/50
                  ${ii < section.items.length - 1 ? "border-b border-border" : ""}`}
                onClick={() => item.to && navigate(item.to)}
              >
                <div>
                  <p className={`text-sm font-medium ${"danger" in item && item.danger ? "text-red" : "text-fg"}`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-fg-light mt-0.5">{item.desc}</p>
                </div>
                {item.to && (
                  <svg className="w-4 h-4 text-fg-light rotate-180 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        ))}

        {/* Logout */}
        <motion.button
          className="w-full bg-bg-card rounded-2xl py-3.5 text-sm font-bold text-red shadow-[0_2px_12px_var(--color-shadow)]
            hover:bg-red-light transition-colors"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.98 }}
        >
          تسجيل الخروج
        </motion.button>

        {/* Version */}
        <div className="text-center pt-2 pb-4">
          <p className="text-xs text-fg-light">NutriFlow v1.0.0</p>
          <p className="text-[10px] text-fg-light/60 mt-1">هذا التطبيق ليس بديلاً عن الطبيب أو أخصائي التغذية</p>
        </div>
      </main>
    </div>
  );
}
