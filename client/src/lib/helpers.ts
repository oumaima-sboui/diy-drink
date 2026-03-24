import type { Ingredient, IncompatibleCombination } from './types';
import { incompatibleCombinations } from './data';

export function checkIncompatibility(ingredients: Ingredient[]): string | null {
  // Vérifier les incompatibilités connues
  const hasAcidic = ingredients.some(i => ['citron', 'pamplemousse', 'orange'].includes(i.id));
  const hasDairy = ingredients.some(i => ['yaourt-grec', 'lait-amande', 'lait-avoine'].includes(i.id));
  
  if (hasAcidic && hasDairy) {
    return "Les agrumes peuvent faire cailler les produits laitiers. Considérez séparer ces ingrédients.";
  }

  const hasSpinach = ingredients.some(i => i.id === 'epinards');
  const hasCacao = ingredients.some(i => i.id === 'cacao-cru');
  
  if (hasSpinach && hasCacao) {
    return "Les épinards et le cacao peuvent donner un goût terreux prononcé ensemble.";
  }

  const strongFlavors = ingredients.filter(i => 
    ['gingembre', 'curcuma', 'cayenne', 'spiruline', 'matcha'].includes(i.id)
  );
  
  if (strongFlavors.length > 2) {
    return `Vous avez ${strongFlavors.length} saveurs fortes. Le goût pourrait être très intense.`;
  }

  // Aucune incompatibilité détectée
  return null;
}

export function getAllergenIcons(allergens: string[]): string[] {
  const allergenMap: Record<string, string> = {
    gluten: '🌾',
    lactose: '🥛',
    nuts: '🥜',
    soy: '🫘',
    celery: '🌿',
    sesame: '⚪',
  };
  
  return allergens.map(a => allergenMap[a] || '').filter(icon => icon !== '');
}
