// Matrice de compatibilité : quels boosters vont bien avec quels ingrédients
export const boosterCompatibility: Record<string, string[]> = {
  // FRUITS
  'banane': ['cannelle', 'cacao-cru', 'beurre-cacahuete', 'beurre-amande', 'whey-protein', 'maca'],
  'fraise': ['menthe', 'basilic', 'citron', 'graines-chia'],
  'mangue': ['citron-vert', 'gingembre', 'curcuma', 'basilic-thai'],
  'ananas': ['menthe', 'gingembre', 'basilic', 'citron-vert'],
  'orange': ['gingembre', 'curcuma', 'cannelle', 'cardamome'],
  'pomme': ['cannelle', 'gingembre', 'cardamome'],
  'kiwi': ['menthe', 'citron', 'gingembre'],
  'citron': ['gingembre', 'curcuma', 'menthe', 'cayenne'],
  'pamplemousse': ['menthe', 'gingembre', 'basilic'],
  
  // LÉGUMES
  'epinards': ['gingembre', 'citron', 'spiruline', 'matcha', 'graines-chia'],
  'concombre': ['menthe', 'basilic', 'citron', 'gingembre'],
  'carotte': ['gingembre', 'curcuma', 'orange', 'cannelle'],
  'betterave': ['gingembre', 'citron', 'graines-chia'],
  'celeri': ['citron', 'gingembre', 'persil'],
  
  // BASES
  'lait-amande': ['cannelle', 'cacao-cru', 'whey-protein', 'maca', 'matcha'],
  'lait-coco': ['cannelle', 'cacao-cru', 'gingembre', 'curcuma'],
  'yaourt-grec': ['cannelle', 'miel', 'graines-chia', 'graines-lin'],
  'eau-coco': ['menthe', 'citron-vert', 'gingembre', 'spiruline'],
};

// Boosters TOUJOURS disponibles
export const universalBoosters = [
  'spiruline',
  'graines-chia',
  'graines-lin',
  'maca',
  'gingembre',
  'curcuma',
];

// Fonction pour obtenir les boosters compatibles
export function getCompatibleBoosters(selectedIngredients: any[]): string[] {
  if (selectedIngredients.length === 0) return universalBoosters;
  
  let compatibleBoosters = new Set<string>(universalBoosters);
  
  selectedIngredients.forEach(ingredient => {
    const ingredientId = ingredient.id;
    const compatible = boosterCompatibility[ingredientId];
    
    if (compatible) {
      compatible.forEach(booster => compatibleBoosters.add(booster));
    }
  });
  
  return Array.from(compatibleBoosters);
}

// Boosters incompatibles (liste noire)
export const incompatibleCombos: Record<string, string[]> = {
  'banane': ['cayenne', 'persil'], // Banane ne va pas avec piquant
  'lait-amande': ['citron'], // Lait caille avec citron
  'yaourt-grec': ['citron', 'citron-vert'], // Idem
  'ananas': ['lait-amande', 'yaourt-grec'], // Acidité + lait
};