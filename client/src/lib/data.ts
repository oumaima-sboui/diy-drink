import type { Ingredient, CoffeeItem, Size, ClassicDrink } from './types';

export const sizes: Size[] = [
 
  { id: 'medium', label: 'Moyen', multiplier: 1.3 },
  { id: 'large', label: 'Large', multiplier: 1.6 },
];

export const allergens = {
  gluten: { id: 'gluten', name: 'Gluten', icon: '🌾' },
  lactose: { id: 'lactose', name: 'Lactose', icon: '🥛' },
  nuts: { id: 'nuts', name: 'Fruits à coque', icon: '🥜' },
  soy: { id: 'soy', name: 'Soja', icon: '🫘' },
  celery: { id: 'celery', name: 'Céleri', icon: '🌿' },
  sesame: { id: 'sesame', name: 'Sésame', icon: '⚪' },
};

// Combinaisons incompatibles pour les conseils automatiques
export const incompatibleCombinations = [
  {
    ingredients: ['lait-amande', 'lait-avoine', 'lait-coco', 'lait-soja'],
    with: ['citron', 'orange', 'ananas'],
    reason: 'Les laits végétaux peuvent cailler au contact des agrumes acides',
    suggestion: 'Utilisez de l\'eau de coco comme base à la place'
  },
  {
    ingredients: ['banane'],
    with: ['gingembre'],
    reason: 'Le gingembre peut dominer le goût délicat de la banane',
    suggestion: 'Réduisez la quantité de gingembre ou choisissez la mangue'
  },
  {
    ingredients: ['betterave'],
    with: ['ananas', 'mangue'],
    reason: 'La betterave peut donner une couleur peu appétissante avec ces fruits',
    suggestion: 'Associez plutôt la betterave avec des pommes ou des carottes'
  },
];

