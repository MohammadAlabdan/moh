import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Welcome from "@/sections/Welcome";
import GoalSelect from "@/sections/GoalSelection";
import BodyData from "@/sections/BodyData";
import Results from "@/sections/Results";
import Dashboard from "@/sections/Dashboard";
import AddMeal from "@/sections/AddMeal";
import SettingsPage from "@/sections/SettingsPage";
import WaterPage from "@/sections/WaterPage";
import WeightPage from "@/sections/WeightPage";
import ReportsPage from "@/sections/ReportsPage";
import AiAssistantPage from "@/sections/AiAssistantPage";
import SubscriptionsPage from "@/sections/SubscriptionsPage";
import NotificationsPage from "@/sections/NotificationsPage";
import MealHistoryPage from "@/sections/MealHistoryPage";
import FixMealPage from "@/sections/FixMealPage";
import AdminPage from "@/sections/AdminPage";
import PrivacyPage from "@/sections/PrivacyPage";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/onboarding/goal" element={<GoalSelect />} />
          <Route path="/onboarding/body-data" element={<BodyData />} />
          <Route path="/onboarding/results" element={<Results />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-meal" element={<AddMeal />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/water" element={<WaterPage />} />
          <Route path="/weight" element={<WeightPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/ai-assistant" element={<AiAssistantPage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/meal-history" element={<MealHistoryPage />} />
          <Route path="/fix-meal" element={<FixMealPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
