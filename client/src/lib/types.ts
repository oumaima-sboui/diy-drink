export type DrinkType = 'jus' | 'smoothie' | 'cafe' | 'classique' | 'assiette';

export type IngredientCategory = 
  | 'fruits' 
  | 'legumes' 
  | 'superfoods' 
  | 'epices'
  | 'herbes' 
  | 'proteines' 
  | 'bases';

export type AllergenId = 'gluten' | 'lactose' | 'nuts' | 'soy' | 'celery' | 'sesame';

export interface Allergen {
  id: AllergenId;
  name: string;
  icon: string;
}

export interface Ingredient {
  id: string;
  name: string;
  nameKey?: string; 
  emoji: string;
  category: IngredientCategory;
  price: number;
  calories: number;
   protein?: number;     
  carbs?: number;       
  fat?: number;          
  fiber?: number; 
  vitamins?: Array<{    
    name: string;
    amount: number;
    unit: string;
  }>;
  minerals?: Array<{   
    name: string;
    amount: number;
    unit: string;
  }>;
  allergens: AllergenId[];
  baristaAdvice?: string;
  forJuice?: boolean;    
  forSmoothie?: boolean; 
}

export interface CoffeeItem {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  category: 'classic' | 'signature';
  image?: string;
  allergens?: AllergenId[];
}

export interface ClassicDrink {
  id: string;
  name: string;
  price: number;
  icon: string;
  size?: string;
}

export interface CartItem {
  id: string;
  type: DrinkType;
  size?: 'petit' | 'moyen' | 'large';
  basePrice: number;
  ingredients?: Ingredient[];
  coffee?: CoffeeItem;
  classicDrink?: ClassicDrink;
  customizations?: {
    milk?: string;
    sugar?: number;
    extras?: string[];
  };
  quantity: number;
}

export interface Size {
  id: 'petit' | 'moyen' | 'large';
  label: string;
  volume: string;
  multiplier: number;
}

export interface IncompatibleCombination {
  ingredients: string[];
  with: string[];
  reason: string;
  suggestion: string;
}
