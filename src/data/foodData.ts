export interface FoodItem {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  source?: string;
}

export interface FoodCategory {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  count: number;
  icon: string;
}

export const foodCategories: FoodCategory[] = [
  { id: "protein", name: "بروتين", color: "var(--color-red)", bgColor: "var(--color-red-light)", count: 14, icon: "🥩" },
  { id: "carbs", name: "كربوهيدرات", color: "var(--color-orange)", bgColor: "var(--color-orange-light)", count: 12, icon: "🍚" },
  { id: "vegs", name: "خضار وفواكه", color: "var(--color-green)", bgColor: "var(--color-green-light)", count: 12, icon: "🥗" },
  { id: "drinks", name: "مشروبات", color: "var(--color-blue)", bgColor: "var(--color-blue-light)", count: 10, icon: "🥤" },
  { id: "fast", name: "وجبات سريعة", color: "var(--color-accent)", bgColor: "var(--color-orange-light)", count: 12, icon: "🍔" },
  { id: "local", name: "أكلات محلية", color: "var(--color-purple)", bgColor: "#F3E5F5", count: 10, icon: "🍲" },
  { id: "healthy", name: "أكل صحي", color: "var(--color-green)", bgColor: "var(--color-green-light)", count: 8, icon: "🥑" },
  { id: "desserts", name: "حلويات", color: "#E88B8B", bgColor: "var(--color-red-light)", count: 8, icon: "🍰" },
  { id: "snacks", name: "سناكات", color: "var(--color-orange)", bgColor: "var(--color-orange-light)", count: 8, icon: "🥜" },
];

const proteinFoods: FoodItem[] = [
  { id: "p1", name: "صدر دجاج مشوي", category: "protein", calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: "100 غرام", source: "USDA" },
  { id: "p2", name: "بيض مسلوق", category: "protein", calories: 78, protein: 6, carbs: 0.6, fat: 5, servingSize: "بيضة واحدة", source: "USDA" },
  { id: "p3", name: "تونا معلبة", category: "protein", calories: 116, protein: 26, carbs: 0, fat: 1, servingSize: "100 غرام", source: "USDA" },
  { id: "p4", name: "سمك مشوي", category: "protein", calories: 140, protein: 26, carbs: 0, fat: 3, servingSize: "100 غرام", source: "USDA" },
  { id: "p5", name: "فول مدمس", category: "protein", calories: 110, protein: 8, carbs: 15, fat: 2, servingSize: "100 غرام", fiber: 5, source: "محلي" },
  { id: "p6", name: "عدس مطبوخ", category: "protein", calories: 116, protein: 9, carbs: 20, fat: 0.4, servingSize: "100 غرام", fiber: 8, source: "USDA" },
  { id: "p7", name: "لحم بقر مفروم", category: "protein", calories: 250, protein: 26, carbs: 0, fat: 15, servingSize: "100 غرام", source: "USDA" },
  { id: "p8", name: "زبادي يوناني", category: "protein", calories: 100, protein: 17, carbs: 6, fat: 0.7, servingSize: "170 غرام", source: "USDA" },
  { id: "p9", name: "جبن قريش", category: "protein", calories: 98, protein: 11, carbs: 3.4, fat: 4.3, servingSize: "100 غرام", source: "USDA" },
  { id: "p10", name: "روبيان مشوي", category: "protein", calories: 99, protein: 24, carbs: 0, fat: 0.3, servingSize: "100 غرام", source: "USDA" },
  { id: "p11", name: "صدر ديك رومي", category: "protein", calories: 135, protein: 30, carbs: 0, fat: 1, servingSize: "100 غرام", source: "USDA" },
  { id: "p12", name: "فخذ دجاج بدون جلد", category: "protein", calories: 209, protein: 26, carbs: 0, fat: 10.9, servingSize: "100 غرام", source: "USDA" },
  { id: "p13", name: "حمص مسلوق", category: "protein", calories: 164, protein: 9, carbs: 27, fat: 2.6, servingSize: "100 غرام", fiber: 8, source: "USDA" },
  { id: "p14", name: "بروتين واي (سكوب)", category: "protein", calories: 120, protein: 24, carbs: 3, fat: 1.5, servingSize: "30 غرام", source: "عام" },
];

