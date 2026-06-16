import { createContext, useContext, useState, useCallback, useEffect, useMemo, type ReactNode } from "react";

/* ─── Types ─── */

export interface UserProfile {
  name: string;
  age: number;
  gender: "male" | "female";
  height: number;
  weight: number;
  targetWeight: number;
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active";
  workoutDays: number;
  goal: "lose" | "gain" | "maintain" | "muscle" | "health";
  targetDuration: number;
}

export interface NutritionPlan {
  bmr: number;
  tdee: number;
  dailyCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
}

export interface TrackedMeal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date?: string;
}

export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
}

export interface AppNotification {
  id: string;
  type: "info" | "warning" | "success" | "tip";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export type Theme = "light" | "dark";

interface AppState {
  profile: UserProfile | null;
  plan: NutritionPlan | null;
  onboardingComplete: boolean;
  meals: TrackedMeal[];
  waterGlasses: number;
  weightEntries: WeightEntry[];
  theme: Theme;
  notifications: AppNotification[];
  setProfile: (p: UserProfile) => void;
  setPlan: (p: NutritionPlan) => void;
  completeOnboarding: () => void;
  addMeal: (meal: Omit<TrackedMeal, "id">) => void;
  removeMeal: (id: string) => void;
  setWaterGlasses: (n: number) => void;
  addWeightEntry: (weight: number) => void;
  toggleTheme: () => void;
  addNotification: (n: Omit<AppNotification, "id" | "read">) => void;
  dismissNotification: (id: string) => void;
  markNotificationRead: (id: string) => void;
  consumed: { calories: number; protein: number; carbs: number; fat: number };
  todayMeals: TrackedMeal[];
}

/* ─── localStorage helpers ─── */

const STORAGE_KEYS = {
  profile: "nf-profile",
  plan: "nf-plan",
  onboarding: "nf-onboarding",
  meals: "nf-meals",
  water: "nf-water",
  waterDate: "nf-water-date",
  weight: "nf-weight",
  theme: "nutriflow-theme",
  notifications: "nf-notifs",
} as const;

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { /* quota exceeded - silently ignore */ }
}

function getTodayISO(): string {
  return new Date().toISOString().split("T")[0];
}

/* ─── Default notifications ─── */

const defaultNotifications: AppNotification[] = [
  { id: "n1", type: "tip", title: "نصيحة اليوم", message: "شرب الماء قبل الوجبة بـ 30 دقيقة يساعد على الشبع وتقليل كمية الأكل.", time: "٩:٠٠ ص", read: false },
  { id: "n2", type: "info", title: "تذكير بوزن الجسم", message: "لم تسجل وزنك هذا الأسبوع. سجل وزنك لمتابعة تقدمك.", time: "٨:٠٠ ص", read: false },
  { id: "n3", type: "warning", title: "البروتين منخفض", message: "لاحظنا أن استهلاكك من البروتين أقل من المطلوب في الأيام الأخيرة.", time: "أمس", read: true },
  { id: "n4", type: "success", title: "أحسنت!", message: "أكملت هدفك من الماء يوم أمس. واصل هذا الالتزام الرائع!", time: "أمس", read: true },
];

