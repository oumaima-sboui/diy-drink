import { Ingredient } from './types';

export interface TasteWarning {
  type: 'bitter' | 'strong' | 'spicy' | 'special' | 'earthy';
  severity: 'low' | 'medium' | 'high';
  titleKey: string;
  descriptionKey: string;
  ingredients: string[];
  suggestionKey?: string;
  emoji: string;
}

/**
 * Analyse les ingrédients d'un jus/smoothie composé (depuis Composer)
 */
export function analyzeTaste(ingredients: Ingredient[]): TasteWarning[] {
  const warnings: TasteWarning[] = [];

  // Ingrédients amers
  const bitterIngredients = ingredients.filter(ing => {
    const id = ing.id?.toLowerCase() || '';
    const name = ing.name?.toLowerCase() || '';
    return ['kale', 'celeri', 'céleri', 'epinards', 'épinards', 'citron', 'pamplemousse'].some(keyword => 
      id.includes(keyword) || name.includes(keyword)
    );
  });
  
  if (bitterIngredients.length > 0) {
    warnings.push({
      type: 'bitter',
      severity: bitterIngredients.length > 2 ? 'high' : bitterIngredients.length > 1 ? 'medium' : 'low',
      emoji: '😬',
      titleKey: 'taste.bitter.title',
      descriptionKey: 'taste.bitter.description',
      ingredients: bitterIngredients.map(i => i.name),
      suggestionKey: 'taste.bitter.suggestion'
    });
  }

  // Ingrédients forts/piquants
  const strongIngredients = ingredients.filter(ing => {
    const id = ing.id?.toLowerCase() || '';
    const name = ing.name?.toLowerCase() || '';
    return ['gingembre', 'curcuma', 'cayenne', 'betterave', 'cardamome'].some(keyword => 
      id.includes(keyword) || name.includes(keyword)
    );
  });
  
  if (strongIngredients.length > 0) {
    warnings.push({
      type: 'strong',
      severity: strongIngredients.length > 2 ? 'high' : strongIngredients.length > 1 ? 'medium' : 'low',
      emoji: '🔥',
      titleKey: 'taste.strong.title',
      descriptionKey: 'taste.strong.description',
      ingredients: strongIngredients.map(i => i.name),
      suggestionKey: 'taste.strong.suggestion'
    });
  }

  // Ingrédients épicés
  const spicyIngredients = ingredients.filter(ing => {
    const id = ing.id?.toLowerCase() || '';
    const name = ing.name?.toLowerCase() || '';
    return ['cayenne', 'cardamome', 'piment'].some(keyword => 
      id.includes(keyword) || name.includes(keyword)
    );
  });
  
  if (spicyIngredients.length > 1) {
    warnings.push({
      type: 'spicy',
      severity: spicyIngredients.length > 2 ? 'high' : 'medium',
      emoji: '🌶️',
      titleKey: 'taste.spicy.title',
      descriptionKey: 'taste.spicy.description',
      ingredients: spicyIngredients.map(i => i.name),
      suggestionKey: 'taste.spicy.suggestion'
    });
  }

  // Combinaisons spéciales (Spiruline, Matcha)
  const specialIngredients = ingredients.filter(ing => {
    const id = ing.id?.toLowerCase() || '';
    const name = ing.name?.toLowerCase() || '';
    return ['spiruline', 'matcha'].some(keyword => 
      id.includes(keyword) || name.includes(keyword)
    );
  });
  
  if (specialIngredients.length > 0) {
    const hasSpirulina = specialIngredients.some(i => 
      (i.id?.toLowerCase() || '').includes('spiruline') || 
      (i.name?.toLowerCase() || '').includes('spiruline')
    );
    warnings.push({
      type: 'special',
      severity: 'medium',
      emoji: '🌿',
      titleKey: 'taste.special.title',
      descriptionKey: hasSpirulina ? 'taste.special.spirulina' : 'taste.special.matcha',
      ingredients: specialIngredients.map(i => i.name),
      suggestionKey: 'taste.special.suggestion'
    });
  }

  // Goût terreux
  const earthyIngredients = ingredients.filter(ing => {
    const id = ing.id?.toLowerCase() || '';
    const name = ing.name?.toLowerCase() || '';
    return ['betterave', 'céleri', 'celeri'].some(keyword => 
      id.includes(keyword) || name.includes(keyword)
    );
  });

  if (earthyIngredients.length > 0) {
    warnings.push({
      type: 'earthy',
      severity: 'low',
      emoji: '🌱',
      titleKey: 'taste.earthy.title',
      descriptionKey: 'taste.earthy.description',
      ingredients: earthyIngredients.map(i => i.name),
    });
  }

  return warnings;
}
/**
 * Analyse d'un produit du menu basé sur sa description (ancienne méthode, garde pour compatibilité)
 */
export function analyzeProductTaste(productName: string, description: string): TasteWarning[] {
  const warnings: TasteWarning[] = [];
  const lowerDesc = description.toLowerCase();

  // Détection dans les descriptions de produits du menu
  if (lowerDesc.includes('gingembre') || lowerDesc.includes('curcuma')) {
    warnings.push({
      type: 'strong',
      severity: 'medium',
      emoji: '🔥',
      titleKey: 'taste.strong.title',
      descriptionKey: 'taste.strong.description',
      ingredients: [productName],
      suggestionKey: 'taste.strong.suggestion'
    });
  }

  if (lowerDesc.includes('piment') || lowerDesc.includes('cayenne') || lowerDesc.includes('espelette')) {
    warnings.push({
      type: 'spicy',
      severity: 'high',
      emoji: '🌶️',
      titleKey: 'taste.spicy.title',
      descriptionKey: 'taste.spicy.description',
      ingredients: [productName],
    });
  }

  if (lowerDesc.includes('betterave') || lowerDesc.includes('céleri')) {
    warnings.push({
      type: 'earthy',
      severity: 'low',
      emoji: '🌱',
      titleKey: 'taste.earthy.title',
      descriptionKey: 'taste.earthy.description',
      ingredients: [productName],
    });
  }

  if (lowerDesc.includes('spiruline') || lowerDesc.includes('matcha')) {
    warnings.push({
      type: 'special',
      severity: 'medium',
      emoji: '🌿',
      titleKey: 'taste.special.title',
      descriptionKey: lowerDesc.includes('spiruline') ? 'taste.special.spirulina' : 'taste.special.matcha',
      ingredients: [productName],
      suggestionKey: 'taste.special.suggestion'
    });
  }

  return warnings;
}