export const ingredients: Ingredient[] = [
// PROTÉINES (smoothie only)
{ 
  id: 'whey-protein', 
  name: 'Whey Protein', 
  nameKey: 'addon.wheyProtein',
  emoji: '💪', 
  category: 'proteines', 
  price: 2.50, 
  calories: 120,
  allergens: ['dairy'],
  forJuice: false,  // ← Ajouter
  forSmoothie: true // ← Ajouter
},
{ 
  id: 'beurre-cacahuete', 
  name: 'Beurre de cacahuète', 
  nameKey: 'addon.peanutButter',
  emoji: '🥜', 
  category: 'proteines', 
  price: 2.00, 
  calories: 180,
  allergens: ['peanuts'],
  forJuice: false,
  forSmoothie: true
},
// SANTÉ & IMMUNITÉ
{ 
  id: 'shot-gingembre', 
  name: 'Shot Gingembre', 
  nameKey: 'addon.gingerShot',
  emoji: '🔥', 
  category: 'epices', 
  price: 1.50, 
  calories: 5,
  allergens: [],
  forJuice: true,
  forSmoothie: true
},
{ 
  id: 'curcuma', 
  name: 'Curcuma', 
  nameKey: 'addon.turmeric',
  emoji: '🟡', 
  category: 'epices', 
  price: 1.50, 
  calories: 10,
  allergens: [],
  forJuice: true,
  forSmoothie: true
},
{ 
  id: 'matcha', 
  name: 'Matcha', 
  nameKey: 'addon.matcha',
  emoji: '🍵', 
  category: 'superfoods', 
  price: 2.50, 
  calories: 25,
  allergens: ['caffeine'],
  forJuice: false, // ⚠️ warning pour jus
  forSmoothie: true
},
{ 
  id: 'cacao-cru', 
  name: 'Cacao cru', 
  nameKey: 'addon.rawCacao',
  emoji: '🍫', 
  category: 'superfoods', 
  price: 2.00, 
  calories: 50,
  allergens: [],
  forJuice: false,
  forSmoothie: true
},
{ 
  id: 'beurre-amande', 
  name: "Beurre d'amande", 
  nameKey: 'addon.almondButter',
  emoji: '🌰', 
  category: 'proteines', 
  price: 2.50, 
  calories: 190,
  allergens: ['nuts'],
  forJuice: false,
  forSmoothie: true
},
// SUPERFOODS
{ 
  id: 'spiruline', 
  name: 'Spiruline', 
  nameKey: 'addon.spirulina',
  emoji: '🌀', 
  category: 'superfoods', 
  price: 2.50, 
  calories: 20,
  allergens: [],
  forJuice: false, // ⚠️ warning pour jus
  forSmoothie: true
},
{ 
  id: 'graines-chia', 
  name: 'Graines de chia', 
  nameKey: 'addon.chiaSeeds',
  emoji: '🌾', 
  category: 'superfoods', 
  price: 1.50, 
  calories: 60,
  allergens: [],
  forJuice: false,
  forSmoothie: true
},
{ 
  id: 'graines-lin', 
  name: 'Graines de lin', 
  nameKey: 'addon.flaxSeeds',
  emoji: '🌾', 
  category: 'superfoods', 
  price: 1.50, 
  calories: 55,
  allergens: [],
  forJuice: false,
  forSmoothie: true
},
{ 
  id: 'maca', 
  name: 'Maca', 
  nameKey: 'addon.maca',
  emoji: '🍠', 
  category: 'superfoods', 
  price: 2.00, 
  calories: 20,
  allergens: [],
  forJuice: false, // ⚠️ warning pour jus
  forSmoothie: true
},
// SANTÉ & IMMUNITÉ
{ 
  id: 'shot-gingembre', 
  name: 'Shot Gingembre', 
  nameKey: 'addon.gingerShot',
  emoji: '🔥', 
  category: 'epices', 
  price: 1.50, 
  calories: 5,
  allergens: [],
  forJuice: true,
  forSmoothie: true
},
{ 
  id: 'curcuma', 
  name: 'Curcuma', 
  nameKey: 'addon.turmeric',
  emoji: '🟡', 
  category: 'epices', 
  price: 1.50, 
  calories: 10,
  allergens: [],
  forJuice: true,
  forSmoothie: true
},
{ 
  id: 'matcha', 
  name: 'Matcha', 
  nameKey: 'addon.matcha',
  emoji: '🍵', 
  category: 'superfoods', 
  price: 2.50, 
  calories: 25,
  allergens: ['caffeine'],
  forJuice: false, // ⚠️ warning pour jus
  forSmoothie: true
},
{ 
  id: 'cacao-cru', 
  name: 'Cacao cru', 
  nameKey: 'addon.rawCacao',
  emoji: '🍫', 
  category: 'superfoods', 
  price: 2.00, 
  calories: 50,
  allergens: [],
  forJuice: false,
  forSmoothie: true
},
  // Fruits
  { 
    id: 'pomme', 
    name: 'Pomme',
    nameKey: 'ingredient.pomme',
    emoji: '🍎', 
    category: 'fruits', 
    price: 0.55, 
    calories: 52, 
    allergens: [],
    baristaAdvice: 'La pomme adoucit et équilibre les saveurs' 
  },

  { 
    id: 'orange', 
    name: 'Orange',
    nameKey: 'ingredient.orange',
    emoji: '🍊', 
    category: 'fruits', 
    price: 0.65, 
    calories: 47, 
    allergens: [],
    baristaAdvice: 'Parfaite pour une touche acidulée' 
  },
  { 
    id: 'banane', 
    name: 'Banane',
    nameKey: 'ingredient.banane',
    emoji: '🍌', 
    category: 'fruits', 
    price: 0.45, 
    calories: 89, 
    allergens: [],
    baristaAdvice: 'Donne une texture crémeuse aux smoothies' 
  },
  { 
    id: 'fraise', 
    name: 'Fraise',
    nameKey: 'ingredient.fraise',
    emoji: '🍓', 
    category: 'fruits', 
    price: 0.85, 
    calories: 32, 
    allergens: [],
    baristaAdvice: 'Fraîcheur et douceur garanties' 
  },
  { 
  id: 'myrtille', 
  name: 'Myrtille', 
  nameKey: 'ingredient.myrtille',
  emoji: '🍇', 
  category: 'fruits', 
  price: 0.80, 
  calories: 57,
  allergens: []
},
  { 
    id: 'ananas', 
    name: 'Ananas',
    nameKey: 'ingredient.ananas',
    emoji: '🍍', 
    category: 'fruits', 
    price: 0.75, 
    calories: 50, 
    allergens: [],
    baristaAdvice: 'Apporte une touche tropicale' 
  },
  { 
    id: 'mangue', 
    name: 'Mangue',
    nameKey: 'ingredient.mangue',
    emoji: '🥭', 
    category: 'fruits', 
    price: 0.95, 
    calories: 60, 
    allergens: [],
    baristaAdvice: 'Onctuosité et saveur exotique' 
  },
  { 
    id: 'kiwi', 
    name: 'Kiwi',
    nameKey: 'ingredient.kiwi',
    emoji: '🥝', 
    category: 'fruits', 
    price: 0.65, 
    calories: 61, 
    allergens: [],
    baristaAdvice: 'Vitamine C et fraîcheur' 
  },
  { 
    id: 'peche', 
    name: 'Pêche',
    nameKey: 'ingredient.peche',
    emoji: '🍑', 
    category: 'fruits', 
    price: 0.80, 
    calories: 39, 
    allergens: [],
    baristaAdvice: 'Douceur et parfum délicat' 
  },
  { 
    id: 'pasteque', 
    name: 'Pastèque',
    nameKey: 'ingredient.pasteque',
    emoji: '🍉', 
    category: 'fruits', 
    price: 0.35, 
    calories: 30, 
    allergens: [],
    baristaAdvice: 'Ultra hydratante et légère' 
  },
  { 
    id: 'passion', 
    name: 'Fruit de la passion',
    nameKey: 'ingredient.passion',
    emoji: '🟣', 
    category: 'fruits', 
    price: 1.40, 
    calories: 97, 
    allergens: [],
    baristaAdvice: 'Saveur intense et exotique' 
  },

 
 
 

  // Superfoods
  { 
    id: 'spiruline', 
    name: 'Spiruline',
    nameKey: 'ingredient.spiruline',
    emoji: '💚', 
    category: 'superfoods', 
    price: 0.80, 
    calories: 20, 
    allergens: [],
    baristaAdvice: 'Protéines et énergie naturelle' 
  },
  { 
    id: 'chia', 
    name: 'Graines de chia',
    nameKey: 'ingredient.chia',
    emoji: '⚫', 
    category: 'superfoods', 
    price: 0.85, 
    calories: 58, 
    allergens: [],
    baristaAdvice: 'Épaissit et apporte des oméga-3' 
  },
  { 
    id: 'lin', 
    name: 'Graines de lin',
    nameKey: 'ingredient.lin',
    emoji: '🟤', 
    category: 'superfoods', 
    price: 0.75, 
    calories: 55, 
    allergens: [],
    baristaAdvice: 'Fibres et texture' 
  },
  { 
    id: 'maca', 
    name: 'Poudre de maca',
    nameKey: 'ingredient.maca',
    emoji: '🟡', 
    category: 'superfoods', 
    price: 1.25, 
    calories: 45, 
    allergens: [],
    baristaAdvice: 'Énergie et endurance' 
  },
  { 
    id: 'acai', 
    name: 'Poudre d\'açaï',
    nameKey: 'ingredient.acai',
    emoji: '🟣', 
    category: 'superfoods', 
    price: 1.40, 
    calories: 70, 
    allergens: [],
    baristaAdvice: 'Antioxydants puissants' 
  },
 

  // Herbes & Épices
  { 
    id: 'citron', 
    name: 'Citron',
    nameKey: 'ingredient.citron',
    emoji: '🍋', 
    category: 'herbes', 
    price: 0.30, 
    calories: 17, 
    allergens: [],
    baristaAdvice: 'Boost de vitamine C' 
  },
 
  { 
    id: 'curcuma', 
    name: 'Curcuma',
    nameKey: 'ingredient.curcuma',
    emoji: '🟡', 
    category: 'epices', 
    price: 0.35, 
    calories: 8, 
    allergens: [],
    baristaAdvice: 'Anti-inflammatoire puissant, parfait pour les golden lattes' 
  },

  { 
    id: 'cannelle', 
    name: 'Cannelle',
    nameKey: 'ingredient.cannelle',
    emoji: '🍫', 
    category: 'epices', 
    price: 0.35, 
    calories: 6, 
    allergens: [],
    baristaAdvice: 'Douceur épicée, régule la glycémie' 
  },
  
  { 
    id: 'menthe', 
    name: 'Menthe',
    nameKey: 'ingredient.menthe',
    emoji: '🌿', 
    category: 'herbes', 
    price: 0.35, 
    calories: 2, 
    allergens: [],
    baristaAdvice: 'Fraîcheur et digestion' 
  },

  // Protéines
  { 
    id: 'whey', 
    name: 'Whey naturelle',
    nameKey: 'ingredient.whey',
    emoji: '💪', 
    category: 'proteines', 
    price: 1.40, 
    calories: 120, 
    allergens: ['lactose'],
    baristaAdvice: 'Idéal post-workout' 
  },
  { 
    id: 'proteine-vegan', 
    name: 'Protéine végétale',
    nameKey: 'ingredient.proteine-vegan',
    emoji: '🌱', 
    category: 'proteines', 
    price: 1.50, 
    calories: 110, 
    allergens: ['soy'],
    baristaAdvice: 'Alternative végétale complète' 
  },
  { 
    id: 'yaourt-grec', 
    name: 'Yaourt grec',
    nameKey: 'ingredient.yaourt-grec',
    emoji: '🥛', 
    category: 'proteines', 
    price: 0.80, 
    calories: 100, 
    allergens: ['lactose'],
    baristaAdvice: 'Crémeux et protéiné' 
  },
  { 
    id: 'beurre-cacahuetes', 
    name: 'Beurre de cacahuètes',
    nameKey: 'ingredient.beurre-cacahuetes',
    emoji: '🥜', 
    category: 'proteines', 
    price: 0.75, 
    calories: 95, 
    allergens: ['nuts'],
    baristaAdvice: 'Se marie bien avec la banane' 
  },

  // Bases liquides
  { 
    id: 'lait-amande', 
    name: 'Lait d\'amande',
    nameKey: 'ingredient.lait-amande',
    emoji: '🥛', 
    category: 'bases', 
    price: 0.35, 
    calories: 30, 
    allergens: ['nuts'],
    baristaAdvice: 'Léger et légèrement sucré' 
  },
   { 
    id: 'Lait-entier', 
    name: 'Lait',
    nameKey: 'ingredient.Lait',
    emoji: '🥛', 
    category: 'base', 
    price: 0, 
    calories: 50, 
    allergens: [],
    baristaAdvice: 'Base' 
  },
  { 
    id: 'lait-avoine', 
    name: 'Lait d\'avoine',
    nameKey: 'ingredient.lait-avoine',
    emoji: '🌾', 
    category: 'bases', 
    price: 0.45, 
    calories: 45, 
    allergens: ['gluten'],
    baristaAdvice: 'Crémeux et onctueux' 
  },
  { 
    id: 'lait-coco', 
    name: 'Lait de coco',
    nameKey: 'ingredient.lait-coco',
    emoji: '🥥', 
    category: 'bases', 
    price: 0.35, 
    calories: 60, 
    allergens: [],
    baristaAdvice: 'Saveur tropicale' 
  },
  { 
    id: 'eau-coco', 
    name: 'Eau de coco',
    nameKey: 'ingredient.eau-coco',
    emoji: '🥥', 
    category: 'bases', 
    price: 0.55, 
    calories: 20, 
    allergens: [],
    baristaAdvice: 'Hydratation maximale' 
  },
];

