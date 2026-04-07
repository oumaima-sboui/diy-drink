import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/contexts/CartContext';
import { ingredients, sizes } from '@/lib/data';
import { Ingredient, DrinkType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShoppingCart, AlertTriangle, ArrowRight, ArrowLeft, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { checkIncompatibility } from '@/lib/helpers';
import { generateDrinkName, calculateTotalCalories } from '@/lib/nutrition';
import Logo from '@/components/Logo';
import NutritionChart from '@/components/NutritionChart';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function Composer() {
  const { t } = useTranslation();
  const [location, setLocation] = useLocation();
  const { addToCart } = useCart();
  
  // Pop-up d'accueil DUO
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(true);
  
  // État du Wizard
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);

  const [drinkType, setDrinkType] = useState<DrinkType>('jus');
  const [selectedSize, setSelectedSize] = useState(sizes[0]); // Moyen par défaut
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [incompatibilityWarning, setIncompatibilityWarning] = useState<any>(null);
  const [drinkName, setDrinkName] = useState<string>('');

  // Définition des étapes avec traduction
  const STEPS = [
    { id: 1, title: t('composer.step1'), icon: "🥛" },
    { id: 2, title: t('composer.step2'), icon: "🍓" },
    { id: 3, title: t('composer.step3'), icon: "⚡" },
    { id: 4, title: t('composer.step4'), icon: "✨" }
  ];
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    if (type === 'jus' || type === 'smoothie') {
      setDrinkType(type);
    }
  }, []);

  useEffect(() => {
    if (selectedIngredients.length >= 2) {
      const warning = checkIncompatibility(selectedIngredients);
      setIncompatibilityWarning(warning);
    } else {
      setIncompatibilityWarning(null);
    }
    
    if (selectedIngredients.length > 0) {
      setDrinkName(generateDrinkName(selectedIngredients));
    } else {
      setDrinkName(t('composer.title'));
    }
  }, [selectedIngredients, t]);
  
 const toggleIngredient = (ingredient: Ingredient) => {
  const isAlreadySelected = selectedIngredients.find(i => i.id === ingredient.id);
  
  if (isAlreadySelected) {
    // Retirer l'ingrédient
    setSelectedIngredients(selectedIngredients.filter(i => i.id !== ingredient.id));
  } else {
    // Vérifier la limite pour les fruits (étape 2)
    if (currentStep === 2 && ingredient.category === 'fruits') {
      if (!canAddMoreFlavors(2)) {
        toast.error(`Maximum ${selectedSize.maxFlavors} saveurs pour la taille ${selectedSize.label}`);
        return;
      }
    }
    
    setSelectedIngredients([...selectedIngredients, ingredient]);
  }
};

  const calculateTotal = () => {
  let basePrice = 0;
  
  if (drinkType === 'jus') {
   basePrice = selectedSize.id === 'medium' ? 6.99 : 7.99;
  } else {
    basePrice = selectedSize.id === 'medium' ? 6.99 : 7.99;
  }
  
  // Les ingrédients du composer sont INCLUS dans le prix de base
  // Donc on n'ajoute RIEN
  return basePrice;
};
  const calculateDisplayTotal = () => {
  const baseTotal = calculateTotal();

  const ingredientsTotal = selectedIngredients.reduce(
    (total, ing) => total + ing.price,
    0
  );

  return baseTotal + ingredientsTotal;
};

  const handleAddToCart = () => {
    if (selectedIngredients.length === 0) {
      toast.error(t('composer.errorNoIngredient', 'Veuillez sélectionner au moins un ingrédient'));
      return;
    }
    
    addToCart({
      id: `${drinkType}-${Date.now()}`,
      type: drinkType,
      size: selectedSize.id,
      basePrice: calculateTotal(),
      ingredients: selectedIngredients,
      quantity: 1
    });
    
    toast.success(t('composer.addedToCart', 'Ajouté au panier !'));
    setLocation('/panier');
  };
