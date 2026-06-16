import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IconArrowRight } from "@/icons/MealIcons";

const sections = [
  {
    id: "intro",
    title: "مقدمة",
    body: `تطبيق NutriFlow هو تطبيق ذكي لتتبع التغذية وحساب السعرات الحرارية، مصمم لمساعدتك في تحقيق أهدافك الصحية. يقدم التطبيق حسابات دقيقة لمعدل الأيض الأساسي (BMR) واحتياجك اليومي من الطاقة (TDEE)، بالإضافة إلى تتبع الوجبات والماكروز والماء.

نحن نلتزم بحماية خصوصيتك وبياناتك الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك عند استخدام التطبيق.`,
  },
  {
    id: "disclaimer",
    title: "إخلاء مسؤولية طبية",
    body: `هذا التطبيق ليس بديلاً عن الاستشارة الطبية أو المتابعة مع أخصائي تغذية مرخص. المعلومات والنصائح المقدمة في التطبيق هي لأغراض تثقيفية وتوعوية فقط.

• لا يقدم التطبيق تشخيصًا طبيًا أو وصفات علاجية.
• المستخدمون الذين يعانون من حالات صحية مزمنة (مثل السكري، أمراض القلب، اضطرابات الأكل) يجب عليهم استشارة طبيب أو أخصائي تغذية قبل اتباع أي خطة غذائية.
• الحسابات المقدمة (BMR، TDEE، السعرات) هي تقديرات مبنية على معادلات علمية وقد تختلف من شخص لآخر.
• النصائح المولدة بالذكاء الاصطناعي هي اقتراحات عامة وليست توصيات طبية شخصية.
• يتحمل المستخدم مسؤولية قراراته الغذائية والصحية.`,
  },
  {
    id: "data-collection",
    title: "البيانات التي نجمعها",
    body: `نجمع البيانات التالية لتقديم خدمة مخصصة لك:

• البيانات الشخصية: الاسم، العمر، الجنس، الطول، الوزن، الوزن المستهدف.
• بيانات الوجبات: الوجبات المسجلة، السعرات الحرارية، الماكروز (بروتين، كربوهيدرات، دهون).
• بيانات الاستخدام: تفاعلك مع التطبيق، الميزات المستخدمة، أوقات الاستخدام.
• بيانات الصحة: سجل الوزن، استهلاك الماء، نسبة الالتزام.

نحن لا نشارك بياناتك الشخصية مع أطراف ثالثة دون موافقتك الصريحة. لا نبيع بياناتك لأي جهة إعلانية أو تجارية.`,
  },
  {
    id: "data-protection",
    title: "حماية البيانات",
    body: `نتخذ إجراءات أمنية صارمة لحماية بياناتك:

• تشفير البيانات أثناء النقل والتخزين باستخدام بروتوكولات أمان متقدمة (TLS/SSL).
• تخزين البيانات على خوادم آمنة مع نسخ احتياطية منتظمة.
• الوصول المحدود: فقط الموظفون المخولون يمكنهم الوصول إلى البيانات لأغراض الدعم الفني.
• لا نبيع أو نؤجر بياناتك الشخصية لأي طرف ثالث.
• نلتزم بأفضل الممارسات الأمنية المعتمدة في الصناعة.`,
  },
  {
    id: "photos",
    title: "الصور والوجبات",
    body: `عند استخدام ميزة تحليل الوجبات بالذكاء الاصطناعي:

• الصور المرفوعة تُعالج بشكل آمن لتحليل محتوى الوجبة وتقدير السعرات.
• لا يتم تخزين الصور بشكل دائم على خوادمنا دون موافقتك.
• تُحذف الصور المؤقتة بعد اكتمال التحليل.
• يمكنك اختيار حفظ الصور في سجل وجباتك أو حذفها.
• لا تُستخدم صورك لتدريب نماذج الذكاء الاصطناعي دون إذن صريح منك.`,
  },
  {
    id: "user-rights",
    title: "حقوق المستخدم",
    body: `لديك الحقوق التالية فيما يتعلق ببياناتك:

• حق تصدير البيانات: يمكنك تحميل جميع بياناتك (الوجبات، الوزن، الإعدادات) بصيغة CSV في أي وقت.
• حق حذف الحساب: يمكنك حذف حسابك وجميع بياناتك نهائيًا من خلال إعدادات التطبيق.
• حق إلغاء الاشتراك في التحليلات: يمكنك إيقاف جمع بيانات الاستخدام من إعدادات الخصوصية.
• حق التعديل: يمكنك تعديل بياناتك الشخصية في أي وقت.
• حق الاطلاع: يمكنك طلب نسخة كاملة من بياناتك المخزنة لدينا.`,
  },
  {
    id: "updates",
    title: "التحديثات",
    body: `قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات في ممارساتنا أو لأسباب تشغيلية أو قانونية.

• سنقوم بإشعارك عبر التطبيق عند إجراء تغييرات جوهرية على هذه السياسة.
• يُعتبر استمرارك في استخدام التطبيق بعد نشر التحديثات موافقة على السياسة المحدثة.
• ننصحك بمراجعة هذه الصفحة بشكل دوري للاطلاع على أي تغييرات.

آخر تحديث: يونيو ٢٠٢٥`,
  },
  {
    id: "contact",
    title: "تواصل معنا",
    body: `إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية أو كيفية التعامل مع بياناتك، يمكنك التواصل معنا عبر:

• البريد الإلكتروني: privacy@nutriflow.app
• الدعم الفني داخل التطبيق: الإعدادات > تواصل معنا
• نسعى للرد على جميع الاستفسارات خلال ٤٨ ساعة عمل.`,
  },
];

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg pb-8" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-bg/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-fg-secondary hover:text-fg hover:bg-bg-card transition-colors"
          >
            <IconArrowRight className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-fg">سياسة الخصوصية</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 max-w-lg mx-auto mt-4 space-y-4">
        {/* Disclaimer Banner */}
        <motion.div
          className="bg-orange-light border border-orange/30 rounded-2xl p-4 flex gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="shrink-0 w-10 h-10 rounded-xl bg-orange/15 flex items-center justify-center">
            <svg className="w-5 h-5 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-fg">تنبيه مهم</p>
            <p className="text-xs text-fg-secondary mt-1 leading-relaxed">
              هذا التطبيق لا يُغني عن استشارة الطبيب أو أخصائي التغذية. جميع النصائح والحسابات المقدمة هي لأغراض تثقيفية فقط.
            </p>
          </div>
        </motion.div>

        {/* Sections */}
        {sections.map((section, i) => (
          <motion.div
            key={section.id}
            className="bg-bg-card rounded-2xl p-5 shadow-[0_2px_12px_var(--color-shadow)]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center">
                <span className="text-accent font-bold text-xs">{i + 1}</span>
              </div>
              <h2 className="text-base font-bold text-fg">{section.title}</h2>
            </div>
            <p className="text-sm text-fg-secondary leading-[1.8] whitespace-pre-line">{section.body}</p>
          </motion.div>
        ))}

        {/* Footer */}
        <motion.div
          className="text-center pt-2 pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-fg-light">NutriFlow &copy; ٢٠٢٥ - جميع الحقوق محفوظة</p>
        </motion.div>
      </main>
    </div>
  );
}
