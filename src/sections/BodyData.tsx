import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApp, calculatePlan, type UserProfile } from "@/context/AppContext";
import { IconArrowRight } from "@/icons/MealIcons";

const activityLevels = [
  { id: "sedentary" as const, label: "خامل", desc: "لا أمارس الرياضة" },
  { id: "light" as const, label: "خفيف", desc: "١-٢ أيام أسبوعيًا" },
  { id: "moderate" as const, label: "متوسط", desc: "٣-٤ أيام أسبوعيًا" },
  { id: "active" as const, label: "نشيط", desc: "٥-٦ أيام أسبوعيًا" },
  { id: "very_active" as const, label: "نشيط جدًا", desc: "يوميًا أو مرتين" },
];

export default function BodyData() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setProfile, setPlan, completeOnboarding } = useApp();
  const goal = (searchParams.get("goal") || "lose") as UserProfile["goal"];

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "male" as "male" | "female",
    height: "",
    weight: "",
    targetWeight: "",
    activityLevel: "moderate" as UserProfile["activityLevel"],
    workoutDays: "3",
    targetDuration: "12",
  });

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isValid =
    form.name.trim() &&
    Number(form.age) > 0 &&
    Number(form.height) > 0 &&
    Number(form.weight) > 0 &&
    Number(form.targetWeight) > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    const profile: UserProfile = {
      name: form.name,
      age: Number(form.age),
      gender: form.gender,
      height: Number(form.height),
      weight: Number(form.weight),
      targetWeight: Number(form.targetWeight),
      activityLevel: form.activityLevel,
      workoutDays: Number(form.workoutDays),
      goal,
      targetDuration: Number(form.targetDuration),
    };
    setProfile(profile);
    const plan = calculatePlan(profile);
    setPlan(plan);
    completeOnboarding();
    navigate("/onboarding/results");
  };

  return (
    <div className="min-h-screen bg-bg pb-8">
      <header className="sticky top-0 z-30 bg-bg/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-fg-secondary hover:text-fg hover:bg-bg-card transition-colors"
          >
            <IconArrowRight className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-fg">بياناتك</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 max-w-lg mx-auto mt-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-fg-secondary mb-2"
        >
          الخطوة 2 من 3
        </motion.div>

        {/* Name */}
        <Field label="الاسم">
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="أدخل اسمك"
            className="field-input"
          />
        </Field>

        {/* Gender */}
        <Field label="الجنس">
          <div className="flex gap-3">
            {(["male", "female"] as const).map((g) => (
              <button
                key={g}
                onClick={() => update("gender", g)}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border
                  ${form.gender === g
                    ? "bg-accent text-white border-accent shadow-[0_2px_8px_rgba(232,168,124,0.3)]"
                    : "bg-bg-card text-fg-secondary border-border hover:border-accent/30"
                  }`}
              >
                {g === "male" ? "ذكر" : "أنثى"}
              </button>
            ))}
          </div>
        </Field>

        {/* Age & Height */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="العمر">
            <input
              type="number"
              value={form.age}
              onChange={(e) => update("age", e.target.value)}
              placeholder="25"
              className="field-input"
              min="10"
              max="100"
            />
          </Field>
          <Field label="الطول (سم)">
            <input
              type="number"
              value={form.height}
              onChange={(e) => update("height", e.target.value)}
              placeholder="175"
              className="field-input"
              min="100"
              max="250"
            />
          </Field>
        </div>

        {/* Weight & Target Weight */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="الوزن الحالي (كجم)">
            <input
              type="number"
              value={form.weight}
              onChange={(e) => update("weight", e.target.value)}
              placeholder="80"
              className="field-input"
              min="30"
              max="300"
            />
          </Field>
          <Field label="الوزن المستهدف (كجم)">
            <input
              type="number"
              value={form.targetWeight}
              onChange={(e) => update("targetWeight", e.target.value)}
              placeholder="72"
              className="field-input"
              min="30"
              max="300"
            />
          </Field>
        </div>

        {/* Activity Level */}
        <Field label="مستوى النشاط البدني">
          <div className="space-y-2">
            {activityLevels.map((a) => (
              <button
                key={a.id}
                onClick={() => update("activityLevel", a.id)}
                className={`w-full flex items-center justify-between py-3 px-4 rounded-xl text-sm transition-all border
                  ${form.activityLevel === a.id
                    ? "bg-accent/10 border-accent text-fg font-bold"
                    : "bg-bg-card border-border text-fg-secondary hover:border-accent/30"
                  }`}
              >
                <span>{a.label}</span>
                <span className="text-xs text-fg-light">{a.desc}</span>
              </button>
            ))}
          </div>
        </Field>

        {/* Workout Days */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="أيام التمرين/أسبوع">
            <input
              type="number"
              value={form.workoutDays}
              onChange={(e) => update("workoutDays", e.target.value)}
              placeholder="3"
              className="field-input"
              min="0"
              max="7"
            />
          </Field>
          <Field label="المدة المستهدفة (أسابيع)">
            <input
              type="number"
              value={form.targetDuration}
              onChange={(e) => update("targetDuration", e.target.value)}
              placeholder="12"
              className="field-input"
              min="1"
              max="52"
            />
          </Field>
        </div>

        {/* Progress */}
        <div className="pt-2">
          <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={{ width: "33%" }}
              animate={{ width: "66%" }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>

        {/* Submit */}
        <motion.button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all mt-4
            focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40
            ${isValid
              ? "bg-accent text-white shadow-[0_4px_16px_rgba(232,168,124,0.3)] hover:bg-accent-hover"
              : "bg-border text-fg-light cursor-not-allowed"
            }`}
          whileTap={isValid ? { scale: 0.97 } : {}}
        >
          احسب احتياجي اليومي
        </motion.button>
      </main>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-bold text-fg mb-2">{label}</label>
      {children}
    </div>
  );
}
