import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IconSearch, IconCamera, IconMic, IconBarcode, IconBookmark, IconArrowRight } from "@/icons/MealIcons";
import { IconPlus, IconCheck } from "@/icons/Icons";
import { foodCategories, mostUsedFoods, allFoods } from "@/data/foodData";
import type { FoodItem } from "@/data/foodData";
import FoodDetailSheet from "@/components/FoodDetailSheet";
import { useApp, getNowTimeArabic } from "@/context/AppContext";

type TabId = "search" | "photo" | "voice" | "barcode" | "saved";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const tabs: Tab[] = [
  { id: "search", label: "بحث يدوي", icon: IconSearch },
  { id: "photo", label: "تصوير", icon: IconCamera },
  { id: "voice", label: "صوت", icon: IconMic },
  { id: "barcode", label: "باركود", icon: IconBarcode },
  { id: "saved", label: "محفوظة", icon: IconBookmark },
];

export default function AddMeal() {
  const navigate = useNavigate();
  const { addMeal, plan, consumed } = useApp();
  const [activeTab, setActiveTab] = useState<TabId>("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [addedFoods, setAddedFoods] = useState<Set<string>>(new Set());

  const filteredFoods = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allFoods.filter((f) =>
      f.name.includes(searchQuery.trim())
    );
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  const handleAddFood = (food: FoodItem, servings = 1) => {
    addMeal({
      name: food.name,
      time: getNowTimeArabic(),
      calories: Math.round(food.calories * servings),
      protein: Math.round(food.protein * servings),
      carbs: Math.round(food.carbs * servings),
      fat: Math.round(food.fat * servings),
    });
    setAddedFoods((prev) => new Set(prev).add(food.id));
    setTimeout(() => {
      setAddedFoods((prev) => {
        const next = new Set(prev);
        next.delete(food.id);
        return next;
      });
    }, 1500);
  };

  const caloriesRemaining = plan ? Math.max(0, plan.dailyCalories - consumed.calories) : 0;
  const caloriesProgress = plan ? Math.min((consumed.calories / plan.dailyCalories) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-bg pb-8">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-bg/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-fg-secondary hover:text-fg hover:bg-bg-card transition-colors"
            aria-label="رجوع"
          >
            <IconArrowRight className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-fg">إضافة وجبة</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4">
        {/* Tabs */}
        <div className="mt-4 mb-5">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors shrink-0
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
                    ${isActive
                      ? "bg-accent text-white shadow-[0_2px_8px_rgba(232,168,124,0.3)]"
                      : "bg-bg-card text-fg-secondary hover:text-fg border border-border"
                    }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "search" && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Search Input */}
              <div className="relative mb-5">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-fg-light">
                  <IconSearch className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن طعام..."
                  className="w-full bg-bg-card border border-border rounded-2xl pr-12 pl-4 py-4 text-fg placeholder:text-fg-light
                    focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent
                    transition-all text-base"
                  dir="rtl"
                />
              </div>

              {/* Search Results or Default Content */}
              {isSearching ? (
                <SearchResults
                  foods={filteredFoods}
                  query={searchQuery}
                  addedFoods={addedFoods}
                  onAdd={handleAddFood}
                  onSelect={setSelectedFood}
                />
              ) : (
                <>
                  {/* Most Used */}
                  <MostUsedSection
                    foods={mostUsedFoods}
                    addedFoods={addedFoods}
                    onAdd={handleAddFood}
                    onSelect={setSelectedFood}
                  />

                  {/* Categories */}
                  <CategoryGrid />
                </>
              )}
            </motion.div>
          )}

          {activeTab === "photo" && (
            <motion.div
              key="photo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <PlaceholderTab
                icon={<IconCamera className="w-10 h-10" />}
                title="تحليل صورة الوجبة"
                description="التقط صورة لوجبتك وسيقوم الذكاء الاصطناعي بتحليلها وتقدير السعرات والماكروز تلقائيًا"
                buttonLabel="فتح الكاميرا"
              />
            </motion.div>
          )}

          {activeTab === "voice" && (
            <motion.div
              key="voice"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <PlaceholderTab
                icon={<IconMic className="w-10 h-10" />}
                title="إضافة بالصوت"
                description='قل ما أكلت، مثلاً: "أكلت شاورما دجاج مع عصير برتقال" وسيضيفها النظام تلقائيًا'
                buttonLabel="ابدأ التسجيل"
              />
            </motion.div>
          )}

          {activeTab === "barcode" && (
            <motion.div
              key="barcode"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <PlaceholderTab
                icon={<IconBarcode className="w-10 h-10" />}
                title="مسح الباركود"
                description="امسح باركود المنتج الغذائي لإضافة بياناته الغذائية مباشرة"
                buttonLabel="فتح الماسح"
              />
            </motion.div>
          )}

          {activeTab === "saved" && (
            <motion.div
              key="saved"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <PlaceholderTab
                icon={<IconBookmark className="w-10 h-10" />}
                title="الوجبات المحفوظة"
                description="احفظ وجباتك المتكررة لإضافتها بسرعة لاحقًا"
                buttonLabel="عرض المحفوظات"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Remaining Calories Bar */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-bg-card border-t border-border px-4 py-3 z-40"
          initial={{ y: 60 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-fg">المتبقي اليوم</span>
              <span className="text-sm font-bold text-accent">{caloriesRemaining} سعرة</span>
            </div>
            <div className="w-full h-2 rounded-full bg-border overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${caloriesProgress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Food Detail Sheet */}
      <AnimatePresence>
        {selectedFood && (
          <FoodDetailSheet
            food={selectedFood}
            onClose={() => setSelectedFood(null)}
            onAdd={(servings) => {
              handleAddFood(selectedFood, servings);
              setSelectedFood(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* --- Sub-components --- */

function SearchResults({
  foods,
  query,
  addedFoods,
  onAdd,
  onSelect,
}: {
  foods: FoodItem[];
  query: string;
  addedFoods: Set<string>;
  onAdd: (f: FoodItem) => void;
  onSelect: (f: FoodItem) => void;
}) {
  return (
    <div>
      <p className="text-sm text-fg-secondary mb-3">
        {foods.length > 0
          ? `${foods.length} نتيجة لـ "${query}"`
          : `لا توجد نتائج لـ "${query}"`}
      </p>
      <div className="space-y-2">
        {foods.map((food, i) => (
          <FoodRow
            key={food.id}
            food={food}
            index={i}
            isAdded={addedFoods.has(food.id)}
            onAdd={() => onAdd(food)}
            onSelect={() => onSelect(food)}
          />
        ))}
      </div>
    </div>
  );
}

function MostUsedSection({
  foods,
  addedFoods,
  onAdd,
  onSelect,
}: {
  foods: FoodItem[];
  addedFoods: Set<string>;
  onAdd: (f: FoodItem) => void;
  onSelect: (f: FoodItem) => void;
}) {
  return (
    <section className="mb-6">
      <h2 className="text-base font-bold text-fg mb-3">الأكثر استخدامًا</h2>
      <div className="space-y-2">
        {foods.map((food, i) => (
          <FoodRow
            key={food.id}
            food={food}
            index={i}
            isAdded={addedFoods.has(food.id)}
            onAdd={() => onAdd(food)}
            onSelect={() => onSelect(food)}
          />
        ))}
      </div>
    </section>
  );
}

function FoodRow({
  food,
  index,
  isAdded,
  onAdd,
  onSelect,
}: {
  food: FoodItem;
  index: number;
  isAdded: boolean;
  onAdd: () => void;
  onSelect: () => void;
}) {
  const cat = foodCategories.find((c) => c.id === food.category);
  return (
    <motion.div
      className="bg-bg-card rounded-2xl p-3 shadow-[0_1px_8px_var(--color-shadow)] flex items-center justify-between gap-3 cursor-pointer hover:shadow-[0_2px_12px_var(--color-shadow)] transition-shadow"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.25 }}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold"
          style={{ backgroundColor: cat?.bgColor, color: cat?.color }}
        >
          {food.calories}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-fg truncate">{food.name}</p>
          <p className="text-xs text-fg-secondary mt-0.5">
            {food.servingSize} · ب{food.protein} ك{food.carbs} د{food.fat}
          </p>
        </div>
      </div>
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          onAdd();
        }}
        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors
          focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
          ${isAdded
            ? "bg-green text-white"
            : "bg-accent/10 text-accent hover:bg-accent/20"
          }`}
        whileTap={{ scale: 0.85 }}
        aria-label={`إضافة ${food.name}`}
      >
        {isAdded ? (
          <IconCheck className="w-4 h-4" />
        ) : (
          <IconPlus className="w-4 h-4" />
        )}
      </motion.button>
    </motion.div>
  );
}

function CategoryGrid() {
  return (
    <section>
      <h2 className="text-base font-bold text-fg mb-3">التصنيفات</h2>
      <div className="grid grid-cols-3 gap-3">
        {foodCategories.map((cat, i) => (
          <motion.button
            key={cat.id}
            className="bg-bg-card rounded-2xl p-4 shadow-[0_1px_8px_var(--color-shadow)] flex flex-col items-center gap-2
              hover:shadow-[0_2px_12px_var(--color-shadow)] transition-shadow
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * i, duration: 0.25 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold"
              style={{ backgroundColor: cat.bgColor, color: cat.color }}
            >
              {cat.count}
            </div>
            <span className="text-xs font-bold text-fg text-center leading-tight">
              {cat.name}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function PlaceholderTab({
  icon,
  title,
  description,
  buttonLabel,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonLabel: string;
}) {
  return (
    <div className="flex flex-col items-center text-center py-12 px-6">
      <div className="w-20 h-20 rounded-3xl bg-accent/10 flex items-center justify-center text-accent mb-5">
        {icon}
      </div>
      <h2 className="text-lg font-bold text-fg mb-2">{title}</h2>
      <p className="text-sm text-fg-secondary leading-relaxed mb-6 max-w-xs">
        {description}
      </p>
      <motion.button
        className="bg-accent text-white px-8 py-3 rounded-2xl font-bold text-sm
          shadow-[0_2px_8px_rgba(232,168,124,0.3)]
          hover:bg-accent-hover transition-colors
          focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        whileTap={{ scale: 0.95 }}
      >
        {buttonLabel}
      </motion.button>
    </div>
  );
}
