import { Ingredient } from './types';

// Profils de saveur pour chaque ingrédient
export const flavorProfiles: Record<string, { sweet: number; sour: number; bitter: number; umami: number }> = {
  'pomme': { sweet: 7, sour: 3, bitter: 0, umami: 0 },
  'banane': { sweet: 9, sour: 0, bitter: 0, umami: 0 },
  'fraise': { sweet: 8, sour: 2, bitter: 0, umami: 0 },
  'myrtille': { sweet: 6, sour: 3, bitter: 1, umami: 0 },
  'framboise': { sweet: 7, sour: 4, bitter: 0, umami: 0 },
  'orange': { sweet: 7, sour: 6, bitter: 1, umami: 0 },
  'citron': { sweet: 1, sour: 10, bitter: 2, umami: 0 },
  'ananas': { sweet: 8, sour: 5, bitter: 0, umami: 0 },
  'mangue': { sweet: 9, sour: 2, bitter: 0, umami: 0 },
  'kiwi': { sweet: 6, sour: 7, bitter: 0, umami: 0 },
  'pasteque': { sweet: 7, sour: 1, bitter: 0, umami: 0 },
  'melon': { sweet: 8, sour: 1, bitter: 0, umami: 0 },
  'poire': { sweet: 8, sour: 2, bitter: 0, umami: 0 },
  'peche': { sweet: 8, sour: 2, bitter: 0, umami: 0 },
  'passion': { sweet: 7, sour: 6, bitter: 0, umami: 0 },
  'carotte': { sweet: 5, sour: 1, bitter: 0, umami: 2 },
  'betterave': { sweet: 6, sour: 0, bitter: 1, umami: 3 },
  'concombre': { sweet: 2, sour: 1, bitter: 1, umami: 1 },
  'celeri': { sweet: 1, sour: 1, bitter: 3, umami: 4 },
  'epinard': { sweet: 1, sour: 1, bitter: 4, umami: 3 },
  'chou-kale': { sweet: 1, sour: 1, bitter: 5, umami: 2 },
  'gingembre': { sweet: 0, sour: 1, bitter: 3, umami: 2 },
  'curcuma': { sweet: 0, sour: 0, bitter: 4, umami: 3 },
  'menthe': { sweet: 1, sour: 0, bitter: 2, umami: 0 },
  'basilic': { sweet: 1, sour: 0, bitter: 2, umami: 1 },
  'spiruline': { sweet: 0, sour: 0, bitter: 5, umami: 4 },
  'chia': { sweet: 1, sour: 0, bitter: 0, umami: 1 },
  'lin': { sweet: 1, sour: 0, bitter: 1, umami: 1 },
  'maca': { sweet: 2, sour: 0, bitter: 2, umami: 2 },
  'acai': { sweet: 5, sour: 3, bitter: 1, umami: 0 },
  'matcha': { sweet: 1, sour: 0, bitter: 4, umami: 3 },
  'cayenne': { sweet: 0, sour: 0, bitter: 5, umami: 1 },
  'cannelle': { sweet: 3, sour: 0, bitter: 1, umami: 0 },
  'cardamome': { sweet: 2, sour: 0, bitter: 2, umami: 1 },
};

