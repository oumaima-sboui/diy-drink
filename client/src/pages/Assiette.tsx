import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useCart } from '@/contexts/CartContext';
import { ingredients } from '@/lib/data';
import { Ingredient } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Info, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import Logo from '@/components/Logo';

const chocolateOptions = [
  { id: 'noir', name: 'Chocolat Noir', emoji: '🍫', price: 1.50 },
  { id: 'blanc', name: 'Chocolat Blanc', emoji: '🤍', price: 1.50 },
  { id: 'lait', name: 'Chocolat au Lait', emoji: '🟤', price: 1.50 },
];

export default function Assiette() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const { addToCart } = useCart();
  
  const [selectedFruits, setSelectedFruits] = useState<Ingredient[]>([]);
  const [selectedChocolate, setSelectedChocolate] = useState<typeof chocolateOptions[0] | null>(null);
  
  // Filtrer uniquement les fruits
  const fruits = ingredients.filter(ing => ing.category === 'fruits');
  
  const totalPrice = selectedFruits.reduce((sum, ing) => sum + ing.price, 0) + (selectedChocolate?.price || 0);
  
  const toggleFruit = (fruit: Ingredient) => {
    if (selectedFruits.find(f => f.id === fruit.id)) {
      setSelectedFruits(selectedFruits.filter(f => f.id !== fruit.id));
    } else {
      if (selectedFruits.length >= 5) {
        toast.warning('Maximum 5 fruits par assiette');
        return;
      }
      setSelectedFruits([...selectedFruits, fruit]);
    }
  };
  
  const handleAddToCart = () => {
    if (selectedFruits.length === 0) {
      toast.error('Veuillez sélectionner au moins un fruit');
      return;
    }
    
    if (!selectedChocolate) {
      toast.error('Veuillez choisir un type de chocolat');
      return;
    }
    
    addToCart({
      id: `assiette-${Date.now()}`,
      type: 'assiette',
      basePrice: totalPrice,
      ingredients: selectedFruits,
      customizations: {
        extras: [selectedChocolate.name]
      },
      quantity: 1
    });
    
    toast.success('Assiette ajoutée au panier !');
    setLocation('/panier');
  };
  
  return (
    <div className="min-h-screen botanical-pattern">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => setLocation('/')} className="flex items-center gap-2 text-2xl font-bold text-primary">
            <Logo size={32} />
            <span>DIY</span>
          </button>
          <h1 className="text-3xl font-bold text-primary">Assiette de Fruits</h1>
          <Button variant="outline" onClick={() => setLocation('/panier')}>
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Section Fruits */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-luxury">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold">Choisissez vos fruits (max 5)</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {fruits.map(fruit => {
                  const isSelected = selectedFruits.find(f => f.id === fruit.id);
                  return (
                    <button
                      key={fruit.id}
                      onClick={() => toggleFruit(fruit)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-accent bg-accent/10 shadow-lg scale-105'
                          : 'border-border hover:border-accent/50 hover:shadow-md'
                      }`}
                    >
                      <div className="text-4xl mb-2">{fruit.emoji}</div>
                      <div className="font-semibold text-sm">{fruit.name}</div>
                      <div className="text-xs text-muted-foreground">{fruit.price.toFixed(2)} €</div>
                      
                      {fruit.baristaAdvice && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-muted-foreground mt-2 mx-auto" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-sm">{fruit.baristaAdvice}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </button>
                  );
                })}
              </div>
            </Card>
            
            {/* Section Chocolat */}
            <Card className="p-6 shadow-luxury mt-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🍫</span>
                <h2 className="text-2xl font-bold">Choisissez votre chocolat</h2>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {chocolateOptions.map(choco => {
                  const isSelected = selectedChocolate?.id === choco.id;
                  return (
                    <button
                      key={choco.id}
                      onClick={() => setSelectedChocolate(choco)}
                      className={`p-6 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-secondary bg-secondary/10 shadow-gold scale-105'
                          : 'border-border hover:border-secondary/50 hover:shadow-md'
                      }`}
                    >
                      <div className="text-5xl mb-2">{choco.emoji}</div>
                      <div className="font-semibold">{choco.name}</div>
                      <div className="text-sm text-muted-foreground">+{choco.price.toFixed(2)} €</div>
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>
          
          {/* Panneau Récapitulatif */}
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-luxury sticky top-24">
              <h3 className="text-xl font-bold mb-4">Votre Assiette</h3>
              
              {selectedFruits.length === 0 && !selectedChocolate && (
                <p className="text-muted-foreground text-sm">
                  Sélectionnez vos fruits et votre chocolat
                </p>
              )}
              
              {selectedFruits.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Fruits sélectionnés:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedFruits.map(fruit => (
                      <Badge key={fruit.id} variant="secondary" className="text-sm">
                        {fruit.emoji} {fruit.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedChocolate && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Chocolat:</h4>
                  <Badge variant="outline" className="text-sm">
                    {selectedChocolate.emoji} {selectedChocolate.name}
                  </Badge>
                </div>
              )}
              
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-primary">
                    {totalPrice.toFixed(2)} €
                  </span>
                </div>
                
                <Button 
                  onClick={handleAddToCart}
                  disabled={selectedFruits.length === 0 || !selectedChocolate}
                  className="w-full gradient-energy text-white font-semibold py-6 text-lg btn-luxury"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Ajouter au panier
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