// Cafés Classiques
export const classicCoffees: CoffeeItem[] = [
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'Shot d\'espresso intense et corsé',
    basePrice: 2.80,
    category: 'classic',
  },
  {
    id: 'americano',
    name: 'Americano',
    description: 'Espresso allongé à l\'eau chaude',
    basePrice: 3.20,
    category: 'classic',
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Espresso, lait vapeur et mousse onctueuse',
    basePrice: 4.00,
    category: 'classic',
  },
  {
    id: 'latte',
    name: 'Latte',
    description: 'Espresso doux avec beaucoup de lait vapeur',
    basePrice: 4.00,
    category: 'classic',
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    description: 'Espresso avec microfoam soyeuse (Australie)',
    basePrice: 4.20,
    category: 'classic',
  },
  {
    id: 'cortado',
    name: 'Cortado',
    description: 'Espresso équilibré avec un peu de lait (Espagne)',
    basePrice: 3.50,
    category: 'classic',
    allergens: ['lactose'],
  },
  {
    id: 'ristretto',
    name: 'Ristretto',
    description: 'Espresso court et concentré, saveur intense',
    basePrice: 2.80,
    category: 'classic',
    allergens: [],
  },
  {
    id: 'lungo',
    name: 'Lungo',
    description: 'Espresso allongé, extraction plus longue',
    basePrice: 2.80,
    category: 'classic',
    allergens: [],
  },
  {
    id: 'macchiato',
    name: 'Macchiato',
    description: 'Espresso "taché" d\'une cuillère de mousse de lait',
    basePrice: 3.20,
    category: 'classic',
    allergens: ['lactose'],
  },
  {
    id: 'macchiato-caramel',
    name: 'Macchiato Caramel',
    description: 'Latte avec sirop caramel et mousse de lait',
    basePrice: 4.50,
    category: 'classic',
    allergens: ['lactose'],
  },
  {
    id: 'mocha',
    name: 'Mocha',
    description: 'Espresso avec chocolat chaud et lait vapeur',
    basePrice: 4.50,
    category: 'classic',
    allergens: ['lactose'],
  },
];

