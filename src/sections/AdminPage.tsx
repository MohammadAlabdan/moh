import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IconArrowRight } from "@/icons/MealIcons";

type Tab = "users" | "foods" | "subscriptions" | "content" | "settings";

const tabs: { id: Tab; label: string }[] = [
  { id: "users", label: "المستخدمين" },
  { id: "foods", label: "الأطعمة" },
  { id: "subscriptions", label: "الاشتراكات" },
  { id: "content", label: "المحتوى" },
  { id: "settings", label: "الإعدادات" },
];

const stats = [
  { label: "إجمالي المستخدمين", value: "١٬٢٤٧", icon: "👥", color: "var(--color-blue)" },
  { label: "نشطون اليوم", value: "٣٤٢", icon: "🟢", color: "var(--color-green)" },
  { label: "وجبات مسجلة", value: "١٨٬٤٥٠", icon: "🍽️", color: "var(--color-orange)" },
  { label: "إيرادات الاشتراكات", value: "٤٥٬٨٠٠ ر.س", icon: "💰", color: "var(--color-accent)" },
];

const mockUsers = [
  { name: "أحمد محمد", email: "ahmed@email.com", sub: "Pro", date: "١٥ يناير ٢٠٢٥", avatar: "أ" },
  { name: "سارة العلي", email: "sara@email.com", sub: "مجاني", date: "٢٠ فبراير ٢٠٢٥", avatar: "س" },
  { name: "خالد الحربي", email: "khaled@email.com", sub: "سنوي", date: "٣ مارس ٢٠٢٥", avatar: "خ" },
  { name: "نورة السعيد", email: "noura@email.com", sub: "Pro", date: "١٢ أبريل ٢٠٢٥", avatar: "ن" },
  { name: "فهد الدوسري", email: "fahad@email.com", sub: "مجاني", date: "٨ مايو ٢٠٢٥", avatar: "ف" },
  { name: "ريم القحطاني", email: "reem@email.com", sub: "Pro", date: "٢٥ مايو ٢٠٢٥", avatar: "ر" },
  { name: "عبدالله الشمري", email: "abdullah@email.com", sub: "سنوي", date: "١ يونيو ٢٠٢٥", avatar: "ع" },
];

const mockFoods = [
  { name: "كبسة دجاج", category: "أكلات محلية", calories: 420, color: "var(--color-purple)" },
  { name: "صدر دجاج مشوي", category: "بروتين", calories: 165, color: "var(--color-red)" },
  { name: "رز أبيض مطبوخ", category: "كربوهيدرات", calories: 130, color: "var(--color-orange)" },
  { name: "سلطة خضار", category: "خضار وفواكه", calories: 45, color: "var(--color-green)" },
  { name: "شاورما دجاج", category: "وجبات سريعة", calories: 350, color: "var(--color-accent)" },
  { name: "زبادي يوناني", category: "بروتين", calories: 100, color: "var(--color-red)" },
  { name: "شوفان", category: "كربوهيدرات", calories: 150, color: "var(--color-orange)" },
  { name: "كنافة", category: "حلويات", calories: 350, color: "#E88B8B" },
];

const mockArticles = [
  { title: "١٠ نصائح لفقدان الوزن بشكل صحي", status: "published" as const, date: "١٠ يونيو ٢٠٢٥" },
  { title: "أفضل مصادر البروتين النباتي", status: "published" as const, date: "٨ يونيو ٢٠٢٥" },
  { title: "كيف تحسب سعراتك الحرارية بدقة", status: "draft" as const, date: "٥ يونيو ٢٠٢٥" },
  { title: "فوائد الصيام المتقطع", status: "published" as const, date: "١ يونيو ٢٠٢٥" },
  { title: "دليل المبتدئين لبناء العضلات", status: "draft" as const, date: "٢٨ مايو ٢٠٢٥" },
  { title: "أخطاء شائعة في الحميات الغذائية", status: "published" as const, date: "٢٥ مايو ٢٠٢٥" },
];

const subData = [
  { label: "مجاني", count: 847, pct: 68, color: "var(--color-fg-light)" },
  { label: "Pro شهري", count: 312, pct: 25, color: "var(--color-accent)" },
  { label: "Pro سنوي", count: 88, pct: 7, color: "var(--color-green)" },
];

