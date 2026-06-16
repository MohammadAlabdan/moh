import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IconArrowRight } from "@/icons/MealIcons";
import { useApp } from "@/context/AppContext";

export default function WeightPage() {
  const navigate = useNavigate();
  const { profile, weightEntries, addWeightEntry } = useApp();
  const [newWeight, setNewWeight] = useState("");
  const [showForm, setShowForm] = useState(false);

  const currentWeight = profile?.weight ?? 80;
  const targetWeight = profile?.targetWeight ?? 72;
  const startWeight = weightEntries.length > 0
    ? weightEntries[weightEntries.length - 1].weight
    : currentWeight;

  const totalDiff = Math.abs(startWeight - targetWeight);
  const currentDiff = Math.abs(currentWeight - targetWeight);
  const progressPct = totalDiff > 0 ? Math.min(100, Math.round(((totalDiff - currentDiff) / totalDiff) * 100)) : 0;

  const handleSave = () => {
    const w = parseFloat(newWeight);
    if (!isNaN(w) && w > 20 && w < 300) {
      addWeightEntry(w);
      setNewWeight("");
      setShowForm(false);
    }
  };

  // Chart data: last 8 entries (reversed for chronological order)
  const chartEntries = [...weightEntries].reverse().slice(-8);
  const chartMin = chartEntries.length > 0 ? Math.min(...chartEntries.map((e) => e.weight)) - 2 : 70;
  const chartMax = chartEntries.length > 0 ? Math.max(...chartEntries.map((e) => e.weight)) + 2 : 85;
  const chartRange = chartMax - chartMin || 1;

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
          <h1 className="text-lg font-bold text-fg">متابعة الوزن</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 max-w-lg mx-auto mt-4 space-y-4">
        {/* Current Weight Card */}
        <motion.div
          className="bg-bg-card rounded-2xl p-5 shadow-[0_2px_12px_var(--color-shadow)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-fg-secondary">الوزن الحالي</p>
              <p className="text-3xl font-extrabold text-fg mt-1">{currentWeight} <span className="text-base font-normal text-fg-secondary">كجم</span></p>
            </div>
            <div className="text-left">
              <p className="text-sm text-fg-secondary">الهدف</p>
              <p className="text-2xl font-extrabold text-accent mt-1">{targetWeight} <span className="text-base font-normal text-fg-secondary">كجم</span></p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-fg-secondary">
              <span>متبقي {currentDiff.toFixed(1)} كجم</span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-3 bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Add Weight Button / Form */}
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.button
              key="add-btn"
              onClick={() => setShowForm(true)}
              className="w-full bg-accent text-white rounded-2xl py-3.5 font-bold text-sm
                shadow-[0_4px_15px_rgba(232,168,124,0.3)] hover:bg-accent-hover transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              whileTap={{ scale: 0.98 }}
            >
              + سجل وزنك اليوم
            </motion.button>
          ) : (
            <motion.div
              key="form"
              className="bg-bg-card rounded-2xl p-5 shadow-[0_2px_12px_var(--color-shadow)] space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="text-sm font-bold text-fg">أدخل وزنك (كجم)</p>
              <input
                type="number"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                placeholder={currentWeight.toString()}
                className="field-input text-center text-2xl font-bold"
                step="0.1"
                min="20"
                max="300"
                autoFocus
              />
              <div className="flex gap-2">
                <motion.button
                  onClick={handleSave}
                  disabled={!newWeight}
                  className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all
                    ${newWeight ? "bg-accent text-white hover:bg-accent-hover shadow-[0_2px_8px_rgba(232,168,124,0.3)]" : "bg-border text-fg-light cursor-not-allowed"}`}
                  whileTap={newWeight ? { scale: 0.97 } : {}}
                >
                  حفظ
                </motion.button>
                <motion.button
                  onClick={() => { setShowForm(false); setNewWeight(""); }}
                  className="flex-1 py-3 rounded-2xl border-2 border-border text-fg-secondary font-bold text-sm hover:bg-bg transition-colors"
                  whileTap={{ scale: 0.97 }}
                >
                  إلغاء
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chart */}
        {chartEntries.length >= 2 && (
          <motion.div
            className="bg-bg-card rounded-2xl p-5 shadow-[0_2px_12px_var(--color-shadow)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-sm font-bold text-fg mb-4">رسم بياني</h3>
            <svg viewBox={`0 0 300 160`} className="w-full" overflow="visible">
              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((f) => (
                <line
                  key={f}
                  x1="0" y1={20 + 110 * f} x2="300" y2={20 + 110 * f}
                  stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="4"
                />
              ))}
              {/* Target line */}
              {targetWeight >= chartMin && targetWeight <= chartMax && (
                <>
                  <line
                    x1="0" y1={20 + ((chartMax - targetWeight) / chartRange) * 110}
                    x2="300" y2={20 + ((chartMax - targetWeight) / chartRange) * 110}
                    stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="6 3"
                  />
                  <text x="300" y={16 + ((chartMax - targetWeight) / chartRange) * 110}
                    fill="var(--color-accent)" fontSize="8" textAnchor="end">الهدف</text>
                </>
              )}
              {/* Line path */}
              <polyline
                points={chartEntries.map((e, i) => {
                  const x = (i / (chartEntries.length - 1)) * 280 + 10;
                  const y = 20 + ((chartMax - e.weight) / chartRange) * 110;
                  return `${x},${y}`;
                }).join(" ")}
                fill="none"
                stroke="var(--color-green)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Dots + labels */}
              {chartEntries.map((e, i) => {
                const x = (i / (chartEntries.length - 1)) * 280 + 10;
                const y = 20 + ((chartMax - e.weight) / chartRange) * 110;
                return (
                  <g key={e.id}>
                    <circle cx={x} cy={y} r="4" fill="var(--color-green)" stroke="white" strokeWidth="2" />
                    <text x={x} y={y - 10} fill="var(--color-fg)" fontSize="8" textAnchor="middle" fontWeight="bold">
                      {e.weight}
                    </text>
                    <text x={x} y={145} fill="var(--color-fg-light)" fontSize="7" textAnchor="middle">
                      {e.date.split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </motion.div>
        )}

        {/* History List */}
        <motion.div
          className="bg-bg-card rounded-2xl shadow-[0_2px_12px_var(--color-shadow)] overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="px-5 pt-4 pb-2">
            <h3 className="text-sm font-bold text-fg">السجل</h3>
          </div>

          {weightEntries.length === 0 ? (
            <div className="px-5 pb-5 text-center">
              <div className="w-16 h-16 rounded-2xl bg-border/50 flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-fg-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3v18M3 12h18" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-sm text-fg-secondary">لم تسجل وزنك بعد</p>
              <p className="text-xs text-fg-light mt-1">ابدأ بتسجيل وزنك اليوم لمتابعة تقدمك!</p>
            </div>
          ) : (
            weightEntries.map((entry, i) => {
              const prev = weightEntries[i + 1];
              const diff = prev ? entry.weight - prev.weight : 0;
              return (
                <motion.div
                  key={entry.id}
                  className={`flex items-center justify-between px-5 py-3.5 ${i < weightEntries.length - 1 ? "border-b border-border" : ""}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                >
                  <div>
                    <p className="text-sm font-bold text-fg">{entry.weight} كجم</p>
                    <p className="text-xs text-fg-light mt-0.5">{entry.date}</p>
                  </div>
                  {diff !== 0 && (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      diff < 0 ? "bg-green-light text-green" : "bg-red-light text-red"
                    }`}>
                      {diff > 0 ? "+" : ""}{diff.toFixed(1)} كجم
                    </span>
                  )}
                </motion.div>
              );
            })
          )}
        </motion.div>
      </main>
    </div>
  );
}