// Cafés Signatures DIY
export const signatureCoffees: CoffeeItem[] = [
  {
    id: 'espresso-tonic',
    name: 'Espresso Tonic Orange',
    description: 'Espresso sur tonic et orange sanguine - Rafraîchissant et audacieux',
    basePrice: 5.50,
    category: 'signature',
  },
  {
    id: 'mushroom-coffee',
    name: 'Mushroom Coffee',
    description: 'Café fonctionnel avec champignons adaptogènes (Lion\'s Mane & Chaga)',
    basePrice: 6.50,
    category: 'signature',
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    description: 'Thé matcha japonais premium avec lait vapeur',
    basePrice: 5.80,
    category: 'signature',
  },
  {
    id: 'golden-latte',
    name: 'Golden Latte',
    description: 'Curcuma, gingembre, cannelle et lait d\'avoine - Anti-inflammatoire',
    basePrice: 6.00,
    category: 'signature',
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew Nitro',
    description: 'Café infusé à froid 18h, texture crémeuse',
    basePrice: 4.50,
    category: 'signature',
  },
];

export const coffeeItems = [...classicCoffees, ...signatureCoffees];

// Eau
export const waterDrinks: ClassicDrink[] = [
  { id: 'eau-plate-500', name: 'Eau Plate 500ml', price: 1.40, icon: '💧', size: '500ml' },
  { id: 'eau-plate-1l', name: 'Eau Plate 1L', price: 3.50, icon: '💧', size: '1L' },
  { id: 'eau-gazeuse-500', name: 'Eau Gazeuse 500ml', price: 2.50, icon: '🫇', size: '500ml' },
  { id: 'eau-gazeuse-1l', name: 'Eau Gazeuse 1L', price: 4.00, icon: '🫇', size: '1L' },
];