const carbsFoods: FoodItem[] = [
  { id: "c1", name: "رز أبيض مطبوخ", category: "carbs", calories: 130, protein: 2.7, carbs: 28, fat: 0.3, servingSize: "100 غرام", source: "USDA" },
  { id: "c2", name: "أرز بسمتي", category: "carbs", calories: 150, protein: 3, carbs: 32, fat: 0.5, servingSize: "100 غرام", source: "USDA" },
  { id: "c3", name: "خبز بر", category: "carbs", calories: 70, protein: 3, carbs: 13, fat: 1, servingSize: "شريحة", fiber: 2, source: "عام" },
  { id: "c4", name: "خبز أبيض", category: "carbs", calories: 79, protein: 2.7, carbs: 15, fat: 1, servingSize: "شريحة", source: "USDA" },
  { id: "c5", name: "تمر", category: "carbs", calories: 20, protein: 0.2, carbs: 5, fat: 0, servingSize: "حبة واحدة", sugar: 4, source: "USDA" },
  { id: "c6", name: "شوفان", category: "carbs", calories: 150, protein: 5, carbs: 27, fat: 3, servingSize: "نصف كوب", fiber: 4, source: "USDA" },
  { id: "c7", name: "بطاطس مسلوقة", category: "carbs", calories: 87, protein: 2, carbs: 20, fat: 0.1, servingSize: "100 غرام", source: "USDA" },
  { id: "c8", name: "مكرونة مطبوخة", category: "carbs", calories: 131, protein: 5, carbs: 25, fat: 1.1, servingSize: "100 غرام", source: "USDA" },
  { id: "c9", name: "خبز صامولي", category: "carbs", calories: 150, protein: 5, carbs: 28, fat: 2, servingSize: "حبة", source: "محلي" },
  { id: "c10", name: "بطاطا حلوة مشوية", category: "carbs", calories: 90, protein: 2, carbs: 21, fat: 0.1, servingSize: "100 غرام", fiber: 3, source: "USDA" },
  { id: "c11", name: "كينوا مطبوخة", category: "carbs", calories: 120, protein: 4.4, carbs: 21, fat: 1.9, servingSize: "100 غرام", fiber: 3, source: "USDA" },
  { id: "c12", name: "رقاق (مرقوق)", category: "carbs", calories: 85, protein: 2.5, carbs: 17, fat: 0.8, servingSize: "قطعة", source: "محلي" },
];

const vegsFoods: FoodItem[] = [
  { id: "v1", name: "سلطة خضار", category: "vegs", calories: 45, protein: 2, carbs: 8, fat: 0.5, servingSize: "150 غرام", fiber: 3, source: "عام" },
  { id: "v2", name: "موز", category: "vegs", calories: 89, protein: 1.1, carbs: 23, fat: 0.3, servingSize: "حبة متوسطة", source: "USDA" },
  { id: "v3", name: "تفاح", category: "vegs", calories: 52, protein: 0.3, carbs: 14, fat: 0.2, servingSize: "حبة متوسطة", fiber: 2.4, source: "USDA" },
  { id: "v4", name: "بروكلي مطبوخ", category: "vegs", calories: 35, protein: 2.4, carbs: 7, fat: 0.4, servingSize: "100 غرام", fiber: 3.3, source: "USDA" },
  { id: "v5", name: "خيار", category: "vegs", calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, servingSize: "حبة", source: "USDA" },
  { id: "v6", name: "طماطم", category: "vegs", calories: 22, protein: 1.1, carbs: 4.8, fat: 0.2, servingSize: "حبة", source: "USDA" },
  { id: "v7", name: "أفوكادو", category: "vegs", calories: 160, protein: 2, carbs: 9, fat: 15, servingSize: "نصف حبة", fiber: 7, source: "USDA" },
  { id: "v8", name: "فراولة", category: "vegs", calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, servingSize: "100 غرام", source: "USDA" },
  { id: "v9", name: "برتقال", category: "vegs", calories: 47, protein: 0.9, carbs: 12, fat: 0.1, servingSize: "حبة متوسطة", fiber: 2.4, source: "USDA" },
  { id: "v10", name: "سبانخ مطبوخة", category: "vegs", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.3, servingSize: "100 غرام", fiber: 2.2, source: "USDA" },
  { id: "v11", name: "تمر هندي", category: "vegs", calories: 56, protein: 0.6, carbs: 14, fat: 0, servingSize: "كوب صغير", source: "محلي" },
  { id: "v12", name: "عنب", category: "vegs", calories: 69, protein: 0.7, carbs: 18, fat: 0.2, servingSize: "100 غرام", source: "USDA" },
];

