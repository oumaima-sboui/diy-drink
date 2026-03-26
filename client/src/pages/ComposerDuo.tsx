import { useState } from 'react';
import { useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import Logo from '@/components/Logo';

interface DuoCombo {
  id: string;
  nameKey: string;
  side1: string;
  side2: string;
  side1Image: string;
  side2Image: string;
  color: string;
  price: number;
}

interface Fruit {
  id: string;
  name: string;
  nameKey: string;
  image: string;
  color: string;
}

export default function ComposerDuo() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const { addToCart } = useCart();
  const [selectedCombo, setSelectedCombo] = useState<DuoCombo | null>(null);
  
  // Pour le mode personnalisé
  const [customFruit1, setCustomFruit1] = useState<Fruit | null>(null);
  const [customFruit2, setCustomFruit2] = useState<Fruit | null>(null);

  const POPULAR_COMBOS: DuoCombo[] = [
    {
      id: 'mango-passion',
      nameKey: 'combo.mangoPassion',
      side1: 'Mangue',
      side2: 'Fruit de la passion',
      side1Image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400',
      side2Image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400',
      color: 'from-yellow-400 to-orange-500',
      price: 9.99
    },
    {
      id: 'orange-strawberry',
      nameKey: 'combo.orangeStrawberry',
      side1: 'Orange',
      side2: 'Fraise',
      side1Image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400',
      side2Image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400',
      color: 'from-orange-400 to-pink-500',
      price: 9.99
    },
    {
      id: 'pineapple-mint-lemon',
      nameKey: 'combo.pineappleMintLemon',
      side1: 'Ananas',
      side2: 'Menthe-Citron',
      side1Image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400',
      side2Image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=400',
      color: 'from-yellow-300 to-green-400',
      price: 9.99
    },
    {
      id: 'apple-kiwi',
      nameKey: 'combo.appleKiwi',
      side1: 'Pomme',
      side2: 'Kiwi',
      side1Image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
      side2Image: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=400',
      color: 'from-green-400 to-emerald-500',
      price: 9.99
    }
  ];

  const AVAILABLE_FRUITS: Fruit[] = [
    { id: 'mangue', name: 'Mangue', nameKey: 'ingredient.mangue', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400', color: 'from-yellow-400 to-orange-400' },
    { id: 'passion', name: 'Fruit de la passion', nameKey: 'ingredient.passion', image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400', color: 'from-purple-400 to-pink-500' },
    { id: 'orange', name: 'Orange', nameKey: 'ingredient.orange', image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400', color: 'from-orange-500 to-orange-600' },
    { id: 'fraise', name: 'Fraise', nameKey: 'ingredient.fraise', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400', color: 'from-red-400 to-pink-500' },
    { id: 'ananas', name: 'Ananas', nameKey: 'ingredient.ananas', image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400', color: 'from-yellow-300 to-yellow-500' },
    { id: 'menthe-citron', name: 'Menthe-Citron', nameKey: 'ingredient.menthe-citron', image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=400', color: 'from-green-400 to-lime-500' },
    { id: 'pomme', name: 'Pomme', nameKey: 'ingredient.pomme', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400', color: 'from-red-500 to-green-400' },
    { id: 'kiwi', name: 'Kiwi', nameKey: 'ingredient.kiwi', image: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=400', color: 'from-green-500 to-emerald-600' },
    { id: 'banane', name: 'Banane', nameKey: 'ingredient.banane', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400', color: 'from-yellow-300 to-yellow-500' },
    { id: 'framboise', name: 'Framboise', nameKey: 'ingredient.framboise', image: 'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=400', color: 'from-pink-500 to-red-500' },
    { id: 'myrtille', name: 'Myrtille', nameKey: 'ingredient.myrtille', image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400', color: 'from-blue-600 to-purple-600' },
{ id: 'pasteque', name: 'Pastèque', nameKey: 'ingredient.pasteque', image: 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=400', color: 'from-red-400 to-pink-400' },
  ];

  const handleAddPopularCombo = (combo: DuoCombo) => {
  addToCart({
    id: `duo-${combo.id}-${Date.now()}`,
    type: 'jus',
    size: 'medium',
    basePrice: 9.99, // ✅ Prix fixe DUO
    quantity: 1,
    customizations: {
      productName: `DUO ${t(combo.nameKey)}`,
      description: `${combo.side1} / ${combo.side2}`
    },
    ingredients: [
      {
        id: combo.id + '-1',
        name: combo.side1,
        emoji: '🍹',
        category: 'fruits',
        price: 0, // ✅ Prix = 0€ car déjà dans basePrice
        calories: 0,
        allergens: []
      },
      {
        id: combo.id + '-2',
        name: combo.side2,
        emoji: '🍹',
        category: 'fruits',
        price: 0, // ✅ Prix = 0€
        calories: 0,
        allergens: []
      }
    ]
  });

  toast.success(`DUO ${t(combo.nameKey)} ajouté au panier !`);
  setLocation('/panier');
};

const handleAddCustomCombo = () => {
  if (!customFruit1 || !customFruit2) {
    toast.error('Veuillez sélectionner 2 fruits');
    return;
  }

  addToCart({
    id: `duo-custom-${Date.now()}`,
    type: 'jus',
    size: 'medium',
    basePrice: 9.99, // ✅ Prix fixe DUO
    quantity: 1,
    customizations: {
      productName: `DUO ${customFruit1.name} / ${customFruit2.name}`,
      description: `${customFruit1.name} / ${customFruit2.name}`
    },
    ingredients: [
      {
        id: customFruit1.id,
        name: customFruit1.name,
        emoji: '🍹',
        category: 'fruits',
        price: 0, // ✅ Prix = 0€
        calories: 0,
        allergens: []
      },
      {
        id: customFruit2.id,
        name: customFruit2.name,
        emoji: '🍹',
        category: 'fruits',
        price: 0, // ✅ Prix = 0€
        calories: 0,
        allergens: []
      }
    ]
  });

  toast.success(`DUO ${customFruit1.name} / ${customFruit2.name} ajouté au panier !`);
  setLocation('/panier');
};

  return (
    <div className="min-h-screen bg-[#FAF8F3] pb-20 pt-28">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size={32} />
            <span className="font-bold text-[#004D40] text-xl">
              🥤 {t('composer.duoDrink')}
            </span>
          </div>
          
          <Button
            variant="ghost"
            onClick={() => setLocation('/composer')}
            className="text-[#004D40]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('composer.back')}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#004D40] mb-4 font-serif">
            🥤 {t('composer.chooseDuoCombo')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('composer.duoDesc')}
          </p>
        </div>

        {/* Image du gobelet DUO */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <img 
              src="/images/duo-cup.png" 
              alt="Gobelet DUO" 
              className="h-80 object-contain rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] text-white px-6 py-2 rounded-full shadow-lg font-bold">
              {t('composer.duoCombos')}
            </div>
          </div>
        </div>

        {/* Tabs: Populaires vs Personnalisé */}
        <Tabs defaultValue="popular" className="w-full mt-16">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="popular" className="gap-2">
              <Sparkles className="w-4 h-4" />
              {t('duo.popularCombos')}
            </TabsTrigger>
            <TabsTrigger value="custom" className="gap-2">
              <Check className="w-4 h-4" />
              {t('duo.customCombo')}
            </TabsTrigger>
          </TabsList>

          {/* Combos Populaires */}
          <TabsContent value="popular">
            <div className="grid md:grid-cols-2 gap-6">
              {POPULAR_COMBOS.map((combo) => (
                <Card
                  key={combo.id}
                  onClick={() => setSelectedCombo(combo)}
                  className={`p-6 cursor-pointer transition-all border-2 relative hover:shadow-xl ${
                    selectedCombo?.id === combo.id
                      ? 'border-[#FF6F00] bg-[#FF6F00]/5 shadow-xl scale-105'
                      : 'border-gray-200 hover:border-[#FF6F00]/50'
                  }`}
                >
                  {selectedCombo?.id === combo.id && (
                    <div className="absolute top-4 right-4 bg-[#FF6F00] text-white rounded-full p-2 shadow-lg z-10">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                  
                  <div className={`w-full h-3 rounded-full bg-gradient-to-r ${combo.color} mb-6`} />
                  
                  <h3 className="text-2xl font-bold text-[#004D40] mb-6 text-center">
                    {t(combo.nameKey)}
                  </h3>
                  
                  <div className="flex justify-between items-center gap-4 mb-6">
                    <div className="flex-1 text-center">
                      <div className="relative w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden shadow-lg border-4 border-white">
                        <img 
                          src={combo.side1Image} 
                          alt={combo.side1}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-bold text-lg text-[#004D40]">{combo.side1}</p>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] flex items-center justify-center shadow-lg">
                        <span className="text-white text-2xl font-bold">+</span>
                      </div>
                    </div>

                    <div className="flex-1 text-center">
                      <div className="relative w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden shadow-lg border-4 border-white">
                        <img 
                          src={combo.side2Image} 
                          alt={combo.side2}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-bold text-lg text-[#004D40]">{combo.side2}</p>
                    </div>
                  </div>

                  <div className="text-center pt-4 border-t-2 border-gray-100">
                    <span className="text-3xl font-bold text-[#FF6F00]">
                      {combo.price.toFixed(2)}€
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button
                onClick={() => selectedCombo && handleAddPopularCombo(selectedCombo)}
                disabled={!selectedCombo}
                className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] hover:from-[#E65100] hover:to-[#F57C00] text-white px-12 py-8 text-2xl rounded-full shadow-2xl hover:shadow-3xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="mr-3 h-7 w-7" />
                {t('composer.order')} {selectedCombo && `- ${selectedCombo.price.toFixed(2)}€`}
              </Button>
            </div>
          </TabsContent>

          {/* Mode Personnalisé */}
          <TabsContent value="custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#004D40] mb-3">
                  {t('duo.customTitle')}
                </h2>
                <p className="text-gray-600">
                  {t('duo.customDesc')}
                </p>
              </div>

              {/* Sélection des 2 fruits */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Fruit 1 */}
                <div>
                  <h3 className="text-xl font-bold text-[#004D40] mb-4 text-center">
                    {t('duo.selectFruit1')}
                  </h3>
                  {customFruit1 ? (
                    <Card className="p-6 text-center border-2 border-[#FF6F00]">
                      <div className="relative w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden shadow-lg border-4 border-white">
                        <img 
                          src={customFruit1.image} 
                          alt={customFruit1.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-bold text-lg text-[#004D40] mb-3">{customFruit1.name}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCustomFruit1(null)}
                        className="text-red-600 border-red-300"
                      >
                        Changer
                      </Button>
                    </Card>
                  ) : (
                    <Card className="p-4 border-2 border-dashed border-gray-300">
                      <p className="text-center text-gray-500 mb-4">{t('duo.chooseFirst')}</p>
                      <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                        {AVAILABLE_FRUITS.map((fruit) => (
                          <button
                            key={fruit.id}
                            onClick={() => setCustomFruit1(fruit)}
                            disabled={customFruit2?.id === fruit.id}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <div className="w-16 h-16 mx-auto rounded-full overflow-hidden shadow mb-2">
                              <img 
                                src={fruit.image} 
                                alt={fruit.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="text-xs font-medium text-center">{fruit.name}</p>
                          </button>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>

                {/* Fruit 2 */}
                <div>
                  <h3 className="text-xl font-bold text-[#004D40] mb-4 text-center">
                    {t('duo.selectFruit2')}
                  </h3>
                  {customFruit2 ? (
                    <Card className="p-6 text-center border-2 border-[#FF6F00]">
                      <div className="relative w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden shadow-lg border-4 border-white">
                        <img 
                          src={customFruit2.image} 
                          alt={customFruit2.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-bold text-lg text-[#004D40] mb-3">{customFruit2.name}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCustomFruit2(null)}
                        className="text-red-600 border-red-300"
                      >
                        Changer
                      </Button>
                    </Card>
                  ) : (
                    <Card className="p-4 border-2 border-dashed border-gray-300">
                      <p className="text-center text-gray-500 mb-4">{t('duo.chooseSecond')}</p>
                      <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                        {AVAILABLE_FRUITS.map((fruit) => (
                          <button
                            key={fruit.id}
                            onClick={() => setCustomFruit2(fruit)}
                            disabled={customFruit1?.id === fruit.id}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <div className="w-16 h-16 mx-auto rounded-full overflow-hidden shadow mb-2">
                              <img 
                                src={fruit.image} 
                                alt={fruit.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="text-xs font-medium text-center">{fruit.name}</p>
                          </button>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleAddCustomCombo}
                  disabled={!customFruit1 || !customFruit2}
                  className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] hover:from-[#E65100] hover:to-[#F57C00] text-white px-12 py-8 text-2xl rounded-full shadow-2xl hover:shadow-3xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="mr-3 h-7 w-7" />
                  {t('duo.createCustom')} - 9.99€
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}