// Données nutritionnelles enrichies (pour 100g)
export const nutritionData: Record<string, {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  vitamins: { name: string; amount: number; unit: string }[];
  minerals: { name: string; amount: number; unit: string }[];
  benefits: string[];
}> = {
  'pomme': {
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    fiber: 2.4,
    vitamins: [
      { name: 'Vitamine C', amount: 4.6, unit: 'mg' },
      { name: 'Vitamine K', amount: 2.2, unit: 'µg' },
    ],
    minerals: [
      { name: 'Potassium', amount: 107, unit: 'mg' },
      { name: 'Calcium', amount: 6, unit: 'mg' },
    ],
    benefits: ['Riche en fibres', 'Antioxydants', 'Digestion'],
  },
  'banane': {
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    fiber: 2.6,
    vitamins: [
      { name: 'Vitamine B6', amount: 0.4, unit: 'mg' },
      { name: 'Vitamine C', amount: 8.7, unit: 'mg' },
    ],
    minerals: [
      { name: 'Potassium', amount: 358, unit: 'mg' },
      { name: 'Magnésium', amount: 27, unit: 'mg' },
    ],
    benefits: ['Énergie rapide', 'Potassium', 'Satiété'],
  },
  'fraise': {
    calories: 32,
    protein: 0.7,
    carbs: 7.7,
    fat: 0.3,
    fiber: 2,
    vitamins: [
      { name: 'Vitamine C', amount: 58.8, unit: 'mg' },
      { name: 'Folate', amount: 24, unit: 'µg' },
    ],
    minerals: [
      { name: 'Potassium', amount: 153, unit: 'mg' },
      { name: 'Manganèse', amount: 0.4, unit: 'mg' },
    ],
    benefits: ['Antioxydants puissants', 'Vitamine C', 'Anti-inflammatoire'],
  },
  'myrtille': {
    calories: 57,
    protein: 0.7,
    carbs: 14,
    fat: 0.3,
    fiber: 2.4,
    vitamins: [
      { name: 'Vitamine C', amount: 9.7, unit: 'mg' },
      { name: 'Vitamine K', amount: 19.3, unit: 'µg' },
    ],
    minerals: [
      { name: 'Potassium', amount: 77, unit: 'mg' },
      { name: 'Manganèse', amount: 0.3, unit: 'mg' },
    ],
    benefits: ['Mémoire & cognition', 'Antioxydants', 'Vision'],
  },
  'orange': {
    calories: 47,
    protein: 0.9,
    carbs: 12,
    fat: 0.1,
    fiber: 2.4,
    vitamins: [
      { name: 'Vitamine C', amount: 53.2, unit: 'mg' },
      { name: 'Folate', amount: 30, unit: 'µg' },
    ],
    minerals: [
      { name: 'Potassium', amount: 181, unit: 'mg' },
      { name: 'Calcium', amount: 40, unit: 'mg' },
    ],
    benefits: ['Immunité', 'Vitamine C', 'Hydratation'],
  },
  'spiruline': {
    calories: 290,
    protein: 57,
    carbs: 24,
    fat: 8,
    fiber: 4,
    vitamins: [
      { name: 'Vitamine B12', amount: 0.3, unit: 'µg' },
      { name: 'Vitamine A', amount: 570, unit: 'µg' },
    ],
    minerals: [
      { name: 'Fer', amount: 28, unit: 'mg' },
      { name: 'Calcium', amount: 120, unit: 'mg' },
    ],
    benefits: ['Protéines complètes', 'Détox', 'Énergie'],
  },
  'gingembre': {
    calories: 80,
    protein: 1.8,
    carbs: 18,
    fat: 0.8,
    fiber: 2,
    vitamins: [
      { name: 'Vitamine C', amount: 5, unit: 'mg' },
      { name: 'Vitamine B6', amount: 0.2, unit: 'mg' },
    ],
    minerals: [
      { name: 'Potassium', amount: 415, unit: 'mg' },
      { name: 'Magnésium', amount: 43, unit: 'mg' },
    ],
    benefits: ['Anti-inflammatoire', 'Digestion', 'Nausées'],
  },
};

// Système de scoring d'harmonie des saveurs
export function calculateFlavorHarmony(ingredients: Ingredient[]): {
  score: number;
  balance: { sweet: number; sour: number; bitter: number };
  feedback: string;
  suggestions: string[];
} {
  if (ingredients.length === 0) {
    return { score: 0, balance: { sweet: 0, sour: 0, bitter: 0 }, feedback: '', suggestions: [] };
  }

  let totalSweet = 0;
  let totalSour = 0;
  let totalBitter = 0;

  ingredients.forEach(ing => {
    const profile = flavorProfiles[ing.id];
    if (profile) {
      totalSweet += profile.sweet;
      totalSour += profile.sour;
      totalBitter += profile.bitter;
    }
  });

  const total = totalSweet + totalSour + totalBitter;
  const sweetPercent = total > 0 ? (totalSweet / total) * 100 : 0;
  const sourPercent = total > 0 ? (totalSour / total) * 100 : 0;
  const bitterPercent = total > 0 ? (totalBitter / total) * 100 : 0;

  // Calcul du score d'harmonie (0-100)
  let score = 70; // Base
  let feedback = '';
  const suggestions: string[] = [];

  // Équilibre idéal : 60% sucré, 30% acide, 10% amer
  const sweetDiff = Math.abs(sweetPercent - 60);
  const sourDiff = Math.abs(sourPercent - 30);
  const bitterDiff = Math.abs(bitterPercent - 10);

  const totalDiff = sweetDiff + sourDiff + bitterDiff;
  score = Math.max(0, Math.min(100, 100 - totalDiff / 2));

  // Feedback personnalisé
  if (score >= 85) {
    feedback = '🌟 Excellent ! Harmonie parfaite des saveurs. Cette combinaison est équilibrée et délicieuse.';
  } else if (score >= 70) {
    feedback = '👍 Très bien ! Bonne harmonie des saveurs avec un bel équilibre.';
  } else if (score >= 50) {
    feedback = '⚖️ Correct. L\'équilibre peut être amélioré pour une expérience optimale.';
  } else {
    feedback = '⚠️ Attention ! Cette combinaison manque d\'équilibre.';
  }

  // Suggestions intelligentes
  if (bitterPercent > 25) {
    suggestions.push('Ajoutez des fruits sucrés (banane, mangue) pour équilibrer l\'amertume');
  }
  if (sourPercent > 45) {
    suggestions.push('Réduisez les agrumes ou ajoutez de la banane pour adoucir l\'acidité');
  }
  if (sweetPercent > 85) {
    suggestions.push('Ajoutez du citron ou du gingembre pour apporter de la fraîcheur');
  }
  if (totalBitter > 15 && totalSweet < 10) {
    suggestions.push('Les ingrédients amers dominent. Ajoutez des fruits doux pour équilibrer');
  }

  return {
    score: Math.round(score),
    balance: {
      sweet: Math.round(sweetPercent),
      sour: Math.round(sourPercent),
      bitter: Math.round(bitterPercent),
    },
    feedback,
    suggestions,
  };
}