const drinksFoods: FoodItem[] = [
  { id: "d1", name: "حليب قليل الدسم", category: "drinks", calories: 102, protein: 8, carbs: 12, fat: 2.4, servingSize: "كوب", source: "USDA" },
  { id: "d2", name: "عصير برتقال طبيعي", category: "drinks", calories: 112, protein: 1.7, carbs: 26, fat: 0.5, servingSize: "كوب", sugar: 21, source: "USDA" },
  { id: "d3", name: "لبن", category: "drinks", calories: 62, protein: 3.4, carbs: 4.7, fat: 3.3, servingSize: "كوب", source: "USDA" },
  { id: "d4", name: "قهوة سوداء", category: "drinks", calories: 2, protein: 0.3, carbs: 0, fat: 0, servingSize: "كوب", source: "USDA" },
  { id: "d5", name: "قهوة بالحليب (لاتيه)", category: "drinks", calories: 190, protein: 10, carbs: 18, fat: 7, servingSize: "كوب كبير", source: "عام" },
  { id: "d6", name: "شاي بدون سكر", category: "drinks", calories: 2, protein: 0, carbs: 0.5, fat: 0, servingSize: "كوب", source: "عام" },
  { id: "d7", name: "عصير تفاح", category: "drinks", calories: 117, protein: 0.3, carbs: 28, fat: 0.3, servingSize: "كوب", sugar: 24, source: "USDA" },
  { id: "d8", name: "سموذي بروتين", category: "drinks", calories: 250, protein: 25, carbs: 30, fat: 5, servingSize: "كوب كبير", source: "عام" },
  { id: "d9", name: "ماء جوز الهند", category: "drinks", calories: 46, protein: 1.7, carbs: 9, fat: 0.5, servingSize: "كوب", source: "USDA" },
  { id: "d10", name: "مشروب غازي (كولا)", category: "drinks", calories: 140, protein: 0, carbs: 39, fat: 0, servingSize: "علبة", sugar: 39, source: "عام" },
];

const fastFoods: FoodItem[] = [
  { id: "ff1", name: "شاورما دجاج", category: "fast", calories: 350, protein: 22, carbs: 30, fat: 15, servingSize: "ساندويتش", source: "محلي" },
  { id: "ff2", name: "شاورما لحم", category: "fast", calories: 450, protein: 25, carbs: 32, fat: 22, servingSize: "ساندويتش", source: "محلي" },
  { id: "ff3", name: "برجر لحم", category: "fast", calories: 540, protein: 28, carbs: 40, fat: 28, servingSize: "ساندويتش", source: "عام" },
  { id: "ff4", name: "بيتزا مارغريتا", category: "fast", calories: 266, protein: 11, carbs: 33, fat: 10, servingSize: "شريحتين", source: "عام" },
  { id: "ff5", name: "فلافل ساندويتش", category: "fast", calories: 330, protein: 13, carbs: 42, fat: 14, servingSize: "ساندويتش", source: "محلي" },
  { id: "ff6", name: "بروستد دجاج (قطعتين)", category: "fast", calories: 430, protein: 32, carbs: 18, fat: 26, servingSize: "قطعتين", source: "محلي" },
  { id: "ff7", name: "ناجتس دجاج (6 قطع)", category: "fast", calories: 280, protein: 14, carbs: 18, fat: 17, servingSize: "6 قطع", source: "عام" },
  { id: "ff8", name: "بطاطس مقلية (وسط)", category: "fast", calories: 340, protein: 4, carbs: 44, fat: 16, servingSize: "حصة وسط", source: "عام" },
  { id: "ff9", name: "كريب دجاج", category: "fast", calories: 380, protein: 20, carbs: 35, fat: 18, servingSize: "حبة", source: "محلي" },
  { id: "ff10", name: "هوت دوج", category: "fast", calories: 290, protein: 11, carbs: 24, fat: 17, servingSize: "حبة", source: "عام" },
  { id: "ff11", name: "سمبوسة لحم (3 حبات)", category: "fast", calories: 240, protein: 10, carbs: 22, fat: 12, servingSize: "3 حبات", source: "محلي" },
  { id: "ff12", name: "معصوب", category: "fast", calories: 380, protein: 8, carbs: 52, fat: 16, servingSize: "طبق صغير", source: "محلي" },
];