const nextStep = () => {
  // Vérifier qu'au moins un ingrédient de base est sélectionné avant d'aller aux boosters
  if (currentStep === 2 && selectedIngredients.length === 0) {
    toast.error(t('composer.errorNoBase', 'Veuillez sélectionner au moins un ingrédient de base'));
    return;
  }
  
  if (currentStep < STEPS.length) {
    setDirection(1);
    setCurrentStep(currentStep + 1);
  }
};
  const prevStep = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

const getIngredientsForStep = () => {
  let filteredIngredients = [];
  
  switch (currentStep) {
    case 1:
      filteredIngredients = ingredients.filter(i => 
        i.category === 'bases' || (drinkType === 'jus' && i.category === 'legumes')
      );
      break;
    case 2:
      filteredIngredients = ingredients.filter(i => 
        i.category === 'fruits' || (drinkType === 'smoothie' && i.category === 'legumes')
      );
      break;
    case 3:
  // Récupérer les catégories des ingrédients déjà sélectionnés
  const selectedCategories = selectedIngredients.map(i => i.category);
  const hasFruits = selectedCategories.includes('fruits');
  const hasLegumes = selectedCategories.includes('legumes');
  const hasBases = selectedCategories.includes('bases');
  
  filteredIngredients = ingredients.filter(i => {
    if (!['superfoods', 'epices', 'herbes', 'proteines'].includes(i.category)) {
      return false;
    }
    
    // Vérifier la compatibilité avec le type de boisson
    if (drinkType === 'jus') {
      if (i.forJuice === false) return false;
    } else {
      if (i.forSmoothie === false) return false;
    }
    
    // LOGIQUE DE FILTRAGE INTELLIGENTE
    // Si on a des fruits, on propose des boosters compatibles fruits
    // Si on a des légumes verts, on propose gingembre, spiruline, etc.
    
    // Boosters toujours compatibles
    const alwaysCompatible = ['spiruline', 'gingembre', 'curcuma', 'matcha'];
    if (alwaysCompatible.includes(i.id)) return true;
    
    // Si jus de fruits : proposer herbes fraîches
    if (hasFruits && ['menthe', 'basilic'].includes(i.id)) return true;
    
    // Si smoothie : proposer protéines
    if (drinkType === 'smoothie' && i.category === 'proteines') return true;
    
    // Si légumes verts : proposer citron, gingembre
    if (hasLegumes && ['citron', 'gingembre'].includes(i.id)) return true;
    
    return true; // Par défaut, afficher
  });
  break;
    default:
      filteredIngredients = [];
  }
  
  // Dédoublonner par ID (au cas où)
  const uniqueIngredients = filteredIngredients.reduce((acc: any[], current) => {
    const exists = acc.find(item => item.id === current.id);
    if (!exists) {
      acc.push(current);
    }
    return acc;
  }, []);
  
  return uniqueIngredients;
};

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return t('composer.step1Desc');
      case 2:
        return t('composer.step2Desc');
      case 3:
        return t('composer.step3Desc');
      default:
        return '';
    }
  };

  const handleGoToDuo = () => {
    setShowWelcomeDialog(false);
    setLocation('/composer-duo');
  };

  const handleStaySimple = () => {
    setShowWelcomeDialog(false);
  };