// Thés
export const teaDrinks: ClassicDrink[] = [
  { id: 'the-vert', name: 'Thé Vert', price: 3.00, icon: '🍵' },
  { id: 'the-noir', name: 'Thé Noir', price: 3.00, icon: '☕' },
  { id: 'the-blanc', name: 'Thé Blanc', price: 3.50, icon: '🍵' },
  { id: 'the-earl-grey', name: 'Thé Earl Grey', price: 3.50, icon: '🍵' },
  { id: 'the-jasmin', name: 'Thé au Jasmin', price: 3.50, icon: '🌸' },
  { id: 'infusion-menthe', name: 'Infusion Menthe', price: 3.00, icon: '🌿' },
  { id: 'infusion-verveine', name: 'Infusion Verveine', price: 3.00, icon: '🌿' },
  { id: 'infusion-camomille', name: 'Infusion Camomille', price: 3.00, icon: '🌼' },
];

// Boissons Gazeuses
export const sodaDrinks: ClassicDrink[] = [
  { id: 'coca-cola-33', name: 'Coca-Cola', price: 3.00, icon: '🥤', size: '33cl' },
  { id: 'coca-zero-33', name: 'Coca-Cola Zero', price: 3.00, icon: '🥤', size: '33cl' },
  { id: 'sprite-33', name: 'Sprite', price: 3.00, icon: '🥤', size: '33cl' },
  { id: 'fanta-orange-33', name: 'Fanta Orange', price: 3.00, icon: '🍊', size: '33cl' },
  { id: 'fanta-citron-33', name: 'Fanta Citron', price: 3.00, icon: '🍋', size: '33cl' },
  { id: 'ice-tea-peche', name: 'Ice Tea Pêche', price: 3.50, icon: '🍑', size: '33cl' },
  { id: 'ice-tea-citron', name: 'Ice Tea Citron', price: 3.50, icon: '🍋', size: '33cl' },
  { id: 'schweppes-tonic', name: 'Schweppes Tonic', price: 3.50, icon: '🥤', size: '33cl' },
  { id: 'schweppes-citron', name: 'Schweppes Citron', price: 3.50, icon: '🍋', size: '33cl' },
];

// Toutes les boissons classiques (pour compatibilité)
export const classicDrinks: ClassicDrink[] = [
  ...waterDrinks,
  ...teaDrinks,
  ...sodaDrinks,
];

export const milkOptions = [
  { id: 'entier', label: 'Lait entier', price: 0 },
  { id: 'demi-ecreme', label: 'Lait demi-écrémé', price: 0 },
  { id: 'amande', label: 'Lait d\'amande', price: 0.50 },
  { id: 'avoine', label: 'Lait d\'avoine', price: 0.50 },
  { id: 'soja', label: 'Lait de soja', price: 0.50 },
  { id: 'coco', label: 'Lait de coco', price: 0.60 },
];

export const extraOptions = [
  { id: 'shot-espresso', label: 'Shot d\'espresso supplémentaire', price: 0.80 },
  { id: 'sirop-vanille', label: 'Sirop vanille', price: 0.50 },
  { id: 'sirop-caramel', label: 'Sirop caramel', price: 0.50 },
  { id: 'creme-fouettee', label: 'Crème fouettée', price: 0.70 },
  { id: 'chocolat', label: 'Poudre de chocolat', price: 0.40 },
];