const localFoods: FoodItem[] = [
  { id: "l1", name: "كبسة دجاج", category: "local", calories: 420, protein: 28, carbs: 45, fat: 14, servingSize: "طبق", source: "محلي" },
  { id: "l2", name: "كبسة لحم", category: "local", calories: 520, protein: 32, carbs: 48, fat: 20, servingSize: "طبق", source: "محلي" },
  { id: "l3", name: "مندي دجاج", category: "local", calories: 450, protein: 30, carbs: 42, fat: 16, servingSize: "طبق", source: "محلي" },
  { id: "l4", name: "مظبي لحم", category: "local", calories: 500, protein: 35, carbs: 40, fat: 22, servingSize: "طبق", source: "محلي" },
  { id: "l5", name: "جريش", category: "local", calories: 280, protein: 12, carbs: 38, fat: 8, servingSize: "طبق", source: "محلي" },
  { id: "l6", name: "مرقوق (خضار ولحم)", category: "local", calories: 350, protein: 20, carbs: 35, fat: 14, servingSize: "طبق", source: "محلي" },
  { id: "l7", name: "سليق", category: "local", calories: 380, protein: 22, carbs: 42, fat: 12, servingSize: "طبق", source: "محلي" },
  { id: "l8", name: "مطبق بالجبن", category: "local", calories: 320, protein: 12, carbs: 35, fat: 14, servingSize: "حبة", source: "محلي" },
  { id: "l9", name: "حنيني", category: "local", calories: 350, protein: 6, carbs: 55, fat: 12, servingSize: "طبق صغير", source: "محلي" },
  { id: "l10", name: "عريكة", category: "local", calories: 400, protein: 7, carbs: 58, fat: 16, servingSize: "طبق صغير", source: "محلي" },
];

const healthyFoods: FoodItem[] = [
  { id: "h1", name: "سلطة سيزر بالدجاج", category: "healthy", calories: 220, protein: 25, carbs: 8, fat: 10, servingSize: "طبق", source: "عام" },
  { id: "h2", name: "بول أكاي", category: "healthy", calories: 290, protein: 5, carbs: 50, fat: 8, servingSize: "طبق", source: "عام" },
  { id: "h3", name: "شوربة عدس", category: "healthy", calories: 180, protein: 12, carbs: 28, fat: 2, servingSize: "طبق", fiber: 8, source: "محلي" },
  { id: "h4", name: "دجاج تكا مع خضار", category: "healthy", calories: 240, protein: 30, carbs: 10, fat: 9, servingSize: "طبق", source: "عام" },
  { id: "h5", name: "سلطة كينوا", category: "healthy", calories: 180, protein: 8, carbs: 25, fat: 5, servingSize: "طبق", fiber: 4, source: "عام" },
  { id: "h6", name: "راب دجاج صحي", category: "healthy", calories: 280, protein: 28, carbs: 22, fat: 8, servingSize: "حبة", source: "عام" },
  { id: "h7", name: "بان كيك بروتين", category: "healthy", calories: 200, protein: 20, carbs: 18, fat: 5, servingSize: "قطعتين", source: "عام" },
  { id: "h8", name: "بيض مخفوق بالخضار", category: "healthy", calories: 180, protein: 14, carbs: 5, fat: 12, servingSize: "طبق", source: "عام" },
];