function IconEdit({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function IconTrash({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  );
}

export default function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("users");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [aiModel, setAiModel] = useState("gpt-4o-mini");

  return (
    <div className="min-h-screen bg-bg pb-8" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-accent/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <IconArrowRight className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
            <h1 className="text-lg font-bold text-white">لوحة الإدارة</h1>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 max-w-3xl mx-auto mt-4 space-y-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="bg-bg-card rounded-2xl p-4 shadow-[0_2px_12px_var(--color-shadow)]"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{s.icon}</span>
                <span className="text-xs text-fg-secondary">{s.label}</span>
              </div>
              <p className="text-xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar bg-bg-card rounded-2xl p-1.5 shadow-[0_1px_6px_var(--color-shadow)]">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0
                ${activeTab === t.id
                  ? "bg-accent text-white shadow-[0_2px_8px_rgba(232,168,124,0.3)]"
                  : "text-fg-secondary hover:text-fg"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {/* ===== USERS TAB ===== */}
            {activeTab === "users" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-sm font-bold text-fg">المستخدمين ({mockUsers.length})</h3>
                  <span className="text-xs text-fg-light">آخر تحديث: اليوم</span>
                </div>
                {mockUsers.map((u, i) => (
                  <motion.div
                    key={u.email}
                    className="bg-bg-card rounded-2xl p-4 shadow-[0_1px_8px_var(--color-shadow)] flex items-center gap-3"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <span className="text-accent font-bold text-sm">{u.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-fg truncate">{u.name}</p>
                      <p className="text-xs text-fg-light truncate">{u.email}</p>
                    </div>
                    <div className="text-left shrink-0">
                      <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full
                        ${u.sub === "Pro" ? "bg-accent/15 text-accent" : u.sub === "سنوي" ? "bg-green-light text-green" : "bg-border text-fg-light"}`}>
                        {u.sub}
                      </span>
                      <p className="text-[10px] text-fg-light mt-1">{u.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* ===== FOODS TAB ===== */}
            {activeTab === "foods" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-sm font-bold text-fg">قاعدة بيانات الأطعمة</h3>
                  <button className="text-xs font-bold text-accent hover:text-accent-hover transition-colors">+ إضافة طعام</button>
                </div>
                {mockFoods.map((f, i) => (
                  <motion.div
                    key={f.name}
                    className="bg-bg-card rounded-2xl p-4 shadow-[0_1px_8px_var(--color-shadow)] flex items-center gap-3"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-fg">{f.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: f.color + "20", color: f.color }}
                        >
                          {f.category}
                        </span>
                        <span className="text-xs text-fg-light">{f.calories} سعرة</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-fg-light hover:text-blue hover:bg-blue-light transition-colors">
                        <IconEdit />
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-fg-light hover:text-red hover:bg-red-light transition-colors">
                        <IconTrash />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* ===== SUBSCRIPTIONS TAB ===== */}
            {activeTab === "subscriptions" && (
              <div className="space-y-4">
                <div className="bg-bg-card rounded-2xl p-6 shadow-[0_2px_12px_var(--color-shadow)] text-center">
                  <h3 className="text-sm font-bold text-fg mb-5">توزيع الاشتراكات</h3>
                  {/* Pie chart placeholder */}
                  <div className="relative w-40 h-40 mx-auto mb-5">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      {/* Free: 68% */}
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--color-fg-light)" strokeWidth="3.5"
                        strokeDasharray="68 32" strokeDashoffset="0" opacity="0.35" />
                      {/* Pro: 25% */}
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--color-accent)" strokeWidth="3.5"
                        strokeDasharray="25 75" strokeDashoffset="-68" />
                      {/* Annual: 7% */}
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--color-green)" strokeWidth="3.5"
                        strokeDasharray="7 93" strokeDashoffset="-93" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-extrabold text-fg">١٬٢٤٧</span>
                      <span className="text-xs text-fg-light">مستخدم</span>
                    </div>
                  </div>
                  <div className="flex justify-center gap-5">
                    {subData.map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="flex items-center gap-1.5 justify-center mb-1">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                          <span className="text-xs text-fg-secondary">{s.label}</span>
                        </div>
                        <p className="text-lg font-extrabold text-fg">{s.count}</p>
                        <p className="text-[10px] text-fg-light">{s.pct}%</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-bg-card rounded-2xl p-5 shadow-[0_1px_8px_var(--color-shadow)]">
                  <h3 className="text-sm font-bold text-fg mb-3">ملخص الإيرادات</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-fg-secondary">الشهر الحالي</span>
                      <span className="text-sm font-bold text-accent">١٢٬٤٠٠ ر.س</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-fg-secondary">الشهر الماضي</span>
                      <span className="text-sm font-bold text-fg">١٠٬٨٠٠ ر.س</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-fg-secondary">النمو</span>
                      <span className="text-sm font-bold text-green">+١٤.٨%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== CONTENT TAB ===== */}
            {activeTab === "content" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-sm font-bold text-fg">المقالات والنصائح</h3>
                  <button className="text-xs font-bold text-accent hover:text-accent-hover transition-colors">+ مقال جديد</button>
                </div>
                {mockArticles.map((a, i) => (
                  <motion.div
                    key={a.title}
                    className="bg-bg-card rounded-2xl p-4 shadow-[0_1px_8px_var(--color-shadow)]"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-fg leading-relaxed">{a.title}</p>
                        <p className="text-xs text-fg-light mt-1">{a.date}</p>
                      </div>
                      <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full
                        ${a.status === "published" ? "bg-green-light text-green" : "bg-orange-light text-orange"}`}>
                        {a.status === "published" ? "منشور" : "مسودة"}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* ===== SETTINGS TAB ===== */}
            {activeTab === "settings" && (
              <div className="space-y-3">
                <div className="bg-bg-card rounded-2xl p-5 shadow-[0_2px_12px_var(--color-shadow)] space-y-5">
                  <h3 className="text-sm font-bold text-fg">إعدادات التطبيق</h3>

                  {/* App Name */}
                  <div>
                    <label className="text-xs text-fg-secondary block mb-1.5">اسم التطبيق</label>
                    <input
                      type="text"
                      defaultValue="NutriFlow"
                      className="field-input"
                      readOnly
                    />
                  </div>

                  {/* Default Language */}
                  <div>
                    <label className="text-xs text-fg-secondary block mb-1.5">اللغة الافتراضية</label>
                    <div className="field-input bg-bg flex items-center justify-between cursor-default">
                      <span>العربية</span>
                      <svg className="w-4 h-4 text-fg-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  {/* Maintenance Mode */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-fg">وضع الصيانة</p>
                      <p className="text-xs text-fg-light mt-0.5">إيقاف التطبيق مؤقتًا للصيانة</p>
                    </div>
                    <div
                      className={`toggle-switch ${maintenanceMode ? "active" : ""}`}
                      onClick={() => setMaintenanceMode(!maintenanceMode)}
                    />
                  </div>

                  {/* AI Model */}
                  <div>
                    <label className="text-xs text-fg-secondary block mb-1.5">نموذج الذكاء الاصطناعي</label>
                    <div className="flex gap-2">
                      {["gpt-4o-mini", "gpt-4o", "claude-3.5"].map((model) => (
                        <button
                          key={model}
                          onClick={() => setAiModel(model)}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all
                            ${aiModel === model
                              ? "bg-accent text-white shadow-[0_2px_8px_rgba(232,168,124,0.3)]"
                              : "bg-bg text-fg-secondary border border-border hover:border-accent/30"
                            }`}
                        >
                          {model}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-light rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-red mb-3">منطقة الخطر</h3>
                  <div className="space-y-2">
                    <button className="w-full bg-bg-card rounded-xl py-3 text-sm font-bold text-red hover:bg-red/10 transition-colors">
                      مسح ذاكرة التخزين المؤقت
                    </button>
                    <button className="w-full bg-bg-card rounded-xl py-3 text-sm font-bold text-red hover:bg-red/10 transition-colors">
                      إعادة تعيين قاعدة البيانات
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
