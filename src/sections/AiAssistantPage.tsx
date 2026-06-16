import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IconArrowRight } from "@/icons/MealIcons";
import { IconBrain } from "@/icons/Icons";
import { useApp } from "@/context/AppContext";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

export default function AiAssistantPage() {
  const navigate = useNavigate();
  const { profile, plan, consumed, todayMeals, waterGlasses } = useApp();

  const remaining = plan ? Math.max(0, plan.dailyCalories - consumed.calories) : 720;
  const proteinRemaining = plan ? Math.max(0, plan.protein - consumed.protein) : 80;
  const carbsRemaining = plan ? Math.max(0, plan.carbs - consumed.carbs) : 120;
  const fatRemaining = plan ? Math.max(0, plan.fat - consumed.fat) : 30;
  const waterTarget = plan ? Math.round(plan.water / 0.25) : 8;
  const userName = profile?.name || "صديقي";

  const suggestions = [
    "اقترح لي وجبة عشاء صحية",
    "كيف أزيد البروتين في وجباتي؟",
    "هل أكلي اليوم كان متوازن؟",
    "صحّح وجبتي",
    "أريد بدائل صحية للحلويات",
    "كم باقي لي من سعرات اليوم؟",
  ];

  const buildDynamicResponses = useCallback((): Record<string, string> => {
    const proteinPct = plan ? Math.round((consumed.protein / plan.protein) * 100) : 0;
    const carbsPct = plan ? Math.round((consumed.carbs / plan.carbs) * 100) : 0;
    const fatPct = plan ? Math.round((consumed.fat / plan.fat) * 100) : 0;
    const mealCount = todayMeals.length;
    const waterPct = waterTarget > 0 ? Math.round((waterGlasses / waterTarget) * 100) : 0;

    return {
      "اقترح لي وجبة عشاء صحية": `بناءً على المتبقي من سعراتك اليوم (${remaining} سعرة و${proteinRemaining} غ بروتين)، أقترح لك يا ${userName}:\n\n${
        remaining > 600
          ? "- صدر دجاج مشوي (١٦٥ سعرة، ٣١ غ بروتين)\n- سلطة خضار كبيرة مع زيت زيتون (١٢٠ سعرة)\n- نصف كوب رز بسمتي (١٠٠ سعرة)\n- زبادي يوناني كتحلية (١٠٠ سعرة، ١٧ غ بروتين)\n\nالمجموع: ٤٨٥ سعرة و٤٨ غ بروتين.\nوجبة متوازنة وتترك لك مجال لسناك خفيف."
          : remaining > 300
          ? "- سلطة سيزر بالدجاج (٢٢٠ سعرة، ٢٥ غ بروتين)\n- كوب لبن (٦٢ سعرة)\n\nالمجموع: ٢٨٢ سعرة. وجبة خفيفة ومشبعة تناسب المتبقي من سعراتك."
          : "- زبادي يوناني مع فراولة (١٢٠ سعرة، ١٧ غ بروتين)\n- خيار وجزر (٣٠ سعرة)\n\nالمجموع: ١٥٠ سعرة. سناك خفيف يناسب المتبقي من سعراتك."
      }`,

      "كيف أزيد البروتين في وجباتي؟": `حاليًا استهلكت ${consumed.protein} غ بروتين من أصل ${plan?.protein || 165} غ (${proteinPct}%).\n\nإليك نصائح عملية لزيادة البروتين:\n\n١. أضف بيض مسلوق لوجبة الإفطار (٦ غ بروتين لكل بيضة)\n٢. استبدل الرز العادي بالكينوا (٨ غ بروتين/كوب)\n٣. تناول زبادي يوناني كسناك (١٧ غ/حصة)\n٤. أضف صدر دجاج أو تونا للسلطة\n٥. اشرب حليب قليل الدسم (٨ غ/كوب)\n\nتحتاج ${proteinRemaining} غ بروتين إضافي اليوم. حاول توزيعه على الوجبات المتبقية.`,

      "هل أكلي اليوم كان متوازن؟": `${mealCount === 0
        ? `لم تسجل أي وجبات اليوم بعد يا ${userName}! ابدأ بتسجيل وجباتك حتى أقدر أحلل لك نظامك الغذائي.`
        : `حتى الآن أكلت ${consumed.calories} سعرة من أصل ${plan?.dailyCalories || 2200}:\n\n- البروتين: ${consumed.protein}/${plan?.protein || 165} غ (${proteinPct}%) ${proteinPct < 50 ? "⚠️ يحتاج تحسين" : proteinPct < 80 ? "- جيد" : "✅ ممتاز"}\n- الكربوهيدرات: ${consumed.carbs}/${plan?.carbs || 248} غ (${carbsPct}%) ${carbsPct > 100 ? "⚠️ تجاوزت الهدف" : "- جيد"}\n- الدهون: ${consumed.fat}/${plan?.fat || 73} غ (${fatPct}%) ${fatPct > 100 ? "⚠️ تجاوزت الهدف" : "- جيد"}\n- الماء: ${waterGlasses}/${waterTarget} كوب (${waterPct}%) ${waterPct < 50 ? "💧 اشرب ماء أكثر" : "👍"}\n\nسجلت ${mealCount} ${mealCount === 1 ? "وجبة" : "وجبات"} اليوم.\n\n${proteinPct < 60 ? "⚡ ركز على البروتين في الوجبة القادمة." : "بشكل عام يومك جيد! واصل الالتزام."}`
      }`,

      "أريد بدائل صحية للحلويات": `بدائل صحية ولذيذة:\n\n١. زبادي يوناني مع عسل وفراولة (١٢٠ سعرة)\n٢. تمرتان مع ملعقة زبدة فول سوداني (١٤٠ سعرة)\n٣. موز مجمد مخفوق كآيس كريم (١٠٠ سعرة)\n٤. شوكولاتة داكنة ٨٥% - مربعين (٩٠ سعرة)\n٥. حليب بالكاكاو قليل الدسم (١٣٠ سعرة)\n\n${remaining > 200 ? `عندك ${remaining} سعرة متبقية، تقدر تختار أي خيار بدون قلق!` : `المتبقي لك ${remaining} سعرة فقط، اختر الخيارات الأقل سعرات.`}`,

      "كم باقي لي من سعرات اليوم؟": `${userName}، إليك ملخص يومك:\n\n🔥 السعرات: ${consumed.calories} / ${plan?.dailyCalories || 2200} (متبقي: ${remaining})\n🥩 البروتين: ${consumed.protein} / ${plan?.protein || 165} غ (متبقي: ${proteinRemaining} غ)\n🍚 الكربوهيدرات: ${consumed.carbs} / ${plan?.carbs || 248} غ (متبقي: ${carbsRemaining} غ)\n🧈 الدهون: ${consumed.fat} / ${plan?.fat || 73} غ (متبقي: ${fatRemaining} غ)\n💧 الماء: ${waterGlasses} / ${waterTarget} كوب\n\n${remaining > 500 ? "عندك مجال جيد لوجبة كاملة!" : remaining > 200 ? "يكفي لسناك أو وجبة خفيفة." : remaining > 0 ? "المتبقي قليل، اختر بحكمة!" : "وصلت لهدفك اليوم! 🎉"}`,
    };
  }, [profile, plan, consumed, todayMeals, waterGlasses, remaining, proteinRemaining, carbsRemaining, fatRemaining, waterTarget, userName]);

  const welcomeMessage = `مرحبًا ${userName}! أنا مساعدك الغذائي الذكي 🧠\n\n${plan ? `خطتك اليوم: ${plan.dailyCalories} سعرة | ${plan.protein} غ بروتين\nاستهلكت حتى الآن: ${consumed.calories} سعرة\nالمتبقي: ${remaining} سعرة` : "يمكنني مساعدتك في تتبع تغذيتك"}\n\nيمكنني مساعدتك في:\n- اقتراح وجبات مناسبة لسعراتك المتبقية\n- تحليل وتصحيح وجباتك\n- نصائح لتحسين نظامك الغذائي\n- الإجابة على أسئلتك الغذائية\n\nكيف أقدر أساعدك اليوم؟`;

  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "assistant", text: welcomeMessage },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    // Navigate to fix-meal page if user selects that suggestion
    if (text.trim() === "صحّح وجبتي") {
      navigate("/fix-meal");
      return;
    }

    const userMsg: Message = { id: Date.now(), role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responses = buildDynamicResponses();
      const response = responses[text.trim()] ||
        buildFallbackResponse(text.trim());
      const aiMsg: Message = { id: Date.now() + 1, role: "assistant", text: response };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const buildFallbackResponse = (text: string): string => {
    // Smart keyword matching
    if (text.includes("بروتين") || text.includes("protein")) {
      return `بناءً على بياناتك، استهلكت ${consumed.protein} غ بروتين من أصل ${plan?.protein || 165} غ. ${proteinRemaining > 50 ? "تحتاج زيادة البروتين بشكل ملحوظ!" : "أنت قريب من هدفك!"}\n\nأفضل مصادر البروتين: صدر دجاج، بيض، تونا، زبادي يوناني، عدس.`;
    }
    if (text.includes("ماء") || text.includes("شرب")) {
      return `شربت ${waterGlasses} كوب من أصل ${waterTarget} كوب اليوم.\n\n${waterGlasses < waterTarget ? `تحتاج ${waterTarget - waterGlasses} كوب إضافي. حاول شرب كوب كل ساعة!` : "أحسنت! أكملت هدفك من الماء اليوم! 💧"}`;
    }
    if (text.includes("وزن")) {
      return `وزنك الحالي ${profile?.weight || "غير محدد"} كجم والهدف ${profile?.targetWeight || "غير محدد"} كجم.\n\nللوصول لهدفك، التزم بخطتك الغذائية (${plan?.dailyCalories || 2200} سعرة/يوم) ومارس الرياضة بانتظام.`;
    }
    if (text.includes("سعر") || text.includes("كالوري")) {
      return `المتبقي لك اليوم ${remaining} سعرة من أصل ${plan?.dailyCalories || 2200}.\n\n${remaining > 500 ? "عندك مجال جيد لوجبة كاملة!" : remaining > 200 ? "يكفي لسناك خفيف." : "المتبقي قليل جدًا."}`;
    }
    return `شكرًا على سؤالك يا ${userName}! بناءً على بياناتك، المتبقي لك اليوم ${remaining} سعرة و${proteinRemaining} غ بروتين.\n\nأنصحك بتناول وجبة متوازنة تحتوي على بروتين وخضار. هل تريد اقتراح وجبة محددة؟`;
  };

  return (
    <div className="h-screen bg-bg flex flex-col" dir="rtl">
      {/* Header */}
      <header className="shrink-0 bg-bg/95 backdrop-blur-sm border-b border-border z-30">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-fg-secondary hover:text-fg hover:bg-bg-card transition-colors"
          >
            <IconArrowRight className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent">
              <IconBrain className="w-4 h-4" />
            </div>
            <h1 className="text-lg font-bold text-fg">المساعد الذكي</h1>
          </div>
          <div className="w-10" />
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-lg mx-auto w-full space-y-3">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line
                  ${msg.role === "user"
                    ? "bg-accent text-white rounded-tr-sm"
                    : "bg-bg-card text-fg shadow-[0_1px_6px_var(--color-shadow)] rounded-tl-sm"
                  }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-bg-card rounded-2xl px-4 py-3 shadow-[0_1px_6px_var(--color-shadow)] rounded-tl-sm">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-fg-light"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />

        {/* Suggestions (only if no user messages yet) */}
        {messages.length <= 1 && (
          <motion.div
            className="space-y-2 pt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs text-fg-light text-center mb-2">اختر سؤالاً أو اكتب سؤالك</p>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className={`w-full text-right border rounded-xl px-4 py-3 text-sm transition-colors
                  ${s === "صحّح وجبتي"
                    ? "bg-green-light border-green/30 text-green font-bold hover:bg-green/15"
                    : "bg-bg-card border-border text-fg-secondary hover:border-accent/30 hover:text-fg"
                  }`}
              >
                {s === "صحّح وجبتي" && <span className="ml-1">✅</span>}
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Medical Disclaimer */}
      <div className="shrink-0 max-w-lg mx-auto w-full px-4">
        <p className="text-[10px] text-fg-light text-center mb-1">
          ⚕️ النصائح المقدمة عامة وليست بديلاً عن استشارة أخصائي تغذية أو طبيب
        </p>
      </div>

      {/* Input Bar */}
      <div className="shrink-0 border-t border-border bg-bg-card px-4 py-3">
        <div className="max-w-lg mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="اكتب سؤالك هنا..."
            className="flex-1 bg-bg border border-border rounded-xl px-4 py-3 text-sm text-fg placeholder:text-fg-light
              focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
            dir="rtl"
          />
          <motion.button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className={`px-5 rounded-xl font-bold text-sm transition-colors
              ${input.trim()
                ? "bg-accent text-white hover:bg-accent-hover"
                : "bg-border text-fg-light cursor-not-allowed"
              }`}
            whileTap={input.trim() ? { scale: 0.95 } : {}}
          >
            إرسال
          </motion.button>
        </div>
      </div>
    </div>
  );
}