const dessertsFoods: FoodItem[] = [
  { id: "ds1", name: "كنافة", category: "desserts", calories: 350, protein: 8, carbs: 42, fat: 18, servingSize: "قطعة", sugar: 28, source: "محلي" },
  { id: "ds2", name: "بسبوسة", category: "desserts", calories: 280, protein: 4, carbs: 40, fat: 12, servingSize: "قطعة", sugar: 25, source: "محلي" },
  { id: "ds3", name: "آيس كريم فانيلا", category: "desserts", calories: 207, protein: 3.5, carbs: 24, fat: 11, servingSize: "100 غرام", sugar: 21, source: "USDA" },
  { id: "ds4", name: "كيك شوكولاتة", category: "desserts", calories: 370, protein: 5, carbs: 50, fat: 17, servingSize: "قطعة", sugar: 35, source: "عام" },
  { id: "ds5", name: "لقيمات", category: "desserts", calories: 250, protein: 3, carbs: 35, fat: 11, servingSize: "8 حبات", sugar: 18, source: "محلي" },
  { id: "ds6", name: "تشيز كيك", category: "desserts", calories: 320, protein: 6, carbs: 26, fat: 22, servingSize: "قطعة", sugar: 20, source: "عام" },
  { id: "ds7", name: "كريم كراميل", category: "desserts", calories: 180, protein: 4, carbs: 28, fat: 6, servingSize: "حبة", sugar: 22, source: "عام" },
  { id: "ds8", name: "شوكولاتة داكنة (85%)", category: "desserts", calories: 170, protein: 3, carbs: 13, fat: 12, servingSize: "30 غرام", source: "USDA" },
];

const snacksFoods: FoodItem[] = [
  { id: "sn1", name: "لوز (حفنة)", category: "snacks", calories: 164, protein: 6, carbs: 6, fat: 14, servingSize: "28 غرام", fiber: 3.5, source: "USDA" },
  { id: "sn2", name: "زبدة فول سوداني", category: "snacks", calories: 94, protein: 4, carbs: 3, fat: 8, servingSize: "ملعقة كبيرة", source: "USDA" },
  { id: "sn3", name: "بسكويت دايجستف", category: "snacks", calories: 72, protein: 1, carbs: 11, fat: 3, servingSize: "حبة", source: "عام" },
  { id: "sn4", name: "فشار (بدون زبدة)", category: "snacks", calories: 93, protein: 3, carbs: 19, fat: 1, servingSize: "3 أكواب", fiber: 3.5, source: "USDA" },
  { id: "sn5", name: "جرانولا بار", category: "snacks", calories: 190, protein: 4, carbs: 28, fat: 7, servingSize: "حبة", source: "عام" },
  { id: "sn6", name: "كاجو (حفنة)", category: "snacks", calories: 157, protein: 5, carbs: 9, fat: 12, servingSize: "28 غرام", source: "USDA" },
  { id: "sn7", name: "رايس كيك", category: "snacks", calories: 35, protein: 0.7, carbs: 7, fat: 0.3, servingSize: "حبة", source: "USDA" },
  { id: "sn8", name: "تمر محشي لوز", category: "snacks", calories: 80, protein: 1.5, carbs: 14, fat: 2.5, servingSize: "حبتين", source: "محلي" },
];

export const allFoods: FoodItem[] = [
  ...proteinFoods,
  ...carbsFoods,
  ...vegsFoods,
  ...drinksFoods,
  ...fastFoods,
  ...localFoods,
  ...healthyFoods,
  ...dessertsFoods,
  ...snacksFoods,
];

export const mostUsedFoods: FoodItem[] = [
  proteinFoods[0], proteinFoods[7], proteinFoods[1],
  carbsFoods[0], carbsFoods[5], vegsFoods[0],
  proteinFoods[4], drinksFoods[0],
];

export function getFoodsByCategory(categoryId: string): FoodItem[] {
  return allFoods.filter((f) => f.category === categoryId);
}

export function searchFoods(query: string): FoodItem[] {
  if (!query.trim()) return [];
  return allFoods.filter((f) => f.name.includes(query.trim()));
}
