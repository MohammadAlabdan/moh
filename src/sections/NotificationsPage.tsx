import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IconArrowRight, IconX } from "@/icons/MealIcons";
import { useApp } from "@/context/AppContext";
import type { AppNotification } from "@/context/AppContext";

/* ── Type-based icon components ── */

function BellIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function TriangleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function CheckCircleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function LightbulbIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
    </svg>
  );
}

const typeConfig: Record<AppNotification["type"], { icon: React.FC<{ className?: string }>; color: string; bg: string }> = {
  info: { icon: BellIcon, color: "text-blue", bg: "bg-blue-light" },
  warning: { icon: TriangleIcon, color: "text-orange", bg: "bg-orange-light" },
  success: { icon: CheckCircleIcon, color: "text-green", bg: "bg-green-light" },
  tip: { icon: LightbulbIcon, color: "text-purple", bg: "bg-purple/15" },
};

export default function NotificationsPage() {
  const navigate = useNavigate();
  const { notifications, dismissNotification, markNotificationRead } = useApp();

  // Group: "اليوم" vs "سابقة" based on time field
  const { today, earlier } = useMemo(() => {
    const todayItems: AppNotification[] = [];
    const earlierItems: AppNotification[] = [];
    for (const n of notifications) {
      // Simple heuristic: if time contains "أمس" or longer-ago markers, it's earlier
      if (n.time.includes("أمس") || n.time.includes("يوم") || n.time.includes("أسبوع")) {
        earlierItems.push(n);
      } else {
        todayItems.push(n);
      }
    }
    return { today: todayItems, earlier: earlierItems };
  }, [notifications]);

  const handleClick = (id: string) => {
    markNotificationRead(id);
  };

  return (
    <div className="min-h-screen bg-bg pb-8" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-bg/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-fg-secondary hover:text-fg hover:bg-bg-card transition-colors"
            aria-label="رجوع"
          >
            <IconArrowRight className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-fg">التنبيهات</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 max-w-lg mx-auto mt-4 space-y-5">
        {notifications.length === 0 ? (
          /* Empty State */
          <motion.div
            className="flex flex-col items-center text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 rounded-3xl bg-blue-light flex items-center justify-center mb-5">
              <BellIcon className="w-10 h-10 text-blue" />
            </div>
            <p className="text-base font-bold text-fg mb-2">لا توجد تنبيهات جديدة</p>
            <p className="text-sm text-fg-secondary">سنرسل لك تنبيهات مهمة هنا</p>
          </motion.div>
        ) : (
          <>
            {/* Today */}
            {today.length > 0 && (
              <NotificationGroup
                title="اليوم"
                items={today}
                onClick={handleClick}
                onDismiss={dismissNotification}
              />
            )}

            {/* Earlier */}
            {earlier.length > 0 && (
              <NotificationGroup
                title="سابقة"
                items={earlier}
                onClick={handleClick}
                onDismiss={dismissNotification}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

/* ── Notification Group ── */

function NotificationGroup({
  title,
  items,
  onClick,
  onDismiss,
}: {
  title: string;
  items: AppNotification[];
  onClick: (id: string) => void;
  onDismiss: (id: string) => void;
}) {
  return (
    <div>
      <h3 className="text-sm font-bold text-fg-secondary mb-2 px-1">{title}</h3>
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {items.map((n, i) => (
            <NotificationItem
              key={n.id}
              notification={n}
              index={i}
              onClick={() => onClick(n.id)}
              onDismiss={() => onDismiss(n.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Single Notification ── */

function NotificationItem({
  notification: n,
  index,
  onClick,
  onDismiss,
}: {
  notification: AppNotification;
  index: number;
  onClick: () => void;
  onDismiss: () => void;
}) {
  const config = typeConfig[n.type];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
      transition={{ delay: 0.04 * index, duration: 0.25 }}
      onClick={onClick}
      className={`relative rounded-2xl p-4 shadow-[0_1px_8px_var(--color-shadow)] flex items-start gap-3 cursor-pointer transition-colors
        ${n.read ? "bg-bg-card" : "bg-accent/5 border border-accent/10"}`}
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl ${config.bg} ${config.color} flex items-center justify-center shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-sm font-bold ${n.read ? "text-fg-secondary" : "text-fg"}`}>
            {n.title}
          </p>
          {!n.read && (
            <span className="w-2 h-2 rounded-full bg-accent shrink-0 mt-1.5" />
          )}
        </div>
        <p className="text-xs text-fg-secondary mt-1 leading-relaxed">{n.message}</p>
        <p className="text-[11px] text-fg-light mt-2">{n.time}</p>
      </div>

      {/* Dismiss button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDismiss();
        }}
        className="w-7 h-7 rounded-lg flex items-center justify-center text-fg-light hover:text-red hover:bg-red-light transition-colors shrink-0"
        aria-label="حذف التنبيه"
      >
        <IconX className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}