const canAddMoreFlavors = (currentStep: number) => {
  if (currentStep !== 2) return true; // Pas d'étape saveurs
  
  const maxFlavors = selectedSize.maxFlavors;
  const currentFlavorsCount = selectedIngredients.filter(
    ing => ing.category === 'fruits'
  ).length;
  
  return currentFlavorsCount < maxFlavors;
};
  return (
    <div className="min-h-screen bg-[#FAF8F3] pb-20 pt-28">
      {/* Pop-up d'accueil DUO */}
      <Dialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-[#004D40] text-center mb-4">
              🥤 {t('composer.duoTitle')}
            </DialogTitle>
            <DialogDescription className="text-center text-lg">
              {t('composer.duoDesc')}
            </DialogDescription>
          </DialogHeader>

          {/* Image du gobelet DUO */}
          <div className="flex justify-center my-6">
            <img 
              src="/images/duo-cup.png" 
              alt="Gobelet DUO" 
              className="h-64 object-contain rounded-lg shadow-xl"
            />
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-lg p-4 mb-4">
            <p className="text-center text-gray-700 font-medium text-lg">
              {t('composer.duoAttractivePhrase')}
            </p>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={handleStaySimple}
              className="flex-1 border-2 border-[#004D40] text-[#004D40] hover:bg-[#004D40] hover:text-white py-6 text-lg"
            >
              <X className="w-5 h-5 mr-2" />
              {t('composer.simpleDrink')}
            </Button>
            <Button
              onClick={handleGoToDuo}
              className="flex-1 bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] hover:from-[#E65100] hover:to-[#F57C00] text-white py-6 text-lg shadow-lg"
            >
              🥤 {t('composer.duoDrink')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size={32} />
            <span className="font-bold text-[#004D40] text-xl hidden md:inline">
              {t('composer.workshop')}
            </span>
          </div>
          
          {/* Indicateur de progression */}
          <div className="flex items-center gap-2 md:gap-4">
            {STEPS.map((step) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    currentStep >= step.id 
                      ? 'bg-[#004D40] text-white shadow-lg scale-110' 
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <span className={`ml-2 text-sm font-medium hidden md:block ${
                  currentStep >= step.id ? 'text-[#004D40]' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
                {step.id < STEPS.length && (
                  <div className={`w-8 h-0.5 mx-2 hidden md:block ${
                    currentStep > step.id ? 'bg-[#004D40]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="font-bold text-[#FF6F00] text-lg">
            {calculateDisplayTotal().toFixed(2)}€
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full"
          >
            {/* Étape 4 : Récapitulatif */}
            {currentStep === 4 ? (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <span className="text-6xl mb-4 block">{STEPS[3].icon}</span>
                  <h2 className="text-3xl font-bold text-[#004D40] mb-2">
                    {t('composer.masterpiece')}
                  </h2>
                  <p className="text-gray-600">{t('composer.nameYourDrink')}</p>
                </div>
<Card className="p-8 shadow-2xl border-2 border-[#004D40]/10 bg-white relative overflow-hidden">
  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6F00]/10 rounded-bl-full -mr-10 -mt-10" />
  
  <div className="mb-8 text-center">
    <label className="block text-sm font-medium text-gray-500 mb-2">
      {t('composer.drinkName')}
    </label>
    <input 
      type="text" 
      value={drinkName}
      onChange={(e) => setDrinkName(e.target.value)}
      className="text-3xl font-bold text-center text-[#004D40] border-b-2 border-[#004D40]/20 focus:border-[#004D40] outline-none bg-transparent w-full max-w-md mx-auto py-2"
    />
    
    {/* Badge calories */}
    <div className="mt-4 inline-block bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] text-white px-6 py-2 rounded-full shadow-lg">
      <span className="text-sm font-semibold">
       
      </span>
    </div>
  </div>

  <div className="grid md:grid-cols-2 gap-8">
    <div>
      <h3 className="font-bold text-[#004D40] mb-4">
        {t('composer.composition')}
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="font-medium">{t('composer.base')}</span>
          <span className="text-gray-600 capitalize">
            {t(`composer.${drinkType}`)} ({selectedSize.label})
          </span>
        </div>
        {selectedIngredients.map((ing) => (
          <div key={ing.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="flex items-center gap-2">
              <span>{ing.emoji}</span>
              <span>{ing.nameKey ? t(ing.nameKey) : ing.name}</span>
            </span>
            <div className="text-right">
              <div className="text-sm font-bold text-[#004D40]">
                +{ing.price.toFixed(2)}€
              </div>
              <div className="text-xs text-gray-500">
                {ing.calories} kcal
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h3 className="font-bold text-[#004D40] mb-4">
        {t('composer.nutrition')}
      </h3>
      <NutritionChart ingredients={selectedIngredients} />
    </div>
  </div>
</Card>

                {incompatibilityWarning && (
                  <Alert variant="destructive" className="bg-red-50 border-red-200">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      {incompatibilityWarning}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ) : (
              /* Étapes 1, 2, 3 */
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <span className="text-6xl mb-4 block">{STEPS[currentStep - 1].icon}</span>
                  <h2 className="text-3xl font-bold text-[#004D40] mb-2">
                    {STEPS[currentStep - 1].title}
                  </h2>
                  <p className="text-gray-600">{getStepDescription()}</p>
                </div>

                {/* Choix de la taille (Étape 1) */}
                {currentStep === 1 && (
                  <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
                    {sizes.map(size => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size)}
                        className={`p-4 rounded-xl border-2 transition-all text-center ${
                          selectedSize.id === size.id
                            ? 'border-[#004D40] bg-[#004D40] text-white shadow-lg transform scale-105'
                            : 'border-gray-200 hover:border-[#004D40]/50 bg-white'
                        }`}
                      >
                        <div className="text-2xl mb-1">🥤</div>
                        <div className="font-bold">
                          {t(`composer.${size.id}`)}
                        </div>
                        <div className={`text-sm ${selectedSize.id === size.id ? 'text-white/80' : 'text-gray-500'}`}>
                          {size.volume}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
{currentStep === 2 && (
  <div className="text-center mb-4">
    <span className="inline-block bg-[#FF6F00] text-white px-4 py-2 rounded-full text-sm font-bold">
      {selectedIngredients.filter(i => i.category === 'fruits').length} / {selectedSize.maxFlavors} saveurs
    </span>
  </div>
)}
                {/* Grille d'ingrédients */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {getIngredientsForStep().map((ingredient) => {
                    const isSelected = selectedIngredients.some(i => i.id === ingredient.id);
                    return (
                      <motion.button
                        key={ingredient.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleIngredient(ingredient)}
                        className={`relative p-4 rounded-xl border-2 transition-all text-left group ${
                          isSelected
                            ? 'border-[#FF6F00] bg-[#FF6F00]/5 shadow-md'
                            : 'border-gray-100 hover:border-[#FF6F00]/30 bg-white hover:shadow-sm'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-[#FF6F00] text-white rounded-full p-1">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                          {ingredient.emoji}
                        </div>
                        <div className="font-bold text-[#004D40] mb-1">
                          {ingredient.nameKey ? t(ingredient.nameKey) : ingredient.name}
                        </div>
                        <div className="text-sm text-[#FF6F00] font-medium">+{ingredient.price.toFixed(2)}€</div>
                        
                        {ingredient.calories < 30 && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full mt-2 inline-block">
                            Light
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Barre de contrôle fixe */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
          <div className="container mx-auto max-w-4xl flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="text-gray-500 hover:text-[#004D40]"
            >
              <ArrowLeft className="mr-2 h-5 w-5" /> {t('composer.back')}
            </Button>

            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">


              <div className="text-xs text-gray-500">{t('composer.estimatedTotal')}</div>
                <div className="font-bold text-xl text-[#004D40]">{calculateDisplayTotal().toFixed(2)}€</div>

              </div>
           
              {currentStep < 4 ? (
                <Button 
                  onClick={nextStep}
                  className="bg-[#004D40] hover:bg-[#00695C] text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  {t('composer.next')} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  onClick={handleAddToCart}
                  className="bg-[#FF6F00] hover:bg-[#E65100] text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all animate-pulse"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> {t('composer.order')}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Bouton DUO flottant en bas à droite */}
        <button
          onClick={handleGoToDuo}
          className="fixed bottom-24 right-6 bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] hover:from-[#E65100] hover:to-[#F57C00] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all z-40 group hover:scale-110"
          title={t('composer.duoDrink')}
        >
          <div className="flex items-center gap-2">
            <span className="text-3xl">🥤</span>
            <span className="hidden group-hover:inline-block font-bold text-sm whitespace-nowrap pr-2">
              DUO
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}