// Génération de noms créatifs pour les créations
export function generateDrinkName(ingredients: Ingredient[]): string {
  if (ingredients.length === 0) return 'Ma Création DIY';

  const hasRed = ingredients.some(i => ['fraise', 'framboise', 'betterave'].includes(i.id));
  const hasPurple = ingredients.some(i => ['myrtille', 'acai'].includes(i.id));
  const hasGreen = ingredients.some(i => ['epinard', 'chou-kale', 'concombre', 'menthe'].includes(i.id));
  const hasOrange = ingredients.some(i => ['orange', 'carotte', 'mangue', 'peche'].includes(i.id));
  const hasYellow = ingredients.some(i => ['ananas', 'banane', 'citron'].includes(i.id));

  const hasSuperfood = ingredients.some(i => ['spiruline', 'acai', 'chia', 'maca'].includes(i.id));
  const hasSpice = ingredients.some(i => ['gingembre', 'curcuma', 'cannelle'].includes(i.id));
  const hasTropical = ingredients.some(i => ['ananas', 'mangue', 'coco'].includes(i.id));

  const names: string[] = [];

  // Noms basés sur la couleur
  if (hasPurple) names.push('Purple Power', 'Violet Velvet', 'Berry Bliss');
  if (hasGreen) names.push('Green Goddess', 'Emerald Energy', 'Detox Dream');
  if (hasOrange && hasTropical) names.push('Tropical Sunrise', 'Golden Glow', 'Sunset Paradise');
  if (hasRed) names.push('Ruby Rush', 'Crimson Crush', 'Berry Burst');
  if (hasYellow) names.push('Sunshine Splash', 'Golden Hour', 'Lemon Lift');

  // Noms basés sur les ingrédients spéciaux
  if (hasSuperfood && hasGreen) names.push('Super Green Machine', 'Power Detox', 'Vitality Boost');
  if (hasSpice) names.push('Spicy Kick', 'Ginger Zing', 'Fiery Fusion');
  if (hasTropical) names.push('Island Escape', 'Tropical Twist', 'Paradise Punch');

  // Noms génériques créatifs
  names.push('DIY Delight', 'Fresh Fusion', 'Nature\'s Nectar', 'Botanical Bliss');

  return names[Math.floor(Math.random() * names.length)];
}

// Calcul des valeurs nutritionnelles totales
export function calculateNutrition(ingredients: Ingredient[], sizeMultiplier: number = 1) {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalFiber = 0;
  const vitamins: Record<string, number> = {};
  const minerals: Record<string, number> = {};
  const allBenefits: string[] = [];

  ingredients.forEach(ing => {
    const nutrition = nutritionData[ing.id];
    if (nutrition) {
      // Estimation : 1 ingrédient = 50g en moyenne
      const amount = 50 * sizeMultiplier;
      const factor = amount / 100;

      totalCalories += nutrition.calories * factor;
      totalProtein += nutrition.protein * factor;
      totalCarbs += nutrition.carbs * factor;
      totalFat += nutrition.fat * factor;
      totalFiber += nutrition.fiber * factor;

      nutrition.vitamins.forEach(v => {
        vitamins[v.name] = (vitamins[v.name] || 0) + v.amount * factor;
      });

      nutrition.minerals.forEach(m => {
        minerals[m.name] = (minerals[m.name] || 0) + m.amount * factor;
      });

      allBenefits.push(...nutrition.benefits);
    }
  });

  // Badges de bénéfices
  const badges: { icon: string; label: string }[] = [];
  if (totalProtein > 5) badges.push({ icon: '💪', label: 'Protéiné' });
  if (allBenefits.filter(b => b.includes('Antioxydant')).length >= 2) badges.push({ icon: '🛡️', label: 'Antioxydant' });
  if (allBenefits.filter(b => b.includes('Énergie')).length >= 1) badges.push({ icon: '⚡', label: 'Énergisant' });
  if (allBenefits.filter(b => b.includes('Détox') || b.includes('Digestion')).length >= 1) badges.push({ icon: '🧘', label: 'Détox' });

  return {
    calories: Math.round(totalCalories),
    macros: {
      protein: Math.round(totalProtein * 10) / 10,
      carbs: Math.round(totalCarbs * 10) / 10,
      fat: Math.round(totalFat * 10) / 10,
      fiber: Math.round(totalFiber * 10) / 10,
    },
    vitamins: Object.entries(vitamins).map(([name, amount]) => ({
      name,
      amount: Math.round(amount * 10) / 10,
    })),
    minerals: Object.entries(minerals).map(([name, amount]) => ({
      name,
      amount: Math.round(amount * 10) / 10,
    })),
    badges,
    benefits: Array.from(new Set(allBenefits)).slice(0, 5),
  };
}