/* ─── Context ─── */

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  /* ── Persisted state ── */
  const [profile, setProfileRaw] = useState<UserProfile | null>(() => loadJSON(STORAGE_KEYS.profile, null));
  const [plan, setPlanRaw] = useState<NutritionPlan | null>(() => loadJSON(STORAGE_KEYS.plan, null));
  const [onboardingComplete, setOnboardingComplete] = useState(() => loadJSON(STORAGE_KEYS.onboarding, false));
  const [meals, setMeals] = useState<TrackedMeal[]>(() => loadJSON(STORAGE_KEYS.meals, []));
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>(() => loadJSON(STORAGE_KEYS.weight, []));
  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    loadJSON(STORAGE_KEYS.notifications, defaultNotifications)
  );

  // Water resets daily
  const [waterGlasses, setWaterGlassesRaw] = useState(() => {
    const savedDate = localStorage.getItem(STORAGE_KEYS.waterDate);
    if (savedDate === getTodayISO()) {
      return loadJSON(STORAGE_KEYS.water, 0);
    }
    return 0;
  });

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEYS.theme) as Theme;
      if (stored) return stored;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  /* ── Persist on change ── */
  useEffect(() => { saveJSON(STORAGE_KEYS.profile, profile); }, [profile]);
  useEffect(() => { saveJSON(STORAGE_KEYS.plan, plan); }, [plan]);
  useEffect(() => { saveJSON(STORAGE_KEYS.onboarding, onboardingComplete); }, [onboardingComplete]);
  useEffect(() => { saveJSON(STORAGE_KEYS.meals, meals); }, [meals]);
  useEffect(() => {
    saveJSON(STORAGE_KEYS.water, waterGlasses);
    localStorage.setItem(STORAGE_KEYS.waterDate, getTodayISO());
  }, [waterGlasses]);
  useEffect(() => { saveJSON(STORAGE_KEYS.weight, weightEntries); }, [weightEntries]);
  useEffect(() => { saveJSON(STORAGE_KEYS.notifications, notifications); }, [notifications]);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  /* ── Setters with persistence ── */
  const setProfile = useCallback((p: UserProfile) => setProfileRaw(p), []);
  const setPlan = useCallback((p: NutritionPlan) => setPlanRaw(p), []);
  const completeOnboarding = useCallback(() => setOnboardingComplete(true), []);

  const addMeal = useCallback((meal: Omit<TrackedMeal, "id">) => {
    const today = getTodayISO();
    setMeals((prev) => [...prev, { ...meal, id: Date.now().toString(), date: today }]);
  }, []);

  const removeMeal = useCallback((id: string) => {
    setMeals((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const setWaterGlasses = useCallback((n: number) => setWaterGlassesRaw(n), []);

  const addWeightEntry = useCallback((weight: number) => {
    const today = new Date();
    const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    const dateStr = `${today.getDate()} ${months[today.getMonth()]}`;
    setWeightEntries((prev) => [
      { id: Date.now().toString(), date: dateStr, weight },
      ...prev,
    ]);
    setProfileRaw((prev) => prev ? { ...prev, weight } : prev);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const addNotification = useCallback((n: Omit<AppNotification, "id" | "read">) => {
    setNotifications((prev) => [{ ...n, id: Date.now().toString(), read: false }, ...prev]);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  /* ── Today's data ── */
  const todayISO = getTodayISO();

  const todayMeals = useMemo(
    () => meals.filter((m) => m.date === todayISO),
    [meals, todayISO]
  );

  const consumed = useMemo(
    () => todayMeals.reduce(
      (acc, m) => ({
        calories: acc.calories + m.calories,
        protein: acc.protein + m.protein,
        carbs: acc.carbs + m.carbs,
        fat: acc.fat + m.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    ),
    [todayMeals]
  );

  return (
    <AppContext.Provider
      value={{
        profile, plan, onboardingComplete, meals, waterGlasses, consumed, todayMeals,
        weightEntries, theme, notifications,
        setProfile, setPlan, completeOnboarding, addMeal, removeMeal,
        setWaterGlasses, addWeightEntry, toggleTheme,
        addNotification, dismissNotification, markNotificationRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

/* ─── Calculations ─── */

export function calculateBMR(profile: UserProfile): number {
  const { gender, weight, height, age } = profile;
  if (gender === "male") return 10 * weight + 6.25 * height - 5 * age + 5;
  return 10 * weight + 6.25 * height - 5 * age - 161;
}

const activityMultipliers: Record<UserProfile["activityLevel"], number> = {
  sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9,
};

export function calculateTDEE(bmr: number, activityLevel: UserProfile["activityLevel"]): number {
  return Math.round(bmr * activityMultipliers[activityLevel]);
}

export function calculatePlan(profile: UserProfile): NutritionPlan {
  const bmr = Math.round(calculateBMR(profile));
  const tdee = calculateTDEE(bmr, profile.activityLevel);
  let dailyCalories: number;
  let proteinPerKg: number;

  switch (profile.goal) {
    case "lose": dailyCalories = tdee - 500; proteinPerKg = 2.0; break;
    case "gain": dailyCalories = tdee + 400; proteinPerKg = 1.8; break;
    case "muscle": dailyCalories = tdee + 300; proteinPerKg = 2.2; break;
    default: dailyCalories = tdee; proteinPerKg = 1.6; break;
  }

  const protein = Math.round(profile.weight * proteinPerKg);
  const fatCalories = dailyCalories * 0.25;
  const fat = Math.round(fatCalories / 9);
  const carbCalories = dailyCalories - protein * 4 - fatCalories;
  const carbs = Math.round(carbCalories / 4);
  const water = Math.round((profile.weight * 0.033) * 10) / 10;

  return { bmr, tdee, dailyCalories: Math.round(dailyCalories), protein, carbs: Math.max(0, carbs), fat, water };
}

/* ─── Helpers ─── */

export function getTodayArabic(): string {
  const d = new Date();
  const days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
  const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
  return `${days[d.getDay()]}، ${d.getDate().toLocaleString("ar-EG")} ${months[d.getMonth()]} ${d.getFullYear().toLocaleString("ar-EG").replace(/٬/g, "")}`;
}

export function getNowTimeArabic(): string {
  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const ampm = h < 12 ? "ص" : "م";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12.toLocaleString("ar-EG")}:${m.split("").map((c) => "٠١٢٣٤٥٦٧٨٩"[+c] || c).join("")} ${ampm}`;
}

export const goalLabels: Record<string, string> = {
  lose: "نزول وزن", gain: "زيادة وزن", muscle: "بناء عضل", maintain: "تثبيت الوزن", health: "تحسين الصحة",
};
