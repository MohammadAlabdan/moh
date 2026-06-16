export interface DailyData {
  date: string;
  userName: string;
  caloriesBudget: number;
  caloriesConsumed: number;
  protein: { consumed: number; target: number };
  carbs: { consumed: number; target: number };
  fat: { consumed: number; target: number };
  waterGlasses: number;
  waterTarget: number;
  currentWeight: number;
  targetWeight: number;
  meals: Meal[];
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export const sampleDailyData: DailyData = {
  date: "الاثنين، ١٦ يونيو ٢٠٢٥",
  userName: "أحمد",
  caloriesBudget: 2200,
  caloriesConsumed: 1480,
  protein: { consumed: 85, target: 165 },
  carbs: { consumed: 140, target: 248 },
  fat: { consumed: 42, target: 73 },
  waterGlasses: 5,
  waterTarget: 8,
  currentWeight: 82.5,
  targetWeight: 75,
  meals: [
    {
      id: "1",
      name: "فول مدمس مع خبز بر",
      time: "٧:٣٠ ص",
      calories: 380,
      protein: 18,
      carbs: 45,
      fat: 12,
    },
    {
      id: "2",
      name: "صدر دجاج مشوي مع رز",
      time: "١:٠٠ م",
      calories: 620,
      protein: 45,
      carbs: 65,
      fat: 18,
    },
    {
      id: "3",
      name: "زبادي يوناني مع فواكه",
      time: "٤:٣٠ م",
      calories: 220,
      protein: 15,
      carbs: 22,
      fat: 8,
    },
    {
      id: "4",
      name: "سلطة خضار مع تونا",
      time: "٧:٠٠ م",
      calories: 260,
      protein: 7,
      carbs: 8,
      fat: 4,
    },
  ],
};
